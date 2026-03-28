
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Button, Card, Badge, Modal } from '../components/UI';
import { 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Loader2, 
  ShieldCheck, 
  CreditCard, 
  Mail,
  Gift, 
  Ticket, 
  Sparkles, 
  ArrowRight, 
  XCircle,
  Calendar,
  Clock,
  History as HistoryIcon,
  ChevronDown,
  ChevronUp,
  Zap,
  Star,
  ArrowUpRight,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PLANS = [
  { 
    id: 'lite', 
    name: 'Lite', 
    tagline: 'Build a steady speaking habit with a simple weekly practice rhythm.',
    price: '$39.00', 
    period: '/ month',
    baseline: '4 lessons per month (30 min baseline · 120 total minutes)',
    highlights: [
      '4 lessons worth of monthly minutes for consistent speaking practice',
      'Standard after-class AI review to help you reflect on each session',
      'Rollover support so unused minutes are easier to keep in your routine'
    ],
    cta: 'Switch next cycle',
    popular: false
  },
  { 
    id: 'plus', 
    name: 'Plus', 
    tagline: 'Keep your momentum with a stronger weekly rhythm and deeper post-lesson feedback.',
    price: '$75.00', 
    period: '/ month',
    baseline: '8 lessons per month (30 min baseline · 240 total minutes)',
    highlights: [
      '8 lessons worth of monthly minutes for more consistent progress',
      'Enhanced after-class AI review for clearer follow-up practice',
      'A better plan for learners who want regular speaking feedback each week'
    ],
    cta: 'Current plan',
    popular: true
  },
  { 
    id: 'intensive', 
    name: 'Intensive', 
    tagline: 'Accelerate faster with a high-frequency practice plan built for serious progress.',
    price: '$109.00', 
    period: '/ month',
    baseline: '12 lessons per month (30 min baseline · 360 total minutes)',
    highlights: [
      '12 lessons worth of monthly minutes for an intensive speaking rhythm',
      'Enhanced after-class AI review to support faster iteration after every session',
      'Priority matching to help you stay closer to your practice cadence'
    ],
    cta: 'Upgrade next cycle',
    popular: false
  },
];

const ADDONS = [
  { id: 'extra-30', minutes: 30, price: '$11.99', label: '1 Extra Lesson' },
  { id: 'extra-60', minutes: 60, price: '$21.99', label: '2 Extra Lessons' },
];

type PaymentStatus = 'IDLE' | 'LOADING' | 'AUTHORIZING' | 'PROCESSING' | 'SUCCESS' | 'FAILURE';

interface PaymentHistoryItem {
  id: string;
  amount: string;
  type: 'SUBSCRIPTION' | 'ADDON' | 'REDEEM';
  description: string;
  date: string;
  status: 'SUCCEEDED' | 'FAILED' | 'PENDING';
}

const MOCK_HISTORY: PaymentHistoryItem[] = [
  {
    id: '#INV-8829',
    amount: '$75.00',
    type: 'SUBSCRIPTION',
    description: 'Monthly Renewal - Plus Plan',
    date: 'Mar 1, 2026',
    status: 'SUCCEEDED',
  },
  {
    id: '#INV-8742',
    amount: '$11.99',
    type: 'ADDON',
    description: 'Extra Minutes Add-on (30 min)',
    date: 'Feb 15, 2026',
    status: 'SUCCEEDED',
  },
  {
    id: '#INV-8611',
    amount: '$0.00',
    type: 'REDEEM',
    description: 'Promo Credit: WELCOME30',
    date: 'Feb 1, 2026',
    status: 'SUCCEEDED',
  }
];

interface BillingProps {
  onBack: () => void;
  checkVerification: (action: () => void) => void;
}

const Billing: React.FC<BillingProps> = ({ onBack, checkVerification }) => {
  const [hasActiveSubscription, setHasActiveSubscription] = useState(true); 
  const [currentPlan, setCurrentPlan] = useState('plus');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [status, setStatus] = useState<PaymentStatus>('IDLE');
  const [progress, setProgress] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<PaymentHistoryItem[]>(MOCK_HISTORY);
  
  // Checkout state
  const [checkoutType, setCheckoutType] = useState<'NONE' | 'SUBSCRIPTION' | 'ADDON'>('NONE');
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [isConfirmingChange, setIsConfirmingChange] = useState(false);
  const [pendingPlanToConfirm, setPendingPlanToConfirm] = useState<string | null>(null);

  // Subscription management state
  const [isManagingPlan, setIsManagingPlan] = useState(false);
  const [isAutoRenew, setIsAutoRenew] = useState(true);
  const [isCanceled, setIsCanceled] = useState(false);
  const [pendingPlanChange, setPendingPlanChange] = useState<string | null>(null);

  // User balance for unsubscribed state
  const [promoMinutes] = useState(180); // Updated to match spec example

  const isPayPalAvailable = false; // Based on environment notice in screenshot

  // Redeem Code State
  const [redeemCode, setRedeemCode] = useState('');
  const [redeemStatus, setRedeemStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [redeemError, setRedeemError] = useState('');

  const handleRedeem = () => {
    checkVerification(() => {
      if (!redeemCode.trim()) return;
      setRedeemStatus('LOADING');
      setTimeout(() => {
        if (redeemCode.toUpperCase() === 'INVALID') {
          setRedeemStatus('ERROR');
          setRedeemError('This code is invalid or has already been used.');
        } else {
          setRedeemStatus('SUCCESS');
        }
      }, 1200);
    });
  };

  const handlePlanAction = (planId: string) => {
    checkVerification(() => {
      if (planId === currentPlan) {
        setIsManagingPlan(true);
      } else if (!hasActiveSubscription) {
        // New subscription: Inline checkout
        setCheckoutType('SUBSCRIPTION');
        setCheckoutId(planId);
      } else {
        // Switching plan: Rule confirmation modal
        setPendingPlanToConfirm(planId);
        setIsConfirmingChange(true);
      }
    });
  };

  const handleConfirmPlanChange = () => {
    if (pendingPlanToConfirm) {
      setPendingPlanChange(PLANS.find(p => p.id === pendingPlanToConfirm)?.name || null);
      setIsConfirmingChange(false);
      setPendingPlanToConfirm(null);
      // Show a success toast or simple feedback instead of a payment modal
      confetti({
        particleCount: 100,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#4f46e5', '#10b981']
      });
    }
  };

  const handleAddonPurchase = (addonId: string) => {
    checkVerification(() => {
      setCheckoutType('ADDON');
      setCheckoutId(addonId);
    });
  };

  const executePayment = () => {
    setStatus('PROCESSING');
    // Simulate payment processing
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'PROCESSING') {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus('SUCCESS');
            return 100;
          }
          return prev + 15;
        });
      }, 500);
    }
    
    if (status === 'SUCCESS') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#10b981', '#f59e0b']
      });
    }
    
    return () => clearInterval(interval);
  }, [status]);

  const renderModalContent = () => {
    switch (status) {
      case 'PROCESSING':
        return (
          <div className="text-center py-12 space-y-6">
            <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-zinc-900">Processing Payment</h3>
              <p className="text-zinc-500 text-sm px-8">Please don't close this window. We're finalizing your transaction.</p>
            </div>
            <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden max-w-xs mx-auto">
              <motion.div className="bg-indigo-600 h-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
            </div>
          </div>
        );
      case 'SUCCESS':
        return (
          <div className="text-center py-12 space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-zinc-900">Payment Successful!</h3>
              <p className="text-zinc-500 text-sm">
                {checkoutType === 'SUBSCRIPTION' 
                  ? 'Your subscription is now active. Welcome to Fluent!' 
                  : 'Extra minutes have been added to your account.'}
              </p>
            </div>
            <Button 
              onClick={() => {
                if (checkoutType === 'SUBSCRIPTION' && checkoutId) {
                  setCurrentPlan(checkoutId);
                  setHasActiveSubscription(true);
                }
                setStatus('IDLE');
                setCheckoutType('NONE');
                setCheckoutId(null);
              }} 
              className="w-full py-3 rounded-xl"
            >
              Continue
            </Button>
          </div>
        );
      default: return null;
    }
  };

  const InlineCheckout = ({ price, description, onCancel }: { price: string, description: string, onCancel: () => void }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 pt-4 border-t border-zinc-100"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Checkout with PayPal</p>
          <p className="text-xs text-zinc-500">{description}</p>
        </div>
        <p className="text-lg font-bold text-zinc-900">{price}</p>
      </div>
      
      <div className="space-y-2">
        <button 
          onClick={executePayment}
          className="w-full py-3 bg-[#0070ba] hover:bg-[#005ea6] rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-100"
        >
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-[#003087] font-black italic text-[10px]">P</div>
          <span className="text-white font-bold italic">PayPal</span>
        </button>
        <button 
          onClick={onCancel}
          className="w-full py-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest hover:text-zinc-900 transition-colors"
        >
          Cancel
        </button>
      </div>
      <p className="text-[9px] text-zinc-400 text-center leading-relaxed">
        The official PayPal popup opens on top of this page. <br/>
        Secure payment powered by PayPal SDK.
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-zinc-50/50 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="max-w-5xl mx-auto py-16 px-6 space-y-12 animate-in fade-in duration-700">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Your speaking plan</h1>
            <p className="text-zinc-500 text-lg font-medium">
              Manage your subscription and practice time.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-xl border border-zinc-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-bold text-zinc-600 tracking-tight">
                215 available minutes / Elo Plus
              </p>
            </div>
            {!isPayPalAvailable && (
              <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900 text-white rounded-xl">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <p className="text-[9px] font-bold uppercase tracking-wider">
                  Checkout limited
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Current Status Dashboard / Billing Summary */}
        <Card className="p-8 border-none shadow-xl shadow-zinc-200/40 bg-white rounded-[2rem] relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]">Current Status</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-6xl font-bold text-zinc-900 tracking-tighter">215</h2>
                  <span className="text-lg font-bold text-zinc-400">minutes available</span>
                </div>
              </div>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                You already have minutes ready for new sessions.
              </p>
              <div className="flex gap-3">
                <Button onClick={onBack} className="rounded-xl px-6 py-2.5 font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">
                  Start practicing
                </Button>
                <Button variant="secondary" onClick={() => document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-xl px-6 py-2.5 font-bold border-zinc-200 text-zinc-700">
                  Add minutes
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pl-10 lg:border-l border-zinc-100">
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Active Plan</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-zinc-900">Elo Plus</p>
                  <Badge color="indigo" className="rounded-lg text-[10px] px-2 py-0.5">Current</Badge>
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Renewal Status</p>
                <p className="text-lg font-bold text-zinc-900">April 1, 2026</p>
              </div>
              <div className="col-span-full pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Rollover / Add-on</p>
                  <p className="text-sm font-bold text-zinc-600">25 rollover min · 10 add-on min</p>
                </div>
                <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-0 font-bold flex items-center gap-1.5 text-xs" onClick={() => checkVerification(() => setIsManagingPlan(true))}>
                  Manage billing details
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Subscription Plans */}
        <div id="plans-section" className="space-y-10 pt-4">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Choose your rhythm</h2>
            <p className="text-zinc-500 font-medium">You selected Elo Plus. Review the plan below to continue.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative flex flex-col p-8 rounded-[2rem] border-2 transition-all duration-500 ${
                  plan.popular 
                    ? 'border-indigo-600 shadow-[0_20px_40px_-12px_rgba(79,70,229,0.12)] bg-white z-20' 
                    : 'border-zinc-100 hover:border-zinc-200 shadow-sm bg-white z-10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                    <div className="bg-indigo-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg shadow-indigo-500/30">
                      Recommended
                    </div>
                  </div>
                )}
                
                <div className="space-y-6 flex-1">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-zinc-900">{plan.name}</h3>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed min-h-[32px]">{plan.tagline}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-zinc-900 tracking-tighter">{plan.price}</span>
                      <span className="text-xs text-zinc-400 font-bold">{plan.period}</span>
                    </div>
                    <p className="text-[10px] font-bold text-zinc-400 leading-tight">{plan.baseline}</p>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t border-zinc-50">
                    {plan.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-1 w-4 h-4 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-2.5 h-2.5 text-indigo-600" />
                        </div>
                        <p className="text-xs font-bold text-zinc-700 leading-snug">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <Button 
                    variant={plan.popular ? 'primary' : 'secondary'}
                    onClick={() => handlePlanAction(plan.id)}
                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20' 
                        : 'border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50'
                    }`}
                  >
                    {plan.id === currentPlan ? 'Current plan' : plan.cta}
                  </Button>

                  {checkoutType === 'SUBSCRIPTION' && checkoutId === plan.id && (
                    <InlineCheckout 
                      price={plan.price} 
                      description={`${plan.name} Subscription`} 
                      onCancel={() => {
                        setCheckoutType('NONE');
                        setCheckoutId(null);
                      }} 
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Plans Include Section */}
        <div className="bg-zinc-100/50 rounded-[2rem] p-10 border border-zinc-100">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em]">All plans include</p>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Everything you need to keep learning between lessons.</h2>
              <p className="text-zinc-500 text-sm font-medium max-w-2xl mx-auto leading-relaxed">
                All Elo plans include the same one-on-one lesson format and post-lesson tools. The difference is how much speaking rhythm and support you want each month.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Private one-on-one speaking lessons',
                'Flexible monthly minutes for instant or scheduled lessons',
                'Lesson recordings you can replay after class',
                'Session transcripts to revisit what you said',
                'After-class AI review to guide your next practice',
                'Add-on minutes when you need extra speaking time'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-zinc-100/50 shadow-sm group hover:border-indigo-100 transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-zinc-700 leading-tight">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Tools Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Add Extra Minutes */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Add extra minutes</h3>
            <div className="space-y-3">
              {ADDONS.map((addon) => (
                <div key={addon.id} className="space-y-4">
                  <button 
                    onClick={() => handleAddonPurchase(addon.id)}
                    className="w-full flex items-center justify-between p-5 bg-white border border-zinc-100 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-zinc-900">{addon.label}</p>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{addon.minutes} min</p>
                      </div>
                    </div>
                    <p className="text-base font-bold text-zinc-900">{addon.price}</p>
                  </button>
                  {checkoutType === 'ADDON' && checkoutId === addon.id && (
                    <InlineCheckout 
                      price={addon.price} 
                      description={`${addon.label} Add-on`} 
                      onCancel={() => {
                        setCheckoutType('NONE');
                        setCheckoutId(null);
                      }} 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Redeem Code */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Redeem code</h3>
            <div className="space-y-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Enter promo code" 
                  value={redeemCode}
                  onChange={(e) => {
                    setRedeemCode(e.target.value.toUpperCase());
                    if (redeemStatus !== 'IDLE') setRedeemStatus('IDLE');
                  }}
                  className={`w-full px-5 py-4 bg-white border rounded-2xl text-sm font-mono focus:outline-none transition-all ${
                    redeemStatus === 'ERROR' ? 'border-rose-300 ring-4 ring-rose-500/5' : 
                    redeemStatus === 'SUCCESS' ? 'border-emerald-300 ring-4 ring-emerald-500/5' : 
                    'border-zinc-100 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200'
                  }`}
                />
                {redeemStatus === 'LOADING' && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                  </div>
                )}
              </div>
              <Button 
                onClick={handleRedeem}
                disabled={!redeemCode.trim() || redeemStatus === 'LOADING' || redeemStatus === 'SUCCESS'}
                className="w-full py-4 rounded-2xl text-sm font-bold"
              >
                {redeemStatus === 'SUCCESS' ? 'Applied' : 'Apply Code'}
              </Button>
            </div>
          </div>

          {/* Billing Support */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] ml-1">Billing support</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-5 bg-white border border-zinc-100 rounded-2xl hover:bg-zinc-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-zinc-700">Billing Help Center</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900 transition-colors" />
              </button>
              <button className="w-full flex items-center justify-between p-5 bg-white border border-zinc-100 rounded-2xl hover:bg-zinc-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-zinc-700">Email Billing Support</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="space-y-4 pt-8 border-t border-zinc-100">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-3 text-zinc-400 hover:text-zinc-900 transition-colors font-bold text-[10px] uppercase tracking-[0.2em] ml-1"
            >
              <HistoryIcon className="w-4 h-4" />
              Billing history
              {showHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Demo toggle for history state */}
            {showHistory && (
              <button 
                onClick={() => setHistory(history.length > 0 ? [] : MOCK_HISTORY)}
                className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full"
              >
                Demo: {history.length > 0 ? 'Clear' : 'Restore'} History
              </button>
            )}
          </div>

          <AnimatePresence>
            {showHistory && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-zinc-100 rounded-[2rem] overflow-hidden shadow-sm">
                  {history.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-zinc-50">
                            <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Date</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Description</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                          {history.map((item, i) => (
                            <tr key={i} className="group hover:bg-zinc-50/50 transition-colors">
                              <td className="px-8 py-5 text-sm font-bold text-zinc-500">{item.date}</td>
                              <td className="px-8 py-5 text-sm font-bold text-zinc-900">{item.description}</td>
                              <td className="px-8 py-5 text-sm font-bold text-zinc-900">{item.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-16 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 bg-zinc-50 rounded-[2rem] flex items-center justify-center text-zinc-300">
                        <HistoryIcon className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-zinc-900">No billing history yet</h3>
                        <p className="text-xs text-zinc-500 max-w-[240px] leading-relaxed mx-auto">
                          Your future transactions, plan renewals, and add-on purchases will appear here.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Info */}
        <footer className="pt-16 pb-20 border-t border-zinc-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-zinc-900">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-lg">E</div>
                <span className="font-bold tracking-tight">Elo Speaking</span>
              </div>
              <p className="text-xs font-medium text-zinc-400 leading-relaxed max-w-xs">
                Elo helps you build a natural speaking rhythm through consistent practice with expert tutors and AI-powered feedback.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">Policies</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-xs font-bold text-zinc-400 hover:text-indigo-600 transition-colors">Subscription Terms</a></li>
                  <li><a href="#" className="text-xs font-bold text-zinc-400 hover:text-indigo-600 transition-colors">Refund Policy</a></li>
                  <li><a href="#" className="text-xs font-bold text-zinc-400 hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
              <div className="space-y-4 text-right md:text-left">
                <h4 className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">Support</h4>
                <p className="text-xs font-bold text-zinc-400">support@elo.com</p>
                <div className="flex justify-end md:justify-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-all">
                    <Globe className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">© 2026 ELO LANGUAGE LEARNING. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Secure Payments</span>
              <div className="flex items-center gap-3 opacity-40 grayscale">
                <ShieldCheck className="w-4 h-4" />
                <div className="flex items-center gap-1">
                  <div className="w-7 h-4 border border-zinc-300 rounded-sm flex items-center justify-center text-[5px] font-black text-zinc-400">PAYPAL</div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <Modal isOpen={isManagingPlan} onClose={() => setIsManagingPlan(false)}>
        <div className="p-8 space-y-8">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-zinc-900">Subscription Status</h3>
              <p className="text-zinc-500 text-sm">Elo Plus · $75 / month</p>
            </div>
            <button onClick={() => setIsManagingPlan(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <XCircle className="w-6 h-6 text-zinc-300" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-zinc-900">Auto-renewal</p>
                  <p className="text-xs text-zinc-500">
                    {isCanceled ? 'Subscription will end on April 1, 2026' : 'Next charge on April 1, 2026'}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setIsAutoRenew(!isAutoRenew);
                    setIsCanceled(!isAutoRenew);
                  }}
                  className={`w-12 h-6 rounded-full transition-colors relative ${isAutoRenew ? 'bg-indigo-600' : 'bg-zinc-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isAutoRenew ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>

            {pendingPlanChange && (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <p className="text-xs text-amber-900 font-medium leading-tight">
                  You have a pending plan change to <span className="font-bold">{pendingPlanChange}</span> starting April 1.
                </p>
              </div>
            )}

            <div className="space-y-3 pt-4">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Danger Zone</p>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setIsCanceled(true);
                  setIsAutoRenew(false);
                }}
                className="w-full text-rose-600 hover:bg-rose-50 hover:text-rose-700 justify-start px-4 py-3 rounded-xl text-sm font-bold"
              >
                Cancel Subscription
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={() => setIsManagingPlan(false)} className="w-full py-4 rounded-xl font-bold">
              Done
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isConfirmingChange} onClose={() => setIsConfirmingChange(false)}>
        <div className="p-8 space-y-6">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
            <RefreshCw className="w-8 h-8" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-zinc-900">Confirm Plan Change</h3>
            <p className="text-zinc-500 text-sm">
              You are switching to the <span className="text-zinc-900 font-bold">{PLANS.find(p => p.id === pendingPlanToConfirm)?.name}</span> plan.
            </p>
          </div>
          
          <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100 space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-indigo-500 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-zinc-900">Effective Next Cycle</p>
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  Your current plan remains active until <span className="font-bold text-zinc-700">April 1, 2026</span>. 
                  The new plan and price will apply automatically on that date.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-indigo-500 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-zinc-900">No Immediate Charge</p>
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  You won't be charged today. Your next invoice will reflect the new plan price.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={handleConfirmPlanChange} className="w-full py-4 rounded-xl font-bold bg-zinc-900 hover:bg-zinc-800">
              Confirm Change
            </Button>
            <Button variant="secondary" onClick={() => setIsConfirmingChange(false)} className="w-full py-4 rounded-xl font-bold border-zinc-200">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={status !== 'IDLE'} onClose={() => status === 'SUCCESS' || status === 'FAILURE' ? setStatus('IDLE') : null}>
        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderModalContent()}
          </motion.div>
        </AnimatePresence>
      </Modal>
    </div>
  );
};

export default Billing;
