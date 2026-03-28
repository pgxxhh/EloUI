
import React, { useState } from 'react';
import { Button, Card, Badge } from '../components/UI';
import { SCENARIOS, Icons } from '../constants';
import { UserBookingCard } from '../components/LessonUI';
import { LessonRequest, Scenario } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface StudentHomeProps {
  selectedContextId: string | null;
  setSelectedContextId: (id: string | null) => void;
  onStartSession: () => void;
  onGoToPayment: () => void;
  onGoToHistory: () => void;
  onJoinLesson: (bookingId: string) => void;
}

const MOCK_BOOKINGS: LessonRequest[] = [
  {
    id: 'b1',
    type: 'SCHEDULED',
    coachId: 'c1',
    coachName: 'Coach Wei',
    coachAvatar: 'https://picsum.photos/seed/wei/200/200',
    learnerId: 'u1',
    learnerName: 'Alex',
    duration: 30,
    topic: 'Business Chinese',
    status: 'CONFIRMED',
    scheduledTime: 'Today, 4:30 PM',
    createdAt: new Date().toISOString()
  },
  {
    id: 'b2',
    type: 'SCHEDULED',
    coachId: 'c2',
    coachName: 'Coach Lin',
    coachAvatar: 'https://picsum.photos/seed/lin/200/200',
    learnerId: 'u1',
    learnerName: 'Alex',
    duration: 15,
    topic: 'Pronunciation Drill',
    status: 'REQUESTED',
    scheduledTime: 'Tomorrow, 10:00 AM',
    createdAt: new Date().toISOString()
  }
];

const StudentHome: React.FC<StudentHomeProps> = ({ 
  selectedContextId, 
  setSelectedContextId, 
  onStartSession, 
  onGoToPayment, 
  onGoToHistory, 
  onJoinLesson 
}) => {
  const [isViewAll, setIsViewAll] = useState(false);

  const selectedContext = SCENARIOS.find(s => s.id === selectedContextId);
  const displayedScenarios = isViewAll ? SCENARIOS : SCENARIOS.slice(0, 3);

  return (
    <div className="space-y-20 animate-in fade-in duration-1000 pb-32">
      {/* Hero Section */}
      <div className="relative text-center space-y-8 py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">12 Coaches ready now</span>
          </div>
          
          <h1 className="text-6xl font-bold text-zinc-900 tracking-tight leading-tight">
            Ready to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">open your mouth?</span>
          </h1>
          <p className="text-zinc-500 text-xl max-w-2xl mx-auto leading-relaxed">
            Connect with a supportive native coach for a live, 1:1 conversation. 
            No pressure, no curriculum—just real speaking practice.
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={onStartSession} className="px-12 py-8 text-xl rounded-3xl shadow-2xl shadow-indigo-200 hover:scale-[1.02] transition-all bg-indigo-600 text-white font-black">
              <Icons.Mic className="w-6 h-6" />
              Talk Now
            </Button>
            <Button onClick={onStartSession} variant="secondary" className="px-10 py-8 text-xl rounded-3xl bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-900 font-bold shadow-xl shadow-zinc-100">
              <Icons.Users className="w-6 h-6 text-indigo-500" />
              Choose a Coach
            </Button>
          </div>
          
          <div className="flex items-center gap-8 py-4 px-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-zinc-100 shadow-sm">
            <button onClick={onGoToHistory} className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-indigo-600 transition-colors">
              <Icons.Clock className="w-4 h-4" />
              History
            </button>
            <div className="w-px h-4 bg-zinc-200" />
            <button onClick={onGoToPayment} className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-indigo-600 transition-colors">
              <Icons.Wallet className="w-4 h-4" />
              Billing
            </button>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <p className="text-sm text-zinc-400 font-medium flex items-center gap-2">
              <Icons.Clock className="w-4 h-4" />
              Wait time: <span className="text-zinc-900 font-bold">~2 mins</span>
            </p>
            <div className="w-px h-4 bg-zinc-200" />
            <p className="text-sm text-zinc-400 font-medium flex items-center gap-2">
              <Icons.ShieldCheck className="w-4 h-4" />
              Voice-only privacy
            </p>
          </div>
        </div>
      </div>

      {/* My Bookings Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-end px-2">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Upcoming Sessions</h2>
            <p className="text-zinc-500 text-sm">Your scheduled practice times.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {MOCK_BOOKINGS.map(booking => (
            <UserBookingCard 
              key={booking.id} 
              booking={booking} 
              onJoin={() => onJoinLesson(booking.id)}
            />
          ))}
          {MOCK_BOOKINGS.length === 0 && (
            <Card className="p-12 text-center border-dashed border-2 border-zinc-100 bg-zinc-50/30">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Icons.Calendar className="w-6 h-6 text-zinc-300" />
              </div>
              <p className="text-zinc-900 font-bold">No upcoming bookings</p>
              <p className="text-zinc-400 text-xs mt-1">Schedule your first lesson with a coach.</p>
            </Card>
          )}
        </div>
      </section>

      {/* Optional Starters Section - Light Inspiration */}
      <section className="space-y-6 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-100">
              <Icons.Sparkles className="w-4 h-4 text-zinc-300" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Inspiration <span className="text-zinc-400 font-normal">(Optional Starters)</span></h2>
              <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Pick a topic to start, or just jump into an open conversation.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsViewAll(!isViewAll)}
            className="text-[10px] font-bold text-zinc-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
          >
            {isViewAll ? 'Show less' : 'Browse all'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {/* Open Conversation - The explicit default */}
            <motion.div layout>
              <button 
                onClick={() => setSelectedContextId(null)}
                className={`px-5 py-2.5 rounded-xl border-2 transition-all flex items-center gap-2.5 ${
                  selectedContextId === null 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' 
                    : 'border-zinc-100 bg-white text-zinc-500 hover:border-zinc-200'
                }`}
              >
                <Icons.MessageSquare className={`w-3.5 h-3.5 ${selectedContextId === null ? 'text-indigo-600' : 'text-zinc-300'}`} />
                <span className="text-xs font-bold">Open Conversation</span>
              </button>
            </motion.div>

            {displayedScenarios.map((scenario) => (
              <motion.div
                key={scenario.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <button 
                  onClick={() => setSelectedContextId(scenario.id)}
                  className={`px-5 py-2.5 rounded-xl border-2 transition-all flex items-center gap-2.5 ${
                    selectedContextId === scenario.id 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' 
                      : 'border-zinc-100 bg-white text-zinc-500 hover:border-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{scenario.chineseTitle}</span>
                    <Badge color={selectedContextId === scenario.id ? 'indigo' : 'zinc'} className="text-[8px] px-1 py-0 opacity-70">
                      {scenario.level}
                    </Badge>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Selection Feedback & Action Bar */}
        <AnimatePresence>
          {selectedContext && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-40"
            >
              <div className="bg-zinc-900 text-white p-6 rounded-3xl shadow-2xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30">
                    <Icons.Mic className="w-7 h-7 text-indigo-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Ready to practice</span>
                      <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{selectedContext.duration} session</span>
                    </div>
                    <h4 className="text-xl font-bold tracking-tight">
                      {selectedContext.chineseTitle} <span className="text-zinc-500 font-normal">/ {selectedContext.title}</span>
                    </h4>
                    <p className="text-zinc-400 text-xs">Your goal: {selectedContext.outcome}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Button 
                    onClick={onStartSession}
                    className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                  >
                    <Icons.Mic className="w-5 h-5" />
                    Call Now
                  </Button>
                  <Button 
                    variant="secondary"
                    className="flex-1 md:flex-none bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <Icons.Calendar className="w-5 h-5" />
                    Book Later
                  </Button>
                  <button 
                    onClick={() => setSelectedContextId(null)}
                    className="p-4 text-zinc-500 hover:text-white transition-colors"
                  >
                    <Icons.ArrowRight className="w-5 h-5 rotate-180" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default StudentHome;
