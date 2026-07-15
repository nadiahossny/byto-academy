'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { PlayCircle, CheckCircle, Clock, FileText, ChevronLeft, Lock } from 'lucide-react';

export default function ModuleContent({ params }) {
  const { id, moduleId } = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeLesson, setActiveLesson] = useState(3);
  
  const lessons = [
    { id: 1, title: 'Introduction to JavaScript', duration: '5:30', status: 'completed' },
    { id: 2, title: 'Variables and Data Types', duration: '12:45', status: 'completed' },
    { id: 3, title: 'Functions and Scope', duration: '18:20', status: 'playing' },
    { id: 4, title: 'Arrays and Objects', duration: '15:10', status: 'locked' },
    { id: 5, title: 'DOM Manipulation Basics', duration: '22:05', status: 'locked' },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
        <button 
          onClick={() => router.push(`/learn/${id}`)}
          style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', color: 'var(--text-light)', cursor: 'pointer', padding: '5px' }}
        >
          <ChevronLeft size={24} /> Back to Path
        </button>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '1.8rem', margin: 0 }}>Module {moduleId}: JavaScript Essentials</h2>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Main Content Area */}
        <div style={{ flex: '1 1 700px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Video Player Placeholder */}
          <div style={{ background: '#000', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', position: 'relative', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PlayCircle size={80} color="#fff" style={{ opacity: 0.8, cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
            
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
               <div style={{ height: '4px', background: 'rgba(255,255,255,0.3)', flex: 1, borderRadius: '2px', position: 'relative' }}>
                 <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '45%', background: 'var(--accent-color)', borderRadius: '2px' }}></div>
                 <div style={{ position: 'absolute', left: '45%', top: '-4px', width: '12px', height: '12px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 5px rgba(0,0,0,0.5)' }}></div>
               </div>
               <span style={{ color: '#fff', fontSize: '0.85rem' }}>08:15 / 18:20</span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '30px', borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '10px' }}>
            <div 
              onClick={() => setActiveTab('overview')}
              style={{ color: activeTab === 'overview' ? 'var(--accent-color)' : 'var(--text-light)', fontWeight: activeTab === 'overview' ? 'bold' : 'normal', cursor: 'pointer', position: 'relative', paddingBottom: '10px' }}
            >
              Overview
              {activeTab === 'overview' && <div style={{ position: 'absolute', bottom: '-11px', left: 0, right: 0, height: '3px', background: 'var(--accent-color)', borderRadius: '3px 3px 0 0' }}></div>}
            </div>
            <div 
              onClick={() => setActiveTab('qa')}
              style={{ color: activeTab === 'qa' ? 'var(--accent-color)' : 'var(--text-light)', fontWeight: activeTab === 'qa' ? 'bold' : 'normal', cursor: 'pointer', position: 'relative', paddingBottom: '10px' }}
            >
              Q&A
              {activeTab === 'qa' && <div style={{ position: 'absolute', bottom: '-11px', left: 0, right: 0, height: '3px', background: 'var(--accent-color)', borderRadius: '3px 3px 0 0' }}></div>}
            </div>
            <div 
              onClick={() => setActiveTab('resources')}
              style={{ color: activeTab === 'resources' ? 'var(--accent-color)' : 'var(--text-light)', fontWeight: activeTab === 'resources' ? 'bold' : 'normal', cursor: 'pointer', position: 'relative', paddingBottom: '10px' }}
            >
              Resources
              {activeTab === 'resources' && <div style={{ position: 'absolute', bottom: '-11px', left: 0, right: 0, height: '3px', background: 'var(--accent-color)', borderRadius: '3px 3px 0 0' }}></div>}
            </div>
          </div>

          {/* Tab Content */}
          <div style={{ padding: '10px 0', color: 'var(--text-main)', lineHeight: '1.7' }}>
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>About this lesson</h3>
                <p style={{ marginBottom: '15px' }}>In this lesson, we will dive deep into functions and scope in JavaScript. You will learn how to declare functions, understand the difference between function declarations and expressions, and master the concept of lexical scope and closures.</p>
                <p>By the end of this lesson, you will be able to write modular, reusable code and avoid common pitfalls related to variable scoping.</p>
              </div>
            )}
            {activeTab === 'qa' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>JD</div>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0' }}>John Doe <span style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 'normal' }}>• 2 days ago</span></h4>
                      <p style={{ margin: 0 }}>Can someone explain closures again? I am having a hard time grasping the concept.</p>
                    </div>
                  </div>
                  <div style={{ marginLeft: '55px', marginTop: '15px', padding: '15px', background: '#fff', borderRadius: '8px', borderLeft: '3px solid var(--accent-color)' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--accent-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>IA</div>
                      <div>
                        <h5 style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>Instructor Alice <span style={{ color: 'var(--text-light)', fontSize: '0.8rem', fontWeight: 'normal' }}>• 1 day ago</span></h5>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>Think of a closure as a function that remembers its outer variables and can access them even after the outer function has finished executing.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'resources' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', background: '#fff', borderRadius: '12px', border: '1px solid #eee', cursor: 'pointer', transition: 'box-shadow 0.2s' }} onMouseOver={e => e.currentTarget.style.boxShadow = 'var(--shadow)'} onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                     <FileText color="var(--primary-color)" />
                     <span style={{ fontWeight: '500' }}>Lesson Slides (PDF)</span>
                   </div>
                   <span style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 'bold' }}>Download</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', background: '#fff', borderRadius: '12px', border: '1px solid #eee', cursor: 'pointer', transition: 'box-shadow 0.2s' }} onMouseOver={e => e.currentTarget.style.boxShadow = 'var(--shadow)'} onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                     <FileText color="var(--primary-color)" />
                     <span style={{ fontWeight: '500' }}>Source Code (.zip)</span>
                   </div>
                   <span style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 'bold' }}>Download</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ flex: '1 1 350px', background: '#fff', borderRadius: '16px', boxShadow: 'var(--shadow)', padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px', alignSelf: 'flex-start' }}>
          <h3 style={{ color: 'var(--primary-color)', fontSize: '1.2rem', margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Course Content
            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 'normal' }}>2/5 Completed</span>
          </h3>
          
          <div style={{ height: '6px', background: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '40%', background: 'var(--accent-color)' }}></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {lessons.map(lesson => (
              <div 
                key={lesson.id}
                onClick={() => lesson.status !== 'locked' && setActiveLesson(lesson.id)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '15px', 
                  padding: '12px 15px', 
                  borderRadius: '12px', 
                  background: activeLesson === lesson.id ? 'rgba(255, 159, 28, 0.1)' : 'transparent',
                  border: activeLesson === lesson.id ? '1px solid rgba(255, 159, 28, 0.3)' : '1px solid transparent',
                  cursor: lesson.status === 'locked' ? 'not-allowed' : 'pointer',
                  opacity: lesson.status === 'locked' ? 0.6 : 1,
                  transition: 'background 0.2s'
                }}
                onMouseOver={e => { if (lesson.status !== 'locked' && activeLesson !== lesson.id) e.currentTarget.style.background = '#f9f9f9'; }}
                onMouseOut={e => { if (lesson.status !== 'locked' && activeLesson !== lesson.id) e.currentTarget.style.background = 'transparent'; }}
              >
                {lesson.status === 'completed' && <CheckCircle size={20} color="#4caf50" />}
                {lesson.status === 'playing' && <PlayCircle size={20} color="var(--accent-color)" />}
                {lesson.status === 'locked' && <Lock size={20} color="#aaa" />}
                
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: activeLesson === lesson.id ? 'bold' : '500', color: activeLesson === lesson.id ? 'var(--accent-color)' : 'var(--primary-color)' }}>
                    {lesson.title}
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={12} /> {lesson.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>

      </div>
    </div>
  );
}
