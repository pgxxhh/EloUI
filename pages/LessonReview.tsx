import React, { useState, useRef, useEffect } from 'react';
// Redesigned Learning Studio - Version 2.0
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  User, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  Mic2, 
  Volume2, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  BookOpen,
  ChevronRight,
  Target,
  MessageSquare,
  Languages,
  Info,
  Zap,
  Link,
  FileText,
  Layout,
  MessageCircle,
  FileCode,
  Brain,
  History as HistoryIcon,
  TrendingUp,
  Lock,
  Settings,
  MoreHorizontal,
  PlayCircle,
  ExternalLink
} from 'lucide-react';
import { Button, Card, Badge } from '../components/UI';
import { MOCK_HISTORY } from '../constants';
import { SessionOutcome, LearnerMemoryUpdate, EvidenceMoment } from '../types';

// --- Types ---

interface TranscriptLine {
  id: string;
  timestamp: string;
  speaker: 'Coach' | 'You';
  text: string;
  pinyin?: string;
  translation?: string;
  type?: 'issue' | 'highlight' | 'new-phrase';
  aiFeedback?: {
    whatYouSaid: string;
    betterVersion: string;
    pinyin: string;
    whyItMatters: string;
    category: string;
    drillDuration?: string;
    drillGoal?: string;
  };
}

type TabType = 'Transcript' | 'Feedback' | 'History';

// --- Mock Data ---

const MOCK_OUTCOME: SessionOutcome = {
  conclusion: "You're showing stronger control over workplace introductions.",
  explanation: "Great progress today! You successfully navigated workplace small talk and accurately used '任职于' (to hold a position) in context. This formal expression significantly elevates your professional tone."
};

const MOCK_TOP_EVIDENCE: EvidenceMoment[] = [
  {
    id: 'e1',
    original: "我在一个大公司工作",
    refined: "我在一家大型企业任职",
    pinyin: "Wǒ zài yì jiā dàxíng qǐyè rènzhí",
    explanation: "In a professional context, using the measure word '一家' and the formal verb '任职' makes your introduction sound more sophisticated and appropriate for the workplace.",
    timestamp: "00:42"
  },
  {
    id: 'e2',
    original: "我的同事们也都很努力",
    refined: "我的同事们都兢兢业业",
    pinyin: "Wǒ de tóngshìmen dōu jīng jīng yè yè",
    explanation: "While '努力' is correct, '兢兢业业' is a common idiom (chengyu) used to describe someone who is dedicated and conscientious, which adds a native-like touch to your workplace descriptions.",
    timestamp: "03:20"
  }
];

const MOCK_MEMORY_UPDATE = {
  newlyCaptured: [
    { text: "Formal workplace self-introduction", source: "Evidence #1", impact: "Next lesson focus" },
    { text: "Measure word '一家' for companies", source: "Evidence #1", impact: "Study Assistant priority" }
  ],
  unstablePatterns: [
    { text: "Verb-resultative complements (加班加到)", source: "Transcript 01:15", impact: "Adaptive Planner focus" },
    { text: "Past tense completion with '了'", source: "Transcript 02:14", impact: "Drill priority" }
  ],
  currentFocus: "Improving professional tone and structural accuracy in workplace social scenarios.",
  nextLessonDirection: "Simulating project status reporting and feedback sessions.",
  confidence: {
    label: "Steady Growth",
    level: 4
  }
};

const MOCK_TRANSCRIPT: TranscriptLine[] = [
  { id: 't1', timestamp: '00:05', speaker: 'Coach', text: '你好！今天想聊点什么？', translation: 'Hello! What would you like to talk about today?' },
  { id: 't2', timestamp: '00:12', speaker: 'You', text: '我想聊聊我的工作。', translation: 'I want to talk about my work.' },
  { id: 't3', timestamp: '00:25', speaker: 'Coach', text: '太好了。你在哪里工作？', translation: 'Great. Where do you work?' },
  { 
    id: 't4', 
    timestamp: '00:42',
    speaker: 'You', 
    text: '我在一个大公司工作，但是我很忙。', 
    pinyin: 'Wǒ zài yí gè dà gōngsī gōngzuò, dànshì wǒ hěn máng.',
    translation: 'I work in a big company, but I am very busy.',
    type: 'highlight',
    aiFeedback: {
      whatYouSaid: '我在一个大公司工作',
      betterVersion: '我在一家大型企业任职',
      pinyin: 'Wǒ zài yì jiā dàxíng qǐyè rènzhí',
      whyItMatters: '在职场语境下，使用量词“一家”并搭配正式词汇“任职”，会让表达显得更专业、更得体。',
      category: '词汇升级'
    }
  },
  { 
    id: 't5', 
    timestamp: '01:15',
    speaker: 'You', 
    text: '我昨天加班到十点', 
    pinyin: 'Wǒ zuótiān jiābān dào shí diǎn.',
    translation: 'I worked overtime until 10 yesterday.',
    type: 'issue',
    aiFeedback: {
      whatYouSaid: '我昨天加班到十点',
      betterVersion: '我昨天加班加到晚上十点',
      pinyin: 'Wǒ zuótiān jiābān jiā dào wǎnshàng shí diǎn',
      whyItMatters: '在“到”之前重复动词“加”，构成了动结式补语，能更清晰地强调动作的持续时间和结果。',
      category: '语法修正'
    }
  },
  { 
    id: 't6', 
    timestamp: '02:14', 
    speaker: 'You', 
    text: '我昨天去商店买三个苹果。', 
    pinyin: 'Wǒ zuótiān qù shāngdiàn mǎi sān gè píngguǒ.', 
    translation: 'I went to the store to buy three apples yesterday.', 
    type: 'issue',
    aiFeedback: {
      whatYouSaid: '买三个苹果',
      betterVersion: '买了三个苹果',
      pinyin: 'mǎi le sān gè píngguǒ',
      whyItMatters: '助词“了”在这里至关重要，它明确表示动作在过去已经完成。',
      category: '语法修正'
    }
  },
  {
    id: 't7',
    timestamp: '03:05',
    speaker: 'Coach',
    text: '听起来你真的很辛苦。那你的同事们呢？',
    translation: 'Sounds like you are really working hard. What about your colleagues?'
  },
  {
    id: 't8',
    timestamp: '03:20',
    speaker: 'You',
    text: '我的同事们也都很努力。',
    translation: 'My colleagues are also very hardworking.',
    type: 'new-phrase',
    aiFeedback: {
      whatYouSaid: '努力',
      betterVersion: '兢兢业业',
      pinyin: 'jīng jīng yè yè',
      whyItMatters: '“兢兢业业”是一个非常地道的成语，形容做事小心谨慎、认真负责，在职场评价中非常加分。',
      category: '成语表达'
    }
  }
];

const LessonReview: React.FC<{ 
  sessionId?: string | null; 
  onBack?: () => void;
  initialTab?: TabType;
}> = ({ sessionId: initialSessionId, onBack, initialTab = 'Feedback' }) => {
  const [reviewStatus, setReviewStatus] = useState<'LOADING' | 'READY' | 'FAILED' | 'NO_RECORDING'>('LOADING');
  const [sessionId, setSessionId] = useState<string | null>(initialSessionId || '1');
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [filter, setFilter] = useState<'All' | 'Critical' | 'Upgrades'>('All');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 300;
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReviewStatus('READY');
    }, 1500);
    return () => clearTimeout(timer);
  }, [sessionId]);

  const filteredTranscript = MOCK_TRANSCRIPT.filter(line => {
    if (filter === 'All') return true;
    if (filter === 'Critical') return line.type === 'issue';
    if (filter === 'Upgrades') return line.type === 'highlight' || line.type === 'new-phrase';
    return true;
  });

  const handleJumpToTime = (timestamp: string) => {
    const [mins, secs] = timestamp.split(':').map(Number);
    setCurrentTime(mins * 60 + secs);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-indigo-100 animate-in fade-in duration-700 pb-20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/40 to-transparent rounded-full blur-3xl -z-10"></div>
      
      {/* Top Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-4 md:px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={onBack} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <RotateCcw className="w-4 h-4 text-zinc-500" />
            </button>
            <div className="space-y-0.5">
              <h1 className="text-base md:text-lg font-bold text-zinc-900">Session Review</h1>
              <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-widest">Learning Studio</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-50 rounded-lg border border-zinc-100">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-tight">March 17, 2026</span>
            </div>
            <Button variant="secondary" className="rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-wider">
              Share
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        <AnimatePresence mode="wait">
          {reviewStatus === 'LOADING' ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] space-y-8"
            >
              <div className="relative">
                <div className="w-24 h-24 border-4 border-zinc-100 border-t-indigo-600 rounded-full animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-indigo-600 animate-pulse" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-zinc-900">Updating your learning memory...</h2>
                <p className="text-zinc-500 font-medium">Elo is analyzing your session and refining your profile.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row gap-12 items-start"
            >
              {/* LEFT: Session Context Card (Sticky) */}
              <div className="w-full lg:w-[340px] lg:sticky lg:top-28 space-y-6">
                <Card className="p-6 bg-white border-zinc-100 shadow-xl shadow-zinc-200/30 rounded-[2rem] overflow-hidden relative">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Session Context</p>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 leading-tight">Workplace Small Talk</h3>
                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-50 rounded-lg border border-zinc-100">
                          <User className="w-3 h-3 text-zinc-400" />
                          <span className="text-[10px] font-bold text-zinc-600">Lin Wang</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-50 rounded-lg border border-zinc-100">
                          <Clock className="w-3 h-3 text-zinc-400" />
                          <span className="text-[10px] font-bold text-zinc-600">25 mins</span>
                        </div>
                      </div>
                    </div>

                    {/* Audio Player Strip */}
                    <div className="space-y-4 pt-4 border-t border-zinc-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                          >
                            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                          </button>
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold text-zinc-900">
                              {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
                            </p>
                            <p className="text-[9px] font-bold text-zinc-400">/ 05:00</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400">
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400">
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="relative h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-300"
                          style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Accuracy/Fluency Mini Badges (De-emphasized) */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className="flex-1 flex items-center justify-between px-3 py-2 bg-zinc-50 rounded-xl border border-zinc-100">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight">Accuracy</span>
                        <span className="text-[11px] font-bold text-zinc-900">92%</span>
                      </div>
                      <div className="flex-1 flex items-center justify-between px-3 py-2 bg-zinc-50 rounded-xl border border-zinc-100">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight">Fluency</span>
                        <span className="text-[11px] font-bold text-zinc-900">B+</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* RIGHT: Main Content Tabs */}
              <div className="flex-1 w-full space-y-10">
                <div className="flex items-center gap-10 border-b border-zinc-100">
                  {([['Feedback', 'Learning Feedback'], ['Transcript', 'Transcript'], ['History', 'History']] as const).map(([tab, label]) => {
                    const isActive = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative pb-4 text-sm font-bold transition-all ${
                          isActive ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'
                        }`}
                      >
                        {label}
                        {isActive && (
                          <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'Feedback' && (
                    <motion.div
                      key="feedback"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-16"
                    >
                      {/* 1. Session Outcome */}
                      <section className="space-y-6">
                        <div className="space-y-3">
                          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-indigo-100">
                            <CheckCircle2 className="w-3 h-3" />
                            Session Outcome
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
                            {MOCK_OUTCOME.conclusion}
                          </h2>
                          <p className="text-lg text-zinc-500 leading-relaxed max-w-3xl">
                            {MOCK_OUTCOME.explanation}
                          </p>
                        </div>
                      </section>

                      {/* 2. Top Evidence Moments */}
                      <section className="space-y-8">
                        <div className="flex items-center gap-4">
                          <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-indigo-500" />
                            Top Evidence Moments
                          </h3>
                          <div className="h-px flex-1 bg-zinc-100" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {MOCK_TOP_EVIDENCE.map((evidence) => (
                            <Card key={evidence.id} className="p-8 bg-white border-zinc-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-4">
                                <button 
                                  onClick={() => {
                                    setActiveTab('Transcript');
                                    handleJumpToTime(evidence.timestamp);
                                  }}
                                  className="p-2 bg-zinc-50 text-zinc-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                                >
                                  <PlayCircle className="w-5 h-5" />
                                </button>
                              </div>
                              <div className="space-y-6">
                                <div className="space-y-2">
                                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Original</p>
                                  <p className="text-lg font-medium text-zinc-400 italic">"{evidence.original}"</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Refined</p>
                                  <p className="text-xl font-bold text-zinc-900 leading-tight">{evidence.refined}</p>
                                  {evidence.pinyin && <p className="text-xs text-zinc-400 font-medium">{evidence.pinyin}</p>}
                                </div>
                                <div className="pt-4 border-t border-zinc-50">
                                  <p className="text-sm text-zinc-600 leading-relaxed">{evidence.explanation}</p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </section>

                      {/* 3. Learner Memory Update */}
                      <section className="space-y-8">
                        <div className="flex items-center gap-4">
                          <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                            <Brain className="w-3.5 h-3.5 text-emerald-500" />
                            Learner Memory Update
                          </h3>
                          <div className="h-px flex-1 bg-zinc-100" />
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Memory Active</span>
                            <button className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors">
                              <Settings className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                          <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Newly Captured */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Newly Captured Progress</p>
                                </div>
                                <button className="text-[9px] font-bold text-zinc-300 hover:text-zinc-500 uppercase tracking-widest">Edit</button>
                              </div>
                              <div className="space-y-3">
                                {MOCK_MEMORY_UPDATE.newlyCaptured.map((item, i) => (
                                  <div key={i} className="p-5 bg-emerald-50/30 border border-emerald-100/50 rounded-2xl group relative space-y-2">
                                    <div className="flex items-center gap-3">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                      <p className="text-sm font-bold text-zinc-900">{item.text}</p>
                                    </div>
                                    <div className="flex items-center gap-4 pl-7">
                                      <div className="flex items-center gap-1">
                                        <Link className="w-2.5 h-2.5 text-zinc-400" />
                                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight">{item.source}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                                        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tight">{item.impact}</span>
                                      </div>
                                    </div>
                                    <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-1 hover:bg-emerald-100 rounded-md transition-all">
                                      <MoreHorizontal className="w-3.5 h-3.5 text-emerald-600" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Unstable Patterns */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Still Unstable / Focus</p>
                                </div>
                                <button className="text-[9px] font-bold text-zinc-300 hover:text-zinc-500 uppercase tracking-widest">Edit</button>
                              </div>
                              <div className="space-y-3">
                                {MOCK_MEMORY_UPDATE.unstablePatterns.map((item, i) => (
                                  <div key={i} className="p-5 bg-amber-50/30 border border-amber-100/50 rounded-2xl group relative space-y-2">
                                    <div className="flex items-center gap-3">
                                      <Target className="w-4 h-4 text-amber-500 shrink-0" />
                                      <p className="text-sm font-bold text-zinc-900">{item.text}</p>
                                    </div>
                                    <div className="flex items-center gap-4 pl-7">
                                      <div className="flex items-center gap-1">
                                        <Link className="w-2.5 h-2.5 text-zinc-400" />
                                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight">{item.source}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Zap className="w-2.5 h-2.5 text-amber-500" />
                                        <span className="text-[9px] font-bold text-amber-600 uppercase tracking-tight">{item.impact}</span>
                                      </div>
                                    </div>
                                    <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-1 hover:bg-amber-100 rounded-md transition-all">
                                      <MoreHorizontal className="w-3.5 h-3.5 text-amber-600" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Memory Summary Card */}
                          <div className="xl:col-span-4">
                            <Card className="p-8 bg-zinc-900 text-white rounded-[2.5rem] space-y-8 relative overflow-hidden shadow-2xl shadow-zinc-900/20">
                              <div className="absolute top-0 right-0 p-6">
                                <Lock className="w-4 h-4 text-zinc-700" />
                              </div>
                              <div className="space-y-4">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Confidence Level</p>
                                <div className="flex items-center gap-3">
                                  <p className="text-2xl font-bold">{MOCK_MEMORY_UPDATE.confidence.label}</p>
                                  <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(s => (
                                      <div key={s} className={`w-1.5 h-1.5 rounded-full ${s <= MOCK_MEMORY_UPDATE.confidence.level ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Recommended Path</p>
                                <p className="text-sm font-medium text-zinc-300 leading-relaxed">
                                  {MOCK_MEMORY_UPDATE.nextLessonDirection}
                                </p>
                              </div>
                              <Button className="w-full bg-white text-zinc-900 hover:bg-zinc-100 rounded-2xl py-4 font-bold shadow-lg">
                                Review Memory Details
                              </Button>
                            </Card>
                          </div>
                        </div>
                      </section>

                      {/* 4. Next Recommended Action */}
                      <section className="pt-10">
                        <div className="p-10 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                          <div className="space-y-3 relative">
                            <div className="flex items-center gap-2 text-indigo-600">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-[10px] font-bold uppercase tracking-widest">Next Action</span>
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-900">Solidify your progress</h3>
                            <p className="text-zinc-500 max-w-md text-sm leading-relaxed">
                              Based on your session, we recommend practicing these workplace expressions in a new scenario to ensure long-term retention.
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 relative w-full md:w-auto">
                            <Button className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-2xl px-8 py-4 font-bold shadow-lg shadow-indigo-200/50 flex-1 md:flex-none">
                              Start Next Practice
                            </Button>
                            <Button variant="secondary" className="bg-white text-zinc-600 hover:bg-zinc-50 border-zinc-200 rounded-2xl px-8 py-4 font-bold flex-1 md:flex-none">
                              Schedule Lesson
                            </Button>
                          </div>
                        </div>
                      </section>
                    </motion.div>
                  )}

                  {activeTab === 'Transcript' && (
                    <motion.div
                      key="transcript"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      {/* Transcript Header / Controls */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                            <MessageSquare className="w-5 h-5" />
                          </div>
                          <div className="space-y-0.5">
                            <h3 className="text-lg font-bold text-zinc-900">Evidence Reader</h3>
                            <p className="text-xs text-zinc-400 font-medium">Review key moments with audio playback</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-xl self-start">
                          {([['All', 'All'], ['Critical', 'Critical'], ['Upgrades', 'Upgrades']] as const).map(([f, label]) => (
                            <button
                              key={f}
                              onClick={() => setFilter(f as any)}
                              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                                filter === f ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Main Transcript List */}
                      <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
                        <div className="divide-y divide-zinc-50">
                          {filteredTranscript.map((line) => {
                            const isSelected = currentTime >= (Number(line.timestamp.split(':')[0]) * 60 + Number(line.timestamp.split(':')[1])) && 
                                             currentTime < (Number(line.timestamp.split(':')[0]) * 60 + Number(line.timestamp.split(':')[1]) + 10);
                            
                            return (
                              <div 
                                key={line.id}
                                onClick={() => handleJumpToTime(line.timestamp)}
                                className={`group flex gap-6 p-8 transition-all cursor-pointer border-l-4 ${
                                  isSelected ? 'bg-indigo-50/40 border-indigo-500' : 'hover:bg-zinc-50/30 border-transparent'
                                }`}
                              >
                                <div className="w-12 shrink-0 flex flex-col items-center gap-3">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shadow-sm transition-all ${
                                    line.speaker === 'Coach' 
                                      ? 'bg-indigo-100 text-indigo-600 border border-indigo-200' 
                                      : 'bg-zinc-900 text-white'
                                  }`}>
                                    {line.speaker === 'Coach' ? 'LW' : 'ME'}
                                  </div>
                                  <span className="text-[10px] font-mono text-zinc-300 font-bold">{line.timestamp}</span>
                                </div>

                                <div className="flex-1 space-y-4">
                                  <div className="flex items-center justify-between">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                                      line.speaker === 'Coach' ? 'text-indigo-400' : 'text-zinc-400'
                                    }`}>
                                      {line.speaker}
                                    </span>
                                    {line.type && (
                                      <Badge color={line.type === 'issue' ? 'rose' : 'indigo'} className="text-[9px] font-bold px-2 py-0.5 rounded-md">
                                        {line.type === 'issue' ? 'CRITICAL' : 'UPGRADE'}
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <p className={`text-xl leading-relaxed transition-all ${
                                      isSelected ? 'text-zinc-900 font-bold' : 'text-zinc-700 font-medium'
                                    }`}>
                                      {line.text}
                                    </p>
                                    {line.translation && (
                                      <p className="text-sm text-zinc-400 font-medium italic">{line.translation}</p>
                                    )}
                                  </div>

                                  {/* Inline Feedback if any */}
                                  {line.aiFeedback && (
                                    <motion.div 
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="mt-6 p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-4"
                                    >
                                      <div className="flex items-center gap-2 text-indigo-600">
                                        <Sparkles className="w-4 h-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">AI Insight</span>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Better Version</p>
                                          <p className="text-lg font-bold text-zinc-900">{line.aiFeedback.betterVersion}</p>
                                          <p className="text-xs text-zinc-400">{line.aiFeedback.pinyin}</p>
                                        </div>
                                        <div className="space-y-1">
                                          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Why it matters</p>
                                          <p className="text-sm text-zinc-600 leading-relaxed">{line.aiFeedback.whyItMatters}</p>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'History' && (
                    <motion.div
                      key="history"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      {/* History Header */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="text-2xl font-bold text-zinc-900">Learning Progression</h3>
                          <p className="text-sm text-zinc-500">See how your skills are evolving over time</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-xl border border-zinc-100">
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-bold text-zinc-600">Overall Score: 92</span>
                        </div>
                      </div>

                      {/* Progression Timeline */}
                      <div className="space-y-6">
                        {MOCK_HISTORY.map((session, idx) => (
                          <Card key={session.id} className="group p-8 bg-white border-zinc-100 rounded-[2.5rem] hover:shadow-xl transition-all relative overflow-hidden">
                            {idx === 0 && (
                              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                            )}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                              <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                                  idx === 0 ? 'bg-indigo-600 text-white' : 'bg-zinc-50 text-zinc-400'
                                }`}>
                                  <HistoryIcon className="w-6 h-6" />
                                </div>
                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-3">
                                    <h4 className="text-xl font-bold text-zinc-900">{session.scenarioTitle}</h4>
                                    {idx === 0 && <Badge color="indigo">Current</Badge>}
                                  </div>
                                  <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {session.date}</span>
                                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {session.coachName}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-10">
                                <div className="text-right space-y-1">
                                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Score</p>
                                  <p className="text-2xl font-bold text-zinc-900">{session.score}</p>
                                </div>
                                <div className="h-10 w-px bg-zinc-100" />
                                <button 
                                  onClick={() => setSessionId(session.id)}
                                  className="p-4 bg-zinc-50 text-zinc-400 rounded-2xl group-hover:bg-zinc-900 group-hover:text-white transition-all"
                                >
                                  <ArrowRight className="w-5 h-5" />
                                </button>
                              </div>
                            </div>

                            {/* Progression Context */}
                            {idx < MOCK_HISTORY.length - 1 && (
                              <div className="mt-8 pt-8 border-t border-zinc-50 flex items-center gap-4">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                  <TrendingUp className="w-3.5 h-3.5" />
                                </div>
                                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                                  Built upon the focus from <span className="text-zinc-900 font-bold">{MOCK_HISTORY[idx+1].scenarioTitle}</span>. 
                                  Successfully improved accuracy by <span className="text-emerald-600 font-bold">+{session.score - MOCK_HISTORY[idx+1].score}%</span>.
                                </p>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default LessonReview;
