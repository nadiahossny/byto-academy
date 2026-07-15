'use client';

import { useState, useRef, useEffect } from 'react';
import { Activity, ChevronDown } from 'lucide-react';
import { getActivityData } from '../../lib/mockData';
import styles from '../../app/page.module.css';

export default function LearningActivityGraph() {
  const [activityPeriod, setActivityPeriod] = useState('This Week');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const activityData = getActivityData(activityPeriod);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const currentDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // 0=Monday, 6=Sunday

  return (
    <div className={styles.activityCard}>
      <div className={styles.activityHeader}>
        <h3 className={styles.activityTitle}>
          <Activity color="var(--accent-color)" /> Learning Activity
        </h3>
        
        <div className={styles.dropdownContainer} ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={styles.dropdownBtn}
          >
            {activityPeriod} <ChevronDown size={16} />
          </button>
          
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {['This Week', 'Last Week'].map(option => (
                <div 
                  key={option}
                  onClick={() => { setActivityPeriod(option); setIsDropdownOpen(false); }}
                  className={`${styles.dropdownItem} ${activityPeriod === option ? styles.dropdownItemActive : ''}`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.graphContainer}>
        <div className={`${styles.gridLine} ${styles.gridLine25}`}></div>
        <div className={`${styles.gridLine} ${styles.gridLine50}`}></div>
        <div className={`${styles.gridLine} ${styles.gridLine75}`}></div>
        
        {activityData.map((h, i) => {
          const isToday = i === currentDayIndex && activityPeriod === 'This Week';
          return (
            <div key={i} className={styles.barWrapper}>
              <div 
                className={styles.bar}
                style={{ 
                  height: `${h * 2}px`, 
                  background: isToday ? 'var(--accent-color)' : 'var(--primary-color)', 
                  opacity: isToday ? 1 : 0.8
                }} 
                onMouseOver={e => e.currentTarget.style.opacity = '1'} 
                onMouseOut={e => e.currentTarget.style.opacity = isToday ? '1' : '0.8'}
              ></div>
              <span className={styles.dayLabel}>{days[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
