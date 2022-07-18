const path = require('path');
const express = require('express');
const rootDir = require('../utils/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'resources', 'views', 'shop.html'));
    const products = adminData.products;

    // res.render('pug/shop', {prods: products, docTitle: 'Shop'});
    res.render('handlebars/shop', {prods: products, docTitle: 'Shop'});
});

module.exports = router;