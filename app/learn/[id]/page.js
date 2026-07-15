'use client';

import { use } from 'react';
import { Check, Lock, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { courseModules } from '../../../lib/mockData';
import styles from '../../page.module.css';

function CircularProgress({ percentage, color }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

  const modules = courseModules;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className={styles.welcomeBanner} style={{ background: 'linear-gradient(135deg, #1A1C29 0%, #3a3f58 100%)', marginBottom: '50px' }}>
        <div className={styles.welcomeText}>
          <h2>Frontend Web Developer Path</h2>
          <p>Your comprehensive guide from beginner to pro.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '1.2rem' }}>Level 12</p>
          <p style={{ color: '#fff', fontSize: '0.9rem' }}>45% of Path Completed</p>
        </div>
      </div>
      
      <div style={{ position: 'relative', paddingLeft: '40px' }}>
        {/* Vertical Timeline Line */}
        <div style={{ position: 'absolute', left: '80px', top: '0', bottom: '0', width: '4px', background: '#eee', zIndex: 0 }}></div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {modules.map((mod, idx) => (
            <div key={mod.id} style={{ display: 'flex', gap: '30px', position: 'relative', zIndex: 1, opacity: mod.status === 'locked' ? 0.6 : 1 }}>
              
              {/* Timeline Node */}
              <div style={{ width: '80px', display: 'flex', justifyContent: 'center' }}>
                {mod.status === 'completed' ? (
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4caf50', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(76,175,80,0.4)' }}>
                    <Check color="#fff" size={20} />
                  </div>
                ) : mod.status === 'locked' ? (
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Lock color="#fff" size={18} />
                  </div>
                ) : (
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(255,159,28,0.4)', animation: 'pulse 2s infinite' }}>
                    <Play color="#fff" size={18} />
                  </div>
                )}
              </div>

              {/* Module Card */}
              <div style={{ flex: '1', background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: mod.status === 'in-progress' ? '4px solid var(--accent-color)' : '4px solid transparent' }}>
                <div>
                  <h4 style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Module {mod.id}</h4>
                  <h3 style={{ color: 'var(--primary-color)', fontSize: '1.4rem', marginBottom: '10px' }}>{mod.title}</h3>
                  <p style={{ color: 'var(--text-main)' }}>{mod.desc}</p>
                  
                  {mod.status === 'in-progress' && (
                    <button 
                      onClick={() => router.push(`/learn/${id}/module/${mod.id}`)}
                      style={{ marginTop: '20px', background: 'var(--primary-color)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.2s, boxShadow 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      Continue
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
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,159,28, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255,159,28, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,159,28, 0); }
        }
      `}} />
    </div>
  );
}
