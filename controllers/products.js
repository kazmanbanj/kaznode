const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('ejs/add-product', {
        docTitle: 'Add product',
        path: 'admin/add-product'
    });
};

exports.postAddProducts = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();

    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll();

    res.render('ejs/shop', {
        prods: products,
        docTitle: 'Shop',
        hasProducts: products.length > 0,
        path: '/'
    });
};