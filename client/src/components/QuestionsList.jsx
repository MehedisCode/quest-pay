const QuestionsList = () => {
  // Mock data for questions (replace with GraphQL query later)
  const questions = [
    {
      id: '1',
      title: 'How to implement a bounty system in a MERN app?',
      body: 'I’m building a Q&A platform and want to add a bounty system like Stack Overflow...',
      tags: ['javascript', 'mern', 'graphql'],
      votes: 10,
      answers: 3,
      views: 150,
      createdAt: '2025-07-27T13:00:00Z',
    },
    {
      id: '2',
      title: 'Best practices for GraphQL queries in React?',
      body: 'What are the best practices for managing GraphQL queries in a React app...',
      tags: ['react', 'graphql'],
      votes: 8,
      answers: 2,
      views: 120,
      createdAt: '2025-07-26T10:00:00Z',
    },
    {
      id: '3',
      title: 'How to optimize MongoDB performance?',
      body: 'I’m using MongoDB in my Node.js app and facing slow query performance...',
      tags: ['mongodb', 'node.js'],
      votes: 5,
      answers: 1,
      views: 90,
      createdAt: '2025-07-25T09:00:00Z',
    },
  ];

  return (
    <div className="space-y-4 p-4">
      {questions.map((question) => (
        <div
          key={question.id}
          className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <a
                href={`/question/${question.id}`}
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {question.title}
              </a>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {question.body}
              </p>
              <div className="flex space-x-2 mt-2">
                {question.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/tags/${tag}`}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>{question.votes} votes</p>
              <p>{question.answers} answers</p>
              <p>{question.views} views</p>
              <p>{new Date(question.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;