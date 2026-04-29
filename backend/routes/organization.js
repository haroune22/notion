import express from "express";
import {
  CreateInvitation,
  CreateOrganization,
  deleteOrganization,
  getMyOrg,
  getOrganization,
  getOrgMembers,
  leaveOrg,
} from "../controllers/organizationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { CreateProject, getProjects } from "../controllers/projectController.js";

const router = express.Router();

router.post("/", authMiddleware, CreateOrganization);
router.get('/', authMiddleware, getOrganization);
router.get('/me/:id', authMiddleware, getMyOrg)
router.delete('/:id/leave', authMiddleware, leaveOrg)
router.delete("/:orgId", authMiddleware, deleteOrganization);;
router.post('/:orgId/invites', authMiddleware, CreateInvitation);
router.get('/:id/members', authMiddleware, getOrgMembers);
// create project:
router.post("/:orgId/projects", authMiddleware, CreateProject);
router.get('/:orgId/projects', authMiddleware, getProjects);

export default router;
