
import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Modal } from '../components/UI';
import { Icons, SCENARIOS } from '../constants';

const CoachDashboard: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  useEffect(() => {
    if (isOnline) {
      const timer = setTimeout(() => setShowInvite(true), 4000);
      return () => clearTimeout(timer);
    } else {
      setShowInvite(false);
    }
  }, [isOnline]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Coach Hub</h1>
          <p className="text-zinc-500 font-medium">Ready to empower a learner today?</p>
        </div>
        
        <div className="flex items-center gap-6 bg-white p-3 pl-8 rounded-[2rem] border border-zinc-100 shadow-xl shadow-zinc-100/50">
          <div className="flex flex-col">
            <span className={`text-xs font-bold uppercase tracking-widest ${isOnline ? 'text-emerald-500' : 'text-zinc-400'}`}>
              {isOnline ? 'Accepting Calls' : 'Invisible'}
            </span>
            <span className="text-[10px] text-zinc-400 font-medium">Wait time for students: ~2m</span>
          </div>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`w-16 h-10 rounded-full transition-all duration-500 relative p-1 ${isOnline ? 'bg-emerald-500 shadow-lg shadow-emerald-100' : 'bg-zinc-200'}`}
          >
            <div className={`w-8 h-8 bg-white rounded-full transition-transform duration-500 shadow-sm ${isOnline ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card className="bg-zinc-900 text-white border-none space-y-6 md:col-span-2 p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Icons.Sparkles /></div>
          <div className="space-y-2">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Total Earnings</p>
            <div className="text-6xl font-bold font-mono tracking-tighter">¥12,480.00</div>
          </div>
          <div className="flex gap-4">
            <Button className="bg-white text-zinc-900 hover:bg-zinc-100 shadow-none px-8">Withdraw</Button>
            <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/10">Past Invoices</Button>
          </div>
        </Card>
        
        <Card className="flex flex-col justify-between p-8">
          <div className="space-y-1">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Impact Score</p>
            <div className="text-4xl font-bold text-zinc-900">4.98</div>
          </div>
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold uppercase">
             <Icons.Check /> Top 5% Coach
          </div>
        </Card>

        <Card className="flex flex-col justify-between p-8">
          <div className="space-y-1">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Active Streak</p>
            <div className="text-4xl font-bold text-zinc-900">12 <span className="text-lg text-zinc-300">Days</span></div>
          </div>
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-4">Next Goal: 15 Days</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <section className="lg:col-span-8 space-y-8">
           <div className="flex justify-between items-center px-2">
             <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Daily Schedule</h2>
             <Badge color="zinc">Upcoming: 2 sessions</Badge>
           </div>
           
           <div className="space-y-4">
              {[
                { name: 'Sarah Miller', topic: 'Coffee Shop Chat', time: '14:30 - 14:45', status: 'Upcoming' },
                { name: 'John Doe', topic: 'Finding Your Way', time: '15:15 - 15:30', status: 'Completed' }
              ].map((s, i) => (
                <div key={i} className={`p-6 bg-white rounded-3xl border ${s.status === 'Upcoming' ? 'border-indigo-100 bg-indigo-50/10 shadow-sm' : 'border-zinc-100 opacity-60'} flex items-center justify-between`}>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center font-bold text-zinc-400">{s.name[0]}</div>
                    <div>
                      <p className="font-bold text-zinc-900">{s.name}</p>
                      <p className="text-xs text-zinc-500 font-medium">{s.topic} • {s.time}</p>
                    </div>
                  </div>
                  <Button variant={s.status === 'Upcoming' ? 'primary' : 'secondary'} className="px-6 py-2 text-sm">{s.status === 'Upcoming' ? 'Join Room' : 'View Review'}</Button>
                </div>
              ))}
           </div>
        </section>

        <section className="lg:col-span-4 space-y-8">
           <h2 className="text-2xl font-bold text-zinc-900 tracking-tight px-2">Coach Toolkit</h2>
           <div className="grid grid-cols-1 gap-4">
             <Card className="bg-indigo-50/50 border-indigo-100 space-y-3 cursor-pointer group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform"><Icons.Sparkles /></div>
                <h4 className="font-bold text-zinc-900">Weekly Performance</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">See how your students are progressing and where you can improve.</p>
             </Card>
             <Card className="bg-emerald-50/50 border-emerald-100 space-y-3 cursor-pointer group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform"><Icons.Check /></div>
                <h4 className="font-bold text-zinc-900">Certificate Renewal</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">Your HSK Instructor badge is valid for another 142 days.</p>
             </Card>
           </div>
        </section>
      </div>

      {/* Incoming Invite Mockup */}
      {showInvite && (
        <div className="fixed bottom-8 left-8 right-8 md:left-auto md:w-[400px] z-[60] animate-in slide-in-from-bottom-20 duration-500">
           <Card className="p-1 border-2 border-indigo-500 bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden">
              <div className="p-6 space-y-6">
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <Badge color="indigo">New Session Request</Badge>
                       <h3 className="text-xl font-bold text-zinc-900">Marcus Lee</h3>
                       <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">Wants to practice: "Coffee Shop"</p>
                    </div>
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center font-bold text-2xl">ML</div>
                 </div>

                 <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 animate-shrink-progress origin-left"></div>
                 </div>

                 <div className="flex gap-4">
                    <Button onClick={() => setShowInvite(false)} variant="secondary" className="flex-1 py-4">Decline</Button>
                    <Button onClick={() => setShowInvite(false)} className="flex-1 py-4">Accept Call</Button>
                 </div>
              </div>
           </Card>
        </div>
      )}

      <style>{`
        @keyframes shrink-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-shrink-progress {
          animation: shrink-progress 15s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default CoachDashboard;
