import { Request, Response } from "express";
import gigsModel from "../models/gigsModel.js";
import userModel from "../models/userModel.js";

class AdminController {
  async GetAllGigs(req: Request, res: Response) {
    try {
      const gigs = await gigsModel.find({ pending: true });

      return res
        .status(200)
        .json({ message: "Gigs retrieved successfully", gigs: gigs });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve gigs" });
    }
  }
  async GetAllUsers(req: Request, res: Response) {
    try {
      const users = await userModel.find().select("-passwordHash");

      return res
        .status(200)
        .json({ message: "Users retrieved successfully", users: users });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  }
}
export default new AdminController();
