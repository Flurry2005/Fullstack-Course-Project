import { Router } from "express";
import gigController from "../controllers/gigController";

export const gigRouter = Router();

gigRouter.post("/", async (req, res) => {
  const newGig = req.body;
  return (await gigController.createGig(newGig))
    ? res.status(201).json("Great success")
    : res.status(400).json("Could not publish gig");
});
