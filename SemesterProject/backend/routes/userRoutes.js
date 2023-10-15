const express=require('express')
const{registerUser, forgotPassword, updateUserProfile}=require('../controllers/userController');
const{loginUser}=require('../controllers/userController');
const{logoutUser}=require('../controllers/userController');
const { registerSuccesFull } = require('../utils/otp');
const {resetPassword,getUserDetails}=require('../controllers/userController');
const { isAuthenticatedUsers,authorizeRoles } = require('../middleware/auth');
const { updatePassword ,getAllUsers,getSingleUser} = require('../controllers/userController');
const router=express.Router();




router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logoutUser)
router.route('/me').get(isAuthenticatedUsers,getUserDetails)
router.route('/password/update').put(isAuthenticatedUsers,updatePassword)
router.route('/me/update').put(isAuthenticatedUsers,updateUserProfile)
router.route('/admin/users').get(isAuthenticatedUsers,authorizeRoles('admin'),getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUsers,authorizeRoles('admin'),getSingleUser)  


module.exports=router;
