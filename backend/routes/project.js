import express from "express";
import {
  deleteProject,
  getProject,
  getProjects,
} from "../controllers/projectController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.delete("/:id", authMiddleware, deleteProject);
router.get('/my', authMiddleware, getProject)

export default router;
