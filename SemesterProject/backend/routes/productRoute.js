const express = require('express');
const { getAllproducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const router = express.Router();
router.route('/products').get(getAllproducts);
router.route('/products/new').post(createProduct);
router.route('/products/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router;