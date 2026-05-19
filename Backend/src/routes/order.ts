import router from "express";
import orderController from "../controllers/orderController.js";
import { jwtMiddleware } from "../middleware/jwtMiddleware.js";

export const orderRouter = router();

orderRouter.get("/orders", async (req, res, next) => {
  orderController.getOrders(req, res, next);
});
orderRouter.patch("/:orderId/confirm-seller", async (req, res, next) => {
  orderController.confirmBySeller(req, res, next);
});

orderRouter.patch("/:orderId/confirm-buyer", async (req, res, next) => {
  orderController.confirmByBuyer(req, res, next);
});

orderRouter.patch("/:orderId/revise", async (req, res, next) => {
  orderController.reviseOrder(req, res, next);
});

orderRouter.patch("/:orderId/cancel", async (req, res, next) => {
  orderController.cancelOrder(req, res, next);
});
