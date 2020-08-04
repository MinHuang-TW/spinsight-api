const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
app.use(cors({ origin: true }));

const FBAuth = require('./util/FBAuth');
const { db } = require('./util/admin');

const {
  getAllQuestions,
  getCategoryQuestions,
  getQuestion,
  addQuestion,
  saveQuestion,
  unsaveQuestion,
  AddAnswer,
  deleteQuestion,
} = require('./handlers/questions');
const { signup, login, getProfile } = require('./handlers/users');

// Question routes
app.get('/questions', FBAuth, getAllQuestions);
app.get('/questions/:category', FBAuth, getCategoryQuestions);
app.get('/question/:category/:questionId', FBAuth, getQuestion);
app.get('/question/:category/:questionId/save', FBAuth, saveQuestion);
app.get('/question/:category/:questionId/unsave', FBAuth, unsaveQuestion);
app.post('/question', FBAuth, addQuestion);
// TODO: delete
app.delete('/question/:questionId', FBAuth, deleteQuestion);
app.post('/question/:category/:questionId/answer', FBAuth, AddAnswer);

// User routes
app.post('/signup', signup);
app.post('/login', login);
app.get('/user', FBAuth, getProfile);

exports.api = functions.region('europe-west1').https.onRequest(app);

exports.onQuestionDelete = functions
  .region('europe-west1')
  .firestore.document('questions/{questionId}')
  .onDelete((snapshot, context) => {
    const questionId = context.params.questionId;
    const batch = db.batch();
    return db
      .collection('answers')
      .where('questionId', '==', questionId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/answers/${doc.id}`));
        });
        return db
          .collection('saves')
          .where('questionId', '==', questionId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/saves/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((error) => console.error(error));
  });
