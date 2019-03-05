const express = require('express');
const router = express.Router();

const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


router.get('/', appController.getHomePage);

router.get('/play',
    authController.isLoggedIn,
    appController.startGame
);

router.get('/login', userController.loginForm);

router.get('/auth/google', authController.login); // login

router.get('/auth/google/callback', authController.redirectLogin); // login redirect

router.get('/logout', authController.logout);

module.exports = router;