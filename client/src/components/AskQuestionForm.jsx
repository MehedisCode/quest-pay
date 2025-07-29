const AskQuestionForm = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Ask a Question</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="What's your question? Be specific."
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">
            Body
          </label>
          <textarea
            id="body"
            rows="6"
            placeholder="Provide details about your question..."
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            placeholder="e.g., react, graphql, tailwindcss"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="bounty" className="block text-sm font-medium text-gray-700">
            Bounty (Optional)
          </label>
          <select
            id="bounty"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="0">None</option>
            <option value="50">50 Points</option>
            <option value="100">100 Points</option>
            <option value="200">200 Points</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Post Question
        </button>
      </form>
    </div>
  );
};

export default AskQuestionForm;