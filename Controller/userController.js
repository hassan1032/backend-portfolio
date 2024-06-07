import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../Models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar Required!", 400));
  }
  const { avatar, resume } = req.files;

  //POSTING AVATAR
  const cloudinaryAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "PORTFOLIO AVATAR" }
  );
  if (!cloudinaryAvatar || cloudinaryAvatar.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryAvatar.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }

  //POSTING RESUME
  const cloudinaryResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "PORTFOLIO RESUME" }
  );
  if (!cloudinaryResume || cloudinaryResume.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResume.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload resume to Cloudinary", 500));
  }
  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
  } = req.body;
  const user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
    avatar: {
      public_id: cloudinaryAvatar.public_id,
      url: cloudinaryAvatar.secure_url,
    },
    resume: {
      public_id: cloudinaryResume.public_id,
      url: cloudinaryResume.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "User created successfully",
    user,
  });

  //generateToken(user, "Registered!", 201, res);
});
