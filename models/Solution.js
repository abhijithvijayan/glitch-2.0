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
    salt: String,
    author: String,
    lastModified: {
        type: Date,
        default: Date.now
    }
});


// solutionSchema.index({
//     level: 'text',
//     answer: 'text'
// });


// nice error looks
solutionSchema.plugin(uniqueValidator, { message: 'Error, Already saved the answer for this level.' });
// solutionSchema.plugin(mongodbErrorHandler);


module.exports = mongoose.model('Solution', solutionSchema);