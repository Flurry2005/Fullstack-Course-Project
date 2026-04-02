import express from "express";
import { routerr as mainRouter } from "./routes/index.js";
export const app = express();
app.use(express.json());

app.use(mainRouter);
