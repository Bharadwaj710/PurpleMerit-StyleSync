import { Router } from 'express';
import {
  createTokensController,
  getTokensController,
  lockTokenController,
  updateTokensController,
} from '../controllers/token.controller.js';

export const tokenRouter = Router();

tokenRouter.get('/:id', getTokensController);
tokenRouter.post('/', createTokensController);
tokenRouter.put('/:id', updateTokensController);
tokenRouter.post('/lock-token', lockTokenController);
