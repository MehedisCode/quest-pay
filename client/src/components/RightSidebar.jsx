import { useState, useEffect } from "react";

const RightSidebar = ({ onTagClick }) => {
  const [topTags, setTopTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch top tags from backend
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
    <div className="hidden lg:block fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-md z-40">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Tags</h2>
        <div className="space-y-2">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            topTags.map((tag) => (
              <button
                key={tag.name}
                onClick={() => onTagClick && onTagClick(tag.name)}
                className="w-full flex justify-between items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md transition-colors duration-200 font-medium"
              >
                <span>{tag.name}</span>
                <span className="text-gray-500 text-sm">{tag.count}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
