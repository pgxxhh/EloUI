
import React, { useEffect, useState } from 'react';
import { Icons } from '../constants';
import { Badge } from '../components/UI';

interface MatchingProps {
  onMatchFound: () => void;
  coachName?: string;
  topicName?: string;
  onCancel?: () => void;
}

const WAITING_MESSAGES = [
  "Notifying your coach...",
  "Coaches usually respond within 60 seconds.",
  "Preparing your 1:1 conversation space...",
  "Almost there! Your coach is reviewing the request."
];

const CONNECTING_MESSAGES = [
  "Coach accepted! Preparing the session...",
  "Setting up the audio bridge...",
  "Finalizing connection...",
  "Get ready to speak!"
];

const Matching: React.FC<MatchingProps> = ({ onMatchFound, coachName = "your coach", topicName = "Open Conversation", onCancel }) => {
  const [stage, setStage] = useState<'WAITING' | 'CONNECTING'>('WAITING');
  const [messageIndex, setMessageIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const totalWaitTime = 8;
  const transitionTime = 5;

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % (stage === 'WAITING' ? WAITING_MESSAGES.length : CONNECTING_MESSAGES.length));
    }, 2500);

    const elapsedTimer = setInterval(() => {
      setElapsed(prev => {
        const next = prev + 1;
        if (next >= transitionTime && stage === 'WAITING') {
          setStage('CONNECTING');
          setMessageIndex(0);
        }
        return next;
      });
    }, 1000);

    const matchTimer = setTimeout(() => {
      onMatchFound();
    }, totalWaitTime * 1000);

    return () => {
      clearInterval(timer);
      clearInterval(elapsedTimer);
      clearTimeout(matchTimer);
    };
  }, [onMatchFound, stage]);

  const currentMessages = stage === 'WAITING' ? WAITING_MESSAGES : CONNECTING_MESSAGES;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-12 px-6">
      <div className="relative">
        {/* Animated Rings */}
        <div className={`absolute inset-0 rounded-full scale-150 animate-ping opacity-20 transition-colors duration-700 ${stage === 'WAITING' ? 'bg-indigo-100' : 'bg-emerald-100'}`}></div>
        <div className={`absolute inset-0 rounded-full scale-125 animate-pulse opacity-40 transition-colors duration-700 ${stage === 'WAITING' ? 'bg-indigo-50' : 'bg-emerald-50'}`}></div>
        
        {/* Central Icon */}
        <div className={`relative w-32 h-32 rounded-[3rem] flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-700 ${
          stage === 'WAITING' 
            ? 'bg-indigo-600 shadow-indigo-200' 
            : 'bg-emerald-600 shadow-emerald-200 scale-110'
        }`}>
          {stage === 'WAITING' ? (
            <Icons.Mic className="w-10 h-10 mb-2" />
          ) : (
            <Icons.Phone className="w-10 h-10 mb-2 animate-bounce" />
          )}
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {stage === 'WAITING' ? 'Waiting' : 'Connecting'}
          </span>
        </div>
      </div>

      <div className="text-center space-y-6 max-w-sm animate-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2">
          <Badge color={stage === 'WAITING' ? 'indigo' : 'emerald'} className="animate-pulse px-6 py-2 text-xs font-black uppercase tracking-[0.2em] shadow-lg">
            {stage === 'WAITING' ? 'Stage A: Waiting for coach response' : 'Stage B: Connecting to coach'}
          </Badge>
          <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${stage === 'WAITING' ? 'text-zinc-900' : 'text-emerald-700'}`}>
            {stage === 'WAITING' ? `Waiting for ${coachName}` : `Connecting with ${coachName}`}
          </h2>
        </div>
        
        <div className="space-y-4">
          <p className={`text-lg font-medium min-h-[3rem] transition-colors duration-500 ${stage === 'WAITING' ? 'text-zinc-500' : 'text-emerald-600'}`}>
            {currentMessages[messageIndex]}
          </p>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-48 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${stage === 'WAITING' ? 'bg-indigo-600' : 'bg-emerald-500'}`} 
                style={{ width: `${(elapsed / totalWaitTime) * 100}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              {stage === 'WAITING' ? (
                <>Expected wait: <span className="text-zinc-900">&lt; 1 min</span></>
              ) : (
                <span className="text-emerald-500 animate-pulse">Entering session...</span>
              )}
            </span>
          </div>
        </div>

        {/* Secondary Metadata */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
            <Icons.Sparkles className="w-3.5 h-3.5" />
            Starter: <span className="text-zinc-900 font-bold">{topicName}</span>
          </div>
          {onCancel && stage === 'WAITING' && (
            <button 
              onClick={onCancel}
              className="text-xs font-bold text-zinc-400 hover:text-rose-500 transition-colors uppercase tracking-widest mt-4"
            >
              Cancel Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matching;
