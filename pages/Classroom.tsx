
import React, { useState, useEffect } from 'react';
import { Button, Card, Badge } from '../components/UI';
import { LessonTimerBar } from '../components/LessonUI';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  MicOff, 
  PhoneOff, 
  MessageSquare, 
  Settings, 
  Maximize2,
  AlertCircle,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User
} from 'lucide-react';

import { Icons, SCENARIOS } from '../constants';

interface ClassroomProps {
  selectedContextId: string | null;
  onEnd: () => void;
}

const Classroom: React.FC<ClassroomProps> = ({ selectedContextId, onEnd }) => {
  const [status, setStatus] = useState<'PRE_CLASS' | 'LIVE' | 'ENDING_SOON' | 'ENDED'>('PRE_CLASS');
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const totalTime = 1800;

  const scenario = SCENARIOS.find(s => s.id === selectedContextId) || SCENARIOS[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'LIVE' || status === 'ENDING_SOON') {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setStatus('ENDED');
            return 0;
          }
          if (prev <= 120) setStatus('ENDING_SOON');
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status]);

  const handleStartLesson = () => setStatus('LIVE');

  return (
    <div className="fixed inset-0 bg-zinc-950 text-white z-50 flex flex-col overflow-hidden animate-in fade-in duration-700">
      {/* Top Bar */}
      <div className="h-20 px-8 border-b border-white/5 flex items-center justify-between bg-zinc-950/50 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
              E
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">Elo Classroom</h2>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Unified Lesson System</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10">
                <img src="https://picsum.photos/seed/wei/100/100" alt="Coach" />
              </div>
              <span className="text-xs font-medium text-zinc-300">Coach Wei</span>
            </div>
            <ArrowRight className="w-3 h-3 text-zinc-600" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10">
                <img src="https://picsum.photos/seed/alex/100/100" alt="Learner" />
              </div>
              <span className="text-xs font-medium text-zinc-300">Alex Smith</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {status !== 'ENDED' && (
            <div className="w-64">
              <LessonTimerBar 
                timeLeft={timeLeft} 
                totalTime={totalTime} 
                status={status === 'ENDING_SOON' ? 'ENDING_SOON' : 'LIVE'} 
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl hover:bg-white/5 text-zinc-400 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-white/5 text-zinc-400 transition-colors">
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Context Anchor */}
      <AnimatePresence>
        {status === 'LIVE' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-8 py-2 bg-zinc-900/50 border-b border-white/5 z-10"
          >
            <div className="max-w-fit mx-auto flex items-center gap-3 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-widest">Practice goal:</span>
                <span className="text-xs font-bold text-white">{scenario.chineseTitle} {scenario.title}</span>
              </div>
              <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
              <span className="text-[10px] text-zinc-400 font-medium">Today's goal: {scenario.outcome}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 relative p-8 flex gap-8">
        
        {/* Left: Video/Audio Stage */}
        <div className="flex-1 relative rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl">
          <AnimatePresence mode="wait">
            {status === 'PRE_CLASS' && (
              <motion.div 
                key="pre"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 backdrop-blur-xl z-10"
              >
                <Card className="bg-zinc-950 border-white/5 p-10 max-w-md w-full text-center space-y-8 shadow-2xl">
                  <div className="w-20 h-20 bg-indigo-500/10 rounded-[2.5rem] flex items-center justify-center text-indigo-500 mx-auto">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Ready to start?</h3>
                    <p className="text-zinc-400 text-sm">
                      Coach Wei is already in the classroom. Test your audio before jumping in.
                    </p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center gap-2 w-32">
                      <div className="flex items-center gap-1 h-6">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: [4, 16, 4] }}
                            transition={{ repeat: Infinity, duration: 0.5 + i * 0.1 }}
                            className="w-1 bg-emerald-500 rounded-full"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Audio OK</span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleStartLesson}
                    className="w-full py-4 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/20"
                  >
                    Join Lesson
                  </Button>
                </Card>
              </motion.div>
            )}

            {status === 'ENDED' && (
              <motion.div 
                key="ended"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-zinc-950/90 backdrop-blur-2xl z-20"
              >
                <Card className="bg-zinc-900 border-white/10 p-12 max-w-lg w-full text-center space-y-10 shadow-2xl">
                  <div className="w-24 h-24 bg-emerald-500/10 rounded-[3rem] flex items-center justify-center text-emerald-500 mx-auto shadow-inner">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-white">Lesson Completed!</h3>
                    <p className="text-zinc-400">
                      Great session with Coach Wei. Your progress has been saved.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-1">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Duration</p>
                      <p className="text-2xl font-bold text-white">30:00</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-1">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Charged</p>
                      <p className="text-2xl font-bold text-emerald-500">30 <span className="text-sm font-normal text-zinc-500">min</span></p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      className="w-full py-4 rounded-2xl bg-white text-zinc-950 hover:bg-zinc-200 font-bold"
                      onClick={onEnd}
                    >
                      View Feedback & Recording
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full text-zinc-500 hover:text-white"
                      onClick={onEnd}
                    >
                      Return to Home
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Audio Stage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-indigo-600/10 blur-[120px] rounded-full" />
              <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-emerald-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="flex items-center justify-center gap-16 w-full max-w-2xl relative z-10">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl">
                  <img src="https://picsum.photos/seed/wei/200/200" alt="Coach" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Coach Wei</span>
                  <Badge color="green" className="mt-1">Speaking</Badge>
                </div>
              </div>

              <div className="flex-1 h-32 flex items-center justify-center gap-2">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: [20, Math.random() * 80 + 20, 20],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.5 + Math.random() * 0.5,
                      ease: "easeInOut"
                    }}
                    className="w-2 bg-indigo-500 rounded-full"
                  />
                ))}
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 rounded-[2.5rem] bg-zinc-800 flex items-center justify-center border-4 border-white/10 shadow-inner">
                  <User className="w-12 h-12 text-zinc-600" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">You (Alex)</span>
                  <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter mt-1">{isMuted ? 'Muted' : 'Listening'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Chat / Sidebar */}
        <div className="w-96 flex flex-col gap-6">
          <Card className="flex-1 bg-zinc-900 border-white/5 p-6 flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Lesson Chat
              </h3>
              <Badge color="zinc">Live</Badge>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Coach Wei</p>
                <div className="p-3 bg-white/5 rounded-2xl rounded-tl-none border border-white/5 text-sm text-zinc-300">
                  {scenario.id === '1' ? '你好 Alex! 今天我们练习点咖啡。你想喝点什么？' :
                   scenario.id === '2' ? '你好 Alex! 今天我们练习问路。你想去哪里？' :
                   scenario.id === '3' ? '你好 Alex! 今天我们练习租房子。你对房子有什么要求？' :
                   scenario.id === '4' ? '你好 Alex! 今天我们练习面试。请先做一下自我介绍。' :
                   scenario.id === '5' ? '你好 Alex! 今天我们练习谈爱好。你周末喜欢做什么？' :
                   '你好 Alex! 今天我们练习什么？'}
                </div>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">You</p>
                <div className="p-3 bg-indigo-600 rounded-2xl rounded-tr-none text-sm text-white inline-block">
                  我想练习{scenario.chineseTitle}。
                </div>
              </div>
            </div>
            <div className="pt-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Type a message..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-indigo-500 transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-500 hover:text-indigo-400">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card>

          <Card className="bg-zinc-900 border-white/5 p-6 space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-amber-500" />
              AI Assistant
            </div>
            <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10 space-y-2">
              <p className="text-xs text-amber-200/80 leading-relaxed">
                <span className="font-bold text-amber-500">Tip:</span> You used "我想" correctly. For {scenario.title}, you can also use "{scenario.id === '4' ? '我希望' : '我想要'}".
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="h-24 px-8 border-t border-white/5 flex items-center justify-center bg-zinc-950/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              isMuted ? 'bg-rose-600 text-white' : 'bg-white/5 text-zinc-300 hover:bg-white/10'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          <div className="w-px h-8 bg-white/10 mx-2" />
          <button 
            className="px-8 h-14 rounded-2xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-all flex items-center gap-3 shadow-xl shadow-rose-500/20"
            onClick={() => setStatus('ENDED')}
          >
            <PhoneOff className="w-5 h-5" />
            End Lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
