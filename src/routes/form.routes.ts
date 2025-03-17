import { Router } from "express";

import { getDetails, getDetailsByEmail, uploadUserDetails } from "../controllers/form.controller.js";

const router = Router();

// routes accessible for user with valid token only (protected via middleware)
router.post("/details", uploadUserDetails);
router.get("/details", getDetails);
router.get("/details/:email", getDetailsByEmail);


export default router;
