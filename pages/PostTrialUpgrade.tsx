
import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Sparkles, ArrowRight, Star, Quote, ShieldCheck, Zap } from 'lucide-react';
import { Button, Card, Badge } from '../components/UI';

interface PostTrialUpgradeProps {
  onUpgrade: (planId: string) => void;
  onMaybeLater: () => void;
}

const PLANS = [
  { 
    id: 'lite', 
    name: 'Lite', 
    price: '$39', 
    period: '/mo',
    features: ['4 lessons / mo', 'Standard AI Review', 'Rollover support'],
    popular: false
  },
  { 
    id: 'plus', 
    name: 'Plus', 
    price: '$75', 
    period: '/mo',
    features: ['8 lessons / mo', 'Enhanced AI Review', 'Priority matching'],
    popular: true
  },
  { 
    id: 'intensive', 
    name: 'Intensive', 
    price: '$109', 
    period: '/mo',
    features: ['12 lessons / mo', 'Enhanced AI Review', 'Daily practice rhythm'],
    popular: false
  },
];

const PostTrialUpgrade: React.FC<PostTrialUpgradeProps> = ({ onUpgrade, onMaybeLater }) => {
  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Achievement Hero */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-white border border-indigo-100 text-indigo-600 rounded-full text-[10px] font-black mb-10 uppercase tracking-[0.2em] shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            First session: Done. Confidence: Built.
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tight mb-8 leading-[1.1]">
            That was a great start.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto leading-relaxed mb-16">
            You just spoke more Chinese in 15 minutes than most learners do in a week. 
            Imagine where you'll be in a month.
          </p>

          {/* Bento Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-8 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm flex flex-col items-center gap-2">
              <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em]">Fluency</p>
              <p className="text-4xl font-black text-indigo-600">82%</p>
              <p className="text-xs text-zinc-500 font-medium">+12% vs. Average</p>
            </div>
            <div className="p-8 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm flex flex-col items-center gap-2">
              <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em]">Accuracy</p>
              <p className="text-4xl font-black text-indigo-600">74%</p>
              <p className="text-xs text-zinc-500 font-medium">Strong Tones</p>
            </div>
            <div className="p-8 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm flex flex-col items-center gap-2">
              <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em]">New Words</p>
              <p className="text-4xl font-black text-indigo-600">12</p>
              <p className="text-xs text-zinc-500 font-medium">Ready to use</p>
            </div>
          </div>
        </div>

        {/* The "Speaking Snapshot" / Value Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-20"
        >
          <Card className="p-10 md:p-12 border-zinc-200 bg-white overflow-hidden rounded-[3rem] shadow-xl shadow-zinc-200/50">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">A</div>
                <div>
                  <p className="text-lg font-black text-zinc-900 tracking-tight">Your Speaking Debrief</p>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Session #1 • Today</p>
                </div>
              </div>
              <Badge color="indigo" className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">Premium Preview</Badge>
            </div>
            
            <div className="space-y-8 blur-[3px] opacity-30 select-none">
              <div className="space-y-4">
                <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Grammar Refinement</p>
                <div className="p-6 bg-zinc-950 rounded-2xl border border-white/5 font-mono text-[11px] space-y-3 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none" />
                  <div className="flex gap-4 relative z-10">
                    <span className="text-zinc-700">01</span>
                    <p className="text-zinc-400">What you said: <span className="text-zinc-100">"我昨天去商店买苹果了。"</span></p>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <span className="text-emerald-500/30">02</span>
                    <p className="text-emerald-400 font-bold">Better version: "我昨天去商店买了一些苹果。"</p>
                  </div>
                  <div className="flex gap-4 relative z-10 opacity-50">
                    <span className="text-zinc-700">03</span>
                    <p className="text-zinc-500">Analysis: Added measure word "一些" for natural flow...</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-32 bg-zinc-50 rounded-3xl border border-zinc-100 flex items-center justify-center">
                   <div className="w-2/3 h-2 bg-zinc-200 rounded-full" />
                </div>
                <div className="h-32 bg-zinc-50 rounded-3xl border border-zinc-100 flex items-center justify-center">
                   <div className="w-1/2 h-2 bg-zinc-200 rounded-full" />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/40 backdrop-blur-[2px]">
              <div className="text-center p-10 bg-white rounded-[2.5rem] border border-white shadow-2xl max-w-sm">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-xl font-black text-zinc-900 mb-3 tracking-tight">Unlock your full analysis</p>
                <p className="text-zinc-500 text-sm leading-relaxed">Get detailed feedback on tones, grammar, and vocabulary for every session.</p>
              </div>
            </div>
          </Card>
        </motion.div>


        {/* Subscription Grid */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANS.map((plan) => (
              <Card 
                key={plan.id}
                className={`p-8 flex flex-col rounded-[2.5rem] transition-all hover:shadow-2xl relative ${plan.popular ? 'border-indigo-600 shadow-[0_32px_64px_-12px_rgba(79,70,229,0.25)] scale-105 z-10 bg-white ring-4 ring-indigo-50' : 'border-zinc-200 bg-white/50 grayscale-[0.2]'}`}
              >
                {plan.popular && (
                  <>
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg whitespace-nowrap">
                      +30m Bonus Included
                    </div>
                    <div className="flex items-center justify-between mb-6 pt-2">
                      <Badge color="indigo" className="px-3 py-1 text-[10px] font-black uppercase tracking-widest">Most Popular</Badge>
                      <div className="flex items-center gap-1.5 text-indigo-600">
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Momentum Bonus</span>
                      </div>
                    </div>
                  </>
                )}
                <h4 className="text-2xl font-black text-zinc-900 mb-2 tracking-tight">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-zinc-900">{plan.price}</span>
                  <span className="text-zinc-400 text-sm font-bold uppercase tracking-widest">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-zinc-600">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                  {plan.popular && (
                    <li className="flex items-center gap-3 text-sm font-black text-indigo-600">
                      <Zap className="w-5 h-5 fill-current" />
                      30m Trial Bonus
                    </li>
                  )}
                </ul>
                <Button 
                  onClick={() => onUpgrade(plan.id)}
                  className={`w-full py-5 rounded-2xl font-black text-base shadow-xl transition-all ${plan.popular ? 'bg-indigo-600 text-white shadow-indigo-200 hover:scale-[1.02]' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'}`}
                >
                  {plan.popular ? 'Unlock Full Access' : `Start with ${plan.name}`}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonial & Trust */}
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none">
            <Quote className="w-48 h-48 text-zinc-900" />
          </div>
          <div className="flex justify-center gap-1.5 mb-8">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
          </div>
          <p className="text-2xl text-zinc-700 font-serif italic mb-10 leading-[1.6] relative z-10">
            "Elo changed everything for me. I used to be terrified of making mistakes, but the coaches are so supportive. I've been practicing 15 minutes a day for 3 months and my confidence has skyrocketed."
          </p>
          <div className="flex items-center justify-center gap-4 mb-16">
            <img src="https://picsum.photos/seed/student/100/100" alt="Student" className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
            <div className="text-left">
              <p className="text-base font-black text-zinc-900 tracking-tight">James L.</p>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Student since 2025</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-12 border-t border-zinc-200">
            <div className="flex items-center gap-2.5 text-zinc-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">No hidden fees</span>
            </div>
            <button 
              onClick={onMaybeLater}
              className="text-xs font-black text-zinc-300 hover:text-zinc-500 transition-colors uppercase tracking-widest"
            >
              Maybe later
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostTrialUpgrade;

const Clock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);
