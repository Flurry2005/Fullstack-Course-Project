import { Router } from "express";
import adminController from "../controllers/adminController.js";

export const adminRouter = Router();

adminRouter.get("/get-gigs", async (req, res) => {
  adminController.GetAllGigs(req, res);
});
adminRouter.get("/get-users", async (req, res) => {
  adminController.GetAllUsers(req, res);
});
adminRouter.get("/get-total-sales", async (req, res) => {
  adminController.GetTotalSales(req, res);
});
