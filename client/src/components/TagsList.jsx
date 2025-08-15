import { useState, useEffect } from "react";

const TagsList = ({ onTagClick }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch("http://localhost:3000/tags/all");
        const data = await res.json();
        setTags(data || []);
      } catch (err) {
        console.error("Error fetching tags:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTags();
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-lg text-gray-500">Loading tags…</p>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">All Tags</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => onTagClick(tag.name)}
            className="bg-white text-left shadow-md rounded-md p-4 hover:shadow-lg transition-shadow duration-200 flex justify-between items-center w-full"
          >
            <span className="text-blue-600 hover:underline">{tag.name}</span>
            <span className="text-gray-500 text-sm">{tag.count} questions</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagsList;
