const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
app.use(cors({ origin: true }));

const FBAuth = require('./util/FBAuth');

const {
  getAllQuestions,
  getQuestion,
  addQuestion,
  AddAnswer,
} = require('./handlers/questions');
const { signup, login, getProfile } = require('./handlers/users');

// Question routes
app.get('/questions', FBAuth, getAllQuestions);
app.get('/question/:questionId', FBAuth, getQuestion);
app.post('/question/:questionId/answer', FBAuth, AddAnswer);
app.post('/question', FBAuth, addQuestion);
// TODO: delete a question
// TODO: save a question
// TODO: unsave a question

// User routes
app.post('/signup', signup);
app.post('/login', login);
app.get('/user', FBAuth, getProfile);

exports.api = functions.region('europe-west1').https.onRequest(app);
