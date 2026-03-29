
import React from 'react';
import { Button, Card, Badge } from '../components/UI';
import { Icons } from '../constants';
import { SessionRecord } from '../types';

// Mock data for history
export const MOCK_HISTORY: SessionRecord[] = [
  {
    id: '1',
    date: '2024-05-20',
    coachName: 'Li Xiao',
    scenarioTitle: 'Ordering Coffee',
    duration: '15:24',
    score: 88,
    summary: 'In this session, Alex practiced ordering coffee in a business setting. He successfully used polite forms and specified preferences for cup size and milk type. The conversation flowed naturally, though some tone corrections were needed for "拿铁" (latte).',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    transcription: [
      { speaker: 'COACH', text: '你好！你想喝点什么？', pinyin: 'Nǐ hǎo! Nǐ xiǎng hē diǎn shénme?', translation: 'Hello! What would you like to drink?', timestamp: '00:05' },
      { speaker: 'STUDENT', text: '我要咖啡。', pinyin: 'Wǒ yào kāfēi.', translation: 'I want coffee.', timestamp: '00:12' },
      { speaker: 'COACH', text: '好的，你要大杯还是小杯？', pinyin: 'Hǎo de, nǐ yào dà bēi háishì xiǎo bēi?', translation: 'Okay, do you want a large or small cup?', timestamp: '00:18' },
      { speaker: 'STUDENT', text: '大的。', pinyin: 'Dà de.', translation: 'Large one.', timestamp: '00:25' },
      { speaker: 'COACH', text: '好的。一共三十块。', pinyin: 'Hǎo de. Yīgòng sānshí kuài.', translation: 'Okay. That will be thirty yuan in total.', timestamp: '00:32' },
      { speaker: 'STUDENT', text: '多少钱？', pinyin: 'Duōshǎo qián?', translation: 'How much?', timestamp: '00:40' },
    ],
    feedback: {
      overall: 'Excellent progress! Your vocabulary for beverages is solid. Focus on using "请给我" (Please give me) instead of "我要" (I want) for a more polite tone in professional environments.',
      eloMoments: [
        { 
          original: '我要咖啡。', 
          upgrade: '请给我一杯拿铁，谢谢。', 
          pinyin: 'Qǐng gěi wǒ yī bēi ná tiě, xièxiè.',
          explanation: 'Using "请给我" (Qǐng gěi wǒ) is more polite than "我要" (Wǒ yào) in a cafe setting.'
        }
      ],
      nextSteps: [
        { title: 'Master Measure Words', description: 'Focus on "杯" (bēi) for drinks and "个" (gè) for general items.' },
        { title: 'Tone Clarity', description: 'Practice the 4th tone on "咖啡" (kāfēi) and "拿铁" (nátiě).' }
      ]
    }
  },
  {
    id: '2',
    date: '2024-05-18',
    coachName: 'Zhang Wei',
    scenarioTitle: 'Asking for Directions',
    duration: '12:45',
    transcription: [],
    feedback: {
      eloMoments: [],
      nextSteps: []
    }
  },
  {
    id: '3',
    date: '2024-05-15',
    coachName: 'Wang Fang',
    scenarioTitle: 'Introductions',
    duration: '18:10',
    transcription: [],
    feedback: {
      eloMoments: [],
      nextSteps: []
    }
  }
];

interface HistoryProps {
  onBack: () => void;
  onSelectSession: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ onBack, onSelectSession }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Conversation Archive</h2>
          <p className="text-zinc-500">Review your past sessions and track your speaking growth.</p>
        </div>
        <Button variant="secondary" onClick={onBack} className="rounded-xl">
          <Icons.ArrowRight className="rotate-180" />
          Back to Home
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_HISTORY.map((session) => (
          <Card 
            key={session.id} 
            className="group cursor-pointer hover:border-indigo-200 transition-all hover:shadow-md"
            onClick={() => onSelectSession(session.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Icons.Mic className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-zinc-900 text-lg">Session with {session.coachName}</h3>
                    <Badge color="zinc" className="bg-zinc-100 border-zinc-200 text-zinc-600">{session.duration}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Starter:</span>
                      <span className="font-medium text-zinc-600">{session.scenarioTitle || 'Open Conversation'}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-300"></div>
                      {session.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Feedback</p>
                  <p className="text-emerald-600 font-bold text-sm">Ready</p>
                </div>
                <div className="p-2 rounded-xl bg-zinc-50 text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Icons.ArrowRight />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {MOCK_HISTORY.length === 0 && (
        <div className="text-center py-20 bg-zinc-50 rounded-[2.5rem] border-2 border-dashed border-zinc-200">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
            <Icons.Sparkles className="text-zinc-300" />
          </div>
          <h3 className="text-zinc-900 font-bold text-lg">No sessions yet</h3>
          <p className="text-zinc-400 max-w-xs mx-auto mt-2">Start your first conversation to see your progress here.</p>
          <Button className="mt-6 rounded-2xl" onClick={onBack}>Start Practicing</Button>
        </div>
      )}
    </div>
  );
};

export default History;
