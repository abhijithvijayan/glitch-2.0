const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

/* ----------------------------------------------------------------- */

// basic routes
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

/* ----------------------------------------------------------------- */

// game routes
router.get('/edit', 
    authController.isLoggedIn,
    catchErrors(userController.isAdmin),
    appController.editGame
);

router.get('/modes', 
    authController.isLoggedIn,
    catchErrors(userController.isAdmin),    
    appController.setGameMode
);

router.post('/modes', catchErrors(appController.saveGameMode));

router.get('/answers',
    authController.isLoggedIn,
    catchErrors(userController.isAdmin), 
    catchErrors(appController.setAnswers)
);

router.post('/answers', catchErrors(appController.saveSolution));


/* ----------------------------------------------------------------- */

// Authentication routes
router.get('/login', 
    authController.isNotLoggedIn,
    userController.loginForm
);

router.get('/auth/google', authController.login); // login

router.get('/auth/google/callback', authController.redirectLogin); // login redirect

router.get('/logout', authController.logout);


module.exports = router;