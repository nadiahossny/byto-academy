'use client';

import { useState } from 'react';
import { Flame, Clock, Award, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from '../../app/page.module.css';

export default function QuickStats() {
  const router = useRouter();
  const [streak, setStreak] = useState(12);
  const [claimed, setClaimed] = useState(false);

  const handleClaim = (e) => {
    e.stopPropagation();
    setStreak(streak + 1);
    setClaimed(true);
  };

  const stats = [
    { id: 1, title: 'Current Streak', value: `${streak} Days`, icon: Flame },
    { id: 2, title: 'Hours Learned', value: '45.5h', icon: Clock },
    { id: 3, title: 'Milestones Unlocked', value: '12 Badges', icon: Award },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className={styles.statItem}
            style={{ cursor: 'pointer' }}
            onClick={() => router.push('/stats')}
          >
            <div className={styles.statIconWrap}>
              <stat.icon color="var(--accent-color)" size={24} />
            </div>
            <div>
              <p className={styles.statTitle}>{stat.title}</p>
              <h3 className={styles.statValue}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Interactive element removed as per user request */}
    </div>
  );
}
