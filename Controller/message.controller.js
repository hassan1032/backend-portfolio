

import { catchAsyncErrors} from "../middlewares/catchAsyncErrors"
import ErrorHandler from "../middlewares/error.js"
import {Message} from "../Models/Message.schema.js"


export const sendMessage = catchAsyncErrors(async(req,res,next)=>{
    const {senderName,message,subject} = req.body;
    
})