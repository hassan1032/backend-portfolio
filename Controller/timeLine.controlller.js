import catchasyncErrors from "../middlewares/catchAsyncErrors.js";
import { Timeline } from "../Models/timeline.Model.js";

export const postTimeline = catchasyncErrors(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  const newtimeline = await Timeline.create({
    title,
    description,
    timeline: {
      from,
      to,
    },
  });
  res.status(200).json({
    success: true,
    message: "Timeline Added successfully",
    newtimeline,
  });
});

export const deleteTimeline = catchasyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const timeline = await Timeline.findByIdAndDelete(id);

  if (!timeline) {
    return res.status(404).json({
      success: false,
      message: "Timeline not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Timeline deleted successfully",
    });

});

export const getallTimeline = catchasyncErrors(async (req, res, next) => {
    const timelines = await Timeline.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        timelines,
        });
});
