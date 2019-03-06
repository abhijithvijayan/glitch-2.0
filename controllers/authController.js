const passport = require('passport');

// auth with google
exports.login = passport.authenticate('google', {
    scope: ['email', 'profile']
});

// after login -> comes here(get url code) // callback fn fires
exports.redirectLogin = passport.authenticate('google', {
    successFlash: 'You are now Logged In',
    successRedirect: '/account',
    failureFlash: 'Failed to Login!',
    failureRedirect: '/login'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Logged out successfully');
    res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
    // check if user is authenticated
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You must log in first!');
    res.redirect('/login');
};

exports.isNotLoggedIn = (req, res, next) => {
    // check if user is authenticated
    if (!req.isAuthenticated()) {
        return next();
    }
    req.flash('info', 'Already Logged in');
    res.redirect('/play');
};