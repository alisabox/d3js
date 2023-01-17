import { Message } from "../models/messageModel";
import catchAsync from "../utils/catchAsync";


export const getAllMessages = catchAsync(async (req, res) => {
  const messages = await Message.find();

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: messages,
  });
});

export const saveMessage = catchAsync(async (req, res) => {
  const newMessage = await Message.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newMessage,
    },
  });
});