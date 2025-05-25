import { Router } from 'express';
import withApiKeyProtection from '../middlewares/apiKey.js';
import {
  getAllWhyTanal,
  getWhyTanalById,
  createWhyTanal,
  updateWhyTanal,
  deleteWhyTanal,
} from '../controllers/whyTanalController.js';

const router = Router();

router.get('/why-tanal', withApiKeyProtection, getAllWhyTanal);
router.get('/why-tanal/:id', withApiKeyProtection, getWhyTanalById);
router.post('/why-tanal', withApiKeyProtection, createWhyTanal);
router.put('/why-tanal/:id', withApiKeyProtection, updateWhyTanal);
router.delete('/why-tanal/:id', withApiKeyProtection, deleteWhyTanal);

export default router;
