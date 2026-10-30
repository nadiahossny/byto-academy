'use client';

import { Flame, Clock, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../app/(dashboard)/UserContext';
import styles from '../../app/(dashboard)/dashboard/page.module.css';

export default function QuickStats() {
  const router = useRouter();
  const { currentStreak, hoursLearned, badgesCount } = useUser();

  const stats = [
    { id: 1, title: 'Current Streak', value: `${currentStreak} Days`, icon: Flame },
    { id: 2, title: 'Hours Learned', value: `${hoursLearned}h`, icon: Clock },
    { id: 3, title: 'Milestones Unlocked', value: `${badgesCount} Badges`, icon: Award },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div
            key={stat.id}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${stat.title}: ${stat.value}`}
            className={styles.statItem}
            style={{ cursor: 'pointer' }}
            onClick={() => router.push('/stats')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                router.push('/stats');
              }
            }}
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
    </div>
  );
}
