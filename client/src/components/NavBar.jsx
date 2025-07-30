const NavBar = ({ token, setToken, setActiveSection, toggleSidebar }) => {
  return (
    <nav className="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] sticky top-0 z-[1000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo and Sidebar Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <a href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">QuestPay</span>
            </a>
          </div>

          {/* Right: Search Bar and Auth Buttons */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search questions..."
                className="border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>

            {!token ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveSection("login")}
                  className="text-gray-700 hover:text-white hover:bg-blue-600 font-medium px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Log In
                </button>
                <a
                  href="/register"
                  className="text-gray-700 hover:text-white hover:bg-blue-600 font-medium px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Register
                </a>
              </div>
            ) : (
              ""
            )}

            {token ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken(null);
                    setActiveSection("home");
                  }}
                  className="text-gray-700 hover:text-white hover:bg-blue-600 font-medium px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Log Out
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
