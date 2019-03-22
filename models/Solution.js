const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
// const mongodbErrorHandler = require('mongoose-mongodb-errors');
const uniqueValidator = require('mongoose-unique-validator');

const solutionSchema = new Schema({
    level: {
        type: Number,
        unique: true,
        // dropDups: true,
        required: 'Please provide the question level'
    },
    answer: String,
    author: String,
    lastModified: {
        type: Date,
        default: Date.now
    }
});



// nice error looks
solutionSchema.plugin(uniqueValidator, { message: 'Error, Already saved the answer for this level.' });


module.exports = mongoose.model('Solution', solutionSchema);