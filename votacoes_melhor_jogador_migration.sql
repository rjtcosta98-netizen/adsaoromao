-- ============================================================
-- Migração: Tabela votacoes_melhor_jogador
-- Corre no SQL Editor do Supabase
-- ============================================================

CREATE TABLE IF NOT EXISTS votacoes_melhor_jogador (
  id                BIGSERIAL PRIMARY KEY,
  player_id         INTEGER   NOT NULL,
  season            TEXT      NOT NULL,
  voter_fingerprint TEXT      NOT NULL DEFAULT '',
  voter_ip          TEXT      NOT NULL DEFAULT '',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Garante 1 voto por fingerprint por época
ALTER TABLE votacoes_melhor_jogador
  DROP CONSTRAINT IF EXISTS votacoes_melhor_jogador_season_voter_fingerprint_key;

ALTER TABLE votacoes_melhor_jogador
  ADD CONSTRAINT votacoes_melhor_jogador_season_voter_fingerprint_key
  UNIQUE (season, voter_fingerprint);

-- Garante 1 voto por IP por época (ignora IPs vazios)
CREATE UNIQUE INDEX IF NOT EXISTS votacoes_unique_ip
  ON votacoes_melhor_jogador (season, voter_ip)
  WHERE voter_ip <> '';

-- ── RLS ──────────────────────────────────────────────────────
ALTER TABLE votacoes_melhor_jogador ENABLE ROW LEVEL SECURITY;

-- Qualquer utilizador pode inserir (voto)
DROP POLICY IF EXISTS "anon insert vote" ON votacoes_melhor_jogador;
CREATE POLICY "anon insert vote"
  ON votacoes_melhor_jogador FOR INSERT
  WITH CHECK (true);

-- Qualquer utilizador pode ler votos (necessário para o painel admin e para verificar voto)
DROP POLICY IF EXISTS "anon read votes" ON votacoes_melhor_jogador;
CREATE POLICY "anon read votes"
  ON votacoes_melhor_jogador FOR SELECT
  USING (true);

-- Qualquer utilizador pode apagar (reset admin — protegido a nível de aplicação)
DROP POLICY IF EXISTS "anon delete votes" ON votacoes_melhor_jogador;
CREATE POLICY "anon delete votes"
  ON votacoes_melhor_jogador FOR DELETE
  USING (true);
