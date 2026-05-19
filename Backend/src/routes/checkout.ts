import { Router } from "express";
import express from "express";
import CheckoutController from "../controllers/checkoutController.js";

export const checkoutRouter = Router();

checkoutRouter.post("/create-checkout-session", async (req, res) => {
  CheckoutController.createCheckoutSession(req, res);
});

checkoutRouter.get("/session/:sessionId", async (req, res) => {
  CheckoutController.getSession(req, res);
});

export const webHookRouter = Router();

webHookRouter.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    CheckoutController.handleWebhook(req, res);
  },
);
