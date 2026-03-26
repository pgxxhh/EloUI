
import React, { useState, useRef } from 'react';
import { Button, Card, Badge } from '../components/UI';
import { MOCK_HISTORY } from './History';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Download, 
  Share2, 
  Sparkles, 
  Clock, 
  FileText, 
  Volume2,
  ChevronRight,
  Mic,
  RotateCcw,
  Target,
  Info,
  Zap
} from 'lucide-react';

interface HistoryDetailProps {
  sessionId: string | null;
  onBack: () => void;
  onViewReview?: () => void;
}

const HistoryDetail: React.FC<HistoryDetailProps> = ({ sessionId, onBack }) => {
  const session = MOCK_HISTORY.find(s => s.id === sessionId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMoment, setActiveMoment] = useState<number | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  if (!session) {
    return (
      <div className="text-center py-20">
        <p>Session not found.</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    );
  }

  // Enhanced transcription with evidence-based insights
  const enhancedTranscription: any[] = session.transcription.map((line, idx) => {
    const baseLine = { ...line, timestamp: line.timestamp || '00:00' };
    
    // Injecting some mock insights for demonstration
    if (idx === 1) return { ...baseLine, insight: { type: 'opportunity', title: '地道表达机会', original: line.text, upgrade: '我想来一杯咖啡', reason: '在咖啡馆点餐时，使用“我想来...”比“我要...”更显礼貌且自然。', timestamp: baseLine.timestamp } };
    if (idx === 5) return { ...baseLine, insight: { type: 'correction', title: '错失机会', original: line.text, upgrade: '一共多少钱？', reason: '虽然“多少钱”没错，但在对方刚报完价后，使用“一共多少钱”或直接确认价格会更地道。', timestamp: baseLine.timestamp } };
    return baseLine;
  });

  return (
    <div className="max-w-[1400px] mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-500">
      {/* Header: Evidence-First Navigation */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-500" />
          </button>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-zinc-900">{session.scenarioTitle}</h1>
              <Badge color="zinc" className="text-[10px] uppercase tracking-widest font-bold bg-zinc-100 text-zinc-500 border-none">Evidence Archive</Badge>
            </div>
            <p className="text-sm text-zinc-400 font-medium">
              {session.date} • {session.duration} • With {session.coachName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="rounded-xl py-2 px-4 text-sm border-zinc-200 text-zinc-600">
            <Download className="w-4 h-4" />
            Export Archive
          </Button>
          <Button variant="secondary" className="rounded-xl py-2 px-4 text-sm border-zinc-200 text-zinc-600">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Evidence View: 7:3 Split */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 items-start">
        
        {/* LEFT: FACT LAYER (The Source) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Replay Heatmap & Audio Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Recording & Replay Heatmap</span>
              <span className="text-[10px] font-mono text-indigo-500 font-bold">3x Replay detected at 00:40</span>
            </div>
            <Card className="p-4 bg-white border-zinc-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-5">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shrink-0 shadow-lg shadow-zinc-200"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
                <div className="flex-1 space-y-2">
                  <div className="relative h-10 flex items-end gap-[2px]">
                    {/* Simulated Heatmap: Darker bars = more replays */}
                    {Array.from({ length: 80 }).map((_, i) => {
                      const height = 20 + Math.random() * 60;
                      const isHot = i > 65 && i < 75; // Simulated hot zone around 00:40
                      return (
                        <div 
                          key={i} 
                          className={`flex-1 rounded-t-[1px] transition-all ${isHot ? 'bg-indigo-500 opacity-90' : 'bg-zinc-200 opacity-40'}`}
                          style={{ height: `${height}%` }}
                        />
                      );
                    })}
                    {/* Playhead */}
                    <div className="absolute top-0 bottom-0 w-[2px] bg-indigo-600 z-10 shadow-[0_0_8px_rgba(79,70,229,0.4)]" style={{ left: '45%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>00:25</span>
                    <span>{session.duration}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Interactive Transcript */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-400" />
                Transcript
              </h3>
              <div className="flex gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                <button className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  Pinyin
                </button>
                <button className="hover:text-zinc-900 transition-colors">Translation</button>
              </div>
            </div>
            
            <div ref={transcriptRef} className="bg-white rounded-[2rem] border border-zinc-100 overflow-hidden shadow-sm divide-y divide-zinc-50">
              {enhancedTranscription.map((line, idx) => (
                <div 
                  key={idx} 
                  onClick={() => line.insight && setActiveMoment(idx)}
                  className={`group relative p-6 flex gap-8 transition-all cursor-pointer border-l-4 ${
                    activeMoment === idx ? 'border-indigo-500 bg-indigo-50/30' : 'border-transparent hover:bg-zinc-50/50'
                  }`}
                >
                  <div className="w-12 text-[10px] font-mono text-zinc-300 pt-1.5 shrink-0">
                    {line.timestamp}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-6">
                      <div className="space-y-2">
                        <p className={`text-lg leading-relaxed ${line.speaker === 'COACH' ? 'text-zinc-400 font-normal' : 'text-zinc-900 font-medium'}`}>
                          {line.text}
                        </p>
                        {line.pinyin && <p className="text-sm text-zinc-400 font-mono tracking-tight">{line.pinyin}</p>}
                      </div>
                      {line.insight && (
                        <div className={`shrink-0 p-2 rounded-xl shadow-sm ${line.insight.type === 'opportunity' ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-white'}`}>
                          <Sparkles className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: INTERPRETATION & ACTION LAYER (The Insights) */}
        <div className="lg:col-span-3 space-y-8 sticky top-6">
          
          {/* Evidence-Bound Cards */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 px-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Evidence Insights
            </h3>
            
            {activeMoment !== null && enhancedTranscription[activeMoment].insight ? (
              <Card className="p-6 border-indigo-100 bg-white shadow-2xl shadow-indigo-100/40 space-y-6 animate-in slide-in-from-right-4 duration-300 rounded-[2rem]">
                <div className="flex items-center justify-between">
                  <Badge color={enhancedTranscription[activeMoment].insight?.type === 'opportunity' ? 'indigo' : 'amber'} className="rounded-lg px-2 py-1">
                    {enhancedTranscription[activeMoment].insight?.title}
                  </Badge>
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-50 px-2 py-1 rounded-md">@{enhancedTranscription[activeMoment].timestamp}</span>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Evidence</p>
                    <p className="text-zinc-500 italic text-sm leading-relaxed">"{enhancedTranscription[activeMoment].insight?.original}"</p>
                  </div>
                  
                  <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-2">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Refinement</p>
                    <p className="text-zinc-900 font-bold text-xl leading-tight">{enhancedTranscription[activeMoment].insight?.upgrade}</p>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-zinc-600 leading-relaxed bg-indigo-50/30 p-4 rounded-2xl border border-indigo-50">
                    <Info className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
                    <p><span className="font-bold text-indigo-900">Analysis:</span> {enhancedTranscription[activeMoment].insight?.reason}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Button className="w-full rounded-2xl py-4 bg-zinc-900 hover:bg-black text-white shadow-xl shadow-zinc-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                    <Mic className="w-4 h-4" />
                    Retalk & Compare
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-12 border-dashed border-zinc-200 bg-zinc-50/30 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-zinc-200">
                  <Target className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">No Selection</p>
                  <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-[180px]">
                    Click a highlighted moment in the transcript to see evidence-based insights.
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* 3-Minute Contextual Drill */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 px-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Quick Practice
            </h3>
            <Card className="p-6 bg-indigo-600 text-white border-none shadow-xl shadow-indigo-100 rounded-[2rem] relative overflow-hidden group cursor-pointer transition-all hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20 group-hover:bg-white/20 transition-colors" />
              <div className="relative z-10 space-y-5">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold">3-Min Retalk Challenge</h4>
                  <p className="text-xs text-indigo-100/80 leading-relaxed">Master the "Measure Words" and "Polite Requests" from this session.</p>
                </div>
                <Button className="w-full bg-white text-indigo-600 hover:bg-zinc-50 rounded-xl py-3 font-bold text-sm border-none shadow-lg">
                  Start Drill
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Next Lesson Migration Card */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 px-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-500" />
              Migration Goal
            </h3>
            <Card className="p-6 border-emerald-100 bg-emerald-50/30 rounded-[2rem] space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Next Session Task</span>
              </div>
              <p className="text-sm text-zinc-700 font-medium leading-relaxed">
                在下次课中，尝试在点餐环节使用 <span className="text-emerald-700 font-bold underline decoration-2 underline-offset-4 decoration-emerald-200">“我想来一杯...”</span> 至少 3 次。
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest pt-2 border-t border-emerald-100/50">
                <Clock className="w-3 h-3" />
                Target: Fluency & Politeness
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HistoryDetail;
