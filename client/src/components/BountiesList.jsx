import { StarIcon } from "@radix-ui/react-icons";

const BountiesList = () => {
  const mockBounties = [
    {
      id: 1,
      title: "How to optimize GraphQL queries for large datasets?",
      bounty: 100,
      tags: ["graphql", "performance"],
      author: "User123",
      timeLeft: "2 days",
    },
    {
      id: 2,
      title: "Best practices for Tailwind CSS in React projects?",
      bounty: 50,
      tags: ["react", "tailwindcss"],
      author: "DevGuru",
      timeLeft: "5 days",
    },
    {
      id: 3,
      title: "Implementing authentication in MERN stack?",
      bounty: 75,
      tags: ["mern", "authentication"],
      author: "CodeMaster",
      timeLeft: "3 days",
    },
  ];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Active Bounties</h1>
      <div className="space-y-4">
        {mockBounties.map((bounty) => (
          <div
            key={bounty.id}
            className="border border-gray-200 rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {bounty.title}
              </h2>
              <div className="flex items-center text-yellow-600">
                <StarIcon className="h-5 w-5 mr-1" />
                <span className="font-bold">{bounty.bounty} Points</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {bounty.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Asked by {bounty.author} • {bounty.timeLeft} left
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BountiesList;