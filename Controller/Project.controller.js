import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../Models/ProjectSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewProject = catchAsyncErrors(async (req, res, next) => {
  try {
    if (!req.files || !req.files.image) {
      return next(new ErrorHandler("Project  Image Required!", 404));
    }

    const { image } = req.files;
    const {
      title,
      description,
      gitRepoLink,
      projectLink,
      stack,
      technologies,
      deployed,
    } = req.body;

    if (
      !title ||
      !description ||
      !gitRepoLink ||
      !projectLink ||
      !stack ||
      !technologies ||
      !deployed
    ) {
      return next(new ErrorHandler("All fields are required!", 404));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      image.tempFilePath,
      { folder: "PORTFOLIO PROJECT IMAGES" }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(
        new ErrorHandler("Failed to upload avatar to Cloudinary", 500)
      );
    }

    const project = await Project.create({
      title,
      description,
      gitRepoLink,
      projectLink,
      stack,
      technologies,
      deployed,
      image: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      message: "New Project Added!",
      project,
    });
  } catch (error) {
    next(error);
  }
});

export const getAllProject = catchAsyncErrors(async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    next(error);
  }
});

export const deleteProject = catchAsyncErrors(async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return next(new ErrorHandler("Already Deleted!", 404));
    }
    const projectImageId = project.image.public_id;
    await cloudinary.uploader.destroy(projectImageId);
    await project.deleteOne();
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});
export const updateProject = catchAsyncErrors(async (req, res, next) => {
    const newProjectData = {
      title: req.body.title,
      description: req.body.description,
      stack: req.body.stack,
      technologies: req.body.technologies,
      deployed: req.body.deployed,
      projectLink: req.body.projectLink,
      gitRepoLink: req.body.gitRepoLink,
    };
    if (req.files && req.files.projectBanner) {
      const projectBanner = req.files.projectBanner;
      const project = await Project.findById(req.params.id);
      const projectImageId = project.projectBanner.public_id;
      await cloudinary.uploader.destroy(projectImageId);
      const newProjectImage = await cloudinary.uploader.upload(
        projectBanner.tempFilePath,
        {
          folder: "PORTFOLIO PROJECT IMAGES",
        }
      );
      newProjectData.projectBanner = {
        public_id: newProjectImage.public_id,
        url: newProjectImage.secure_url,
      };
    }
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      newProjectData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      success: true,
      message: "Project Updated!",
      project,
    });
  });

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return next(new ErrorHandler("Project Not Found", 404));
    }
    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
});
