const Order = require('..//models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = require('..//utils/errorhandler')
const catchAsyncErrors = require('..//middleware/catchAsyncErrors')
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    })
    res.status(200).json({
        success: true,
        order
    })
})
//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order=await Order.findById(req.params.id).populate('user','name email')
    if(!order){
        return next(new ErrorHandler('No Order found with this ID',404))
    }
    res.status(200).json({
        success:true,
        order,
    })
})
//get logged in user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders=await Order.find({user:req.user.id})
    res.status(200).json({
        success:true,
        orders,
    })
})
//get all orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders=await Order.find()
    let totalAmount=0
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })
    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
}
)
//update order status