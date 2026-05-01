import Users from "../models/userModel.js";
import Orders from "../models/orderModel.js";
import { Request, Response, NextFunction } from "express";

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
}

export default new OrderController();
