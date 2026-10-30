'use client';

import React, { createContext, useContext, useState } from 'react';
import { notificationsData, courseModules } from '@/lib/mockData';

const UserContext = createContext();

const DEFAULT_PROFILE = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  bio: 'I am a passionate frontend developer eager to master React and Next.js. I love building intuitive user interfaces and solving complex UI challenges.',
  skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Figma'],
  membership: 'Pro Member',
};

function readStorage(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(() => ({
    ...DEFAULT_PROFILE,
    ...readStorage('byto_user_profile', {}),
  }));
  const [currentStreak] = useState(12);
  const [hoursLearned, setHoursLearned] = useState(45.5);
  const [badgesCount, setBadgesCount] = useState(12);
  const [notifications, setNotifications] = useState(notificationsData);
  const [solvedProblems, setSolvedProblems] = useState(() =>
    readStorage('byto_solved_problems', [1])
  );
  const [enrolledCourses, setEnrolledCourses] = useState(() =>
    readStorage('byto_enrolled_courses', [1])
  );
  const [tasks, setTasks] = useState(() =>
    courseModules.slice(0, 3).map((mod) => ({
      id: mod.id,
      text: mod.title,
      done: mod.status === 'completed',
    }))
  );

  const updateProfile = (newProfile) => {
    setProfile((prev) => {
      const updated = { ...prev, ...newProfile };
      try {
        localStorage.setItem('byto_user_profile', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const markProblemSolved = (problemId) => {
    setSolvedProblems((prev) => {
      if (prev.includes(problemId)) return prev;
      const updated = [...prev, problemId];
      try {
        localStorage.setItem('byto_solved_problems', JSON.stringify(updated));
      } catch {}
      setHoursLearned((h) => Number((h + 0.5).toFixed(1)));
      setBadgesCount((b) => b + 1);
      return updated;
    });
  };

  const enrollInCourse = (courseId) => {
    setEnrolledCourses((prev) => {
      if (prev.includes(courseId)) return prev;
      const updated = [...prev, courseId];
      try {
        localStorage.setItem('byto_enrolled_courses', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        currentStreak,
        hoursLearned,
        badgesCount,
        notifications,
        solvedProblems,
        enrolledCourses,
        tasks,
        updateProfile,
        toggleTask,
        markProblemSolved,
        enrollInCourse,
        markAllNotificationsRead,
        markNotificationRead,
        deleteNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
