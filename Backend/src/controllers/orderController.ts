import Users from "../models/userModel.js";
import Orders from "../models/orderModel.js";
import { Request, Response, NextFunction } from "express";
import orderModel from "../models/orderModel.js";
import SocketHandler from "../socket/SocketHandler.js";

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

  async confirmBySeller(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const user = await Users.findOne({ username: res.locals.jwt.username });

      if (!user) {
        return res.status(500).json({ success: false, error: "Unknown User" });
      }

      const order = await orderModel.findById(orderId);

      if (!order) {
        return res
          .status(404)
          .json({ success: false, error: "Order not found" });
      }

      if (order.sellerId.toString() !== user._id.toString()) {
        return res.status(403).json({
          success: false,
          error: "Only the seller can confirm this order",
        });
      }
      if (order.delivered !== "In Progress" && order.delivered !== "Revision") {
        return res.status(400).json({
          success: false,
          error: "Order cannot be confirmed at this stage",
        });
      }
      order.delivered = "Confirmed By Seller";
      await order.save();
      SocketHandler.emitToUser(order.buyerUsername, "order_update", {
        _id: orderId,
        username: user.username,
        orderName: order.gigname,
        seller: user._id.toString() === order.sellerId.toString(),
        delivered: "Confirmed By Seller",
      });
      return res.status(200).json({ success: true, data: order });
    } catch (error) {
      console.error("confirmBySeller error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Something went wrong" });
    }
  }

  async confirmByBuyer(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const user = await Users.findOne({ username: res.locals.jwt.username });

      if (!user) {
        return res.status(500).json({ success: false, error: "Unknown User" });
      }
      const order = await orderModel.findById(orderId);
      if (!order) {
        return res
          .status(404)
          .json({ success: false, error: "Order not found" });
      }

      if (order.buyerId.toString() !== user._id.toString()) {
        return res.status(403).json({
          success: false,
          error: "Only the buyer can confirm this order",
        });
      }

      if (order.delivered !== "Confirmed By Seller") {
        return res.status(400).json({
          success: false,
          error: "Order must be confirmed by seller first",
        });
      }

      order.delivered = "Completed";
      await order.save();
      SocketHandler.emitToUser(order.sellerUsername, "order_update", {
        _id: orderId,
        username: user.username,
        orderName: order.gigname,
        seller: user._id.toString() === order.sellerId.toString(),
        delivered: "Completed",
      });
      return res.status(200).json({ success: true, data: order });
    } catch (error) {}
  }
  async reviseOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const user = await Users.findOne({ username: res.locals.jwt.username });
      if (!user) {
        return res.status(500).json({ success: false, error: "Unknown User" });
      }
      const order = await orderModel.findById(orderId);
      if (!order) {
        return res
          .status(404)
          .json({ success: false, error: "Order not found" });
      }
      if (order.buyerId.toString() !== user._id.toString()) {
        return res.status(403).json({
          success: false,
          error: "Only the buyer can request a revision",
        });
      }

      if (order.delivered !== "Confirmed By Seller") {
        return res.status(400).json({
          success: false,
          error: "Order must be confirmed by seller to request revision",
        });
      }

      order.delivered = "Revision";
      await order.save();
      SocketHandler.emitToUser(order.sellerUsername, "order_update", {
        _id: orderId,
        username: user.username,
        orderName: order.gigname,
        seller: user._id.toString() === order.sellerId.toString(),
        delivered: "Revision",
      });
      return res.status(200).json({ success: true, data: order });
    } catch (error) {
      console.error("reviseOrder error: ", error);
      return res
        .status(500)
        .json({ success: false, error: "Something went wrong :)" });
    }
  }

  async cancelOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const user = await Users.findOne({ username: res.locals.jwt.username });
      if (!user) {
        return res.status(500).json({ success: false, error: "Unknown User" });
      }
      const order = await orderModel.findById(orderId);
      if (!order) {
        return res
          .status(404)
          .json({ success: false, error: "Order not found" });
      }
      if (order.buyerId.toString() !== user._id.toString()) {
        return res.status(403).json({
          success: false,
          error: "Only the buyer can cancel the order",
        });
      }
      if (order.delivered === "Completed" || order.delivered === "Cancelled") {
        return res
          .status(400)
          .json({ success: false, error: "Order is already closed" });
      }
      order.delivered = "Cancelled";
      await order.save();
      SocketHandler.emitToUser(order.sellerUsername, "order_update", {
        _id: orderId,
        username: user.username,
        orderName: order.gigname,
        seller: user._id.toString() === order.sellerId.toString(),
        delivered: "Cancelled",
      });
      return res.status(200).json({ success: true, data: order });
    } catch (error) {
      console.error("cancelOrder error: ", error);
      return res
        .status(500)
        .json({ success: false, error: "Something went wrong :)" });
    }
  }
}

export default new OrderController();
