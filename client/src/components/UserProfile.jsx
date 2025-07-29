import { useState, useEffect } from "react";
import axios from "axios";
import { PersonIcon, StarIcon, StarFilledIcon } from "@radix-ui/react-icons";

const UserProfile = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  if (error) {
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

  if (!profile) {
    return <div className="p-4 text-gray-600 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-lg my-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 tracking-tight">
        Your QuestPay Profile
      </h2>
      <div className="bg-white shadow-md rounded-md p-6 space-y-6">
        {/* User Info */}
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <PersonIcon className="h-8 w-8 text-blue-600" />
          <div>
            <p className="text-xl font-medium text-gray-900">
              {profile.username}
            </p>
            <p className="text-sm text-gray-600">{profile.email}</p>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 bg-blue-100 p-3 rounded-md">
            <StarIcon className="h-5 w-5 text-blue-600" />
            <p className="text-gray-900">
              Reputation:{" "}
              <span className="font-medium">{profile.reputation}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-100 p-3 rounded-md">
            <StarFilledIcon className="h-5 w-5 text-green-600" />
            <p className="text-gray-900">
              Bounties Earned:{" "}
              <span className="font-medium">{profile.bountiesEarned}</span>
            </p>
          </div>
        </div>
        {/* Questions Asked */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Questions Asked
          </h3>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-gray-600">
              No questions yet (coming soon via Rest API)
            </p>
            {/* Future: List questions with links */}
          </div>
        </div>
        {/* Answers Provided */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Answers Provided
          </h3>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-gray-600">
              No answers yet (coming soon via Rest API)
            </p>
            {/* Future: List answers with snippets */}
          </div>
        </div>
        {/* Bounties */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Bounty Activity
          </h3>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-gray-600">
              No bounty activity yet (coming soon)
            </p>
            {/* Future: List active bounties and bounties won */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
