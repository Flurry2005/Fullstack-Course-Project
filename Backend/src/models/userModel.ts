import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    profilePictureUrl: {
      type: String,
    },
    coverImageUrl: {
      type: String,
      default: "",
    },
    stripe_customer_id: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "",
    },
    languages: {
      type: [
        {
          name: { type: String, trim: true, maxlength: 40 },
          level: {
            type: String,
            enum: ["Basic", "Conversational", "Fluent", "Native"],
            default: "Conversational",
          },
        },
      ],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /^(?:[a-zA-Z0-9!#$%&'*+/=?^{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_{|}~-]+)|"(?:(?:\[\x00-\x7F]|[^\"]))")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?.)+[a-zA-Z]{2,}|(?:[(?:\d{1,3}.){3}\d{1,3}]))$/,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Users", userSchema);
