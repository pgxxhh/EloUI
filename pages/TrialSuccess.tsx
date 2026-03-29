
import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, Video, Clock, ShieldCheck, Zap } from 'lucide-react';
import { Button, Card, Badge } from '../components/UI';
import { Coach } from '../types';

interface TrialSuccessProps {
  onStartNow: () => void;
  onScheduleLater: () => void;
  onViewDashboard: () => void;
}

const mockAvailableCoaches: Partial<Coach>[] = [
  { id: 'c1', name: 'Coach Wei', avatar: 'https://picsum.photos/seed/wei/200/200', rating: 4.9, isOnline: true },
  { id: 'c2', name: 'Coach Lin', avatar: 'https://picsum.photos/seed/lin/200/200', rating: 5.0, isOnline: true },
  { id: 'c4', name: 'Coach Sarah', avatar: 'https://picsum.photos/seed/sarah/200/200', rating: 4.9, isOnline: true },
];

const TrialSuccess: React.FC<TrialSuccessProps> = ({ onStartNow, onScheduleLater, onViewDashboard }) => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative z-10 inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full"
            >
              <CheckCircle className="w-10 h-10 text-emerald-500 stroke-[1.5]" />
            </motion.div>
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-emerald-100 rounded-full -z-0"
            />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-zinc-900 tracking-tight mb-6"
          >
            You're in.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-500 font-medium"
          >
            Your first 15-minute intro session is ready.
          </motion.p>
        </div>

        {/* The "Next Step" Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-10 md:p-12 border-indigo-100 bg-indigo-50/40 rounded-[3rem] shadow-2xl shadow-indigo-500/5 mb-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <Badge color="indigo" className="mb-6 px-4 py-1.5 text-xs font-bold tracking-widest uppercase">Next Step</Badge>
                <h2 className="text-3xl font-black text-zinc-900 mb-6 tracking-tight">Ready to speak?</h2>
                <p className="text-zinc-600 text-lg leading-relaxed mb-8">
                  Find a coach who's online now and start your first conversation in under 60 seconds. 
                  No preparation needed—just you and your voice.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={onStartNow}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-7 text-xl rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] font-black flex-1"
                  >
                    Find a Coach & Start Now
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={onScheduleLater}
                    className="text-zinc-400 hover:text-zinc-600 px-8 py-7 text-lg font-bold border-none bg-transparent hover:bg-zinc-100/50"
                  >
                    Schedule for later
                  </Button>
                </div>
              </div>
              
              {/* Coach Preview */}
              <div className="w-full lg:w-72">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em]">Online Now</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">3 Active</span>
                  </div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-[2rem] border border-white shadow-sm">
                  <div className="flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                    {mockAvailableCoaches.map((coach) => (
                      <div key={coach.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-zinc-50 shadow-sm min-w-[220px] lg:min-w-0 hover:shadow-md transition-shadow">
                        <div className="relative">
                          <img src={coach.avatar} alt={coach.name} className="w-10 h-10 rounded-full object-cover border-2 border-zinc-50" />
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-zinc-900 truncate">{coach.name}</p>
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">Ready Now</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Preparation Micro-module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          <div className="p-8 rounded-[2.5rem] bg-zinc-50/50 border border-zinc-100 flex flex-col items-center text-center gap-5">
            <div className="p-3.5 bg-white rounded-2xl shadow-sm">
              <Video className="w-6 h-6 text-zinc-400" />
            </div>
            <div>
              <p className="text-base font-black text-zinc-900 tracking-tight">Voice-only</p>
              <p className="text-sm text-zinc-500 leading-relaxed">No camera needed. Focus on speaking.</p>
            </div>
          </div>
          <div className="p-8 rounded-[2.5rem] bg-zinc-50/50 border border-zinc-100 flex flex-col items-center text-center gap-5">
            <div className="p-3.5 bg-white rounded-2xl shadow-sm">
              <Clock className="w-6 h-6 text-zinc-400" />
            </div>
            <div>
              <p className="text-base font-black text-zinc-900 tracking-tight">15 Minutes</p>
              <p className="text-sm text-zinc-500 leading-relaxed">Short, high-intensity practice.</p>
            </div>
          </div>
          <div className="p-8 rounded-[2.5rem] bg-zinc-50/50 border border-zinc-100 flex flex-col items-center text-center gap-5">
            <div className="p-3.5 bg-white rounded-2xl shadow-sm">
              <ShieldCheck className="w-6 h-6 text-zinc-400" />
            </div>
            <div>
              <p className="text-base font-black text-zinc-900 tracking-tight">100% Private</p>
              <p className="text-sm text-zinc-500 leading-relaxed">Safe space to make mistakes.</p>
            </div>
          </div>
        </motion.div>

        {/* Risk Reversal Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center pt-12 border-t border-zinc-100"
        >
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
            Not ready? Your session credit never expires.
          </p>
          <button 
            onClick={onViewDashboard}
            className="text-sm font-black text-zinc-400 hover:text-zinc-600 transition-colors underline underline-offset-4 decoration-zinc-200"
          >
            Go to my dashboard
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default TrialSuccess;
