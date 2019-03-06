const mongoose = require('mongoose');
const shajs = require('sha.js');
const Game = mongoose.model('Game');
const Solution = mongoose.model('Solution');

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
    // res.send('Time to break the wheel');
    res.render('setData', { title: 'Add' });
};

exports.setGameMode = (req, res) => {
    res.render('modes', { title: 'Set Game Modes' });
};

exports.setAnswers = async (req, res) => {
    // get latest game mode
    const [gameMode] = await Game
    .find()
    .sort({ _id: -1 })
    .limit(1);

    if (gameMode) {
        const levels = gameMode.levels;
        // console.log(gameMode);
    
        res.render('solution', { title: 'Set Answers', levels});
    } else {
        res.redirect('/modes');
    }

};

exports.saveGameMode = async (req, res, next) => {
    // save to db in Game model
    const model = {
        levels: req.body.levels,
        stages: req.body.stages,
    };
    const newModel = new Game(model);
    await newModel.save();

    req.flash('success', 'Game modes set');
    res.redirect('/edit');
};

exports.saveSolution = async (req, res) => {

    // res.json(req.body);

    // hash the answer
    if (req.body.answer) {
        const hash = shajs('sha256').update(req.body.answer).digest('hex');
        // console.log(hash);
    
        const solution = {
            answer: hash,
            level: req.body.level,
            author: req.user.email
        };
    
        const newSolution = new Solution(solution);
        await newSolution.save();
    
        req.flash('success', 'Solution Saved');
    }
    else {
        req.flash('error', 'Please submit an answer');
    }
    res.redirect('back');
    // res.json(req.body);
    // res.json(req.user);
};  