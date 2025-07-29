const Leaderboard = () => {
  const mockUsers = [
    {
      id: 1,
      username: "CodeMaster",
      reputation: 1500,
      bountiesEarned: 300,
    },
    {
      id: 2,
      username: "DevGuru",
      reputation: 1200,
      bountiesEarned: 250,
    },
    {
      id: 3,
      username: "TechWizard",
      reputation: 1000,
      bountiesEarned: 200,
    },
  ];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Leaderboard</h1>
      <div className="space-y-4">
        {mockUsers.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center border border-gray-200 rounded-md p-4 bg-white shadow-sm"
          >
            <span className="text-lg font-bold text-gray-900 mr-4">
              #{index + 1}
            </span>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {user.username}
              </p>
              <p className="text-sm text-gray-600">
                Reputation: {user.reputation} • Bounties Earned: {user.bountiesEarned} Points
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;