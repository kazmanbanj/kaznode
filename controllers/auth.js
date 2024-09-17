const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { sendSignupEmail } = require('../mail/mailer');

exports.getLogin = (req, res, next) => {
    res.render('ejs/auth/login', {
        docTitle: 'Login',
        path: '/login',
    });
};


exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
    .then(user => {
        if (!user) {
            req.flash('error', 'Invalid credentials');
            return res.redirect('/login');
        }

        bcrypt.compare(password, user.password)
        .then(doMatch => {
            if (doMatch) {
                // storing the user doc in a session after login is  successful
                req.session.user = user;
                req.session.isLoggedIn = true;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
            } else {
                req.flash('error', 'Invalid credentials');
                res.redirect('/login');
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
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

exports.getSignup = (req, res, next) => {
    res.render('ejs/auth/signup', {
        docTitle: 'Signup',
        path: '/signup',
    });
};

exports.postSignup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (!username || !email || !password || !confirmPassword) {
        req.flash('error', 'Fields cannot be empty.');
        return res.redirect('/signup');
    }

    User.findOne({
        email: email
    })
    .then(userDoc => {
        if (userDoc) {
            req.flash('error', 'Email already exists. please pick another one.');
            return res.redirect('/signup');
        }

        return bcrypt.hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                username: username,
                email: email,
                password: hashedPw,
                cart: { items: [] }
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
            return sendSignupEmail(
                email,
                'Welcome to Kaznode!',
                username
            );
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });

};