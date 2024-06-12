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
  const { title, proficiency } = req.body;
  let skillToUpdate = await skill.findById(id);
  if (!skillToUpdate) {
    return next(new ErrorHandler("Skill not found!", 404));
  }
  if (req.files) {
    const { svg } = req.files;
    const cloudinaryResponse = await cloudinary.uploader.upload(
      svg.tempFilePath,
      {
        folder: "PORTFOLIO_SKILLS",
      }
    );
    skillToUpdate.svg = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }
  skillToUpdate.title = title;
  skillToUpdate.proficiency = proficiency;
  await skillToUpdate.save();
  res.status(200).json({
    success: true,
    message: "Skill updated successfully",
    skillToUpdate,
  });
});

export const deleteSkill = catchasyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const skillToDelete = await skill.findById(id);
    if (!skillToDelete) {
        return next(new ErrorHandler("Skill not found!", 404));
        }
        await skillToDelete.deleteOne();
        res.status(200).json({
            success: true,
            message: "Skill deleted successfully",
            });
});
