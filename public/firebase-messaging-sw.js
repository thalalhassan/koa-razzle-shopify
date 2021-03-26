/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js',
);

const config = {
  apiKey: 'AIzaSyD8Efy_DjZCmgtJIHHwtcZggzx_ExhDJWs',
  authDomain: 'shopify-report.firebaseapp.com',
  projectId: 'shopify-report',
  storageBucket: 'shopify-report.appspot.com',
  messagingSenderId: '904134261019',
  appId: '1:904134261019:web:c656e84882ae5359953bbe',
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/images/notificationicon.svg',
  };

  console.log({ notificationOptions });

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log({ event });
  return event;
});
