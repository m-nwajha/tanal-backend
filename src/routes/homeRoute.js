import { Router } from 'express';
import { getHomeData } from '../controllers/homeController';
import apiKeyMiddleware from '../middleware/apiKey.js';

const router = Router();

router.use(apiKeyMiddleware);
router.get('/home', getHomeData);

export default router;
