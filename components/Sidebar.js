'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Home, BookOpen, Code, GraduationCap, Award, Info, Menu, X } from 'lucide-react';
import styles from '../app/(dashboard)/layout.module.css';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Learn', path: '/learn', icon: <BookOpen size={20} /> },
    { name: 'Practice', path: '/practice', icon: <Code size={20} /> },
    { name: 'Courses', path: '/courses', icon: <GraduationCap size={20} /> },
    { name: 'Certificates', path: '/certificates', icon: <Award size={20} /> },
    { name: 'About', path: '/about', icon: <Info size={20} /> },
  ];

  const isRouteActive = (itemPath) => {
    if (itemPath === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/stats';
    }
    return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
  };

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`} aria-label="Sidebar Navigation">
        <Link href="/dashboard" className={styles.logo} onClick={() => setIsOpen(false)}>
          <Image src="/logo.png" alt="BytoAcademy Logo" width={36} height={36} />
          <h1>BytoAcademy</h1>
        </Link>

        <nav aria-label="Main Navigation">
          <ul className={styles.nav}>
            {navItems.map((item) => {
              const active = isRouteActive(item.path);
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    aria-current={active ? 'page' : undefined}
                    className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={styles.iconWrapper}>{item.icon}</div>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.contactInfo}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              fontSize: '0.8rem',
              color: 'var(--primary-color)',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            ← Marketing &amp; Landing
          </Link>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', opacity: 0.8 }}>
            © {new Date().getFullYear()} Byto Academy
          </p>
        </div>
      </aside>
    </>
  );
}
