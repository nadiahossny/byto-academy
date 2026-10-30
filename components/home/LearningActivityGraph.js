'use client';

import { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import { Activity, ChevronDown } from 'lucide-react';
import { getActivityData } from '../../lib/mockData';
import styles from '../../app/(dashboard)/dashboard/page.module.css';

const emptySubscribe = () => () => {};
const getClientDayIndex = () => {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1;
};
const getServerDayIndex = () => -1;

export default function LearningActivityGraph() {
  const [activityPeriod, setActivityPeriod] = useState('This Week');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentDayIndex = useSyncExternalStore(
    emptySubscribe,
    getClientDayIndex,
    getServerDayIndex
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const activityData = getActivityData(activityPeriod);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className={styles.activityCard}>
      <div className={styles.activityHeader}>
        <h3 className={styles.activityTitle}>
          <Activity color="var(--accent-color)" /> Learning Activity
        </h3>

        <div className={styles.dropdownContainer} ref={dropdownRef}>
          <button
            type="button"
            aria-expanded={isDropdownOpen}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={styles.dropdownBtn}
          >
            {activityPeriod} <ChevronDown size={16} />
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu} role="listbox">
              {['This Week', 'Last Week'].map((option) => (
                <div
                  key={option}
                  role="option"
                  aria-selected={activityPeriod === option}
                  onClick={() => {
                    setActivityPeriod(option);
                    setIsDropdownOpen(false);
                  }}
                  className={`${styles.dropdownItem} ${
                    activityPeriod === option ? styles.dropdownItemActive : ''
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.graphContainer}>
        <div className={`${styles.gridLine} ${styles.gridLine25}`} />
        <div className={`${styles.gridLine} ${styles.gridLine50}`} />
        <div className={`${styles.gridLine} ${styles.gridLine75}`} />

        {activityData.map((h, i) => {
          const isToday = i === currentDayIndex && activityPeriod === 'This Week';
          return (
            <div key={i} className={styles.barWrapper}>
              <div
                className={styles.bar}
                title={`${days[i]}: ${(h / 10).toFixed(1)} hrs`}
                style={{
                  height: `${h * 2}px`,
                  background: isToday ? 'var(--accent-color)' : 'var(--primary-color)',
                  opacity: isToday ? 1 : 0.8,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = isToday ? '1' : '0.8';
                }}
              />
              <span className={styles.dayLabel}>{days[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
