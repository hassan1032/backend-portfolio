
import { catchAsyncError} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js"


export const createApplication = catchAsyncError(async(req,res,next)=>{

})

export const getApplication = catchAsyncError(async(req,res,next)=>{
})

export const deleteApplication = catchAsyncError(async(req,res,next)=>{
    
})