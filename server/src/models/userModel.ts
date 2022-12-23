import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is missing'],
  },
  password: {
    type: String,
    required: [true, 'Password is missing'],
    minLength: [6, 'Password length should be at least 6 characters'],
    select: false,
  },
});

export const User = mongoose.model("User", userModel);
