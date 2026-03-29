
import React, { useState, useEffect } from 'react';
import { Button, Card, Badge } from '../components/UI';
import { LessonTimerBar } from '../components/LessonUI';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  MicOff, 
  PhoneOff, 
  MessageSquare, 
  Volume2, 
  VolumeX,
  Sparkles,
  ArrowRight,
  User,
  Waves,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

import { Icons, SCENARIOS } from '../constants';

interface VoiceCallProps {
  selectedContextId: string | null;
  coachName: string;
  coachAvatar: string;
  onEnd: () => void;
}

type CallStatus = 'CONNECTING' | 'CONNECTED' | 'RECONNECTING' | 'FAILED' | 'ENDING_SOON' | 'ENDED';

const VoiceCall: React.FC<VoiceCallProps> = ({ selectedContextId, coachName, coachAvatar, onEnd }) => {
  const [status, setStatus] = useState<CallStatus>('CONNECTING');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [activeSpeaker, setActiveSpeaker] = useState<'COACH' | 'LEARNER' | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const totalTime = 900;

  const scenario = SCENARIOS.find(s => s.id === selectedContextId);

  useEffect(() => {
    // Simulate connection flow
    if (status === 'CONNECTING') {
      const timer = setTimeout(() => setStatus('CONNECTED'), 3000);
      return () => clearTimeout(timer);
    }

    let timer: NodeJS.Timeout;
    if (status === 'CONNECTED' || status === 'ENDING_SOON') {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setStatus('ENDED');
            return 0;
          }
          if (prev <= 60) setStatus('ENDING_SOON');
          return prev - 1;
        });
        
        // Simulate speaker switching
        if (Math.random() > 0.7) {
          setActiveSpeaker(prev => prev === 'COACH' ? 'LEARNER' : 'COACH');
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status]);

  const handleRetry = () => {
    setStatus('CONNECTING');
  };

  return (
    <div className="fixed inset-0 bg-zinc-950 text-white z-50 flex flex-col overflow-hidden animate-in fade-in duration-700">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Top Header */}
      <div className="h-20 px-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight">Live Session</span>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">with {coachName}</span>
          </div>
        </div>
        
        {status !== 'CONNECTING' && status !== 'FAILED' && status !== 'ENDED' && (
          <div className="w-48">
            <LessonTimerBar 
              timeLeft={timeLeft} 
              totalTime={totalTime} 
              status={status === 'ENDING_SOON' ? 'ENDING_SOON' : 'LIVE'} 
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsHelpOpen(!isHelpOpen)}
            className={`p-2 rounded-lg transition-all ${isHelpOpen ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`}
          >
            <AlertCircle className="w-5 h-5" />
          </button>
          <Badge color="zinc" className="bg-white/5 border-white/10">Audio Only</Badge>
        </div>
      </div>

      {/* Help Overlay */}
      <AnimatePresence>
        {isHelpOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 right-8 w-64 bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl z-50"
          >
            <p className="text-xs font-bold text-white mb-2">Connection Help</p>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-white/5 rounded-lg text-[10px] text-zinc-400 font-medium flex items-center justify-between group">
                Connection unstable? <span className="text-indigo-400 group-hover:underline">Retry</span>
              </button>
              <button className="w-full text-left p-2 hover:bg-white/5 rounded-lg text-[10px] text-zinc-400 font-medium flex items-center justify-between group">
                Audio issues? <span className="text-indigo-400 group-hover:underline">Check Mic</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Context Anchor - Refactored to secondary metadata */}
      <AnimatePresence>
        {(status === 'CONNECTED' || status === 'ENDING_SOON' || status === 'RECONNECTING') && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-8 py-2 z-10"
          >
            <div className="max-w-fit mx-auto flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                  {scenario ? 'Starter used:' : 'Session Mode:'}
                </span>
                <span className="text-[10px] font-bold text-zinc-300">
                  {scenario ? `${scenario.chineseTitle} ${scenario.title}` : 'Open Conversation'}
                </span>
              </div>
              {scenario && (
                <>
                  <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Goal:</span>
                  <span className="text-[10px] text-zinc-400 font-medium">{scenario.outcome}</span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Stage */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 z-10">
        <AnimatePresence mode="wait">
          {status === 'CONNECTING' ? (
            <motion.div 
              key="connecting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center space-y-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping" />
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl relative z-10">
                  <img src={coachAvatar} alt={coachName} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-center space-y-3">
                <Badge color="indigo" className="animate-pulse px-6 py-2 text-xs font-black uppercase tracking-[0.2em]">Stage C: Finalizing audio bridge</Badge>
                <h2 className="text-3xl font-bold">Connecting to {coachName}...</h2>
                <p className="text-zinc-500 font-medium">Establishing secure peer-to-peer connection</p>
              </div>
            </motion.div>
          ) : status === 'RECONNECTING' ? (
            <motion.div 
              key="reconnecting"
              className="flex flex-col items-center space-y-8"
            >
              <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 animate-pulse">
                <Waves className="w-10 h-10" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Connection Unstable</h2>
                <p className="text-zinc-500">Trying to reconnect with {coachName}...</p>
              </div>
            </motion.div>
          ) : status === 'FAILED' ? (
            <motion.div 
              key="failed"
              className="flex flex-col items-center space-y-8"
            >
              <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500">
                <AlertCircle className="w-10 h-10" />
              </div>
              <div className="text-center space-y-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Connection Failed</h2>
                  <p className="text-zinc-500">We couldn't establish a stable connection.</p>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleRetry} variant="secondary" className="bg-white/10 text-white border-white/10">Retry</Button>
                  <Button onClick={onEnd} variant="ghost" className="text-zinc-400">Cancel</Button>
                </div>
              </div>
            </motion.div>
          ) : status === 'ENDED' ? (
            <motion.div 
              key="ended"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md w-full"
            >
              <Card className="bg-zinc-900 border-white/10 p-10 text-center space-y-8 shadow-2xl">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center text-emerald-500 mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Session Finished</h3>
                  <p className="text-zinc-400 text-sm">Your feedback and recording will be available in History shortly.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Duration</p>
                    <p className="text-xl font-bold">15:00</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xl font-bold text-emerald-500">Saved</p>
                  </div>
                </div>
                <Button onClick={onEnd} className="w-full py-4 rounded-2xl bg-white text-zinc-950 hover:bg-zinc-200">
                  Return to Home
                </Button>
              </Card>
            </motion.div>
          ) : (
            <motion.div 
              key="live"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center space-y-12 w-full max-w-2xl"
            >
              {/* Voice Visualization & Speaker ID */}
              <div className="flex items-center justify-center gap-12 w-full">
                <div className="flex flex-col items-center space-y-4">
                  <div className={`w-24 h-24 rounded-[2rem] overflow-hidden border-4 transition-all duration-300 ${
                    activeSpeaker === 'COACH' ? 'border-indigo-500 scale-110 shadow-lg shadow-indigo-500/20' : 'border-white/10 opacity-50'
                  }`}>
                    <img src={coachAvatar} alt={coachName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                      activeSpeaker === 'COACH' ? 'text-indigo-400' : 'text-zinc-500'
                    }`}>{coachName}</span>
                    {activeSpeaker === 'COACH' && <span className="text-[8px] font-bold text-indigo-500 animate-pulse mt-1">SPEAKING</span>}
                  </div>
                </div>

                <div className="flex-1 h-32 flex items-center justify-center gap-1.5">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        height: activeSpeaker ? [20, Math.random() * 80 + 20, 20] : 4,
                        opacity: activeSpeaker ? [0.3, 0.8, 0.3] : 0.1
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.5 + Math.random() * 0.5,
                        ease: "easeInOut"
                      }}
                      className={`w-1.5 rounded-full transition-colors ${
                        activeSpeaker === 'COACH' ? 'bg-indigo-500' : 
                        activeSpeaker === 'LEARNER' ? 'bg-emerald-500' : 'bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div className={`w-24 h-24 rounded-[2rem] bg-zinc-800 flex items-center justify-center border-4 transition-all duration-300 ${
                    activeSpeaker === 'LEARNER' ? 'border-emerald-500 scale-110 shadow-lg shadow-emerald-500/20' : 'border-white/10 opacity-50'
                  }`}>
                    <User className="w-10 h-10 text-zinc-600" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                      activeSpeaker === 'LEARNER' ? 'text-emerald-400' : 'text-zinc-500'
                    }`}>You</span>
                    {activeSpeaker === 'LEARNER' && <span className="text-[8px] font-bold text-emerald-500 animate-pulse mt-1">SPEAKING</span>}
                  </div>
                </div>
              </div>

              {/* Real-time Transcription Tooltip - Semantic Consistency */}
              <div className="w-full p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Live Captions
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${activeSpeaker === 'COACH' ? 'bg-indigo-500' : activeSpeaker === 'LEARNER' ? 'bg-emerald-500' : 'bg-zinc-700'}`} />
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                      {activeSpeaker === 'COACH' ? coachName : activeSpeaker === 'LEARNER' ? 'You' : 'Waiting...'}
                    </span>
                  </div>
                </div>
                <p className="text-lg font-medium text-zinc-200 leading-relaxed">
                  {scenario ? (
                    scenario.id === '1' ? '"你好 Alex! 很高兴今天能和你一起练习点咖啡。你想喝点什么？"' :
                    scenario.id === '2' ? '"你好 Alex! 很高兴今天能和你一起练习问路。你想去哪里？"' :
                    '"你好 Alex! 很高兴今天能和你一起练习。我们开始吧？"'
                  ) : (
                    '"你好 Alex! 很高兴今天能和你聊天。你今天过得怎么样？"'
                  )}
                </p>
                <div className="h-px bg-white/5" />
                <p className="text-sm text-zinc-500 italic">
                  {scenario ? (
                    scenario.id === '1' ? '"Hello Alex! I\'m glad to practice ordering coffee with you today. What would you like to drink?"' :
                    scenario.id === '2' ? '"Hello Alex! I\'m glad to practice asking for directions with you today. Where would you like to go?"' :
                    '"Hello Alex! I\'m glad to practice with you today. Shall we start?"'
                  ) : (
                    '"Hello Alex! I\'m glad to chat with you today. How is your day going?"'
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="h-32 px-8 flex items-center justify-center z-10">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
              isMuted ? 'bg-rose-600 text-white' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          
          <button 
            onClick={onEnd}
            className="px-10 h-16 rounded-[2rem] bg-rose-600 text-white font-bold hover:bg-rose-700 transition-all flex items-center gap-3 shadow-xl shadow-rose-500/20"
          >
            <PhoneOff className="w-6 h-6" />
            End Session
          </button>

          <button 
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
              !isSpeakerOn ? 'bg-zinc-800 text-zinc-500' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
            }`}
          >
            {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceCall;
