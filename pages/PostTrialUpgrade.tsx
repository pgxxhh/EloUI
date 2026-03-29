
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
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            First session: Done. Confidence: Built.
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
            That was a great start.
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
            You just spoke more Chinese in 15 minutes than most learners do in a week. 
            Imagine where you'll be in a month.
          </p>
        </div>

        {/* The "Speaking Snapshot" / Value Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-50 z-10" />
          <Card className="p-8 border-zinc-200 bg-white overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">A</div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">Your Speaking Debrief</p>
                  <p className="text-xs text-zinc-400">Session #1 • Today</p>
                </div>
              </div>
              <Badge color="zinc">Preview</Badge>
            </div>
            
            <div className="space-y-4 blur-[2px] opacity-40 select-none">
              <div className="h-4 bg-zinc-100 rounded w-3/4" />
              <div className="h-4 bg-zinc-100 rounded w-1/2" />
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="h-24 bg-zinc-50 rounded-xl border border-zinc-100" />
                <div className="h-24 bg-zinc-50 rounded-xl border border-zinc-100" />
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-xl max-w-xs">
                <Zap className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
                <p className="text-sm font-bold text-zinc-900 mb-2">Unlock your full analysis</p>
                <p className="text-xs text-zinc-500">Get detailed feedback on tones, grammar, and vocabulary for every session.</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* The Momentum Reward Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card className="bg-zinc-900 text-white border-none shadow-2xl overflow-hidden relative p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <Badge className="bg-indigo-500/20 text-indigo-300 border-none mb-4 px-3 py-1">
                  Trial Member Exclusive
                </Badge>
                <h3 className="text-3xl font-bold mb-4">Keep the momentum going.</h3>
                <p className="text-zinc-400 text-lg mb-0">
                  Subscribe in the next 24h and get <span className="text-white font-bold">30 extra minutes</span> added to your first month.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-indigo-400 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Expires in 23:59:59</span>
                  </div>
                  <p className="text-2xl font-bold text-white">+30 Mins</p>
                  <p className="text-xs text-zinc-500">Trial Bonus Applied</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Subscription Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((plan) => (
            <Card 
              key={plan.id}
              className={`p-6 flex flex-col ${plan.popular ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-xl' : 'border-zinc-200'}`}
            >
              {plan.popular && (
                <div className="mb-4">
                  <Badge color="indigo">Most Popular</Badge>
                </div>
              )}
              <h4 className="text-xl font-bold text-zinc-900 mb-1">{plan.name}</h4>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-zinc-900">{plan.price}</span>
                <span className="text-zinc-400 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => onUpgrade(plan.id)}
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full py-4 rounded-xl font-bold"
              >
                {plan.popular ? 'Unlock Full Access' : `Start with ${plan.name}`}
              </Button>
            </Card>
          ))}
        </div>

        {/* Testimonial & Trust */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
          </div>
          <Quote className="w-10 h-10 text-zinc-200 mx-auto mb-4" />
          <p className="text-lg text-zinc-600 italic mb-6">
            "Elo changed everything for me. I used to be terrified of making mistakes, but the coaches are so supportive. I've been practicing 15 minutes a day for 3 months and my confidence has skyrocketed."
          </p>
          <div className="flex items-center justify-center gap-3 mb-12">
            <img src="https://picsum.photos/seed/student/100/100" alt="Student" className="w-10 h-10 rounded-full" />
            <div className="text-left">
              <p className="text-sm font-bold text-zinc-900">James L.</p>
              <p className="text-xs text-zinc-400">Student since 2025</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-zinc-200">
            <div className="flex items-center gap-2 text-zinc-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">No hidden fees</span>
            </div>
            <button 
              onClick={onMaybeLater}
              className="text-sm font-bold text-zinc-400 hover:text-zinc-600 transition-colors"
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
