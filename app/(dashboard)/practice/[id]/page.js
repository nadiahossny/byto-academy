'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Files, Search, Settings, ChevronDown, ChevronLeft, FileJson, CheckCircle2, XCircle, Send } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import { practiceProblems } from '@/lib/mockData';
import { useUser } from '../../UserContext';

export default function PracticeIDE({ params }) {
  const { id } = use(params);
  const problem = practiceProblems.find((p) => String(p.id) === String(id)) || practiceProblems[0];
  return <PracticeWorkspace key={problem.id} problem={problem} />;
}

function PracticeWorkspace({ problem }) {
  const router = useRouter();
  const { markProblemSolved, solvedProblems } = useUser();
  const isSolved = solvedProblems.includes(problem.id);

  const [code, setCode] = useState(problem.starterCode);
  const [runResult, setRunResult] = useState(null);
  const [activeTab, setActiveTab] = useState('Console');

  const executeTests = (isSubmission = false) => {
    setActiveTab(isSubmission ? 'Submission' : 'Console');
    try {
      const results = problem.testCases.map((tc) => {
        const fn = new Function(
          `${code}\nreturn ${problem.functionName}(...${JSON.stringify(tc.args)});`
        );
        const actual = fn();
        const passed = JSON.stringify(actual) === JSON.stringify(tc.expected);
        return {
          label: tc.label,
          expected: JSON.stringify(tc.expected),
          actual: JSON.stringify(actual),
          passed,
        };
      });

      const allPassed = results.every((r) => r.passed);
      if (allPassed) {
        markProblemSolved(problem.id);
      }

      setRunResult({
        status: allPassed ? 'passed' : 'failed',
        isSubmission,
        cases: results,
      });
    } catch (error) {
      setRunResult({
        status: 'error',
        message: error.message,
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <button
          type="button"
          onClick={() => router.push('/practice')}
          style={{ background: 'transparent', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-light)', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}
        >
          <ChevronLeft size={20} /> Back to Problem Set
        </button>
        {isSolved && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', color: '#065f46', padding: '4px 12px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700 }}>
            <CheckCircle2 size={16} /> Solved
          </span>
        )}
      </div>

      <div className="practice-grid">
        {/* Problem Description Panel */}
        <div style={{ flex: '0.85', background: '#fff', borderRadius: '20px', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '22px', background: '#F4F9FE' }}>
            <h2 style={{ color: 'var(--primary-color)', margin: 0 }}>
              {problem.id}. {problem.title}
            </h2>
            <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {problem.tags.map((tag, idx) => (
                <span
                  key={tag}
                  style={{
                    background: idx === 0 ? '#e0f7fa' : idx === 1 ? '#f3e5f5' : '#fff3e0',
                    color: idx === 0 ? '#006064' : idx === 1 ? '#6a1b9a' : '#e65100',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ padding: '20px', overflowY: 'auto', flex: 1, color: 'var(--text-main)', lineHeight: '1.6' }}>
            <p>{problem.description}</p>
            <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary-color)' }}>Example 1:</h4>
            <div style={{ background: 'var(--bg-color)', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.9rem', borderLeft: '4px solid var(--accent-color)' }}>
              Input: {problem.example.input}
              <br />
              Output: {problem.example.output}
              <br />
              Explanation: {problem.example.explanation}
            </div>
            <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary-color)' }}>Constraints:</h4>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-light)', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              {problem.constraints.map((c, idx) => (
                <li key={idx}>
                  <code>{c}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Code Editor & Console Panel */}
        <div style={{ flex: '1.75', background: 'var(--primary-color)', borderRadius: '12px', boxShadow: 'var(--shadow)', display: 'flex', overflow: 'hidden', minHeight: '500px' }}>
          <div style={{ width: '48px', background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px 0', gap: '20px', color: 'rgba(255,255,255,0.5)' }}>
            <Files size={22} color="#fff" />
            <Search size={22} />
            <div style={{ marginTop: 'auto' }}>
              <Settings size={22} />
            </div>
          </div>

          <div style={{ width: '180px', background: 'rgba(0,0,0,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '10px 15px', color: '#ccc', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Problems
            </div>
            <div style={{ padding: '6px 15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', background: '#37373d' }}>
              <ChevronDown size={14} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>SOLUTIONS</span>
            </div>
            {practiceProblems.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => router.push(`/practice/${p.id}`)}
                style={{
                  padding: '6px 12px 6px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: p.id === problem.id ? 'rgba(79, 124, 172, 0.22)' : 'transparent',
                  color: p.id === problem.id ? '#B8C9E1' : '#cbd5e1',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <FileJson size={13} style={{ flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.functionName}.js
                </span>
              </button>
            ))}
          </div>

          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div style={{ background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '15px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ background: 'transparent', color: 'var(--accent-color)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', borderTop: '2px solid var(--accent-color)' }}>
                <FileJson size={14} />
                <span style={{ fontSize: '0.9rem' }}>{problem.functionName}.js</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => executeTests(false)}
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Play size={14} fill="#fff" /> Run
                </button>
                <button
                  type="button"
                  onClick={() => executeTests(true)}
                  style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Send size={14} /> Submit
                </button>
              </div>
            </div>

            <div style={{ flex: '1', position: 'relative', background: 'transparent', overflowY: 'auto' }}>
              <Editor
                value={code}
                onValueChange={(newCode) => setCode(newCode)}
                highlight={(input) => Prism.highlight(input, Prism.languages.javascript, 'javascript')}
                padding={20}
                style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 14, minHeight: '100%', outline: 'none', color: '#f8fafc' }}
                className="custom-editor"
              />
            </div>

            <div style={{ height: '220px', background: 'rgba(0,0,0,0.15)', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
              <div role="tablist" style={{ display: 'flex', alignItems: 'center', gap: '2px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {['Console', 'Test Cases', 'Submission'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: activeTab === tab ? '#fff' : '#858585',
                      fontSize: '0.82rem',
                      padding: '10px 20px',
                      cursor: 'pointer',
                      borderBottom: activeTab === tab ? '2px solid var(--accent-color)' : '2px solid transparent',
                      textTransform: 'uppercase',
                      fontWeight: activeTab === tab ? 700 : 500,
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div style={{ flex: '1', padding: '15px 20px', fontFamily: 'monospace', fontSize: '0.88rem', overflowY: 'auto' }}>
                {(activeTab === 'Console' || activeTab === 'Submission') && (
                  <div>
                    {!runResult ? (
                      <span style={{ color: '#858585' }}>Click &quot;Run&quot; or &quot;Submit&quot; to execute your solution against the test suite...</span>
                    ) : runResult.status === 'error' ? (
                      <div style={{ color: '#f44336' }}>Runtime Error: {runResult.message}</div>
                    ) : (
                      <div>
                        <div style={{ color: runResult.status === 'passed' ? '#4caf50' : '#f44336', fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {runResult.status === 'passed' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                          {runResult.status === 'passed'
                            ? `All ${runResult.cases.length} Test Cases Passed!`
                            : 'Some Test Cases Failed'}
                        </div>
                        {runResult.cases.map((c, idx) => (
                          <div key={idx} style={{ marginBottom: '8px', padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                            <div style={{ color: c.passed ? '#4caf50' : '#f44336', fontWeight: 600 }}>
                              Case {idx + 1}: {c.passed ? '✓ Passed' : '✗ Failed'} ({c.label})
                            </div>
                            <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>
                              Expected: {c.expected} | Output: <strong style={{ color: '#fff' }}>{c.actual}</strong>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'Test Cases' && (
                  <div style={{ color: '#ccc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {problem.testCases.map((tc, idx) => (
                      <div key={idx} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                        <strong>Test Case {idx + 1}:</strong> Input: <code>{tc.label}</code> → Expected: <code>{JSON.stringify(tc.expected)}</code>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
          .custom-editor textarea { outline: none !important; }
        `,
          }}
        />
      </div>
    </div>
  );
}
