const mongoose = require('mongoose');
const User = mongoose.model('User');
const Solution = mongoose.model('Solution');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const promisify = require('es6-promisify');

/* ---------------------------------------------------- */

exports.loginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};


exports.hasSubmittedInfo = async (req, res, next) => {
    const user = await User.findOne({
        _id: req.user._id
    });
    // res.json(user);
    if (user.hasSubmitted) {
        return next();
    }
    res.render('getDetails', { title: 'Complete Signing Up '});
};


exports.submitInfo = async (req, res) => {
    const submittedData = {
        nickname: req.body.nickname,
        college: req.body.collegeName,
        contact: req.body.number,
        hasSubmitted: 1
    };

    await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: submittedData },
        { new: true, runValidators: true, context: 'query' }
    );

    // req.flash('success', 'Saved successfully');
    res.redirect('/play');
};


exports.isAdmin = async (req, res, next) => {
    const user = await User.findOne({
        _id: req.user._id
    });

    if (user.permission > 10) {
        return next();
    }
    // req.flash('error', 'Nice try, You must be an admin to do that!');
    res.redirect('/');
};

exports.editProfile = async (req, res) => {
    res.render('account', { title: 'Edit Profile' });
};


exports.updateAccount = async (req, res) => {
    // res.send(req.body);
    const updates = {
        nickname: req.body.nickname,
        college: req.body.collegeName,
        contact: req.body.number
    };
    
    await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query' }
    );
    
    // req.flash('success', 'Updated successfully');
    res.redirect('back');
};


exports.submitAnswer = async (req, res) => {
    // res.json(req.body.answer);
    // res.json(req.user.level);

    // get ans according to user level
    const [savedSolutionData] = await Solution
    .find({
        level: req.user.level
    });
    
    if (savedSolutionData && savedSolutionData.answer.length) {
        const savedAnswer = savedSolutionData.answer;
        // remove special symbols, white spaces and lowercase it
        const submitted = req.body.answer;
        const regStr = submitted.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\s]/gi, '');
        const lowerStr = regStr.toLowerCase();

        // check if answers match
        if (lowerStr === savedAnswer) {
            // res.send('Right answer');            
            const newLevel = ++req.user.level;
            // update user level and time

            const updates = {
                level: newLevel,
                timeOfScore: Date.now()
            };
            
            const user = await User.findOneAndUpdate(
                { _id: req.user._id },
                { $set: updates },
                { new: true, runValidators: true, context: 'query' }
            );

            // update rank
            const updateRank = promisify(user.setNext, user);
            await updateRank('rank_counter');

            // send status: true
            res.json({ status: true });            
            // req.flash('success', 'Right answer. Hurrayyy!!!');
        } 
        else {
            res.json({ status: false });
            // req.flash('error', 'Wrong answer, Please try again.');
        }
        // render out next qn        
        // res.redirect('back');
    }
    else {
        // if solution for that submission is not found!!!!
        res.render('pause', { title: 'Coming Soon' });
    }
};