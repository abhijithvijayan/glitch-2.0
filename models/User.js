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
    contact: {
        type: String,
        required: 'Please give a contact number',
        trim: true,
        default: '+91-888-888-8888'
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


userSchema.path('contact').validate(function (number) {
    // validate at https://regex101.com/
    return /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(number);
}, 'Enter a valid mobile number!');



// nice error looks
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);