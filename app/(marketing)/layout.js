import Image from 'next/image';
import Link from 'next/link';

export default function MarketingLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F1F5F9', color: '#1E242B' }}>
      <header style={{ padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', flexWrap: 'wrap', gap: '1rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <Image src="/mascot-welcome.png" alt="Byto Mascot Logo" width={42} height={42} style={{ objectFit: 'contain' }} />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E242B' }}>BytoAcademy</span>
        </Link>
        <nav style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }} aria-label="Marketing Navigation">
          <Link href="/dashboard" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500', padding: '0.5rem 0.75rem' }}>
            Live Dashboard
          </Link>
          <Link href="/login" style={{ color: '#64748B', textDecoration: 'none', fontWeight: '500', padding: '0.5rem 1rem' }}>
            Log In
          </Link>
          <Link href="/signup" style={{ background: '#4F7CAC', color: '#fff', textDecoration: 'none', fontWeight: '600', padding: '0.5rem 1.5rem', borderRadius: '8px', boxShadow: '0 4px 10px rgba(79, 124, 172, 0.25)' }}>
            Sign Up Free
          </Link>
        </nav>
      </header>
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <footer style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#64748B', fontSize: '0.875rem' }}>
        <p>&copy; 2026 BytoAcademy. Empowering developers worldwide with Byto.</p>
      </footer>
    </div>
  );
}
