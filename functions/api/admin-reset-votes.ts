/**
 * Cloudflare Pages Function — /api/admin-reset-votes
 * Deletes all votes for a season using the Supabase service role key (bypasses RLS).
 * Protected by ADMIN_RESET_SECRET env var.
 */

interface Env {
  SUPABASE_SERVICE_ROLE_KEY: string;
  ADMIN_RESET_SECRET: string;
}

const SUPABASE_URL = 'https://hwfgehcmvggpdskrbzja.supabase.co';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

export const onRequestOptions = () =>
  new Response(null, { status: 204, headers: CORS });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  const adminSecret = env.ADMIN_RESET_SECRET ?? '';

  if (!serviceKey) {
    return json({ ok: false, reason: 'service_key_not_configured' }, 500);
  }

  let season: string, secret: string;
  try {
    ({ season, secret } = await request.json());
  } catch {
    return json({ ok: false, reason: 'bad_request' }, 400);
  }

  if (!adminSecret || secret !== adminSecret) {
    return json({ ok: false, reason: 'unauthorized' }, 401);
  }

  if (!season) {
    return json({ ok: false, reason: 'missing_season' }, 400);
  }

  // Count rows before delete
  const countRes = await fetch(
    `${SUPABASE_URL}/rest/v1/votacoes_melhor_jogador?select=id&season=eq.${encodeURIComponent(season)}`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: 'count=exact',
        'Range-Unit': 'items',
        Range: '0-0',
      },
    },
  );
  const contentRange = countRes.headers.get('content-range') ?? '';
  const total = parseInt(contentRange.split('/')[1] ?? '0', 10);

  // Delete all votes for this season
  const delRes = await fetch(
    `${SUPABASE_URL}/rest/v1/votacoes_melhor_jogador?season=eq.${encodeURIComponent(season)}`,
    {
      method: 'DELETE',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: 'return=minimal',
      },
    },
  );

  if (!delRes.ok) {
    const text = await delRes.text();
    return json({ ok: false, reason: 'db_error', detail: text }, 500);
  }

  return json({ ok: true, deleted: total });
};
