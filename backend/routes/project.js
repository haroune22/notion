import express from "express";
import {
  deleteProject,
  getProjects,
} from "../controllers/projectController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.delete("/:id", authMiddleware, deleteProject);

export default router;
