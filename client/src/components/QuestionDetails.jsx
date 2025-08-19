import { useState, useEffect } from "react";
import RepliesSection from "./RepliesSection";

const QuestionDetails = ({ questionId }) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestion() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/questions/${questionId}`
        );
        const data = await res.json();
        setQuestion(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestion();
  }, [questionId]);

  if (loading)
    return (
      <p className="text-center text-gray-600 py-10 text-lg">
        Loading question...
      </p>
    );
  if (!question)
    return (
      <p className="text-center text-red-600 py-10 text-lg">
        Question not found.
      </p>
    );

  return (
    <article className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Question Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
        {question.question}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 space-x-4">
        <span>
          Asked by{" "}
          <span className="font-semibold text-gray-700">
            {question.owner?.username || "Unknown"}
          </span>
        </span>
        <span>•</span>
        <time dateTime={new Date(question.timestamp).toISOString()}>
          {new Date(question.timestamp).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </time>
        {question.bounty > 0 && (
          <>
            <span>•</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md font-medium">
              Bounty: ৳{question.bounty.toLocaleString()}
            </span>
          </>
        )}
      </div>

      {/* Body Content */}
      <section className="prose prose-lg text-gray-800 max-w-none mb-6 whitespace-pre-wrap">
        {question.body}
      </section>

      {/* Tags */}
      {question.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full cursor-default select-none"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Replies / Comments Section */}
      <RepliesSection questionId={questionId} />
    </article>
  );
};

export default QuestionDetails;
