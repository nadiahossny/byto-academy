'use client';

import { useState } from 'react';
import { User, Mail, Award, Settings, CreditCard, Edit3, Check } from 'lucide-react';
import { useUser } from '../UserContext';

export default function Profile() {
  const { profile, updateProfile, badgesCount } = useUser();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [emailInput, setEmailInput] = useState(profile.email);
  const [bioInput, setBioInput] = useState(profile.bio);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: nameInput.trim() || profile.name,
      email: emailInput.trim() || profile.email,
      bio: bioInput.trim() || profile.bio,
    });
    setIsEditing(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Profile Header Banner */}
      <div style={{ position: 'relative', width: '100%', height: '180px', background: 'linear-gradient(135deg, #EAF4FF 0%, #D0E8FF 100%)', borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
        <button
          type="button"
          onClick={() => {
            setNameInput(profile.name);
            setEmailInput(profile.email);
            setBioInput(profile.bio);
            setIsEditing(true);
          }}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--accent-color)', border: 'none', padding: '10px 16px', borderRadius: '30px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
        >
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      {/* Profile Info Card */}
      <div style={{ background: '#fff', borderRadius: '0 0 20px 20px', padding: '0 32px 32px 32px', boxShadow: 'var(--shadow)', position: 'relative', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '-50px', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#fff', padding: '6px', position: 'relative', zIndex: 2, boxShadow: 'var(--shadow)' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={52} color="#fff" />
              </div>
            </div>
            <div style={{ paddingBottom: '6px' }}>
              <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '5px' }}>{profile.name}</h2>
              <p style={{ color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                <Mail size={16} /> {profile.email}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setNameInput(profile.name);
              setEmailInput(profile.email);
              setBioInput(profile.bio);
              setIsEditing(!isEditing);
            }}
            style={{ background: 'var(--primary-color)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>

        {isEditing && (
          <form onSubmit={handleSaveProfile} style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ color: 'var(--primary-color)', margin: 0 }}>Update Your Profile</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label htmlFor="profile-name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Full Name</label>
                <input id="profile-name" type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
              <div>
                <label htmlFor="profile-email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Email Address</label>
                <input id="profile-email" type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>
            </div>
            <div>
              <label htmlFor="profile-bio" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Bio</label>
              <textarea id="profile-bio" rows={3} value={bioInput} onChange={(e) => setBioInput(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'inherit' }} />
            </div>
            <button type="submit" style={{ alignSelf: 'flex-start', background: '#10b981', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '20px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} /> Save Changes
            </button>
          </form>
        )}

        {/* Custom Tabs */}
        <div role="tablist" style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #eee', flexWrap: 'wrap' }}>
          {['Overview', 'Certificates', 'Settings', 'Billing'].map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1rem',
                padding: '15px 0',
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
      </div>

      {/* Tab Content Area */}
      {activeTab === 'Overview' && (
        <div className="responsive-grid">
          <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '16px' }}>About Me</h3>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '30px' }}>{profile.bio}</p>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '16px' }}>Skills</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {(profile.skills || ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Figma']).map((skill) => (
                <span key={skill} style={{ background: '#f4f5f7', color: 'var(--primary-color)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '20px', padding: '25px', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ background: 'rgba(79, 124, 172, 0.14)', padding: '15px', borderRadius: '15px' }}>
                <Award color="var(--accent-color)" size={30} />
              </div>
              <div>
                <h4 style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '5px' }}>Milestones Unlocked</h4>
                <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem' }}>{badgesCount}</h2>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '20px', padding: '25px', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ background: 'var(--bg-color)', padding: '15px', borderRadius: '15px' }}>
                <Settings color="var(--primary-color)" size={30} />
              </div>
              <div>
                <h4 style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '5px' }}>Account Status</h4>
                <h2 style={{ color: 'var(--primary-color)', fontSize: '1.75rem' }}>{profile.membership || 'Pro Member'}</h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Certificates' && (
        <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: 'var(--shadow)' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '16px' }}>Earned Credentials</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h4 style={{ color: 'var(--primary-color)', fontSize: '1.15rem', marginBottom: '4px' }}>Certified React Developer</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: 0 }}>Credential ID: BYTO-104928374 • Issued May 24, 2026</p>
            </div>
            <span style={{ background: '#ecfdf5', color: '#065f46', padding: '6px 14px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700 }}>
              Verified
            </span>
          </div>
        </div>
      )}

      {activeTab === 'Settings' && (
        <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ color: 'var(--primary-color)', margin: 0 }}>Learning Preferences</h3>
          {[
            { label: 'Daily Streak Reminders', desc: 'Receive a friendly notification to keep your coding streak alive.', checked: true },
            { label: 'Weekly Progress Digest', desc: 'Summary of hours learned and modules completed each week.', checked: true },
          ].map((pref) => (
            <label key={pref.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f8fafc', borderRadius: '12px', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{pref.label}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{pref.desc}</div>
              </div>
              <input type="checkbox" defaultChecked={pref.checked} style={{ width: '18px', height: '18px', accentColor: 'var(--accent-color)' }} />
            </label>
          ))}
        </div>
      )}

      {activeTab === 'Billing' && (
        <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '14px', background: 'rgba(79, 124, 172, 0.14)', borderRadius: '14px' }}>
              <CreditCard color="var(--accent-color)" size={28} />
            </div>
            <div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '4px' }}>Byto Academy Pro Plan</h3>
              <p style={{ color: 'var(--text-light)', margin: 0, fontSize: '0.9rem' }}>Unlimited access to all Learning Paths, Courses, and Browser IDE.</p>
            </div>
          </div>
          <span style={{ fontWeight: 700, color: '#10b981', background: '#ecfdf5', padding: '8px 16px', borderRadius: '999px', fontSize: '0.9rem' }}>
            Active Subscription
          </span>
        </div>
      )}
    </div>
  );
}
