const ErrorHandler = require("../utils/errorhanler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

exports.isAuthenticateduser = catchAsyncError(
    async (req,res,next)=>{

        const {token} =req.cookies;
        // console.log(!token);
        if(!token){
            return next(new ErrorHandler("Please login to access this resources",401))
        }
        const decodedData = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        next();

    });

exports.autherisedRole = (...roles) =>{
    return (req,res,next) =>{
        // console.log(req.user)
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access to this resources`
                ,403));
        };
        next();
    };
};