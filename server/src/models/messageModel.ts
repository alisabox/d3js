import mongoose from "mongoose";

const messageModel = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    senderName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: [true, 'Message is missing'],
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageModel);
