'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const derivedName = email.split('@')[0]
        ? email
            .split('@')[0]
            .replace(/[._-]/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase())
        : 'Alex Johnson';
      localStorage.setItem(
        'byto_user_profile',
        JSON.stringify({
          name: derivedName,
          email,
        })
      );
    } catch {}
    router.push('/dashboard');
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0f172a' }}>
          Welcome Back
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Enter your credentials to access your account
        </p>
      </div>

      {resetSent && (
        <div
          role="status"
          style={{
            marginBottom: '1.25rem',
            padding: '0.75rem 1rem',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            borderRadius: '8px',
            fontSize: '0.85rem',
          }}
        >
          Password reset instructions have been sent to {email || 'your email address'}.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label
            htmlFor="login-email"
            style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#475569', fontWeight: 500 }}
          >
            Email Address
          </label>
          <input
            id="login-email"
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
            <label htmlFor="login-password" style={{ color: '#475569', fontWeight: 500 }}>
              Password
            </label>
            <button
              type="button"
              onClick={() => setResetSent(true)}
              style={{ background: 'transparent', border: 'none', color: '#4F7CAC', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}
            >
              Forgot?
            </button>
          </div>
          <input
            id="login-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#1E242B', fontSize: '1rem', outline: 'none' }}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          style={{ width: '100%', padding: '0.875rem', background: '#4F7CAC', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem', transition: 'background 0.2s', boxShadow: '0 4px 10px rgba(79, 124, 172, 0.35)' }}
        >
          Log In
        </button>
      </form>

      <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: '#4F7CAC', textDecoration: 'none', fontWeight: '600' }}>
            Sign up
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
