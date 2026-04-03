import express from "express";
import cors from "cors";
import morgan from "morgan";
import { routerr as mainRouter } from "./routes/index.js";
export const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "https://frontend-w1uy.onrender.com",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);

app.use(mainRouter);
