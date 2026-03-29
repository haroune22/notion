import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { inviteAccept, inviteRefuse } from "../controllers/inviteController";

const router = express.Router()


router.post('/:token/accept', authMiddleware, inviteAccept)
router.post('/:token/refuse', authMiddleware, inviteRefuse)



export default router