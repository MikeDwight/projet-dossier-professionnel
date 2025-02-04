import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import cardRoutes from "./routes/cards";
import { errorHandler } from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/cards", cardRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🟢 Serveur démarré sur le port : ${PORT}`);
});
