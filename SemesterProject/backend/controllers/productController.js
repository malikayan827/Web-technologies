const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors
    = require("../middleware/catchAsyncErrors");
const Apifeatures = require("../utils/apiFeatures");

//create product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;
    
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all products
exports.getAllproducts =catchAsyncErrors( async (req, res) => {
const resultPerPage=5;
const productCount=await Product.countDocuments()
const apifeature=new Apifeatures(Product.find(), req.query)
.search().filter().pagination(resultPerPage)

  const products = await apifeature.query;
  res.status(200).json({
    status: "success",
    products,
  });
})
//update product admin
exports.updateProduct =catchAsyncErrors( async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// exports.deleteProduct=async (req,res,next)=>{
//     const product=await Product.findById(req.params.id)
//     if(!product){
//         return res.status(500).json({
//             success:false,
//             message:'Product not found'
//         })
//     }
//     await product.remove()
//     res.status(200).json({
//         success:true,
//         message:'Product is deleted'
//     })

// }
// Delete a product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;

    const result = await Product.deleteOne({ _id: productId });

    if (result.deletedCount === 0) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    }); // Respond with a 204 status (No Content) for successful deletion.
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware.
  }
});
//get single product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});
