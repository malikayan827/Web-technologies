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
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order=await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler('No Order found with this ID',404))
    }
    if(order.orderStatus==='Delivered'){
        return next(new ErrorHandler('You have already delivered this order',400))
    }
    order.orderItems.forEach(async order=>{
        await updateStock(order.product,order.quantity)
    })
    order.orderStatus=req.body.status
    if(req.body.status=='Delivered'){
     order.deliveredAt=Date.now()}
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
    })

})
async function updateStock(id,quantity){
    const product=await Product.findById(id)
    product.stock-=quantity
    await product.save({validateBeforeSave:false})

}
//delete order
exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler('No Order found with this ID',404))
    }
    await order.deleteOne()
    res.status(200).json({
        success:true,
    })
})

