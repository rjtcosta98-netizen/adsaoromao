-- ============================================================
-- Migração: Tabela candidatos_melhor_jogador
-- Corre no SQL Editor do Supabase
-- ============================================================

CREATE TABLE IF NOT EXISTS candidatos_melhor_jogador (
  id            INTEGER PRIMARY KEY,
  name          TEXT    NOT NULL,
  role          TEXT    NOT NULL DEFAULT '',
  position_group TEXT   NOT NULL DEFAULT '',
  image_url     TEXT    NOT NULL DEFAULT '',
  season        TEXT    NOT NULL,
  active        BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE candidatos_melhor_jogador ENABLE ROW LEVEL SECURITY;

-- Leitura pública de candidatos ativos
CREATE POLICY "public read active candidates"
  ON candidatos_melhor_jogador FOR SELECT
  USING (active = TRUE);

-- ── Candidatos época 25/26 ────────────────────────────────
INSERT INTO candidatos_melhor_jogador (id, name, role, position_group, image_url, season) VALUES
  -- Guarda-Redes
  (10, 'Rafael Santos',  'Guarda-Redes',  'Guarda-Redes', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.23%20(2).jpeg', '25/26'),
  (11, 'Duarte Cabral',  'Guarda-Redes',  'Guarda-Redes', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.25%20(3).jpeg', '25/26'),
  -- Defesas
  (20, 'Friikique',      'Defesa Central','Defesas', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.26%20(1).jpeg', '25/26'),
  (21, 'Afonso Clara',   'Defesa Lateral','Defesas', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.28%20(1).jpeg', '25/26'),
  (22, 'João Freire',    'Defesa Central','Defesas', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.27%20(4).jpeg', '25/26'),
  (23, 'Miguel Brito',   'Defesa Lateral','Defesas', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.25%20(1).jpeg?updatedAt=1773052555510', '25/26'),
  (24, 'Albano Ferrão',  'Defesa Lateral','Defesas', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.26%20(5).jpeg', '25/26'),
  (25, 'João Costa',     'Defesa Lateral','Defesas', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.28%20(3).jpeg', '25/26'),
  (27, 'Bernardo',       'Defesa Central','Defesas', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.28%20(2).jpeg', '25/26'),
  -- Médios
  (28, 'Luis Nunes',     'Médio',         'Médios', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.25%20(5).jpeg', '25/26'),
  (29, 'Gabriel Cruz',   'Médio',         'Médios', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.26.jpeg', '25/26'),
  (30, 'João Marques',   'Médio',         'Médios', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.25%20(2).jpeg', '25/26'),
  (31, 'Mario Nunes',    'Médio',         'Médios', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.26%20(2).jpeg', '25/26'),
  (32, 'Tiago Lemos',    'Médio',         'Médios', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.26%20(3).jpeg', '25/26'),
  (33, 'Rui Cosme',      'Médio',         'Médios', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.27.jpeg', '25/26'),
  (34, 'Luis Martins',   'Médio',         'Médios', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.26%20(4).jpeg', '25/26'),
  (35, 'Paulo Jorge',    'Médio',         'Médios', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.27%20(2).jpeg', '25/26'),
  (36, 'Kevin',          'Médio',         'Médios', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.27%20(5).jpeg', '25/26'),
  (37, 'Pedro Sousa',    'Médio',         'Médios', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.27%20(1).jpeg', '25/26'),
  (38, 'Alidio Mendes',  'Médio',         'Médios', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.28.jpeg', '25/26'),
  -- Avançados
  (40, 'Aderito Peres',  'Avançado',      'Avançados', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.25.jpeg', '25/26'),
  (41, 'Sandro Gomes',   'Avançado',      'Avançados', 'https://ik.imagekit.io/elementgroup/ADSR/ADSR%20EQUIPAS/WhatsApp%20Image%202026-02-24%20at%2009.08.27%20(3).jpeg', '25/26')
ON CONFLICT (id) DO NOTHING;
