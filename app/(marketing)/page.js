import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
      {/* Hero Section with Byto Mascot */}
      <section style={{ padding: '6rem 0 4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
        <div
          style={{
            background: 'radial-gradient(circle, rgba(184, 201, 225, 0.45) 0%, rgba(241, 245, 249, 0) 70%)',
            padding: '1.5rem',
            borderRadius: '50%',
            marginBottom: '1.5rem',
          }}
        >
          <Image
            src="/mascot-welcome.png"
            alt="Byto — Your AI Coding Companion Mascot"
            width={180}
            height={180}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <span
          style={{
            display: 'inline-block',
            padding: '0.4rem 1rem',
            background: 'rgba(79, 124, 172, 0.14)',
            color: '#4F7CAC',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1.25rem',
            border: '1px solid rgba(184, 201, 225, 0.8)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Meet Byto • Your Friendly Coding Companion
        </span>
        <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', color: '#1E242B' }}>
          Master Code.<br />Without the Overload.
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#64748B', maxWidth: '620px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          BytoAcademy is the calm, distraction-free learning workspace guided by Byto—designed to help you master programming faster, retain more, and build real-world projects.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" style={{ background: '#1D8FE1', color: '#fff', textDecoration: 'none', fontWeight: '700', padding: '1rem 2.2rem', borderRadius: '999px', fontSize: '1.125rem', boxShadow: '0 8px 20px -4px rgba(29, 143, 225, 0.35)' }}>
            Start Learning for Free
          </Link>
          <Link href="/dashboard" style={{ background: '#FFFFFF', color: '#12263A', textDecoration: 'none', fontWeight: '700', padding: '1rem 2.2rem', borderRadius: '999px', fontSize: '1.125rem', boxShadow: '0 8px 20px -6px rgba(15, 41, 66, 0.08)' }}>
            Explore Live Dashboard
          </Link>
        </div>
      </section>

      {/* Feature Grid with the 3 Mascot Poses */}
      <section id="features" style={{ padding: '5rem 0' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#12263A' }}>
          Why learn with BytoAcademy?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ background: '#FFFFFF', padding: '2.25rem', borderRadius: '24px', boxShadow: '0 10px 30px -8px rgba(15, 41, 66, 0.06)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '80px', height: '80px', background: '#EAF4FF', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', padding: '8px' }}>
              <Image src="/mascot-welcome.png" alt="Welcoming Byto Mascot" width={64} height={64} style={{ objectFit: 'contain' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#12263A' }}>Zero Cognitive Overload</h3>
            <p style={{ color: '#5A718A', lineHeight: 1.6 }}>
              Our calm sky-and-cloud UI keeps you focused. No cluttered menus, no popups—just you, Byto, and your code.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '2.25rem', borderRadius: '24px', boxShadow: '0 10px 30px -8px rgba(15, 41, 66, 0.06)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '80px', height: '80px', background: '#EAF4FF', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', padding: '8px' }}>
              <Image src="/mascot-thinking.png" alt="Problem-Solving Byto Mascot" width={64} height={64} style={{ objectFit: 'contain' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#12263A' }}>Interactive Browser IDE</h3>
            <p style={{ color: '#5A718A', lineHeight: 1.6 }}>
              Don&apos;t just watch videos. Practice immediately with our in-browser coding challenges and instant multi-case test runner.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '2.25rem', borderRadius: '24px', boxShadow: '0 10px 30px -8px rgba(15, 41, 66, 0.06)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '80px', height: '80px', background: '#EAF4FF', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', padding: '8px' }}>
              <Image src="/mascot-scholar.png" alt="Scholar Byto Mascot" width={64} height={64} style={{ objectFit: 'contain' }} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#12263A' }}>Guided Mastery &amp; Streaks</h3>
            <p style={{ color: '#5A718A', lineHeight: 1.6 }}>
              Track your daily streaks, unlock personal milestones, and earn verifiable certificates on your personalized dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 0 8rem', textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(135deg, #EAF4FF 0%, #D8ECFF 100%)', color: '#12263A', padding: '4rem 2rem', borderRadius: '32px', boxShadow: '0 20px 40px -15px rgba(15, 41, 66, 0.08)' }}>
          <Image src="/mascot-scholar.png" alt="Scholar Byto" width={96} height={96} style={{ objectFit: 'contain', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#12263A' }}>
            Ready to write your first line of code?
          </h2>
          <p style={{ color: '#5A718A', marginBottom: '2rem', fontSize: '1.125rem' }}>
            Join thousands of developers learning alongside Byto today.
          </p>
          <Link href="/signup" style={{ display: 'inline-block', background: '#1D8FE1', color: '#fff', textDecoration: 'none', fontWeight: '700', padding: '1rem 3rem', borderRadius: '999px', fontSize: '1.125rem', boxShadow: '0 8px 20px -4px rgba(29, 143, 225, 0.35)' }}>
            Create Your Free Account
          </Link>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/dashboard" style={{ color: '#12263A', textDecoration: 'none', fontWeight: '600', fontSize: '1rem', padding: '0.75rem 1.75rem', background: '#FFFFFF', borderRadius: '999px', transition: 'all 0.2s', display: 'inline-block', boxShadow: '0 4px 12px rgba(15, 41, 66, 0.05)' }}>
              Or Continue as Guest
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
