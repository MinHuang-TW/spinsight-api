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
        .json({ message: 'An unexpected error has occurred... 🤷🏻‍♀️' });
    });
};

exports.addNewQuestion = (req, res) => {
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
        message: `Question ${doc.id} has been added successfully 🧚🏻‍♀️`,
      });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: 'An unexpected error has occurred... 🤷🏻‍♀️' });
    });
};
