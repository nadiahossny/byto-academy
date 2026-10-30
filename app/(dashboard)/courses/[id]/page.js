'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { PlayCircle, Clock, Star, CheckCircle, FileText, Download, ChevronDown, ChevronLeft } from 'lucide-react';
import { coursesCatalog } from '@/lib/mockData';
import { useUser } from '../../UserContext';

export default function CourseDetail({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { enrolledCourses, enrollInCourse } = useUser();

  const course = coursesCatalog.find((c) => String(c.id) === String(id)) || coursesCatalog[0];
  const isEnrolled = enrolledCourses.includes(course.id);

  const [activeTab, setActiveTab] = useState('About');
  const [expandedModule, setExpandedModule] = useState(1);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const handleEnroll = () => {
    if (isEnrolled) {
      router.push('/learn/1');
    } else {
      enrollInCourse(course.id);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <button
          type="button"
          onClick={() => router.push('/courses')}
          style={{ background: 'transparent', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-light)', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}
        >
          <ChevronLeft size={20} /> Back to Course Catalog
        </button>
      </div>

      {/* Top Section: Video Player & Overview */}
      <div className="responsive-grid">
        {/* Video Player (Interactive YouTube Embed) */}
        <div style={{ background: '#EAF4FF', borderRadius: '24px', overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', minHeight: '380px' }}>
          {isPlayingVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${course.videoId}?autoplay=1`}
              title={course.title}
              style={{ width: '100%', flex: 1, minHeight: '380px', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <div style={{ flex: 1, minHeight: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #EAF4FF 0%, #D0E8FF 100%)', gap: '16px', padding: '20px', textAlign: 'center' }}>
                <button
                  type="button"
                  aria-label={`Play preview video for ${course.title}`}
                  onClick={() => setIsPlayingVideo(true)}
                  style={{ width: '80px', height: '80px', background: '#1D8FE1', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 24px -4px rgba(29, 143, 225, 0.45)', transition: 'transform 0.2s' }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <PlayCircle size={42} color="#fff" />
                </button>
                <span style={{ color: 'var(--primary-color)', fontSize: '0.95rem', fontWeight: 600 }}>
                  Click to play course preview lecture
                </span>
              </div>
              <div style={{ height: '48px', background: '#FFFFFF', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '15px' }}>
                <div style={{ width: '100%', height: '6px', background: '#E2EEF9', borderRadius: '999px', position: 'relative' }}>
                  <div style={{ width: '35%', height: '100%', background: 'var(--accent-color)', borderRadius: '999px' }} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Course Info Card */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column' }}>
          <span style={{ display: 'inline-block', alignSelf: 'flex-start', background: 'rgba(79, 124, 172, 0.14)', color: 'var(--accent-color)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>
            {course.level}
          </span>
          <h1 style={{ color: 'var(--primary-color)', fontSize: '1.85rem', marginBottom: '12px', lineHeight: '1.25' }}>
            {course.title}
          </h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '20px', fontSize: '1rem', lineHeight: 1.5 }}>
            {course.subtitle}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffc107', fontWeight: 'bold', fontSize: '1.15rem', marginBottom: '20px' }}>
            <Star size={20} fill="#ffc107" /> {course.rating}{' '}
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 'normal' }}>
              ({course.reviewsCount} reviews)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '25px', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '18px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontWeight: '500' }}>
              <Clock size={20} color="var(--accent-color)" /> {course.hours}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontWeight: '500' }}>
              <FileText size={20} color="var(--accent-color)" /> {course.resourcesCount}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontWeight: '500' }}>
              <Download size={20} color="var(--accent-color)" /> Full Lifetime Access &amp; Certificate
            </div>
          </div>

          <button
            type="button"
            onClick={handleEnroll}
            style={{
              width: '100%',
              padding: '16px',
              background: isEnrolled ? '#10b981' : 'var(--primary-color)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.05rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.2s',
              marginTop: 'auto',
            }}
          >
            {isEnrolled ? '✓ Enrolled — Go to Learning Path' : `Enroll Now - ${course.price}`}
          </button>
        </div>
      </div>

      {/* Bottom Section: Tabs & Curriculum */}
      <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: 'var(--shadow)' }}>
        <div role="tablist" style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #eee', marginBottom: '30px', flexWrap: 'wrap' }}>
          {['About', 'Curriculum', 'Instructor', 'Reviews'].map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '10px 0',
                fontSize: '1rem',
                color: activeTab === tab ? 'var(--accent-color)' : 'var(--text-light)',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                borderBottom: activeTab === tab ? '3px solid var(--accent-color)' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'About' && (
          <div style={{ color: 'var(--text-main)', lineHeight: '1.8' }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Course Description</h3>
            <p style={{ marginBottom: '25px' }}>{course.description}</p>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>What you&apos;ll learn</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
              {course.outcomes.map((item, idx) => (
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
            {course.curriculum.map((mod) => (
              <div key={mod.id} style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setExpandedModule(expandedModule === mod.id ? null : mod.id);
                    }
                  }}
                  style={{ background: '#f9f9f9', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      Section {mod.id}
                    </span>
                    <h4 style={{ color: 'var(--primary-color)', fontSize: '1.1rem', margin: '5px 0 0 0' }}>{mod.title}</h4>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{mod.duration}</span>
                    <ChevronDown
                      size={20}
                      style={{ transform: expandedModule === mod.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                    />
                  </div>
                </div>
                {expandedModule === mod.id && (
                  <div style={{ padding: '20px', background: '#fff', borderTop: '1px solid #eee' }}>
                    {mod.lessons.map((lesson, i) => (
                      <div
                        key={i}
                        onClick={() => setIsPlayingVideo(true)}
                        style={{
                          padding: '12px 0',
                          borderBottom: i === mod.lessons.length - 1 ? 'none' : '1px solid #f5f5f5',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '15px',
                          color: 'var(--text-main)',
                          cursor: 'pointer',
                        }}
                      >
                        <PlayCircle size={18} color="var(--accent-color)" />
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
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, #4F7CAC 0%, #1E242B 100%)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.75rem', fontWeight: 700 }}>
              {course.instructor.name.trim()[0]}
            </div>
            <div style={{ flex: '1 1 260px' }}>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '5px' }}>{course.instructor.name}</h3>
              <p style={{ color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '15px' }}>{course.instructor.role}</p>
              <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>{course.instructor.bio}</p>
            </div>
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {course.reviews.map((rev) => (
              <div key={rev.id} style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ color: 'var(--primary-color)' }}>{rev.author}</strong>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{rev.date}</span>
                </div>
                <div style={{ display: 'flex', gap: '4px', color: '#ffc107', marginBottom: '10px' }}>
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} size={16} fill="#ffc107" />
                  ))}
                </div>
                <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: 1.5 }}>{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
