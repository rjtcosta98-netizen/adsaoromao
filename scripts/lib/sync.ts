/**
 * Sincronização zerozero -> Supabase.
 *
 * Corre dentro de uma Edge Function, que recebe SUPABASE_URL e
 * SUPABASE_SERVICE_ROLE_KEY automaticamente do runtime.
 *
 * Estratégia: upsert de tudo o que veio do zerozero e, a seguir, remoção das
 * linhas antigas que esta corrida não tocou. Se a recolha vier vazia, aborta
 * sem escrever — mais vale dados desactualizados do que uma tabela apagada.
 */

import { recolher, type Recolha } from './zerozero.ts';

/**
 * Lê variáveis de ambiente tanto em Deno (Edge Function) como em Node (o
 * script local `scripts/sync-zerozero.mjs`, que é o que corre de facto — o
 * zerozero desafia os IPs de datacenter).
 */
function env(nome: string): string {
  const deno = (globalThis as { Deno?: { env: { get(k: string): string | undefined } } }).Deno;
  if (deno?.env) return deno.env.get(nome) ?? '';
  const node = (globalThis as { process?: { env: Record<string, string | undefined> } }).process;
  return node?.env?.[nome] ?? '';
}

const SUPABASE_URL = env('SUPABASE_URL');
const SERVICE_KEY = env('SUPABASE_SERVICE_ROLE_KEY');

export interface Resultado {
  ok: boolean;
  epoca: string;
  classificacoes: number;
  jogos: number;
  removidos: { classificacoes: number; jogos: number };
  avisos: string[];
  duracao_ms: number;
}

function headers(extra: Record<string, string> = {}) {
  return {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

async function rest(path: string, init: RequestInit): Promise<unknown[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, init);
  const texto = await res.text();
  if (!res.ok) throw new Error(`Supabase ${res.status} em ${path}: ${texto.slice(0, 400)}`);
  return texto ? (JSON.parse(texto) as unknown[]) : [];
}

/** Upsert em lotes — evita pedidos enormes e mantém a mensagem de erro legível. */
async function upsert(tabela: string, onConflict: string, linhas: object[]) {
  const LOTE = 200;
  for (let i = 0; i < linhas.length; i += LOTE) {
    await rest(`${tabela}?on_conflict=${onConflict}`, {
      method: 'POST',
      headers: headers({ Prefer: 'resolution=merge-duplicates,return=minimal' }),
      body: JSON.stringify(linhas.slice(i, i + LOTE)),
    });
  }
}

/** Apaga as linhas do universo sincronizado que esta corrida não actualizou. */
async function limparObsoletos(tabela: string, filtro: string, marca: string): Promise<number> {
  const apagados = await rest(`${tabela}?${filtro}&updated_at=lt.${encodeURIComponent(marca)}`, {
    method: 'DELETE',
    headers: headers({ Prefer: 'return=representation' }),
  });
  return apagados.length;
}

const lista = (valores: Array<string | number>) =>
  `(${valores.map((v) => `"${String(v).replace(/"/g, '')}"`).join(',')})`;

export async function sincronizar(origem = 'cron'): Promise<Resultado> {
  if (!SERVICE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY não disponível no runtime');

  const inicio = Date.now();
  const marca = new Date().toISOString();

  const recolha: Recolha = await recolher();

  // Rede de segurança: recolha vazia significa quase sempre HTML mudado ou
  // bloqueio do zerozero — nunca deve traduzir-se em apagar o que está online.
  if (recolha.classificacoes.length === 0 && recolha.jogos.length === 0) {
    throw new Error('Recolha vazia — nada foi escrito. Verificar o parser ou bloqueio do zerozero.');
  }

  // ── Classificações ──
  const hoje = marca.slice(0, 10);
  const classificacoes = recolha.classificacoes.map((c) => ({
    edicao_id: c.edicao_id,
    epoca: c.epoca,
    competicao: c.competicao,
    escalao: c.escalao,
    escalao_ordem: c.escalao_ordem,
    ref_data: hoje,
    posicao: c.posicao,
    equipa: c.equipa,
    equipa_logo: c.equipa_logo,
    pontos: c.pontos,
    jogos: c.jogos,
    vitorias: c.vitorias,
    empates: c.empates,
    derrotas: c.derrotas,
    golos_marcados: c.golos_marcados,
    golos_sofridos: c.golos_sofridos,
    diferenca_golos: c.diferenca_golos,
    updated_at: marca,
  }));

  const jogos = recolha.jogos.map((j) => ({ ...j, updated_at: marca }));

  let removidosClass = 0;
  let removidosJogos = 0;

  if (classificacoes.length > 0) {
    await upsert('classificacoes', 'edicao_id,equipa', classificacoes);
    const edicoes = [...new Set(classificacoes.map((c) => c.edicao_id))];
    removidosClass = await limparObsoletos(
      'classificacoes',
      `edicao_id=in.(${edicoes.join(',')})`,
      marca,
    );
  }

  if (jogos.length > 0) {
    await upsert('jogos', 'zz_match_id', jogos);
    const equipas = [...new Set(jogos.map((j) => j.zz_team_id))];
    const epocas = [...new Set(jogos.map((j) => j.epoca))];
    removidosJogos = await limparObsoletos(
      'jogos',
      `zz_team_id=in.(${equipas.join(',')})&epoca=in.${lista(epocas)}`,
      marca,
    );
  }

  const resultado: Resultado = {
    ok: true,
    epoca: recolha.epoca,
    classificacoes: classificacoes.length,
    jogos: jogos.length,
    removidos: { classificacoes: removidosClass, jogos: removidosJogos },
    avisos: recolha.avisos,
    duracao_ms: Date.now() - inicio,
  };

  await registar(origem, resultado, null);
  return resultado;
}

/** Regista a corrida. Nunca deixa um erro de log rebentar a sincronização. */
export async function registar(origem: string, r: Resultado | null, erro: string | null) {
  try {
    await rest('zerozero_sync_log', {
      method: 'POST',
      headers: headers({ Prefer: 'return=minimal' }),
      body: JSON.stringify({
        origem,
        ok: r?.ok ?? false,
        epoca: r?.epoca ?? null,
        classificacoes_num: r?.classificacoes ?? 0,
        jogos_num: r?.jogos ?? 0,
        duracao_ms: r?.duracao_ms ?? null,
        avisos: r?.avisos ?? [],
        erro,
      }),
    });
  } catch (err) {
    console.error('Falhou o registo em zerozero_sync_log:', (err as Error).message);
  }
}
