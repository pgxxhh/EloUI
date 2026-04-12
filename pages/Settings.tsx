
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Globe, 
  Camera, 
  Brain, 
  CheckCircle2, 
  PauseCircle, 
  AlertCircle, 
  Save, 
  X, 
  ChevronRight, 
  Lock,
  Info,
  Sparkles,
  Target,
  TrendingUp,
  Settings as SettingsIcon,
  Clock
} from 'lucide-react';
import { Button, Card, Badge } from '../components/UI';

// --- Types ---

interface MemoryItem {
  type: string;
  headline: string;
  detail?: string;
}

interface LearnerMemoryState {
  isActive: boolean;
  recentWin: string;
  currentFocus: string;
  confidence: {
    label: string;
    level: number;
  };
  activeItems: MemoryItem[];
}

// --- Mock Data ---

const MOCK_MEMORY: LearnerMemoryState = {
  isActive: true,
  recentWin: "Mastered workplace introductions and formal measure words.",
  currentFocus: "Improving structural accuracy in project reporting scenarios.",
  confidence: {
    label: "Steady Growth",
    level: 4
  },
  activeItems: [
    { 
      type: "Vocabulary", 
      headline: "Professional Verbs", 
      detail: "Successfully transitioned from '工作' to '任职' in formal contexts." 
    },
    { 
      type: "Grammar", 
      headline: "Resultative Complements", 
      detail: "Showing consistency with 'V+到' structures, though still needs monitoring." 
    },
    { 
      type: "Tone", 
      headline: "Workplace Etiquette", 
      detail: "Naturally using honorifics and formal address in simulated meetings." 
    }
  ]
};

const Settings: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  // Form State
  const [displayName, setDisplayName] = useState('John Doe');
  const [timezone, setTimezone] = useState('Asia/Shanghai (GMT+8)');
  const [email] = useState('975022570yp@gmail.com');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');

  // Memory State
  const [memory, setMemory] = useState<LearnerMemoryState>(MOCK_MEMORY);
  const [isMemoryLoading, setIsMemoryLoading] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('SUCCESS');
      setTimeout(() => setSaveStatus('IDLE'), 3000);
    }, 1000);
  };

  const toggleMemory = () => {
    setMemory(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-indigo-100 animate-in fade-in duration-700 pb-32 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-indigo-50/30 to-transparent rounded-full blur-3xl -z-10"></div>
      
      {/* Page Header */}
      <header className="max-w-[1200px] mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Settings</h1>
              <Badge color="emerald" className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md">
                Account Ready
              </Badge>
            </div>
            <p className="text-zinc-500 font-medium">Manage your learning identity and how Elo remembers your progress.</p>
          </div>
          {onBack && (
            <Button variant="secondary" onClick={onBack} className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider">
              Return to Home
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT SIDEBAR: Identity Card */}
        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
          <Card className="p-8 bg-white border-zinc-100 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-6">
              <Lock className="w-4 h-4 text-zinc-100 group-hover:text-zinc-200 transition-colors" />
            </div>
            
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Avatar Uploader */}
              <div className="relative">
                <div className="w-32 h-32 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-4xl font-bold text-indigo-600 border-2 border-indigo-100 shadow-inner overflow-hidden">
                  JD
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-zinc-900 text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all border-4 border-white">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-zinc-900">{displayName}</h2>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm text-zinc-400 font-medium">{email}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <Badge color="zinc" className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-zinc-50 text-zinc-400 border-zinc-100 uppercase tracking-wider">Learner</Badge>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50/50 border border-emerald-100/50">
                      <div className="w-1 h-1 rounded-full bg-emerald-500" />
                      <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Nav / Info */}
          <div className="px-4 space-y-4">
            <div className="flex items-center gap-3 text-zinc-400">
              <Info className="w-4 h-4" />
              <p className="text-xs font-medium leading-relaxed">
                Your email is managed by your authentication provider and cannot be changed here.
              </p>
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT: Forms & Memory */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* SECTION 1: Account Settings */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-indigo-500" />
                Account Details
              </h3>
              <div className="h-px flex-1 bg-zinc-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Display Name</label>
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Timezone</label>
                <div className="relative">
                  <select 
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                  >
                    <option>Asia/Shanghai (GMT+8)</option>
                    <option>America/New_York (GMT-5)</option>
                    <option>Europe/London (GMT+0)</option>
                    <option>Asia/Tokyo (GMT+9)</option>
                  </select>
                  <Globe className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 pointer-events-none" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl">
                  <span className="text-sm font-bold text-zinc-400">{email}</span>
                  <Lock className="w-4 h-4 text-zinc-200" />
                </div>
                <p className="text-[10px] text-zinc-400 font-medium ml-1">Managed via Google Authentication</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl px-8 py-4 font-bold shadow-xl shadow-zinc-200 flex items-center gap-2 min-w-[160px] justify-center"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : saveStatus === 'SUCCESS' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSaving ? 'Saving...' : saveStatus === 'SUCCESS' ? 'Changes Saved' : 'Save Changes'}
              </Button>
              <button 
                onClick={() => setDisplayName('John Doe')}
                className="text-xs font-bold text-zinc-400 hover:text-zinc-600 uppercase tracking-widest px-4"
              >
                Cancel
              </button>
            </div>
          </section>

          {/* SECTION 2: Learner Memory Control */}
          <section className="space-y-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                  <Brain className="w-3.5 h-3.5 text-emerald-500" />
                  Learner Memory
                </h3>
                <div className="h-px flex-1 bg-zinc-100" />
              </div>
              
              {/* Memory Toggle */}
              <div className="flex items-center gap-3 bg-zinc-50 p-1.5 rounded-2xl border border-zinc-100">
                <button 
                  onClick={() => setMemory(prev => ({ ...prev, isActive: true }))}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${memory.isActive ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  Active
                </button>
                <button 
                  onClick={() => setMemory(prev => ({ ...prev, isActive: false }))}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${!memory.isActive ? 'bg-zinc-900 text-white shadow-lg' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  Paused
                </button>
              </div>
            </div>

            <div className="space-y-10">
              {/* Memory Status Banner */}
              <AnimatePresence mode="wait">
                {!memory.isActive ? (
                  <motion.div 
                    key="paused"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-8 bg-zinc-900 text-white rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <PauseCircle className="w-24 h-24" />
                    </div>
                    <div className="space-y-2 relative">
                      <h4 className="text-xl font-bold">Memory is currently paused</h4>
                      <p className="text-zinc-400 text-sm max-w-md">
                        Elo will stop capturing new insights from your lessons. Your existing memory data remains safe but won't be updated.
                      </p>
                    </div>
                    <Button 
                      onClick={() => setMemory(prev => ({ ...prev, isActive: true }))}
                      className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-2xl px-8 py-4 font-bold shadow-xl relative"
                    >
                      Resume Learning Memory
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="active"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-10"
                  >
                    {/* Memory Summary Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-emerald-50/30 border border-emerald-100/50 rounded-[2rem] space-y-3">
                        <div className="flex items-center gap-2 text-emerald-600">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Recent Win</span>
                        </div>
                        <p className="text-sm font-bold text-zinc-900 leading-relaxed">{memory.recentWin}</p>
                      </div>
                      <div className="p-6 bg-indigo-50/30 border border-indigo-100/50 rounded-[2rem] space-y-3">
                        <div className="flex items-center gap-2 text-indigo-600">
                          <Target className="w-3.5 h-3.5" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Current Focus</span>
                        </div>
                        <p className="text-sm font-bold text-zinc-900 leading-relaxed">{memory.currentFocus}</p>
                      </div>
                      <div className="p-6 bg-zinc-900 text-white rounded-[2rem] space-y-3 shadow-xl shadow-zinc-200">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Confidence</span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg font-bold">{memory.confidence.label}</p>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(s => (
                              <div key={s} className={`w-1.5 h-1.5 rounded-full ${s <= memory.confidence.level ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Active Memory Items */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Active Memory Items</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {memory.activeItems.map((item, i) => (
                          <Card key={i} className="p-6 bg-white border-zinc-100 rounded-3xl shadow-sm hover:shadow-xl transition-all group relative">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Badge color="zinc" className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-zinc-50 text-zinc-500 border-zinc-100">
                                  {item.type}
                                </Badge>
                                <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-zinc-50 rounded-lg transition-all">
                                  <SettingsIcon className="w-3.5 h-3.5 text-zinc-400" />
                                </button>
                              </div>
                              <div className="space-y-1">
                                <h5 className="text-base font-bold text-zinc-900">{item.headline}</h5>
                                {item.detail && <p className="text-xs text-zinc-500 leading-relaxed">{item.detail}</p>}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Settings;
