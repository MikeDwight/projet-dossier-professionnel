import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createCard, getUserCards } from "../controllers/cardsController";

const router = express.Router();

router.get("/:userId", authMiddleware, getUserCards);
router.post("/", authMiddleware, createCard);

export default router;
