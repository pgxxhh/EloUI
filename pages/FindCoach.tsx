
import React, { useState } from 'react';
import { Coach, LessonRequest, Scenario } from '../types';
import { Button, Card, Badge, Modal } from '../components/UI';
import { Icons } from '../constants';
import { CoachCard, DurationPicker } from '../components/LessonUI';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Clock, 
  Wallet, 
  ArrowRight,
  CheckCircle,
  X,
  MessageSquare,
  Sparkles,
  Calendar,
  Zap,
  Mic,
  Star
} from 'lucide-react';

import { SCENARIOS } from '../constants';

const mockCoaches: Coach[] = [
  {
    id: 'c1',
    name: 'Coach Wei',
    avatar: 'https://picsum.photos/seed/wei/200/200',
    headline: 'Conversational Fluency & Cultural Nuance Expert',
    bio: 'Passionate about helping students overcome the "speaking wall". I focus on conversational fluency and cultural nuances.',
    fullBio: 'Hello! I am Coach Wei. I have been teaching Mandarin for over 5 years. My approach is centered around real-world application. We won\'t just study grammar; we will talk about life, business, and everything in between. I specialize in helping intermediate learners reach that next level of comfort.',
    specialties: ['Business', 'HSK 4-6', 'Slang'],
    teachingStyles: ['Patient', 'Encouraging', 'Structured'],
    languages: ['Mandarin', 'English', 'Cantonese'],
    location: 'Beijing, China',
    timezone: 'GMT+8',
    isOnline: true,
    isBusy: false,
    nextSlot: 'Today, 4:30 PM',
    rating: 4.9,
    lessonCount: 1240,
    introAudioUrl: '#',
    introAudioDuration: '0:45'
  },
  {
    id: 'c2',
    name: 'Coach Lin',
    avatar: 'https://picsum.photos/seed/lin/200/200',
    headline: 'Pronunciation & Tone Correction Specialist',
    bio: 'I specialize in pronunciation and tone correction. My sessions are structured but relaxed.',
    fullBio: 'Tones are the hardest part of Chinese, but they don\'t have to be! I have developed a unique method for helping non-native speakers master the four tones through music and rhythm. Whether you are a total beginner or just want to polish your accent, I can help.',
    specialties: ['Pronunciation', 'Beginner', 'Kids'],
    teachingStyles: ['Detail-oriented', 'Fun', 'Rhythmic'],
    languages: ['Mandarin', 'English'],
    location: 'Taipei, Taiwan',
    timezone: 'GMT+8',
    isOnline: true,
    isBusy: true,
    nextSlot: 'Tomorrow, 10:00 AM',
    rating: 5.0,
    lessonCount: 850,
    introAudioUrl: '#',
    introAudioDuration: '0:32'
  },
  {
    id: 'c3',
    name: 'Coach Chen',
    avatar: 'https://picsum.photos/seed/chen/200/200',
    headline: 'Casual Conversation & Slang Enthusiast',
    bio: 'University student, native speaker, language exchange enthusiast. I love meeting new people.',
    fullBio: 'Hey there! I\'m Chen. I\'m currently a student in Shanghai. I love talking about movies, music, and gaming. If you want to learn how young people actually talk in China today—including all the latest internet slang—let\'s have a chat!',
    specialties: ['Casual', 'Slang', 'Travel'],
    teachingStyles: ['Friendly', 'Informal', 'Energetic'],
    languages: ['Mandarin', 'English', 'Japanese'],
    location: 'Shanghai, China',
    timezone: 'GMT+8',
    isOnline: false,
    nextSlot: 'Mon, 9:00 AM',
    rating: 4.8,
    lessonCount: 320,
    introAudioUrl: '#',
    introAudioDuration: '0:28'
  },
  {
    id: 'c4',
    name: 'Coach Sarah',
    avatar: 'https://picsum.photos/seed/sarah/200/200',
    headline: 'Certified HSK Instructor & Grammar Expert',
    bio: 'Certified HSK instructor with 5 years of online tutoring experience. Let\'s reach your goals together.',
    fullBio: 'Passing the HSK requires a specific strategy. I have helped hundreds of students pass their exams with high scores. We will focus on the specific vocabulary and grammar points you need, while also building the confidence to use them in real conversation.',
    specialties: ['HSK 1-3', 'Grammar', 'Exam Prep'],
    teachingStyles: ['Academic', 'Goal-oriented', 'Clear'],
    languages: ['Mandarin', 'English'],
    location: 'Chengdu, China',
    timezone: 'GMT+8',
    isOnline: true,
    isBusy: false,
    nextSlot: 'Today, 2:00 PM',
    rating: 4.9,
    lessonCount: 2100,
    introAudioUrl: '#',
    introAudioDuration: '1:05'
  }
];

interface FindCoachProps {
  selectedContextId: string | null;
  onStartLesson: (type: 'VOICE' | 'VIDEO', coach: Coach) => void;
  onBack: () => void;
}

const FindCoach: React.FC<FindCoachProps> = ({ selectedContextId, onStartLesson, onBack }) => {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [viewDetailsCoach, setViewDetailsCoach] = useState<Coach | null>(null);
  const [setupMode, setSetupMode] = useState<'INSTANT' | 'SCHEDULED' | null>(null);
  const [duration, setDuration] = useState<15 | 30 | 45 | 60>(30);
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All coaches');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Soonest');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const selectedContext = SCENARIOS.find(s => s.id === selectedContextId);

  const filteredCoaches = mockCoaches.filter(coach => {
    const matchesSearch = coach.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         coach.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFilter === 'All coaches') return matchesSearch;
    if (activeFilter === 'Available now') return matchesSearch && coach.isOnline && !coach.isBusy;
    return matchesSearch && (coach.specialties.includes(activeFilter) || coach.teachingStyles.includes(activeFilter));
  });

  const handleCallNow = (coach: Coach) => {
    setSelectedCoach(coach);
    setSetupMode('INSTANT');
    setViewDetailsCoach(null);
  };

  const handleBookLater = (coach: Coach) => {
    setSelectedCoach(coach);
    setSetupMode('SCHEDULED');
    setViewDetailsCoach(null);
  };

  const handleStartLesson = () => {
    if (!selectedCoach) return;
    setIsRequesting(true);
    // Short delay for the "Connecting..." feel before switching to Matching page
    setTimeout(() => {
      setIsRequesting(false);
      onStartLesson('VOICE', selectedCoach);
    }, 1500);
  };

  const closeModal = () => {
    setSelectedCoach(null);
    setSetupMode(null);
    setRequestSent(false);
  };

  const filters = [
    'All coaches',
    'Available now',
    'Beginner-friendly',
    'Pronunciation',
    'HSK',
    'Business',
    'Open conversation'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-700">
      {/* 1. Utility & Status Bar (Integrated) */}
      <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-4">
        <div className="flex items-center gap-4">
          <span className="text-zinc-300">Chinese Practice Hub</span>
          <span className="w-1 h-1 rounded-full bg-zinc-200" />
          <span className="text-indigo-500">Global Network</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Wallet className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-zinc-600">215 min available</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-600">Your Time: 07:27 AM</span>
          </div>
        </div>
      </div>

      {/* 2. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
            Choose your coach
          </h1>
          <p className="text-zinc-500 text-sm max-w-xl">
            Connect with a native speaker for a 1:1 conversation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-[0.2em]">Session Summary</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-zinc-500">
                {selectedContext?.chineseTitle || 'Open Conversation'}
              </span>
              <button 
                onClick={onBack}
                className="text-[9px] font-bold text-indigo-400 hover:text-indigo-600 uppercase tracking-widest transition-colors"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Belt */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search coaches by name, specialty, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-zinc-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="bg-white border border-zinc-100 py-3.5 px-4 rounded-2xl text-xs font-bold text-zinc-600 whitespace-nowrap">
              Sort: {sortBy}
              <ChevronDown className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all ${
                activeFilter === f 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-zinc-500 border border-zinc-100 hover:border-zinc-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Coach Grid */}
      {filteredCoaches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCoaches.map(coach => (
            <CoachCard 
              key={coach.id} 
              coach={coach} 
              onCallNow={handleCallNow}
              onBookLater={handleBookLater}
              onViewDetails={setViewDetailsCoach}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-white rounded-[3rem] border border-zinc-100 border-dashed">
          <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-300">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-zinc-900">No matching coaches right now.</h3>
            <p className="text-sm text-zinc-500">Try adjusting your filters or searching for something else.</p>
          </div>
          <Button 
            variant="secondary" 
            onClick={() => {
              setActiveFilter('All coaches');
              setSearchQuery('');
            }}
            className="rounded-xl px-6"
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* 4. View Details Drawer */}
      <AnimatePresence>
        {viewDetailsCoach && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewDetailsCoach(null)}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8 space-y-10 pb-32">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-6 items-center">
                    <div className="w-24 h-24 rounded-[2.5rem] overflow-hidden border-4 border-zinc-50 shadow-lg">
                      <img src={viewDetailsCoach.avatar} alt={viewDetailsCoach.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-3xl font-bold text-zinc-900">{viewDetailsCoach.name}</h2>
                      <p className="text-indigo-600 font-medium">{viewDetailsCoach.headline}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setViewDetailsCoach(null)}
                    className="p-2 bg-zinc-50 rounded-full text-zinc-400 hover:text-zinc-900 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                  {/* Listen First */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Listen First</h4>
                    <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 flex items-center gap-6">
                      <button className="w-14 h-14 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                        <Mic className="w-6 h-6" />
                      </button>
                      <div className="flex-1 space-y-2">
                        <div className="h-1.5 w-full bg-indigo-200 rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-indigo-600 rounded-full" />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-indigo-400">
                          <span>0:00</span>
                          <span>{viewDetailsCoach.introAudioDuration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* About */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">About this coach</h4>
                    <p className="text-zinc-600 leading-relaxed text-lg">
                      {viewDetailsCoach.fullBio}
                    </p>
                  </div>

                  {/* Expertise Grid */}
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {viewDetailsCoach.specialties.map(s => (
                          <Badge key={s} color="indigo" className="px-3 py-1 rounded-lg">{s}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Teaching Style</h4>
                      <div className="flex flex-wrap gap-2">
                        {viewDetailsCoach.teachingStyles.map(s => (
                          <Badge key={s} color="zinc" className="px-3 py-1 rounded-lg">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Details List */}
                  <div className="grid grid-cols-2 gap-6 p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100">
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Languages</p>
                      <p className="text-sm font-bold text-zinc-900">{viewDetailsCoach.languages.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Location</p>
                      <p className="text-sm font-bold text-zinc-900">{viewDetailsCoach.location} ({viewDetailsCoach.timezone})</p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Availability</h4>
                    <div className="p-6 border border-zinc-100 rounded-[2rem] space-y-4">
                      {viewDetailsCoach.nextSlot ? (
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <p className="text-xs text-zinc-500">Next available slot</p>
                            <p className="text-lg font-bold text-zinc-900">{viewDetailsCoach.nextSlot}</p>
                            <p className="text-[10px] text-zinc-400 italic">Coach time: Tomorrow, 7:30 AM</p>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <Calendar className="w-6 h-6" />
                          </div>
                        </div>
                      ) : (
                        <p className="text-zinc-400 italic text-sm">No future slot available</p>
                      )}
                    </div>
                  </div>

                  {/* Trust Signal */}
                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-bold">{viewDetailsCoach.lessonCount}+ sessions completed</span>
                  </div>
                </div>
              </div>

              {/* Sticky Footer Actions */}
              <div className="sticky bottom-0 left-0 right-0 p-8 bg-white/90 backdrop-blur-md border-t border-zinc-100 grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleCallNow(viewDetailsCoach)}
                  disabled={!viewDetailsCoach.isOnline || viewDetailsCoach.isBusy}
                  className="py-4 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-100 font-bold"
                >
                  Call now
                </Button>
                <Button 
                  onClick={() => handleBookLater(viewDetailsCoach)}
                  variant="secondary"
                  className="py-4 rounded-2xl bg-white border border-zinc-200 font-bold text-zinc-600"
                >
                  Book later
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 5. Setup Modal (Call Now / Book Later) */}
      <Modal isOpen={!!selectedCoach} onClose={closeModal}>
        <AnimatePresence mode="wait">
          <motion.div 
            key="setup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100">
                  <img src={selectedCoach?.avatar} alt={selectedCoach?.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-zinc-900">{selectedCoach?.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-[10px] font-bold text-zinc-900">{selectedCoach?.rating}</span>
                    </div>
                    <span className="w-0.5 h-0.5 rounded-full bg-zinc-200" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      {setupMode === 'INSTANT' ? 'Ready for session' : 'Schedule for later'}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={closeModal} className="p-2 text-zinc-300 hover:text-zinc-900 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Coach Trust Snippet (Audio + Bio) */}
            <div className="p-5 bg-zinc-50 rounded-[2rem] border border-zinc-100 space-y-4">
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
                  <Mic className="w-4 h-4" />
                </button>
                <div className="flex-1 space-y-1.5">
                  <div className="h-1 w-full bg-zinc-200 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-indigo-500" />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-zinc-400">
                    <span>0:00</span>
                    <span>{selectedCoach?.introAudioDuration}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed italic line-clamp-2">
                "{selectedCoach?.bio}"
              </p>
            </div>

            {/* Setup Form */}
            <div className="space-y-8">
              {/* Time Slot for Scheduled - Highest Priority for Book Later */}
              {setupMode === 'SCHEDULED' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      Select Time
                    </label>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Required</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['Today, 4:30 PM', 'Today, 5:00 PM', 'Today, 5:30 PM', 'Today, 6:00 PM'].map(slot => (
                      <button 
                        key={slot} 
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-4 text-left rounded-2xl border transition-all relative ${
                          selectedSlot === slot 
                            ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500/10' 
                            : 'border-zinc-100 bg-white hover:border-zinc-200'
                        }`}
                      >
                        <p className={`text-sm font-bold ${selectedSlot === slot ? 'text-indigo-700' : 'text-zinc-900'}`}>{slot}</p>
                        <p className="text-[10px] text-zinc-400 mt-1">Coach local time: 07:30 AM</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Duration - Primary */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    Session Duration
                  </label>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Required</span>
                </div>
                <DurationPicker value={duration} onChange={setDuration} />
              </div>

              {/* Topic - Downgraded to a light session summary note */}
              <div className="space-y-2 pt-4 border-t border-zinc-50">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] font-bold text-zinc-300 uppercase tracking-[0.2em]">
                    Session Note (Optional Starter)
                  </label>
                  <button 
                    onClick={onBack}
                    className="text-[9px] font-bold text-indigo-300 hover:text-indigo-500 uppercase tracking-widest transition-colors"
                  >
                    Change
                  </button>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 bg-zinc-50/30 rounded-xl border border-zinc-100/50">
                  <div className="w-4 h-4 rounded bg-white flex items-center justify-center text-zinc-300 shadow-sm border border-zinc-100">
                    <Sparkles className="w-2 h-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-zinc-500 truncate">
                      {selectedContext?.chineseTitle || 'Open Conversation'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet Summary */}
            <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Zap className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Wallet Status</span>
                </div>
                <span className="text-xs font-bold text-indigo-600">215 min available</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Session Cost</p>
                  <p className="text-3xl font-bold text-zinc-900">{duration} <span className="text-sm font-normal text-zinc-400">min</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Expected End</p>
                  <p className="text-lg font-bold text-zinc-900 opacity-80">08:15 AM</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="ghost" onClick={closeModal} className="flex-1 py-4 rounded-2xl text-zinc-400 font-bold hover:bg-zinc-50">
                Cancel
              </Button>
              <Button 
                onClick={handleStartLesson}
                disabled={isRequesting}
                className="flex-[2] py-4 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 font-bold"
              >
                {isRequesting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {setupMode === 'INSTANT' ? 'Connecting...' : 'Booking...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {setupMode === 'INSTANT' ? 'Confirm and Start' : 'Confirm Booking'}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </Modal>
    </div>
  );
};

export default FindCoach;
