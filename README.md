# spinsight-api

**GET ```/questions/:category```** Get all questions of the category

**GET ```/question/:category/:questionId```** Get a specific question

**Get ```/question/:category/:questionId/save```** Save the question

**Get ```/question/:category/:questionId/unsave```** Unsave the question

**Post ```/question', addQuestion```** Post a question in the category 
(body: { category, question })

**Post ```/question/:category/:questionId/answer```** Add an answer to the question in the category
(body: { answer })
