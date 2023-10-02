const express = require('express');
const { isAuthenticatedUsers,authorizeRoles } = require('../middleware/auth');
const { getAllproducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const router = express.Router();
router.route('/products')
.get(
    getAllproducts);
router.route('/products/new')
.post(isAuthenticatedUsers,
    authorizeRoles('admin'),createProduct);
router
.route('/products/:id')
.put(isAuthenticatedUsers,
    authorizeRoles('admin'),updateProduct)
.delete(isAuthenticatedUsers,
    authorizeRoles('admin'),deleteProduct)
.get(getProductDetails);

module.exports = router;