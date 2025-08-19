import { useState } from "react";
const token = localStorage.getItem("token");
const AskQuestionForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: "",
    bounty: 0,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "bounty" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!token) {
      setMessage("You must be logged in to submit a question.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`,
        },
        body: JSON.stringify({
          question: formData.title,
          body: formData.body,
          tags: formData.tags,
          bounty: formData.bounty,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType("success");
        setFormData({
          title: "",
          body: "",
          tags: "",
          bounty: 0,
        });
      } else {
        setMessage(data.error || "Failed to submit question");
        setMessageType("error");
      }
    } catch (error) {
      console.log("error on frontend");
      setMessage("Error submitting question");
      setMessageType("error");
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Ask a Question</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What's your question? Be specific."
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700"
          >
            Body
          </label>
          <textarea
            id="body"
            name="body"
            rows="6"
            value={formData.body}
            onChange={handleChange}
            placeholder="Provide details about your question..."
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., react, graphql, tailwindcss"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="bounty"
            className="block text-sm font-medium text-gray-700"
          >
            Bounty (Optional)
          </label>
          <select
            id="bounty"
            name="bounty"
            value={formData.bounty}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="0">None</option>
            <option value="50">50 TK</option>
            <option value="100">100 TK</option>
            <option value="200">200 TK</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Post Question
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${
            messageType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AskQuestionForm;
