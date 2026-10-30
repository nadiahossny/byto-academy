'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, User } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import styles from '../app/(dashboard)/layout.module.css';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      router.push(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.searchBar} role="search">
        <Search size={18} className={styles.searchIcon} aria-hidden="true" />
        <input
          type="search"
          aria-label="Search courses, skills, or mentors"
          placeholder="Search courses, skills, or mentors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className={styles.userActions}>
        <NotificationDropdown />

        <button
          type="button"
          aria-label="User Profile"
          className={styles.actionBtn}
          onClick={() => router.push('/profile')}
        >
          <User size={20} />
        </button>
      </div>
    </header>
  );
}
