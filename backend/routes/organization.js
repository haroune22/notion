import express from "express";
import {
  CreateOrganization,
  deleteOrganization,
} from "../controllers/organizationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { CreateProject, getProjects } from "../controllers/projectController.js";

const router = express.Router();

router.post("/", authMiddleware, CreateOrganization);
router.delete("/:orgId", authMiddleware, deleteOrganization);
// create project:
router.post("/:orgId/projects", authMiddleware, CreateProject);
router.get('/:orgId/projects', authMiddleware, getProjects)

export default router;
