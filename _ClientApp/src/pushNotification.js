import firebase from 'firebase/app';
import 'firebase/messaging';

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

export const initializeFirebase = () => {
  firebase.initializeApp(config);
};

export const askForPermissioToReceiveNotifications = () => new Promise((resolve) => {
  messaging.getToken()
    .then((firebaseToken) => {
      resolve(firebaseToken);
    })
    .catch(() => {
      console.log('No permission for notication, please allow notification in browser');
    });
});

export const onMessageListener = () => new Promise((resolve) => {
  messaging.onMessage((payload) => {
    resolve(payload);
  });
});
