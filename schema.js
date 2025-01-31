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
      category: 'appearance',
      question: 'Who has blue eyes?',
      author: 'user', // create the question
      image: '', // author's avatar
      createdAt: '2020-07-29T05:05:31.444Z',
      // names: ['user'], already got the question
    },
  ],
  life: [
    {
      category: 'life',
      question: 'Who has Romantic Hometown ?',
      author: 'Jane', // create the question
      createdAt: '2020-07-29T05:05:31.444Z',
      // names: ['user'], already got the question
    },
  ],
  answers: [
    {
      name: 'user',
      image: '...',
      answer: 'John Doe',
      category: 'character',
      questionId: 'vRAPqgx9zdOqGSXjJTWO',
      createdAt: '2020-07-31T05:05:31.444Z',
    },
  ],
  saves: [
    {
      name: 'user',
      category: 'character',
      questionId: 'FuWzcSbPgJIybRKmHNwZ',
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
  answers: [
    {
      name: 'user',
      image:
        'https://firebasestorage.googleapis.com/v0/b/spinsight-api.appspot.com/o/W2.png?alt=media',
      questionId: 'FuWzcSbPgJIybRKmHNwZ',
      answer: 'John Doe',
      createdAt: '2020-07-31T05:05:31.444Z',
    },
  ],
  saves: [
    {
      name: 'user',
      category: 'appearance',
      questionId: 'Jk6OrfHqTvPAdJ9sxeuf',
    },
  ],
};
