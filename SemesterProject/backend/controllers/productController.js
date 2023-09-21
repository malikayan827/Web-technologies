const Product = require('../models/productModel');
//create product
exports.createProduct=async (req,res,next)=>{
    const product=await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
}
//get all products
exports.getAllproducts = async(req,res)=>{
    const products=await Product.find()
    res.status(200).json({
        status:'success',
        products
    })

}
//update product admin
exports.updateProduct=async (req,res,next)=>{
    let product= await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({
            success:false,
            message:'Product not found'
        })
    }
    product=await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
            runValidators:true,
            useFindAndModify:false
        }
    )
    res.status(200).json({
        success:true,
        product
    })
}
// //delete product admin
// exports.deleteProduct=async (req,res,next)=>{
//     const product=await Product.findById(req.params.id)
//     if(!product){
//         return res.status(404).json({
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
exports.deleteProduct = async (req, res, next) => {
    try {
      const productId = req.params.id;
  
      
      const result = await Product.deleteOne({ _id: productId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      }); // Respond with a 204 status (No Content) for successful deletion.
    } catch (error) {
      next(error); // Pass any errors to the error handling middleware.
    }
  };
//get single product details
exports.getProductDetails=async (req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({
            success:false,
            message:'Product not found'
        })
    }
    res.status(200).json({
        success:true,
        product
    })
}
  


    