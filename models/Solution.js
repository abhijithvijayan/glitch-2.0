const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

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

// set whoModified, lastModifiedtime

// nice error looks
solutionSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Solution', solutionSchema);