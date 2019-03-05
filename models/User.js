const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema({
    username: String,
    email: String,
    googleId: String,
    created: {
        type: Date,
        default: Date.now
    },
    photo: String
});


// nice error looks
userSchema.plugin(mongodbErrorHandler);


module.exports = mongoose.model('User', userSchema);