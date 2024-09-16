
exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie').split('=')[1] == 'true';

    res.render('ejs/auth/login', {
        docTitle: 'Login',
        path: '/login',
        isAuthenticated: false
    });
};


exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true; Expires=; Secure; Max-Age=10; Domain=; HttpOnly;');

    req.session.isLoggedIn = true;
    res.redirect('/');
};