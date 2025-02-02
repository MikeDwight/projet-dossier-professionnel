import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { log } from "node:console";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur l'API Pokémon collection !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🟢 Serveur demarré sur le port : ${PORT}`);
});
