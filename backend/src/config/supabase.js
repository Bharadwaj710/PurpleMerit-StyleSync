import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

export const supabase =
  env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;

export async function verifySupabaseConnection() {
  if (!supabase) {
    return {
      ok: false,
      reason: 'missing_env',
      message: 'Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
    };
  }

  try {
    const { error } = await supabase.from('scraped_sites').select('id', { head: true, count: 'exact' });

    if (error) {
      return {
        ok: false,
        reason: 'query_failed',
        message: `Supabase connection failed: ${error.message}`,
      };
    }

    return {
      ok: true,
      reason: 'connected',
      message: 'Supabase connection verified.',
    };
  } catch (error) {
    return {
      ok: false,
      reason: 'unexpected_error',
      message: `Supabase connection failed: ${error.message}`,
    };
  }
}
