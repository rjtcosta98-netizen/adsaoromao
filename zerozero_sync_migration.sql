-- ============================================================
-- Migração: sincronização automática zerozero.pt
-- Corre no SQL Editor do Supabase (projeto hwfgehcmvggpdskrbzja)
--
-- 1. Alarga `classificacoes` para suportar todos os escalões
-- 2. Cria `jogos` (calendário e resultados por escalão)
-- 3. Leitura pública, escrita só com service_role
-- ============================================================

-- ── 1. classificacoes ────────────────────────────────────────

ALTER TABLE classificacoes ADD COLUMN IF NOT EXISTS escalao        TEXT;
ALTER TABLE classificacoes ADD COLUMN IF NOT EXISTS escalao_ordem  SMALLINT;
ALTER TABLE classificacoes ADD COLUMN IF NOT EXISTS edicao_id      INTEGER;
ALTER TABLE classificacoes ADD COLUMN IF NOT EXISTS equipa_logo    TEXT;
ALTER TABLE classificacoes ADD COLUMN IF NOT EXISTS updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- A sincronização não preenche `jornada` (o zerozero usa "J26", "QF"... e a
-- coluna é numérica). Tem de aceitar NULL.
ALTER TABLE classificacoes ALTER COLUMN jornada DROP NOT NULL;

-- Chave de upsert da sincronização.
-- Não pode ser um índice parcial: o PostgREST não consegue exprimir o predicado
-- no ON CONFLICT. Em Postgres os NULL são distintos entre si, por isso as linhas
-- antigas (importadas à mão, sem edicao_id) nunca colidem e ficam intactas.
CREATE UNIQUE INDEX IF NOT EXISTS classificacoes_edicao_equipa_key
  ON classificacoes (edicao_id, equipa);

CREATE INDEX IF NOT EXISTS classificacoes_escalao_idx
  ON classificacoes (escalao, posicao);

-- ── 2. jogos ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS jogos (
  id                BIGSERIAL PRIMARY KEY,
  zz_match_id       BIGINT      NOT NULL UNIQUE,
  zz_team_id        INTEGER     NOT NULL,
  escalao           TEXT        NOT NULL,
  escalao_ordem     SMALLINT    NOT NULL DEFAULT 99,
  epoca             TEXT        NOT NULL DEFAULT '',
  data              DATE        NOT NULL,
  hora              TEXT,
  casa              BOOLEAN     NOT NULL,
  adversario        TEXT        NOT NULL,
  adversario_logo   TEXT,
  golos_adsr        SMALLINT,
  golos_adversario  SMALLINT,
  resultado         TEXT,               -- 'V' | 'E' | 'D' | NULL (por jogar)
  competicao        TEXT,
  jornada           TEXT,
  edicao_id         INTEGER,
  url               TEXT,
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS jogos_data_idx           ON jogos (data);
CREATE INDEX IF NOT EXISTS jogos_escalao_data_idx   ON jogos (escalao, data);
CREATE INDEX IF NOT EXISTS jogos_epoca_idx          ON jogos (epoca);

-- ── 3. RLS ───────────────────────────────────────────────────
-- Leitura pública (o site usa a chave anon). Escrita só via service_role,
-- que ignora RLS — por isso não se cria política de INSERT/UPDATE/DELETE.

ALTER TABLE jogos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "jogos_leitura_publica" ON jogos;
CREATE POLICY "jogos_leitura_publica" ON jogos
  FOR SELECT TO anon, authenticated USING (true);

-- ── 4. Registo das sincronizações ────────────────────────────
-- Serve para diagnosticar: última corrida, contagens e avisos do parser.

CREATE TABLE IF NOT EXISTS zerozero_sync_log (
  id                 BIGSERIAL PRIMARY KEY,
  corrido_em         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  origem             TEXT        NOT NULL DEFAULT 'cron',
  ok                 BOOLEAN     NOT NULL,
  epoca              TEXT,
  classificacoes_num INTEGER     NOT NULL DEFAULT 0,
  jogos_num          INTEGER     NOT NULL DEFAULT 0,
  duracao_ms         INTEGER,
  avisos             TEXT[],
  erro               TEXT
);

ALTER TABLE zerozero_sync_log ENABLE ROW LEVEL SECURITY;
-- Sem políticas: só o service_role lê e escreve.

-- ── 5. Agendamento ───────────────────────────────────────────
-- NÃO há cron nesta base de dados, e é de propósito.
--
-- A Cloudflare do zerozero responde `cf-mitigated: challenge` (HTTP 403) a
-- pedidos vindos de IPs de datacenter. Testado a partir de uma Supabase Edge
-- Function, com cabeçalhos completos de browser: bloqueado à mesma. De uma
-- ligação normal as mesmas páginas servem sem desafio.
--
-- Por isso a sincronização corre a partir de uma máquina com ligação normal:
--
--   npm run sync
--
-- (scripts/sync-zerozero.mjs — precisa de SUPABASE_SERVICE_ROLE_KEY no .env.local)
--
-- Diagnóstico:
--   SELECT * FROM zerozero_sync_log ORDER BY corrido_em DESC LIMIT 10;
--
-- Se o zerozero autorizar acesso automatizado, a recolha passa a poder correr
-- numa Edge Function e o agendamento faz-se com pg_cron + pg_net.
