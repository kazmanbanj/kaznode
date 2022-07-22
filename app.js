const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const {engine} = require('express-handlebars'); for hbs

const errorController = require('./controllers/error');

const app = express();

// app.engine('hbs', engine({ extname: "hbs", defaultLayout: false })); for hbs

// app.set('view engine', 'pug');
// app.set('view engine', 'hbs'); for hbs
app.set('view engine', 'ejs');
app.set('views', 'resources/views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminData.routes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000)