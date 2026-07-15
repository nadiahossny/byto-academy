'use client';

import { useState } from 'react';
import { PlayCircle, Clock, Users, Star, CheckCircle, FileText, Download, ChevronDown } from 'lucide-react';

export default function CourseDetail({ params }) {
  const [activeTab, setActiveTab] = useState('About');
  const [expandedModule, setExpandedModule] = useState(1);

  const modules = [
    { id: 1, title: 'Introduction to the Course', duration: '45 mins', lessons: ['Welcome to the platform', 'Setting up your environment', 'Basic concepts'] },
    { id: 2, title: 'Core Architecture', duration: '2 hours', lessons: ['Understanding components', 'State vs Props', 'Component Lifecycle'] },
    { id: 3, title: 'Advanced Patterns', duration: '3.5 hours', lessons: ['Custom Hooks', 'Context API', 'Performance Optimization'] },
    { id: 4, title: 'Final Project', duration: '5 hours', lessons: ['Project setup', 'Building the UI', 'Deploying to Vercel'] },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Top Section: Video Player & Overview */}
      <div className="responsive-grid">
        
        {/* Video Player Placeholder */}
        <div style={{ background: '#000', borderRadius: '20px', overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1A1C29 0%, #2a2d42 100%)' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(5px)', transition: 'transform 0.2s' }}
                 onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                 onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
              <PlayCircle size={40} color="#fff" />
            </div>
          </div>
          {/* Video Controls Mock */}
          <div style={{ height: '60px', background: '#111', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '15px' }}>
            <div style={{ width: '100%', height: '4px', background: '#333', borderRadius: '2px', position: 'relative' }}>
              <div style={{ width: '35%', height: '100%', background: 'var(--accent-color)', borderRadius: '2px' }}></div>
            </div>
          </div>
        </div>

        {/* Course Info Card */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '15px', lineHeight: '1.2' }}>Advanced React Patterns Masterclass</h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '20px', fontSize: '1.1rem' }}>Learn how to build scalable, high-performance React applications from scratch.</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffc107', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '25px' }}>
            <Star size={22} fill="#ffc107" /> 4.9 <span style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 'normal' }}>(2,451 reviews)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontWeight: '500' }}>
              <Clock size={20} color="var(--accent-color)" /> 12 Hours of Video Content
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontWeight: '500' }}>
              <FileText size={20} color="var(--accent-color)" /> 45 Downloadable Resources
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontWeight: '500' }}>
              <Download size={20} color="var(--accent-color)" /> Full Lifetime Access
            </div>
          </div>

          <button style={{ width: '100%', padding: '16px', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s', marginTop: 'auto' }}
                  onMouseOver={e => e.currentTarget.style.background = '#2a2d42'}
                  onMouseOut={e => e.currentTarget.style.background = 'var(--primary-color)'}>
            Enroll Now - $49.99
          </button>
        </div>
      </div>

      {/* Bottom Section: Tabs & Curriculum */}
      <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: 'var(--shadow)' }}>
        <div style={{ display: 'flex', gap: '40px', borderBottom: '1px solid #eee', marginBottom: '30px' }}>
          {['About', 'Curriculum', 'Instructor', 'Reviews'].map(tab => (
            <div 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{ 
                padding: '10px 0', 
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

        {/* Dynamic Tab Content */}
        {activeTab === 'About' && (
          <div style={{ color: 'var(--text-main)', lineHeight: '1.8' }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Course Description</h3>
            <p style={{ marginBottom: '20px' }}>
              Dive deep into the advanced concepts of React and Next.js. This course is designed for developers who already know the basics and want to level up their architecture, performance, and state management skills.
            </p>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>What you'll learn</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
              {['Build reusable components', 'Master the Context API', 'Implement Custom Hooks', 'Optimize re-renders', 'Server-Side Rendering', 'Deploy to Production'].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle size={20} color="#4caf50" style={{ flexShrink: 0, marginTop: '4px' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Curriculum' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {modules.map(mod => (
              <div key={mod.id} style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
                <div 
                  onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                  style={{ background: '#f9f9f9', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Section {mod.id}</span>
                    <h4 style={{ color: 'var(--primary-color)', fontSize: '1.1rem', margin: '5px 0 0 0' }}>{mod.title}</h4>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{mod.duration}</span>
                    <ChevronDown size={20} style={{ transform: expandedModule === mod.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                  </div>
                </div>
                {expandedModule === mod.id && (
                  <div style={{ padding: '20px', background: '#fff', borderTop: '1px solid #eee' }}>
                    {mod.lessons.map((lesson, i) => (
                      <div key={i} style={{ padding: '12px 0', borderBottom: i === mod.lessons.length -1 ? 'none' : '1px solid #f5f5f5', display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-main)' }}>
                        <PlayCircle size={18} color="var(--text-light)" />
                        <span>{lesson}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Instructor' && (
          <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF9F1C 0%, #ff7b00 100%)', flexShrink: 0 }}></div>
            <div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '5px' }}>Sarah Drasner</h3>
              <p style={{ color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '15px' }}>Senior Frontend Engineer</p>
              <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>
                Sarah is an award-winning developer, speaker, and author. She has worked with companies like Microsoft and Netlify to build exceptional user interfaces.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div style={{ color: 'var(--text-light)', textAlign: 'center', padding: '40px' }}>
            <p>Reviews will be available after 100 students complete the course.</p>
          </div>
        )}
      </div>
    </div>
  );
}
