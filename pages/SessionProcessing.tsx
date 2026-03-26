
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Loader2, 
  Volume2, 
  MessageSquare, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  Play,
  Pause,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react';
import { Button, Card, Badge } from '../components/UI';

interface SessionProcessingProps {
  onComplete: () => void;
  onBack: () => void;
}

type ProcessingStage = 'AUDIO' | 'TRANSCRIPT' | 'AI_REVIEW' | 'COMPLETED';

const SessionProcessing: React.FC<SessionProcessingProps> = ({ onComplete, onBack }) => {
  const [stage, setStage] = useState<ProcessingStage>('AUDIO');
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (stage === 'AUDIO') {
            setStage('TRANSCRIPT');
            return 0;
          }
          if (stage === 'TRANSCRIPT') {
            setStage('AI_REVIEW');
            return 0;
          }
          if (stage === 'AI_REVIEW') {
            setStage('COMPLETED');
            clearInterval(timer);
            return 100;
          }
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [stage]);

  const stages = [
    { id: 'AUDIO', label: 'Processing Audio', icon: Volume2, description: 'Optimizing your recording for analysis' },
    { id: 'TRANSCRIPT', label: 'Transcribing', icon: MessageSquare, description: 'Converting your spoken Chinese to text' },
    { id: 'AI_REVIEW', label: 'AI Reviewing', icon: Sparkles, description: 'Identifying learning moments & upgrades' }
  ];

  const getStageStatus = (s: string) => {
    const order = ['AUDIO', 'TRANSCRIPT', 'AI_REVIEW', 'COMPLETED'];
    const currentIndex = order.indexOf(stage);
    const stageIndex = order.indexOf(s);

    if (currentIndex > stageIndex) return 'COMPLETED';
    if (currentIndex === stageIndex) return 'PROCESSING';
    return 'WAITING';
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 space-y-12 max-w-4xl mx-auto">
      
      {/* Header Section: Achievement & Emotion */}
      <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2.5rem] shadow-xl shadow-emerald-100/50 mb-2 rotate-3">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
            Session Complete! <br />
            <span className="text-indigo-600">Great job, Jingyao.</span>
          </h1>
          <p className="text-zinc-500 font-medium">
            You just finished 15 minutes of high-impact practice with Coach Wei.
          </p>
        </div>
      </div>

      {/* Main Processing HUD */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Progress Track */}
        <Card className="lg:col-span-7 p-8 space-y-8 border-zinc-100 shadow-xl shadow-zinc-200/50 bg-white/80 backdrop-blur-sm">
          <div className="space-y-6">
            {stages.map((s, i) => {
              const status = getStageStatus(s.id);
              return (
                <div key={s.id} className="flex items-start gap-4 relative">
                  {/* Connector Line */}
                  {i < stages.length - 1 && (
                    <div className="absolute left-5 top-10 w-0.5 h-12 bg-zinc-100">
                      <motion.div 
                        className="w-full bg-indigo-500 origin-top"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: status === 'COMPLETED' ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                  
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    status === 'COMPLETED' ? 'bg-emerald-500 text-white' : 
                    status === 'PROCESSING' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 
                    'bg-zinc-100 text-zinc-400'
                  }`}>
                    {status === 'COMPLETED' ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className={`w-5 h-5 ${status === 'PROCESSING' ? 'animate-pulse' : ''}`} />}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-bold transition-colors ${status === 'WAITING' ? 'text-zinc-400' : 'text-zinc-900'}`}>
                        {s.label}
                      </h3>
                      {status === 'PROCESSING' && (
                        <span className="text-[10px] font-bold text-indigo-600 tabular-nums">{progress}%</span>
                      )}
                    </div>
                    <p className={`text-[11px] transition-colors ${status === 'WAITING' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      {s.description}
                    </p>
                    {status === 'PROCESSING' && (
                      <div className="mt-3 h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-indigo-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <Clock className="w-3 h-3" />
              Est. remaining: 12s
            </div>
            <Badge color={stage === 'COMPLETED' ? 'green' : 'indigo'} className="animate-pulse">
              {stage === 'COMPLETED' ? 'Ready to review' : 'AI is working'}
            </Badge>
          </div>
        </Card>

        {/* Right: Sneak Peek / Early Access */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            {stage === 'AUDIO' ? (
              <motion.div
                key="waiting-audio"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 bg-zinc-50 rounded-[2.5rem] border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[300px]"
              >
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-zinc-300">
                  <Volume2 className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Audio processing...</p>
              </motion.div>
            ) : (
              <motion.div
                key="sneak-peek"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Audio Sneak Peek */}
                <Card className="p-6 border-zinc-100 shadow-lg shadow-zinc-100 bg-white space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Recording Ready</p>
                    <Badge color="green">HD Audio</Badge>
                  </div>
                  <div className="flex items-center gap-4 bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>
                    <div className="flex-1 space-y-1">
                      <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-indigo-600 rounded-full" />
                      </div>
                      <div className="flex justify-between text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                        <span>04:12</span>
                        <span>15:00</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Transcript Sneak Peek */}
                <Card className="p-6 border-zinc-100 shadow-lg shadow-zinc-100 bg-white space-y-4 overflow-hidden relative">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Transcript Preview</p>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-400">C</div>
                      <p className="text-xs text-zinc-600 leading-relaxed">你好！今天想聊点什么？</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">S</div>
                      <p className="text-xs text-zinc-900 font-medium leading-relaxed">我想聊聊我的工作。我在一个大公司工作...</p>
                    </div>
                    <div className="flex gap-3 opacity-40">
                      <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-400">C</div>
                      <p className="text-xs text-zinc-600 leading-relaxed">太好了。你在哪里工作？</p>
                    </div>
                  </div>
                  {/* Fade out effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center gap-4 pt-4">
        <Button 
          onClick={onBack}
          variant="secondary" 
          className="w-full sm:w-auto px-8 py-4 rounded-2xl border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
        <Button 
          onClick={onComplete}
          disabled={stage !== 'COMPLETED'}
          className={`flex-1 py-4 rounded-2xl text-base font-bold shadow-xl transition-all flex items-center justify-center gap-2 ${
            stage === 'COMPLETED' 
              ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-200 border-none' 
              : 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed'
          }`}
        >
          {stage === 'COMPLETED' ? (
            <>
              View Full Session Review
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Review...
            </>
          )}
        </Button>
      </div>

      <p className="text-[11px] text-zinc-400 font-medium text-center max-w-sm">
        You can leave this page anytime. We'll notify you in your History once the review is ready.
      </p>

    </div>
  );
};

export default SessionProcessing;
