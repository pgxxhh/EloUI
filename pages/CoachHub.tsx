
import React, { useState } from 'react';
import { LessonRequest } from '../types';
import { Button, Card, Badge } from '../components/UI';
import { LessonRequestCard } from '../components/LessonUI';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  Search, 
  Filter, 
  MoreVertical,
  Mail,
  Calendar,
  Star,
  XCircle,
  ArrowUpRight,
  FileText,
  Power,
  Zap,
  Activity,
  Trash2,
  PlusCircle,
  Plus
} from 'lucide-react';

interface AvailabilityBlock {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'OPEN' | 'BOOKED';
}

const mockAvailability: AvailabilityBlock[] = [
  {
    id: 'a1',
    date: 'Mar 6',
    startTime: '3:30 AM',
    endTime: '4:30 AM',
    status: 'OPEN'
  },
  {
    id: 'a2',
    date: 'Mar 13',
    startTime: '6:30 PM',
    endTime: '9:30 PM',
    status: 'OPEN'
  }
];

const mockRequests: LessonRequest[] = [
  {
    id: 'r1',
    type: 'INSTANT',
    coachId: 'c1',
    coachName: 'Coach Wei',
    learnerId: 'l1',
    learnerName: 'Alex Smith',
    duration: 30,
    topic: 'Business Chinese',
    status: 'REQUESTED',
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: 'r2',
    type: 'SCHEDULED',
    coachId: 'c1',
    coachName: 'Coach Wei',
    learnerId: 'l2',
    learnerName: 'Jessica Brown',
    duration: 45,
    topic: 'Pronunciation Drill',
    scheduledTime: 'Tomorrow, 10:30 AM',
    note: 'I want to focus on tones and pinyin today.',
    status: 'REQUESTED',
    createdAt: '2024-03-01T09:30:00Z'
  },
  {
    id: 'r3',
    type: 'SCHEDULED',
    coachId: 'c1',
    coachName: 'Coach Wei',
    learnerId: 'l3',
    learnerName: 'Tom Wilson',
    duration: 60,
    topic: 'HSK 5 Prep',
    scheduledTime: 'Mon, 2:00 PM',
    status: 'REQUESTED',
    createdAt: '2024-03-01T08:00:00Z'
  }
];

interface CoachHubProps {
  onViewEarnings: () => void;
}

const CoachHub: React.FC<CoachHubProps> = ({ onViewEarnings }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [requests, setRequests] = useState<LessonRequest[]>(mockRequests);
  const [availability, setAvailability] = useState<AvailabilityBlock[]>(mockAvailability);
  
  // Form state
  const [newDate, setNewDate] = useState('2024-03-05');
  const [newStartTime, setNewStartTime] = useState('09:00');
  const [newEndTime, setNewEndTime] = useState('10:00');

  const handleAccept = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    // In a real app, we'd navigate to the classroom for instant calls
  };

  const handleDecline = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleAddAvailability = () => {
    const id = Math.random().toString(36).substr(2, 9);
    // Simple formatting for demo
    const dateObj = new Date(newDate);
    const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const newBlock: AvailabilityBlock = {
      id,
      date: dateStr,
      startTime: newStartTime,
      endTime: newEndTime,
      status: 'OPEN'
    };
    setAvailability(prev => [newBlock, ...prev]);
  };

  const handleDeleteAvailability = (id: string) => {
    setAvailability(prev => prev.filter(a => a.id !== id));
  };

  const instantRequests = requests.filter(r => r.type === 'INSTANT');
  const scheduledRequests = requests.filter(r => r.type === 'SCHEDULED');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-in fade-in duration-700">
      {/* Header & Status Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge color="indigo">Coach Hub</Badge>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Unified Dashboard</span>
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
            Manage your lessons <br className="hidden md:block" />
            and availability.
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-zinc-500 max-w-xl">
              Accept instant calls or manage your upcoming bookings. Keep your status updated to receive requests.
            </p>
            <Button 
              onClick={onViewEarnings}
              variant="secondary" 
              className="rounded-xl border-zinc-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              View Earnings
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
          <div className="text-right px-2">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Your Status</p>
            <p className={`text-sm font-bold ${isOnline ? 'text-emerald-600' : 'text-zinc-400'}`}>
              {isOnline ? 'Accepting Calls' : 'Offline'}
            </p>
          </div>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
              isOnline 
                ? 'bg-emerald-500 text-white shadow-emerald-100 rotate-0' 
                : 'bg-zinc-100 text-zinc-400 shadow-zinc-100 rotate-180'
            }`}
          >
            <Power className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4 border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
              <Zap className="w-5 h-5" />
            </div>
            <Badge color="rose" className="text-[10px]">High Priority</Badge>
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Instant Invites</p>
            <p className="text-3xl font-bold text-zinc-900">{instantRequests.length}</p>
          </div>
        </Card>

        <Card className="p-6 space-y-4 border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Calendar className="w-5 h-5" />
            </div>
            <Badge color="indigo" className="text-[10px]">Next: 2h</Badge>
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Scheduled Bookings</p>
            <p className="text-3xl font-bold text-zinc-900">{scheduledRequests.length}</p>
          </div>
        </Card>

        <Card className="p-6 space-y-4 border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Activity className="w-5 h-5" />
            </div>
            <Badge color="green" className="text-[10px]">Top 5%</Badge>
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Acceptance Rate</p>
            <p className="text-3xl font-bold text-zinc-900">98%</p>
          </div>
        </Card>
      </div>

      {/* Requests Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Instant Requests (Urgent) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-rose-500" />
              Live Invites
            </h2>
            <Badge color="rose" className="px-3 py-1 rounded-full">{instantRequests.length} urgent</Badge>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {instantRequests.map(req => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                >
                  <LessonRequestCard 
                    request={req} 
                    onAccept={handleAccept} 
                    onDecline={handleDecline} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {instantRequests.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-zinc-50/50 rounded-3xl border-2 border-dashed border-zinc-200">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-zinc-300">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-zinc-900">No live invites</p>
                  <p className="text-xs text-zinc-400">You'll hear a sound when a student calls.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Scheduled Requests */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              Booking Requests
            </h2>
            <Badge color="zinc" className="px-3 py-1 rounded-full">{scheduledRequests.length} total</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {scheduledRequests.map(req => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  layout
                >
                  <LessonRequestCard 
                    request={req} 
                    onAccept={handleAccept} 
                    onDecline={handleDecline} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {scheduledRequests.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-zinc-50/50 rounded-3xl border-2 border-dashed border-zinc-200">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-zinc-300">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-zinc-900">No booking requests</p>
                <p className="text-xs text-zinc-400">Your future slots are currently open.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Availability Section */}
      <div className="space-y-8 pt-10 border-t border-zinc-100">
        <div className="space-y-1 px-2">
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Availability blocks</h2>
          <p className="text-zinc-500 text-sm">
            Use standard half-hour anchors so learners can scan and book faster.
            <span className="ml-2 text-zinc-400 font-medium">{availability.length} upcoming</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Add Form */}
          <div className="lg:col-span-5">
            <Card className="p-8 space-y-6 border-zinc-100 shadow-xl shadow-zinc-100/50 bg-white">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Start Time</label>
                    <select 
                      value={newStartTime}
                      onChange={(e) => setNewStartTime(e.target.value)}
                      className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                    >
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="08:30 AM">08:30 AM</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="09:30 AM">09:30 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">End Time</label>
                    <select 
                      value={newEndTime}
                      onChange={(e) => setNewEndTime(e.target.value)}
                      className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="09:30 AM">09:30 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleAddAvailability}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 border-none shadow-lg shadow-indigo-100 text-sm font-bold"
              >
                Add availability
              </Button>
            </Card>
          </div>

          {/* Right: List */}
          <div className="lg:col-span-7 space-y-4">
            <AnimatePresence mode="popLayout">
              {availability.map((block) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  layout
                >
                  <Card className="p-6 flex items-center justify-between border-zinc-100 hover:border-indigo-100 transition-all group">
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-zinc-900">
                        {block.date}, {block.startTime} - {block.endTime}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${block.status === 'OPEN' ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
                        <span className="text-xs text-zinc-400 font-medium capitalize">{block.status.toLowerCase()}</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleDeleteAvailability(block.id)}
                      variant="secondary" 
                      className="px-6 py-2 text-xs rounded-xl border-zinc-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all"
                    >
                      Delete
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {availability.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-zinc-50/50 rounded-3xl border-2 border-dashed border-zinc-200">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-zinc-300">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-zinc-900">No availability set</p>
                  <p className="text-xs text-zinc-400">Students cannot book you if you don't open slots.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachHub;
