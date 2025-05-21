import express from 'express';
import withApiKeyProtection from '../middlewares/apiKey.js';
import upload from '../middlewares/upload.js';
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/project', withApiKeyProtection, getAllProjects);

router.get('/project/:id', withApiKeyProtection, getProjectById);

router.post(
  '/project',
  withApiKeyProtection,
  upload.single('image'),
  createProject
);

router.put(
  '/project/:id',
  withApiKeyProtection,
  upload.single('image'),
  updateProject
);

router.delete('/Project/:id', withApiKeyProtection, deleteProject);

export default router;
