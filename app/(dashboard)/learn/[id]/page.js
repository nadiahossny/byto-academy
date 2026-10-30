'use client';

import { use } from 'react';
import { Check, Lock, Play, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { learningPaths } from '@/lib/mockData';
import styles from '../../dashboard/page.module.css';

function CircularProgress({ percentage, color }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="40" cy="40" r={radius} stroke="#eee" strokeWidth="6" fill="transparent" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
      </svg>
      <div style={{ position: 'absolute', fontWeight: 'bold', color: 'var(--primary-color)' }}>
        {percentage}%
      </div>
    </div>
  );
}

export default function LearnPath({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const pathData = learningPaths.find((p) => String(p.id) === String(id)) || learningPaths[0];
  const modules = pathData.modules;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <button
        type="button"
        onClick={() => router.push('/learn')}
        style={{ background: 'transparent', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-light)', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', marginBottom: '20px' }}
      >
        <ChevronLeft size={20} /> All Learning Paths
      </button>

      <div className={styles.welcomeBanner} style={{ background: 'linear-gradient(135deg, #EAF4FF 0%, #D8ECFF 100%)', marginBottom: '50px' }}>
        <div className={styles.welcomeText}>
          <h2>{pathData.title}</h2>
          <p>{pathData.desc}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '1.2rem' }}>{pathData.level}</p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{pathData.completion}% of Path Completed</p>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Vertical Timeline Line */}
        <div style={{ position: 'absolute', left: '28px', top: '0', bottom: '0', width: '4px', background: '#eee', zIndex: 0 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {modules.map((mod) => (
            <div key={mod.id} style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1, opacity: mod.status === 'locked' ? 0.6 : 1 }}>
              {/* Timeline Node */}
              <div style={{ width: '60px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                {mod.status === 'completed' ? (
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4caf50', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(76,175,80,0.4)' }}>
                    <Check color="#fff" size={20} />
                  </div>
                ) : mod.status === 'locked' ? (
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Lock color="#fff" size={18} />
                  </div>
                ) : (
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(79, 124, 172, 0.45)', animation: 'pulse 2s infinite' }}>
                    <Play color="#fff" size={18} />
                  </div>
                )}
              </div>

              {/* Module Card */}
              <div style={{ flex: '1', background: '#fff', padding: '24px 28px', borderRadius: '16px', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', borderLeft: mod.status === 'in-progress' ? '4px solid var(--accent-color)' : mod.status === 'completed' ? '4px solid #4caf50' : '4px solid transparent' }}>
                <div style={{ flex: '1 1 220px' }}>
                  <h4 style={{ color: 'var(--text-light)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>
                    Module {mod.id}
                  </h4>
                  <h3 style={{ color: 'var(--primary-color)', fontSize: '1.35rem', marginBottom: '8px' }}>{mod.title}</h3>
                  <p style={{ color: 'var(--text-main)', lineHeight: 1.5 }}>{mod.desc}</p>

                  {mod.status !== 'locked' && (
                    <button
                      type="button"
                      onClick={() => router.push(`/learn/${pathData.id}/module/${mod.id}`)}
                      style={{
                        marginTop: '18px',
                        background: mod.status === 'completed' ? '#f4f5f7' : 'var(--primary-color)',
                        color: mod.status === 'completed' ? 'var(--primary-color)' : '#fff',
                        border: 'none',
                        padding: '10px 24px',
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      {mod.status === 'completed' ? 'Review Module' : 'Continue Lesson'}
                    </button>
                  )}
                </div>

                {mod.status !== 'locked' && (
                  <CircularProgress percentage={mod.progress} color={mod.progress === 100 ? '#4caf50' : 'var(--accent-color)'} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(79, 124, 172, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(79, 124, 172, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(79, 124, 172, 0); }
        }
      `,
        }}
      />
    </div>
  );
}
