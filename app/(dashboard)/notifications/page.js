'use client';

import { Bell, CheckCircle2, Trash2 } from 'lucide-react';
import { useUser } from '../UserContext';

export default function NotificationsPage() {
  const {
    notifications,
    markAllNotificationsRead,
    markNotificationRead,
    deleteNotification,
  } = useUser();

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Bell size={28} /> Notifications
          </h2>
          <p style={{ color: 'var(--text-light)', margin: 0 }}>
            Stay updated with your learning progress and announcements.
          </p>
        </div>
        <button
          type="button"
          onClick={markAllNotificationsRead}
          style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Mark all as read
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '20px', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
        {notifications.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-light)' }}>
            <Bell size={48} style={{ opacity: 0.3, marginBottom: '20px' }} />
            <h3>No notifications to display</h3>
            <p>You are all caught up!</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              style={{
                padding: '25px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                gap: '20px',
                background: notif.read ? '#fff' : '#f0f6fc',
                transition: 'background 0.3s',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: notif.read ? 'transparent' : 'var(--accent-color)',
                  marginTop: '6px',
                  flexShrink: 0,
                }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ margin: 0, color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: notif.read ? '500' : 'bold' }}>
                    {notif.title}
                  </h3>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{notif.time}</span>
                </div>
                <p style={{ margin: '0 0 15px 0', color: 'var(--text-main)', lineHeight: '1.5' }}>{notif.desc}</p>

                {!notif.read && (
                  <button
                    type="button"
                    onClick={() => markNotificationRead(notif.id)}
                    style={{ background: 'transparent', color: 'var(--accent-color)', border: 'none', padding: 0, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <CheckCircle2 size={16} /> Mark as read
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => deleteNotification(notif.id)}
                  style={{ background: 'transparent', border: 'none', color: '#ccc', cursor: 'pointer', padding: '10px', borderRadius: '50%', transition: 'background 0.2s, color 0.2s' }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#ffeeee';
                    e.currentTarget.style.color = '#ff5252';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#ccc';
                  }}
                  title="Delete notification"
                  aria-label={`Delete notification: ${notif.title}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
