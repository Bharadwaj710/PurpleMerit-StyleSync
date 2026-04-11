import puppeteer from 'puppeteer';
import { Vibrant } from 'node-vibrant/node';
import { env } from '../config/env.js';
import { buildFallbackTokens, classifyPersonality, createBaseTokens } from '../utils/token-helpers.js';

function getBrowserLaunchOptions() {
  const launchOptions = {
    headless: env.PUPPETEER_HEADLESS,
    protocolTimeout: env.PUPPETEER_PROTOCOL_TIMEOUT,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-zygote',
    ],
  };

  if (env.PUPPETEER_EXECUTABLE_PATH) {
    launchOptions.executablePath = env.PUPPETEER_EXECUTABLE_PATH;
  }

  return launchOptions;
}

function logScrapeFailure(stage, url, error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[scrape] ${stage} failed for ${url}: ${message}`);

  if (error instanceof Error && error.stack && env.NODE_ENV !== 'production') {
    console.error(error.stack);
  }
}

export async function scrapeSite(url) {
  let browser;

  try {
    browser = await puppeteer.launch(getBrowserLaunchOptions());

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    );

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: env.PUPPETEER_NAVIGATION_TIMEOUT,
    });

    const extracted = await page.evaluate(() => {
      const sampleNodes = Array.from(
        document.querySelectorAll('body, h1, h2, h3, p, span, a, button, input, section, div'),
      ).slice(0, 200);

      const colors = [];
      const fonts = [];
      const fontSizes = [];
      const spacingValues = [];

      for (const node of sampleNodes) {
        const style = window.getComputedStyle(node);
        const fg = style.color;
        const bg = style.backgroundColor;
        const font = style.fontFamily;
        const fontSize = style.fontSize;
        const paddingTop = parseInt(style.paddingTop, 10);
        const marginTop = parseInt(style.marginTop, 10);

        if (fg && fg !== 'rgba(0, 0, 0, 0)') colors.push(fg);
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') colors.push(bg);
        if (font) fonts.push(font);
        if (fontSize) fontSizes.push(fontSize);
        if (!Number.isNaN(paddingTop) && paddingTop > 0) spacingValues.push(paddingTop);
        if (!Number.isNaN(marginTop) && marginTop > 0) spacingValues.push(marginTop);
      }

      const heroImageObj = document.querySelector('meta[property="og:image"]')?.content || document.querySelector('img')?.src || null;
      let globalBg = window.getComputedStyle(document.body).backgroundColor;
      if (globalBg === 'rgba(0, 0, 0, 0)' || globalBg === 'transparent') {
        globalBg = null;
      }

      return {
        title: document.title,
        colors,
        fonts,
        fontSizes,
        spacingValues,
        imageUrl: heroImageObj,
        globalBg,
      };
    });

    let imagePalette = null;
    if (extracted.imageUrl) {
      try {
        const palette = await Vibrant.from(extracted.imageUrl).getPalette();
        imagePalette = {
          vibrant: palette.Vibrant?.hex,
          muted: palette.Muted?.hex,
          darkVibrant: palette.DarkVibrant?.hex,
          lightVibrant: palette.LightVibrant?.hex,
        };
      } catch (err) {
        // Ignore image fetching/processing errors silently
      }
    }

    const tokens = createBaseTokens({
      url,
      colors: extracted.colors,
      imagePalette,
      globalBg: extracted.globalBg,
      fonts: extracted.fonts,
      fontSizes: extracted.fontSizes,
      spacingValues: extracted.spacingValues,
    });

    tokens.metadata.personality = classifyPersonality(tokens);
    tokens.metadata.pageTitle = extracted.title;

    return {
      status: 'success',
      mode: 'scraped',
      title: extracted.title,
      tokens,
      warnings: [],
    };
  } catch (error) {
    logScrapeFailure('Scrape pipeline', url, error);

    const fallbackTokens = buildFallbackTokens(url);
    fallbackTokens.metadata.pageTitle = new URL(url).hostname;

    return {
      status: 'partial',
      mode: 'fallback',
      title: new URL(url).hostname,
      tokens: fallbackTokens,
      warnings: [
        'Automatic scraping was limited for this website. You can continue by editing the generated starter tokens manually.',
      ],
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
