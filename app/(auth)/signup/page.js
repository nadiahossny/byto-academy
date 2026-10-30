'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (val.length === 0) setPasswordStrength('');
    else if (val.length < 6) setPasswordStrength('Weak');
    else if (val.length < 10) setPasswordStrength('Good');
    else setPasswordStrength('Strong');
  };

  const completeSignup = (userName, userEmail) => {
    try {
      localStorage.setItem(
        'byto_user_profile',
        JSON.stringify({
          name: userName || 'Alex Johnson',
          email: userEmail || 'alex.johnson@example.com',
        })
      );
    } catch {}
    router.push('/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    completeSignup(name, email);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0f172a' }}>
          Create an Account
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Start your learning journey today
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label
            htmlFor="signup-name"
            style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#475569', fontWeight: 500 }}
          >
            Full Name
          </label>
          <input
            id="signup-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '1rem', outline: 'none' }}
            placeholder="Alex Johnson"
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#475569', fontWeight: 500 }}
          >
            Email Address
          </label>
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '1rem', outline: 'none' }}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            <label htmlFor="signup-password" style={{ color: '#475569', fontWeight: 500 }}>
              Password
            </label>
            <span
              aria-live="polite"
              style={{
                color:
                  passwordStrength === 'Strong'
                    ? '#10b981'
                    : passwordStrength === 'Good'
                    ? '#4F7CAC'
                    : '#ef4444',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              {passwordStrength}
            </span>
          </div>
          <input
            id="signup-password"
            type="password"
            required
            value={password}
            onChange={handlePasswordChange}
            style={{ width: '100%', padding: '0.75rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1E242B', fontSize: '1rem', outline: 'none' }}
            placeholder="Create a password"
          />
        </div>

        <button
          type="submit"
          style={{ width: '100%', padding: '0.875rem', background: '#4F7CAC', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem', transition: 'background 0.2s', boxShadow: '0 4px 10px rgba(79, 124, 172, 0.35)' }}
        >
          Sign Up for Free
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>Or continue with</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="button"
            onClick={() => completeSignup('Alex Johnson', 'alex.google@example.com')}
            style={{ flex: 1, padding: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#475569', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontWeight: 500 }}
          >
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>G</span> Google
          </button>
          <button
            type="button"
            onClick={() => completeSignup('Alex Johnson', 'alex.github@example.com')}
            style={{ flex: 1, padding: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#475569', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontWeight: 500 }}
          >
            <span style={{ fontSize: '1.1rem' }}>🐙</span> GitHub
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#4F7CAC', textDecoration: 'none', fontWeight: '600' }}>
            Log in
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          <span style={{ padding: '0 10px', color: '#94a3b8' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
        </div>

        <Link
          href="/dashboard"
          style={{ color: '#475569', textDecoration: 'none', fontWeight: '500', display: 'inline-block', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', transition: 'all 0.2s' }}
        >
          Continue as Guest
        </Link>
      </div>
    </div>
  );
}
