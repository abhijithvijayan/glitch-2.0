console.log('Loaded service worker!');

self.addEventListener('push', e => {
    // const data = e.data.json();
    const data = e.data ? JSON.parse(e.data.text()) : {};
    console.log('Push received', data);
    e.waitUntil(self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://glitch.aarohcea.com/client/dist/img/logo-6kb.png',
        url: 'https://glitch.aarohcea.com'
        })
    );
});


//notification url redirect event click
self.addEventListener('notificationclick', (e) => {
    e.notification.close();

    e.waitUntil(
        clients.matchAll({
            type: "window"
        })
        .then((clientList) => {
            if (clients.openWindow) {
                return clients.openWindow(notificationUrl);
            }
        })
    );
});