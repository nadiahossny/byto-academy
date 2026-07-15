'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, CheckCircle2 } from 'lucide-react';
import { notificationsData } from '../lib/mockData';
import styles from '../app/layout.module.css';

export default function NotificationDropdown() {
  const router = useRouter();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);
  
  // Use a local state for notifications to simulate marking as read
  const [notifications, setNotifications] = useState(notificationsData);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notifRef]);

  const hasUnread = notifications.some(n => !n.read);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className={styles.notifContainer} ref={notifRef}>
      <div className={styles.actionBtn} onClick={() => setIsNotifOpen(!isNotifOpen)}>
        <Bell size={20} />
        {hasUnread && <span className={styles.unreadBadge}></span>}
      </div>
      
      {isNotifOpen && (
        <div className={styles.notifDropdown}>
          <div className={styles.notifHeader}>
            <h4>Notifications</h4>
            <span onClick={markAllAsRead} className={styles.markReadBtn}>Mark all as read</span>
          </div>
          
          <div className={styles.notifList}>
            {notifications.map(notif => (
              <div 
                key={notif.id} 
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
            ))}
          </div>
          
          <div 
            onClick={() => { setIsNotifOpen(false); router.push('/notifications'); }}
            className={styles.notifFooter}
          >
            View all notifications
          </div>
        </div>
      )}
    </div>
  );
}
