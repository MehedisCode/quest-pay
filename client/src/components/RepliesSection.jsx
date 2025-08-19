import { useState, useEffect } from "react";

// Props: questionId (string, required)
const RepliesSection = ({ questionId }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  const handleDelete = async (replyId) => {
    if (!window.confirm("Are you sure you want to delete this reply?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/api/questions/${questionId}/replies/${replyId}`,
        {
          method: "DELETE",
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        }
      );
      if (!res.ok) throw new Error("Failed to delete reply");
      // Refresh reply list
      fetchReplies();
    } catch (error) {
      alert(error.message || "Error deleting reply");
    }
  };

  useEffect(() => {
    const fetchReplies = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://localhost:3000/api/questions/${questionId}/replies`
        );
        if (!res.ok) throw new Error("Failed to load replies");
        const data = await res.json();
        setReplies(data || []);
      } catch (err) {
        setError("Couldn't load replies.");
      }
      setLoading(false);
    };
    fetchReplies();
  }, [questionId]);

  useEffect(() => {
    setCurrentUserId();
  });

  // Submit new reply
  const handlePostReply = async (e) => {
    e.preventDefault();
    setError("");
    if (!replyText.trim()) {
      setError("Reply cannot be empty");
      return;
    }

    setPosting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/api/questions/${questionId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          body: JSON.stringify({ body: replyText }),
        }
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to post reply");
      }
      setReplyText("");
      setSuccessMsg("Reply posted!");
      // Reload replies
      const repliesRes = await fetch(
        `http://localhost:3000/api/questions/${questionId}/replies`
      );
      setReplies(await repliesRes.json());
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      setError(err.message || "Error posting reply.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <section className="mt-10">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Replies</h3>
      {/* Reply Input Form */}
      <form onSubmit={handlePostReply} className="mb-4">
        <textarea
          className="w-full border rounded p-2 mb-1 text-gray-700 focus:outline-blue-400 resize-none"
          rows={3}
          placeholder="Write a reply or comment..."
          value={replyText}
          disabled={posting}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <button
            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition disabled:opacity-60"
            type="submit"
            disabled={posting}
          >
            {posting ? "Posting..." : "Post Reply"}
          </button>
          {error && <span className="text-xs text-red-500">{error}</span>}
          {successMsg && (
            <span className="text-xs text-green-600">{successMsg}</span>
          )}
        </div>
      </form>
      {/* Reply List */}
      {loading ? (
        <div className="text-sm text-gray-500">Loading replies...</div>
      ) : replies.length === 0 ? (
        <div className="text-gray-500 text-sm">No replies yet.</div>
      ) : (
        <ul className="space-y-3">
          {replies.map((reply) => (
            <li
              key={reply._id}
              className="bg-gray-50 border rounded p-3 relative"
            >
              <div className="flex items-center mb-1">
                <span className="text-blue-800 font-semibold text-sm">
                  {reply.user?.username || "User"}
                </span>
                <span className="mx-2 text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  {reply.createdAt &&
                    new Date(reply.createdAt).toLocaleString()}
                </span>

                {reply.user?._id === currentUserId && (
                  <button
                    onClick={() => handleDelete(reply._id)}
                    className="ml-auto text-red-500 text-xs hover:underline"
                    type="button"
                    aria-label="Delete reply"
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="text-gray-700">{reply.body}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RepliesSection;
