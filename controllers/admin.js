const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('ejs/admin/add-product', {
        docTitle: 'Add product',
        path: '/admin/add-product'
    });
};

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    console.log(product);
    product.save();

    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('ejs/admin/products', {
            prods: products,
            docTitle: 'Admin products',
            path: '/admin/products'
        });
    });
};