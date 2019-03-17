const mongoose = require('mongoose');
const User = mongoose.model('User');
const Game = mongoose.model('Game');
const Solution = mongoose.model('Solution');
const webPush = require('web-push');

function purifyAnswer(str) {
    const regStr = str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\s]/gi, '');
    const lowerStr = regStr.toLowerCase();
    return lowerStr;
}


exports.getHomePage = (req, res) => {
    res.render('welcome', {
        title: 'Let\'s begin'
    });
};


exports.renderGame = async (req, res) => {
    const gameOptionsPromise = Game
        .find()
        .sort({
            _id: -1
        })
        .limit(1);

    // check if number of ans equals total num of levels in db
    const countPromise = Solution.countDocuments();
    const [gameOptions, totalAnswers] = await Promise.all([gameOptionsPromise, countPromise]);
    const [Options] = gameOptions;

    if (Options && Options.renderLevel <= totalAnswers) {
        const renderLevel = Options.renderLevel;
        const totalLevels = Options.levels;
        res.render('game', {
            title: 'Let\'s Play',
            renderLevel,
            totalLevels
        });
    } else {
        const user = await User.findOne({
            _id: req.user._id
        });

        if (user.permission > 10) {
            res.redirect('/edit');
            return;
        }

        // req.flash('error', 'Game not ready yet, Please come back later.');
        res.redirect('/');
    }
};


exports.startGame = (req, res) => {
    res.redirect('/play');
};


exports.editGame = (req, res) => {
    // res.send('Time to break the wheel');
    res.render('options', {
        title: 'Add'
    });
};


exports.setGameMode = (req, res) => {
    res.render('modes', {
        title: 'Set Levels'
    });
};


exports.saveGameMode = async (req, res, next) => {

    let renderLevel;
    // fetch end level from db (if it exists)
    const [gameMode] = await Game
        .find()
        .sort({
            _id: -1
        })
        .limit(1);

    // store new model with old end level
    if (gameMode) {
        // console.log(gameMode);
        renderLevel = gameMode.renderLevel;
    }

    const model = {
        levels: req.body.levels,
        author: req.user.email,
        renderLevel: renderLevel
    };

    const newModel = new Game(model);
    await newModel.save();

    // req.flash('success', 'Game Levels set successfully');
    res.redirect('/edit');
};


exports.setAnswers = async (req, res) => {
    // get latest game mode
    const [gameMode] = await Game
        .find()
        .sort({
            _id: -1
        })
        .limit(1);

    if (gameMode) {
        const levels = gameMode.levels;
        const totalLevels = levels;
        // get levels that has answers
        const levelsObj = await Solution
            .find({}, 'level -_id')
            .sort({
                level: 1
            });

        // console.log(levelsObj);

        if (levelsObj.length) {
            // extract from array of objects
            let hasAnsLevels = levelsObj.map(a => a.level);
            let noAnsLevels = [];
            // console.log(hasAnsLevels);

            let i = 1;
            // find levels that don't have answers
            while (i <= totalLevels) {
                if (!hasAnsLevels.includes(i)) {
                    // console.log(i);
                    noAnsLevels.push(i);
                }
                ++i;
            }

            // console.log(noAnsLevels.length);
            if (!noAnsLevels.length) {
                // exists answers for all levels
                // req.flash('error', 'No levels without any answer. Try editing existing ones.');
                res.redirect('/modify');
            } else {
                let levels = noAnsLevels;
                // console.log(levels);
                // render to collect answers of the levels that doesn't have an answer saved
                res.render('solution', {
                    title: 'Set Answers',
                    levels
                });
            }
        } else {
            // render to collect answers of all levels
            res.render('solution', {
                title: 'Set Answers',
                levels
            });
        }
    } else {
        // req.flash('error', 'Please set the game options first!');
        res.redirect('/options');
    }
};


exports.saveSolution = async (req, res) => {

    if (req.body.answer) {

        // find alterations (check if level is below the saved in db : Game Model)
        const [gameMode] = await Game
            .find()
            .sort({
                _id: -1
            })
            .limit(1);

        if (gameMode) {
            const levels = gameMode.levels;
            // submitted level lies between the set
            if (req.body.level <= levels) {
                const answer = purifyAnswer(req.body.answer);
                const solution = {
                    answer: answer,
                    level: req.body.level,
                    author: req.user.email
                };

                // save to db
                const newSolution = new Solution(solution);
                await newSolution.save();

                // req.flash('success', 'Solution Saved');
            } else {
                // req.flash('error', `There are only ${levels} levels`);
                res.redirect('/answers');
            }
        } else {
            // req.flash('error', 'Please set the game options first!');
            res.redirect('/options');
        }
    } else {
        // req.flash('error', 'Please submit an answer');
    }
    res.redirect('back');
};


exports.editAnswers = async (req, res) => {
    // get submitted answer levels
    const levelsObj = await Solution
        .find({}, 'level -_id')
        .sort({
            level: 1
        });

    if (levelsObj.length) {
        // extract from array of objects
        let levels = levelsObj.map(a => a.level);
        // console.log(levels);
        res.render('solution', {
            title: 'Edit Answers',
            levels
        });
    } else {
        // req.flash('error', 'No answers set to modify. Submit answers here!');
        res.redirect('/answers');
    }
};


exports.updateAnswers = async (req, res) => {
    // res.json(req.body);
    // res.json(req.user);

    const answer = purifyAnswer(req.body.answer);
    const updatedAnswer = {
        answer: answer,
        lastModified: Date.now(),
        author: req.user.email
    };

    const solution = await Solution.findOneAndUpdate({
        level: req.body.level
    }, {
        $set: updatedAnswer
    }, {
        new: true,
        runValidators: true,
        context: 'query'
    });

    // if (solution) {
    //     // req.flash('success', 'Updated successfully');
    // }
    // else {
    //     // req.flash('error', 'No solution for that level to modify');        
    // }

    res.redirect('back');
};


exports.updateEndPoint = (req, res) => {
    res.render('renderLevel', {
        title: 'Resume Game'
    });
};


exports.resumeGame = async (req, res) => {
    const resumeLevel = {
        renderLevel: req.body.newFinalLevel
    };
    // get latest game options (1 entry)
    const [gameMode] = await Game
        .find()
        .sort({
            _id: -1
        })
        .limit(1);

    // console.log(gameMode);
    if (gameMode && req.body.newFinalLevel <= gameMode.levels) {
        // update render level top
        await Game.findOneAndUpdate({
            _id: gameMode._id
        }, {
            $set: resumeLevel
        }, {
            new: true,
            runValidators: true,
            context: 'query'
        });

        // req.flash('success', 'Game resumed');
        res.redirect('/edit');
    } else {
        // req.flash('error', 'That many levels doesn\t exist');
        res.redirect('back');
    }

};


exports.getTopPlayers = async (req, res) => {
    const users = await User.getLeaderboard();
    res.render('topPlayers', {
        title: 'Top Players',
        users
    });
    // res.json(users);
};


/* ---------------------------------------------------------------- */

exports.pushNotification = async (req, res) => {
    // console.log(req.body);
    // res.status(201).json({});
    const pushPayload = JSON.stringify({
        title: 'test'
    });

    const pushSubscription = {
        endpoint: req.body.endpoint,
        expirationTime: req.body.expirationTime,
        keys: req.body.keys
    };

    // console.log(pushSubscription);
    // console.log(pushPayload);

    await webPush.sendNotification(
            pushSubscription,
            pushPayload
        )
        // .then((val) => {
        //     console.log(val);
        // })
        .catch((err) => {
            console.log(err);
        });

    res.json({
        data: 'Push triggered successfully'
    });
};


exports.privacyPolicy = (req, res) => {
    res.render('privacy', { title: 'Privacy Policy '});
};