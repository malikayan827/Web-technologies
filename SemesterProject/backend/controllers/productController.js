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
exports.getAllproducts =catchAsyncErrors( async (req, res,next) => {
  
const resultPerPage=8;
const productsCount=await Product.countDocuments()
const apifeature=new Apifeatures(Product.find(), req.query)
.search().filter().pagination(resultPerPage)

  const products = await apifeature.query;
  res.status(200).json({
    status: "success",
    products,
    productsCount,
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
    }); 
  } catch (error) {
    next(error); 
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
    
  });
});
//create new review and update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment,productId } = req.body;
  const review={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment,

  }
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg=0
  
  product.reviews.forEach(rev=>{
    avg=avg+rev.rating

  }
    )
  product.ratings =avg/product.reviews.length;
      await product.save({validateBeforeSave:false})
  res.status(200).json({
    success: true,
  });
}

);
//get product reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product=await Product.findById(req.query.id);
  if(!product){
    return next(new ErrorHandler('Product not found',404))
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
}
);
//delete product review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product=await Product.findById(req.query.productId);
  if(!product){
    return next(new ErrorHandler('Product not found',404))
  }
  const reviews=product.reviews.filter((review)=>review._id.toString()!==req.query.id.toString())
  let avg=0
  
 reviews.forEach((rev)=>{
    avg +=rev.rating

  })
    
 const ratings =avg/reviews.length;
const numOfReviews=reviews.length
await Product.findByIdAndUpdate(req.query.productId,{
  reviews,
  ratings,
  numOfReviews
},{
  new:true,
  runValidators:true,
  useFindAndModify:false
})
  res.status(200).json({
    success: true,
    
  });
}
);