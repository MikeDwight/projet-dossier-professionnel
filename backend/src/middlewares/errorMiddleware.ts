import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.messassage);
  res.status(400).json({ error: err.message || "Une erreur est survenue" });
};
