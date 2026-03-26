
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft,
  DollarSign,
  Wallet,
  History,
  Info,
  Loader2,
  RefreshCcw
} from 'lucide-react';
import { Button, Card, Badge } from '../components/UI';
import { EarningRecord, PayoutBatch, EarningStatus, PayoutStatus } from '../types';

interface CoachEarningsProps {
  onBack: () => void;
}

const MOCK_EARNINGS: EarningRecord[] = [
  {
    id: 'e1',
    sourceType: 'LESSON',
    sourceId: 'l101',
    status: 'PAID',
    billableMinutes: 30,
    ratePerMinuteCents: 50,
    grossAmountCents: 1500,
    currency: 'USD',
    earnedAt: '2024-03-06T14:30:00Z',
    paidAt: '2024-03-07T09:00:00Z',
    note: 'Business Chinese Session'
  },
  {
    id: 'e2',
    sourceType: 'LESSON',
    sourceId: 'l102',
    status: 'IN_PAYOUT',
    billableMinutes: 15,
    ratePerMinuteCents: 50,
    grossAmountCents: 750,
    currency: 'USD',
    earnedAt: '2024-03-07T10:15:00Z',
    note: 'Pronunciation Drill'
  },
  {
    id: 'e3',
    sourceType: 'LESSON',
    sourceId: 'l103',
    status: 'SETTLED_UNPAID',
    billableMinutes: 45,
    ratePerMinuteCents: 50,
    grossAmountCents: 2250,
    currency: 'USD',
    earnedAt: '2024-03-07T16:00:00Z',
    note: 'Grammar Focus'
  },
  {
    id: 'e4',
    sourceType: 'LESSON',
    sourceId: 'l104',
    status: 'SETTLED_UNPAID',
    billableMinutes: 30,
    ratePerMinuteCents: 50,
    grossAmountCents: 1500,
    currency: 'USD',
    earnedAt: '2024-03-05T09:00:00Z',
  },
  {
    id: 'e5',
    sourceType: 'LESSON',
    sourceId: 'l105',
    status: 'PAID',
    billableMinutes: 60,
    ratePerMinuteCents: 50,
    grossAmountCents: 3000,
    currency: 'USD',
    earnedAt: '2024-03-04T11:00:00Z',
    paidAt: '2024-03-07T09:00:00Z',
  },
  {
    id: 'e6',
    sourceType: 'LESSON',
    sourceId: 'l106',
    status: 'PAID',
    billableMinutes: 30,
    ratePerMinuteCents: 50,
    grossAmountCents: 1500,
    currency: 'USD',
    earnedAt: '2024-03-03T15:00:00Z',
    paidAt: '2024-03-07T09:00:00Z',
  }
];

const MOCK_PAYOUTS: PayoutBatch[] = [
  {
    id: 'pb_001',
    status: 'PAID',
    earningCount: 12,
    grossAmountCents: 18500,
    paidAmountCents: 18500,
    currency: 'USD',
    scheduledFor: '2024-03-07T00:00:00Z',
    paidAt: '2024-03-07T09:00:00Z'
  },
  {
    id: 'pb_002',
    status: 'PROCESSING',
    earningCount: 5,
    grossAmountCents: 7250,
    paidAmountCents: 0,
    currency: 'USD',
    scheduledFor: '2024-03-14T00:00:00Z'
  },
  {
    id: 'pb_003',
    status: 'FAILED',
    earningCount: 8,
    grossAmountCents: 12000,
    paidAmountCents: 0,
    currency: 'USD',
    scheduledFor: '2024-02-28T00:00:00Z',
    failureReason: 'Invalid bank account details'
  }
];

const CoachEarnings: React.FC<CoachEarningsProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'EARNINGS' | 'PAYOUTS'>('EARNINGS');
  const [earningsPage, setEarningsPage] = useState(1);
  const [payoutsPage, setPayoutsPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getEarningStatusBadge = (status: EarningStatus) => {
    switch (status) {
      case 'PAID': return <Badge color="green">Paid</Badge>;
      case 'IN_PAYOUT': return <Badge color="indigo">In Payout</Badge>;
      case 'SETTLED_UNPAID': return <Badge color="zinc">Settled</Badge>;
    }
  };

  const getPayoutStatusBadge = (status: PayoutStatus) => {
    switch (status) {
      case 'PAID': return <Badge color="green">Paid</Badge>;
      case 'PROCESSING': return <Badge color="indigo">Processing</Badge>;
      case 'PENDING': return <Badge color="zinc">Pending</Badge>;
      case 'FAILED': return <Badge color="rose">Failed</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-zinc-500 font-medium">Loading your earnings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-zinc-900">Something went wrong</h3>
          <p className="text-zinc-500">{error}</p>
        </div>
        <Button onClick={onBack} variant="secondary" className="rounded-xl">
          <ArrowLeft className="w-4 h-4" />
          Back to Coach Hub
        </Button>
      </div>
    );
  }

  const paginatedEarnings = MOCK_EARNINGS.slice((earningsPage - 1) * itemsPerPage, earningsPage * itemsPerPage);
  const paginatedPayouts = MOCK_PAYOUTS.slice((payoutsPage - 1) * itemsPerPage, payoutsPage * itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Coach Hub
          </button>
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
            Track what you’ve earned <br />
            <span className="text-indigo-600">and what pays out next.</span>
          </h1>
          <p className="text-zinc-500 max-w-xl">
            Earnings are created after completed, billable lessons settle. 
            Payouts are automatically triggered once your balance reaches the threshold.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Next Payout</p>
            <p className="text-sm font-bold text-zinc-900">March 14, 2024</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Today', amount: 4500, icon: TrendingUp, color: 'emerald' },
          { label: 'This Week', amount: 28500, icon: Clock, color: 'indigo' },
          { label: 'This Month', amount: 124000, icon: Calendar, color: 'indigo' },
          { 
            label: 'Pending Payout', 
            amount: 7250, 
            icon: Wallet, 
            color: 'amber',
            extra: 'Threshold: $50.00'
          }
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-zinc-100 hover:border-indigo-100 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">USD</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-zinc-500">{stat.label}</p>
              <p className="text-2xl font-bold text-zinc-900 tracking-tight">{formatCurrency(stat.amount)}</p>
            </div>
            {stat.extra && (
              <div className="mt-4 pt-4 border-t border-zinc-50 flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                <Info className="w-3 h-3" />
                {stat.extra}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Tabs & Lists */}
      <div className="space-y-6">
        <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('EARNINGS')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'EARNINGS' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            Recent Earnings
          </button>
          <button 
            onClick={() => setActiveTab('PAYOUTS')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'PAYOUTS' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            Payout History
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'EARNINGS' ? (
            <motion.div 
              key="earnings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {MOCK_EARNINGS.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-3">
                    {paginatedEarnings.map((earning) => (
                      <Card key={earning.id} className="p-5 border-zinc-100 hover:border-indigo-100 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400">
                              <DollarSign className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-zinc-900">
                                  {earning.sourceType === 'LESSON' ? `Lesson #${earning.sourceId}` : 'Bonus'}
                                </h4>
                                {getEarningStatusBadge(earning.status)}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-zinc-500">
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {earning.billableMinutes}m</span>
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(earning.earnedAt)}</span>
                                {earning.note && <span className="text-zinc-300">• {earning.note}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between md:justify-end gap-8">
                            <div className="text-right">
                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Gross Amount</p>
                              <p className="text-lg font-bold text-zinc-900">{formatCurrency(earning.grossAmountCents)}</p>
                            </div>
                            <div className="p-2 rounded-xl bg-zinc-50 text-zinc-300">
                              <ChevronRight className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  <div className="flex items-center justify-between pt-4">
                    <p className="text-xs text-zinc-500 font-medium">
                      Showing {(earningsPage - 1) * itemsPerPage + 1} to {Math.min(earningsPage * itemsPerPage, MOCK_EARNINGS.length)} of {MOCK_EARNINGS.length} earnings
                    </p>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        disabled={earningsPage === 1}
                        onClick={() => setEarningsPage(p => p - 1)}
                        className="p-2 rounded-xl"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        disabled={earningsPage * itemsPerPage >= MOCK_EARNINGS.length}
                        onClick={() => setEarningsPage(p => p + 1)}
                        className="p-2 rounded-xl"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-20 text-center space-y-4 bg-zinc-50 rounded-[2.5rem] border-2 border-dashed border-zinc-200">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-zinc-300">
                    <DollarSign className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-zinc-900">No earnings yet.</h3>
                    <p className="text-zinc-500 text-sm max-w-xs mx-auto">Complete your first lesson to start building your payout balance.</p>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="payouts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {MOCK_PAYOUTS.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-3">
                    {paginatedPayouts.map((payout) => (
                      <Card key={payout.id} className="p-5 border-zinc-100 hover:border-indigo-100 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${payout.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : payout.status === 'FAILED' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'}`}>
                              <History className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-zinc-900">Batch {payout.id}</h4>
                                {getPayoutStatusBadge(payout.status)}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-zinc-500">
                                <span className="flex items-center gap-1"><RefreshCcw className="w-3 h-3" /> {payout.earningCount} items</span>
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {payout.status === 'PAID' ? `Paid on ${formatDate(payout.paidAt!)}` : `Scheduled for ${formatDate(payout.scheduledFor)}`}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 md:max-w-xs">
                            {payout.status === 'FAILED' && payout.failureReason && (
                              <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-100">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {payout.failureReason}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between md:justify-end gap-8">
                            <div className="text-right">
                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Total Paid</p>
                              <p className="text-lg font-bold text-zinc-900">{formatCurrency(payout.paidAmountCents || payout.grossAmountCents)}</p>
                            </div>
                            <div className="p-2 rounded-xl bg-zinc-50 text-zinc-300">
                              <ChevronRight className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between pt-4">
                    <p className="text-xs text-zinc-500 font-medium">
                      Showing {(payoutsPage - 1) * itemsPerPage + 1} to {Math.min(payoutsPage * itemsPerPage, MOCK_PAYOUTS.length)} of {MOCK_PAYOUTS.length} batches
                    </p>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        disabled={payoutsPage === 1}
                        onClick={() => setPayoutsPage(p => p - 1)}
                        className="p-2 rounded-xl"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        disabled={payoutsPage * itemsPerPage >= MOCK_PAYOUTS.length}
                        onClick={() => setPayoutsPage(p => p + 1)}
                        className="p-2 rounded-xl"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-20 text-center space-y-4 bg-zinc-50 rounded-[2.5rem] border-2 border-dashed border-zinc-200">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-zinc-300">
                    <History className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-zinc-900">No payout batches yet.</h3>
                    <p className="text-zinc-500 text-sm max-w-xs mx-auto">Once your settled balance crosses the threshold, payouts will appear here.</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CoachEarnings;
