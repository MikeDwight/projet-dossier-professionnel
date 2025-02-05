import { Request, Response } from "express";
import {
  createUserService,
  getUserByEmailService,
} from "../services/userService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Inscription
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, firstname, lastname } = req.body;

    const existingUser = await getUserByEmailService(email);
    if (existingUser) {
      res.status(400).json({ error: "L'utilisateur existe déjà" });
      return;
    }

    const user = await createUserService(email, password, firstname, lastname);

    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Une erreur inconnue est survenue." });
    }
  }
};

// Connexion
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmailService(email);
    if (!user) {
      res.status(401).json({ error: "Identifiants incorrects" });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: "Identifiants incorrects" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
