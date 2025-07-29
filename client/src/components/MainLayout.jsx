import { useState, useCallback, useEffect } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import QuestionsList from "./QuestionsList";
import TagsList from "./TagsList";
import UsersList from "./UsersList";
import BountiesList from "./BountiesList";
import Leaderboard from "./Leaderboard";
import UserProfile from "./UserProfile";
import AskQuestionForm from "./AskQuestionForm";
import Home from "./Home";
import axios from "axios";
import LoginForm from "./LoginForm";

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleSetActiveSection = useCallback((section) => {
    setActiveSection(section);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <Home />;
      case "questions":
        return <QuestionsList />;
      case "bounties":
        return <BountiesList />;
      case "tags":
        return <TagsList />;
      case "leaderboard":
        return <Leaderboard />;
      case "profile":
        return <UserProfile />;
      case "ask":
        return <AskQuestionForm />;
      case "login":
        return <LoginForm setToken={setToken} setUser={setUser} />;
      default:
        return <QuestionsList />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <NavBar
        setActiveSection={setActiveSection}
        toggleSidebar={handleToggleSidebar}
      />

      {/* Main Content */}
      <div className="flex flex-1 pt-[4.25rem] bg-gray-50">
        {/* Left Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={handleSetActiveSection}
            isOpen={isSidebarOpen}
            setIsOpen={handleToggleSidebar}
          />
        </div>

        {/* Scrollable Middle Section */}
        <div className="flex-1 md:pl-64 lg:pr-64 overflow-y-auto">
          {renderContent()}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
