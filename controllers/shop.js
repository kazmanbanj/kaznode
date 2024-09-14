const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
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
    Product.fetchAll()
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
    Product.findByPk(prodId)
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
        .getCart()
        .then((products) => {
            //   return cart
            //     .getProducts()
            //     .then((cartProducts) => {
            console.log(products);

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
    Product.findByPk(prodId)
        .then((product) => {
            return req.user.addToCart(product);
        })
        .then((result) => {
            console.log(result);
            res.redirect("/cart");
        })
        .catch((result) => {
            console.log(result);
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
        .deleteItemFromCart(prodId)
        .then((result) => {
            res.redirect("/cart");
        })
        .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then((products) => {
            return req.user
                .createOrder()
                .then((order) => {
                    return order.addProducts(
                        products.map((product) => {
                            product.orderItem = { quantity: product.cartItem.quantity };
                            return product;
                        })
                    );
                })
                .catch((err) => console.log(err));
        })
        .then((result) => {
            return fetchedCart.setProducts(null);
        })
        .then((result) => {
            res.redirect("/orders");
        })
        .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders({ include: ["products"] })
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
