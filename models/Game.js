// for stages and levels
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');


const gameSchema = new Schema({
    levels: {
        type: Number,
        default: 2,
        required: 'Please supply number of levels in the game'
    },
    stages: {
        type: Number,
        default: 2,
        required: 'Please supply number of stages in the game'
    }
});







// nice error looks
gameSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Game', gameSchema);