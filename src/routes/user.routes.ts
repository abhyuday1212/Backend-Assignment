import { Router } from "express";

import { logoutUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = Router();

// Secured routes
// routes accessible for user with valid token only (protected via middleware)
router.get("/profile", verifyToken, getUserProfile);
router.post("/logout", verifyToken, logoutUser);
router.patch("/update", verifyToken, updateUserProfile);

export default router;
