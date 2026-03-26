
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
};
