const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('ejs/shop/index', {
            prods: products,
            docTitle: 'Shop',
            path: '/'
        });
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('ejs/shop/product-list', {
            prods: products,
            docTitle: 'All Products',
            path: '/products'
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render('ejs/shop/cart', {
        path: '/cart',
        docTitle: 'Your Cart'
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('ejs/shop/checkout', {
        docTitle: 'Checkout',
        path: '/checkout'
    })
}

exports.getOrders = (req, res, next) => {
    res.render('ejs/shop/orders', {
        docTitle: 'Your Orders',
        path: '/orders'
    })
}
