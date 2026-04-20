import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getInviteDetails, inviteAccept, inviteRefuse } from "../controllers/inviteController.js";

const router = express.Router()

router.get('/:token', authMiddleware, getInviteDetails)
router.post('/:token/accept', authMiddleware, inviteAccept)
router.post('/:token/refuse', authMiddleware, inviteRefuse)



export default router