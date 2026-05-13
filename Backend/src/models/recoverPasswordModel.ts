import mongoose from "mongoose";

const passwordResetTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("PasswordResetToken", passwordResetTokenSchema);
