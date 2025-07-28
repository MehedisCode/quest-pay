const TagsList = () => {
  // Mock data for tags (replace with GraphQL query later)
  const tags = [
    { name: 'javascript', count: 120 },
    { name: 'react', count: 95 },
    { name: 'graphql', count: 80 },
    { name: 'mongodb', count: 65 },
    { name: 'express', count: 50 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">All Tags</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tags.map((tag) => (
          <a
            key={tag.name}
            href={`/tags/${tag.name}`}
            className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow duration-200 flex justify-between items-center"
          >
            <span className="text-blue-600 hover:underline">{tag.name}</span>
            <span className="text-gray-500 text-sm">{tag.count} questions</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TagsList;