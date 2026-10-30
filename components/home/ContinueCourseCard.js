'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RotateCw } from 'lucide-react';
import { useUser } from '../../app/(dashboard)/UserContext';
import styles from '../../app/(dashboard)/dashboard/page.module.css';

export default function ContinueCourseCard() {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const { tasks, toggleTask } = useUser();

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 65;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  const handleContinue = (e) => {
    e.stopPropagation();
    router.push('/learn/1');
  };

  const handleTaskClick = (e, id) => {
    e.stopPropagation();
    toggleTask(id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Continue Course card. Press Enter or click to flip between course progress and recent tasks."
      className={`${styles.flipCard} ${isFlipped ? styles.flipped : ''}`}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.flipCardInner}>
        {/* Front Side */}
        <div className={styles.flipCardFront}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 className={styles.courseCardTitle} style={{ marginBottom: 0 }}>Continue Course</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <RotateCw size={13} /> Flip for Tasks
            </span>
          </div>

          <div className={styles.courseImgWrapper}>
            <Image
              src="/mascot-scholar.png"
              alt="Byto Scholar Mascot — Frontend Web Developer Path"
              width={110}
              height={110}
              style={{ objectFit: 'contain' }}
            />
          </div>

          <h4 className={styles.courseName}>Frontend Web Developer Path</h4>
          <p className={styles.courseModule}>Module 2: JavaScript Essentials</p>

          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progressPercent}%`, transition: 'width 0.4s ease' }}
            />
          </div>

          <p className={styles.progressText}>{progressPercent}% Complete</p>
        </div>

        {/* Back Side (What's been learnt) */}
        <div className={styles.flipCardBack}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ marginBottom: 0 }}>Recent Tasks</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>
              {completedCount}/{tasks.length} Done
            </span>
          </div>

          <ul className={styles.learntList}>
            {tasks.map((task) => (
              <li
                key={task.id}
                onClick={(e) => handleTaskClick(e, task.id)}
              >
                <span className={styles.checkIcon}>
                  {task.done ? '✓' : '○'}
                </span>
                <span
                  style={{
                    textDecoration: task.done ? 'line-through' : 'none',
                    color: task.done ? '#999' : 'var(--text-main)',
                  }}
                >
                  {task.text}
                </span>
              </li>
            ))}
          </ul>

          <button type="button" onClick={handleContinue} className={styles.continueBtnBack}>
            Resume Learning
          </button>
        </div>
      </div>
    </div>
  );
}
