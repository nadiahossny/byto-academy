import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F1F5F9', color: '#1E242B' }}>
      <header style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <Image src="/mascot-welcome.png" alt="BytoAcademy Mascot Logo" width={48} height={48} style={{ objectFit: 'contain' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E242B' }}>BytoAcademy</span>
        </Link>
      </header>
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 2rem 3rem' }}>
        <div style={{ width: '100%', maxWidth: '420px', background: '#FFFFFF', padding: '2.75rem 2rem', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 12px 24px -6px rgba(30, 36, 43, 0.08)' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
