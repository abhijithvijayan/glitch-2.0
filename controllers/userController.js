const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const Solution = mongoose.model('Solution');


// hashing function
const hashThis = (salt, answer) => {
    const hash = crypto.createHmac('sha256', salt);
    hash.update(answer);
    const hashedAnswer = hash.digest('hex');
    return hashedAnswer;
};

// salt generating function
const genSalt = () => {
    return crypto.randomBytes(20).toString('hex');
};


/* ---------------------------------------------------- */

exports.loginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

exports.hasSubmittedInfo = async (req, res, next) => {
    const user = await User.findOne({
        _id: req.user._id
    });
    // res.json(user);
    //console.log(user);
    if (user.hasSubmitted) {
        return next();
    }
    res.render('getDetails', { title: 'Complete Signing Up '});
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
    res.redirect('/play');
};


exports.isAdmin = async (req, res, next) => {
    const user = await User.findOne({
        _id: req.user._id
    });

    if (user.permission > 10) {
        return next();
    }
    req.flash('error', 'Nice try, You must be an admin to do that!');
    res.redirect('/');
};

exports.editProfile = async (req, res) => {
    res.render('account', { title: 'Edit Details' });
};


exports.updateAccount = async (req, res) => {
    // res.send(req.body);
    const updates = {
        nickname: req.body.nickname,
        college: req.body.collegeName
    };
    
    await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query' }
    );
    
    req.flash('success', 'Updated successfully');
    res.redirect('back');
};


exports.submitAnswer = async (req, res) => {
    // res.json(req.body.answer);
    // res.json(req.user.level);

    const [savedSolutionData] = await Solution
    .find({
        level: req.user.level
    });

    
    if (savedSolutionData && savedSolutionData.answer.length) {
        
        // get hashed answer from db
        const savedAnswer = savedSolutionData.answer;
        // get salt from db
        const salt = savedSolutionData.salt;
        // hash the user submitted answer
        const hashSubmitted = hashThis(salt, req.body.answer);

        // check if hashes match
        if (hashSubmitted === savedAnswer) {
            // res.send('Right answer');            
            const newLevel = ++req.user.level;
            // update user level and time
            const updates = {
                level: newLevel,
                timeOfScore: Date.now()
            };
            
            await User.findOneAndUpdate(
                { _id: req.user._id },
                { $set: updates },
                { new: true, runValidators: true, context: 'query' }
            );
            req.flash('success', 'Right answer. Hurrayyy!!!');
        } 
        else {
            req.flash('error', 'Wrong answer, Please try again.');
        }
        // render out next qn        
        res.redirect('back');
    }
    else {
        // req.flash('error', 'Game not yet ready to play!!!');
        res.render('pause', { title: 'Coming Soon' });
    }
};