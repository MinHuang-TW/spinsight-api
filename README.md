# spinsight-api

> Available categories:
> 'appearance', 'belongings', 'character', 'life', 'limited', 'permanent'


**GET ```/questions/:category```** Get all questions of the category

**GET ```/question/:category/:questionId```** Get a specific question

**Get ```/question/:category/:questionId/save```** Save the question

**Get ```/question/:category/:questionId/unsave```** Unsave the question

**Post ```/question', addQuestion```** Post a question in the category { category, question }

**Post ```/question/:category/:questionId/answer```** Add an answer to the question in the category { answer }
