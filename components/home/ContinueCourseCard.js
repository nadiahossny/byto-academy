'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { courseModules } from '../../lib/mockData';
import styles from '../../app/page.module.css';

export default function ContinueCourseCard() {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Pull tasks from the learning module data
  const [tasks, setTasks] = useState(
    courseModules.slice(0, 3).map(mod => ({
      id: mod.id,
      text: mod.title,
      done: mod.status === 'completed'
    }))
  );

  const handleFlip = (e) => {
    setIsFlipped(!isFlipped);
  };

  const handleContinue = (e) => {
    e.stopPropagation();
    router.push('/learn/1');
  };

  const toggleTask = (e, id) => {
    e.stopPropagation();
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  return (
    <div 
      className={`${styles.flipCard} ${isFlipped ? styles.flipped : ''}`} 
      onClick={handleFlip}
    >
      <div className={styles.flipCardInner}>
        
        {/* Front Side */}
        <div className={styles.flipCardFront}>
          <h3 className={styles.courseCardTitle}>Continue Course</h3>
          
          <div className={styles.courseImgWrapper}>
            <Image 
              src="/Aprog.png" 
              alt="Programming" 
              width={100} 
              height={100} 
              style={{ objectFit: 'contain' }} 
            />
          </div>
          
          <h4 className={styles.courseName}>Advanced React Patterns</h4>
          <p className={styles.courseModule}>Module 4: Custom Hooks in Depth</p>
          
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarFill} style={{ width: '65%' }}></div>
          </div>
          
          <p className={styles.progressText}>65% Complete</p>
        </div>

        {/* Back Side (What's been learnt) */}
        <div className={styles.flipCardBack}>
          <h3>Recent Tasks</h3>
          
          <ul className={styles.learntList}>
            {tasks.map(task => (
              <li 
                key={task.id} 
                onClick={(e) => toggleTask(e, task.id)}
              >
                <span className={styles.checkIcon}>
                  {task.done ? '✓' : '○'}
                </span>
                <span style={{ 
                  textDecoration: task.done ? 'line-through' : 'none', 
                  color: task.done ? '#999' : 'var(--text-main)' 
                }}>
                  {task.text}
                </span>
              </li>
            ))}
          </ul>

          <button onClick={handleContinue} className={styles.continueBtnBack}>
            Resume Learning
          </button>
        </div>

      </div>
    </div>
  );
}
