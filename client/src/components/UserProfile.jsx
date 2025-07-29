const UserProfile = () => {
  const mockProfile = {
    username: "User123",
    reputation: 800,
    bountiesEarned: 150,
    questions: [
      { id: 1, title: "How to use GraphQL with React?" },
      { id: 2, title: "Optimizing MongoDB queries?" },
    ],
    answers: [
      { id: 1, questionTitle: "What is Tailwind CSS?" },
      { id: 2, questionTitle: "How to secure MERN apps?" },
    ],
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{mockProfile.username}'s Profile</h1>
      <div className="mb-6">
        <p className="text-gray-600">
          Reputation: {mockProfile.reputation} • Bounties Earned: {mockProfile.bountiesEarned} Points
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Questions Asked</h2>
          {mockProfile.questions.map((question) => (
            <div
              key={question.id}
              className="border border-gray-200 rounded-md p-3 bg-white shadow-sm"
            >
              <p className="text-gray-800">{question.title}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Answers Provided</h2>
          {mockProfile.answers.map((answer) => (
            <div
              key={answer.id}
              className="border border-gray-200 rounded-md p-3 bg-white shadow-sm"
            >
              <p className="text-gray-800">Answered: {answer.questionTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;