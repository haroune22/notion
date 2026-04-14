import express from "express";
import { getMe, Login, Logout, Register } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", authMiddleware, Logout);

//fetching the user
router.get('/me',authMiddleware, getMe)

export default router;
