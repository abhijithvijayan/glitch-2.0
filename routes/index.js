const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const alertController = require('../controllers/alertController');

/* ----------------------------------------------------------------- */

// basic routes
router.get('/', appController.getHomePage);

router.get('/play',
    authController.isLoggedIn,
    catchErrors(userController.hasSubmittedInfo),
    catchErrors(appController.renderGame)
);

router.post('/play',
    authController.isLoggedIn,
    // catchErrors(userController.hasSubmittedInfo),
    catchErrors(userController.submitAnswer)
);

router.get('/account',
    authController.isLoggedIn,
    catchErrors(userController.hasSubmittedInfo),
    appController.startGame
);

router.post('/account',
    authController.isLoggedIn,
    catchErrors(userController.submitInfo)
);

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

router.get('/options',
    authController.isLoggedIn,
    catchErrors(userController.isAdmin),
    appController.setGameMode
);

router.post('/options',
    authController.isLoggedIn,
    catchErrors(userController.isAdmin),
    catchErrors(appController.saveGameMode)
);

router.get('/answers',
    authController.isLoggedIn,
    catchErrors(userController.isAdmin),
    catchErrors(appController.setAnswers)
);

router.post('/answers',
    authController.isLoggedIn,
    catchErrors(userController.isAdmin),
    catchErrors(appController.saveSolution)
);

router.get('/modify',
    authController.isLoggedIn,
    catchErrors(userController.isAdmin),
    catchErrors(appController.editAnswers)
);

router.post('/modify',
    authController.isLoggedIn,
    catchErrors(userController.isAdmin),
    catchErrors(appController.updateAnswers)
);

router.get('/resume',
    authController.isLoggedIn,
    catchErrors(userController.isAdmin),
    appController.updateEndPoint
);

router.post('/resume',
    authController.isLoggedIn,
    catchErrors(userController.isAdmin),
    catchErrors(appController.resumeGame)
    // send push messages
);

router.get('/top',
    // authController.isLoggedIn,
    // catchErrors(userController.hasSubmittedInfo),
    catchErrors(appController.getTopPlayers)
);


/* ----------------------------------------------------------------- */

// Authentication routes
router.get('/login',
    authController.isNotLoggedIn,
    userController.loginForm
);

router.get('/auth/google', authController.login); // login

router.get('/auth/google/callback', authController.redirectLogin); // login redirect

router.get('/logout', authController.logout);

/* ----------------------------------------------------------------- */

router.post('/subscribe', catchErrors(alertController.saveSubscription));

// Push Notification
// verify if admin ???
router.post('/push', catchErrors(alertController.pushNotification));

// Privacy policy
router.get('/privacy', appController.privacyPolicy);

/* ----------------------------------------------------------------- */

module.exports = router;