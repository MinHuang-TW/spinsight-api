let db = {
  users: [
    {
      userId: 'nGinQ5yRHeSCWrU2v6u37CB8fil2',
      name: 'user',
      email: 'user@email.com',
      image:
        'https://firebasestorage.googleapis.com/v0/b/spinsight-api.appspot.com/o/W2.png?alt=media',
      createdAt: '2020-07-29T07:31:01.429Z',
    },
  ],
  questions: [
    {
      author: 'user',
      category: 'appearance',
      question: 'Who has blue eyes?',
      createdAt: '2020-07-29T05:05:31.444Z',
    },
  ],
  answers: [
    {
      name: 'user',
      image: '...',
      questionId: 'Jk6OrfHqTvPAdJ9sxeuf',
      answer: 'John Doe',
      createdAt: '2020-07-31T05:05:31.444Z',
    },
  ],
};

const userDetails = {
  credentials: {
    userId: 'nGinQ5yRHeSCWrU2v6u37CB8fil2',
    name: 'user',
    email: 'user@email.com',
    image:
      'https://firebasestorage.googleapis.com/v0/b/spinsight-api.appspot.com/o/W2.png?alt=media',
    createdAt: '2020-07-29T07:31:01.429Z',
    // TODO:
    company: 'test Inc.',
  },
  saves: [
    {
      name: 'user',
      // author: 'user',
      category: 'appearance',
      questionId: 'Jk6OrfHqTvPAdJ9sxeuf',
    },
  ],
  // TODO:
  answers: [
    {
      name: 'user',
      // author: 'user',
      category: 'appearance',
      questionId: 'Jk6OrfHqTvPAdJ9sxeuf',
    },
  ],
};
