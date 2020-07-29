const { db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const { validateSignupData, validateLoginData } = require('../util/validator');

exports.signup = (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const { errors, valid } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);

  let token, userId;
  db.doc(`/users/${newUser.name}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ name: 'The name is already taken 🙅🏻‍♀️' });
      }
      return firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((data) => {
          userId = data.user.uid;
          return data.user.getIdToken();
        })
        .then((idToken) => {
          token = idToken;
          const userCredentials = {
            name: newUser.name,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId,
          };
          return db.doc(`/users/${newUser.name}`).set(userCredentials);
        })
        .then(() => res.status(201).json({ token }))
        .catch((error) => {
          console.error(error);
          if (error.code === 'auth/email-already-in-use') {
            return res
              .status(400)
              .json({ email: 'Email is already in use 🤦🏻‍♀️' });
          }
          return res.status(500).json({ error: error.code });
        });
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { errors, valid } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => data.user.getIdToken())
    .then((token) => res.json({ token }))
    .catch((error) => {
      console.error(error);
      if (error.code === 'auth/wrong-password') {
        return res
          .status(403)
          .json({ general: 'Wrong credentials, please try again.' });
      }
      return res.status(500).json({ error: error.code });
    });
};
