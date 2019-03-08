// for stages and levels
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');


const gameSchema = new Schema({
    levels: {
        type: Number,
        required: 'Please supply number of levels in the game'
    },
    created: {
        type: Date,
        default: Date.now
    },
    author: String
});






// nice error looks
gameSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Game', gameSchema);