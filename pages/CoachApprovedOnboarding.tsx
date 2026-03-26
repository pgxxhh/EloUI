
import React, { useState } from 'react';
import { Button, Card, Badge } from '../components/UI';
import { Icons } from '../constants';
import { motion } from 'motion/react';

interface CoachApprovedOnboardingProps {
  onComplete: () => void;
}

const CoachApprovedOnboarding: React.FC<CoachApprovedOnboardingProps> = ({ onComplete }) => {
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const checklist = [
    { id: 'profile', title: 'Complete public profile', desc: 'Add your bio, specialties, and a friendly avatar.', icon: <Icons.Mic /> },
    { id: 'availability', title: 'Set your availability', desc: 'Open slots for students to book instant or scheduled sessions.', icon: <Icons.Sparkles /> },
    { id: 'device', title: 'Run device check', desc: 'Ensure your microphone and internet are ready for live calls.', icon: <Icons.Check /> },
    { id: 'rules', title: 'Learn earnings rules', desc: 'Understand how we calculate and pay out your weekly earnings.', icon: <Icons.Check /> },
    { id: 'hub', title: 'Open Coach Hub', desc: 'Explore your main workspace and dashboard.', icon: <Icons.ArrowRight /> }
  ];

  const toggleItem = (id: string) => {
    if (completedItems.includes(id)) {
      setCompletedItems(completedItems.filter(item => item !== id));
    } else {
      setCompletedItems([...completedItems, id]);
    }
  };

  const progress = (completedItems.length / checklist.length) * 100;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge color="emerald" className="px-4 py-1">Welcome Aboard!</Badge>
        <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Let's get you ready for your first student.</h1>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">Complete these 5 quick steps to activate your profile and start earning on Elo.</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-end px-2">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Activation Progress</span>
          <span className="text-sm font-bold text-emerald-600">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-emerald-500 rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Checklist */}
        <div className="lg:col-span-2 space-y-4">
          {checklist.map((item) => (
            <button 
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`w-full p-6 rounded-3xl border-2 transition-all text-left flex items-start gap-6 group ${completedItems.includes(item.id) ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-zinc-100 hover:border-zinc-200'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${completedItems.includes(item.id) ? 'bg-emerald-500 text-white' : 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200'}`}>
                {completedItems.includes(item.id) ? <Icons.Check className="w-6 h-6" /> : item.icon}
              </div>
              <div className="flex-1 space-y-1">
                <h4 className={`font-bold transition-colors ${completedItems.includes(item.id) ? 'text-emerald-900' : 'text-zinc-900'}`}>{item.title}</h4>
                <p className={`text-sm transition-colors ${completedItems.includes(item.id) ? 'text-emerald-700/60' : 'text-zinc-500'}`}>{item.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${completedItems.includes(item.id) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-200 group-hover:border-zinc-300'}`}>
                {completedItems.includes(item.id) && <Icons.Check className="w-3 h-3" />}
              </div>
            </button>
          ))}
        </div>

        {/* Sidebar / Tips */}
        <div className="space-y-8">
          <Card className="p-8 bg-indigo-50 border-indigo-100 space-y-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
              <Icons.Video className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-zinc-900">Strengthen your profile</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">Adding a video introduction is the best way to build trust with new students. You can do this anytime in the Coach Hub.</p>
            </div>
            <Button variant="secondary" className="w-full bg-white border-none shadow-sm">Add Video Intro</Button>
          </Card>

          <Card className="p-8 bg-zinc-900 text-white space-y-6">
            <div className="space-y-2">
              <h4 className="font-bold">Need help?</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">Our coach support team is available 24/7 to help you get started.</p>
            </div>
            <Button variant="ghost" className="w-full text-white hover:bg-white/10">Read Coach Guide</Button>
          </Card>
        </div>
      </div>

      {/* Final Action */}
      <div className="pt-8 border-t border-zinc-100 flex justify-center">
        <Button 
          onClick={onComplete}
          disabled={completedItems.length < checklist.length}
          className={`px-16 py-5 text-lg rounded-2xl shadow-2xl transition-all ${completedItems.length === checklist.length ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none'}`}
        >
          {completedItems.length === checklist.length ? 'Enter Coach Hub' : `Complete ${checklist.length - completedItems.length} more steps`}
          <Icons.ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CoachApprovedOnboarding;
