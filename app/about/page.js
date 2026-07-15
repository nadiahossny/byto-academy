import Image from 'next/image';

export default function About() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <Image src="/logo.png" alt="BytoAcademy Logo" width={80} height={80} style={{ marginBottom: '20px' }} />
        <h1 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '15px' }}>About Byto Academy</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: '1.6' }}>
          We believe that learning to code should be accessible, engaging, and beautiful.
        </p>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', boxShadow: 'var(--shadow)', marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>Our Mission</h2>
        <p style={{ color: 'var(--text-main)', lineHeight: '1.8', marginBottom: '20px' }}>
          Traditional EdTech platforms are often boring and hard to navigate. We built Byto Academy to provide a premium, modern dashboard experience that motivates learners to return every day. By merging top-tier UI/UX principles with high-quality educational content, we aim to shape the next generation of developers.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow)', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--accent-color)', fontSize: '2rem', marginBottom: '10px' }}>50k+</h3>
          <p style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Active Learners</p>
        </div>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow)', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--accent-color)', fontSize: '2rem', marginBottom: '10px' }}>120+</h3>
          <p style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Premium Courses</p>
        </div>
      </div>
    </div>
  );
}
