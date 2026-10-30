'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import Image from 'next/image';
import { PlayCircle, Clock, Users, Star, Layers } from 'lucide-react';
import { coursesCatalog } from '@/lib/mockData';

function CoursesCatalogInner({ initialQuery }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const filteredCourses = coursesCatalog.filter((course) => {
    const matchesCategory = activeCategory === 'All' || course.level === activeCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div>
      <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem' }}>Course Catalog</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '360px' }}>
            <input
              type="search"
              aria-label="Filter courses by name"
              placeholder="Filter by course name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '12px 20px 12px 40px',
                borderRadius: '30px',
                border: '1px solid #e0e0e0',
                outline: 'none',
                width: '100%',
                boxShadow: 'var(--shadow)',
                fontSize: '0.95rem',
                background: '#fff',
              }}
            />
            <SearchIconWrapper />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }} role="group" aria-label="Filter by difficulty level">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '25px',
                  border: activeCategory === category ? 'none' : '1px solid #e0e0e0',
                  background: activeCategory === category ? 'var(--primary-color)' : '#fff',
                  color: activeCategory === category ? '#fff' : 'var(--text-main)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: activeCategory === category ? '0 4px 15px rgba(26,28,41,0.2)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-light)', background: '#fff', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
          <Layers size={48} style={{ opacity: 0.2, margin: '0 auto 15px' }} />
          <p style={{ fontSize: '1.2rem' }}>No courses found matching your criteria.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '30px' }}>
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              role="button"
              tabIndex={0}
              onClick={() => router.push(`/courses/${course.id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push(`/courses/${course.id}`);
                }
              }}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '8px',
                boxShadow: 'var(--shadow)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
            >
              {/* Card Header Graphic */}
              <div style={{ width: '100%', height: '160px', background: course.image ? '#f4f5f7' : course.color, borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                {course.image ? (
                  <Image src={course.image} alt={course.title} width={120} height={120} style={{ objectFit: 'contain', zIndex: 1 }} />
                ) : (
                  <PlayCircle size={64} color="#fff" style={{ opacity: 0.8, zIndex: 1 }} />
                )}
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: course.image ? 'var(--primary-color)' : 'rgba(255,255,255,0.2)', backdropFilter: course.image ? 'none' : 'blur(10px)', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 2 }}>
                  {course.level}
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: '0 12px 12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ color: 'var(--primary-color)', fontSize: '1.25rem', marginBottom: '12px', lineHeight: '1.4' }}>
                  {course.title}
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '20px', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={16} /> {course.duration}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={16} /> {course.students}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffc107', fontWeight: 'bold' }}>
                    <Star size={18} fill="#ffc107" /> {course.rating}
                  </div>
                  <span
                    style={{
                      background: '#f4f5f7',
                      color: 'var(--primary-color)',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                    }}
                  >
                    View Course
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchIconWrapper() {
  return (
    <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', pointerEvents: 'none' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </div>
  );
}

function CoursesContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  return <CoursesCatalogInner key={queryParam} initialQuery={queryParam} />;
}

export default function Courses() {
  return (
    <Suspense fallback={<div>Loading courses...</div>}>
      <CoursesContent />
    </Suspense>
  );
}
