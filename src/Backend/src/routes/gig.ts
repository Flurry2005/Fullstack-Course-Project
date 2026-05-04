import { NextFunction, Router } from "express";
import gigController from "../controllers/gigController";
import { jwtMiddleware } from "../middleware/jwtMiddleware.js";



export const gigRouter = Router();

gigRouter.post("/", jwtMiddleware.jwtTokenIsValid, async (req, res, next) => {
  return (await gigController.createGig(req, res, next))
    ? res.status(201).json("Great success")
    : res.status(400).json("Could not publish gig");
});
