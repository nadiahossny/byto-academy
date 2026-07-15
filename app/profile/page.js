'use client';

import { useState } from 'react';
import Image from 'next/image';
import { User, Mail, Award, Settings, CreditCard, Edit3 } from 'lucide-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Profile Header Banner */}
      <div style={{ position: 'relative', width: '100%', height: '200px', background: 'var(--primary-color)', borderRadius: '20px 20px 0 0', overflow: 'hidden' }}>
        <button style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--accent-color)', border: 'none', padding: '10px 16px', borderRadius: '30px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Edit3 size={16} /> Edit Cover
        </button>
      </div>

      {/* Profile Info Card */}
      <div style={{ background: '#fff', borderRadius: '0 0 20px 20px', padding: '0 40px 40px 40px', boxShadow: 'var(--shadow)', position: 'relative', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '-60px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px' }}>
            {/* Avatar */}
            <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: '#fff', padding: '6px', position: 'relative', zIndex: 2, boxShadow: 'var(--shadow)' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={60} color="#fff" />
              </div>
            </div>
            <div style={{ paddingBottom: '10px' }}>
              <h2 style={{ color: 'var(--primary-color)', fontSize: '2.2rem', marginBottom: '5px' }}>Alex Johnson</h2>
              <p style={{ color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                <Mail size={16} /> alex.johnson@example.com
              </p>
            </div>
          </div>
          <button style={{ background: 'var(--primary-color)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}>
            Edit Profile
          </button>
        </div>

        {/* Custom Tabs */}
        <div style={{ display: 'flex', gap: '40px', borderBottom: '1px solid #eee' }}>
          {['Overview', 'Certificates', 'Settings', 'Billing'].map(tab => (
            <div 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{ 
                padding: '15px 0', 
                color: activeTab === tab ? 'var(--accent-color)' : 'var(--text-light)', 
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                borderBottom: activeTab === tab ? '3px solid var(--accent-color)' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Tab Content Area */}
      {activeTab === 'Overview' && (
        <div className="responsive-grid">
          <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>About Me</h3>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '30px' }}>
              I am a passionate frontend developer eager to master React and Next.js. I love building intuitive user interfaces and solving complex UI challenges.
            </p>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>Skills</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Figma'].map(skill => (
                <span key={skill} style={{ background: '#f4f5f7', color: 'var(--primary-color)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>{skill}</span>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '20px', padding: '25px', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ background: '#fff3e0', padding: '15px', borderRadius: '15px' }}><Award color="var(--accent-color)" size={30} /></div>
              <div>
                <h4 style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '5px' }}>Total Certificates</h4>
                <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem' }}>4</h2>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '20px', padding: '25px', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ background: 'var(--bg-color)', padding: '15px', borderRadius: '15px' }}><Settings color="var(--primary-color)" size={30} /></div>
              <div>
                <h4 style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '5px' }}>Account Status</h4>
                <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem' }}>Pro Member</h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'Overview' && (
        <div style={{ background: '#fff', borderRadius: '20px', padding: '50px', boxShadow: 'var(--shadow)', textAlign: 'center', color: 'var(--text-light)' }}>
          <p>The {activeTab} section is under construction.</p>
        </div>
      )}
    </div>
  );
}
