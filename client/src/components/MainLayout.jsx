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
import RegisterForm from "./RegisterForm";
import QuestionDetails from "./QuestionDetails";

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  // callback to open question details with id
  const handleOpenQuestion = useCallback((id) => {
    setSelectedQuestionId(id);
    setActiveSection("questionDetails");
  }, []);

  const handleBackToList = () => {
    setSelectedQuestionId(null);
    setActiveSection("questions");
  };

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
    if (activeSection === "questionDetails" && selectedQuestionId) {
      return (
        <>
          <button
            onClick={handleBackToList}
            className="mb-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ← Back to questions
          </button>
          <QuestionDetails questionId={selectedQuestionId} />
        </>
      );
    }

    switch (activeSection) {
      case "home":
        return <Home />;
      case "questions":
        return <QuestionsList onQuestionClick={handleOpenQuestion} />;
      case "bounties":
        return <BountiesList onQuestionClick={handleOpenQuestion} />;
      case "tags":
        return <TagsList />;
      case "leaderboard":
        return <Leaderboard />;
      case "my profile":
        return <UserProfile />;
      case "ask":
        return <AskQuestionForm />;
      case "login":
        return (
          <LoginForm
            setActiveSection={setActiveSection}
            setToken={setToken}
            setUser={setUser}
          />
        );
      case "register":
        return <RegisterForm setActiveSection={setActiveSection} />;
      default:
        return <QuestionsList />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <NavBar
        token={token}
        setToken={setToken}
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
            token={token}
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
