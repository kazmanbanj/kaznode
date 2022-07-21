const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const {engine} = require('express-handlebars'); for hbs

const app = express();

// app.engine('hbs', engine({ extname: "hbs", defaultLayout: false })); for hbs

// app.set('view engine', 'pug');
// app.set('view engine', 'hbs'); for hbs
app.set('view engine', 'ejs');
app.set('views', 'resources/views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'resources', 'views', 'html', '404.html'));

    // res.status(404).render('pug/404', {docTitle: 'Page not found'});
    // res.status(404).render('handlebars/404', {docTitle: 'Page not found'});
    res.status(404).render('ejs/404', {docTitle: 'Page not found'});
});

app.listen(3000)