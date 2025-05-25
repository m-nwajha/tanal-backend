import { Router } from 'express';
import withApiKeyProtection from '../middlewares/apiKey.js';
import {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
} from '../controllers/goalsController.js';

const router = Router();

router.get('/goals', withApiKeyProtection, getAllGoals);
router.get('/goals/:id', withApiKeyProtection, getGoalById);
router.post('/goals', withApiKeyProtection, createGoal);
router.put('/goals/:id', withApiKeyProtection, updateGoal);
router.delete('/goals/:id', withApiKeyProtection, deleteGoal);

export default router;
