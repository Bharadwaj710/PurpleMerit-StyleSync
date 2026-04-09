import { scrapeSite } from '../services/scrape.service.js';
import { createScrapedSiteRecord, createScrapedTokenRecord } from '../services/token.service.js';
import { normalizeUrl } from '../utils/normalize-url.js';

export async function scrapeSiteController(req, res, next) {
  try {
    const url = normalizeUrl(req.body?.url);

    if (!url) {
      return res.status(400).json({
        message: 'Enter a valid website URL to analyze.',
      });
    }

    const result = await scrapeSite(url);
    const site = await createScrapedSiteRecord({
      url,
      status: result.status,
    });
    const tokenSet = await createScrapedTokenRecord({
      siteId: site.id,
      tokens: result.tokens,
    });

    return res.status(200).json({
      status: result.status,
      mode: result.mode,
      title: result.title,
      warnings: result.warnings,
      site,
      tokenSet,
      locks: [],
    });
  } catch (error) {
    next(error);
  }
}
