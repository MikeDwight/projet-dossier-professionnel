import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createCard,
  deleteCard,
  getUserCards,
  updateCard,
} from "../controllers/cardsController";

const router = express.Router();

router.get("/:userId", authMiddleware, getUserCards);
router.post("/", authMiddleware, createCard);
router.delete("/:id", authMiddleware, deleteCard);
router.put("/:id", authMiddleware, updateCard);

export default router;
