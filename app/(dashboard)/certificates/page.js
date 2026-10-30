'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Award, Printer, X } from 'lucide-react';
import { useUser } from '../UserContext';

export default function Certificates() {
  const { profile } = useUser();
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '8px' }}>Your Achievements</h2>
          <p style={{ color: 'var(--text-light)', margin: 0 }}>View, download, and share your earned certificates.</p>
        </div>
      </div>

      <div className="responsive-grid">
        <div style={{ background: 'linear-gradient(135deg, #EAF4FF 0%, #D8ECFF 100%)', borderRadius: '24px', padding: '32px', boxShadow: 'var(--shadow)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: '0.08' }}>
            <Image src="/online-certificate.png" alt="Badge bg" width={180} height={180} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px', position: 'relative', zIndex: 2 }}>
            <div style={{ background: '#FFFFFF', padding: '15px', borderRadius: '18px', boxShadow: '0 6px 16px rgba(15, 41, 66, 0.06)' }}>
              <Image src="/online-certificate.png" alt="Certificate" width={45} height={45} />
            </div>
            <div>
              <h3 style={{ color: 'var(--primary-color)', fontSize: '1.4rem', marginBottom: '5px' }}>Certified React Developer</h3>
              <p style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '0.9rem', margin: 0 }}>Frontend Web Developer Path</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px', position: 'relative', zIndex: 2, flex: 1, background: 'rgba(255,255,255,0.75)', padding: '16px 20px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Recipient</span>
              <span style={{ color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.9rem' }}>{profile.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Issued On</span>
              <span style={{ color: 'var(--primary-color)', fontWeight: '600', fontSize: '0.9rem' }}>May 24, 2026</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Credential ID</span>
              <span style={{ color: 'var(--accent-color)', fontWeight: '700', fontSize: '0.9rem' }}>BYTO-104928374</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', padding: '13px 20px', borderRadius: '999px', cursor: 'pointer', fontWeight: 'bold', width: '100%', position: 'relative', zIndex: 2, boxShadow: '0 8px 20px -4px rgba(29, 143, 225, 0.35)' }}
          >
            View &amp; Download Certificate
          </button>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: 'var(--text-light)', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#F4F9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Image src="/information(1).png" alt="Info" width={30} height={30} style={{ opacity: '0.6' }} />
          </div>
          <h4 style={{ color: 'var(--primary-color)', fontSize: '1.2rem', marginBottom: '10px' }}>Earn More Certificates</h4>
          <p style={{ margin: 0, fontSize: '0.95rem', maxWidth: '250px' }}>Complete more learning paths and courses to unlock new achievements.</p>
        </div>
      </div>

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Certificate Preview"
          style={{ position: 'fixed', inset: 0, background: 'rgba(15, 41, 66, 0.35)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: '28px', maxWidth: '720px', width: '100%', padding: '44px', textAlign: 'center', position: 'relative', boxShadow: '0 25px 60px -15px rgba(15, 41, 66, 0.2)' }}
          >
            <button
              type="button"
              aria-label="Close certificate preview"
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>

            <Award size={56} color="#4F7CAC" style={{ marginBottom: '12px' }} />
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
              Byto Academy Certificate of Completion
            </p>
            <h3 style={{ fontSize: '2.2rem', color: 'var(--primary-color)', marginBottom: '12px' }}>{profile.name}</h3>
            <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              has successfully completed the <strong>Certified React Developer</strong> curriculum and demonstrated mastery in modern frontend engineering.
            </p>
            <p style={{ fontFamily: 'monospace', color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '28px' }}>
              Credential ID: BYTO-104928374 • Issued May 24, 2026
            </p>
            <button
              type="button"
              onClick={() => window.print()}
              style={{ background: 'var(--primary-color)', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '30px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Printer size={18} /> Print / Save as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
