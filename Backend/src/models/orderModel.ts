import mongoose, { InferSchemaType } from "mongoose";

export type OrderType = InferSchemaType<typeof orderSchema>;

const messageSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: Date, required: true },
    readBy: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
    },
    gigTier: {
      type: String,
      enum: ["basic", "standard", "premium"],
      required: true,
    },
    gigname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 40,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    buyerUsername: {
      type: String,
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    sellerUsername: {
      type: String,
      required: true,
    },

    chathistory: {
      type: [messageSchema],
      default: [],
    },

    delivered: {
      enum: [
        "In Progress",
        "Confirmed By Seller",
        "Revision",
        "Completed",
        "Cancelled",
      ],
      type: String,
      required: true,
      default: "In Progress",
    },
    reviewed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model<OrderType>("Orders", orderSchema);
