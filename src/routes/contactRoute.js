import { Router } from 'express';
import withApiKeyProtection from '../middlewares/apiKey.js';
import {
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  getAllContacts,
} from '../controllers/contactController.js';

const router = Router();

router.get('/contact', withApiKeyProtection, getAllContacts);
router.get('/contact/:id', withApiKeyProtection, getContactById);
router.post('/contact', withApiKeyProtection, createContact);
router.put('/contact/:id', withApiKeyProtection, updateContact);
router.delete('/contact/:id', withApiKeyProtection, deleteContact);
export default router;
