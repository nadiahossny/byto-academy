'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { PlayCircle, CheckCircle, Clock, FileText, ChevronLeft, Lock } from 'lucide-react';
import { learningPaths } from '@/lib/mockData';

export default function ModuleContent({ params }) {
  const { id, moduleId } = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeLesson, setActiveLesson] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [downloadedFile, setDownloadedFile] = useState('');
  const [questionInput, setQuestionInput] = useState('');
  const [qaList, setQaList] = useState([
    {
      id: 1,
      initials: 'JD',
      author: 'John Doe',
      time: '2 days ago',
      question: 'Can someone explain closures again? I am having a hard time grasping lexical scope.',
      reply: {
        initials: 'SD',
        author: 'Sarah Drasner (Instructor)',
        time: '1 day ago',
        text: 'Think of a closure as a function that carries a backpack of all variables that were in scope when the function was created—even after the outer function returns!',
      },
    },
  ]);

  const pathData = learningPaths.find((p) => String(p.id) === String(id)) || learningPaths[0];
  const currentModule =
    pathData.modules.find((m) => String(m.id) === String(moduleId)) || pathData.modules[0];

  const lessons = [
    { id: 1, title: `Introduction to ${currentModule.title}`, duration: '5:30', status: 'completed', videoId: 'zOjov-2OZ0E' },
    { id: 2, title: 'Core Syntax & Mental Models', duration: '12:45', status: 'completed', videoId: 'QxEbALlWMW0' },
    { id: 3, title: 'Functions, Scope & Architecture', duration: '18:20', status: 'playing', videoId: currentModule.videoId || 'kUMe1FH4CGY' },
    { id: 4, title: 'Interactive Patterns & State', duration: '15:10', status: 'unlocked', videoId: 'yVwASuE6-O0' },
    { id: 5, title: 'Module Capstone Challenge', duration: '22:05', status: 'locked', videoId: 'zOjov-2OZ0E' },
  ];

  const currentLessonObj = lessons.find((l) => l.id === activeLesson) || lessons[2];

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!questionInput.trim()) return;
    setQaList((prev) => [
      {
        id: Date.now(),
        initials: 'AJ',
        author: 'Alex Johnson (You)',
        time: 'Just now',
        question: questionInput.trim(),
        reply: null,
      },
      ...prev,
    ]);
    setQuestionInput('');
  };

  const handleDownload = (fileName) => {
    setDownloadedFile(fileName);
    setTimeout(() => setDownloadedFile(''), 3000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => router.push(`/learn/${id}`)}
          style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', color: 'var(--text-light)', cursor: 'pointer', padding: '5px', fontWeight: 600 }}
        >
          <ChevronLeft size={22} /> Back to {pathData.title}
        </button>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '1.6rem', margin: 0 }}>
          Module {currentModule.id}: {currentModule.title}
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* Main Content Area */}
        <div style={{ flex: '1 1 640px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Video Player (Interactive YouTube Embed) */}
          <div style={{ background: '#000', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', position: 'relative', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${currentLessonObj.videoId}?autoplay=1`}
                title={currentLessonObj.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <button
                  type="button"
                  aria-label={`Play lesson: ${currentLessonObj.title}`}
                  onClick={() => setIsPlaying(true)}
                  style={{ background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', color: '#fff' }}
                >
                  <PlayCircle size={80} color="#fff" style={{ opacity: 0.9, transition: 'transform 0.2s' }} />
                  <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>{currentLessonObj.title}</span>
                </button>

                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.3)', flex: 1, borderRadius: '2px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '45%', background: 'var(--accent-color)', borderRadius: '2px' }} />
                    <div style={{ position: 'absolute', left: '45%', top: '-4px', width: '12px', height: '12px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 5px rgba(0,0,0,0.5)' }} />
                  </div>
                  <span style={{ color: '#fff', fontSize: '0.85rem' }}>08:15 / {currentLessonObj.duration}</span>
                </div>
              </>
            )}
          </div>

          {/* Tabs */}
          <div role="tablist" style={{ display: 'flex', gap: '30px', borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '10px' }}>
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'qa', label: `Q&A (${qaList.length})` },
              { id: 'resources', label: 'Resources' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1rem',
                  color: activeTab === tab.id ? 'var(--accent-color)' : 'var(--text-light)',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                  cursor: 'pointer',
                  position: 'relative',
                  paddingBottom: '10px',
                }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div style={{ position: 'absolute', bottom: '-11px', left: 0, right: 0, height: '3px', background: 'var(--accent-color)', borderRadius: '3px 3px 0 0' }} />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: '10px 0', color: 'var(--text-main)', lineHeight: '1.7' }}>
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ color: 'var(--primary-color)', marginBottom: '12px' }}>
                  Lesson {currentLessonObj.id}: {currentLessonObj.title}
                </h3>
                <p style={{ marginBottom: '15px' }}>
                  {currentModule.desc} In this interactive video session, we break down core patterns step by step so you can apply them immediately in the Practice IDE.
                </p>
                <p>
                  By the end of this lesson, you will be able to write modular, maintainable code and avoid common architecture pitfalls.
                </p>
              </div>
            )}

            {activeTab === 'qa' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <form onSubmit={handleAddQuestion} style={{ display: 'flex', gap: '12px' }}>
                  <input
                    type="text"
                    aria-label="Ask a question about this lesson"
                    placeholder="Ask a question about this lesson..."
                    value={questionInput}
                    onChange={(e) => setQuestionInput(e.target.value)}
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none', fontSize: '0.95rem' }}
                  />
                  <button
                    type="submit"
                    style={{ background: 'var(--primary-color)', color: '#fff', border: 'none', padding: '0 20px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Post
                  </button>
                </form>

                {qaList.map((item) => (
                  <div key={item.id} style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                        {item.initials}
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 5px 0' }}>
                          {item.author} <span style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 'normal' }}>• {item.time}</span>
                        </h4>
                        <p style={{ margin: 0 }}>{item.question}</p>
                      </div>
                    </div>
                    {item.reply && (
                      <div style={{ marginLeft: '55px', marginTop: '15px', padding: '15px', background: '#fff', borderRadius: '8px', borderLeft: '3px solid var(--accent-color)' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--accent-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0 }}>
                            {item.reply.initials}
                          </div>
                          <div>
                            <h5 style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>
                              {item.reply.author} <span style={{ color: 'var(--text-light)', fontSize: '0.8rem', fontWeight: 'normal' }}>• {item.reply.time}</span>
                            </h5>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>{item.reply.text}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'resources' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {downloadedFile && (
                  <div style={{ padding: '10px 16px', background: '#ecfdf5', color: '#065f46', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 500 }}>
                    ✓ Downloading {downloadedFile}...
                  </div>
                )}
                {['Lesson Slides & Architecture Notes (PDF)', 'Starter & Solution Source Code (.zip)'].map((resName) => (
                  <button
                    key={resName}
                    type="button"
                    onClick={() => handleDownload(resName)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', background: '#fff', borderRadius: '12px', border: '1px solid #eee', cursor: 'pointer', transition: 'box-shadow 0.2s', width: '100%', fontFamily: 'inherit', fontSize: '1rem' }}
                    onMouseOver={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <FileText color="var(--primary-color)" />
                      <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{resName}</span>
                    </div>
                    <span style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 'bold' }}>Download</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ flex: '1 1 320px', background: '#fff', borderRadius: '16px', boxShadow: 'var(--shadow)', padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px', alignSelf: 'flex-start' }}>
          <h3 style={{ color: 'var(--primary-color)', fontSize: '1.2rem', margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Course Content
            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 'normal' }}>2/5 Completed</span>
          </h3>

          <div style={{ height: '6px', background: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '40%', background: 'var(--accent-color)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                role="button"
                tabIndex={lesson.status === 'locked' ? -1 : 0}
                onClick={() => {
                  if (lesson.status !== 'locked') {
                    setActiveLesson(lesson.id);
                    setIsPlaying(false);
                  }
                }}
                onKeyDown={(e) => {
                  if (lesson.status !== 'locked' && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    setActiveLesson(lesson.id);
                    setIsPlaying(false);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '12px 15px',
                  borderRadius: '12px',
                  background: activeLesson === lesson.id ? 'rgba(79, 124, 172, 0.12)' : 'transparent',
                  border: activeLesson === lesson.id ? '1px solid rgba(79, 124, 172, 0.35)' : '1px solid transparent',
                  cursor: lesson.status === 'locked' ? 'not-allowed' : 'pointer',
                  opacity: lesson.status === 'locked' ? 0.6 : 1,
                  transition: 'background 0.2s',
                }}
              >
                {lesson.status === 'completed' && <CheckCircle size={20} color="#4caf50" />}
                {(lesson.status === 'playing' || lesson.status === 'unlocked') && <PlayCircle size={20} color="var(--accent-color)" />}
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
