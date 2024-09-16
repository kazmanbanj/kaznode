const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('ejs/auth/login', {
        docTitle: 'Login',
        path: '/login',
        isAuthenticated: false
    });
};


exports.postLogin = (req, res, next) => {
    User.findById("66e6ee269037c39b55aa593b")
    .then(user => {
        req.session.user = user;
        req.session.isLoggedIn = true;
        req.session.save(err => {
            console.log(err);
            res.redirect('/');
        });
    })
    .catch(err => console.log(err));
};


exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};