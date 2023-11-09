const  express=require("express")
const { isAuthenticatedUsers,authorizeRoles } = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders } = require("../controllers/OrderController");
const router =express.Router()
router.route("/order/new").post(isAuthenticatedUsers,newOrder)
router.route("/order/:id").get(isAuthenticatedUsers,getSingleOrder)
router.route("/orders/me").get(isAuthenticatedUsers,myOrders)
module.exports=router;