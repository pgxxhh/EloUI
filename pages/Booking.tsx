
import React, { useState } from 'react';
import { Button, Card, Badge } from '../components/UI';
import { Icons } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Clock, Info, Sparkles, Plus, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Coach {
  id: string;
  name: string;
  avatar: string;
  slots: string[];
}

interface Booking {
  id: string;
  coachName: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED';
}

const BookingPage: React.FC = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  const coachesData: Coach[] = [
    {
      id: '1',
      name: 'Coach Wei',
      avatar: 'https://picsum.photos/seed/wei/200/200',
      slots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM']
    },
    {
      id: '2',
      name: 'Coach Lin',
      avatar: 'https://picsum.photos/seed/lin/200/200',
      slots: ['11:00 AM', '01:30 PM', '03:00 PM']
    },
    {
      id: '3',
      name: 'Coach Chen',
      avatar: 'https://picsum.photos/seed/chen/200/200',
      slots: ['08:30 AM', '05:00 PM']
    }
  ];

  const bookingsData: Booking[] = [
    {
      id: 'b1',
      coachName: 'Coach Wei',
      date: 'Tomorrow',
      time: '10:30 AM',
      status: 'CONFIRMED'
    }
  ];

  const availableCoaches = isEmpty ? [] : coachesData;
  const myBookings = isEmpty ? [] : bookingsData;

  const handleSelectSlot = (coach: Coach, slot: string) => {
    setSelectedCoach(coach);
    setSelectedSlot(slot);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
      {/* 1. Slim Coach Promo Banner */}
      <div className="bg-white border border-zinc-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-900">Love helping others speak confidently?</p>
            <p className="text-xs text-zinc-500">Apply to become an Elo coach and start earning from 10-minute chats.</p>
          </div>
        </div>
        <Button variant="secondary" className="text-xs py-2 px-6 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
          Apply now
        </Button>
      </div>

      {/* 2. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Book a coach</span>
          </div>
          <h1 className="text-5xl font-bold text-zinc-900 tracking-tight leading-[1.1]">
            Reserve a clear practice window <br className="hidden md:block" />
            before you log on.
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl">
            Pick one discrete time slot, hold your wallet minutes, and wait for coach confirmation.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => setIsEmpty(!isEmpty)}
              className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-700 transition-colors flex items-center gap-2"
            >
              {isEmpty ? 'Show populated state' : 'Show empty state'}
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
        
        {/* Optional small info pill */}
        <div className="hidden lg:block">
          <Card className="p-4 bg-zinc-50/50 border-dashed border-zinc-200 flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-zinc-400 shadow-sm">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Request Mode</p>
              <p className="text-xs text-zinc-600 font-medium">30 wallet minutes are held after you submit.</p>
            </div>
          </Card>
        </div>
      </div>

      {/* 3. Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
        
        {/* Left: Primary Content */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Available Coaches Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Available coaches</h2>
                <p className="text-sm text-zinc-500">Choose a slot first. We only hold minutes after you submit.</p>
              </div>
              <Badge color="indigo" className="px-3 py-1 rounded-full">{availableCoaches.length} with open slots</Badge>
            </div>

            {availableCoaches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableCoaches.map((coach) => (
                  <Card key={coach.id} className="p-6 space-y-6 group hover:border-indigo-200 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-100 overflow-hidden border border-zinc-100">
                        <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900">{coach.name}</h3>
                        <p className="text-xs text-zinc-400">{coach.slots.length} slots available</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {coach.slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => handleSelectSlot(coach, slot)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            selectedSlot === slot && selectedCoach?.id === coach.id
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                              : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              /* Empty State for Available Coaches */
              <Card className="p-12 bg-zinc-50/30 border-dashed border-2 border-zinc-200 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-[2rem] shadow-sm flex items-center justify-center text-zinc-300">
                  <User className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-sm">
                  <h3 className="text-lg font-bold text-zinc-900">No coaches are available right now.</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Check back later for new opening windows. When slots appear, pick one to create a request.
                  </p>
                </div>
              </Card>
            )}
          </section>

          {/* My Bookings Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">My bookings</h2>
                <p className="text-sm text-zinc-500">Track pending confirmations and upcoming reserved sessions.</p>
              </div>
              <Badge color="zinc" className="px-3 py-1 rounded-full">{myBookings.length} total</Badge>
            </div>

            {myBookings.length > 0 ? (
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <Card key={booking.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900">Session with {booking.coachName}</h4>
                        <p className="text-xs text-zinc-500">{booking.date} at {booking.time}</p>
                      </div>
                    </div>
                    <Badge color={booking.status === 'CONFIRMED' ? 'green' : 'zinc'}>
                      {booking.status}
                    </Badge>
                  </Card>
                ))}
              </div>
            ) : (
              /* Empty State for My Bookings */
              <Card className="p-8 bg-zinc-50/30 border-dashed border-2 border-zinc-200 flex items-center gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-zinc-300">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-zinc-900">No bookings yet.</h3>
                  <p className="text-xs text-zinc-500">Your requests will appear here after you submit a coach slot.</p>
                </div>
              </Card>
            )}
          </section>

        </div>

        {/* Right: Sidebar Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 space-y-6">
            <Card className="p-8 space-y-8 shadow-xl shadow-zinc-100 border-zinc-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-zinc-900">Booking summary</h2>
                <Badge color="indigo" className="text-[9px]">Request Mode</Badge>
              </div>

              <AnimatePresence mode="wait">
                {selectedSlot ? (
                  <motion.div
                    key="selected"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm overflow-hidden">
                          <img src={selectedCoach?.avatar} alt={selectedCoach?.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Coach</p>
                          <p className="font-bold text-zinc-900">{selectedCoach?.name}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Time</p>
                          <div className="flex items-center gap-2 text-zinc-900 font-bold">
                            <Clock className="w-4 h-4 text-indigo-500" />
                            <span>{selectedSlot}</span>
                          </div>
                        </div>
                        <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Duration</p>
                          <div className="flex items-center gap-2 text-zinc-900 font-bold">
                            <Clock className="w-4 h-4 text-indigo-500" />
                            <span>15 Mins</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Focus Note (Optional)</label>
                        <textarea 
                          placeholder="e.g. I want to practice ordering food..."
                          className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all h-24 resize-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button className="w-full py-4 rounded-2xl shadow-lg shadow-indigo-100">
                        Submit booking request
                      </Button>
                      <div className="flex items-start gap-3 px-2">
                        <Info className="w-4 h-4 text-zinc-300 mt-0.5" />
                        <p className="text-[10px] text-zinc-400 leading-relaxed">
                          30 wallet minutes will be held. If the coach doesn't confirm within 2 hours, the hold expires and minutes return to your wallet.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="w-16 h-16 bg-zinc-50 border-dashed border-2 border-zinc-200 rounded-[2rem] flex items-center justify-center text-zinc-300">
                      <Plus className="w-8 h-8" />
                    </div>
                    <div className="space-y-2 px-6">
                      <h3 className="font-bold text-zinc-900">Select a coach slot first.</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Your selected coach, time, and hold details will appear here.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
            
            {/* Secondary info card */}
            <Card className="p-6 bg-indigo-600 text-white rounded-[2.5rem] space-y-4 overflow-hidden relative">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold">Why book?</h4>
              </div>
              <p className="text-sm text-indigo-100 leading-relaxed">
                Booking ensures your favorite coach is ready for you. It's the best way to maintain a consistent speaking habit.
              </p>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingPage;
