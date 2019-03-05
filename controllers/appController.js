exports.getHomePage = (req, res) => {
    res.render('welcome', { title: 'Let\'s begin' });
};

exports.startGame = (req, res) => {
    res.render('game', { title: 'Let\'s Play' });
};