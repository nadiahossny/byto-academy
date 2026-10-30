'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, RotateCcw } from 'lucide-react';

const TOPICS = [
  {
    id: 'about-prog',
    title: 'About Programming',
    subtitle: 'Foundations of computational thinking & logic',
    image: '/mascot-thinking.png',
    videoId: 'zOjov-2OZ0E',
  },
  {
    id: 'pop-lang',
    title: 'Popular Languages',
    subtitle: 'Comparing JavaScript, Python, Rust, and Go',
    image: '/mascot-scholar.png',
    videoId: 'QxEbALlWMW0',
  },
  {
    id: 'start-journey',
    title: 'Start Your Coding Journey',
    subtitle: 'How to build projects without tutorial hell',
    image: '/mascot-welcome.png',
    videoId: 'kUMe1FH4CGY',
  },
  {
    id: 'tech-careers',
    title: 'Careers in Technology',
    subtitle: 'Frontend, Backend, DevOps & AI career paths',
    image: '/mascot-scholar.png',
    videoId: 'yVwASuE6-O0',
  },
];

export default function ExploreTopics() {
  const [flippedIds, setFlippedIds] = useState({});

  const toggleFlip = (id) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section aria-labelledby="explore-topics-heading">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 id="explore-topics-heading" style={{ color: 'var(--primary-color)', fontSize: '1.4rem', marginBottom: '4px' }}>
            Explore Interactive Video Topics
          </h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', margin: 0 }}>
            Click any topic card to flip and watch an embedded micro-lecture directly on your dashboard.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
          gap: '24px',
        }}
      >
        {TOPICS.map((topic) => {
          const isFlipped = !!flippedIds[topic.id];
          return (
            <div
              key={topic.id}
              style={{
                perspective: '1000px',
                height: '240px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  borderRadius: '20px',
                  boxShadow: 'var(--shadow)',
                }}
              >
                {/* Front Face */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Flip ${topic.title} card to watch video`}
                  onClick={() => toggleFlip(topic.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlip(topic.id);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                    <Image
                      src={topic.image}
                      alt={topic.title}
                      width={85}
                      height={85}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <h4 style={{ color: 'var(--primary-color)', fontSize: '1.05rem', marginBottom: '6px' }}>
                    {topic.title}
                  </h4>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.82rem', marginBottom: '12px', lineHeight: 1.4 }}>
                    {topic.subtitle}
                  </p>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--accent-color)',
                      background: 'rgba(79, 124, 172, 0.14)',
                      padding: '5px 12px',
                      borderRadius: '999px',
                    }}
                  >
                    <Play size={12} fill="var(--accent-color)" /> Watch Video
                  </span>
                </div>

                {/* Back Face with Embedded YouTube Player */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: '#0f172a',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 14px',
                      background: '#1A1C29',
                      color: '#fff',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {topic.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleFlip(topic.id)}
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '3px 8px',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <RotateCcw size={12} /> Flip Back
                    </button>
                  </div>
                  {isFlipped && (
                    <iframe
                      src={`https://www.youtube.com/embed/${topic.videoId}`}
                      title={topic.title}
                      style={{ width: '100%', flex: 1, border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
