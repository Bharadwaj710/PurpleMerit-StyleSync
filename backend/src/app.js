import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { scrapeRouter } from './routes/scrape.routes.js';
import { tokenRouter } from './routes/token.routes.js';

export const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
  }),
);
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'stylesync-api' });
});

app.use('/scrape', scrapeRouter);
app.use('/tokens', tokenRouter);

app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    message: err.publicMessage || 'Something went wrong while processing your request.',
  });
});
