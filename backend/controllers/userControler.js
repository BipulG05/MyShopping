const ErrorHandler = require('../utils/errorhanler');
const catchAsyncError = require('../middlware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');



//register a user

exports.registerUser = catchAsyncError(
    async(req,res,next) =>{
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale",
        });
        console.log("MyCloud",myCloud);
        const {name,email,password} = req.body;
        const user = await User.create({
            name,email,password,
            avatar:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            },
        });
        // const token = user.getJWTToken();
        // res.status(201).json({
        //     success:true,
        //     token,
        // })
        // console.log(user);
        sendToken(user,201,res);
    })

// login user

exports.loginUser = catchAsyncError(
    async (req,res,next) => {
        const {email,password} = req.body;
        if(!email || !password){
            return next(new ErrorHandler("please Enter Email & Password",400));
        }
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorHandler("Invalid Email or Password",401));
        }
        const isPasswordMatched = await user.comparePassword(password);
        
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid Email or Password",401));
        }
        // const token = user.getJWTToken();
        // res.status(200).json({
        //     success:true,
        //     token,
        // });
        sendToken(user,200,res);

    });

// logout user
exports.logout = catchAsyncError(
    async (req,res,next) => {
        res.cookie("token", null,{
            expires:new Date (Date.now()),
            httpOnly:true,
        });
        res.status(200).json({
            success:true,
            message:"Logged out",
        });
    });

//forget password
exports.forgetPassword = catchAsyncError(
    async(req,res,next)=>{
        const user = await User.findOne({"email":req.body.email});
        if(!user){
            return next(new ErrorHandler("User Not Found",404));
        }
        // get reset passord token
        const resetToken = user.getResetPasswordToken();

        await user.save({validateBeforeSave:false});


        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

        const message = `Your password reset token is : \n\n ${resetPasswordUrl} \n\nIf you do not request this email then please ignore this email`;

        try{
            await sendEmail({
                email:user.email,
                subject:`MyShop Forget password`,
                message,

            });
            res.status(200).json({
                success:true,
                message:`Email send to ${user.email} successfully`
            })

        }catch(error){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({validateBeforeSave:false})
            return next(new ErrorHandler(error.message,500))
        }
    })

    //Reset password
exports.resetPassword = catchAsyncError(
    async(req,res,next)=>{
        const resetPasswordTokn = resetPasswordToken = crypto.createHash("sha256")
        .update(req.params.token)
        .digest("hex");
        const user= await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}
        });
        if(!user){
            return next(new ErrorHandler("Reset Password Token is Invalid or Expired",400));
        };
        if(req.body.password !== req.body.cofirmPassword){
            return next(new ErrorHandler('Password does not match ',400))
        }
        user.password = req.body.password;
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save();
        sendEmail(user,200,res);

    })

// get user details
exports.getUserDetails = catchAsyncError(
    async(req,res,next)=>{
        const user = await User.findById(req.user.id);


        res.status(200).json({
            success:true,
            user,
        })
    })

// update user password
exports.updateUserPassword = catchAsyncError(
    async(req,res,next)=>{

        const user = await User.findById(req.user.id).select("+password");
        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
        
        if(!isPasswordMatched){
            return next(new ErrorHandler("Old Password is incorrect",400));
        }
        if(req.body.newPassword !== req.body.cofirmPassword){
            return next(new ErrorHandler('Password does not match ',400))
        }
        user.password = req.body.newPassword;
        await user.save();
        sendToken(user,200,res);

    })

// update user details
exports.updateUserDetails = catchAsyncError(
    async(req,res,next)=>{
        console.log(req.body.name,req.body.email)
        const newUserDetails = {
            name:req.body.name,
            email:req.body.email,
        };
        // avater will update later
        const user = await User.findByIdAndUpdate(req.user.id,newUserDetails,{
            new:true,
            runValidators:true,
            userFindAndModify:false,
        });
        res.status(200).json({
            success:true,
            // user
        })

    })

// get all user - admin
exports.getAllUser = catchAsyncError(
    async(req,res,next)=>{
        const users = await User.find();
        res.status(200).json({
            success:true,
            users
        });
    });

// get single user details by admin
exports.getUserProfile = catchAsyncError(
    async(req,res,next)=>{
        const user = await User.findById(req.params.id);
        if(!user){
            return next(
                new ErrorHandler(`User does not exist with Id : ${req.params.id}`)
            )
        }
        res.status(200).json({
            success:true,
            user,
        });
    });

// update user Role - admin
exports.updateUserRole = catchAsyncError(
    async(req,res,next)=>{
        console.log(req.body.role,req.params.id)
        const newUserDetails = {
            name:req.body.name,
            email:req.body.email,
            role:req.body.role,
        };
        // avater will update later
        const user = await User.findByIdAndUpdate(req.params.id,newUserDetails,{
            new:true,
            runValidators:true,
            userFindAndModify:false,
        });
        res.status(200).json({
            success:true,
            // user
        })

    })

// delete user
exports.deleteUser= catchAsyncError(
    async(req,res,next)=>{
        // we will remov avater will update later
        const user = await User.findById(req.params.id);
        if(!user){
            return next(new ErrorHandler(`User does not exits with this id:${req.param.id}`));
        };
        await user.remove();
        res.status(200).json({
            success:true,
            message:"User Deleted successfully"
            // user
        })

    })
