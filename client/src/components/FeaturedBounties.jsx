import { StarIcon } from "@radix-ui/react-icons";

const FeaturedBounties = () => {
  const mockBounties = [
    {
      id: 1,
      title: "How to optimize GraphQL queries?",
      bounty: 100,
      tags: ["graphql"],
    },
    {
      id: 2,
      title: "Tailwind CSS best practices?",
      bounty: 50,
      tags: ["tailwindcss"],
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Featured Bounties</h2>
      <div className="space-y-2">
        {mockBounties.map((bounty) => (
          <div
            key={bounty.id}
            className="border border-gray-200 rounded-md p-3 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-800">{bounty.title}</p>
              <div className="flex items-center text-yellow-600">
                <StarIcon className="h-4 w-4 mr-1" />
                <span>{bounty.bounty} Points</span>
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