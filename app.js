const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {engine} = require('express-handlebars');

const app = express();
const publicDirectory = path.join(__dirname, '../resources/views');

app.engine('handlebars', engine({ extname: "hbs", layoutsDir: "views/handlebars/layout", defaultLayout: "layout-main" }));

// app.set('view engine', 'pug');
app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'resources/views'));
app.set('views', 'resources/views');

// Setup static directory to serve
// app.use(express.static(publicDirectory));

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'resources', 'views', '404.html'));

    // res.status(404).render('pug/404', {docTitle: 'Page not found'});
    return res.status(404).render('handlebars/404', {docTitle: 'Page not found'});
});

app.listen(3000)