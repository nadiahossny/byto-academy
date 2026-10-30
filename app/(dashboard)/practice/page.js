'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Play, CheckCircle } from 'lucide-react';
import { practiceProblems } from '@/lib/mockData';
import { useUser } from '../UserContext';

export default function PracticeCatalog() {
  const router = useRouter();
  const { solvedProblems } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const cycleDifficulty = () => {
    const nextIdx = (difficulties.indexOf(difficultyFilter) + 1) % difficulties.length;
    setDifficultyFilter(difficulties[nextIdx]);
  };

  const filteredProblems = practiceProblems.filter((prob) => {
    const matchesDiff = difficultyFilter === 'All' || prob.difficulty === difficultyFilter;
    const matchesSearch =
      prob.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  const getDifficultyColor = (diff) => {
    if (diff === 'Easy') return '#4caf50';
    if (diff === 'Medium') return '#ff9800';
    return '#f44336';
  };

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '32px',
        boxShadow: 'var(--shadow)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <h2
            style={{
              color: 'var(--primary-color)',
              fontSize: '2.25rem',
              marginBottom: '8px',
            }}
          >
            Practice Problems
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '1.05rem' }}>
            Sharpen your coding skills with interactive algorithmic challenges ({solvedProblems.length}/{practiceProblems.length} solved).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search
              size={18}
              color="#aaa"
              style={{ position: 'absolute', left: '15px', top: '12px', pointerEvents: 'none' }}
            />
            <input
              type="search"
              aria-label="Search coding problems"
              placeholder="Search problems or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '10px 15px 10px 40px',
                borderRadius: '30px',
                border: '1px solid #ddd',
                outline: 'none',
                fontSize: '0.95rem',
              }}
            />
          </div>
          <button
            type="button"
            onClick={cycleDifficulty}
            style={{
              background: difficultyFilter === 'All' ? '#f4f5f7' : 'var(--primary-color)',
              color: difficultyFilter === 'All' ? 'var(--primary-color)' : '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '30px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <Filter size={18} /> Difficulty: {difficultyFilter}
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: '2px solid #f0f0f0',
                color: 'var(--text-light)',
              }}
            >
              <th style={{ padding: '15px', fontWeight: 'bold' }}>Status</th>
              <th style={{ padding: '15px', fontWeight: 'bold' }}>Title</th>
              <th style={{ padding: '15px', fontWeight: 'bold' }}>Acceptance</th>
              <th style={{ padding: '15px', fontWeight: 'bold' }}>Difficulty</th>
              <th style={{ padding: '15px', fontWeight: 'bold' }}>Category</th>
              <th style={{ padding: '15px', fontWeight: 'bold', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((prob) => {
              const isSolved = solvedProblems.includes(prob.id);
              return (
                <tr
                  key={prob.id}
                  onClick={() => router.push('/practice/' + prob.id)}
                  style={{
                    borderBottom: '1px solid #f9f9f9',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#fafbfe';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <td style={{ padding: '15px' }}>
                    {isSolved ? (
                      <CheckCircle size={20} color="#4caf50" aria-label="Solved" />
                    ) : (
                      <div
                        aria-label="Unsolved"
                        style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid #ddd',
                          borderRadius: '50%',
                        }}
                      />
                    )}
                  </td>
                  <td
                    style={{
                      padding: '15px',
                      color: 'var(--primary-color)',
                      fontWeight: 'bold',
                      fontSize: '1.05rem',
                    }}
                  >
                    {prob.id}. {prob.title}
                  </td>
                  <td style={{ padding: '15px', color: 'var(--text-main)' }}>{prob.acceptance}</td>
                  <td
                    style={{
                      padding: '15px',
                      color: getDifficultyColor(prob.difficulty),
                      fontWeight: 'bold',
                    }}
                  >
                    {prob.difficulty}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span
                      style={{
                        background: '#f4f5f7',
                        padding: '5px 10px',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        color: 'var(--text-light)',
                        fontWeight: 'bold',
                      }}
                    >
                      {prob.category}
                    </span>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push('/practice/' + prob.id);
                      }}
                      style={{
                        background: 'transparent',
                        color: 'var(--accent-color)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontWeight: 'bold',
                      }}
                    >
                      Solve <Play size={16} fill="var(--accent-color)" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
