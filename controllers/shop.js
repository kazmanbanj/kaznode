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

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('ejs/shop/product-detail', {
            product: product,
            path: '/products',
            docTitle: product.title
        });
    })
}

exports.getCart = (req, res, next) => {
    res.render('ejs/shop/cart', {
        path: '/cart',
        docTitle: 'Your Cart'
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    
    res.redirect('/cart');
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
