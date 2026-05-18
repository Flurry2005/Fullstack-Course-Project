import { Router } from "express";
import Stripe from "stripe";
import CheckoutController from "../controllers/checkoutController.js";
import gigsModel from "../models/gigsModel.js";
import ordersModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import JWTModel from "../models/JWT.js";
import express from "express";
import SocketHandler from "../socket/SocketHandler.js";

export const checkoutRouter = Router();

const API_BASE =
  process.env.VITE_DEV === "true"
    ? "http://localhost:5173/"
    : "https://fullstack.liamjorgensen.dev/";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//  checkout
checkoutRouter.post("/create-checkout-session", async (req, res) => {
  try {
    // get gidId & selected tier
    const { gigId, tier, billing } = req.body;
    const user = res.locals.jwt;

    // get gig by id
    const gig = await gigsModel.findById(gigId);

    // if no gig found return bad request
    if (!gig) {
      return res.status(400).json({ error: "Gig not found" });
    }

    // iniiate price variable
    let price = 0;
    let deliveryTime = "";
    // switch tier from req.body to see if its either basic, standard or premium to get the price of the service
    switch (tier.toLowerCase()) {
      case "basic": {
        if (gig.basic) {
          price = Number(gig.basic.price);
          deliveryTime = gig.basic.delivery;
        } else {
          return res.status(400).json({ error: "Tier dosent exist" });
        }
        break;
      }

      case "standard": {
        if (gig.standard) {
          price = Number(gig.standard.price!);
          deliveryTime = gig.standard.delivery!;
        } else {
          return res.status(400).json({ error: "Tier dosent exist" });
        }
        break;
      }

      case "premium": {
        if (gig.premium) {
          price = Number(gig.premium.price!);
          deliveryTime = gig.premium.delivery!;
        } else {
          return res.status(400).json({ error: "Tier dosent exist" });
        }
        break;
      }
    }

    let stripeCustomerId = user.stripe_customer_id;

    if (stripeCustomerId) {
      try {
        const customer = await stripe.customers.retrieve(stripeCustomerId);
        if ("deleted" in customer && customer.deleted) {
          stripeCustomerId = null;
        }
      } catch {
        stripeCustomerId = null;
      }
    }

    if (!stripeCustomerId) {
      const customerData: Stripe.CustomerCreateParams = {
        email: user.email,
      };

      if (billing) {
        customerData.name = [billing.firstName, billing.lastName]
          .filter(Boolean)
          .join(" ");
        customerData.phone = billing.phoneNumber || undefined;
        customerData.address = {
          line1: billing.addressLine1 || undefined,
          line2: billing.addressLine2 || undefined,
          city: billing.city || undefined,
          state: billing.state || undefined,
          postal_code: billing.zipCode || undefined,
          country: billing.country || undefined,
        };
      }

      const customer = await stripe.customers.create(customerData);
      stripeCustomerId = customer.id;
      res.locals.jwt.stripe_customer_id = stripeCustomerId;

      await userModel.findByIdAndUpdate(user._id, {
        $set: {
          stripe_customer_id: stripeCustomerId,
        },
      });
      const token = JWTModel.createJwtToken(
        user.username,
        user.email,
        user._id,
        stripeCustomerId,
      );
      const expiry = new Date(Date.now() + 1000 * 60 * 60);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.VITE_DEV ? false : true,
        sameSite: process.env.VITE_DEV ? "lax" : "none",
        path: "/",
        domain: process.env.VITE_DEV ? undefined : ".liamjorgensen.dev",
        expires: expiry,
      });
    }

    const priceInCents = Math.round(price * 100);
    // our 10% service fee
    const serviceFeeInCents = Math.round(priceInCents * 0.1);
    const serviceFee = serviceFeeInCents / 100;
    // total price with service fee
    const totalPriceInCents = priceInCents + serviceFeeInCents;

    // stripe checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      customer: stripeCustomerId,

      customer_update: {
        address: "auto",
        name: "auto",
        shipping: "auto",
      },

      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: gig.title,
              description: gig.description + "\n GigId: " + gig._id,
              images: gig.primaryImagePreview ? [gig.primaryImagePreview] : [],
            },
            unit_amount: totalPriceInCents,
          },
          quantity: 1,
        },
      ],

      metadata: {
        gigId: gig._id.toString(),
        sellerId: gig.sellerId.toString(),
        buyerId: user._id,
        buyerUsername: user.username,
        sellerUsername: gig.sellerUsername,
        gigname: gig.title,
        deliveryTime: deliveryTime,
        tier,
        gigPrice: price.toString(),
        serviceFee: serviceFee.toString(),
      },

      success_url: `${API_BASE}success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${API_BASE}checkout/?gigId=${gigId}&tier=${tier}`,
    });

    return res.json({ url: session.url });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      error: error.message || "Could not create checkout session.",
    });
  }
});

// checkout sucess
checkoutRouter.get("/session/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      limit: 10,
    });

    return res.json({
      id: session.id,
      status: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details?.email,
      metadata: session.metadata,
      items: lineItems.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        amountTotal: item.amount_total,
        currency: item.currency,
      })),
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export const webHookRouter = Router();
webHookRouter.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ✅ PAYMENT SUCCESS EVENT
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      type Tier = "basic" | "standard" | "premium";

      const gigId = session.metadata?.gigId;
      const sellerId = session.metadata?.sellerId;
      const sellerUsername = session.metadata?.sellerUsername;
      const buyerUsername = session.metadata?.buyerUsername;
      const buyerId = session.metadata?.buyerId;
      const tier: Tier = session.metadata?.tier.toLowerCase() as Tier;
      const gigname = session.metadata?.gigname;
      const deliveryTime = session.metadata?.deliveryTime ?? "1 Day";

      const match = deliveryTime.match(/(\d+)\s*(Day|Days|Week|Weeks)/i);

      let totalDays = 1;

      if (match) {
        const value = Number(match[1]);
        const unit = match[2].toLowerCase();

        totalDays = unit.startsWith("week") ? value * 7 : value;
      }

      const adjustedDays = Math.max(totalDays - 1, 0);

      const dueDate = new Date();
      dueDate.setHours(0, 0, 0, 0);
      dueDate.setDate(dueDate.getDate() + adjustedDays);

      await ordersModel.create({
        gigId: gigId,
        stripeSessionId: session.id,
        gigTier: tier,
        gigname: gigname,
        dueDate: dueDate,
        buyerId: buyerId,
        buyerUsername: buyerUsername,
        sellerId: sellerId,
        sellerUsername: sellerUsername,
        delivered: false,
        reviewed: false,
      });

      SocketHandler.emitToUser(sellerUsername!, "purchase_received", {
        gigname,
        buyerUsername,
        tier,
      });
    }

    res.json({ received: true });
  },
);
