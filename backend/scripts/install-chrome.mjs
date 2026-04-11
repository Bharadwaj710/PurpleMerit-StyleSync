import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(__dirname, '..');
const cacheDir = process.env.PUPPETEER_CACHE_DIR || path.join(backendRoot, '.cache', 'puppeteer');

mkdirSync(cacheDir, { recursive: true });

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const result = spawnSync(command, ['puppeteer', 'browsers', 'install', 'chrome'], {
  cwd: backendRoot,
  stdio: 'inherit',
  env: {
    ...process.env,
    PUPPETEER_CACHE_DIR: cacheDir,
  },
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
