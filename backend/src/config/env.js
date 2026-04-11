import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();

const puppeteerCacheDir = process.env.PUPPETEER_CACHE_DIR || path.resolve(process.cwd(), '.cache', 'puppeteer');
process.env.PUPPETEER_CACHE_DIR = puppeteerCacheDir;

export const env = {
  PORT: Number(process.env.PORT || 4000),
  CORS_ORIGIN: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173', 'https://purple-merit-style-sync-frontend.vercel.app'],
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  PUPPETEER_HEADLESS: process.env.PUPPETEER_HEADLESS !== 'false',
  PUPPETEER_EXECUTABLE_PATH: process.env.PUPPETEER_EXECUTABLE_PATH || '',
  PUPPETEER_CACHE_DIR: puppeteerCacheDir,
  PUPPETEER_NAVIGATION_TIMEOUT: Number(process.env.PUPPETEER_NAVIGATION_TIMEOUT || 45000),
  PUPPETEER_PROTOCOL_TIMEOUT: Number(process.env.PUPPETEER_PROTOCOL_TIMEOUT || 60000),
  NODE_ENV: process.env.NODE_ENV || 'development',
};
