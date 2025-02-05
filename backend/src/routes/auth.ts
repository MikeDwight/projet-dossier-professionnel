import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
