import { Request, Response } from "express";
import {
  createCardService,
  getCardsByUserService,
} from "../services/cardService";

export const createCard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, number, serie, bloc, imageUrl } = req.body;
    const userId = req.body.user.id;

    const card = await createCardService(
      userId,
      name,
      number,
      serie,
      bloc,
      imageUrl
    );
    res.status(201).json({ message: "Carte ajoutée avec succès", card });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: "Erreur serveur", message: err.message });
  }
};

export const getUserCards = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.body.user.id;
    const cards = await getCardsByUserService(userId);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
