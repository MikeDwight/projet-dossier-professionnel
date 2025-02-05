import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ error: "Non autorisé" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalide" });
  }
};
