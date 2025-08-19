import { useState, useEffect } from "react";

const TopTags = ({ onTagClick }) => {
  const [topTags, setTopTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch("http://localhost:3000/api/tags/top-tags");
        const data = await res.json();
        setTopTags(data || []);
      } catch (err) {
        console.error("Error fetching top tags:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTags();
  }, []);

  return (
    <div className="rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Top Tags</h2>
      <div className="flex flex-wrap gap-2">
        {loading ? (
          <span className="text-gray-500">Loading...</span>
        ) : (
          topTags.map((tag) => (
            <button
              key={tag.name}
              onClick={() => onTagClick && onTagClick(tag.name)}
              className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded font-medium hover:bg-blue-200 focus:outline-none transition flex items-center"
              type="button"
            >
              {tag.name}
              <span className="ml-1 text-xs text-blue-500">({tag.count})</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default TopTags;
