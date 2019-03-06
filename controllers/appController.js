const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getHomePage = (req, res) => {
    res.render('welcome', { title: 'Let\'s begin' });
};

exports.startGame = (req, res) => {
    res.redirect('/play');
};

exports.preCheck = (req, res) => {
    res.redirect('/account');
};

exports.renderGame = (req, res) => {
    // res.json(req.user);
    res.render('game', { title: 'Let\'s Play' });
};

exports.editGame = (req, res) => {
    res.send('Time to break the wheel');
};