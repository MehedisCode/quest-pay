import { useState, useEffect } from "react";

const QuestionsList = ({ onQuestionClick }) => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchQuestions = async (pageNumber = 1) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/questions?page=${pageNumber}`
      );
      const data = await res.json();

      setQuestions(data.questions || []);
      setTotalPages(data.totalPages || 1);
      setPage(pageNumber);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions(page);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchQuestions(newPage);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">All Questions</h1>
      {questions.map((question) => (
        <div
          key={question._id}
          className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow duration-200 min-h-[120px]"
        >
          <div className="flex justify-between">
            {/* Left Side */}
            <div className="flex flex-col">
              <div className="flex-1">
                <div
                  className="text-lg font-semibold text-blue-600 hover:underline line-clamp-1 cursor-pointer"
                  onClick={() => onQuestionClick(question._id)}
                >
                  {question.question}
                </div>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {question.body}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {Array.isArray(question.tags) &&
                  question.tags.map((tag) => (
                    <a
                      key={tag}
                      href={`/api/tags/${tag}`}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {tag}
                    </a>
                  ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-shrink-0 text-right text-sm text-gray-500 w-[150px]">
              <p className="font-bold">
                Asked by {question.owner?.username || "Unknown"}
              </p>

              <div className="inline-block bg-green-50 border border-green-400 text-green-800 px-2 py-1 rounded-md text-xs mb-1">
                Bounty: ৳{question.bounty.toLocaleString()}
              </div>

              <p>{question.answers || 0} answers</p>
              <p>
                {new Date(question.timestamp).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num + 1}
            onClick={() => handlePageChange(num + 1)}
            className={`px-3 py-1 rounded ${
              page === num + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {num + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionsList;
