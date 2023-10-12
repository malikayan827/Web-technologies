const express=require('express');
const{registerUser, forgotPassword}=require('../controllers/userController');
const{loginUser}=require('../controllers/userController');
const{logoutUser}=require('../controllers/userController');
const { registerSuccesFull } = require('../utils/otp');
const {resetPassword}=require('../controllers/userController');
const router=express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logoutUser)


module.exports=router;
