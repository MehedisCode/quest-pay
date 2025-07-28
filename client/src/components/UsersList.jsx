const UsersList = () => {
  // Mock data for users (replace with GraphQL query later)
  const users = [
    { id: '1', username: 'john_doe', reputation: 250 },
    { id: '2', username: 'jane_smith', reputation: 180 },
    { id: '3', username: 'bob_jones', reputation: 120 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">All Users</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <a
            key={user.id}
            href={`/users/${user.id}`}
            className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow duration-200 flex justify-between items-center"
          >
            <span className="text-blue-600 hover:underline">{user.username}</span>
            <span className="text-gray-500 text-sm">{user.reputation} reputation</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default UsersList;