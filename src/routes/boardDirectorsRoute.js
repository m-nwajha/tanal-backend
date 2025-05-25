import express from 'express';
import {
  createBoardDirectors,
  deleteBoardDirectors,
  getAllBoardDirectors,
  getBoardDirectorsById,
  updateBoardDirectors,
} from '../controllers/boardDirectorsController.js';
import withApiKeyProtection from '../middlewares/apiKey.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get('/board-directors', withApiKeyProtection, getAllBoardDirectors);

router.get('/board-directors/:id', withApiKeyProtection, getBoardDirectorsById);

router.post(
  '/board-directors',
  withApiKeyProtection,
  upload.single('image'),
  createBoardDirectors
);

router.put(
  '/board-directors/:id',
  withApiKeyProtection,
  upload.single('image'),
  updateBoardDirectors
);

router.delete('/board-directors/:id', withApiKeyProtection, deleteBoardDirectors);

export default router;
