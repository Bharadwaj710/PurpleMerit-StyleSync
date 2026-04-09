import { supabase } from '../config/supabase.js';

function requireSupabase() {
  if (!supabase) {
    const error = new Error('Supabase is not configured. Add backend environment variables before running the API.');
    error.statusCode = 500;
    error.publicMessage = 'Backend storage is not configured yet. Add Supabase credentials and try again.';
    throw error;
  }

  return supabase;
}

function mapTokenRecord(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    siteId: row.site_id,
    colors: row.colors,
    typography: row.typography,
    spacing: row.spacing,
    metadata: row.metadata || {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapLockRecords(rows = []) {
  return rows.map((row) => ({
    id: row.id,
    siteId: row.site_id,
    tokenKey: row.token_key,
    isLocked: row.is_locked,
    createdAt: row.created_at,
  }));
}

export async function createScrapedSiteRecord({ url, status }) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('scraped_sites')
    .insert({
      url,
      status,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    url: data.url,
    status: data.status,
    createdAt: data.created_at,
  };
}

export async function createScrapedTokenRecord({ siteId, tokens }) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('design_tokens')
    .insert({
      site_id: siteId,
      colors: tokens.colors,
      typography: tokens.typography,
      spacing: tokens.spacing,
      metadata: tokens.metadata,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapTokenRecord(data);
}

export async function getTokenRecord(id) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('design_tokens')
    .select(
      `
      id,
      site_id,
      colors,
      typography,
      spacing,
      metadata,
      created_at,
      updated_at,
      scraped_sites (
        id,
        url,
        status,
        created_at
      )
    `,
    )
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  const { data: locks, error: lockError } = await client
    .from('locked_tokens')
    .select('id, site_id, token_key, is_locked, created_at')
    .eq('site_id', data.site_id);

  if (lockError) {
    throw lockError;
  }

  return {
    tokenSet: mapTokenRecord(data),
    site: {
      id: data.scraped_sites.id,
      url: data.scraped_sites.url,
      status: data.scraped_sites.status,
      createdAt: data.scraped_sites.created_at,
    },
    locks: mapLockRecords(locks),
  };
}

export async function createTokenRecord(payload) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('design_tokens')
    .insert({
      site_id: payload.siteId,
      colors: payload.colors,
      typography: payload.typography,
      spacing: payload.spacing,
      metadata: payload.metadata || {},
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapTokenRecord(data);
}

export async function updateTokenRecord(id, payload) {
  const client = requireSupabase();

  const { data: previous, error: fetchError } = await client
    .from('design_tokens')
    .select('site_id, colors, typography, spacing')
    .eq('id', id)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  await client.from('version_history').insert({
    site_id: previous.site_id,
    previous_tokens: { colors: previous.colors, typography: previous.typography, spacing: previous.spacing },
    updated_tokens: { colors: payload.colors, typography: payload.typography, spacing: payload.spacing },
  });

  const { data, error } = await client
    .from('design_tokens')
    .update({
      colors: payload.colors,
      typography: payload.typography,
      spacing: payload.spacing,
      metadata: payload.metadata || {},
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapTokenRecord(data);
}

export async function lockToken(payload) {
  const client = requireSupabase();
  const { siteId, tokenKey, isLocked } = payload;

  const { data: existing, error: existingError } = await client
    .from('locked_tokens')
    .select('id')
    .eq('site_id', siteId)
    .eq('token_key', tokenKey)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing) {
    const { data, error } = await client
      .from('locked_tokens')
      .update({
        is_locked: Boolean(isLocked),
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      id: data.id,
      siteId: data.site_id,
      tokenKey: data.token_key,
      isLocked: data.is_locked,
      createdAt: data.created_at,
    };
  }

  const { data, error } = await client
    .from('locked_tokens')
    .insert({
      site_id: siteId,
      token_key: tokenKey,
      is_locked: Boolean(isLocked),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    siteId: data.site_id,
    tokenKey: data.token_key,
    isLocked: data.is_locked,
    createdAt: data.created_at,
  };
}
