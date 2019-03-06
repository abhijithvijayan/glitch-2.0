const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.loginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

exports.hasSubmittedInfo = async (req, res, next) => {
    // res.json(req.user._id);
    const user = await User.findOne({
        _id: req.user._id
    });
    // res.json(user);
    //console.log(user);

    if (user.hasSubmitted) {
        return next();
    }
    else {
        res.render('getDetails', { title: 'Complete Signing Up '});
    }
};


exports.submitInfo = async (req, res) => {
    const submittedData = {
        nickname: req.body.nickname,
        college: req.body.collegeName,
        hasSubmitted: 1
    };

    const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: submittedData },
        { new: true, runValidators: true, context: 'query' }
    );

    req.flash('success', 'Saved successfully');
    // res.json(user);
    res.redirect('/play');
};

exports.isAdmin = async (req, res, next) => {
    const user = await User.findOne({
        _id: req.user._id
    });

    if (user.permission > 10) {
        return next();
    }
    else {
        req.flash('error', 'Nice Try');
        res.redirect('/');
    }
};

exports.editProfile = async (req, res) => {
    // render edit profile form
    res.render('account', { title: 'Edit Details' });
};


exports.updateAccount = async (req, res) => {
    // find updated variables first
    // res.send(req.body);
    const updates = {
        nickname: req.body.nickname,
        college: req.body.collegeName
    };
    // (q, u, o)
    const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query' }
    );

    
    req.flash('success', 'Updated successfully');
    // res.json(user);
    res.redirect('back');
};