exports.getAllproducts = (req,res)=>{
    res.status(200).json({
        status:'success',
        message:'This route will show all products'
    })
}