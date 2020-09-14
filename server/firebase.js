const firebase = require('firebase/app');

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyBz38qSvplo5-ne6Mo_WjW4yklDTCFyen0',
  authDomain: 'todolist-1b81e.firebaseapp.com',
  databaseURL: 'https://todolist-1b81e.firebaseio.com',
  projectId: 'todolist-1b81e',
  storageBucket: 'todolist-1b81e.appspot.com',
  messagingSenderId: '26385332003',
  appId: '1:26385332003:web:f548133e8085931d44fe96',
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();

// collection references
const tasks = db.collection('tasks');

// export utils/refs
export {
  tasks,
};
