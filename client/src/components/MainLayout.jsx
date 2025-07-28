import NavBar from './NavBar';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import QuestionsList from './QuestionsList';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Scrollable Middle Section */}
        <div className="flex-1 md:mx-32 lg:mr-64 overflow-y-auto flex-shrink-0">
          <QuestionsList />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-64">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;