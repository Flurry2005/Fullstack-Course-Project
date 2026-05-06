import router from "express";
import orderController from "../controllers/orderController.js";

export const orderRouter = router();

orderRouter.get("/orders", async (req, res, next) => {
  orderController.getOrders(req, res, next);
});
