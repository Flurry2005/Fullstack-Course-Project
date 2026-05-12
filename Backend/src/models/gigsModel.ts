import mongoose from "mongoose";

const gigsSchema = new mongoose.Schema({
  sellerUsername: {
    type: String,
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 40,
  },
  primaryImagePreview: {
    type: String,
  },
  secondaryImagePreview: {
    type: String,
  },
  ternaryImagePreview: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [],
    required: true,
  },

  pending: {
    type: Boolean,
    required: true,
  },

  category: {
    main: { type: String, required: true },
    sub: { type: String, required: true },
    main_slug: { type: String, required: true },
    sub_slug: { type: String, required: true },
  },
  basic: {
    price: { type: Number, required: true },
    delivery: { type: String, required: true },
    features: { type: [], required: true },
  },
  standard: {
    price: { type: Number },
    delivery: { type: String },
    features: { type: [] },
  },
  premium: {
    price: { type: Number },
    delivery: { type: String },
    features: { type: [] },
  },
});

export default mongoose.model("Gigs", gigsSchema);
