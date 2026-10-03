#!/bin/zsh
# Instala (ou reinstala) o agendamento da sincronização do zerozero.
#
# O plist do launchd precisa de caminhos absolutos. Gerar o ficheiro a partir
# daqui evita o problema que já aconteceu: a pasta do projeto mudou de nome e o
# agendamento passou a falhar em silêncio com o código 127 (script não existe).
#
# Uso:
#   ./scripts/instalar-agendamento.sh            # instala e carrega
#   ./scripts/instalar-agendamento.sh --estado   # só mostra o estado actual
#   ./scripts/instalar-agendamento.sh --remover  # desinstala
#
# Corre duas vezes por dia (08:07 e 21:07). Se o Mac estiver desligado à hora
# marcada, o launchd corre assim que ele voltar.

set -u

ETIQUETA="pt.adsaoromao.sync-zerozero"
RAIZ="${0:A:h:h}"
PLIST="$HOME/Library/LaunchAgents/$ETIQUETA.plist"

estado() {
  local linha
  linha="$(launchctl list 2>/dev/null | grep "$ETIQUETA")"
  if [[ -z "$linha" ]]; then
    echo "agendamento: nao carregado"
    return
  fi
  local codigo="$(echo "$linha" | awk '{print $2}')"
  echo "agendamento: carregado (ultimo codigo de saida: $codigo)"
  [[ "$codigo" == "0" ]] || echo "  aviso: codigo diferente de 0 - ver logs/launchd-sync-zerozero.*.log"
  echo "  destino: $(/usr/libexec/PlistBuddy -c 'Print :WorkingDirectory' "$PLIST" 2>/dev/null || echo '?')"
}

remover() {
  launchctl bootout "gui/$(id -u)/$ETIQUETA" 2>/dev/null
  rm -f "$PLIST"
  echo "agendamento removido."
}

case "${1:-}" in
  --estado)  estado;  exit 0 ;;
  --remover) remover; exit 0 ;;
esac

mkdir -p "$HOME/Library/LaunchAgents" "$RAIZ/logs"

cat > "$PLIST" <<PLISTFIM
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>$ETIQUETA</string>
  <key>ProgramArguments</key>
  <array>
      <string>/bin/zsh</string>
      <string>$RAIZ/scripts/sync-zerozero.sh</string>
  </array>
  <key>WorkingDirectory</key>
  <string>$RAIZ</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key>
    <string>$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
  </dict>
  <key>StartCalendarInterval</key>
  <array>
      <dict><key>Hour</key><integer>8</integer><key>Minute</key><integer>7</integer></dict>
      <dict><key>Hour</key><integer>21</integer><key>Minute</key><integer>7</integer></dict>
  </array>
  <key>ProcessType</key>
  <string>Background</string>
  <key>RunAtLoad</key>
  <false/>
  <key>StandardOutPath</key>
  <string>$RAIZ/logs/launchd-sync-zerozero.out.log</string>
  <key>StandardErrorPath</key>
  <string>$RAIZ/logs/launchd-sync-zerozero.err.log</string>
</dict>
</plist>
PLISTFIM

chmod +x "$RAIZ/scripts/sync-zerozero.sh"

launchctl bootout "gui/$(id -u)/$ETIQUETA" 2>/dev/null
launchctl bootstrap "gui/$(id -u)" "$PLIST" || {
  echo "ERRO: launchctl bootstrap falhou."
  exit 1
}

echo "agendamento instalado para: $RAIZ"
echo "  corre as 08:07 e 21:07"
estado
