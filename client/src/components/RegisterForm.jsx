import { useState } from "react";
import axios from "axios";
import {
  PersonIcon,
  EnvelopeClosedIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";

const RegisterForm = ({ setActiveSection }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });
      setError("");
      setActiveSection("login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-lg my-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 tracking-tight">
        Join QuestPay
      </h2>
      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <ExclamationTriangleIcon className="h-5 w-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <PersonIcon className="h-5 w-5 text-gray-500 ml-3" />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400"
              placeholder="Enter your username"
              required
              aria-label="Username"
            />
          </div>
        </div>
        <div className="relative">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <EnvelopeClosedIcon className="h-5 w-5 text-gray-500 ml-3" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400"
              placeholder="Enter your email"
              required
              aria-label="Email address"
            />
          </div>
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <LockClosedIcon className="h-5 w-5 text-gray-500 ml-3" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400"
              placeholder="Enter your password"
              required
              aria-label="Password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <button
          onClick={() => setActiveSection("login")}
          className="text-blue-600 hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
