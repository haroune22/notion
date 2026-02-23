import express from "express";
import {
  CreateOrganization,
  deleteOrganization,
} from "../controllers/organizationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, CreateOrganization);
router.post("/delete/:id", authMiddleware, deleteOrganization);

export default router;
