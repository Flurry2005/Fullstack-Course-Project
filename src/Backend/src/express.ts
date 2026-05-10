import express from "express";
import cors from "cors";
import morgan from "morgan";
import { routerr as mainRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";
export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.set("trust proxy", 1);

const allowedOrigins = [
  "https://frontend-w1uy.onrender.com",
  "http://localhost:5173",
  "https://fullstack.liamjorgensen.dev",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);

app.use(mainRouter);
