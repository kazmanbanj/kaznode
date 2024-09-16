require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const errorController = require('./controllers/error');

const User = require('./models/user');

// requiring the routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const dbUri= process.env.MONGO_URI;

// using the expressJs and session
const app = express();
const store = new MongoDBStore({
    uri: dbUri,
    collection: 'sessions',
    // expires:
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'resources/views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
    // cookie: {}
}));
app.use(csrfProtection);

// retrieving a user
app.use((req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
    }
});

// making a variable available in all views
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);


if (!dbUri) {
    throw new Error('Missing required environment variables');
}

mongoose.connect(`${dbUri}`)
.then(result => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});






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



// used by sequelize
// app.use('/admin', adminData.routes);


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
