'use client';

import Image from 'next/image';

export default function Certificates() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '8px' }}>Your Achievements</h2>
          <p style={{ color: 'var(--text-light)', margin: 0 }}>View, download, and share your earned certificates.</p>
        </div>
      </div>
      
      <div className="responsive-grid">
        <div style={{ background: ' #3a3f58', borderRadius: '20px', padding: '30px', boxShadow: 'var(--shadow)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: '0.1' }}>
            <Image src="/online-certificate.png" alt="Badge bg" width={180} height={180} style={{ filter: 'brightness(0) invert(1)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px', position: 'relative', zIndex: 2 }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px', backdropFilter: 'blur(5px)' }}>
              <Image src="/online-certificate.png" alt="Certificate" width={45} height={45} />
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '5px' }}>Certified React Developer</h3>
              <p style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '0.9rem', margin: 0 }}>Frontend Web Developer Path</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '25px', position: 'relative', zIndex: 2, flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Issued On</span>
              <span style={{ color: '#fff', fontWeight: '500', fontSize: '0.9rem' }}>May 24, 2024</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Credential ID</span>
              <span style={{ color: '#fff', fontWeight: '500', fontSize: '0.9rem', fontFamily: 'monospace' }}>BYTO-104928374</span>
            </div>
          </div>
          
          <button style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', width: '100%', position: 'relative', zIndex: 2, transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
            Download Certificate
          </button>
        </div>

        <div style={{ background: '#f8f9fa', border: '2px dashed #ddd', borderRadius: '20px', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: 'var(--text-light)', textAlign: 'center', transition: 'border-color 0.2s, background 0.2s' }} onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.background = '#fff9f0'; }} onMouseOut={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.background = '#f8f9fa'; }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <Image src="/information(1).png" alt="Info" width={30} height={30} style={{ opacity: '0.5' }} />
          </div>
          <h4 style={{ color: 'var(--primary-color)', fontSize: '1.2rem', marginBottom: '10px' }}>Earn More Certificates</h4>
          <p style={{ margin: 0, fontSize: '0.95rem', maxWidth: '250px' }}>Complete more learning paths and courses to unlock new achievements.</p>
        </div>
      </div>
    </div>
  );
}
