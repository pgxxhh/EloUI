import React, { useState, useRef, useEffect } from 'react';
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
  FileCode
} from 'lucide-react';
import { Button, Card, Badge } from '../components/UI';

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

interface PracticeCard {
  id: string;
  chinese: string;
  pinyin: string;
  english: string;
  focus: string;
  skill: string;
  reason: string;
  effort: string;
}

// --- Mock Data ---

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
      category: '词汇升级',
      drillDuration: '1 分钟',
      drillGoal: '掌握职场正式自我介绍'
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
      category: '语法修正',
      drillDuration: '2 分钟',
      drillGoal: '修正动结式补语的用法'
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
      category: '语法修正',
      drillDuration: '1 分钟',
      drillGoal: '练习过去完成时的表达'
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
      category: '成语表达',
      drillDuration: '2 分钟',
      drillGoal: '学习职场高阶成语'
    }
  }
];

const PRACTICE_CARDS: PracticeCard[] = [
  { 
    id: 'p1', 
    chinese: '我在一家大型企业任职。', 
    pinyin: 'Wǒ zài yì jiā dàxíng qǐyè rènzhí.', 
    english: 'I hold a position in a large corporation.', 
    focus: '职场用语升级',
    skill: '专业词汇',
    reason: '将基础的“工作”升级为更具职业感的“任职”',
    effort: '1 分钟'
  },
  { 
    id: 'p2', 
    chinese: '我昨天加班加到晚上十点。', 
    pinyin: 'Wǒ zuótiān jiābān jiā dào wǎnshàng shí diǎn.', 
    english: 'I worked overtime until 10 PM yesterday.', 
    focus: '句式结构修正',
    skill: '语法准确性',
    reason: '修正表达持续时长时常见的结构错误',
    effort: '2 分钟'
  },
  { 
    id: 'p3', 
    chinese: '我的同事们都兢兢业业。', 
    pinyin: 'Wǒ de tóngshìmen dōu jīng jīng yè yè.', 
    english: 'My colleagues are all very conscientious.', 
    focus: '表达地道化',
    skill: '母语级流利度',
    reason: '引入高阶成语，使职场描述更生动专业',
    effort: '2 分钟'
  }
];

// --- Types ---

type EvidenceGrade = 'FIX' | 'UPGRADE' | 'GOLDEN';
type TabType = 'Transcript' | 'Feedback';

interface AICoachStep {
  id: 'REVIEW' | 'TRANSFER' | 'PRACTICE';
  title: string;
}

const COACH_STEPS: AICoachStep[] = [
  { id: 'REVIEW', title: '实战证据' },
  { id: 'TRANSFER', title: '场景迁移' },
  { id: 'PRACTICE', title: '专项操练' }
];

const LessonReview: React.FC<{ sessionId?: string | null; onBack?: () => void }> = ({ sessionId, onBack }) => {
  const [reviewStatus, setReviewStatus] = useState<'LOADING' | 'READY' | 'FAILED' | 'NO_RECORDING'>('LOADING');
  const [selectedLineId, setSelectedLineId] = useState<string | null>('t5');
  const [activeStep, setActiveStep] = useState<AICoachStep['id']>('REVIEW');
  const [activeTab, setActiveTab] = useState<TabType>('Transcript');
  const [filter, setFilter] = useState<'All' | 'Critical' | 'Upgrades' | 'Golden'>('All');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(75);
  const [isRecording, setIsRecording] = useState(false);
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const totalDuration = 300;
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate AI report generation
    const timer = setTimeout(() => {
      // If no session ID, simulate no recording
      if (!sessionId && Math.random() > 0.9) {
        setReviewStatus('NO_RECORDING');
      } else {
        setReviewStatus('READY');
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [sessionId]);

  const selectedLine = MOCK_TRANSCRIPT.find(l => l.id === selectedLineId);

  const filteredTranscript = MOCK_TRANSCRIPT.filter(line => {
    if (filter === 'All') return true;
    if (filter === 'Critical') return line.type === 'issue';
    if (filter === 'Upgrades') return line.type === 'highlight';
    if (filter === 'Golden') return line.type === 'new-phrase';
    return true;
  });

  const criticalEvidence = MOCK_TRANSCRIPT.filter(l => l.type === 'issue' || l.type === 'highlight');

  const handleLineClick = (line: TranscriptLine) => {
    setSelectedLineId(line.id);
    setActiveStep('REVIEW');
    const [mins, secs] = line.timestamp.split(':').map(Number);
    setCurrentTime(mins * 60 + secs);
    
    // Scroll to AI panel on mobile
    if (window.innerWidth < 1024) {
      document.getElementById('ai-workbench')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getGradeConfig = (type?: string): { label: string; color: string; icon: any; grade: EvidenceGrade } => {
    if (type === 'issue') return { label: '核心修正', color: 'rose', icon: AlertCircle, grade: 'FIX' };
    if (type === 'highlight') return { label: '地道升级', color: 'indigo', icon: Sparkles, grade: 'UPGRADE' };
    return { label: '金牌表达', color: 'emerald', icon: Star, grade: 'GOLDEN' };
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-indigo-100 animate-in fade-in duration-700 pb-20 relative overflow-hidden">
      {/* Background Glows to match StudentHome */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/40 to-transparent rounded-full blur-3xl -z-10"></div>
      
      {/* Top Header: Refined Archive Style */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-4 md:px-8 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={onBack} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <RotateCcw className="w-4 h-4 text-zinc-500" />
            </button>
            <div className="space-y-0.5">
              <h1 className="text-base md:text-lg font-bold text-zinc-900">口语复盘</h1>
              <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-widest">对话存档工作区</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-50 rounded-lg border border-zinc-100">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-tight">2026年3月17日</span>
            </div>
            <Button variant="secondary" className="rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-wider">
              分享
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-10">
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
                <h2 className="text-2xl font-bold text-zinc-900">正在分析您的对话...</h2>
                <p className="text-zinc-500 font-medium">AI 正在识别关键学习时刻并生成您的复盘报告。</p>
              </div>
            </motion.div>
          ) : reviewStatus === 'FAILED' ? (
            <motion.div 
              key="failed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] space-y-8"
            >
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
                <AlertCircle className="w-10 h-10" />
              </div>
              <div className="text-center space-y-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-zinc-900">生成复盘报告失败</h2>
                  <p className="text-zinc-500">处理您的课程数据时出现了问题。</p>
                </div>
                <Button onClick={() => setReviewStatus('LOADING')} variant="secondary" className="bg-zinc-900 text-white hover:bg-zinc-800">
                  重试分析
                </Button>
              </div>
            </motion.div>
          ) : reviewStatus === 'NO_RECORDING' ? (
            <motion.div 
              key="no-recording"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] space-y-8"
            >
              <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300">
                <Mic2 className="w-10 h-10" />
              </div>
              <div className="text-center space-y-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-zinc-900">未找到录音</h2>
                  <p className="text-zinc-500">我们无法找到此课程的录音。如果课程时间过短，可能会发生这种情况。</p>
                </div>
                <Button onClick={onBack} variant="secondary" className="bg-zinc-900 text-white hover:bg-zinc-800">
                  返回首页
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start"
            >
              {/* LEFT: Player Anchor (Sticky on Desktop) */}
              <div className="w-full lg:w-[380px] lg:sticky lg:top-28 space-y-6">
                <Card className="p-6 md:p-8 bg-white border-zinc-100 shadow-2xl shadow-zinc-200/40 rounded-[2.5rem] overflow-hidden relative group">
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">课程录音</p>
                      <h3 className="text-lg font-bold text-zinc-900 leading-tight">与 Lin Wang 的对话</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">场景:</span>
                        <span className="text-[10px] font-bold text-zinc-600">职场社交闲谈</span>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="relative h-12 flex items-end gap-[2px]">
                        {Array.from({ length: 40 }).map((_, i) => {
                          const height = 20 + Math.random() * 80;
                          const isPlayed = (currentTime / totalDuration) * 40 > i;
                          return (
                            <div 
                              key={i} 
                              className={`flex-1 rounded-full transition-all duration-300 ${
                                isPlayed ? 'bg-indigo-600' : 'bg-zinc-100'
                              }`}
                              style={{ height: `${height}%` }}
                            />
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-zinc-200"
                          >
                            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                          </button>
                          <div className="space-y-0.5">
                            <p className="text-sm font-bold text-zinc-900">
                              {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
                            </p>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">/ 05:00</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400">
                            <RotateCcw className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400">
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

            <div className="flex items-center justify-between px-6 py-4 bg-zinc-50/50 border border-zinc-100 rounded-3xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-600">LW</div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">教练</p>
                  <p className="text-xs font-bold text-zinc-900">Lin Wang</p>
                </div>
              </div>
              <div className="h-8 w-px bg-zinc-200" />
              <div className="flex items-center gap-3 text-right">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">时长</p>
                  <p className="text-xs font-bold text-zinc-900">25 分钟</p>
                </div>
                <Clock className="w-4 h-4 text-zinc-400" />
              </div>
            </div>
          </div>

          {/* RIGHT: Workspace Content Area */}
          <div className="flex-1 w-full space-y-8">
            
            {/* Top Tabs Navigation */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-1">
              <div className="flex items-center gap-8">
                {([['Transcript', '对话逐字稿'], ['Feedback', '学习反馈']] as const).map(([tab, label]) => {
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
              
              {activeTab === 'Transcript' && (
                <div className="hidden md:flex items-center gap-2 bg-zinc-100 p-1 rounded-xl">
                  {([['All', '全部'], ['Critical', '核心修正'], ['Upgrades', '地道表达']] as const).map(([f, label]) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f as any)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                        filter === f ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'Transcript' && (
                <motion.div
                  key="transcript-tab"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  {/* Unified Transcript Control Area */}
                  <div className="bg-zinc-50/50 border border-zinc-100 rounded-3xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">跳转至关键时刻</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-zinc-100/50 p-1 rounded-xl">
                        {([['All', '全部'], ['Critical', '核心'], ['Upgrades', '升级']] as const).map(([f, label]) => (
                          <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all ${
                              filter === f ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                      {criticalEvidence.map((line) => (
                        <button
                          key={line.id}
                          onClick={() => handleLineClick(line)}
                          className={`flex-shrink-0 px-3 py-2 rounded-xl border transition-all text-left flex items-center gap-2.5 ${
                            selectedLineId === line.id 
                              ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                              : 'bg-white border-zinc-100 hover:border-zinc-200'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-${getGradeConfig(line.type).color}-500`} />
                          <span className="text-[11px] font-bold text-zinc-900 truncate max-w-[100px]">
                            {line.text}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-400 shrink-0">{line.timestamp}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Transcript List - Independent Scrolling Panel */}
                  <div className="relative bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm flex flex-col overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
                    
                    <div 
                      ref={transcriptRef}
                      className="h-[600px] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent divide-y divide-zinc-50 px-2"
                    >
                      {filteredTranscript.map((line) => {
                        const config = getGradeConfig(line.type);
                        const isSelected = selectedLineId === line.id;
                        const [mins, secs] = line.timestamp.split(':').map(Number);
                        const lineTime = mins * 60 + secs;
                        const isCurrentlyPlaying = currentTime >= lineTime && currentTime < lineTime + 10;

                        return (
                          <div 
                            key={line.id} 
                            onClick={() => handleLineClick(line)}
                            className={`group relative py-4 px-6 md:px-8 flex gap-4 md:gap-6 transition-all cursor-pointer border-l-4 ${
                              isCurrentlyPlaying 
                                ? 'bg-indigo-50/40 border-indigo-500' 
                                : isSelected 
                                  ? 'bg-zinc-50/50 border-zinc-200' 
                                  : 'hover:bg-zinc-50/30 border-transparent'
                            }`}
                          >
                            {/* Avatar & Speaker Info */}
                            <div className="w-10 shrink-0 flex flex-col items-center gap-2 pt-1">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm transition-all ${
                                line.speaker === 'Coach' 
                                  ? 'bg-indigo-100 text-indigo-600 border border-indigo-200' 
                                  : 'bg-zinc-900 text-white'
                              } ${isCurrentlyPlaying ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}>
                                {line.speaker === 'Coach' ? 'LW' : 'ME'}
                              </div>
                              <span className="text-[9px] font-mono text-zinc-300 font-bold">{line.timestamp}</span>
                            </div>

                            <div className="flex-1 min-w-0 space-y-1.5">
                              <div className="flex items-center justify-between gap-4">
                                <span className={`text-[9px] font-bold uppercase tracking-widest ${
                                  line.speaker === 'Coach' ? 'text-indigo-400' : 'text-zinc-400'
                                }`}>
                                  {line.speaker}
                                </span>
                                {line.type && (
                                  <Badge color={config.color} className="text-[8px] font-bold px-1.5 py-0.5 rounded-md">
                                    {config.grade}
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="space-y-1">
                                <p className={`text-base md:text-lg leading-snug transition-all ${
                                  isCurrentlyPlaying ? 'text-zinc-900 font-bold' : 'text-zinc-700 font-medium'
                                }`}>
                                  {line.text}
                                </p>
                                {line.translation && (
                                  <p className="text-xs text-zinc-400 leading-relaxed font-medium italic">{line.translation}</p>
                                )}
                              </div>
                            </div>

                            {/* AI Marker Point */}
                            {line.type && (
                              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <div className={`w-1.5 h-1.5 rounded-full bg-${config.color}-500 shadow-sm animate-pulse`} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'Feedback' && (
                <motion.div
                  key="feedback-tab"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start"
                >
                  <div className="xl:col-span-7 space-y-10">
                    {/* Hero Recap */}
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-indigo-100">
                          AI 分析摘要
                        </div>
                        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight leading-tight">
                          你已掌握 <span className="text-indigo-600">职场正式介绍</span>。
                        </h2>
                        <p className="text-base text-zinc-500 leading-relaxed">
                          今天进步很大！你成功应对了职场社交闲谈，并准确地在语境中使用了 <span className="text-zinc-900 font-semibold underline decoration-indigo-200 decoration-4 underline-offset-4">“任职于”</span>。
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-1">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">准确率</p>
                          <p className="text-xl font-bold text-zinc-900">92%</p>
                        </div>
                        <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-1">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">流利度</p>
                          <p className="text-xl font-bold text-zinc-900">B+</p>
                        </div>
                      </div>
                    </div>

                    {/* Key Feedback Points */}
                    <section className="space-y-6">
                      <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        核心反馈点
                      </h3>
                      <div className="space-y-4">
                        {criticalEvidence.slice(0, 2).map((line, idx) => (
                          <Card key={idx} className="p-6 bg-white border-zinc-100 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                            <div className="flex items-start justify-between gap-4 mb-4">
                              <Badge color={getGradeConfig(line.type).color} className="text-[9px] font-bold px-2 py-0.5">
                                {getGradeConfig(line.type).label}
                              </Badge>
                              <button 
                                onClick={() => {
                                  setActiveTab('Transcript');
                                  handleLineClick(line);
                                }}
                                className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all"
                              >
                                在逐字稿中查看 <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="space-y-3">
                              <p className="text-sm font-bold text-zinc-900 leading-relaxed">
                                "{line.aiFeedback?.whatYouSaid}" → <span className="text-indigo-600">"{line.aiFeedback?.betterVersion}"</span>
                              </p>
                              <p className="text-xs text-zinc-500 leading-relaxed">
                                {line.aiFeedback?.whyItMatters}
                              </p>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </section>

                    {/* Book Next Lesson */}
                    <div className="pt-10 border-t border-zinc-100">
                      <div className="flex items-center justify-between p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-zinc-900">准备好进行下一步了吗？</p>
                          <p className="text-xs text-zinc-400">距离下一个里程碑还有 2 节课。</p>
                        </div>
                        <Button variant="secondary" className="rounded-xl px-6 py-2 text-xs font-bold">
                          预约课程
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* AI Coaching Loop */}
                  <div className="xl:col-span-5 space-y-6 xl:sticky xl:top-28">
                    <div className="flex items-center justify-between px-2">
                      <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                        互动练习
                      </h3>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {selectedLine?.aiFeedback ? (
                        <motion.div
                          key={`${selectedLine.id}-${activeStep}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                        >
                          <Card className="p-7 bg-white border-zinc-100 shadow-xl shadow-zinc-200/50 rounded-[2.5rem] min-h-[400px] flex flex-col">
                            <div className="flex bg-zinc-100 p-1 rounded-xl mb-6">
                              {COACH_STEPS.map(step => (
                                <button
                                  key={step.id}
                                  onClick={() => setActiveStep(step.id)}
                                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                                    activeStep === step.id ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-500'
                                  }`}
                                >
                                  {step.title}
                                </button>
                              ))}
                            </div>

                            {activeStep === 'REVIEW' && (
                              <div className="space-y-6 flex-1">
                                <div className="space-y-4">
                                  <div className="flex items-center gap-3">
                                    <Badge color={getGradeConfig(selectedLine.type).color} className="text-[10px] font-bold px-2.5 py-1 rounded-lg">
                                      {getGradeConfig(selectedLine.type).label}
                                    </Badge>
                                    <span className="text-[11px] font-mono text-zinc-400 font-bold">@ {selectedLine.timestamp}</span>
                                  </div>
                                  <p className="text-lg font-bold text-zinc-900 leading-[1.3]">
                                    “{selectedLine.aiFeedback.whatYouSaid}”
                                  </p>
                                </div>
                                <div className="p-5 bg-indigo-50/30 rounded-[1.5rem] border border-indigo-100/50 space-y-3">
                                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">深度解析</p>
                                  <p className="text-sm text-zinc-600 leading-relaxed font-medium">{selectedLine.aiFeedback.whyItMatters}</p>
                                </div>
                                <div className="mt-auto pt-6">
                                  <Button 
                                    onClick={() => setActiveStep('TRANSFER')}
                                    className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-3"
                                  >
                                    下一步：场景迁移
                                    <ArrowRight className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            )}

                            {activeStep === 'TRANSFER' && (
                              <div className="space-y-6 flex-1">
                                <div className="space-y-6">
                                  <div className="space-y-2">
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">应用场景</p>
                                    <h4 className="text-xl font-bold text-zinc-900 leading-tight">求职面试</h4>
                                  </div>
                                  <div className="p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-100 space-y-3">
                                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">目标句式</p>
                                    <p className="text-2xl font-bold text-indigo-900">“我曾任职于...”</p>
                                  </div>
                                </div>
                                <div className="mt-auto pt-6">
                                  <Button 
                                    onClick={() => setActiveStep('PRACTICE')}
                                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-3"
                                  >
                                    立即尝试
                                    <ChevronRight className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            )}

                            {activeStep === 'PRACTICE' && (
                              <div className="space-y-6 flex-1">
                                <div className="space-y-6 text-center py-4">
                                  <p className="text-xs text-zinc-500 font-medium">请大声朗读：</p>
                                  <p className="text-xl font-bold text-zinc-900">“我曾任职于一家大型企业。”</p>
                                  <div className="flex flex-col items-center gap-4">
                                    <button 
                                      onMouseDown={() => setIsRecording(true)}
                                      onMouseUp={() => setIsRecording(false)}
                                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                                        isRecording ? 'bg-rose-500 scale-110 shadow-xl shadow-rose-200' : 'bg-zinc-900'
                                      }`}
                                    >
                                      <Mic2 className={`w-6 h-6 text-white ${isRecording ? 'animate-pulse' : ''}`} />
                                    </button>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                      {isRecording ? '正在录音...' : '按住说话'}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-auto pt-6 flex gap-3">
                                  <Button variant="secondary" className="flex-1 py-3.5 rounded-2xl font-bold text-[10px]" onClick={() => setActiveStep('REVIEW')}>
                                    返回
                                  </Button>
                                  <Button className="flex-[2] py-3.5 bg-emerald-600 text-white rounded-2xl font-bold text-[10px]">
                                    完成练习
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Card>
                        </motion.div>
                      ) : (
                        <Card className="p-10 border-dashed border-zinc-200 bg-zinc-50/30 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                          <Target className="w-6 h-6 text-zinc-200" />
                          <p className="text-xs text-zinc-400 font-medium max-w-[180px]">
                            在逐字稿中选择一个高亮部分开始练习。
                          </p>
                        </Card>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Bottom Action Bar */}
    {reviewStatus === 'READY' && (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex justify-center"
      >
        <Button 
          onClick={onBack}
          className="bg-zinc-900 text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl hover:bg-zinc-800 transition-all"
        >
          完成复盘
          <ArrowRight className="w-5 h-5" />
        </Button>
      </motion.div>
    )}
  </main>
</div>
  );
};

export default LessonReview;
