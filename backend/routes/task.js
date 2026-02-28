import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getTask } from '../controllers/taskController.js';


const router = express.Router();

// Mock data for tasks
// get task for user(member)
router.get('/', authMiddleware, getTask) 

export default router;