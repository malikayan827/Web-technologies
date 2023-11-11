const  express=require("express")
const { isAuthenticatedUsers,authorizeRoles } = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders,getAllOrders,updateOrder,deleteOrder} = require("../controllers/OrderController");
const router =express.Router()
router.route("/order/new").post(isAuthenticatedUsers,newOrder)
router.route("/order/:id").get(isAuthenticatedUsers,getSingleOrder)
router.route("/orders/me").get(isAuthenticatedUsers,myOrders)
router.route("/admin/orders").get(isAuthenticatedUsers,authorizeRoles('admin'),getAllOrders)
router.route("/admin/order/:id").put(isAuthenticatedUsers,authorizeRoles('admin'),updateOrder).delete(isAuthenticatedUsers,authorizeRoles('admin'),deleteOrder) 

module.exports=router;