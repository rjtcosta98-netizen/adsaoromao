/**
 * Scraper zerozero.pt para a AD São Romão.
 *
 * O zerozero não expõe API pública. As páginas são renderizadas no servidor,
 * por isso lê-se o HTML e extraem-se as tabelas. Só se usam páginas permitidas
 * pelo robots.txt (que apenas bloqueia /zzmap_v3.php).
 *
 * Fluxo:
 *   1. /classificacoes-clube  -> edições em que o clube participa na época corrente
 *   2. /edicao/-/<id>         -> tabela classificativa + id da equipa ADSR nessa edição
 *   3. /equipa/.../<id>/jogos -> calendário completo dessa equipa (escalão)
 */

const BASE = 'https://www.zerozero.pt';
const CDN = 'https://cdn-img.zerozero.pt/img/logos/equipas';

/** Id do clube AD São Romão no zerozero. */
export const CLUB_ID = 8062;
export const CLUB_SLUG = 'ad-sao-romao';
export const CLUB_NAME = 'AD São Romão';

/**
 * A Cloudflare do zerozero devolve 403 a qualquer User-Agent que se identifique
 * como bot (testado: "ADSaoRomaoBot/1.0" -> 403, Chrome -> 200). Usa-se por isso
 * um User-Agent de browser. O acesso é a páginas públicas permitidas pelo
 * robots.txt e a cadência é de 2 sincronizações por dia.
 */
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

export interface Edicao {
  edicaoId: number;
  competicao: string;
}

export interface ClassificacaoRow {
  edicao_id: number;
  competicao: string;
  epoca: string;
  escalao: string;
  escalao_ordem: number;
  posicao: number;
  equipa: string;
  equipa_logo: string | null;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golos_marcados: number;
  golos_sofridos: number;
  diferenca_golos: number;
}

export interface JogoRow {
  zz_match_id: number;
  zz_team_id: number;
  escalao: string;
  escalao_ordem: number;
  epoca: string;
  data: string;
  hora: string | null;
  casa: boolean;
  adversario: string;
  adversario_logo: string | null;
  golos_adsr: number | null;
  golos_adversario: number | null;
  resultado: string | null;
  competicao: string | null;
  jornada: string | null;
  edicao_id: number | null;
  url: string;
}

// ── HTTP ──────────────────────────────────────────────────────

const espera = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * O zerozero engasga-se sob carga e devolve 429/5xx ou corta a ligação. Sem
 * repetição isso traduz-se em escalões em falta na sincronização, por isso
 * tenta-se 3 vezes com espera crescente. Erros 4xx (excepto 429) não repetem —
 * são páginas que mudaram ou desapareceram.
 */
export async function fetchPage(path: string): Promise<string> {
  const url = path.startsWith('http') ? path : `${BASE}${path}`;
  const TENTATIVAS = 3;
  let ultimo = '';

  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'pt-PT,pt;q=0.9,en;q=0.8',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          'Sec-Ch-Ua': '"Chromium";v="131", "Not_A Brand";v="24", "Google Chrome";v="131"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"macOS"',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
          'Upgrade-Insecure-Requests': '1',
        },
        signal: AbortSignal.timeout(20_000),
      });

      if (res.ok) return await res.text();

      const mitigado = res.headers.get('cf-mitigated') ?? '';
      ultimo = `zerozero ${res.status} em ${url}${mitigado ? ` (cf-mitigated: ${mitigado})` : ''}`;
      const vaiRepetir = res.status === 429 || res.status >= 500;
      if (!vaiRepetir) break;
    } catch (err) {
      ultimo = `zerozero falhou em ${url}: ${(err as Error).message}`;
    }

    if (tentativa < TENTATIVAS) await espera(tentativa * 1200);
  }

  throw new Error(ultimo);
}

// ── Utilitários de HTML ───────────────────────────────────────

const stripTags = (html: string) =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/\s+/g, ' ')
    .trim();

const rowsOf = (html: string) => [...html.matchAll(/<tr[\s\S]*?<\/tr>/g)].map((m) => m[0]);

const cellsOf = (row: string) =>
  [...row.matchAll(/<t[dh][\s\S]*?<\/t[dh]>/g)].map((m) => stripTags(m[0]));

/** Converte o src relativo do zerozero no URL do CDN usado no site. */
function logoFrom(html: string): string | null {
  const m = html.match(/logos\/equipas\/([\w.-]+\.(?:png|jpg|jpeg|gif|webp))/i);
  return m ? `${CDN}/${m[1]}` : null;
}

const toInt = (v: string): number | null => {
  const n = Number.parseInt(v.replace(/[+\s]/g, ''), 10);
  return Number.isNaN(n) ? null : n;
};

// ── Escalões ──────────────────────────────────────────────────

/**
 * O zerozero identifica os escalões por "Jun.B S16", "Fut.9 Jun.D S12", etc.,
 * e as competições por "Sub-16", "Jun.C S14"... Ambos trazem o número do escalão,
 * que é o que se usa para traduzir para os nomes do site.
 */
const ESCALOES: ReadonlyArray<{ max: number; nome: string; ordem: number }> = [
  { max: 7, nome: 'Petizes U7', ordem: 1 },
  { max: 9, nome: 'Traquinas U8', ordem: 2 },
  { max: 11, nome: 'Benjamins U10', ordem: 3 },
  { max: 13, nome: 'Infantis U12', ordem: 4 },
  { max: 15, nome: 'Iniciados U14', ordem: 5 },
  { max: 17, nome: 'Juvenis U16', ordem: 6 },
  { max: 19, nome: 'Juniores U19', ordem: 7 },
];

const SENIORES = { nome: 'Seniores', ordem: 8 };

/**
 * Nem todas as competições trazem o número do escalão: "AF Guarda Juniores A
 * 1ªF GB 25/26" só tem a letra. A = Juniores, B = Juvenis, ... G = Petizes.
 */
const LETRAS: Record<string, number> = { A: 7, B: 6, C: 5, D: 4, E: 3, F: 2, G: 1 };

export function escalaoDe(texto: string): { escalao: string; escalao_ordem: number } {
  const numero = texto.match(/\b(?:S|Sub-?)\s?(\d{1,2})\b/i);
  if (numero) {
    const n = Number(numero[1]);
    const hit = ESCALOES.find((e) => n <= e.max);
    if (hit) return { escalao: hit.nome, escalao_ordem: hit.ordem };
  }

  const letra = texto.match(/\bJun(?:\.|iores)\s*([A-G])\b/i);
  if (letra) {
    const ordem = LETRAS[letra[1].toUpperCase()];
    const hit = ESCALOES.find((e) => e.ordem === ordem);
    if (hit) return { escalao: hit.nome, escalao_ordem: hit.ordem };
  }

  return { escalao: SENIORES.nome, escalao_ordem: SENIORES.ordem };
}

/** "2025/2026" | "2025/26" | "25/26" -> "2025/2026" */
export function epocaDe(texto: string): string {
  const longa = texto.match(/\b(20\d{2})\s*\/\s*(20\d{2})\b/);
  if (longa) return `${longa[1]}/${longa[2]}`;
  const mista = texto.match(/\b(20\d{2})\s*\/\s*(\d{2})\b/);
  if (mista) return `${mista[1]}/20${mista[2]}`;
  const curta = texto.match(/\b(\d{2})\s*\/\s*(\d{2})\b/);
  if (curta) return `20${curta[1]}/20${curta[2]}`;
  return '';
}

/**
 * Selector de época do zerozero, na forma
 * `<option value="155" selected="selected">2025/2026</option>`.
 * Exige o formato do ano para não apanhar outros selects da página.
 */
const SELECTOR_EPOCA = /<option value="(\d{2,5})"\s+selected="selected">\s*(20\d{2}\/20\d{2})\s*<\/option>/;

// ── 1. Edições da época corrente ──────────────────────────────

/**
 * Lê a página de classificações do clube. Sem parâmetro de época o zerozero
 * devolve a época mais recente com dados — que é exactamente o que se quer
 * mostrar (na pré-época ainda não há classificações da nova época).
 */
export async function listarEdicoes(): Promise<{ epocaId: number; epoca: string; edicoes: Edicao[] }> {
  const html = await fetchPage(`/equipa/${CLUB_SLUG}/${CLUB_ID}/classificacoes-clube`);

  const sel = html.match(SELECTOR_EPOCA);
  const epocaId = sel ? Number(sel[1]) : 0;
  const epoca = sel ? sel[2] : '';

  const vistos = new Map<number, Edicao>();
  for (const m of html.matchAll(/<a[^>]*href="\/edicao\/[^"]*?\/(\d+)"[^>]*>([\s\S]{0,160}?)<\/a>/g)) {
    const competicao = stripTags(m[2]);
    const edicaoId = Number(m[1]);
    if (competicao && !vistos.has(edicaoId)) vistos.set(edicaoId, { edicaoId, competicao });
  }

  return { epocaId, epoca, edicoes: [...vistos.values()] };
}

// ── 2. Classificação de uma edição ────────────────────────────

export interface EdicaoParsed {
  linhas: ClassificacaoRow[];
  /** Id da equipa da ADSR nesta edição — a porta de entrada para o calendário. */
  teamId: number | null;
}

export async function lerEdicao(edicao: Edicao, epocaFallback: string): Promise<EdicaoParsed> {
  const html = await fetchPage(`/edicao/-/${edicao.edicaoId}`);

  const epoca = epocaDe(edicao.competicao) || epocaFallback;
  const { escalao, escalao_ordem } = escalaoDe(edicao.competicao);

  const linhas: ClassificacaoRow[] = [];
  let teamId: number | null = null;

  for (const row of rowsOf(html)) {
    // O id da equipa da ADSR aparece em qualquer linha da página desta edição.
    if (teamId === null) {
      const eq = row.match(new RegExp(`/equipa/${CLUB_SLUG}/(\\d+)`));
      if (eq) teamId = Number(eq[1]);
    }

    const c = cellsOf(row);
    // Linha de classificação: Pos | logo | Equipa | P | J | V | E | D | GM | GS | DG
    if (c.length < 11) continue;
    const posicao = toInt(c[0]);
    const nums = c.slice(3, 11).map(toInt);
    if (posicao === null || posicao < 1 || nums.some((n) => n === null)) continue;
    if (!c[2]) continue;

    const [pontos, jogos, vitorias, empates, derrotas, gm, gs, dg] = nums as number[];
    linhas.push({
      edicao_id: edicao.edicaoId,
      competicao: edicao.competicao,
      epoca,
      escalao,
      escalao_ordem,
      posicao,
      equipa: c[2],
      equipa_logo: logoFrom(row),
      pontos,
      jogos,
      vitorias,
      empates,
      derrotas,
      golos_marcados: gm,
      golos_sofridos: gs,
      diferenca_golos: dg,
    });
  }

  // Sanidade: uma classificação com uma só linha é quase de certeza lixo de parsing.
  return { linhas: linhas.length >= 2 ? linhas : [], teamId };
}

// ── 3. Calendário de uma equipa (escalão) ─────────────────────

export async function lerJogos(teamId: number, epocaId?: number): Promise<JogoRow[]> {
  const query = epocaId ? `?epoca_id=${epocaId}` : '';
  const html = await fetchPage(`/equipa/${CLUB_SLUG}/${teamId}/jogos${query}`);

  const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const { escalao, escalao_ordem } = escalaoDe(titulo);
  const epoca = epocaDe(titulo);

  const jogos: JogoRow[] = [];

  for (const row of rowsOf(html)) {
    const idm = row.match(/<tr[^>]*\bid="(\d+)"/);
    const link = row.match(/href="(\/jogo\/[^"]+)"/);
    if (!idm || !link) continue;

    const c = cellsOf(row);
    // forma | data | hora | (C)/(F) | logo | adversário | resultado | competição | jornada
    if (c.length < 9) continue;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(c[1])) continue;

    const casa = c[3].includes('C');
    const adversario = c[5];
    if (!adversario) continue;

    const placar = c[6].match(/^(\d+)\s*-\s*(\d+)$/);
    let golosAdsr: number | null = null;
    let golosAdv: number | null = null;
    if (placar) {
      const esquerda = Number(placar[1]);
      const direita = Number(placar[2]);
      // O placar está sempre na ordem casa-fora.
      golosAdsr = casa ? esquerda : direita;
      golosAdv = casa ? direita : esquerda;
    }

    const forma = c[0].toUpperCase();
    const resultado = ['V', 'E', 'D'].includes(forma) ? forma : null;
    const edicao = row.match(/href="\/edicao\/[^"]*?\/(\d+)"/);

    jogos.push({
      zz_match_id: Number(idm[1]),
      zz_team_id: teamId,
      escalao,
      escalao_ordem,
      epoca,
      data: c[1],
      hora: /^\d{1,2}:\d{2}$/.test(c[2]) ? c[2] : null,
      casa,
      adversario,
      adversario_logo: logoFrom(row),
      golos_adsr: golosAdsr,
      golos_adversario: golosAdv,
      resultado,
      competicao: c[7] || null,
      jornada: c[8] || null,
      edicao_id: edicao ? Number(edicao[1]) : null,
      url: `${BASE}${link[1]}`,
    });
  }

  return jogos;
}

// ── Época corrente ────────────────────────────────────────────

/**
 * Época que o zerozero considera corrente para o clube. Difere da época das
 * classificações durante a pré-época: em Setembro a ficha do clube já está em
 * 2026/27 mas as classificações ainda são as de 2025/26.
 */
export async function epocaCorrente(): Promise<number | null> {
  const html = await fetchPage(`/equipa/${CLUB_SLUG}/${CLUB_ID}`);
  const m = html.match(SELECTOR_EPOCA);
  return m ? Number(m[1]) : null;
}

// ── Recolha completa ──────────────────────────────────────────

export interface Recolha {
  epoca: string;
  epocaId: number;
  classificacoes: ClassificacaoRow[];
  jogos: JogoRow[];
  avisos: string[];
}

/** Corre as tarefas em paralelo com um limite, para não martelar o zerozero. */
async function emLotes<T, R>(itens: T[], limite: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = [];
  for (let i = 0; i < itens.length; i += limite) {
    out.push(...(await Promise.all(itens.slice(i, i + limite).map(fn))));
  }
  return out;
}

export async function recolher(): Promise<Recolha> {
  const avisos: string[] = [];
  const { epocaId, epoca, edicoes } = await listarEdicoes();

  if (edicoes.length === 0) throw new Error('Nenhuma edição encontrada em classificacoes-clube');

  const classificacoes: ClassificacaoRow[] = [];
  const teamIds = new Set<number>([CLUB_ID]);

  await emLotes(edicoes, 3, async (edicao) => {
    try {
      const { linhas, teamId } = await lerEdicao(edicao, epoca);
      if (linhas.length === 0) avisos.push(`Sem classificação: ${edicao.competicao}`);
      classificacoes.push(...linhas);
      if (teamId) teamIds.add(teamId);
    } catch (err) {
      avisos.push(`Edição ${edicao.edicaoId} falhou: ${(err as Error).message}`);
    }
  });

  // Épocas a ler: a das classificações e, se for outra, a corrente (pré-época).
  const epocas = new Set<number>([epocaId]);
  try {
    const corrente = await epocaCorrente();
    if (corrente) epocas.add(corrente);
  } catch (err) {
    avisos.push(`Época corrente não detectada: ${(err as Error).message}`);
  }

  const pedidos = [...teamIds].flatMap((teamId) => [...epocas].map((ep) => ({ teamId, ep })));

  const jogos: JogoRow[] = [];
  const vistos = new Set<number>();

  await emLotes(pedidos, 3, async ({ teamId, ep }) => {
    try {
      for (const jogo of await lerJogos(teamId, ep)) {
        if (vistos.has(jogo.zz_match_id)) continue;
        vistos.add(jogo.zz_match_id);
        jogos.push(jogo);
      }
    } catch (err) {
      avisos.push(`Jogos da equipa ${teamId} (época ${ep}) falharam: ${(err as Error).message}`);
    }
  });

  return { epoca, epocaId, classificacoes, jogos, avisos };
}
