import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  PhoneOff, 
  HelpCircle, 
  Clock,
  Sparkles,
  User,
  Wifi,
  WifiOff,
  Languages
} from 'lucide-react';
import { Button, Badge } from '../components/UI';

interface LiveLessonProps {
  coachName?: string;
  topic?: string;
  onLeave?: () => void;
}

const LiveLesson: React.FC<LiveLessonProps> = ({ 
  coachName = "Coach Wei", 
  topic = "Ordering at a Local Noodle Shop",
  onLeave 
}) => {
  // Media States
  const [isLocalCamOff, setIsLocalCamOff] = useState(false);
  const [isRemoteCamOff, setIsRemoteCamOff] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  
  // App States
  const [subtitleMode, setSubtitleMode] = useState<'chinese' | 'both' | 'off'>('both');
  const [timeLeft, setTimeLeft] = useState(900); // 15:00
  const [connectionStatus, setConnectionStatus] = useState<'excellent' | 'weak' | 'reconnecting'>('excellent');
  
  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-zinc-950 text-white font-sans overflow-hidden flex flex-col">
      {/* 1. PAGE BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,24,27,1)_0%,rgba(9,9,11,1)_100%)]"></div>
      </div>

      {/* 2. TOP HEADER */}
      <header className="relative z-20 w-full p-6 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-3 bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-2 pr-6 rounded-2xl shadow-2xl pointer-events-auto">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Live Lesson</span>
              <Badge className="bg-indigo-500/20 text-indigo-400 border-none px-2 py-0.5 text-[9px] font-black uppercase">1:1 Session</Badge>
            </div>
            <h1 className="text-sm font-black text-white">{topic}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <div className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 ${timeLeft < 120 ? 'border-rose-500/50 bg-rose-500/10' : ''}`}>
            <Clock className={`w-4 h-4 ${timeLeft < 120 ? 'text-rose-500 animate-pulse' : 'text-zinc-400'}`} />
            <span className={`text-lg font-black tabular-nums ${timeLeft < 120 ? 'text-rose-500' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 flex items-center gap-2">
            <Wifi className={`w-4 h-4 ${connectionStatus === 'excellent' ? 'text-emerald-500' : 'text-rose-500 animate-pulse'}`} />
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">HD</span>
          </div>
        </div>
      </header>

      {/* 3. MAIN STAGE: 1:1 EQUAL SPLIT */}
      <main className="relative flex-1 w-full max-w-7xl mx-auto px-6 flex items-center justify-center gap-4 z-10">
        
        {/* COACH PANEL (50%) */}
        <div className="flex-1 h-full max-h-[70vh] bg-zinc-900 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden relative group">
          {!isRemoteCamOff ? (
            <img 
              src="https://picsum.photos/seed/coach_face/800/1000" 
              alt="Coach"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900">
              <div className="w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center border-4 border-indigo-500/20">
                <User className="w-16 h-16 text-indigo-400" />
              </div>
              <p className="mt-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Coach Camera Off</p>
            </div>
          )}
          {/* Identity Tag */}
          <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{coachName}</span>
          </div>
        </div>

        {/* LEARNER PANEL (50%) */}
        <div className="flex-1 h-full max-h-[70vh] bg-zinc-900 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden relative group">
          {!isLocalCamOff ? (
            <img 
              src="https://picsum.photos/seed/learner_face/800/1000" 
              alt="Learner"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900">
              <div className="w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center border-4 border-zinc-700">
                <User className="w-16 h-16 text-zinc-600" />
              </div>
              <p className="mt-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Your Camera Off</p>
            </div>
          )}
          {/* Identity Tag */}
          <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">You</span>
          </div>
          {isMuted && (
            <div className="absolute top-6 right-6 bg-rose-500 p-2 rounded-full shadow-lg">
              <MicOff className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* 4. SUBTITLE OVERLAY (Floating Bottom Center) */}
        <AnimatePresence>
          {subtitleMode !== 'off' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-30 pointer-events-none"
            >
              <div className="bg-black/60 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] shadow-2xl text-center">
                <p className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                  老板，我要一碗牛肉面，不要香菜。
                </p>
                {subtitleMode === 'both' && (
                  <p className="mt-2 text-sm md:text-base font-bold text-indigo-300/70">
                    Boss, I want a bowl of beef noodles, no coriander.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 5. BOTTOM DOCK */}
      <footer className="relative z-30 w-full p-8 flex justify-center items-center">
        <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-3 flex items-center gap-2 shadow-2xl">
          <div className="flex items-center px-2 gap-1">
            <ControlButton 
              active={!isLocalCamOff} 
              onClick={() => setIsLocalCamOff(!isLocalCamOff)}
              icon={isLocalCamOff ? VideoOff : Video}
              label="Camera"
            />
            <ControlButton 
              active={!isMuted} 
              onClick={() => setIsMuted(!isMuted)}
              icon={isMuted ? MicOff : Mic}
              label="Mic"
            />
            <ControlButton 
              active={!isSpeakerMuted} 
              onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
              icon={isSpeakerMuted ? VolumeX : Volume2}
              label="Speaker"
            />
          </div>

          <div className="w-px h-8 bg-white/10 mx-2"></div>

          <div className="flex items-center px-2 gap-2">
            <Button 
              onClick={() => {
                if (subtitleMode === 'chinese') setSubtitleMode('both');
                else if (subtitleMode === 'both') setSubtitleMode('off');
                else setSubtitleMode('chinese');
              }}
              className={`
                h-12 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                ${subtitleMode !== 'off' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}
              `}
            >
              <Languages className="w-4 h-4 mr-2" />
              {subtitleMode === 'both' ? 'English Help' : subtitleMode === 'chinese' ? 'Chinese Only' : 'Subtitles Off'}
            </Button>

            <Button 
              onClick={onLeave}
              className="h-12 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-rose-600/20"
            >
              <PhoneOff className="w-4 h-4" />
              Leave Lesson
            </Button>
          </div>
          
          <div className="w-px h-8 bg-white/10 mx-2"></div>
          
          <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Demo Toggles */}
      <div className="fixed bottom-32 left-8 z-50 flex flex-col gap-2">
        <button onClick={() => setIsRemoteCamOff(!isRemoteCamOff)} className="bg-zinc-900/80 backdrop-blur-md text-[9px] text-zinc-500 px-3 py-1 rounded-full border border-white/5 hover:text-white">Toggle Coach Cam</button>
        <button onClick={() => setConnectionStatus(connectionStatus === 'excellent' ? 'weak' : 'excellent')} className="bg-zinc-900/80 backdrop-blur-md text-[9px] text-zinc-500 px-3 py-1 rounded-full border border-white/5 hover:text-white">Toggle Network</button>
      </div>
    </div>
  );
};

const ControlButton: React.FC<{ 
  active: boolean; 
  onClick: () => void; 
  icon: any; 
  label: string;
}> = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`
      w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative group
      ${active ? 'text-white hover:bg-white/5' : 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20'}
    `}
  >
    <Icon className="w-5 h-5" />
    <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
      {label} {active ? 'On' : 'Off'}
    </span>
  </button>
);

export default LiveLesson;
