//import libraries
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

//initialize the database and the collection
const db = admin.firestore();
const taskCollection = 'tasks';

//define google cloud function name
export const webApi = functions.https.onRequest(main);


interface Task {
  id: String,
  title: String,
  description: String,
  deadline: String,
  done: Boolean,
}

app.post('/tasks', async (req, res) => {
  try {
    const task: Task = {
      id:req.body['id'],
      title:req.body['title'],
      description:req.body['description'],
      deadline:req.body['deadline'],
      done:req.body['done']
    }

    const newTask = await db.collection(taskCollection).add(task);
    res.status(201).send(`Created a new task: ${newTask.id}`);
  } catch (error) {
    res.status(400).send(`Error: ${error}`)
  }
});


app.get('/', async (req, res) => {
  try {
    const taskQuerySnapshot = await db.collection(taskCollection).get();
    const tasks: any[] = [];
    taskQuerySnapshot.forEach(
      (doc)=>{
        tasks.push({
          id: doc.id,
          data:doc.data()
        });
      }
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/tasks/:taskId', async (req, res) => {
  await db.collection(taskCollection).doc(req.params.taskId).set(req.body,{merge:true})
    .then(()=> res.json({id:req.params.taskId}))
    .catch((error)=> res.status(500).send(error))


});
