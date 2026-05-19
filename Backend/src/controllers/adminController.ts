import { Request, Response } from "express";
import gigsModel from "../models/gigsModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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

  async GetTotalSales(req: Request, res: Response) {
    async function getTotalSales() {
      let total = 0;
      let hasMore = true;
      let startingAfter = null;

      while (hasMore) {
        const params: any = {
          limit: 100,
        };

        if (startingAfter) {
          params.starting_after = startingAfter;
        }

        const paymentIntents: any = await stripe.paymentIntents.list(params);

        for (const pi of paymentIntents.data) {
          if (pi.status === "succeeded") {
            total += pi.amount_received;
          }
        }

        hasMore = paymentIntents.has_more;

        if (paymentIntents.data.length > 0) {
          startingAfter =
            paymentIntents.data[paymentIntents.data.length - 1].id;
        }
      }

      return total / 100; // convert cents to dollars
    }

    const total = await getTotalSales();
    console.log(total);
    return res.status(200).json({ totalSales: total });
  }
}
export default new AdminController();
