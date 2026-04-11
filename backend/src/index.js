import { app } from './app.js';
import { env } from './config/env.js';
import { verifySupabaseConnection } from './config/supabase.js';

app.listen(env.PORT, async () => {
  console.log(`StyleSync API listening on port ${env.PORT}`);
  console.log(
    `[scrape] Puppeteer launch config: headless=${env.PUPPETEER_HEADLESS}, executablePath=${
      env.PUPPETEER_EXECUTABLE_PATH || 'bundled-browser'
    }, cacheDir=${env.PUPPETEER_CACHE_DIR}`,
  );

  const supabaseStatus = await verifySupabaseConnection();
  console.log(`[supabase] ${supabaseStatus.message}`);
});
