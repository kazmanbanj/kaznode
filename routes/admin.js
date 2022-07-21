const path = require('path');
const express = require('express');
const rootDir = require('../utils/path')

const router = express.Router();

const products = [];

// /admin/add-product - GET
router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'resources', 'views', 'add-product.html'));

    // res.render('pug/add-product', {docTitle: 'Add product'});
    // res.render('handlebars/add-product', {docTitle: 'Add product'});
    res.render('ejs/add-product', {
        docTitle: 'Add product',
        path: 'admin/add-product'
    });
});

// /admin/add-product - POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body.title);
    products.push({ title: req.body.title });
    console.log(products);
    // res.redirect('/');

    // res.render('pug/shop', {prods: products, docTitle: 'Add product'});
    // res.render('handlebars/shop', {prods: products, docTitle: 'Add product'});
    res.render('ejs/shop', {
        prods: products,
        docTitle: 'Add product',
        path: 'admin/add-product'
    });
});

// module.exports = router;
exports.routes = router;
exports.products = products;