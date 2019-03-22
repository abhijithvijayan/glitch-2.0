const mongoose = require('mongoose');
const webPush = require('web-push');
const Subscription = mongoose.model('Subscription');


exports.sendMessage = (req, res) => {
    res.render('notification', { title: 'Send Alert' });
};


exports.saveSubscription = async (req, res) => {
    const data = {
        endpoint: req.body.subscription.endpoint,
        keys: req.body.subscription.keys
    };
    const subscriber = new Subscription(data);
    await subscriber.save();
    res.json({
        data: 'Device Registered.'
    });
};


exports.pushNotification = async (req, res) => {

    // console.log(req.body);
    // res.status(201).json({});
    const pushPayload = JSON.stringify({
        title: "Glitch 2.0",
        message: req.body.alertMessage
    });

    // iterate through the db
    const subscribers = await Subscription.find({});
    // console.log(subscribers);

    // traverse through all users and alert them
    subscribers.map(async (subscriber) => {
        // console.log(subscriber.keys);

        const pushSubscription = {
            endpoint: subscriber.endpoint,
            keys: subscriber.keys
        };

        // console.log(pushSubscription);
        // console.log(pushPayload);
    
        await webPush.sendNotification(
                pushSubscription,
                pushPayload
            );
            // .then((res) => {
            //     console.log('Push triggered successfully');
            // })
            // .catch((err) => {
            //     console.log('Failed to trigger push message');
            // });

    });

    res.redirect('/edit');
    // res.json({
    //     data: 'Push triggered successfully'
    // });
};