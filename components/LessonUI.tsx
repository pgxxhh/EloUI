
import React from 'react';
import { Coach, LessonRequest } from '../types';
import { Button, Card, Badge } from './UI';
import { motion } from 'motion/react';
import { 
  Phone, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Star, 
  ChevronRight, 
  AlertCircle,
  Video,
  Mic,
  MessageSquare,
  Sparkles
} from 'lucide-react';

// --- CoachCard ---
export const CoachCard: React.FC<{
  coach: Coach;
  onCallNow: (coach: Coach) => void;
  onBookLater: (coach: Coach) => void;
  onViewDetails: (coach: Coach) => void;
}> = ({ coach, onCallNow, onBookLater, onViewDetails }) => {
  const isOnline = coach.isOnline && !coach.isBusy;
  
  return (
    <Card className="group relative overflow-hidden flex flex-col h-full border-zinc-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-500 bg-white p-0">
      <div className="p-6 flex-1 flex flex-col">
        {/* 1. Avatar & Identity */}
        <div className="flex gap-4 items-start mb-5">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100">
              <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
              coach.isOnline ? (coach.isBusy ? 'bg-rose-500' : 'bg-emerald-500') : 'bg-zinc-300'
            }`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col">
              <h3 className="font-bold text-zinc-900 truncate text-base leading-tight mb-1">{coach.name}</h3>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[10px] font-bold text-zinc-400 uppercase tracking-tight">
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3 h-3 fill-current" />
                  {coach.rating}
                </span>
                <span className="w-0.5 h-0.5 rounded-full bg-zinc-300 hidden sm:block" />
                <span className="whitespace-nowrap">{coach.lessonCount}+ sessions</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Headline & Expertise */}
        <div className="flex-1">
          <p className="text-sm font-bold text-zinc-800 line-clamp-2 leading-snug mb-4">
            {coach.headline}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {coach.specialties.slice(0, 2).map(tag => (
              <span key={tag} className="text-[9px] font-bold px-2 py-0.5 bg-zinc-50 text-zinc-500 rounded-md border border-zinc-100 uppercase tracking-tight">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Decision Support & Actions */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
              <Clock className="w-3.5 h-3.5 opacity-50" />
              <span className="truncate max-w-[120px]">{isOnline ? 'Ready now' : `Next: ${coach.nextSlot || 'TBD'}`}</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onViewDetails(coach)}
                className="text-[11px] font-bold text-zinc-400 hover:text-indigo-600 transition-colors whitespace-nowrap"
              >
                Full Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant={isOnline ? 'primary' : 'secondary'}
              disabled={!isOnline}
              onClick={() => onCallNow(coach)}
              className={`py-2.5 text-[11px] font-bold rounded-xl ${isOnline ? 'bg-indigo-600 shadow-md shadow-indigo-100' : 'bg-zinc-50 text-zinc-300 border border-zinc-100'}`}
            >
              <Phone className="w-3 h-3" />
              Call now
            </Button>
            <Button 
              variant="secondary"
              onClick={() => onBookLater(coach)}
              className="py-2.5 text-[11px] font-bold rounded-xl bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300"
            >
              <Calendar className="w-3 h-3" />
              Book
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// --- DurationPicker ---
export const DurationPicker: React.FC<{
  value: number;
  onChange: (val: 15 | 30 | 45 | 60) => void;
}> = ({ value, onChange }) => {
  const options: (15 | 30 | 45 | 60)[] = [15, 30, 45, 60];
  return (
    <div className="grid grid-cols-4 gap-2">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`py-3 rounded-xl border-2 transition-all text-sm font-bold ${
            value === opt 
              ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
              : 'border-zinc-100 bg-white text-zinc-500 hover:border-zinc-200'
          }`}
        >
          {opt}m
        </button>
      ))}
    </div>
  );
};

// --- LessonRequestCard (Coach Hub) ---
export const LessonRequestCard: React.FC<{
  request: LessonRequest;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}> = ({ request, onAccept, onDecline }) => {
  const isInstant = request.type === 'INSTANT';
  
  return (
    <Card className={`border-l-4 ${isInstant ? 'border-l-rose-500' : 'border-l-indigo-500'} p-5`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-100 overflow-hidden">
            <img src={`https://picsum.photos/seed/${request.learnerName}/100/100`} alt={request.learnerName} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-zinc-900">{request.learnerName}</h4>
              <Badge color={isInstant ? 'rose' : 'indigo'}>
                {isInstant ? 'Instant Call' : 'Scheduled'}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {request.duration} min</span>
              <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {request.topic}</span>
            </div>
          </div>
        </div>
        {isInstant && (
          <div className="text-right">
            <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1 animate-pulse">Urgent</div>
            <div className="text-xs font-mono text-zinc-400">Expiring in 45s</div>
          </div>
        )}
      </div>

      {!isInstant && request.scheduledTime && (
        <div className="mb-4 p-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <Calendar className="w-4 h-4 text-zinc-400" />
            <span className="font-medium">{request.scheduledTime}</span>
          </div>
          <span className="text-xs text-zinc-400">Local Time</span>
        </div>
      )}

      {request.note && (
        <div className="mb-5 text-sm text-zinc-500 bg-zinc-50/50 p-3 rounded-xl italic">
          "{request.note}"
        </div>
      )}

      <div className="flex gap-3">
        <Button 
          variant="secondary" 
          onClick={() => onDecline(request.id)}
          className="flex-1 py-2.5 text-sm"
        >
          Decline
        </Button>
        <Button 
          onClick={() => onAccept(request.id)}
          className={`flex-1 py-2.5 text-sm ${isInstant ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-100' : ''}`}
        >
          {isInstant ? 'Accept & Start' : 'Confirm Lesson'}
        </Button>
      </div>
    </Card>
  );
};

// --- UserBookingCard (Student View) ---
export const UserBookingCard: React.FC<{
  booking: LessonRequest;
  onJoin?: (id: string) => void;
  onCancel?: (id: string) => void;
}> = ({ booking, onJoin, onCancel }) => {
  const isConfirmed = booking.status === 'CONFIRMED';
  const isRequested = booking.status === 'REQUESTED';
  
  // Simulate "Starting soon" if it's confirmed and within 15 mins (mock logic)
  const isStartingSoon = isConfirmed && booking.scheduledTime?.includes('Today');

  return (
    <Card className={`group relative overflow-hidden border-zinc-100 hover:border-indigo-100 transition-all duration-300 ${isStartingSoon ? 'bg-indigo-50/30' : ''}`}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
            <img src={booking.coachAvatar || `https://picsum.photos/seed/${booking.coachName}/100/100`} alt={booking.coachName} className="w-full h-full object-cover" />
          </div>
          {isStartingSoon && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-zinc-900 truncate">{booking.coachName}</h4>
            {isStartingSoon ? (
              <Badge color="green">Starting Soon</Badge>
            ) : isConfirmed ? (
              <Badge color="indigo">Confirmed</Badge>
            ) : (
              <Badge color="zinc">Pending</Badge>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="w-3 h-3" /> {booking.scheduledTime}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {booking.duration} min
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isStartingSoon ? (
            <Button onClick={() => onJoin?.(booking.id)} className="py-2 px-6 text-xs rounded-xl shadow-indigo-200">
              Join Now
            </Button>
          ) : isRequested ? (
            <Button variant="ghost" onClick={() => onCancel?.(booking.id)} className="py-2 px-4 text-xs rounded-xl text-zinc-400 hover:text-rose-500">
              Cancel
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => onJoin?.(booking.id)} className="py-2 px-4 text-xs rounded-xl">
              Details
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

// --- LessonTimerBar ---
export const LessonTimerBar: React.FC<{
  timeLeft: number; // in seconds
  totalTime: number; // in seconds
  status: 'LIVE' | 'ENDING_SOON' | 'ENDED';
}> = ({ timeLeft, totalTime, status }) => {
  const progress = (timeLeft / totalTime) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const isEndingSoon = status === 'ENDING_SOON';

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-end">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Time Remaining</p>
          <p className={`text-2xl font-mono font-bold ${isEndingSoon ? 'text-rose-600 animate-pulse' : 'text-zinc-900'}`}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </p>
        </div>
        {isEndingSoon && (
          <Badge color="rose" className="mb-1">Ending Soon</Badge>
        )}
      </div>
      <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          className={`h-full transition-colors duration-500 ${isEndingSoon ? 'bg-rose-500' : 'bg-emerald-500'}`}
        />
      </div>
    </div>
  );
};
