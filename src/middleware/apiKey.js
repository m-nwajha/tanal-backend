import { API_KEY } from '../config/apiKey.js';

const apiKeyMiddleware = (req, res, next) => {
  const key = req.header('x-api-key');

  if (!key || key !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

export default apiKeyMiddleware;
