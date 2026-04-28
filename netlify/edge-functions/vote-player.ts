/**
 * Netlify Edge Function — /api/vote-player
 *
 * Uses context.ip (Netlify's reliable server-side IP) — cannot be spoofed by the client.
 * Blocks duplicate votes by IP OR fingerprint — either match is enough.
 * Voting closes: 2026-06-03 (Portugal / WEST = UTC+1)
 */

// deno-lint-ignore-file no-explicit-any

const VOTE_END = new Date('2026-06-03T23:59:59+01:00').getTime();

const SUPABASE_URL = 'https://hwfgehcmvggpdskrbzja.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3ZmdlaGNtdmdncGRza3JiemphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NTY0MTIsImV4cCI6MjA4NzUzMjQxMn0.AXcKCAvC-GeR8AlaokgVr2byX9PgcYwdexbMotrJK8g';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

async function sbFetch(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: opts.method === 'POST' ? 'return=minimal' : 'return=representation',
      ...(opts.headers ?? {}),
    },
  });
  const text = await res.text();
  return { status: res.status, data: text ? JSON.parse(text) : null };
}

async function findVote(field: string, value: string, season: string) {
  const params = new URLSearchParams({
    select: 'player_id',
    season: `eq.${season}`,
    [field]: `eq.${value}`,
    limit: '1',
  });
  const { status, data } = await sbFetch(`votacoes_melhor_jogador?${params}`);
  if (status === 200 && Array.isArray(data) && data.length > 0) return data[0].player_id as number;
  return null;
}

export default async (request: Request, context: any) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  // context.ip is the real client IP provided by Netlify — cannot be faked by the browser
  const ip: string = context?.ip ?? request.headers.get('x-nf-client-connection-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  // ── GET: check if already voted ──────────────────────────────────────────
  if (request.method === 'GET') {
    const url = new URL(request.url);
    const season = url.searchParams.get('season') ?? '';
    const fp = url.searchParams.get('fp') ?? '';

    const byIp = await findVote('voter_ip', ip, season);
    if (byIp !== null) return json({ voted: true, player_id: byIp });

    if (fp) {
      const byFp = await findVote('voter_fingerprint', fp, season);
      if (byFp !== null) return json({ voted: true, player_id: byFp });
    }

    return json({ voted: false });
  }

  // ── POST: submit vote ─────────────────────────────────────────────────────
  if (request.method === 'POST') {
    if (Date.now() > VOTE_END) return json({ ok: false, reason: 'closed' }, 403);

    let playerId: number, season: string, fingerprint: string;
    try {
      ({ playerId, season, fingerprint } = await request.json());
    } catch {
      return json({ ok: false, reason: 'bad_request' }, 400);
    }

    // Block by IP
    const byIp = await findVote('voter_ip', ip, season);
    if (byIp !== null) return json({ ok: false, reason: 'already_voted', player_id: byIp }, 409);

    // Block by fingerprint
    const byFp = await findVote('voter_fingerprint', fingerprint, season);
    if (byFp !== null) return json({ ok: false, reason: 'already_voted', player_id: byFp }, 409);

    // Insert vote
    const { status, data } = await sbFetch('votacoes_melhor_jogador', {
      method: 'POST',
      body: JSON.stringify({
        player_id: playerId,
        season,
        voter_fingerprint: fingerprint,
        voter_ip: ip,
      }),
    });

    if (status === 409 || data?.code === '23505') {
      const existing = await findVote('voter_fingerprint', fingerprint, season)
        ?? await findVote('voter_ip', ip, season);
      return json({ ok: false, reason: 'already_voted', player_id: existing }, 409);
    }

    if (status >= 400) {
      return json({ ok: false, reason: 'db_error', detail: data }, 500);
    }

    return json({ ok: true });
  }

  return new Response('Method Not Allowed', { status: 405, headers: CORS });
};

export const config = { path: '/api/vote-player' };
