
import React from 'react';
import { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  { 
    id: '1', 
    title: 'Coffee Shop Chat', 
    chineseTitle: '点咖啡', 
    description: '"I\'ll have a latte, please." Navigate a menu and customize your order naturally.', 
    level: 'HSK 2', 
    updatedAt: '2m ago',
    outcome: 'Order your favorite drink and handle common customizations.',
    keywords: ['拿铁 (Latte)', '少冰 (Less ice)', '打包 (To go)'],
    recommendationTag: 'Recommended for your HSK 2 level',
    activeCoaches: 12,
    duration: '15 mins'
  },
  { 
    id: '2', 
    title: 'Finding Your Way', 
    chineseTitle: '问路', 
    description: '"Excuse me, how do I get to...?" Practice asking for help and understanding landmarks.', 
    level: 'HSK 2', 
    updatedAt: '5m ago',
    outcome: 'Ask for directions and understand basic spatial instructions.',
    keywords: ['怎么走 (How to go)', '红绿灯 (Traffic light)', '拐 (Turn)'],
    recommendationTag: 'Good for confidence after a short break',
    activeCoaches: 8,
    duration: '15 mins'
  },
  { 
    id: '3', 
    title: 'Home Hunting', 
    chineseTitle: '租房子', 
    description: '"Is there a balcony?" Discuss your ideal living space and lease details.', 
    level: 'HSK 3', 
    updatedAt: '12m ago',
    outcome: 'Describe your housing needs and negotiate basic lease terms.',
    keywords: ['房租 (Rent)', '阳台 (Balcony)', '押金 (Deposit)'],
    recommendationTag: 'Recommended for your HSK 3 level',
    activeCoaches: 5,
    duration: '30 mins'
  },
  { 
    id: '4', 
    title: 'First Interview', 
    chineseTitle: '面试', 
    description: 'Tell your story. Practice introducing your background and answering common questions.', 
    level: 'HSK 4', 
    updatedAt: '1h ago',
    outcome: 'Present your professional background with confidence.',
    keywords: ['经验 (Experience)', '负责 (Responsible for)', '机会 (Opportunity)'],
    recommendationTag: 'Based on your last lesson',
    activeCoaches: 3,
    duration: '30 mins'
  },
  { 
    id: '5', 
    title: 'Sharing Your World', 
    chineseTitle: '谈爱好', 
    description: '"What do you like to do?" Connect over interests and daily life.', 
    level: 'HSK 3', 
    updatedAt: 'Just now',
    outcome: 'Express your passions and find common ground with others.',
    keywords: ['兴趣 (Interest)', '周末 (Weekend)', '特别 (Especially)'],
    recommendationTag: 'Perfect for daily practice',
    activeCoaches: 15,
    duration: '15 mins'
  },
];

export const MOCK_HISTORY = [
  {
    id: '1',
    scenarioTitle: 'Professional Introduction',
    date: '2024-04-10',
    coachName: 'Coach Sarah',
    score: 92,
    status: 'COMPLETED'
  },
  {
    id: '2',
    scenarioTitle: 'Business Meeting Opening',
    date: '2024-04-08',
    coachName: 'Coach James',
    score: 88,
    status: 'COMPLETED'
  },
  {
    id: '3',
    scenarioTitle: 'Daily Coffee Shop Chat',
    date: '2024-04-05',
    coachName: 'Coach Sarah',
    score: 95,
    status: 'COMPLETED'
  }
];

export const Icons = {
  Mic: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
    </svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  ),
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  ),
  Video: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  ShieldCheck: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-2.123-7.674 4.125 4.125 0 0 0-4.622 4.623c0 .534.044 1.058.13 1.565ZM6.75 6.75a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM2.25 17.25a3.375 3.375 0 0 1 3.375-3.375h9.75a3.375 3.375 0 0 1 3.375 3.375V19.5a3.375 3.375 0 0 1-3.375 3.375h-9.75A3.375 3.375 0 0 1 2.25 19.5v-2.25Z" />
    </svg>
  ),
  Wallet: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
    </svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H3.75A2.25 2.25 0 0 0 1.5 4.5v2.25Z" />
    </svg>
  ),
  MessageSquare: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h3m-4.5 5.25 3.75-3.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-13.5A2.25 2.25 0 0 0 2.25 4.5v13.5a2.25 2.25 0 0 0 2.25 2.25h.75v3.75Z" />
    </svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  ),
  BookOpen: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  PhoneOff: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 3.75 16.5 16.5m-5.469-9.03a3.375 3.375 0 0 1 3.53 3.53m-7.139-7.139a3.375 3.375 0 0 0-3.53-3.53m-1.029 1.03c-1.126 1.126-1.719 2.697-1.719 4.39 0 5.625 4.5 10.125 10.125 10.125 1.693 0 3.264-.593 4.39-1.719m-12.109-12.11L3.75 3.75m16.5 16.5-1.846-1.846" />
    </svg>
  ),
};
