const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('ejs/admin/add-product', {
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
    Product.fetchAll(products => {
        res.render('ejs/shop/product-list', {
            prods: products,
            docTitle: 'Shop',
            hasProducts: products.length > 0,
            path: '/'
        });
    });
};