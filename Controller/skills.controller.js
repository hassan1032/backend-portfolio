import catchasyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { skill } from "../Models/skillsSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewSkill = catchasyncErrors(async (req, res, next) => {
  if (req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please upload sill svg", 400));
  }
  const { svg } = req.files;
  const { title, proficiency } = req.body;
  if (!title || !proficiency) {
    return next(new ErrorHandler("Please fill all fields", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    {
      folder: "PORTFOLIO_SKILLS",
    }
  );
  const newSkill = await skill.create({
    title,
    proficiency,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "Skill added successfully",
    newSkill,
  });
});

export const getAllSkills = catchasyncErrors(async (req, res, next) => {});

export const updateSkill = catchasyncErrors(async (req, res, next) => {});

export const deleteSkill = catchasyncErrors(async (req, res, next) => {});
