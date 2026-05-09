import { Router } from "express";
import gigController from "../controllers/gigController";
import { jwtMiddleware } from "../middleware/jwtMiddleware.js";
import { upload } from "../../utils/multer.js";

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

gigRouter.get("/user/:userId", async (req, res) => {
  const gigs = await gigController.getGigByUser(req);

  return gigs
    ? res.status(200).json(gigs)
    : res.status(404).json({ status: "404", message: "User not found" });
});

gigRouter.get("/edit/:id", jwtMiddleware.jwtTokenIsValid, async (req, res) => {
  const gig = await gigController.getGigToEdit(req, res);

  return gig
    ? res.status(200).json(gig)
    : res.status(404).json({ status: "404", message: "Gig not found" });
});

gigRouter.post(
  "/",
  jwtMiddleware.jwtTokenIsValid,
  upload.array("images", 3),
  async (req, res, next) => {
    return (await gigController.createGig(req, res, next))
      ? res.status(201).json("Great success")
      : res.status(400).json("Could not publish gig");
  },
);

gigRouter.put("/", jwtMiddleware.jwtTokenIsValid, async (req, res, next) => {
  return (await gigController.updateGig(req, res, next))
    ? res.status(200).json("Updated Gig")
    : res.status(400).json("Could not update gig");
});

gigRouter.delete("/", jwtMiddleware.jwtTokenIsValid, async (req, res, next) => {
  return (await gigController.deleteGig(req, res, next))
    ? res.status(200).json("Deleted Gig")
    : res.status(400).json("Could not delete gig");
});
