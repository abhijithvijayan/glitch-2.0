// for stages and levels
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const mongodbErrorHandler = require('mongoose-mongodb-errors');


const SubscriptionSchema = new Schema({
    endpoint: String,
    keys: Schema.Types.Mixed,
    createDate: {
        type: Date,
        default: Date.now
    }
});






// nice error looks
SubscriptionSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Subscription', SubscriptionSchema);