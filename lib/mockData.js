export const notificationsData = [
  { id: 1, title: 'Assignment Graded', time: '2m ago', read: false },
  { id: 2, title: 'New Course: React Native', time: '1h ago', read: false },
  { id: 3, title: 'You earned a new badge!', time: 'Yesterday', read: true },
];

export const getActivityData = (period) => {
  return period === 'This Week' 
    ? [40, 70, 45, 90, 60, 20, 80] 
    : [60, 50, 70, 40, 80, 50, 60];
};

export const courseModules = [
  { id: 1, title: 'HTML & CSS Fundamentals', desc: 'Master the building blocks of the web.', status: 'completed', progress: 100 },
  { id: 2, title: 'JavaScript Essentials', desc: 'Learn variables, loops, and DOM manipulation.', status: 'in-progress', progress: 65 },
  { id: 3, title: 'React Integration', desc: 'Build modern single-page applications.', status: 'locked', progress: 0 },
  { id: 4, title: 'Next.js & SSR', desc: 'Scale your React apps with server-side rendering.', status: 'locked', progress: 0 },
];
