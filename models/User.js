const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema({
    username: String,
    email: String,
    googleId: String,
    photo: String,
    created: {
        type: Date,
        default: Date.now
    },
    level: {
        type: Number,
        default: 1
    },
    nickname: {
        type: String,
        required: 'Please give a nickname for your account',
        trim: true,
        default: 'User'
    },
    college: {
        type: String,
        required: 'Please give the name of your college',
        trim: true,
        default: 'College'
    },
    hasSubmitted: {
        type: Number,
        default: 0
    },
    timeOfScore: {
        type: Date,
        default: Date.now
    },
    permission: {
        type: Number,
        default: 10
    }
});


userSchema.path('nickname').validate(function (nickname) {
    return nickname.length <= 18;
}, 'The maximum length for nickname is 18.');


userSchema.path('college').validate(function (college) {
    return college.length <= 70;
}, 'The maximum length for college name is 70.');




// nice error looks
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);