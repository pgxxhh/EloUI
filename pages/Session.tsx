
import React, { useState, useEffect } from 'react';
import { Button, Card, Badge } from '../components/UI';
import { Icons, SCENARIOS } from '../constants';

interface SessionProps {
  selectedContextId: string | null;
  onEndSession: () => void;
}

const Session: React.FC<SessionProps> = ({ selectedContextId, onEndSession }) => {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isMuted, setIsMuted] = useState(false);
  
  const scenario = SCENARIOS.find(s => s.id === selectedContextId) || SCENARIOS[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[80vh] items-stretch animate-in zoom-in-95 duration-700">
      {/* HUD Main Area */}
      <div className="lg:col-span-9 flex flex-col justify-between p-8 bg-zinc-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] -z-10 rounded-full"></div>
        
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-5 p-3 pr-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
              <div className="w-14 h-14 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                LX
              </div>
              <div>
                <p className="font-bold text-white text-lg tracking-tight">Li Xiao</p>
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                  Live in Shanghai
                </div>
              </div>
            </div>

            {/* Lightweight Context Anchor */}
            <div className="flex items-center gap-3 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <Icons.Sparkles className="w-3 h-3 text-indigo-400" />
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Practice goal:</span>
                <span className="text-xs font-bold text-white">{scenario.chineseTitle} {scenario.title}</span>
              </div>
              <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
              <span className="text-[10px] text-zinc-400 font-medium">{scenario.outcome}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl font-mono text-2xl font-bold border border-white/10 shadow-lg">
            <span className="text-zinc-500"><Icons.Clock /></span>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Dynamic Voice Visualizer */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-16">
          <div className="flex items-end gap-2 h-40">
            {[...Array(24)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 rounded-full transition-all duration-300 ${i % 2 === 0 ? 'bg-indigo-400' : 'bg-indigo-600'}`}
                style={{ height: `${Math.random() * 80 + 20}%`, animation: `pulse-soft ${0.8 + Math.random()}s infinite` }}
              ></div>
            ))}
          </div>
          <div className="text-center space-y-2">
             <p className="text-indigo-300 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">Li Xiao is listening...</p>
             <p className="text-zinc-500 text-sm italic">
               "{scenario.id === '1' ? "Take your time, I can help you with the word for 'Latte'." : 
                 scenario.id === '2' ? "Don't worry, just tell me if you want to go to the subway station." :
                 scenario.id === '3' ? "Tell me about your budget, I can help you find a good place." :
                 "I'm here to help you practice. What would you like to say next?"}"
             </p>
          </div>
        </div>

        {/* HUD Controls */}
        <div className="flex items-center justify-center gap-8 pb-4">
          <button 
            className={`p-6 rounded-3xl transition-all duration-300 border-2 ${isMuted ? 'bg-rose-500 border-rose-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            <div className={`${isMuted ? 'text-white' : 'text-indigo-400'}`}>
              <Icons.Mic />
            </div>
          </button>
          
          <Button variant="danger" onClick={onEndSession} className="px-20 py-6 text-lg rounded-3xl font-bold shadow-2xl shadow-rose-900/50 uppercase tracking-widest">
            End Session
          </Button>

          <button className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 transition-colors">
            <Icons.Sparkles />
          </button>
        </div>
      </div>

      {/* Side Context Panel */}
      <div className="lg:col-span-3 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-6">
          <Card className="bg-indigo-50 border-indigo-100 p-8 rounded-[2.5rem]">
            <Badge color="indigo">Session Focus</Badge>
            <h3 className="text-2xl font-bold text-zinc-900 mt-4 mb-2">{scenario.chineseTitle}</h3>
            <p className="text-sm text-zinc-600 leading-relaxed italic">"{scenario.description}"</p>
          </Card>

          <div className="space-y-4">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-4">Core Vocabulary</p>
            {scenario.keywords.map((kw, idx) => {
              const [zh, en] = kw.split(' (');
              return (
                <div key={idx} className="p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-center mb-1">
                     <p className="font-bold text-zinc-900 text-lg group-hover:text-indigo-600 transition-colors">{zh}</p>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium">{en.replace(')', '')}</p>
                </div>
              );
            })}
          </div>

          <div className="p-8 bg-gradient-to-br from-indigo-900 to-violet-950 rounded-[2.5rem] text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-[10px] uppercase tracking-widest">
              <Icons.Sparkles />
              Today's Goal
            </div>
            <p className="text-sm leading-relaxed text-indigo-100">
              {scenario.outcome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;
