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
    stages: {
        type: Number,
        required: 'Please supply number of stages in the game'
    },
    lastAnsSavedLevel: {
        type: Number,
        default: 0
    }
});







// nice error looks
gameSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Game', gameSchema);