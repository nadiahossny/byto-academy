'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, CheckCircle2 } from 'lucide-react';
import { useUser } from '../app/(dashboard)/UserContext';
import styles from '../app/(dashboard)/layout.module.css';

export default function NotificationDropdown() {
  const router = useRouter();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const { notifications, markAllNotificationsRead, markNotificationRead } = useUser();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div className={styles.notifContainer} ref={notifRef}>
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={isNotifOpen}
        className={styles.actionBtn}
        onClick={() => setIsNotifOpen(!isNotifOpen)}
      >
        <Bell size={20} />
        {hasUnread && <span className={styles.unreadBadge} aria-label="Unread notifications" />}
      </button>

      {isNotifOpen && (
        <div className={styles.notifDropdown} role="region" aria-label="Notifications list">
          <div className={styles.notifHeader}>
            <h4>Notifications</h4>
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className={styles.markReadBtn}
              style={{ background: 'transparent', border: 'none' }}
            >
              Mark all as read
            </button>
          </div>

          <div className={styles.notifList}>
            {notifications.length === 0 ? (
              <p style={{ padding: '20px', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                No notifications
              </p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`${styles.notifItem} ${notif.read ? styles.notifItemRead : styles.notifItemUnread}`}
                >
                  <div className={notif.read ? styles.notifIconRead : styles.notifIconUnread}>
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className={`${styles.notifTitle} ${notif.read ? styles.notifTitleRead : styles.notifTitleUnread}`}>
                      {notif.title}
                    </p>
                    <span className={styles.notifTime}>{notif.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setIsNotifOpen(false);
              router.push('/notifications');
            }}
            className={styles.notifFooter}
            style={{ width: '100%', border: 'none', fontFamily: 'inherit' }}
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}
