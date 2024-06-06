import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
  },
  phone: {
    type: Number,
    required: [true, "Phone Number is Required"],
  },
  aboutMe: {
    type: String,
    required: [true, "About me is Required"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minLength: [8, "Password must be contain at least 8 charcater!"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  githubUrl: String,
  linkedinUrl: String,
  instagramUrl: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

export const User = mongoose.model("User", userSchema)



