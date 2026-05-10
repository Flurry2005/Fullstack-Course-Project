import { Router } from "express";
import Stripe from "stripe";
import CheckoutController from "../controllers/checkoutController.js";
import gigsModel from "../models/gigsModel.js";
import ordersModel from "../models/orderModel.js";

export const checkoutRouter = Router();

const API_BASE = process.env.VITE_DEV
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
          price = gig.basic.price;
          deliveryTime = gig.basic.delivery;
        } else {
          return res.status(400).json({ error: "Tier dosent exist" });
        }
        break;
      }

      case "standard": {
        if (gig.standard) {
          price = gig.standard.price!;
          deliveryTime = gig.standard.delivery!;
        } else {
          return res.status(400).json({ error: "Tier dosent exist" });
        }
        break;
      }

      case "premium": {
        if (gig.premium) {
          price = gig.premium.price!;
          deliveryTime = gig.premium.delivery!;
        } else {
          return res.status(400).json({ error: "Tier dosent exist" });
        }
        break;
      }
    }

    // our 10% service fee
    const serviceFee = Math.round(price * 0.1);
    // total price with service fee
    const totalPrice = price + serviceFee;

    // stripe checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      customer_email: billing.email,

      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },

      payment_intent_data: {
        receipt_email: billing.email,
        shipping: {
          name: `${billing.firstName} ${billing.lastName}`,
          phone: billing.phoneNumber,
          address: {
            line1: billing.addressLine1,
            line2: billing.addressLine2,
            city: billing.city,
            state: billing.state,
            postal_code: billing.zipCode,
            country: billing.country,
          },
        },
      },

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: gig.title,
              description: gig.description,
              images: gig.primaryImagePreview ? [gig.primaryImagePreview] : [],
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],

      metadata: {
        gigId: gig._id.toString(),
        sellerId: gig.sellerId.toString(),
        sellerUsername: gig.sellerUsername,
        tier,
        gigPrice: price.toString(),
        serviceFee: serviceFee.toString(),
      },

      success_url: `${API_BASE}success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${API_BASE}checkout/?gigId=${gigId}&tier=${tier}`,
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.log(error);
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
