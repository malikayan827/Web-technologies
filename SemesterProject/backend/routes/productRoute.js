const express = require('express');
const { isAuthenticatedUsers,authorizeRoles } = require('../middleware/auth');
const { getAllproducts,createProduct, updateProduct, deleteProduct, getProductDetails,createProductReview, getProductReviews, deleteReview} = require('../controllers/productController');
const router = express.Router();
router.route('/products')
.get(
    getAllproducts);
router.route('/admin/products/new')
.post(isAuthenticatedUsers,
    authorizeRoles('admin'),createProduct);
router
.route('/admin/products/:id')
.put(isAuthenticatedUsers,
    authorizeRoles('admin'),updateProduct)
.delete(isAuthenticatedUsers,
    authorizeRoles('admin'),deleteProduct)
;

router
.route('/products/:id').get(getProductDetails)
;
router.route('/review').post(isAuthenticatedUsers,createProductReview)
router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUsers,deleteReview)


module.exports = router;
