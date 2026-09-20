import express from "express";

import {
  registerUser,
  loginUser,
  loginWithGoogle,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.post("/google", loginWithGoogle);

export default router;
