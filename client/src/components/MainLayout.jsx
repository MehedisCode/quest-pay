import { useState } from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import QuestionsList from './QuestionsList';
import TagsList from './TagsList';
import UsersList from './UsersList';

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState('questions');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to QuestPay
            </h1>
            <p className="text-gray-600">
              QuestPay is a Q&A platform where you can ask questions, share
              knowledge, and offer bounties for the best answers. Explore our
              community by browsing questions, tags, or user profiles.
            </p>
          </div>
        );
      case 'questions':
        return <QuestionsList />;
      case 'tags':
        return <TagsList />;
      case 'users':
        return <UsersList />;
      default:
        return <QuestionsList />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div className="flex flex-1 pt-[4.25rem] bg-gray-50">
        {/* Left Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
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