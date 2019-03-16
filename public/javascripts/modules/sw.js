console.log('Loaded service worker!');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push received', data);
    e.waitUntil(self.registration.showNotification(data.title, {
        body: 'Welcome to Glitch 2.0',
        icon: 'https://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png'
        })
    );
});