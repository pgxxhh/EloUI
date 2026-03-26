
import React, { useState, useEffect } from 'react';
import { Button, Card, Badge, Skeleton } from '../components/UI';
import { Icons } from '../constants';

interface ReviewProps {
  onReturnHome: () => void;
}

const Review: React.FC<ReviewProps> = ({ onReturnHome }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-12 py-12">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-indigo-50 rounded-full mx-auto flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-zinc-900">AI is distilling your session...</h2>
            <p className="text-zinc-400 italic">"Analyzing natural speech patterns and measure words..."</p>
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12 animate-in zoom-in-95 duration-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2rem] shadow-xl shadow-emerald-100/50 mb-6 rotate-3">
          <Icons.Check />
        </div>
        <h2 className="text-4xl font-bold text-zinc-900 tracking-tight leading-tight">Flow unlocked!</h2>
        <p className="text-zinc-500 text-lg">You just completed a high-impact session with Li Xiao.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 space-y-6 bg-emerald-50/20 border-emerald-100">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500 text-white rounded-lg"><Icons.Check /></div>
              <h3 className="font-bold text-zinc-900">Elo Moments</h3>
           </div>
           <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-emerald-100/50 shadow-sm">
                 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">You expressed:</p>
                 <p className="font-medium text-zinc-800 italic">"我要咖啡." (Wǒ yào kāfēi.)</p>
                 <div className="my-3 border-t border-emerald-50"></div>
                 <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">Natural Upgrade:</p>
                 <p className="font-bold text-emerald-900">"请给我一杯拿铁，谢谢."</p>
              </div>
           </div>
        </Card>

        <Card className="p-8 space-y-6 bg-indigo-50/20 border-indigo-100">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500 text-white rounded-lg"><Icons.Sparkles /></div>
              <h3 className="font-bold text-zinc-900">Next Steps</h3>
           </div>
           <ul className="space-y-4">
              {[
                {t: 'Master Measure Words', desc: 'Focus on "杯" (bēi) and "个" (gè).'},
                {t: 'Tone Clarity', desc: 'Practice 4th tone on "咖啡店".'}
              ].map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-indigo-400 font-bold">0{i+1}.</span>
                  <div>
                    <p className="font-bold text-zinc-800 text-sm">{s.t}</p>
                    <p className="text-xs text-zinc-500">{s.desc}</p>
                  </div>
                </li>
              ))}
           </ul>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Button onClick={onReturnHome} className="flex-1 py-5 text-lg rounded-3xl">Keep the momentum</Button>
        <Button variant="secondary" className="flex-1 py-5 text-lg rounded-3xl">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Export Review (PDF)
        </Button>
      </div>
    </div>
  );
};

export default Review;
