import { Router } from "express";
import gigController from "../controllers/gigController";
import { jwtMiddleware } from "../middleware/jwtMiddleware.js";



export const gigRouter = Router();

gigRouter.get("/", async (_req, res) => {
  const gigs = await gigController.getGigs();

  return gigs
    ? res.status(200).json(gigs)
    : res.status(500).json("Could not fetch gigs");
});

gigRouter.get("/:id", async (req, res) => {
  const gig = await gigController.getGigById(req);

  return gig
    ? res.status(200).json(gig)
    : res.status(404).json("Could not find gig");
});

gigRouter.post("/", jwtMiddleware.jwtTokenIsValid, async (req, res, next) => {
  return (await gigController.createGig(req, res, next))
    ? res.status(201).json("Great success")
    : res.status(400).json("Could not publish gig");
});
