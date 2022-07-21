const products = [];

exports.getAddProducts = (req, res, next) => {
    res.render('ejs/add-product', {
        docTitle: 'Add product',
        path: 'admin/add-product'
    });
};

exports.postAddProducts = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    res.render('ejs/shop', {
        prods: products,
        docTitle: 'Shop',
        hasProducts: products.length > 0,
        path: '/'
    });
};