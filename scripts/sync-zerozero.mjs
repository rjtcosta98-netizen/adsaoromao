#!/usr/bin/env node
/**
 * Sincroniza jogos e classificações do zerozero.pt para o Supabase.
 *
 * Corre a partir de uma ligação normal. A Cloudflare do zerozero responde
 * `cf-mitigated: challenge` a pedidos vindos de IPs de datacenter, por isso a
 * Edge Function do Supabase não consegue ler as páginas — a mesma recolha a
 * partir daqui passa sem problema.
 *
 * Uso:
 *   SUPABASE_SERVICE_ROLE_KEY=... node scripts/sync-zerozero.mjs
 *
 * Ou, com as variáveis em .env.local:
 *   npm run sync
 */

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Carrega .env.local sem depender de pacotes externos.
try {
  for (const linha of readFileSync(resolve(RAIZ, '.env.local'), 'utf8').split('\n')) {
    const m = linha.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch {
  // Sem .env.local: conta-se com as variáveis já definidas no ambiente.
}

process.env.SUPABASE_URL ??= process.env.VITE_SUPABASE_URL ?? '';

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    'Falta SUPABASE_SERVICE_ROLE_KEY.\n' +
      'Obtém-a em Supabase > Project Settings > API e mete-a no .env.local.',
  );
  process.exit(1);
}

const { sincronizar } = await import(
  resolve(RAIZ, 'scripts/lib/sync.ts')
);

try {
  const r = await sincronizar('local');
  console.log(`Época ${r.epoca}`);
  console.log(`  classificações: ${r.classificacoes} (removidas ${r.removidos.classificacoes})`);
  console.log(`  jogos:          ${r.jogos} (removidos ${r.removidos.jogos})`);
  console.log(`  duração:        ${(r.duracao_ms / 1000).toFixed(1)}s`);
  if (r.avisos.length) console.log('  avisos:\n    ' + r.avisos.join('\n    '));
} catch (err) {
  console.error('Sincronização falhou:', err.message);
  process.exit(1);
}
