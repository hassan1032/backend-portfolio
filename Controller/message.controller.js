import  catchAsyncErrors  from "../middlewares/catchAsyncErrors.js";
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
