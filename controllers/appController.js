const mongoose = require('mongoose');
const shajs = require('sha.js');
const Game = mongoose.model('Game');
const Solution = mongoose.model('Solution');


// hashing function
const hashThis = (value) => {
    return shajs('sha256').update(value).digest('hex');
};


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
        author: req.user.email
    };
    const newModel = new Game(model);
    await newModel.save();

    req.flash('success', 'Game modes set');
    res.redirect('/edit');
};

exports.saveSolution = async (req, res) => {

    if (req.body.answer) {

        // find alterations (check if level is below the saved in db : Game Model)
        const [gameMode] = await Game
        .find()
        .sort({ _id: -1 })
        .limit(1);
    
        if (gameMode) {
            const levels = gameMode.levels;
            // submitted level lies between the set
            if (req.body.level <= levels) {

                const hash = hashThis(req.body.answer);
                // console.log(hash);
            
                const solution = {
                    answer: hash,
                    level: req.body.level,
                    author: req.user.email
                };
                
                // save to db
                const newSolution = new Solution(solution);
                await newSolution.save();
            
                req.flash('success', 'Solution Saved');
            } 
            else {
                req.flash('error', `There are only ${levels} levels`);
                res.redirect('/answers');
            }
        }
        else {
            req.flash('error', 'Please set the game modes');
            res.redirect('/modes');
        }
    }
    else {
        req.flash('error', 'Please submit an answer');
    }
    res.redirect('back');
};  


exports.editAnswers = async (req, res) => {
    // get submitted answer levels
    const levelsObj = await Solution
    .find({}, 'level -_id')
    .sort({ level: 1 });

    // console.log(levelsObj);

    if (levelsObj.length) {
        // extract from array of objects
        let levels = levelsObj.map(a => a.level);
        // console.log(levels);
        res.render('solution', { title: 'Edit Answers', levels});
    } 
    else {
        req.flash('error', 'No answers set to modify. Submit answers here!');
        res.redirect('/answers');
    }
};


exports.updateAnswers = async (req, res) => {
    // res.json(req.body);
    // res.json(req.user);

    const hash = hashThis(req.body.answer);
    // console.log(hash);

    const updatedAnswer = {
        answer: hash,
        lastModified: Date.now(),
        author: req.user.email
    };

    const solution = await Solution.findOneAndUpdate(
        { level: req.body.level},
        { $set: updatedAnswer },
        { new: true, runValidators: true, context: 'query' }
    );
    
    if (solution) {
        req.flash('success', 'Updated successfully');
    }
    else {
        req.flash('error', 'No solution for that level to modify');        
    }

    // res.json(user);
    res.redirect('back');
};