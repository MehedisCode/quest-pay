import { useState, useCallback } from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import QuestionsList from './QuestionsList';
import TagsList from './TagsList';
import UsersList from './UsersList';
import BountiesList from './BountiesList';
import Leaderboard from './Leaderboard';
import UserProfile from './UserProfile';
import AskQuestionForm from './AskQuestionForm';
import FeaturedBounties from './FeaturedBounties';
import RecentQuestions from './RecentQuestions';
import TopTags from './TopTags';

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState('questions');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSetActiveSection = useCallback((section) => {
    setActiveSection(section);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to QuestPay</h1>
            <p className="text-gray-600 mb-4">Explore our Q&A platform with bounties!</p>
            <div className="space-y-6">
              <FeaturedBounties />
              <RecentQuestions />
              <TopTags />
            </div>
          </div>
        );
      case 'questions':
        return <QuestionsList />;
      case 'bounties':
        return <BountiesList />;
      case 'tags':
        return <TagsList />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <UserProfile />;
      case 'ask':
        return <AskQuestionForm />;
      default:
        return <QuestionsList />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <NavBar toggleSidebar={handleToggleSidebar} />

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