'use client';

import styles from './stats.module.css';

export default function StatsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      <div className={styles.statsPageHeader}>
        <h2>Your Learning Progress</h2>
        <p>Here you can see exactly where your stats come from. We track your daily activity, hours spent watching courses or coding, and compare your progress to other learners globally.</p>
      </div>

      <div className={styles.statsDetailGrid}>
        
        {/* Streak Card */}
        <div className={styles.statCard}>
          <h3>Current Streak <span style={{fontSize: '0.8em', color: 'var(--accent-color)'}}>&#128293;</span></h3>
          <div className={styles.statValue}>12 Days</div>
          <p className={styles.statDescription}>
            Your streak increases by 1 each day you complete at least one lesson or coding exercise. It resets if you miss a full day.
          </p>
          <div className={styles.calendarMock}>
            {/* Mocking a calendar view for the streak */}
            {Array.from({ length: 28 }).map((_, i) => {
              let className = styles.day;
              if (i > 10 && i < 24) {
                className = i % 3 === 0 ? `${styles.day} ${styles.dayActiveHigh}` : `${styles.day} ${styles.dayActive}`;
              }
              return <div key={i} className={className}></div>;
            })}
          </div>
          <p style={{textAlign: 'center', fontSize: '0.8em', color: '#999', marginTop: '15px'}}>Activity over the last 4 weeks</p>
        </div>

        {/* Time Learned Card */}
        <div className={styles.statCard}>
          <h3>Hours Learned <span style={{fontSize: '0.8em', color: '#337ab7'}}>&#8987;</span></h3>
          <div className={styles.statValue}>45.5h</div>
          <p className={styles.statDescription}>
            This is the total cumulative time you've spent actively engaging with the platform. Idle time is automatically paused after 5 minutes of inactivity.
          </p>
          <div className={styles.mockChart}>
            {/* Mocking a bar chart for hours per week */}
            <div className={styles.bar} style={{ height: '30%' }} title="Week 1: 3h"></div>
            <div className={styles.bar} style={{ height: '50%' }} title="Week 2: 5h"></div>
            <div className={styles.bar} style={{ height: '80%' }} title="Week 3: 8h"></div>
            <div className={styles.bar} style={{ height: '40%' }} title="Week 4: 4h"></div>
            <div className={styles.bar} style={{ height: '100%' }} title="Week 5: 10h"></div>
            <div className={styles.bar} style={{ height: '60%' }} title="Week 6: 6h"></div>
            <div className={styles.bar} style={{ height: '95%' }} title="Week 7: 9.5h"></div>
          </div>
          <p style={{textAlign: 'center', fontSize: '0.8em', color: '#999', marginTop: '15px'}}>Hours spent per week (last 7 weeks)</p>
        </div>

        {/* Rank Card */}
        <div className={styles.statCard}>
          <h3>Global Rank <span style={{fontSize: '0.8em', color: 'gold'}}>&#127942;</span></h3>
          <div className={styles.statValue}>Top 5%</div>
          <p className={styles.statDescription}>
            Your rank is calculated based on a combination of your total XP earned, courses completed, and consistency. You are currently outperforming 95% of active users!
          </p>
          <ul className={styles.leaderboardList}>
            <li><span>1. CodeMaster99</span> <span>15,420 XP</span></li>
            <li><span>2. DevGirl</span> <span>14,800 XP</span></li>
            <li><span>3. ByteKing</span> <span>14,100 XP</span></li>
            <li style={{color: '#999', justifyContent: 'center'}}>...</li>
            <li className={styles.you}><span>42. You (User Name)</span> <span>9,850 XP</span></li>
            <li style={{color: '#999', justifyContent: 'center'}}>...</li>
            <li><span>9,999. NewbieCoder</span> <span>120 XP</span></li>
          </ul>
        </div>

      </div>
    </div>
  );
}
