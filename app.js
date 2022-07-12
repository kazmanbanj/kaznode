const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// const routes = require('./routes.example');
// const server = http.createServer(routes.handler);

app.use(bodyParser.urlencoded({extended: false}));
app.use(adminRoutes);
app.use(shopRoutes);


// const server = http.createServer(app);

app.listen(3000)