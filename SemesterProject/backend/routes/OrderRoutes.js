const  express=require("express")
const { isAuthenticatedUsers,authorizeRoles } = require('../middleware/auth');
const { newOrder } = require("../controllers/OrderController");
const router =express.Router()
router.route("/order/new").post(isAuthenticatedUsers,newOrder)
module.exports=router;