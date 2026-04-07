import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { deleteTask, getTask } from '../controllers/taskController.js';
import { createComment, deleteComment, getComments } from '../controllers/commentController.js';


const router = express.Router();

// Mock data for tasks
// get task for user(member)
router.get('/', authMiddleware, getTask) 

//comments
router.get('/:taskId/comments', authMiddleware, getComments)
router.post('/:taskId/comments', authMiddleware, createComment)
router.delete('/:taskId/comments/:commentId', authMiddleware, deleteTask)


// todo: update task for user(only status )

export default router;