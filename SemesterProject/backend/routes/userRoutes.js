const express=require('express')
const{registerUser, forgotPassword}=require('../controllers/userController');
const{loginUser}=require('../controllers/userController');
const{logoutUser}=require('../controllers/userController');
const { registerSuccesFull } = require('../utils/otp');
const {resetPassword,getUserDetails}=require('../controllers/userController');
const { isAuthenticatedUsers,authorizeRoles } = require('../middleware/auth');
const router=express.Router();




router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logoutUser)
router.route('/me').get(isAuthenticatedUsers,getUserDetails)


module.exports=router;
