const mongoose = require('mongoose');
const webPush = require('web-push');
const Subscription = mongoose.model('Subscription');



exports.saveSubscription = async (req, res) => {
    const data = {
        endpoint: req.body.subscription.endpoint,
        keys: req.body.subscription.keys
    };
    const subscriber = new Subscription(data);
    await subscriber.save();
};


exports.pushNotification = async (req, res) => {

    // console.log(req.body);
    // res.status(201).json({});
    // const pushPayload = JSON.stringify({
    //     title: req.body.title,
    //     message: req.body.message
    // });

    // temp data
    const pushPayload = JSON.stringify({
        title: "Glitch 2.0",
        message: "Hello world"
    });

    console.log(req.body);

    // iterate through the db
    const subscribers = await Subscription.find({});
    // console.log(subscribers);

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
            )
            // .then((val) => {
            //     console.log(val);
            // })
            .catch((err) => {
                console.log(err);
            });

    });

    res.json({
        data: 'Push triggered successfully'
    });
};