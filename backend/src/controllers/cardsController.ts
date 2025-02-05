import { Request, Response } from "express";
import {
  createCardService,
  getCardsByUserService,
} from "../services/cardService";
import prisma from "../services/userService";

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
    res.status(500).json({
      error: "Erreur lors de la création de la carte",
      message: err.message,
    });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.card.delete({ where: { id } });
    res.json({ message: "Carte supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la carte" });
  }
};

export const updateCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, number, serie, bloc, imageUrl } = req.body;

  try {
    const card = await prisma.card.update({
      where: { id },
      data: {
        name,
        number,
        serie,
        bloc,
        imageUrl,
      },
    });
    res.status(200).json({ message: "Carte modifiée avec succès", card });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      error: "Erreur lors de la modification de la carte",
      message: err.message,
    });
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
