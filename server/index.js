const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const firebase = require('firebase/app');
const cors = require('cors')
require('firebase/firestore');
app.use(cors())

const firebaseConfig = {
  apiKey: 'AIzaSyBz38qSvplo5-ne6Mo_WjW4yklDTCFyen0',
  authDomain: 'todolist-1b81e.firebaseapp.com',
  databaseURL: 'https://todolist-1b81e.firebaseio.com',
  projectId: 'todolist-1b81e',
  storageBucket: 'todolist-1b81e.appspot.com',
  messagingSenderId: '26385332003',
  appId: '1:26385332003:web:f548133e8085931d44fe96',
};
let firebaseApp;
try {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const db = firebase.firestore();

const tasks = db.collection('tasks');

app.use(bodyParser.json());

app.get('/', async (req, res) => {
  try {
    const userQuerySnapshot = await tasks.get();
    const tasksToFetch = [];
    userQuerySnapshot.forEach(
      (doc) => {
        tasksToFetch.push(
          doc.data(),
        );
      },
    );
    res.status(200).json(tasksToFetch);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const task = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
    };
    const newDoc = await tasks.add(task);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send('Something is wrong');
  }
});

app.put('/:taskId', async (req, res) => {
  await tasks.doc(req.params.taskId).set(req.body, { merge: true })
    .then(() => res.json({ id: req.params.taskId }))
    .catch((error) => res.status(500).send(error));
});

// the server is listening on port 3000 for connections
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
