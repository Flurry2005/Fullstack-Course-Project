import moongose from "mongoose";

const gigsSchema = new moongose.Schema({
  seller: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [],
    required: true,
  },

  category: {
    main: { type: String, required: true },
    sub: { type: String, required: true },
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

export default moongose.model("Gigs", gigsSchema);


