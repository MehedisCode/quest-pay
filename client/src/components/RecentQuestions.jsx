const RecentQuestions = () => {
  const mockQuestions = [
    { id: 1, title: "How to use React hooks effectively?" },
    { id: 2, title: "What is MongoDB aggregation?" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Recent Questions</h2>
      <div className="space-y-2">
        {mockQuestions.map((question) => (
          <div
            key={question.id}
            className="border border-gray-200 rounded-md p-3 bg-white shadow-sm"
          >
            <p className="text-gray-800">{question.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentQuestions;