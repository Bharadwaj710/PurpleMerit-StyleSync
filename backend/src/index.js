import { app } from './app.js';
import { env } from './config/env.js';
import { verifySupabaseConnection } from './config/supabase.js';

app.listen(env.PORT, async () => {
  console.log(`StyleSync API listening on http://localhost:${env.PORT}`);

  const supabaseStatus = await verifySupabaseConnection();
  console.log(`[supabase] ${supabaseStatus.message}`);
});
