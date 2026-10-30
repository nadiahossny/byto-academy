'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Layers, CheckCircle, Clock } from 'lucide-react';
import { learningPaths } from '@/lib/mockData';

export default function LearnCatalog() {
  const router = useRouter();

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginBottom: '10px' }}>Learning Paths</h2>
        <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
          Structured, step-by-step roadmaps to achieve your career goals.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '30px' }}>
        {learningPaths.map((path) => (
          <div
            key={path.id}
            role="button"
            tabIndex={0}
            onClick={() => router.push('/learn/' + path.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                router.push('/learn/' + path.id);
              }
            }}
            style={{ background: '#fff', borderRadius: '20px', padding: '10px', boxShadow: 'var(--shadow)', cursor: 'pointer', transition: 'transform 0.3s' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ background: path.image ? '#f4f5f7' : path.color, height: '140px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', overflow: 'hidden' }}>
              {path.image ? (
                <Image src={path.image} alt={path.title} width={120} height={120} style={{ objectFit: 'contain' }} />
              ) : (
                <Layers size={50} color="#fff" style={{ opacity: 0.8 }} />
              )}
            </div>
            <div style={{ padding: '0 15px 15px 15px' }}>
              <h3 style={{ color: 'var(--primary-color)', fontSize: '1.4rem', marginBottom: '10px' }}>{path.title}</h3>
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.5' }}>{path.desc}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: '15px', color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={18} color="var(--accent-color)" /> {path.courses} Modules
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={18} /> {path.duration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
