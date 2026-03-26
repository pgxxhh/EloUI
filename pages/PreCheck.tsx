
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  Volume2, 
  Wifi, 
  Settings, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  User,
  BookOpen,
  Calendar,
  ChevronRight,
  MicOff,
  Waves
} from 'lucide-react';
import { Button, Card, Badge } from '../components/UI';

interface PreCheckProps {
  onEnter: () => void;
  onBack: () => void;
  lessonData?: {
    coachName: string;
    coachAvatar: string;
    courseTitle: string;
    startTime: Date;
    duration: number;
  };
}

const PreCheck: React.FC<PreCheckProps> = ({ 
  onEnter, 
  onBack,
  lessonData = {
    coachName: "Coach Wei",
    coachAvatar: "https://picsum.photos/seed/wei/200/200",
    courseTitle: "Life in the Internet Age",
    startTime: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes from now
    duration: 30
  }
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isMicOn, setIsMicOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const [checks, setChecks] = useState({
    mic: 'checking',
    speaker: 'checking',
    network: 'checking'
  });

  const [preferences, setPreferences] = useState({
    name: 'Jingyao',
    duration: lessonData.duration.toString(),
    course: lessonData.courseTitle
  });

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const diff = Math.floor((lessonData.startTime.getTime() - Date.now()) / 1000);
      setTimeLeft(Math.max(0, diff));
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [lessonData.startTime]);

  // Media Stream setup
  useEffect(() => {
    const startMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          audio: true 
        });
        setStream(mediaStream);
        setChecks(prev => ({ ...prev, mic: 'ok' }));
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setChecks(prev => ({ ...prev, mic: 'error' }));
      }
    };

    startMedia();

    // Simulate speaker and network check
    const timeout = setTimeout(() => {
      setChecks(prev => ({ ...prev, speaker: 'ok', network: 'ok' }));
    }, 1500);

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      clearTimeout(timeout);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const isReady = timeLeft === 0;

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Exit Preparation</span>
          </button>
          <div className="flex items-center gap-3">
            <Badge color="indigo">Pre-Lesson Check</Badge>
            <div className="h-4 w-px bg-zinc-200" />
            <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>Lesson starts in {formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left: Audio Preview */}
        <div className="space-y-6">
          <div className="relative aspect-video bg-zinc-900 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white flex flex-col items-center justify-center">
            {/* Ambient Background for Audio Only */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[100px] rounded-full" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-[2.5rem] bg-zinc-800 flex items-center justify-center border-2 border-white/10 shadow-inner">
                <User className="w-10 h-10 text-zinc-600" />
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 h-8">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={isMicOn ? { 
                        height: [8, Math.random() * 24 + 8, 8],
                        opacity: [0.3, 0.8, 0.3]
                      } : { height: 4, opacity: 0.1 }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.5 + Math.random() * 0.5,
                        ease: "easeInOut"
                      }}
                      className="w-1 bg-indigo-500 rounded-full"
                    />
                  ))}
                </div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  {isMicOn ? 'Microphone Active' : 'Microphone Muted'}
                </p>
              </div>
            </div>
            
            {/* Controls Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <button 
                onClick={toggleMic}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isMicOn ? 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30' : 'bg-rose-500 text-white'}`}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-all">
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Status Badges Overlay */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Audio Only Mode</span>
              </div>
            </div>
          </div>

          {/* Device Check List */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Mic, label: 'Microphone', status: checks.mic },
              { icon: Volume2, label: 'Speaker', status: checks.speaker },
              { icon: Wifi, label: 'Network', status: checks.network }
            ].map((item, i) => (
              <Card key={i} className="p-4 flex flex-col items-center text-center gap-2 border-zinc-100 hover:border-indigo-100 transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.status === 'ok' ? 'bg-emerald-50 text-emerald-600' : 
                  item.status === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-zinc-50 text-zinc-400'
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.label}</p>
                {item.status === 'ok' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : item.status === 'error' ? (
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                ) : (
                  <div className="w-4 h-4 border-2 border-zinc-200 border-t-indigo-500 rounded-full animate-spin" />
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Lesson Preferences & Entry */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Lesson Preferences</h2>
            <p className="text-zinc-500 text-sm">Your tutor will be notified and may be able to accommodate your preferences.</p>
          </div>

          <div className="space-y-6">
            {/* Preferences Form */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">My first name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    value={preferences.name}
                    onChange={(e) => setPreferences(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white border border-zinc-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Lesson duration (minutes)</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <select 
                    value={preferences.duration}
                    onChange={(e) => setPreferences(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full bg-white border border-zinc-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Today's Lesson</p>
                    <p className="text-sm font-bold text-zinc-900">{preferences.course}</p>
                  </div>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Coach Info Card */}
            <Card className="p-5 border-zinc-200 bg-white">
              <div className="flex items-center gap-4">
                <img src={lessonData.coachAvatar} className="w-14 h-14 rounded-2xl object-cover" alt={lessonData.coachName} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-zinc-900">{lessonData.coachName}</h3>
                    <Badge color="green">Online</Badge>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Today at {lessonData.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-indigo-600">Waiting for you</p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex gap-4">
                <Button 
                  variant="secondary" 
                  onClick={onBack}
                  className="flex-1 py-4 rounded-2xl border border-zinc-200"
                >
                  Leave
                </Button>
                <Button 
                  onClick={onEnter}
                  disabled={!isReady}
                  className={`flex-1 py-4 rounded-2xl shadow-xl transition-all relative overflow-hidden group ${isReady ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-zinc-200 text-zinc-400'}`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isReady ? (
                      <>
                        Continue to Classroom
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <>
                        Wait for Start ({formatTime(timeLeft)})
                      </>
                    )}
                  </span>
                  {!isReady && (
                    <motion.div 
                      className="absolute inset-0 bg-zinc-300/50"
                      initial={{ width: '0%' }}
                      animate={{ width: `${(1 - timeLeft / 600) * 100}%` }} // Assuming 10min max wait
                      transition={{ ease: "linear" }}
                    />
                  )}
                </Button>
              </div>
              
              {!isReady && (
                <p className="text-center text-[11px] font-medium text-zinc-400">
                  The "Continue" button will be enabled when the lesson starts.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-6xl mx-auto w-full p-6 border-t border-zinc-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-zinc-500">System Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-zinc-500">Connection Stable</span>
            </div>
          </div>
          <p className="text-[10px] text-zinc-400 font-medium">
            Having trouble? <button className="text-indigo-600 hover:underline">Contact Support</button> or <button className="text-indigo-600 hover:underline">Run Network Test</button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PreCheck;
