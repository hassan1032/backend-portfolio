import catchasyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { SoftwareApplication } from "../Models/softwareApplication.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createApplication = catchasyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("Software Application Icon/Image Required!", 404)
    );
  }
  const { svg } = req.files;
  const { name } = req.body;
  if (!name) {
    return next(new ErrorHandler("Please Provide Software's Name!", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "PORTFOLIO SOFTWARE APPLICATION IMAGES" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }
  const softwareApplication = await SoftwareApplication.create({
    name,
    svg: {
      public_id: cloudinaryResponse.public_id, // Set your cloudinary public_id here
      url: cloudinaryResponse.secure_url, // Set your cloudinary secure_url here
    },
  });
  res.status(201).json({
    success: true,
    message: "New Software Application Added!",
    softwareApplication,
  });
});

export const getApplication = catchasyncErrors(async (req, res, next) => {
  const softwareApplications = await SoftwareApplication.find();
  if (!softwareApplications) {
    return next(new ErrorHandler("No Software Applications Found!", 404));
  }
  res.status(200).json({
    success: true,
    softwareApplications,
  });
});

export const deleteApplication = catchasyncErrors(async (req, res, next) => {
  const softwareApplication = await SoftwareApplication.findById(req.params.id);
  if (!softwareApplication) {
    return next(new ErrorHandler("Software Application Not Found!", 404));
  }
  const softwareApplicationSvgId = softwareApplication.svg.public_id;
  await cloudinary.uploader.destroy(softwareApplicationSvgId);
  await softwareApplication.deleteOne();
  res.status(200).json({
    success: true,
    message: "Software Application Deleted Successfully!",
  });
});
