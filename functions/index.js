const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
app.use(cors({ origin: true }));

const FBAuth = require('./util/FBAuth');

const { getAllQuestions, addNewQuestion } = require('./handlers/questions');
const { signup, login } = require('./handlers/users');

// Question routes
app.get('/questions', getAllQuestions);
app.post('/question', FBAuth, addNewQuestion);

// User routes
app.post('/signup', signup);
app.post('/login', login);

exports.api = functions.region('europe-west1').https.onRequest(app);
