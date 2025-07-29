import FeaturedBounties from './FeaturedBounties';
import RecentQuestions from './RecentQuestions';
import TopTags from './TopTags';

const Home = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Welcome to QuestPay
      </h1>
      <p className="text-gray-600 mb-4">
        Explore our Q&A platform with bounties!
      </p>
      <div className="space-y-6">
        <FeaturedBounties />
        <RecentQuestions />
        <TopTags />
      </div>
    </div>
  );
};

export default Home;
