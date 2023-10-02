const express=require('express');
const{registerUser}=require('../controllers/userController');
const{loginUser}=require('../controllers/userController');
const{logoutUser}=require('../controllers/userController');
const router=express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
module.exports=router;
