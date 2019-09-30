const mongoose = require('mongoose');
const webPush = require('web-push');

const Subscription = mongoose.model('Subscription');

exports.sendMessage = (req, res) => {
    res.render('notification', { title: 'Send Alert' });
};

exports.saveSubscription = async (req, res) => {
    const data = {
        endpoint: req.body.subscription.endpoint,
        keys: req.body.subscription.keys,
    };
    const subscriber = new Subscription(data);
    await subscriber.save();
    res.json({
        data: 'Device Registered.',
    });
};

exports.pushNotification = async (req, res) => {
    const pushPayload = JSON.stringify({
        title: 'Glitch 2.0',
        message: req.body.alertMessage,
    });

    // iterate through the db
    const subscribers = await Subscription.find({});

    // traverse through all users and alert them
    subscribers.map(async subscriber => {
        const pushSubscription = {
            endpoint: subscriber.endpoint,
            keys: subscriber.keys,
        };

        // ToDo: try - catch
        await webPush.sendNotification(pushSubscription, pushPayload);
    });

    res.redirect('/edit');
};
