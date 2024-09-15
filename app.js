require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

// // using sequelize to manage data in the database
// const sequelize = require('./utils/database');
// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');


// using mongodb to manage data in the database
// const mongoConnect = require('./utils/database').mongoConnect;

const User = require('./models/user');

// using the expressJs
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'resources/views');

// used by sequelize
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// retrieving a user
app.use((req, res, next) => {
    User.findById("66e6ee269037c39b55aa593b")
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));

    // next();
})

// used by sequelize
// app.use('/admin', adminData.routes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// // for sequelize n mysql connections
// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, {through: CartItem});
// Product.belongsToMany(Cart, {through: CartItem});
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, {through: OrderItem}); // this creates a orderId, productId relations in orderItems table
// sequelize
// // .sync({force: true})
// .sync()
// .then(result => {
//     return User.findByPk(1);
// })
// .then(user => {
//     if (!user) {
//         return User.create({name: 'John Doe', email: 'johndoe@email.com'});
//     }
//     return user;
// })
// .then(user => {
//     user.createCart();
// })
// .then(cart => {
//     app.listen(3000);
// })
// .catch(err => console.log(err));


// mongoConnect(() => {
//     app.listen(3000);
// });
const dbUrl = process.env.MONGO_URI;

if (!dbUrl) {
    throw new Error('Missing required environment variables');
}

mongoose.connect(`${dbUrl}`)
    .then(result => {
        User.findById("66e6ee269037c39b55aa593b")
        .then(user => {
            if (!user) {
                const user = new User({
                    name: 'Kaz',
                    email: 'kaz@email.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });

        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });