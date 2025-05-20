import { Router } from 'express';
import withApiKeyProtection from '../middlewares/apiKey.js';
import {
  getAllCounters,
  getCounterById,
  createCounter,
  updateCounter,
  deleteCounter,
} from '../controllers/counterController.js';

const router = Router();

router.get('/counter', withApiKeyProtection, getAllCounters);
router.get('/counter/:id', withApiKeyProtection, getCounterById);
router.post('/counter', withApiKeyProtection, createCounter);
router.put('/counter/:id', withApiKeyProtection, updateCounter);
router.delete('/counter/:id', withApiKeyProtection, deleteCounter);
export default router;
