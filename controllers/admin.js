// const mongodb = require('mongodb');
// const ObjectId = mongodb.ObjectId;

const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    res.render('ejs/admin/edit-product', {
        docTitle: 'Add product',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: req.isLoggedIn
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user,
    });

    product.save()
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            // const product = products[0];
            if (!product) {
                return res.redirect('/');
            }

            res.render('ejs/admin/edit-product', {
                docTitle: 'Edit product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
                isAuthenticated: req.isLoggedIn
            });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
        console.log('Updated product!');
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    Product.findById(prodId)
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDesc;

        return product.save()
    })
    .then(result => {
        console.log('Updated product!');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err))
};

exports.getProducts = (req, res, next) => {
    Product.find({})
    // .select('title price -_id')
    // .populate('userId', 'name')
    .populate('userId')
    .then(products => {
        res.render('ejs/admin/products', {
            prods: products,
            docTitle: 'Admin products',
            path: '/admin/products',
            isAuthenticated: req.isLoggedIn
        });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndDelete(prodId)
    .then(() => {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

};