const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('ejs/admin/edit-product', {
        docTitle: 'Add product',
        path: '/admin/add-product',
        editing: false
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

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }

        res.render('ejs/admin/edit-product', {
            docTitle: 'Edit product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
};

exports.postEditProduct = (req, res, next) => {
    
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