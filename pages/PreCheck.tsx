
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  Volume2, 
  Wifi, 
  Settings, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  User,
  BookOpen,
  Calendar,
  ChevronRight,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Zap,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { Button, Badge } from '../components/UI';

type CheckStatus = 'checking' | 'ok' | 'warning' | 'error' | 'fallback' | 'blocked';

type CameraErrorType = 'denied' | 'not-found' | 'off' | null;
type NetworkQuality = 'excellent' | 'good' | 'weak' | 'disconnected';

interface DiagnosticState {
  mic: CheckStatus;
  camera: CheckStatus;
  speaker: CheckStatus;
  network: CheckStatus;
}

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
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [cameraError, setCameraError] = useState<CameraErrorType>(null);
  const [networkQuality, setNetworkQuality] = useState<NetworkQuality>('good');
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const [checks, setChecks] = useState<DiagnosticState>({
    mic: 'checking',
    camera: 'checking',
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
        // In a real app, we'd request both. Here we simulate the camera state.
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          audio: true,
          video: false 
        });
        setStream(mediaStream);
        setChecks(prev => ({ ...prev, mic: 'ok', camera: 'ok' }));
        setCameraError(null);
      } catch (err: any) {
        console.error("Error accessing media devices:", err);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setCameraError('denied');
          setChecks(prev => ({ ...prev, camera: 'blocked' }));
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setCameraError('not-found');
          setChecks(prev => ({ ...prev, camera: 'error' }));
        } else {
          setCameraError('off');
          setChecks(prev => ({ ...prev, camera: 'fallback' }));
        }
        setIsCameraOn(false);
        setChecks(prev => ({ ...prev, mic: 'ok' })); // Assume mic works for simulation
      }
    };

    startMedia();

    // Simulate speaker and network check
    const timeout = setTimeout(() => {
      setChecks(prev => ({ ...prev, speaker: 'ok', network: networkQuality === 'weak' ? 'warning' : 'ok' }));
    }, 1500);

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      clearTimeout(timeout);
    };
  }, [networkQuality]);

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

  const toggleCamera = () => {
    if (cameraError === 'denied' || cameraError === 'not-found') return;
    
    const nextState = !isCameraOn;
    setIsCameraOn(nextState);
    setChecks(prev => ({ 
      ...prev, 
      camera: nextState ? 'ok' : 'fallback' 
    }));
  };

  const retryChecks = () => {
    setChecks({
      mic: 'checking',
      camera: 'checking',
      speaker: 'checking',
      network: 'checking'
    });
    // Re-trigger effect by changing a dummy state if needed, 
    // but here we just simulate a re-check
    setTimeout(() => {
      setChecks(prev => ({ 
        ...prev, 
        mic: 'ok', 
        camera: isCameraOn ? 'ok' : (cameraError === 'denied' ? 'blocked' : 'fallback'),
        speaker: 'ok',
        network: 'ok'
      }));
    }, 1000);
  };

  const isReady = timeLeft === 0 && (checks.mic === 'ok' || checks.mic === 'warning') && (checks.camera === 'ok' || checks.camera === 'fallback' || checks.camera === 'error' || checks.camera === 'blocked');

  const getReadinessSummary = () => {
    const total = 4;
    const passed = Object.values(checks).filter(s => s === 'ok' || s === 'warning' || s === 'fallback').length;
    if (passed === total) return "All systems ready";
    if (checks.camera === 'blocked' || checks.camera === 'error') return "Ready (Audio-only fallback)";
    return `${passed}/${total} checks completed`;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-indigo-500/30 flex flex-col relative overflow-hidden">
      {/* Technical Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Background Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. TOP BAR */}
      <header className="relative z-20 px-8 py-6 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all border border-white/5">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em]">Exit Lobby</span>
        </button>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Secure Link</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Latency: 24ms</span>
            </div>
          </div>
          
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-2xl flex items-center gap-4 shadow-2xl">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Starts In</span>
              <span className="text-lg font-black tabular-nums text-white leading-none">{formatTime(timeLeft)}</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-8 py-4 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
        
        {/* LEFT: THE STAGE */}
        <section className="flex flex-col gap-8 sticky top-8">
          <div className="relative">
            {/* Main Stage Container */}
            <div className="aspect-video bg-zinc-900 rounded-[2.5rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] overflow-hidden relative group">
              
              {/* Technical Viewfinder Overlay */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Corners */}
                <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg" />
                <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg" />
                <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-lg" />
                <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg" />
                
                {/* Center Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                  <div className="w-px h-4 bg-white/10" />
                  <div className="absolute w-4 h-px bg-white/10" />
                </div>

                {/* Technical Data */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isCameraOn ? 'bg-rose-500' : 'bg-zinc-500'}`} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white">
                      {isCameraOn ? 'Live Preview' : 'Preview Paused'}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Resolution</span>
                  <span className="text-[10px] font-black text-white/80">1080p • 30fps</span>
                </div>
              </div>

              {/* Camera Feed Content */}
              {isCameraOn ? (
                <div className="w-full h-full relative">
                  <img 
                    src="https://picsum.photos/seed/precheck_self/1280/720?blur=2" 
                    alt="Self Preview" 
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Scanline Overlay */}
                  <motion.div 
                    animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/80 backdrop-blur-md relative">
                  {/* Lens Reflection Texture */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center px-12">
                    <div className="w-24 h-24 rounded-full bg-zinc-800/50 flex items-center justify-center border border-white/10 mb-6 shadow-2xl">
                      {cameraError === 'denied' ? <ShieldCheck className="w-10 h-10 text-rose-500" /> : <VideoOff className="w-10 h-10 text-zinc-600" />}
                    </div>
                    
                    <h3 className="text-xl font-black text-white uppercase tracking-widest">
                      {cameraError === 'denied' ? 'Access Blocked' : cameraError === 'not-found' ? 'No Camera Found' : 'Camera Disabled'}
                    </h3>
                    
                    <p className="text-zinc-500 text-xs font-bold mt-2 uppercase tracking-widest max-w-md">
                      {cameraError === 'denied' 
                        ? 'Please enable camera permissions in your browser settings to continue with video.' 
                        : cameraError === 'not-found'
                        ? 'We couldn\'t detect a camera. You can still join the lesson with audio only.'
                        : 'You are currently in audio-only mode. Your coach won\'t see you.'}
                    </p>
                    
                    {cameraError !== 'denied' && cameraError !== 'not-found' && (
                      <button 
                        onClick={toggleCamera}
                        className="mt-8 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20"
                      >
                        Enable Camera
                      </button>
                    )}
                    
                    {cameraError === 'denied' && (
                      <div className="mt-8 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-rose-400 uppercase tracking-widest bg-rose-500/10 px-4 py-2 rounded-lg border border-rose-500/20">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Permissions required for video
                        </div>
                        <button className="text-[10px] font-black text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-white transition-colors">
                          How to enable camera access?
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Floating Controls Overlay */}
              <div className="absolute bottom-8 left-8 flex items-center gap-3 z-30">
                <button 
                  onClick={toggleMic}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all border ${!isMicOn ? 'bg-rose-600 border-rose-500 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)]' : 'bg-black/40 backdrop-blur-md text-white hover:bg-black/60 border-white/10'}`}
                >
                  {!isMicOn ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button 
                  onClick={toggleCamera}
                  disabled={cameraError === 'denied' || cameraError === 'not-found'}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all border ${!isCameraOn ? 'bg-zinc-800 border-white/5 text-zinc-500' : 'bg-black/40 backdrop-blur-md text-white hover:bg-black/60 border-white/10'} ${(cameraError === 'denied' || cameraError === 'not-found') ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {!isCameraOn ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Hierarchical Diagnostics Panel */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between px-4">
            {/* Primary Readiness Signals */}
            <div className="flex gap-12">
              <DiagnosticItem 
                variant="primary"
                icon={Mic} 
                label="Microphone" 
                status={checks.mic} 
                subtext={isMicOn ? "Active" : "Muted"}
              />
              <DiagnosticItem 
                variant="primary"
                icon={Video} 
                label="Camera" 
                status={checks.camera} 
                subtext={isCameraOn ? "Ready" : cameraError === 'denied' ? 'Blocked' : 'Fallback'}
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-white/10" />

            {/* Secondary Support Signals */}
            <div className="flex gap-10">
              <DiagnosticItem 
                variant="secondary"
                icon={Volume2} 
                label="Speaker" 
                status={checks.speaker} 
                subtext="System Default"
              />
              <DiagnosticItem 
                variant="secondary"
                icon={Wifi} 
                label="Network" 
                status={checks.network} 
                subtext={checks.network === 'warning' ? 'Weak Signal' : 'Stable (24ms)'}
              />
            </div>
          </div>
        </section>

        {/* RIGHT: THE CONTROL PANEL */}
        <aside className="flex flex-col gap-8 h-full">
          {/* Lesson Context Card (Simplified) */}
          <div className="flex items-center gap-5 px-2">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-xl relative shrink-0">
              <img 
                src={lessonData.coachAvatar} 
                alt={lessonData.coachName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-black text-white">{lessonData.coachName}</h2>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest leading-tight">
                {lessonData.courseTitle}
              </p>
            </div>
          </div>

          {/* Setup Panel (Functional Hub) */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em]">Hardware & Settings</h3>
              <button 
                onClick={retryChecks}
                className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors flex items-center gap-2 group"
              >
                <RefreshCw className={`w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500 ${Object.values(checks).includes('checking') ? 'animate-spin' : ''}`} />
                Retry Check
              </button>
            </div>

            <div className="space-y-4">
              {/* Audio Source Control */}
              <div className="flex items-center justify-between bg-zinc-900/50 border border-white/5 p-4 rounded-2xl group transition-all hover:bg-zinc-900">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                    <Settings className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-0.5">Audio Source</p>
                    <p className="text-[12px] font-bold text-white/90 truncate max-w-[140px]">MacBook Pro Mic...</p>
                  </div>
                </div>
                <button 
                  onClick={toggleMic}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${isMicOn ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500/20'}`}
                >
                  {isMicOn ? 'Active' : 'Muted'}
                </button>
              </div>

              {/* Contextual Guidance Cards */}
              <AnimatePresence mode="wait">
                {cameraError && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <VideoOff className="w-4 h-4 text-rose-500" />
                      <span className="text-[11px] font-black text-rose-500 uppercase tracking-widest">Camera Issue</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-bold leading-relaxed">
                      {cameraError === 'denied' 
                        ? 'Access was denied. Please check your browser permissions to enable video.' 
                        : 'No camera detected. You will enter the lesson in audio-only mode.'}
                    </p>
                    <button className="mt-3 text-[10px] font-black text-rose-400/80 hover:text-rose-400 uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                      <HelpCircle className="w-3 h-3" />
                      Troubleshoot
                    </button>
                  </motion.div>
                )}

                {checks.network === 'warning' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Wifi className="w-4 h-4 text-amber-500" />
                      <span className="text-[11px] font-black text-amber-500 uppercase tracking-widest">Weak Connection</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-bold leading-relaxed">
                      Your network is unstable. Video quality may be affected. Try moving closer to your router.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">Learning Tip</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-bold leading-relaxed">
                  Using headphones reduces echo and helps you hear your coach's pronunciation more clearly.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Zone (Converged) */}
          <div className="mt-auto flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isReady ? 'bg-emerald-500' : 'bg-zinc-700'} transition-colors`} />
                <span className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                  {getReadinessSummary()}
                </span>
              </div>
            </div>

            <div className="relative group">
              <Button 
                onClick={onEnter}
                disabled={!isReady}
                className={`
                  w-full h-20 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] transition-all relative overflow-hidden
                  ${!isReady 
                    ? 'bg-zinc-900 text-zinc-600 border border-white/5 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_24px_48px_-12px_rgba(79,70,229,0.5)] active:scale-[0.98]'}
                `}
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  {isReady ? 'Enter Classroom' : `Waiting for Start`}
                  {isReady && <ChevronRight className="w-6 h-6" />}
                </span>
                
                {!isReady && (
                  <motion.div 
                    className="absolute inset-0 bg-white/[0.03]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: timeLeft, ease: "linear" }}
                  />
                )}
              </Button>
              
              {!isReady && (
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 px-5 py-2.5 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap translate-y-2 group-hover:translate-y-0">
                  <p className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    Lesson starts in {formatTime(timeLeft)}
                  </p>
                </div>
              )}
            </div>
            
            {!isReady && (
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] text-center">
                Unlocks at {lessonData.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

const DiagnosticItem: React.FC<{ 
  variant?: 'primary' | 'secondary',
  icon: any, 
  label: string, 
  status: CheckStatus,
  subtext?: string 
}> = ({ variant = 'primary', icon: Icon, label, status, subtext }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'ok':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          text: 'text-emerald-500',
          glow: 'shadow-[0_0_12px_rgba(16,185,129,0.4)]'
        };
      case 'warning':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          text: 'text-amber-500',
          glow: 'shadow-[0_0_12px_rgba(245,158,11,0.4)]'
        };
      case 'error':
        return {
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/20',
          text: 'text-rose-500',
          glow: 'shadow-[0_0_12px_rgba(244,63,94,0.4)]'
        };
      case 'blocked':
        return {
          bg: 'bg-rose-500/20',
          border: 'border-rose-500/40',
          text: 'text-rose-400',
          glow: 'shadow-[0_0_12px_rgba(244,63,94,0.6)]'
        };
      case 'fallback':
        return {
          bg: 'bg-indigo-500/10',
          border: 'border-indigo-500/20',
          text: 'text-indigo-400',
          glow: 'shadow-[0_0_12px_rgba(99,102,241,0.4)]'
        };
      default:
        return {
          bg: 'bg-zinc-900',
          border: 'border-white/5',
          text: 'text-zinc-600',
          glow: ''
        };
    }
  };

  const styles = getStatusStyles();

  if (variant === 'secondary') {
    return (
      <div className="flex items-center gap-4">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border ${styles.bg} ${styles.border} ${styles.text}`}>
          {status === 'checking' ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Icon className="w-3.5 h-3.5" />
          )}
        </div>
        <div className="space-y-0.5">
          <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">{label}</p>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${styles.text} truncate max-w-[80px]`}>
            {status === 'checking' ? '...' : subtext || status}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border-2 ${styles.bg} ${styles.border} ${styles.text} ${styles.glow}`}>
        {status === 'checking' ? (
          <RefreshCw className="w-6 h-6 animate-spin" />
        ) : (
          <Icon className="w-6 h-6" />
        )}
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</p>
        <p className={`text-[12px] font-black uppercase tracking-widest ${styles.text}`}>
          {status === 'checking' ? 'Verifying...' : subtext || status}
        </p>
      </div>
    </div>
  );
};


export default PreCheck;
