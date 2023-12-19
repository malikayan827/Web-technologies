const Product = require("../models/productModel");
const sendToken = require("../utils/jwttoken");
const ErrorHandler = require("../utils/errorhandler");
const User=require('../models/userModel')
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail=require('../utils/sendEmail');
const Email=require('../utils/Email');
const nodeMailer = require('nodemailer');
const generateOTP = require('../utils/otp');
const crypto=require('crypto');
var cloudinary = require('cloudinary');


//register a user
exports.registerUser = catchAsyncErrors( async(req, res, next) => {
    const mycloud=await cloudinary.v2.uploader.upload(req.body.image,{
        folder:'avatars',
        width:150,
        crop:'scale'
    })
    const{name,email,password}=req.body;
    const user=await User.create({
        name,
        email,
        password,
        image:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        }
    })
    sendToken(user,201,res);


})
//login user
exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password',400));
    }

    const user=await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandler('Invalid email or password',401));
    }
    //check if password is correct or not
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password',401));
    }
    sendToken(user,200,res);
}
)
//logout user
exports.logoutUser = catchAsyncErrors( async(req, res, next) => {
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:'Logged out'
    })
}
)
//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user =await User.findOne({email:req.body.email}); 
    if(!user){
        return next(
        new ErrorHandler('User not found with this email',404))
        
    }
    //get reset token
    const resetToken=user.getResetPasswordToken();
   
    await user.save({validateBeforeSave:false});
    //create reset password url
    const resetUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message=`Your password reset token is as follows this:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;
    try{
        await Email({
            email:user.email,
            subject:'Ecom password recovery',
            message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email}`
        })
    }
    catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))
    }

 
})
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //hash url token
    const resetPasswordToken=
    crypto.createHash('sha256')
    .update(req.params.token)
    .digest('hex');
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired',400))
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match',400))
    }
    //setup new password
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res);
}
)
//get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      user
    });
  });
//update password
exports.updatePassword=catchAsyncErrors(async (req, res, next) => {
    const user=await User.findById(req.user.id).select('+password');
    //check previous user password
    const isMatched=await user.comparePassword(req.body.oldPassword);
    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrect',400))
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match',400))
    }
    user.password = req.body.newPassword;

    await user.save();
    sendToken(user,200,res);
}
)
//update profile
exports.updateUserProfile=catchAsyncErrors(async (req, res, next) => {
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
    //update image
    if(req.body.image !== ''){
        const user=await User.findById(req.user.id);
        const image_id=user.image.public_id;
        const res=await cloudinary.v2.uploader.destroy(image_id);
        const mycloud=await cloudinary.v2.uploader.upload(req.body.image,{
            folder:'avatars',
            width:150,
            crop:'scale'
        })
        newUserData.image={
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        }
    }
    
    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
res.status(200).json({  
    success:true
})

   
}
)
//get all users
exports.getAllUsers=catchAsyncErrors(async (req, res, next) => {
    const users=await User.find();
    res.status(200).json({
        success:true,
        users
    })
}
)
//get single user details (admin)
exports.getSingleUser=catchAsyncErrors(async (req, res, next) => {
    const users=await User.findById(req.params.id);
    if(!users){
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        users
    })
}
)
//update user role
exports.updateUserRole=catchAsyncErrors(async (req, res, next) => {
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    // console.log(newUserData)
    //update avatar
    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
res.status(200).json({  
    success:true
})

   
}
)
//delete user
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`));
    }

    // Only if the user is found, call the remove method
    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: 'User deleted',
    });
});




