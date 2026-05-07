import Users from "../models/userModel.js";
import Orders from "../models/orderModel.js";
import { Request, Response, NextFunction } from "express";
import orderModel from "../models/orderModel.js";

class OrderController {
  async getOrders(req: Request, res: Response, next: NextFunction) {
    const user = await Users.findOne({ username: res.locals.jwt.username });

    if (!user)
      return res.status(500).json({ success: false, error: "Unknown" });

    //Temp give seller too
    const ordersRef = await Orders.find({
      $or: [{ buyerId: user._id }, { sellerId: user._id }],
    });

    const orders = ordersRef.map((order) => order.toObject());
    orders.map((order) => {
      //@ts-ignore
      delete order.sellerId;
      //@ts-ignore
      delete order.buyerId;
    });

    return res.status(200).json({ success: true, data: orders });
  }

  async getOrdersBySeller(req: Request, res: Response) {
    const sellerId = req.params.userId;
    if (!sellerId) return res.status(400).json({ status: "Bad Request" });
    try {
      const orders = orderModel.find({ sellerId: sellerId });
      return res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ status: "Not found", message: "Seller was not found" });
    }
  }
}

export default new OrderController();
