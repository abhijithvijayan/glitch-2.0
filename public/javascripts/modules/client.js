import axios from 'axios';

// Hard-coded, replace with your public key
const publicVapidKey = 'BIAk3Xj7DLM1oSY_xjWnOO4ggVW2eBDzHguxW9BC3hTwM2sm__qAD44H3O3kudlP0PV_mdj_htIPdhrXkupiHNs';

if ('serviceWorker' in navigator) {
    console.log('Starting service worker registration');
    run().catch(error => console.error(error));
}

/**
 * urlBase64ToUint8Array
 * 
 * @param {string} base64String a public vavid key
 * 
 */

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function run() {
    console.log('Registering service worker');

    const registration = await navigator.serviceWorker.
    register('/client/dist/worker.js', {
        scope: '/client/dist/'
    });

    console.log('Registered service worker');

    console.log('Registering push');

    const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey);

    // console.log('ApplicationServerKey : ', convertedVapidKey);

    await registration.pushManager.getSubscription()
        .then(function (subscription) {

            if (subscription) {
                return subscription;
            }

            return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            });
        })
        .then(function (subscription) {
            // console.log(subscription);

            console.log('Registered push');

            console.log('Sending push');

            axios({
                    method: 'post',
                    url: '/subscribe',
                    data: JSON.stringify(subscription),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                .then(res => {
                    console.log(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                });
        });

}

/* ----------------------------------------------------------------------- */