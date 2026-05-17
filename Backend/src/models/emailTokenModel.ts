import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  },
  type: {
    type: String,
    enum: ["passwordReset", "emailVerification"],
    required: true,
  },
  pendingUser: {
    fullname: String,
    username: String,
    email: String,
    passwordHash: String,
  },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Token", tokenSchema);
