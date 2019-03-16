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
    register('/dist/worker.js', {
        scope: '/dist/'
    });
    console.log('Registered service worker');

    console.log('Registering push');
    
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    }).catch(function(e) {
      if (Notification.permission === 'denied') {
        console.warn('Permission for notifications was denied');
      } else { 
        console.error('Unable to subscribe to push', e);
      }
    });

    console.log('Registered push');

    // console.log(JSON.stringify(subscription));

    console.log('Sending push');

    await axios({
            method: 'post',
            url: '/subscribe',
            data: JSON.stringify(subscription)
            ,
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            console.log(res.data.data);
        })
        .catch(err => {
            console.log(err);
        })
}