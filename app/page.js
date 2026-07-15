import WelcomeBanner from '../components/home/WelcomeBanner';
import QuickStats from '../components/home/QuickStats';
import ContinueCourseCard from '../components/home/ContinueCourseCard';
import LearningActivityGraph from '../components/home/LearningActivityGraph';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Top Section: Welcome & Quick Stats */}
      <div className="responsive-grid">
        <WelcomeBanner />
        <QuickStats />
      </div>

      {/* Middle Section: Activity & Continue Learning */}
      <div className="responsive-grid-reverse">
        <ContinueCourseCard />
        <LearningActivityGraph />
      </div>
      
    </div>
  );
}
