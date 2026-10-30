import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { UserProvider } from './UserContext';
import styles from './layout.module.css';

export default function DashboardLayout({ children }) {
  return (
    <UserProvider>
      <div className={styles.container} style={{ background: '#f8fafc' }}>
        <Sidebar />
        <div className={styles.mainWrapper}>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
