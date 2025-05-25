import express from 'express';
import {
  createClient,
  deleteClient,
  getAllClients,
  getClientById,
  updateClient,
} from '../controllers/clientsController.js';
import withApiKeyProtection from '../middlewares/apiKey.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/clients', withApiKeyProtection, getAllClients);

router.get('/clients/:id', withApiKeyProtection, getClientById);

router.post(
  '/clients',
  withApiKeyProtection,
  upload.single('image'),
  createClient
);

router.put(
  '/clients/:id',
  withApiKeyProtection,
  upload.single('image'),
  updateClient
);

router.delete('/clients/:id', withApiKeyProtection, deleteClient);

export default router;
