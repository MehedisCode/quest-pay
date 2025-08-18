import { useState, useEffect } from "react";

const RecentQuestions = ({ onQuestionClick }) => {
  const [recentQuestions, setRecentQuestions] = useState([]);

  useEffect(() => {
    async function fetchRecent() {
      try {
        const res = await fetch("http://localhost:3000/api/questions/recent");
        const data = await res.json();
        setRecentQuestions(data || []);
      } catch (error) {
        console.error("Error fetching recent questions:", error);
      }
    }
    fetchRecent();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Recent Questions
      </h2>
      <div className="flex flex-col space-y-3">
        {recentQuestions.map((question) => (
          <div
            key={question._id}
            className="border border-gray-200 rounded-md p-3 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow min-w-[200px] flex-1"
            onClick={() => onQuestionClick && onQuestionClick(question._id)}
            title={question.question}
          >
            <p className="text-blue-600 line-clamp-1">{question.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentQuestions;
