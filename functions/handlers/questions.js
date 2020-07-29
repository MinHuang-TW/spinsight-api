const { db } = require('../util/admin');

exports.getAllQuestions = (req, res) => {
  db.collection('questions')
    .orderBy('createdAt', 'desc')
    .get()
    .then((docs) => {
      let response = [];
      docs.forEach((doc) => {
        response.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: 'An unexpected error has occurred... 🤦🏻‍♀️' });
    });
};

exports.addQuestion = (req, res) => {
  const newQuestion = {
    author: req.user.name,
    category: req.body.category,
    question: req.body.question,
    createdAt: new Date().toISOString(),
  };

  db.collection('questions')
    .add(newQuestion)
    .then((doc) => {
      res.status(200).json({
        message: `Question ${doc.id} has been added successfully. 🙆🏻‍♂️`,
      });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: 'An unexpected error has occurred... 🤷🏻‍♀️' });
    });
};

exports.getQuestion = (req, res) => {
  let questionData = {};
  db.doc(`/questions/${req.params.questionId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Question not found. 🤷🏻‍♀️' });
      }
      questionData = doc.data();
      questionData.questionId = doc.id;
      return db
        .collection('answers')
        .orderBy('createdAt', 'desc')
        .where('questionId', '==', req.params.questionId)
        .get();
    })
    .then((data) => {
      questionData.answers = [];
      data.forEach((doc) => questionData.answers.push(doc.data()));
      return res.json(questionData);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: error.code });
    });
};

exports.AddAnswer = (req, res) => {
  if (req.body.answer.trim() === '') {
    return res.status(400).json({ error: 'Must not be empty. 🙅🏻‍♀️' });
  }

  const newAnswer = {
    name: req.user.name,
    image: req.user.image,
    answer: req.body.answer,
    questionId: req.params.questionId,
    createdAt: new Date().toISOString(),
  };

  db.doc(`/questions/${req.params.questionId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Question does not exist. 🤷🏻‍♀️' });
      }
      return db.collection('answers').add(newAnswer);
    })
    .then(() => res.json(newAnswer))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error has occurred... 🤦🏻‍♀️' });
    });
};
