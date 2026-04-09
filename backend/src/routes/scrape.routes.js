import { Router } from 'express';
import { scrapeSiteController } from '../controllers/scrape.controller.js';

export const scrapeRouter = Router();

scrapeRouter.post('/', scrapeSiteController);
