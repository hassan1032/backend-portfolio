import catchasyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { skill } from "../Models/skillsSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewSkill = catchasyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please Upload Skill svg!", 404));
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

export const getAllSkills = catchasyncErrors(async (req, res, next) => {
  const skills = await skill.find();
  if (!skills) {
    return next(new ErrorHandler("No Sills Found!", 404));
  }
  res.status(200).json({
    success: true,
    skills,
  });
});

export const updateSkill = catchasyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let skills = await skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill not found!", 404));
  }
  const { proficiency } = req.body;

  skills = await skill.findByIdAndUpdate(
    id,
    { proficiency },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Skill Updated!",
    skills,
  });
});

export const deleteSkill = catchasyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let skills = await skill.findById(id);
  if (!skills) {
    return next(new ErrorHandler("Already Deleted!", 404));
  }
  const skillSvgId = skills.svg.public_id;
  await cloudinary.uploader.destroy(skillSvgId);
  await skill.deleteOne();
  res.status(200).json({
    success: true,
    message: "Skill Deleted!",
  });
});
