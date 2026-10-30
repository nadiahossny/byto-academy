'use client';

import { useUser } from '../UserContext';
import { milestonesData } from '@/lib/mockData';
import styles from './stats.module.css';

export default function StatsPage() {
  const { currentStreak, hoursLearned, badgesCount } = useUser();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div className={styles.statsPageHeader}>
        <h2>Your Learning Progress</h2>
        <p>
          Here you can see exactly where your stats come from. We track your daily activity, hours spent watching courses or coding, and personal milestones unlocked along your learning journey.
        </p>
      </div>

      <div className={styles.statsDetailGrid}>
        {/* Streak Card */}
        <div className={styles.statCard}>
          <h3>
            Current Streak <span style={{ fontSize: '0.8em', color: 'var(--accent-color)' }}>&#128293;</span>
          </h3>
          <div className={styles.statValue}>{currentStreak} Days</div>
          <p className={styles.statDescription}>
            Your streak increases by 1 each day you complete at least one lesson or coding exercise. It resets if you miss a full day.
          </p>
          <div className={styles.calendarMock} aria-label="28-day activity calendar">
            {Array.from({ length: 28 }).map((_, i) => {
              let className = styles.day;
              if (i > 10 && i < 24) {
                className = i % 3 === 0 ? `${styles.day} ${styles.dayActiveHigh}` : `${styles.day} ${styles.dayActive}`;
              }
              return <div key={i} className={className} title={`Day ${i + 1}`} />;
            })}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.8em', color: '#999', marginTop: '15px' }}>
            Activity over the last 4 weeks
          </p>
        </div>

        {/* Time Learned Card */}
        <div className={styles.statCard}>
          <h3>
            Hours Learned <span style={{ fontSize: '0.8em', color: '#337ab7' }}>&#8987;</span>
          </h3>
          <div className={styles.statValue}>{hoursLearned}h</div>
          <p className={styles.statDescription}>
            This is the total cumulative time you&apos;ve spent actively engaging with the platform, including video lectures and coding challenges. Idle time is automatically paused after 5 minutes.
          </p>
          <div className={styles.mockChart}>
            <div className={styles.bar} style={{ height: '30%' }} title="Week 1: 3h" />
            <div className={styles.bar} style={{ height: '50%' }} title="Week 2: 5h" />
            <div className={styles.bar} style={{ height: '80%' }} title="Week 3: 8h" />
            <div className={styles.bar} style={{ height: '40%' }} title="Week 4: 4h" />
            <div className={styles.bar} style={{ height: '100%' }} title="Week 5: 10h" />
            <div className={styles.bar} style={{ height: '60%' }} title="Week 6: 6h" />
            <div className={styles.bar} style={{ height: '95%' }} title="Week 7: 9.5h" />
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.8em', color: '#999', marginTop: '15px' }}>
            Hours spent per week (last 7 weeks)
          </p>
        </div>

        {/* Milestones Card (Synced with QuickStats & stats.html) */}
        <div className={styles.statCard}>
          <h3>
            Milestones Unlocked <span style={{ fontSize: '0.8em', color: 'gold' }}>&#127942;</span>
          </h3>
          <div className={styles.statValue}>{badgesCount} Badges</div>
          <p className={styles.statDescription}>
            Track your personal achievements and skills mastered. Your learning journey is unique to you—focus on beating your own records!
          </p>
          <ul className={styles.leaderboardList}>
            {milestonesData.map((m, idx) => (
              <li
                key={m.id}
                className={idx === 0 ? styles.you : undefined}
                style={!m.unlocked ? { color: '#999' } : undefined}
              >
                <span>{m.title}</span>
                <span>{m.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
