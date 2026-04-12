
import React from 'react';
import { Button, Card, Badge } from '../components/UI';
import { Icons } from '../constants';
import { motion } from 'motion/react';

interface LandingProps {
  onStart: () => void;
  onLogin: () => void;
  onBecomeCoach: () => void;
  onTrialPurchase: () => void;
  onAbout: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart, onLogin, onBecomeCoach, onTrialPurchase, onAbout }) => {
  return (
    <div className="bg-white text-zinc-900 font-sans selection:bg-indigo-100">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
              <span className="text-xl font-bold tracking-tight">Elo</span>
            </div>
            <div className="hidden lg:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors">How it works</a>
              <button onClick={onAbout} className="text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors">About Us</button>
              <a href="#coaches" className="text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors">Our Coaches</a>
              <a href="#pricing" className="text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors">Plans & Pricing</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onBecomeCoach} className="hidden sm:block text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors mr-4">Become a coach</button>
            <button onClick={onLogin} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Log in</button>
            <Button onClick={onStart} className="px-5 py-2.5 text-sm font-bold">
              Start Practicing
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-48 md:pt-56 md:pb-64 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge color="indigo" className="mb-8 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase border-indigo-100 bg-white text-indigo-600 shadow-sm">First Session: $4.9</Badge>
              <h1 className="text-6xl md:text-8xl font-black leading-[1.02] tracking-tight text-zinc-900">
                Stop studying. <br />
                <span className="text-indigo-600">Start speaking.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-2xl mt-8 font-medium"
            >
              Connect with a native coach for a 15-minute live conversation. No curriculum, no pressure—just real practice.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-10 pt-6"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button onClick={onStart} className="w-full sm:w-auto px-12 py-7 text-xl rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:shadow-indigo-300/60 hover:scale-[1.02] transition-all font-black bg-indigo-600">
                  Book your first session — $4.9
                  <Icons.ArrowRight className="w-6 h-6 ml-3" />
                </Button>
                <a href="#how-it-works" className="w-full sm:w-auto">
                  <Button variant="ghost" className="w-full px-12 py-7 text-xl rounded-2xl border border-zinc-200 hover:bg-zinc-50 font-bold text-zinc-500">
                    How it works
                  </Button>
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">No subscription required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Check className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">One-time payment</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Visual Element - Redesigned as Live Classroom Snapshot */}
        <div className="absolute top-20 right-0 w-1/2 h-full hidden lg:block">
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-end pr-12"
          >
            <div className="relative w-[480px] h-[540px] bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-zinc-100 overflow-hidden flex flex-col">
              {/* Card Header: Lesson Context */}
              <div className="px-8 py-5 border-b border-zinc-50 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Live Classroom</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-50 rounded-full border border-zinc-100">
                  <Icons.Clock className="w-3 h-3 text-zinc-400" />
                  <span className="text-[10px] font-bold text-zinc-500 tabular-nums">14:59</span>
                </div>
              </div>
              
              {/* Card Body: The Classroom Stage */}
              <div className="flex-1 p-6 flex flex-col gap-4">
                {/* Main Video Stage (Tutor) */}
                <div className="relative flex-1 bg-zinc-100 rounded-[2rem] overflow-hidden border border-zinc-200/50 group">
                  <img 
                    src="https://picsum.photos/seed/tutor-li/800/600?blur=1" 
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" 
                    alt="Tutor Preview" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Tutor Info Overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <img src="https://picsum.photos/seed/coach-li/100/100" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="Coach" />
                    <div className="text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest leading-none">Coach</p>
                      <p className="text-xs font-bold">Li Wei</p>
                    </div>
                  </div>

                  {/* Self Preview (Learner) */}
                  <div className="absolute top-4 right-4 w-24 h-32 bg-zinc-800 rounded-2xl border-2 border-white/20 shadow-xl overflow-hidden">
                    <img 
                      src="https://picsum.photos/seed/learner-jing/200/300?blur=2" 
                      className="w-full h-full object-cover opacity-60" 
                      alt="Learner Preview" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icons.User className="w-6 h-6 text-white/40" />
                    </div>
                  </div>
                </div>

                {/* Lesson Topic Card */}
                <div className="bg-indigo-50/50 border border-indigo-100/50 p-5 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-indigo-100">
                    <Icons.BookOpen className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">Current Topic</p>
                    <p className="text-xs font-bold text-zinc-800">"Describing your hometown in Shanghai"</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[8px] font-bold text-indigo-600">
                        {i === 3 ? '+2' : ''}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Classroom Controls */}
              <div className="px-8 py-6 bg-zinc-50/30 border-t border-zinc-100 flex justify-center gap-4">
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-zinc-200 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Icons.Mic className="w-4 h-4" />
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-zinc-50 text-zinc-400 flex items-center justify-center">
                    <Icons.Video className="w-4 h-4" />
                  </div>
                  <div className="w-px h-6 bg-zinc-200 mx-1" />
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Icons.PhoneOff className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-50 rounded-full -z-10 blur-[100px] opacity-40" />
          </motion.div>
        </div>
      </section>

      {/* Why Elo Section */}
      <section className="py-48 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900">Why Elo?</h2>
            <p className="text-xl text-zinc-500 leading-relaxed">We focus on the one thing that actually builds fluency: speaking with real people in a low-pressure environment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Real conversations', desc: 'Stop repeating flashcards. Practice spoken Chinese through real-life dialogue.', icon: <Icons.Mic /> },
              { title: 'Flexible session lengths', desc: 'Choose 15, 30, 45, or 60-minute sessions that fit your energy and schedule.', icon: <Icons.Clock /> },
              { title: 'Supportive coaches', desc: 'Practice with patient, encouraging native-speaking coaches in a no-judgment environment.', icon: <Icons.Sparkles /> },
              { title: 'Speak more, fear less', desc: 'Build confidence by speaking regularly in low-pressure sessions designed for progress.', icon: <Icons.Check /> }
            ].map((item, i) => (
              <Card key={i} className="p-10 border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all bg-white rounded-[2rem]">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8">
                  {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-zinc-500 text-base leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-48">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-16">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-zinc-900">Human-first <br /> speaking practice.</h2>
              <div className="space-y-12">
                {[
                  { step: '01', title: 'Connect with a Coach', desc: 'Get matched instantly with a friendly native speaker ready to support your journey.' },
                  { step: '02', title: 'Start a Conversation', desc: 'Talk about anything. Use our optional "Starters" if you need a little help beginning.' },
                  { step: '03', title: 'Build Real Confidence', desc: 'Have a focused, voice-first session and leave with a quick reflection on your progress.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8">
                    <div className="text-5xl font-black text-indigo-100/80">{item.step}</div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                      <p className="text-zinc-500 text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={onStart} className="px-12 py-7 text-xl rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-100">
                Start your first session
              </Button>
            </div>
            <div className="relative">
              <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-100 space-y-6 opacity-80 scale-95 origin-right">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Optional Starters</h5>
                </div>
                <div className="space-y-2">
                  {[
                    { t: 'Ordering at a Restaurant', icon: '🍜' },
                    { t: 'Asking for Directions', icon: '🗺️' },
                    { t: 'Introducing Yourself', icon: '💼' }
                  ].map((topic, i) => (
                    <div key={i} className="p-3 rounded-xl border border-zinc-200/50 bg-white/50 flex items-center gap-3 grayscale opacity-60">
                      <span className="text-lg">{topic.icon}</span>
                      <span className="text-sm font-medium text-zinc-400">{topic.t}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-zinc-400 italic text-center">"I don't know what to say" — use these to start.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversation Inspiration - De-emphasized */}
      <section id="coaches" className="py-24 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Practice for real life.</h2>
            <p className="text-zinc-500">Our coaches help you navigate real situations, or just have a friendly chat.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Travel', desc: 'Order food, ask for directions, and handle everyday travel moments.', img: 'https://images.unsplash.com/photo-1528164344705-47542687990d?auto=format&fit=crop&w=600&q=80' },
              { title: 'Work', desc: 'Master introductions, meetings, and professional confidence.', img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80' },
              { title: 'Social', desc: 'Reconnect with relatives and have natural conversations.', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80' }
            ].map((item, i) => (
              <div key={i} className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer">
                <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Pricing Section - Trial Focused */}
      <section id="pricing" className="py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900">Simple, transparent pricing.</h2>
            <p className="text-xl text-zinc-500">Start with a trial, then choose a plan to keep growing.</p>
          </div>
          
          {/* Trial Lesson Card - Primary Path */}
          <div className="max-w-5xl mx-auto mb-24">
            <Card className="p-10 md:p-16 border-2 border-indigo-600 ring-4 ring-indigo-50 bg-white rounded-[4rem] relative overflow-hidden flex flex-col md:flex-row items-center gap-16 shadow-[0_64px_128px_-12px_rgba(79,70,229,0.25)]">
              <div className="absolute top-8 right-8 bg-indigo-600 text-[11px] font-black px-6 py-2 rounded-full uppercase tracking-[0.25em] text-white shadow-lg shadow-indigo-200">Recommended Start</div>
              
              <div className="flex-1 space-y-8">
                <div className="space-y-3">
                  <h3 className="text-4xl font-black text-zinc-900 tracking-tight">15-Minute Intro Session</h3>
                  <p className="text-zinc-500 text-lg font-medium">The perfect way to experience Elo for the first time. No strings attached.</p>
                </div>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <li className="flex items-center gap-4 text-base font-bold text-zinc-700">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                      <Icons.Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    1-on-1 with native coach
                  </li>
                  <li className="flex items-center gap-4 text-base font-bold text-zinc-700">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                      <Icons.Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    Full AI Speaking Debrief
                  </li>
                  <li className="flex items-center gap-4 text-base font-bold text-zinc-700">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                      <Icons.Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    No auto-renewal
                  </li>
                  <li className="flex items-center gap-4 text-base font-bold text-zinc-700">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                      <Icons.Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    Valid for any topic
                  </li>
                </ul>
              </div>

              <div className="w-full md:w-80 space-y-6 text-center bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100">
                <div className="space-y-2">
                  <span className="text-zinc-400 text-lg line-through font-bold">$25</span>
                  <div className="text-7xl font-black text-zinc-900 tracking-tighter">$4.9</div>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">One-time payment</span>
                </div>
                <Button onClick={onTrialPurchase} className="w-full py-7 text-xl rounded-2xl shadow-2xl shadow-indigo-200 font-black bg-indigo-600">
                  Get Started Now
                </Button>
              </div>
            </Card>
          </div>

          <div className="text-center mb-16">
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-[0.3em]">Already tried Elo? Choose a plan to keep growing.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Elo Lite */}
            <Card className="p-8 border-2 border-zinc-100 bg-zinc-50/50 rounded-[2.5rem] space-y-6 hover:border-indigo-100 transition-all flex flex-col shadow-sm opacity-80 hover:opacity-100">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-zinc-900">Elo Lite</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-zinc-900">$43</span>
                  <span className="text-zinc-400 font-medium text-sm">/ month</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">Build a steady speaking habit with one session each week.</p>
              </div>
              <ul className="space-y-3 text-zinc-600 flex-1">
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> 4 lessons per cycle</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> 120 total minutes</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> Roll over up to 30 mins</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> Standard AI review</li>
              </ul>
              <Button onClick={onStart} variant="secondary" className="w-full py-4 rounded-2xl border-zinc-200 font-bold text-sm">Start with Lite</Button>
            </Card>

            {/* Elo Plus */}
            <Card className="p-8 border-2 border-zinc-900 bg-zinc-900 text-white rounded-[2.5rem] space-y-6 relative overflow-hidden flex flex-col shadow-2xl shadow-indigo-200/20">
              <div className="absolute top-4 right-4 bg-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Elo Plus</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$85</span>
                  <span className="text-zinc-400 font-medium text-sm">/ month</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">Build momentum with two speaking sessions every week.</p>
              </div>
              <ul className="space-y-3 text-zinc-300 flex-1">
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-400" /> 8 lessons per cycle</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-400" /> 240 total minutes</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-400" /> Roll over up to 30 mins</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-400" /> Enhanced AI review</li>
              </ul>
              <Button onClick={onStart} className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 border-none font-bold text-sm">Join Elo Plus</Button>
            </Card>

            {/* Elo Intensive */}
            <Card className="p-8 border-2 border-zinc-100 bg-zinc-50/50 rounded-[2.5rem] space-y-6 hover:border-indigo-100 transition-all flex flex-col shadow-sm opacity-80 hover:opacity-100">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-zinc-900">Elo Intensive</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-zinc-900">$122</span>
                  <span className="text-zinc-400 font-medium text-sm">/ month</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">Accelerate with three sessions per week and priority matching.</p>
              </div>
              <ul className="space-y-3 text-zinc-600 flex-1">
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> 12 lessons per cycle</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> 360 total minutes</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> Priority coach matching</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> Advanced AI analytics</li>
              </ul>
              <Button onClick={onStart} variant="secondary" className="w-full py-4 rounded-2xl border-zinc-200 font-bold text-sm">Start Intensive</Button>
            </Card>
          </div>

          {/* Optional Extras - Integrated */}
          <div className="mt-8 max-w-6xl mx-auto">
            <div className="bg-zinc-50 rounded-[2.5rem] p-8 md:p-12 border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center md:text-left max-w-xs">
                <h4 className="text-lg font-bold">Need more practice?</h4>
                <p className="text-sm text-zinc-500">Add extra lessons to any plan whenever you need them.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex justify-between items-center">
                  <div>
                    <span className="block text-sm font-bold">1 Extra Lesson</span>
                    <span className="block text-xs text-zinc-400">30 extra mins</span>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">$11.99</span>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex justify-between items-center">
                  <div>
                    <span className="block text-sm font-bold">2 Extra Lessons</span>
                    <span className="block text-xs text-zinc-400">60 extra mins</span>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">$21.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Reinforcement - Direct */}
      <section className="py-48 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-zinc-950 rounded-[5rem] p-16 md:p-32 text-center space-y-12 shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 blur-[120px] rounded-full -mr-96 -mt-96" />
            <div className="max-w-4xl mx-auto space-y-8 relative z-10">
              <h2 className="text-5xl md:text-8xl font-black tracking-tight text-white leading-[1.02]">
                Start speaking today.
              </h2>
              <p className="text-2xl md:text-3xl text-indigo-100 leading-relaxed opacity-90 font-medium">
                Book your first 15-minute session for just $4.9. No subscription required.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-10">
              <Button onClick={onStart} variant="secondary" className="w-full sm:w-auto px-16 py-9 text-2xl rounded-[2.5rem] bg-white text-indigo-600 hover:bg-zinc-50 hover:scale-[1.02] transition-all shadow-2xl font-black">
                Book My Session — $4.9
                <Icons.ArrowRight className="w-7 h-7 ml-3" />
              </Button>
            </div>
            
            <div className="pt-8 flex flex-wrap justify-center gap-8 text-indigo-200/60 text-[10px] font-black uppercase tracking-[0.25em] relative z-10">
              <div className="flex items-center gap-2">
                <Icons.Check className="w-4 h-4" />
                Live conversation
              </div>
              <div className="flex items-center gap-2">
                <Icons.Check className="w-4 h-4" />
                Native-speaking coaches
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Common Questions</h2>
            <p className="text-zinc-500">Everything you need to know about starting your journey with Elo.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Who is the trial lesson for?",
                a: "The trial lesson is for anyone who wants to practice Chinese but isn't ready for a long-term commitment. Whether you're a beginner or an advanced learner, it's the lowest-cost way to try Elo."
              },
              {
                q: "Will I be charged automatically after the trial?",
                a: "Absolutely not. The trial lesson is a one-time purchase. You will only be charged if you explicitly choose to join one of our monthly plans later."
              },
              {
                q: "What's the difference between a trial and a subscription?",
                a: "A trial is a single 15-minute experience with a native coach and full AI debrief. Subscriptions offer longer sessions (30-60 mins) and a lower price per minute for regular practice."
              },
              {
                q: "I'm shy. Is talking to a real person stressful?",
                a: "Don't worry! Our coaches are specially trained to break the ice. If you're not ready for video, Elo is voice-only by default, so you can practice as if you're calling a friend."
              },
              {
                q: "How do I continue after my trial?",
                a: "After your session, you'll receive your Speaking Debrief. From there, you can choose a plan that fits your goals or simply buy another extra lesson whenever you're ready."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-100 space-y-3">
                <h4 className="font-bold text-zinc-900 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs">Q</div>
                  {item.q}
                </h4>
                <p className="text-sm text-zinc-500 leading-relaxed pl-9">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Coach - Subtle */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Native speaker? Join our team.</h2>
          <p className="text-zinc-500 text-sm">Help others find their voice while earning on your own schedule.</p>
          <Button onClick={onBecomeCoach} variant="secondary" className="px-8 py-4 rounded-xl border-zinc-200 text-sm">
            Apply to become a coach
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
                <span className="text-xl font-bold tracking-tight">Elo</span>
              </div>
              <p className="text-zinc-500 max-w-xs leading-relaxed">
                The human-first platform for building spoken Chinese confidence through real conversation.
              </p>
            </div>
            <div className="space-y-6">
              <h5 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Product</h5>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it works</a></li>
                <li><a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
                <li><a href="#coaches" className="hover:text-indigo-600 transition-colors">Our Coaches</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Learners</h5>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><button onClick={onStart} className="hover:text-indigo-600 transition-colors">Start practicing</button></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help center</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Coaches</h5>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><button onClick={onBecomeCoach} className="hover:text-indigo-600 transition-colors">Become a Coach</button></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Coach Requirements</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Coach FAQ</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Company</h5>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><button onClick={onAbout} className="hover:text-indigo-600 transition-colors">About us</button></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-zinc-100">
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">© 2024 Elo Chinese · All rights reserved</p>
            <div className="flex items-center gap-8">
              <span className="text-xs text-zinc-300">Made with ❤️ for language learners</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
