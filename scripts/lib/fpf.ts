/**
 * Recolha do Centro de Resultados da FPF (resultados.fpf.pt) para a AD São Romão.
 *
 * É a fonte oficial dos escalões listados em COMPETICOES. O zerozero continua a
 * servir os restantes (ver sync.ts).
 *
 * A Cloudflare da FPF bloqueia qualquer cliente HTTP ("Your request was
 * blocked") e o Chrome headless ("Automated Message"). Só passa um Chrome com
 * janela, por isso abre-se o Chrome instalado, com a janela fora do ecrã e um
 * perfil persistente que guarda o cookie de desafio entre corridas. Os pedidos
 * às jornadas são feitos de dentro da página, um de cada vez e espaçados —
 * em rajada a Cloudflare responde 403/429 durante vários minutos.
 *
 * Fluxo por competição:
 *   1. /Competition/Details?competitionId=X&seasonId=Y -> séries e jornadas
 *   2. /Competition/GetClassificationAndMatchesByFixture?fixtureId=Z
 *      -> classificação no fim dessa jornada + jogos da jornada
 */

import { homedir } from 'node:os';
import { join } from 'node:path';
import type { ClassificacaoRow, JogoRow } from './zerozero.ts';

const BASE = 'https://resultados.fpf.pt';

/** Época 2026/2027 no selector da FPF. Avança 1 por época. */
export const SEASON_ID = 106;

export interface Competicao {
  id: number;
  escalao: string;
  escalao_ordem: number;
  /** Só os campeonatos alimentam `classificacoes` — o site mostra uma tabela por escalão. */
  campeonato: boolean;
}

/** Competições da AF Guarda em que a AD São Romão participa em 2026/27. */
export const COMPETICOES: readonly Competicao[] = [
  { id: 30210, escalao: 'Seniores', escalao_ordem: 8, campeonato: true },
  { id: 30212, escalao: 'Seniores', escalao_ordem: 8, campeonato: false },
  { id: 30369, escalao: 'Juniores U19', escalao_ordem: 7, campeonato: true },
  { id: 30370, escalao: 'Juniores U19', escalao_ordem: 7, campeonato: false },
  { id: 30372, escalao: 'Juvenis U16', escalao_ordem: 6, campeonato: true },
  { id: 30436, escalao: 'Juvenis U16', escalao_ordem: 6, campeonato: false },
  { id: 30373, escalao: 'Iniciados U14', escalao_ordem: 5, campeonato: true },
  { id: 30437, escalao: 'Iniciados U14', escalao_ordem: 5, campeonato: false },
  { id: 30397, escalao: 'Infantis U12', escalao_ordem: 4, campeonato: true },
];

/** Escalões cuja fonte é a FPF — o zerozero deixa de os escrever. */
export const ESCALOES_FPF = [...new Set(COMPETICOES.map((c) => c.escalao))];

/** "Ad S. Romão" é como a FPF escreve o clube em todas as competições. */
export const ehADSR = (nome: string) => /\bS\.?\s*Rom[ãa]o\b/i.test(nome);

// ── Nomes e logos ─────────────────────────────────────────────

const CDN = 'https://cdn-img.zerozero.pt/img/logos/equipas';

/**
 * A FPF não publica logos e escreve os nomes em "Title Case" administrativo
 * ("C.D Gouveia - Futebol Sad"). Traduz-se para o nome e o logo que o site já
 * usava com o zerozero. Equipa que falte aqui aparece com o nome da FPF e sem
 * logo — basta acrescentá-la.
 */
const EQUIPAS: Record<string, { nome: string; logo: string | null }> = {
  'Ad Fornos Algodres': { nome: 'Fornos de Algodres', logo: `${CDN}/3583_imgbank_1740563759.png` },
  'Ad Manteigas': { nome: 'Manteigas', logo: `${CDN}/6837_imgbank_1700843250.png` },
  'Adrc Aguiar Beira': { nome: 'Aguiar da Beira', logo: `${CDN}/3546_imgbank.png` },
  'Ass. Gaudella Ed Gouveia': { nome: 'ED Gouveia', logo: `${CDN}/19007_imgbank.png` },
  'C.D Gouveia - Futebol Sad': { nome: 'CD Gouveia', logo: `${CDN}/4344_imgbank.png` },
  'Cd Gouveia': { nome: 'CD Gouveia', logo: `${CDN}/4344_imgbank.png` },
  'Cf Os Vilanovenses': { nome: 'Os Vilanovenses', logo: `${CDN}/10485_imgbank.png` },
  'F.L.S': { nome: 'Fundação Laura Santos', logo: null },
  'Gc Figueirense': { nome: 'Ginásio Figueirense', logo: `${CDN}/5668_imgbank_1744801569.png` },
  'Gd Trancoso': { nome: 'Trancoso', logo: `${CDN}/6839_imgbank.png` },
  'Guarda Fc': { nome: 'Guarda FC', logo: `${CDN}/242110_imgbank_1733843844.png` },
  'Sc Celoricense': { nome: 'SC Celoricense', logo: `${CDN}/11074_imgbank.png` },
  'Sc Mêda': { nome: 'SC Mêda', logo: `${CDN}/6841_imgbank.png` },
  'Sc Sabugal': { nome: 'SC Sabugal', logo: `${CDN}/6836_imgbank.png` },
  'Sc Vilar Formoso': { nome: 'Vilar Formoso', logo: `${CDN}/6838_imgbank.png` },
  'Seia Fc': { nome: 'Seia FC', logo: `${CDN}/16479_imgbank.png` },
  'Seia Fc "A"': { nome: 'Seia FC', logo: `${CDN}/16479_imgbank.png` },
  'Seia Fc "B"': { nome: 'Seia FC B', logo: `${CDN}/16479_imgbank.png` },
  'Acd Vila Franca Naves': { nome: 'VF Naves', logo: `${CDN}/11083_imgbank.png` },
  'Adrc Penaverdense': { nome: 'Penaverdense', logo: `${CDN}/11072_imgbank_1741687922.png` },
  'Gd Vila Nova Foz Coa': { nome: 'GD Foz Côa', logo: `${CDN}/6846_imgbank.png` },
  'Núcleo Desp. Social': { nome: 'NDS Guarda', logo: `${CDN}/10044_imgbank.png` },
  'Núcleo Desp. Social "A"': { nome: 'NDS Guarda', logo: `${CDN}/10044_imgbank.png` },
  'Núcleo Desp. Social "B"': { nome: 'NDS Guarda B', logo: `${CDN}/10044_imgbank.png` },
  'Ass. Gaudella Ed Gouveia "A"': { nome: 'ED Gouveia', logo: `${CDN}/19007_imgbank.png` },
  'Ass. Gaudella Ed Gouveia "B"': { nome: 'ED Gouveia B', logo: `${CDN}/19007_imgbank.png` },
  'Ud Os Pinhelenses': { nome: 'Pinhelenses', logo: `${CDN}/6843_imgbank.png` },
  'V. Cortez Mondego-Guarda': { nome: 'Vila Cortez', logo: `${CDN}/6845_imgbank_1744816765.png` },
};

export function equipa(nomeFpf: string): { nome: string; logo: string | null } {
  return EQUIPAS[nomeFpf] ?? { nome: nomeFpf, logo: null };
}

// ── Parser (HTML -> dados) ────────────────────────────────────

const texto = (html: string) =>
  html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/[“”„]/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(Number.parseInt(h, 16)))
    .replace(/\s+/g, ' ')
    .trim();

export interface Serie {
  serieId: number;
  /** Nome da fase ("FASE GRUPOS"), se a página o mostrar. */
  fase: string;
  /** Rótulo do bloco ("GRUPO A"), se existir. */
  grupo: string;
  jornadas: Array<{ numero: string; fixtureId: number }>;
  temADSR: boolean;
  /** HTML do bloco — nas eliminatórias os jogos vêm aqui, sem jornadas. */
  html: string;
}

export interface DetalhesCompeticao {
  nome: string;
  epoca: string;
  series: Serie[];
}

/** Lê a página da competição: nome, época seleccionada e jornadas de cada série. */
export function lerDetalhes(html: string): DetalhesCompeticao {
  const nome = texto(html.match(/<div id="competitionId">[\s\S]*?<h2>([\s\S]*?)<\/h2>/)?.[1] ?? '');
  const sel = html.match(/<option[^>]*selected="selected"[^>]*>\s*(20\d{2})-(20\d{2})\s*<\/option>/);
  const epoca = sel ? `${sel[1]}/${sel[2]}` : '';

  const series: Serie[] = [];
  // Cada série é um bloco id="htmlSerieId_N"; a fase é o título do acordeão anterior.
  const partes = html.split(/(?=<div class="accordion-title)|(?=<div[^>]*id="htmlSerieId_\d+")/);
  let fase = '';
  for (const parte of partes) {
    if (parte.startsWith('<div class="accordion-title')) {
      fase = texto(parte.match(/^<div class="accordion-title[\s\S]*?<\/div>\s*<\/div>/)?.[0] ?? '');
      continue;
    }
    const id = parte.match(/^<div[^>]*id="htmlSerieId_(\d+)"/);
    if (!id) continue;
    const jornadas = [...parte.matchAll(/<a[^>]*href="[^"]*fixtureId=(\d+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({
      numero: texto(m[2]),
      fixtureId: Number(m[1]),
    }));
    const rotuloBloco = texto(parte.match(/<div class="[^"]*serie-name[^"]*">([\s\S]*?)<\/div>/)?.[1] ?? '') ||
      (texto(parte.slice(0, 600)).match(/^(GRUPO \S+|S[ÉE]RIE \S+)/i)?.[1] ?? '');
    // 'GRUPO "B"' / 'SÉRIE C' -> 'Grupo B' / 'Série C'
    const grupo = rotuloBloco
      .replace(/["']/g, '')
      .replace(/^(GRUPO|S[ÉE]RIE)(?=\s)/i, (m) => m[0] + m.slice(1).toLowerCase())
      .trim();
    series.push({ serieId: Number(id[1]), fase, grupo, jornadas, temADSR: ehADSR(texto(parte)), html: parte });
  }

  return { nome, epoca, series };
}

export interface LinhaClassificacao {
  posicao: number;
  equipa: string;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golos_marcados: number;
  golos_sofridos: number;
  pontos: number;
}

export interface JogoJornada {
  matchId: number | null;
  casa: string;
  fora: string;
  golosCasa: number | null;
  golosFora: number | null;
  dia: number | null;
  mes: number | null;
  hora: string | null;
  estadio: string | null;
}

export interface Jornada {
  classificacao: LinhaClassificacao[];
  jogos: JogoJornada[];
}

const MESES: Record<string, number> = {
  jan: 1, fev: 2, mar: 3, abr: 4, mai: 5, jun: 6, jul: 7, ago: 8, set: 9, out: 10, nov: 11, dez: 12,
};

/** Lê o fragmento devolvido por GetClassificationAndMatchesByFixture. */
export function lerJornada(html: string): Jornada {
  const classificacao: LinhaClassificacao[] = [];
  for (const m of html.matchAll(/<div class="game classification[^"]*">([\s\S]*?)(?=<div class="game classification|<\/div>\s*<\/div>\s*<div id="matches"|$)/g)) {
    const c = [...m[1].matchAll(/<div class="col-[^"]*">([\s\S]*?)<\/div>/g)].map((x) => texto(x[1]));
    if (c.length < 9) continue;
    const n = [c[0], ...c.slice(2, 9)].map((v) => Number.parseInt(v, 10));
    if (n.some((v) => Number.isNaN(v)) || !c[1]) continue;
    const [posicao, jogos, vitorias, empates, derrotas, gm, gs, pontos] = n;
    classificacao.push({
      posicao, equipa: c[1], jogos, vitorias, empates, derrotas, golos_marcados: gm, golos_sofridos: gs, pontos,
    });
  }

  const inicioJogos = html.indexOf('id="matches"');
  // Fragmento de jornada: jogos depois de #matches. Bloco de eliminatória: o bloco todo.
  const zonaJogos = inicioJogos >= 0 ? html.slice(inicioJogos) : html;
  const jogos: JogoJornada[] = [];
  const re =
    /(?:<a class="game-link" href="[^"]*matchId=(\d+)"[^>]*>\s*)?<div class="game"[^>]*>\s*<div class="home-team[^"]*">([\s\S]*?)<\/div>\s*<div class="[^"]*">([\s\S]*?)<\/div>\s*<div class="away-team[^"]*">([\s\S]*?)<\/div>\s*<\/div>(?:\s*<div class="game-list-stadium"[^>]*>([\s\S]*?)<\/div>)?/g;
  for (const m of zonaJogos.matchAll(re)) {
    const meio = m[3];
    const agenda = texto(meio.match(/<span class="game-schedule">([\s\S]*?)<\/span>/)?.[1] ?? '');
    const resto = texto(meio.replace(/<span class="game-schedule">[\s\S]*?<\/span>/, ''));
    const placar = resto.match(/^(\d+)\s*-\s*(\d+)$/);
    const data = agenda.match(/(\d{1,2})\s+([a-zç]{3})/i);
    const hora = agenda.match(/\b(\d{1,2}):(\d{2})\b/);
    jogos.push({
      matchId: m[1] ? Number(m[1]) : null,
      casa: texto(m[2]),
      fora: texto(m[4]),
      golosCasa: placar ? Number(placar[1]) : null,
      golosFora: placar ? Number(placar[2]) : null,
      dia: data ? Number(data[1]) : null,
      mes: data ? (MESES[data[2].toLowerCase()] ?? null) : null,
      hora: hora ? `${hora[1].padStart(2, '0')}:${hora[2]}` : null,
      estadio: m[5] ? texto(m[5]) || null : null,
    });
  }

  return { classificacao, jogos };
}

/** A FPF mostra "3 out" sem ano: Julho a Dezembro é o 1º ano da época, o resto o 2º. */
export function dataNaEpoca(epoca: string, dia: number, mes: number): string {
  const [a1, a2] = epoca.split('/').map(Number);
  const ano = mes >= 7 ? a1 : a2;
  return `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}

/**
 * Converte os jogos da ADSR numa jornada em linhas da tabela `jogos`.
 *
 * Jogos por jogar não têm matchId na FPF. Como a ADSR joga no máximo uma vez
 * por jornada, o id estável é o da jornada, negativo para nunca colidir com os
 * ids do zerozero que convivem na mesma coluna.
 */
export function jogosADSR(
  jornada: Jornada,
  ctx: { comp: Competicao; nome: string; epoca: string; fixtureId: number; rotulo: string },
): JogoRow[] {
  const out: JogoRow[] = [];
  for (const j of jornada.jogos) {
    const emCasa = ehADSR(j.casa);
    if (!emCasa && !ehADSR(j.fora)) continue;
    if (j.dia === null || j.mes === null) continue;

    const adv = equipa(emCasa ? j.fora : j.casa);
    const golosAdsr = emCasa ? j.golosCasa : j.golosFora;
    const golosAdv = emCasa ? j.golosFora : j.golosCasa;
    const resultado =
      golosAdsr === null || golosAdv === null ? null : golosAdsr > golosAdv ? 'V' : golosAdsr < golosAdv ? 'D' : 'E';

    out.push({
      zz_match_id: -ctx.fixtureId,
      zz_team_id: ctx.comp.id,
      escalao: ctx.comp.escalao,
      escalao_ordem: ctx.comp.escalao_ordem,
      epoca: ctx.epoca,
      data: dataNaEpoca(ctx.epoca, j.dia, j.mes),
      hora: j.hora,
      casa: emCasa,
      adversario: adv.nome,
      adversario_logo: adv.logo,
      golos_adsr: golosAdsr,
      golos_adversario: golosAdv,
      resultado,
      competicao: ctx.nome,
      jornada: ctx.rotulo,
      edicao_id: ctx.comp.id,
      url: j.matchId
        ? `${BASE}/Match/GetMatchInformation?matchId=${j.matchId}`
        : `${BASE}/Competition/Details?competitionId=${ctx.comp.id}&seasonId=${SEASON_ID}`,
    });
  }
  return out;
}

export function classificacaoADSR(
  jornada: Jornada,
  ctx: { comp: Competicao; nome: string; epoca: string },
): ClassificacaoRow[] {
  return jornada.classificacao.map((l) => {
    const eq = ehADSR(l.equipa) ? { nome: 'AD São Romão', logo: null } : equipa(l.equipa);
    return {
      edicao_id: ctx.comp.id,
      competicao: ctx.nome,
      epoca: ctx.epoca,
      escalao: ctx.comp.escalao,
      escalao_ordem: ctx.comp.escalao_ordem,
      posicao: l.posicao,
      equipa: eq.nome,
      equipa_logo: eq.logo,
      pontos: l.pontos,
      jogos: l.jogos,
      vitorias: l.vitorias,
      empates: l.empates,
      derrotas: l.derrotas,
      golos_marcados: l.golos_marcados,
      golos_sofridos: l.golos_sofridos,
      diferenca_golos: l.golos_marcados - l.golos_sofridos,
    };
  });
}

// ── Browser ───────────────────────────────────────────────────

const espera = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Intervalo entre pedidos às jornadas. Abaixo de ~2s a Cloudflare começa a bloquear. */
const INTERVALO_MS = 2500;

type Contexto = import('playwright-core').BrowserContext;
type Pagina = import('playwright-core').Page;

const PERFIL = join(homedir(), '.cache', 'adsr-fpf-chrome');

class Bloqueado extends Error {}

/**
 * Chrome com perfil persistente. Arranca com a janela fora do ecrã; o desafio
 * da Cloudflare só se resolve com a janela visível, por isso quando o cookie
 * de desafio expira reabre-se uma janela pequena, uma vez, e o perfil guarda o
 * novo cookie para as corridas seguintes.
 */
class Sessao {
  private contexto: Contexto | null = null;
  page!: Pagina;
  visivel = false;

  async abrir(visivel: boolean) {
    await this.fechar();
    const { chromium } = await import('playwright-core');
    this.visivel = visivel;
    this.contexto = await chromium.launchPersistentContext(PERFIL, {
      channel: 'chrome',
      headless: false,
      locale: 'pt-PT',
      // Sem a marca de automação: com ela a Cloudflare bloqueia logo à entrada.
      ignoreDefaultArgs: ['--enable-automation'],
      args: [
        '--disable-blink-features=AutomationControlled',
        visivel ? '--window-position=40,40' : '--window-position=-2400,-2400',
        '--window-size=640,480',
      ],
    });
    this.page = this.contexto.pages()[0] ?? (await this.contexto.newPage());
  }

  async fechar() {
    await this.contexto?.close().catch(() => {});
    this.contexto = null;
  }

  /** Navega e espera pelo seletor — inclui o tempo de resolver um desafio. */
  async ir(url: string, seletor: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
    try {
      await this.page.waitForSelector(seletor, { timeout: 45_000 });
    } catch {
      throw new Bloqueado(`FPF não carregou ${url}`);
    }
  }

  /** Fragmento de uma jornada, pedido de dentro da página (leva os cookies). */
  async jornada(fixtureId: number): Promise<string> {
    const caminho = `/Competition/GetClassificationAndMatchesByFixture?fixtureId=${fixtureId}`;
    const r = await this.page.evaluate(async (url) => {
      const res = await fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
      return { status: res.status, html: await res.text() };
    }, caminho);
    if (r.status === 200 && r.html.includes('id="matches"')) return r.html;

    // Desafio: navegação de topo corre o JS da Cloudflare e renova o cookie.
    await this.ir(BASE + caminho, '#matches');
    return await this.page.content();
  }
}

/**
 * Corre `passo`; se a Cloudflare bloquear, a 1ª vez reabre o Chrome visível
 * (para resolver o desafio) e depois espera 30s e 60s — o bloqueio por excesso
 * de pedidos passa sozinho ao fim de algum tempo.
 */
async function comDesafio<T>(s: Sessao, url: string, seletor: string, passo: () => Promise<T>): Promise<T> {
  for (const pausa of [0, 30_000, 60_000]) {
    try {
      return await passo();
    } catch (err) {
      if (!(err instanceof Bloqueado) || pausa === 60_000) throw err;
      if (!s.visivel) await s.abrir(true);
      else await espera(pausa ? pausa * 2 : 30_000);
      await s.ir(url, seletor).catch(() => {});
      await espera(INTERVALO_MS);
    }
  }
  throw new Bloqueado(`FPF bloqueou ${url}`);
}

export interface RecolhaFPF {
  epoca: string;
  classificacoes: ClassificacaoRow[];
  jogos: JogoRow[];
  avisos: string[];
  /** Escalões em que todas as competições foram lidas sem erro — só esses se limpam. */
  escaloesCompletos: string[];
  /** Nomes de equipa vistos sem correspondência em EQUIPAS. */
  semLogo: string[];
}

export async function recolherFPF(): Promise<RecolhaFPF> {
  const s = new Sessao();
  await s.abrir(false);

  const avisos: string[] = [];
  const classificacoes: ClassificacaoRow[] = [];
  const jogos: JogoRow[] = [];
  const nomes = new Set<string>();
  const falhados = new Set<string>();
  let epocaGeral = '';

  try {
    for (const comp of COMPETICOES) {
      const urlComp = `${BASE}/Competition/Details?competitionId=${comp.id}&seasonId=${SEASON_ID}`;
      const SEL = '[id^="htmlSerieId_"]';
      try {
        await comDesafio(s, urlComp, SEL, () => s.ir(urlComp, SEL));
        const det = lerDetalhes(await s.page.content());
        const epoca = det.epoca;
        epocaGeral ||= epoca;
        const series = det.series.filter((x) => x.temADSR);
        if (series.length === 0) {
          avisos.push(`FPF ${comp.id}: AD S. Romão não encontrada em nenhuma série`);
          falhados.add(comp.escalao);
          continue;
        }

        for (const serie of series) {
          // Eliminatória: sem jornadas, os jogos estão no próprio bloco. O id
          // estável sai da série e da ordem do jogo (pode haver 2 mãos).
          if (serie.jornadas.length === 0) {
            const jornada = lerJornada(serie.html);
            for (const j of jornada.jogos) nomes.add(j.casa), nomes.add(j.fora);
            const daADSR = jornada.jogos.filter((j) => ehADSR(j.casa) || ehADSR(j.fora));
            daADSR.forEach((j, i) => {
              jogos.push(...jogosADSR({ classificacao: [], jogos: [j] }, {
                comp, nome: det.nome, epoca, fixtureId: serie.serieId * 100 + i, rotulo: serie.fase || serie.grupo,
              }));
            });
            continue;
          }

          // A classificação mais recente é a da última jornada já com jogos disputados.
          let ultimaComJogos: LinhaClassificacao[] | null = null;
          let primeira: LinhaClassificacao[] | null = null;

          for (const jor of serie.jornadas) {
            await espera(INTERVALO_MS);
            const html = await comDesafio(s, urlComp, SEL, () => s.jornada(jor.fixtureId));
            // Depois de uma navegação de topo, volta à competição para os próximos pedidos.
            if (!s.page.url().includes('/Competition/Details')) await s.ir(urlComp, SEL);
            const jornada = lerJornada(html);
            for (const l of jornada.classificacao) nomes.add(l.equipa);
            for (const j of jornada.jogos) nomes.add(j.casa), nomes.add(j.fora);

            primeira ??= jornada.classificacao;
            if (jornada.jogos.some((j) => j.golosCasa !== null)) ultimaComJogos = jornada.classificacao;

            const rotulo = [serie.grupo, `J${jor.numero}`].filter(Boolean).join(' · ');
            jogos.push(...jogosADSR(jornada, { comp, nome: det.nome, epoca, fixtureId: jor.fixtureId, rotulo }));
          }

          if (comp.campeonato) {
            const tabela = ultimaComJogos ?? primeira ?? [];
            if (tabela.length < 2) avisos.push(`FPF ${comp.id}: classificação vazia`);
            else classificacoes.push(...classificacaoADSR({ classificacao: tabela, jogos: [] }, { comp, nome: det.nome, epoca }));
          }
        }
      } catch (err) {
        avisos.push(`FPF ${comp.id} falhou: ${(err as Error).message.split('\n')[0]}`);
        falhados.add(comp.escalao);
      }
    }
  } finally {
    await s.fechar();
  }

  const semLogo = [...nomes].filter((n) => !ehADSR(n) && !EQUIPAS[n]).sort();
  const escaloesCompletos = ESCALOES_FPF.filter((e) => !falhados.has(e));
  return { epoca: epocaGeral, classificacoes, jogos, avisos, escaloesCompletos, semLogo };
}
