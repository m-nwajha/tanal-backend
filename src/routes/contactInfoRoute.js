import { Router } from 'express';
import withApiKeyProtection from '../middlewares/apiKey.js';
import {
  createContactInfo,
  deleteContactInfo,
  getAllContactInfo,
  updateContactInfo,
} from '../controllers/contactInfoController.js';

const router = Router();

router.get('/contact-info', withApiKeyProtection, getAllContactInfo);
router.post('/contact-info', withApiKeyProtection, createContactInfo);
router.put('/contact-info/:id', withApiKeyProtection, updateContactInfo);
router.delete('/contact-info/:id', withApiKeyProtection, deleteContactInfo);
export default router;
