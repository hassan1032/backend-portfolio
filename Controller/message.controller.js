import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../Models/Message.schema.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { senderName, message, subject } = req.body;
  if (!senderName || !subject || !message) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }
  const data = await Message.create({ senderName, subject, message });
  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data,
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});

export const Deletemessgae = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findByIdAndDelete(id);
  if (!message) {
    return next(new ErrorHandler("Message not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Delete Successfully",
  });
});
