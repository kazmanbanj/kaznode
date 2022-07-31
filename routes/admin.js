const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product -> GET
router.get('/add-product', adminController.getAddProducts);
router.get('/products', adminController.getProducts);
router.get('/edit-product', adminController.getEditProduct);

// /admin/add-product -> POST
router.post('/add-product', adminController.postAddProducts);

module.exports = router;