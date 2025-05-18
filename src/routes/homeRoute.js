import { Router } from 'express';
import { getHomeData } from '../controllers/homeController.js';
import apiKeyMiddleware from '../middlewares/apiKey.js';

const router = Router();

router.use(apiKeyMiddleware);
router.get('/home', getHomeData);

export default router;
