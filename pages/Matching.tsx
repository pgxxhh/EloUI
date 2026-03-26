
import React, { useEffect, useState } from 'react';
import { Icons } from '../constants';

interface MatchingProps {
  onMatchFound: () => void;
}

const REASSURING_MESSAGES = [
  "Finding a friendly coach for you...",
  "Take a deep breath. Your coach is here to help you flow.",
  "Don't worry about grammar, just speak.",
  "Almost ready! Preparing your conversation space.",
  "Remember: It's okay to make mistakes."
];

const Matching: React.FC<MatchingProps> = ({ onMatchFound }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % REASSURING_MESSAGES.length);
    }, 2500);

    const matchTimer = setTimeout(() => {
      onMatchFound();
    }, 6000);

    return () => {
      clearInterval(timer);
      clearTimeout(matchTimer);
    };
  }, [onMatchFound]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-12">
      <div className="relative">
        {/* Animated Rings */}
        <div className="absolute inset-0 bg-indigo-100 rounded-full scale-150 animate-ping opacity-20"></div>
        <div className="absolute inset-0 bg-indigo-50 rounded-full scale-125 animate-pulse opacity-40"></div>
        
        {/* Central Icon */}
        <div className="relative w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl">
          <Icons.Mic />
        </div>
      </div>

      <div className="text-center space-y-4 max-w-sm animate-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl font-semibold text-zinc-900 transition-opacity duration-500 h-16 flex items-center justify-center">
          {REASSURING_MESSAGES[messageIndex]}
        </h2>
        <p className="text-zinc-400 text-sm">
          While you wait: Try saying "你好" (Nǐ hǎo) to yourself. 
          The first few words are always the hardest!
        </p>
      </div>

      <div className="w-48 h-1 bg-zinc-100 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 transition-all duration-[6000ms] ease-linear" style={{ width: '100%' }}></div>
      </div>
    </div>
  );
};

export default Matching;
