const admin = require('firebase-admin');
const serviceAccount = require('../permission.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://spinsight-api.firebaseio.com',
});

const db = admin.firestore();

module.exports = { admin, db };
