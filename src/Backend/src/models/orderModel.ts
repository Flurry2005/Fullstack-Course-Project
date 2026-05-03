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
    gigname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
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
  },
  { timestamps: true },
);

export default mongoose.model<OrderType>("Orders", orderSchema);
