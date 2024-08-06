import mongoose from "mongoose";
import google from "next-auth/providers/google";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
  },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
