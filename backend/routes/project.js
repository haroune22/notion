import express from "express";
import {
  deleteProject,
  getProject,
} from "../controllers/projectController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addTask, deleteTask, getTasks } from "../controllers/taskController.js";

const router = express.Router();

router.delete("/:id", authMiddleware, deleteProject);
router.get('/my', authMiddleware, getProject)
// todo: update project

// get the admin tasks that he created in the project
router.get('/:id/task', authMiddleware, getTasks)

router.post('/:id/task', authMiddleware, addTask)
router.delete('/:id/task/:taskId', authMiddleware, deleteTask)
// update task: for admin update all fields

export default router;
