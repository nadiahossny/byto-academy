'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PlayCircle } from 'lucide-react';
import styles from '../../app/page.module.css';

export default function WelcomeBanner() {
  const router = useRouter();

  return (
    <div className={styles.welcomeBannerContainer}>
      <div className={styles.welcomeTextWrapper}>
        <h2 className={styles.welcomeTitle}>Welcome back, Student</h2>
        <p className={styles.welcomeSubtitle}>You've learned 5 new concepts this week. Keep it up!</p>
        <button 
          onClick={() => router.push('/learn/1')} 
          className={styles.resumeBtn}
        >
          <PlayCircle size={20} /> Resume Learning
        </button>
      </div>
      <Image 
        src="/welcomeP.png" 
        alt="Welcome" 
        width={220} 
        height={220} 
        className={styles.welcomeImg} 
      />
      <div className={styles.welcomeDecoCircle}></div>
    </div>
  );
}
