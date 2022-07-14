const path = require('path');
const express = require('express');
const rootDir = require('../utils/path')

const router = express.Router();

const products = [];

// /admin/add-product - GET
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'resources', 'views', 'add-product.html'));
});

// /admin/add-product - POST
router.post('/add-product', (req, res, next) => {
    products.push({ title: req.title.body });
    res.redirect('/');
});

// module.exports = router;
exports.routes = router;
exports.products = products;