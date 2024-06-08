
import {User} from "../Models/userSchemajs"
import {catchAsyncErrors} from "./catchAsyncErrors.js"
import ErrorHandler from "./error.js"
import jwt from "jsonwebtoken"

export const isAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const { token} = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource",401));
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
        });
