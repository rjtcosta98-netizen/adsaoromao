/**
 * Netlify Edge Function — /api/vote-player
 *
 * Handles voting with server-side IP extraction.
 * The client JS cannot spoof the IP — only the server reads it.
 *
 * POST  — submit a vote
 * GET   — check if already voted (by IP or fingerprint)
 */

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

/** Extract the real client IP from Netlify headers */
function getClientIp(req: Request): string {
  return (
    req.headers.get('x-nf-client-connection-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

async function supabaseQuery(
  table: string,
  method: 'GET' | 'POST',
  params?: Record<string, string>,
  body?: unknown,
) {
  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    method,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: method === 'POST' ? 'return=minimal' : 'return=representation',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  return { status: res.status, data: text ? JSON.parse(text) : null };
}

export default async (request: Request) => {
  // Preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  const ip = getClientIp(request);

  // ── GET: check if already voted ────────────────────────────────────────────
  if (request.method === 'GET') {
    const url = new URL(request.url);
    const season = url.searchParams.get('season') ?? '';
    const fp = url.searchParams.get('fp') ?? '';

    // Check by IP
    const byIp = await supabaseQuery('votacoes_melhor_jogador', 'GET', {
      select: 'player_id',
      season: `eq.${season}`,
      voter_ip: `eq.${ip}`,
      limit: '1',
    });

    if (byIp.status === 200 && Array.isArray(byIp.data) && byIp.data.length > 0) {
      return json({ voted: true, player_id: byIp.data[0].player_id });
    }

    // Check by fingerprint
    if (fp) {
      const byFp = await supabaseQuery('votacoes_melhor_jogador', 'GET', {
        select: 'player_id',
        season: `eq.${season}`,
        voter_fingerprint: `eq.${fp}`,
        limit: '1',
      });
      if (byFp.status === 200 && Array.isArray(byFp.data) && byFp.data.length > 0) {
        return json({ voted: true, player_id: byFp.data[0].player_id });
      }
    }

    return json({ voted: false });
  }

  // ── POST: submit vote ───────────────────────────────────────────────────────
  if (request.method === 'POST') {
    let body: { playerId: number; season: string; fingerprint: string };
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, reason: 'bad_request' }, 400);
    }

    const { playerId, season, fingerprint } = body;

    // 1. Check IP
    const byIp = await supabaseQuery('votacoes_melhor_jogador', 'GET', {
      select: 'player_id',
      season: `eq.${season}`,
      voter_ip: `eq.${ip}`,
      limit: '1',
    });
    if (byIp.status === 200 && Array.isArray(byIp.data) && byIp.data.length > 0) {
      return json({ ok: false, reason: 'already_voted', player_id: byIp.data[0].player_id }, 409);
    }

    // 2. Check fingerprint
    const byFp = await supabaseQuery('votacoes_melhor_jogador', 'GET', {
      select: 'player_id',
      season: `eq.${season}`,
      voter_fingerprint: `eq.${fingerprint}`,
      limit: '1',
    });
    if (byFp.status === 200 && Array.isArray(byFp.data) && byFp.data.length > 0) {
      return json({ ok: false, reason: 'already_voted', player_id: byFp.data[0].player_id }, 409);
    }

    // 3. Insert vote
    const insert = await supabaseQuery('votacoes_melhor_jogador', 'POST', undefined, {
      player_id: playerId,
      season,
      voter_fingerprint: fingerprint,
      voter_ip: ip,
    });

    if (insert.status >= 400) {
      // Unique constraint violation caught here too
      if (insert.status === 409 || (Array.isArray(insert.data) ? false : insert.data?.code === '23505')) {
        return json({ ok: false, reason: 'already_voted' }, 409);
      }
      return json({ ok: false, reason: 'db_error' }, 500);
    }

    return json({ ok: true });
  }

  return new Response('Method Not Allowed', { status: 405, headers: CORS });
};

export const config = { path: '/api/vote-player' };
