const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { catchErrors } = require('../handlers/errorHandlers');

const validateUser = async (accessToken, refreshToken, profile, done) => {
    // check if user exists in db already
    const foundUser = await User.findOne({
        googleId: profile.id,
    });
    if (!foundUser) {
        // console.log(profile);
        // console.log(profile.emails[0].value);
        const newUser = await new User({
            username: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
            photo: profile._json.image.url,
        }).save(); // save to db

        if (newUser) {
            done(null, newUser);
        }
    } else {
        // console.log(foundUser);
        done(null, foundUser); // move to serialize method
    }
};

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            // passport callback function (after logging in)
            catchErrors(validateUser(accessToken, refreshToken, profile, done));
        }
    )
);

// take a piece of info -> to pass to cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// data that comes -> deserialize data from that
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(foundUser => {
            done(null, foundUser);
            // done(null, foundUser.id);
        })
        .catch(err => {
            console.log(err);
        });
});
