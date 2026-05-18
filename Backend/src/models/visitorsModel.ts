import mongoose from "mongoose";

const visitorsSchema = new mongoose.Schema({
  gigId: { type: mongoose.Schema.Types.ObjectId, required: true },
  visitors: { type: Map, of: Date, default: {} },
});

export default mongoose.model("Visitors", visitorsSchema);
