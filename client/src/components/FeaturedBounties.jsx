import { useState, useEffect } from "react";
import { StarIcon } from "@radix-ui/react-icons";

// Pass onQuestionClick if using custom navigation; useLinkTo if using React Router
const FeaturedBounties = ({ onQuestionClick }) => {
  const [bounties, setBounties] = useState([]);

  useEffect(() => {
    async function fetchBounties() {
      try {
        const res = await fetch("http://localhost:3000/api/tags/top-bounties");
        const data = await res.json();
        setBounties(data || []);
      } catch (error) {
        console.error("Error fetching featured bounties:", error);
      }
    }
    fetchBounties();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Featured Bounties
      </h2>
      <div className="space-y-2">
        {bounties.map((bounty) => (
          <div
            key={bounty._id}
            className="border border-gray-200 rounded-md p-3 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onQuestionClick && onQuestionClick(bounty._id)}
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-800">{bounty.question}</p>
              <div className="flex items-center text-yellow-600">
                <StarIcon className="h-4 w-4 mr-1" />
                <span>৳{bounty.bounty}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-1">
              {bounty.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBounties;
