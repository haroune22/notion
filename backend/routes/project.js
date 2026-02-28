import express from "express";
import {
  deleteProject,
  getProject,
  getProjects,
} from "../controllers/projectController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addTask, getTasks } from "../controllers/taskController.js";

const router = express.Router();

router.delete("/:id", authMiddleware, deleteProject);
router.get('/my', authMiddleware, getProject)

// get the admin tasks that he created in the project
router.get('/:id/task', authMiddleware, getTasks)

router.post('/:id/task', authMiddleware, addTask)

// todo: update project
export default router;
