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
      res.status(500).json({ error: 'An unexpected error has occurred... 🤦🏻‍♀️' });
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

exports.addQuestion = (req, res) => {
  if (req.body.question.trim() === '') {
    res.status(400).json({ question: 'Must not be empty. 🙅🏻‍♀️' });
  }

  const newQuestion = {
    author: req.user.name,
    image: req.user.image,
    category: req.body.category,
    question: req.body.question,
    createdAt: new Date().toISOString(),
  };

  db.collection('questions')
    .add(newQuestion)
    .then((doc) => {
      const resQuestion = newQuestion;
      resQuestion.questionId = doc.id;
      res.status(200).json(resQuestion);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: 'An unexpected error has occurred... 🤷🏻‍♀️' });
    });
};

exports.AddAnswer = (req, res) => {
  if (req.body.answer.trim() === '') {
    return res.status(400).json({ answer: 'Must not be empty. 🙅🏻‍♀️' });
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
        return res.status(404).json({ error: 'Question not found. 🤷🏻‍♀️' });
      }
      return db
        .collection('answers')
        .add({ ...newAnswer, category: doc.data().category });
    })
    .then(() => res.json({ ...newAnswer, category: doc.data().category }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error has occurred... 🤦🏻‍♀️' });
    });
};

exports.saveQuestion = (req, res) => {
  const saveDocument = db
    .collection('saves')
    .where('name', '==', req.user.name)
    .where('questionId', '==', req.params.questionId)
    .limit(1);

  const questionDocument = db.doc(`/questions/${req.params.questionId}`);

  let questionData;

  questionDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        questionData = doc.data();
        questionData.questionId = doc.id;
        return saveDocument.get();
      } else {
        return res.status(404).json({ error: 'Question not found. 🤷🏻‍♀️' });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection('saves')
          .add({
            questionId: req.params.questionId,
            name: req.user.name,
          })
          .then(() => res.json(questionData));
      } else {
        return res.status(400).json({ error: 'Question already saved. 🙋🏻‍♀️' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: error.code });
    });
};

exports.unsaveQuestion = (req, res) => {
  const saveDocument = db
    .collection('saves')
    .where('name', '==', req.user.name)
    .where('questionId', '==', req.params.questionId)
    .limit(1);

  const questionDocument = db.doc(`/questions/${req.params.questionId}`);

  let questionData;

  questionDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        questionData = doc.data();
        questionData.questionId = doc.id;
        return saveDocument.get();
      } else {
        return res.status(404).json({ error: 'Question not found. 🤷🏻‍♀️' });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: 'Question not saved. 🤷🏻‍♀️' });
      } else {
        return db
          .doc(`/saves/${data.docs[0].id}`)
          .delete()
          .then(() => res.json(`${questionData.questionId} is unsaved. 💁🏻‍♂️`));
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: error.code });
    });
};

exports.deleteQuestion = (req, res) => {
  const document = db.doc(`/questions/${req.params.questionId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Question not found. 🤷🏻‍♀️' });
      }
      if (doc.data().author !== req.user.name) {
        return res.status(403).json({ error: 'Unauthorized.' });
      } else {
        return document.delete();
      }
    })
    .then(() => res.json({ message: 'Question deleted successfully. 🙋🏻‍♀️' }))
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: error.code });
    });
};
