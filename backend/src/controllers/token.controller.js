import {
  createTokenRecord,
  getTokenRecord,
  lockToken,
  updateTokenRecord,
} from '../services/token.service.js';

export async function getTokensController(req, res, next) {
  try {
    const tokenRecord = await getTokenRecord(req.params.id);
    if (!tokenRecord) {
      return res.status(404).json({
        message: 'We could not find that token set.',
      });
    }
    res.json(tokenRecord);
  } catch (error) {
    next(error);
  }
}

export async function createTokensController(req, res, next) {
  try {
    const created = await createTokenRecord(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

export async function updateTokensController(req, res, next) {
  try {
    if (!req.body?.colors || !req.body?.typography || !req.body?.spacing) {
      return res.status(400).json({
        message: 'Token updates must include colors, typography, and spacing.',
      });
    }

    const updated = await updateTokenRecord(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function lockTokenController(req, res, next) {
  try {
    if (!req.body?.siteId || !req.body?.tokenKey) {
      return res.status(400).json({
        message: 'Lock updates require a site id and token key.',
      });
    }

    const result = await lockToken(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
