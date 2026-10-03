#!/bin/zsh
# Wrapper do launchd para a sincronização do zerozero.
#
# Existe para o agendamento não ficar preso à versão de node do nvm: o caminho
# muda a cada upgrade e um plist com o caminho fixo deixaria de correr em
# silêncio. Aqui procura-se o node e falha-se com mensagem se não houver.

set -u

RAIZ="${0:A:h:h}"
cd "$RAIZ" || exit 1

carimbo() { date '+%Y-%m-%d %H:%M:%S'; }

# 1) node no PATH  2) a versão activa do nvm  3) desiste com aviso.
NODE="$(command -v node 2>/dev/null)"
if [[ -z "$NODE" ]]; then
  NODE="$(ls -d "$HOME"/.nvm/versions/node/*/bin/node 2>/dev/null | sort -V | tail -1)"
fi
if [[ -z "$NODE" || ! -x "$NODE" ]]; then
  echo "[$(carimbo)] ERRO: node não encontrado — sincronização não correu."
  exit 1
fi

echo "[$(carimbo)] início ($("$NODE" -v))"
"$NODE" scripts/sync-zerozero.mjs
estado=$?
echo "[$(carimbo)] fim (código $estado)"
exit $estado
