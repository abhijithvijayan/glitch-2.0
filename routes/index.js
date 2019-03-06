const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


router.get('/', appController.getHomePage);

router.get('/account',
    authController.isLoggedIn,
    catchErrors(userController.hasSubmittedInfo),
    appController.startGame
);

router.get('/game', appController.preCheck);

router.get('/play', 
    authController.isLoggedIn,
    catchErrors(userController.hasSubmittedInfo),
    appController.renderGame
);

router.post('/account', catchErrors(userController.submitInfo));

router.get('/account/edit', 
    authController.isLoggedIn,
    catchErrors(userController.hasSubmittedInfo),
    catchErrors(userController.editProfile)
);

// edit game levels
router.get('/add', 
    authController.isLoggedIn,
    catchErrors(userController.isAdmin),
    appController.editGame
);


// Authentication
router.get('/login', 
    authController.isNotLoggedIn,
    userController.loginForm
);

router.get('/auth/google', authController.login); // login

router.get('/auth/google/callback', authController.redirectLogin); // login redirect

router.get('/logout', authController.logout);


module.exports = router;