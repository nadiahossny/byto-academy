'use client';

import { useState } from 'react';
import { Play, Terminal, Files, Search, Settings, ChevronDown, FileJson, CheckCircle2, XCircle } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

export default function PracticeIDE({ params }) {
  const [code, setCode] = useState(`function twoSum(nums, target) {\n  // Write your code here\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) return [i, j];\n    }\n  }\n  return [];\n}`);
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('Console');

  const runCode = () => {
    setActiveTab('Console');
    try {
      const execute = new Function(`
        ${code}
        return twoSum([2, 7, 11, 15], 9);
      `);
      const result = execute();
      const passed = JSON.stringify(result) === JSON.stringify([0,1]);
      
      setOutput(
        <div style={{ color: passed ? '#4caf50' : '#f44336' }}>
          {passed ? <CheckCircle2 size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> : <XCircle size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} />}
          Test {passed ? 'Passed!' : 'Failed!'}
          <br /><br />
          <span style={{ color: '#ccc' }}>Input: nums = [2, 7, 11, 15], target = 9</span><br />
          <span style={{ color: '#ccc' }}>Expected: [0, 1]</span><br />
          <span style={{ color: '#fff', fontWeight: 'bold' }}>Output: {JSON.stringify(result)}</span>
        </div>
      );
    } catch (error) {
      setOutput(<div style={{ color: '#f44336' }}>Error: {error.message}</div>);
    }
  };

  return (
    <div className="practice-grid">
      <div style={{ flex: '0.8', background: '#fff', borderRadius: '12px', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #eee', background: '#fafafa' }}>
          <h2 style={{ color: 'var(--primary-color)', margin: 0 }}>Two Sum</h2>
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <span style={{ background: '#e0f7fa', color: '#006064', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>Easy</span>
            <span style={{ background: '#f3e5f5', color: '#6a1b9a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>Array</span>
            <span style={{ background: '#fff3e0', color: '#e65100', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>Hash Table</span>
          </div>
        </div>
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1, color: 'var(--text-main)', lineHeight: '1.6' }}>
          <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
          <p style={{ marginTop: '15px' }}>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
          <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary-color)' }}>Example 1:</h4>
          <div style={{ background: 'var(--bg-color)', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.9rem', borderLeft: '4px solid var(--accent-color)' }}>
            Input: nums = [2,7,11,15], target = 9<br/>Output: [0,1]<br/>Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
          </div>
          <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary-color)' }}>Constraints:</h4>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-light)', fontFamily: 'monospace', fontSize: '0.9rem' }}>
            <li><code>2 &lt;= nums.length &lt;= 10^4</code></li>
            <li><code>-10^9 &lt;= nums[i] &lt;= 10^9</code></li>
            <li><code>-10^9 &lt;= target &lt;= 10^9</code></li>
          </ul>
        </div>
      </div>
      
      <div style={{ flex: '1.8', background: 'var(--primary-color)', borderRadius: '12px', boxShadow: 'var(--shadow)', display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: '50px', background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px 0', gap: '20px', color: 'rgba(255,255,255,0.5)' }}>
          <Files size={24} color="#fff" style={{ cursor: 'pointer' }} />
          <Search size={24} style={{ cursor: 'pointer' }} />
          <div style={{ marginTop: 'auto' }}><Settings size={24} style={{ cursor: 'pointer' }} /></div>
        </div>

        <div style={{ width: '200px', background: 'rgba(0,0,0,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px 15px', color: '#ccc', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Explorer</div>
          <div style={{ padding: '5px 15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', background: '#37373d', cursor: 'pointer' }}><ChevronDown size={14} /><span style={{ fontSize: '0.9rem' }}>PRACTICE</span></div>
          <div style={{ padding: '5px 15px 5px 35px', display: 'flex', alignItems: 'center', gap: '8px', color: '#e2c08d', fontSize: '0.9rem', cursor: 'pointer' }}><FileJson size={14} /><span>main.js</span></div>
        </div>

        <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '15px' }}>
            <div style={{ background: 'transparent', color: 'var(--accent-color)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', borderTop: '2px solid var(--accent-color)' }}><FileJson size={14} /><span style={{ fontSize: '0.9rem' }}>main.js</span></div>
            <button onClick={runCode} style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}><Play size={14} fill="#fff" /> Run</button>
          </div>

          <div style={{ flex: '1', position: 'relative', background: 'transparent', overflowY: 'auto' }}>
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
              padding={20}
              style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 14, minHeight: '100%', outline: 'none' }}
              className="custom-editor"
            />
          </div>

          <div style={{ height: '220px', background: 'rgba(0,0,0,0.15)', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              {['Console', 'Test Cases', 'Submission'].map(tab => (
                <div key={tab} onClick={() => setActiveTab(tab)} style={{ color: activeTab === tab ? '#fff' : '#858585', fontSize: '0.85rem', padding: '10px 20px', cursor: 'pointer', borderBottom: activeTab === tab ? '1px solid var(--accent-color)' : '1px solid transparent', textTransform: 'uppercase' }}>{tab}</div>
              ))}
            </div>
            <div style={{ flex: '1', padding: '15px 20px', fontFamily: 'monospace', fontSize: '0.9rem', overflowY: 'auto' }}>
              {activeTab === 'Console' && <div>{output || <span style={{ color: '#858585' }}>Run your code to see output...</span>}</div>}
              {activeTab === 'Test Cases' && <div style={{ color: '#ccc' }}><strong>Test Case 1:</strong><br/>Input: <code>nums = [2,7,11,15], target = 9</code><br/>Expected: <code>[0,1]</code></div>}
              {activeTab === 'Submission' && <div style={{ color: '#858585' }}>Submit your code to see results against all hidden test cases.</div>}
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-editor textarea { outline: none !important; }
      `}} />
    </div>
  );
}
