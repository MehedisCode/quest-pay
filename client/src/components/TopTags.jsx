const TopTags = () => {
  const mockTags = [
    { name: "react", count: 150 },
    { name: "graphql", count: 100 },
    { name: "tailwindcss", count: 80 },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Top Tags</h2>
      <div className="flex flex-wrap gap-2">
        {mockTags.map((tag) => (
          <span
            key={tag.name}
            className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded"
          >
            {tag.name} ({tag.count})
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopTags;