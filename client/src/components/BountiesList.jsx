import { useState, useEffect } from "react";

const BountiesList = ({ onQuestionClick }) => {
  const [bounties, setBounties] = useState([]);

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/questions/bounties");
        const data = await res.json();
        setBounties(data || []);
      } catch (err) {
        console.error("Error fetching bounties:", err);
      }
    };
    fetchBounties();
  }, []);

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Active Bounties</h1>

      {bounties.length === 0 ? (
        <p className="text-gray-500">No active bounties found.</p>
      ) : (
        bounties.map((question) => (
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
                        href={`/tags/${tag}`}
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

                {/* Highlight bounty in professional badge */}
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
        ))
      )}
    </div>
  );
};

export default BountiesList;
