const Product = require("../models/product");
const Order = require("../models/order");

exports.getIndex = (req, res, next) => {
    Product.find({})
        .then((products) => {
            res.render("ejs/shop/index", {
                prods: products,
                docTitle: "Shop",
                path: "/",
            });
        })
        .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.find({})
        .then((products) => {
            res.render("ejs/shop/product-list", {
                prods: products,
                docTitle: "All Products",
                path: "/products",
            });
        })
        .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((product) => {
            res.render("ejs/shop/product-detail", {
                product: product,
                path: "/products",
                docTitle: product.title,
            });
        })
        .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then((user) => {
            const products = user.cart.items;
            res.render("ejs/shop/cart", {
                path: "/cart",
                docTitle: "Your Cart",
                products: products,
            });
            // })
            // .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then((product) => {
            return req.user.addToCart(product);
        })
        .then((result) => {
            console.log(result);
            res.redirect("/cart");
        })
        .catch((err) => {
            console.log(err);
        });

    // let fetchedCart;
    // let newQuantity = 1;
    // req.user
    //     .getCart()
    //     .then(cart => {
    //     fetchedCart = cart;
    //     return cart.getProducts({ where: { id: prodId } });
    //     })
    // .then(products => {
    //     let product;
    //     if (products.length > 0) {
    //     product = products[0];
    //     }

    //     if (product) {
    //     const oldQuantity = product.cartItem.quantity;
    //     newQuantity = oldQuantity + 1;
    //     return product;
    //     }
    //     return Product.findByPk(prodId);
    // })
    // .then(product => {
    //     return fetchedCart.addProduct(product, {
    //     through: { quantity: newQuantity }
    //     });
    // })
    // .then(() => {
    //     res.redirect('/cart');
    // })
    // .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        .then((result) => {
            res.redirect("/cart");
        })
        .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .then((user) => {
        const products = user.cart.items.map(i => {
            return {
                quantity: i.quantity,
                product: { ...i.productId._doc }
            };
        });

        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products
        });

        order.save();
    })
    .then((result) => {
        req.user.clearCart();
    })
    .then(() => {
        res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
    Order.find({ "user.userId": req.user._id })
    .then((orders) => {
        res.render("ejs/shop/orders", {
            docTitle: "Your Orders",
            path: "/orders",
            orders: orders,
        });
    })
    .catch((err) => console.log(err));
};

// exports.getCheckout = (req, res, next) => {
//     res.render('ejs/shop/checkout', {
//         docTitle: 'Checkout',
//         path: '/checkout'
//     })
// }
