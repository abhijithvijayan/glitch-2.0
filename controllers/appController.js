exports.getHomePage = (req, res) => {
    res.render('layout', { title: 'Let\'s begin' });
};