const RightSidebar = () => {
  // Mock data for top tags (replace with GraphQL query later)
  const topTags = [
    { name: "javascript", count: 120 },
    { name: "react", count: 95 },
    { name: "graphql", count: 80 },
    { name: "mongodb", count: 65 },
    { name: "express", count: 50 },
  ];

  return (
    <div className="hidden lg:block fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-md z-40">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Tags</h2>
        <div className="space-y-2">
          {topTags.map((tag) => (
            <a
              key={tag.name}
              href={`/api/tags/${tag.name}`}
              className="flex justify-between items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md transition-colors duration-200"
            >
              <span>{tag.name}</span>
              <span className="text-gray-500 text-sm">{tag.count}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
