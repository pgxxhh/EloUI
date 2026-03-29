
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
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full mb-6"
          >
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-zinc-900 tracking-tight mb-4"
          >
            You're in.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-500"
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
          <Card className="p-8 border-indigo-100 bg-indigo-50/30 shadow-xl shadow-indigo-500/5 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <Badge color="indigo" className="mb-4">Next Step</Badge>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">Ready to speak?</h2>
                <p className="text-zinc-600 mb-6">
                  Find a coach who's online now and start your first conversation in under 60 seconds. 
                  No preparation needed—just you and your voice.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={onStartNow}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-indigo-200"
                  >
                    Find a Coach & Start Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={onScheduleLater}
                    className="text-zinc-500 hover:text-zinc-900 px-8 py-6 text-lg"
                  >
                    Schedule for later
                  </Button>
                </div>
              </div>
              
              {/* Coach Preview */}
              <div className="w-full md:w-64">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 text-center md:text-left">Available Now</p>
                <div className="flex md:flex-col gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                  {mockAvailableCoaches.map((coach) => (
                    <div key={coach.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-zinc-100 shadow-sm min-w-[200px] md:min-w-0">
                      <div className="relative">
                        <img src={coach.avatar} alt={coach.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-zinc-900 truncate">{coach.name}</p>
                        <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="text-[10px] font-bold text-zinc-400">Ready</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-4">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Video className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">Voice-only</p>
              <p className="text-xs text-zinc-500">No camera needed. Focus on speaking.</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-4">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Clock className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">15 Minutes</p>
              <p className="text-xs text-zinc-500">Short, high-intensity practice.</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-4">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <ShieldCheck className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">100% Private</p>
              <p className="text-xs text-zinc-500">Safe space to make mistakes.</p>
            </div>
          </div>
        </motion.div>

        {/* Risk Reversal Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-zinc-400 mb-4">
            Not ready? Your session credit never expires.
          </p>
          <button 
            onClick={onViewDashboard}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Go to my dashboard
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default TrialSuccess;
