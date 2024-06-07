import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);
// For Hashing Password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});
// And Comparing Password with Hashpassword
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Genrating JSONWEBTOKEN
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
