import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import cardRoutes from "./routes/cards";
import { errorHandler } from "./middlewares/errorMiddleware";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
export default app;
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/cards", cardRoutes);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🟢 Serveur démarré sur le port : ${PORT}`);
  });
}
