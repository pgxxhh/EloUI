
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
  onGoToBookings: () => void;
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
  onGoToBookings, 
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
        
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={onStartSession} className="px-12 py-6 text-lg rounded-2xl shadow-xl shadow-indigo-100 hover:scale-[1.02] transition-all">
              <Icons.Mic className="w-5 h-5" />
              Start Live Conversation
            </Button>
            <Button onClick={onGoToBookings} variant="secondary" className="px-8 py-6 text-lg rounded-2xl bg-white border-zinc-200 hover:bg-zinc-50">
              <Icons.Calendar className="w-5 h-5 text-indigo-500" />
              Book a Coach
            </Button>
          </div>
          <div className="flex items-center gap-6">
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
            <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">My Bookings</h2>
            <p className="text-zinc-500 text-sm">Your upcoming sessions and requests.</p>
          </div>
          <button 
            onClick={onGoToBookings}
            className="text-indigo-600 text-sm font-bold hover:underline px-4 py-2 bg-indigo-50 rounded-full transition-colors flex items-center gap-2"
          >
            View all bookings
            <Icons.ArrowRight className="w-4 h-4" />
          </button>
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

      {/* Optional Starters Section */}
      <section className="space-y-10 relative" id="daily-contexts">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge color="zinc" variant="outline" className="bg-zinc-50/50 border-zinc-100 text-[10px] uppercase tracking-widest font-bold">
                Optional Starters
              </Badge>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Need help starting?</span>
            </div>
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
              Conversation Starters
            </h2>
            <p className="text-zinc-500 text-lg">
              Pick a topic to anchor your session, or just skip and talk about anything.
            </p>
          </div>
          <button 
            onClick={() => setIsViewAll(!isViewAll)}
            className="text-zinc-500 text-sm font-bold hover:text-zinc-900 px-6 py-3 bg-zinc-100 rounded-2xl transition-all hover:bg-zinc-200 flex items-center gap-2"
          >
            {isViewAll ? 'Show less' : 'Browse all starters'}
            <Icons.ArrowRight className={`w-4 h-4 transition-transform ${isViewAll ? '-rotate-90' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedScenarios.length > 0 ? (
              displayedScenarios.map((scenario) => (
                <motion.div
                  key={scenario.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    onClick={() => setSelectedContextId(scenario.id)}
                    className={`group cursor-pointer transition-all duration-500 relative overflow-hidden h-full flex flex-col border-2 ${
                      selectedContextId === scenario.id 
                        ? 'border-indigo-500 ring-4 ring-indigo-500/10 bg-indigo-50/30' 
                        : 'hover:border-indigo-200 border-zinc-100 grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                    }`}
                  >
                    {scenario.recommendationTag && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-indigo-600 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-bl-xl shadow-sm">
                          {scenario.recommendationTag}
                        </div>
                      </div>
                    )}

                    <div className="space-y-6 flex-1">
                      <div className="flex justify-between items-start">
                        <Badge color={selectedContextId === scenario.id ? 'indigo' : 'zinc'}>
                          {scenario.level}
                        </Badge>
                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
                          {scenario.duration}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-zinc-900 leading-tight">
                          {scenario.chineseTitle} 
                          <span className="block text-zinc-400 text-lg font-medium mt-0.5">{scenario.title}</span>
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-2 text-zinc-600">
                          <div className="mt-1 p-1 bg-emerald-100 rounded-full">
                            <Icons.Check className="w-3 h-3 text-emerald-600" />
                          </div>
                          <p className="text-sm font-medium leading-snug">
                            <span className="text-zinc-400 font-bold text-[10px] uppercase block mb-0.5">Your Goal</span>
                            {scenario.outcome}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {scenario.keywords.map((kw, idx) => (
                            <span key={idx} className="px-2 py-1 bg-zinc-100 text-zinc-500 text-[10px] font-bold rounded-lg border border-zinc-200/50">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          {scenario.activeCoaches} coaches available
                        </span>
                      </div>
                      <div className={`p-2 rounded-xl transition-colors ${selectedContextId === scenario.id ? 'bg-indigo-600 text-white' : 'bg-zinc-50 text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'}`}>
                        <Icons.Check className="w-4 h-4" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
                <p className="text-zinc-400">No contexts available for your current level. Try changing your goal!</p>
              </motion.div>
            )}
            {!isViewAll && (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="flex flex-col items-center justify-center border-dashed border-2 border-zinc-200 bg-zinc-50/50 text-center cursor-pointer hover:bg-zinc-100 transition-all h-full min-h-[320px]">
                  <div className="p-5 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Icons.Sparkles className="w-8 h-8 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 tracking-tight">Open Conversation</h3>
                  <p className="text-zinc-400 text-sm px-12 mt-2 leading-relaxed">No topic, no plan. Just start talking and see where it goes.</p>
                  <Button onClick={onStartSession} variant="ghost" className="mt-6 text-indigo-600 font-bold">Start Open Chat</Button>
                </Card>
              </motion.div>
            )}
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
