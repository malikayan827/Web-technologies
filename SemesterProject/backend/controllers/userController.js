const Product = require("../models/productModel");
const sendToken = require("../utils/jwttoken");
const ErrorHandler = require("../utils/errorhandler");
const User=require('../models/userModel')
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//register a user
exports.registerUser = catchAsyncErrors( async(req, res, next) => {
  
    const{name,email,password}=req.body;
    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'this is a sample id',
            url:'profilepic'
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