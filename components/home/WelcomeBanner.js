'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PlayCircle } from 'lucide-react';
import { useUser } from '../../app/(dashboard)/UserContext';
import styles from '../../app/(dashboard)/dashboard/page.module.css';

export default function WelcomeBanner() {
  const router = useRouter();
  const { profile } = useUser();
  const firstName = profile?.name ? profile.name.split(' ')[0] : 'Student';

  return (
    <div className={styles.welcomeBannerContainer}>
      <div className={styles.welcomeTextWrapper}>
        <h2 className={styles.welcomeTitle}>Welcome back, {firstName}</h2>
        <p className={styles.welcomeSubtitle}>
          You&apos;ve learned 5 new concepts this week. Keep up the momentum!
        </p>
        <button
          type="button"
          onClick={() => router.push('/learn/1')}
          className={styles.resumeBtn}
        >
          <PlayCircle size={20} /> Resume Learning
        </button>
      </div>
      <Image
        src="/mascot-welcome.png"
        alt="Byto Mascot welcoming you"
        width={220}
        height={220}
        className={styles.welcomeImg}
        priority
      />
      <div className={styles.welcomeDecoCircle} aria-hidden="true" />
    </div>
  );
}
