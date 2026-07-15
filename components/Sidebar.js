'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Home, BookOpen, Code, GraduationCap, Award, Info, Terminal, MessageCircle, Briefcase, MoreVertical, X } from 'lucide-react';
import styles from '../app/layout.module.css';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Learn', path: '/learn', icon: <BookOpen size={20} /> },
    { name: 'Practice', path: '/practice', icon: <Code size={20} /> },
    { name: 'Courses', path: '/courses', icon: <GraduationCap size={20} /> },
    { name: 'Certificates', path: '/certificates', icon: <Award size={20} /> },
    { name: 'About', path: '/about', icon: <Info size={20} /> },
  ];

  return (
    <>
      <div className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MoreVertical size={24} />}
      </div>
      
      {isOpen && (
        <div className={styles.mobileOverlay} onClick={() => setIsOpen(false)}></div>
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="BytoAcademy Logo" width={40} height={40} />
          <h1>BytoAcademy</h1>
        </div>
        
        <ul className={styles.nav}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path} 
                className={`${styles.navItem} ${(pathname === item.path && item.name !== 'Certificates') ? styles.navItemActive : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <div className={styles.iconWrapper}>{item.icon}</div>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.contactInfo}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', opacity: 0.7 }}>© 2024 Byto Academy</p>
        </div>
      </aside>
    </>
  );
}
