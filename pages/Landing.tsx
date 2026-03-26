
import React from 'react';
import { Button, Card, Badge } from '../components/UI';
import { Icons } from '../constants';
import { motion } from 'motion/react';

interface LandingProps {
  onStart: () => void;
  onLogin: () => void;
  onBecomeCoach: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart, onLogin, onBecomeCoach }) => {
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
              <a href="#scenarios" className="text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors">Scenarios</a>
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
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge color="indigo" className="mb-6">Live Spoken Chinese Practice</Badge>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-zinc-900">
                Build real speaking <br />
                <span className="text-indigo-600">confidence in Chinese.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-2xl"
            >
              Practice spoken Chinese in live, voice-first conversations. Choose a real-life topic, talk with a supportive coach, and build confidence for everyday situations.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 pt-4"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button onClick={onStart} className="w-full sm:w-auto px-10 py-6 text-lg rounded-2xl shadow-lg shadow-indigo-100">
                  Join Elo Plus
                  <Icons.ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <a href="#pricing" className="w-full sm:w-auto">
                  <Button variant="ghost" className="w-full px-10 py-6 text-lg rounded-2xl border border-zinc-100 hover:bg-zinc-50">
                    See plans
                  </Button>
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-8 text-zinc-400">
                <div className="flex items-center gap-2">
                  <Icons.Clock className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-semibold text-zinc-600">15–60 minute live sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Mic className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-semibold text-zinc-600">Real-life speaking practice</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-semibold text-zinc-600">Supportive native-speaking coaches</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex items-center gap-3 pt-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/elo${i}/100/100`} className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                ))}
              </div>
              <p className="text-sm font-medium text-zinc-400">
                Join <span className="text-zinc-900 font-bold">5,000+</span> learners building confidence
              </p>
            </motion.div>
          </div>
        </div>

        {/* Hero Visual Element - Refined for Product Specificity */}
        <div className="absolute top-20 right-0 w-1/2 h-full hidden lg:block">
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-end pr-12"
          >
            <div className="relative w-[500px] h-[620px] bg-white rounded-[3rem] shadow-2xl border border-zinc-100 overflow-hidden flex flex-col">
              <div className="p-8 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/50">
                <div className="flex items-center gap-3">
                  <img src="https://picsum.photos/seed/coach-li/100/100" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Coach" />
                  <div>
                    <p className="text-sm font-bold">Li Wei</p>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Now
                    </p>
                  </div>
                </div>
                <Badge color="indigo" className="px-3 py-1">30:00</Badge>
              </div>
              
              <div className="flex-1 p-8 flex flex-col justify-center items-center space-y-10">
                <div className="text-center space-y-3">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Active Scenario</p>
                  <h4 className="text-2xl font-bold text-zinc-900">Ordering at a Local Market</h4>
                  <p className="text-xs text-zinc-500 font-medium">Goal: Practice bargaining and quantities</p>
                </div>

                <div className="w-full space-y-6">
                  <div className="flex justify-center items-center gap-1.5 h-20">
                    {[0.4, 0.7, 0.3, 0.9, 0.5, 0.8, 0.4, 0.6, 0.3, 0.7, 0.5, 0.9, 0.4, 0.6, 0.3].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [`${h * 40}%`, `${h * 100}%`, `${h * 40}%`] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-indigo-500 rounded-full"
                      />
                    ))}
                  </div>
                  <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
                    <p className="text-center text-sm text-indigo-900 font-medium italic">"How would you ask for the price of these oranges?"</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Session Type</p>
                    <p className="text-sm font-bold">Voice Only</p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Focus</p>
                    <p className="text-sm font-bold">Fluency</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-zinc-50 border-t border-zinc-100 flex justify-center gap-6">
                <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                  <Icons.Mic className="w-6 h-6 text-white" />
                </div>
                <div className="w-14 h-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
                  <Icons.X className="w-6 h-6 text-zinc-400" />
                </div>
              </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-50 rounded-full -z-10 blur-3xl opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Why Elo Section */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Why Elo?</h2>
            <p className="text-lg text-zinc-500">We focus on the one thing that actually builds fluency: speaking with real people in a low-pressure environment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Real conversations', desc: 'Stop repeating flashcards. Practice spoken Chinese through real-life dialogue.', icon: <Icons.Mic /> },
              { title: 'Flexible session lengths', desc: 'Choose 15, 30, 45, or 60-minute sessions that fit your energy and schedule.', icon: <Icons.Clock /> },
              { title: 'Supportive coaches', desc: 'Practice with patient, encouraging native-speaking coaches in a no-judgment environment.', icon: <Icons.Sparkles /> },
              { title: 'Speak more, fear less', desc: 'Build confidence by speaking regularly in low-pressure sessions designed for progress.', icon: <Icons.Check /> }
            ].map((item, i) => (
              <Card key={i} className="p-8 border-none shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">Simple steps to <br /> start speaking.</h2>
              <div className="space-y-10">
                {[
                  { step: '01', title: 'Choose a real-life topic', desc: 'Pick from scenarios you actually face, like ordering coffee, business intros, or travel directions.' },
                  { step: '02', title: 'Match with a supportive coach', desc: 'Get connected instantly with a friendly native speaker ready to help you practice.' },
                  { step: '03', title: 'Speak live for 15–60 minutes', desc: 'Have a focused, voice-first conversation and leave with more confidence and a quick reflection.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-4xl font-black text-indigo-100">{item.step}</div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={onStart} className="px-10 py-6 text-lg rounded-2xl">
                Start your first session
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-100 rounded-[3rem] -z-10 rotate-3" />
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-zinc-100 space-y-8">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold">Select a Topic</h5>
                  <Badge color="indigo">Popular</Badge>
                </div>
                <div className="space-y-3">
                  {[
                    { t: 'Ordering at a Restaurant', icon: '🍜' },
                    { t: 'Asking for Directions', icon: '🗺️' },
                    { t: 'Introducing Yourself at Work', icon: '💼' },
                    { t: 'Talking About Your Weekend', icon: '☕' }
                  ].map((topic, i) => (
                    <div key={i} className={`p-4 rounded-2xl border flex items-center gap-4 ${i === 0 ? 'border-indigo-600 bg-indigo-50/50' : 'border-zinc-100'}`}>
                      <span className="text-2xl">{topic.icon}</span>
                      <span className="font-medium">{topic.t}</span>
                      {i === 0 && <Icons.Check className="w-4 h-4 ml-auto text-indigo-600" />}
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center mb-4">Select Duration</p>
                  <div className="flex justify-between gap-2">
                    {['15m', '30m', '45m', '60m'].map((d, i) => (
                      <div key={d} className={`flex-1 py-3 rounded-xl border text-center text-sm font-bold ${i === 1 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-zinc-100 text-zinc-400'}`}>
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Scenarios */}
      <section id="scenarios" className="py-24 bg-zinc-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl space-y-4">
              <Badge color="indigo" className="bg-indigo-500/20 text-indigo-300">Scenarios</Badge>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Practice for the <br /> moments that matter.</h2>
            </div>
            <p className="text-zinc-400 max-w-xs text-lg">Don't just learn words. Learn how to use them in the situations you actually face.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Travel', desc: 'Order food, ask for directions, and handle everyday travel moments with ease.', img: 'https://images.unsplash.com/photo-1528164344705-47542687990d?auto=format&fit=crop&w=600&q=80' },
              { title: 'Work', desc: 'Master introductions, meetings, small talk, and professional confidence.', img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80' },
              { title: 'Family', desc: 'Reconnect with relatives, practice heritage speaking, and have more natural conversations.', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80' },
              { title: 'Confidence', desc: 'Rebuild your speaking ability after years of passive study and grammar drills.', icon: '💪', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80' }
            ].map((item, i) => (
              <div key={i} className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg">
                <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 space-y-2">
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Voices of confidence.</h2>
            <p className="text-lg text-zinc-500">Real stories from learners who finally found their voice with Elo.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah K.', role: 'Product Designer in Berlin', quote: 'I used to freeze up when a native speaker talked to me. After a few sessions with Elo, I stopped overthinking and started responding naturally.' },
              { name: 'James L.', role: 'Consultant in Singapore', quote: 'The flexible sessions fit perfectly into my commute. I finally feel comfortable handling small talk with my colleagues in Chinese.' },
              { name: 'Elena R.', role: 'Heritage Speaker in Toronto', quote: 'Elo helped me bridge the gap between the Chinese I heard at home and the Chinese I needed for my professional life.' }
            ].map((t, i) => (
              <Card key={i} className="p-10 border-zinc-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-6">
                  <p className="text-lg text-zinc-600 italic leading-relaxed">"{t.quote}"</p>
                </div>
                <div className="mt-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">{t.name}</p>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Proof */}
      <section className="py-24 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Designed for <br /> real progress.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: 'Flexible duration', desc: 'Choose 15, 30, 45, or 60-minute sessions based on your energy.' },
                  { title: 'Voice-first practice', desc: 'Focus on listening and speaking without the distraction of video.' },
                  { title: 'Topic-based sessions', desc: 'Every session has a clear real-world goal and vocabulary focus.' },
                  { title: 'Session reflection', desc: 'Get a quick summary of what you practiced and where to improve.' }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-indigo-100 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/20 shadow-2xl">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="https://picsum.photos/seed/wang/100/100" className="w-10 h-10 rounded-full border border-white/20" alt="Coach" />
                    <div>
                      <p className="text-sm font-bold">Wang Jing</p>
                      <p className="text-[10px] uppercase tracking-widest text-indigo-200 font-bold">Native Coach</p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-2 bg-emerald-400/10 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Session
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Topic: Asking for Directions</p>
                    <p className="text-xs font-bold text-white">12:45</p>
                  </div>
                  <div className="h-20 flex items-center justify-center gap-1.5">
                    {[0.3, 0.6, 0.8, 0.4, 0.7, 0.9, 0.5, 0.8, 0.4, 0.6, 0.3, 0.7, 0.5, 0.8].map((h, i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: [`${h * 30}%`, `${h * 100}%`, `${h * 30}%`] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 bg-white rounded-full"
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white/10 rounded-2xl text-sm font-medium text-indigo-50 text-center border border-white/5">
                  "Great job! Now try asking how long it takes to walk there."
                </div>
                
                <div className="flex justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-lg">
                    <Icons.Mic className="w-6 h-6" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg">
                    <Icons.X className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest">
              <Icons.Sparkles className="w-3 h-3" />
              Simple, Transparent Plans
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900">
              Ready to start <br /> speaking Chinese?
            </h2>
            <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto">
              Choose a plan that matches your learning pace. Every plan includes live 1-on-1 sessions with supportive coaches and our Evidence-First AI review system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* Elo Lite */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex"
            >
              <Card className="p-8 border-zinc-100 flex flex-col w-full hover:border-indigo-100 transition-all duration-300 group">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">Elo Lite</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed min-h-[40px]">Build a steady speaking habit with one session each week.</p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-zinc-900">$39</span>
                    <span className="text-zinc-500 font-medium text-sm">/ month</span>
                  </div>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  <div className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                    <Icons.Check className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span>120 minutes per cycle</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                    <Icons.Check className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span>4 lessons (30m baseline)</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                    <Icons.Check className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                    <div>
                      <p>Roll over up to 30 mins</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">Valid for 7 days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                    <Icons.Check className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span>Standard AI review</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-medium text-zinc-300">
                    <Icons.X className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Priority matching</span>
                  </div>
                </div>
                <Button onClick={onStart} variant="ghost" className="w-full py-4 rounded-xl border border-zinc-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all font-bold">
                  Start with Lite
                </Button>
              </Card>
            </motion.div>

            {/* Elo Plus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex"
            >
              <Card className="p-8 border-indigo-600 bg-white flex flex-col w-full shadow-2xl shadow-indigo-100/50 relative md:-mt-4 md:mb-4 z-10">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge color="indigo" className="px-4 py-1 shadow-sm border border-indigo-200">Recommended</Badge>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">Elo Plus</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed min-h-[40px]">Build momentum with two speaking sessions every week.</p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-zinc-900">$75</span>
                    <span className="text-zinc-500 font-medium text-sm">/ month</span>
                  </div>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  <div className="flex items-start gap-3 text-sm font-bold text-zinc-900">
                    <Icons.Check className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <span>240 minutes per cycle</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-bold text-zinc-900">
                    <Icons.Check className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <span>8 lessons (30m baseline)</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-bold text-zinc-900">
                    <Icons.Check className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <div>
                      <p>Roll over up to 30 mins</p>
                      <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider mt-0.5">Valid for 7 days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-bold text-zinc-900">
                    <Icons.Check className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <span>Enhanced AI review</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-medium text-zinc-300">
                    <Icons.X className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Priority matching</span>
                  </div>
                </div>
                <Button onClick={onStart} className="w-full py-4 rounded-xl shadow-lg shadow-indigo-100 font-bold">
                  Join Elo Plus
                </Button>
              </Card>
            </motion.div>

            {/* Elo Intensive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex"
            >
              <Card className="p-8 border-zinc-100 flex flex-col w-full hover:border-indigo-100 transition-all duration-300 group">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">Elo Intensive</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed min-h-[40px]">Accelerate with three sessions per week and priority matching.</p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-zinc-900">$109</span>
                    <span className="text-zinc-500 font-medium text-sm">/ month</span>
                  </div>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  <div className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                    <Icons.Check className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span>360 minutes per cycle</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                    <Icons.Check className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span>12 lessons (30m baseline)</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                    <Icons.Check className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                    <div>
                      <p>Roll over up to 30 mins</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">Valid for 7 days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                    <Icons.Check className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span>Enhanced AI review</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                    <Icons.Check className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span className="font-bold text-zinc-900">Priority coach matching</span>
                  </div>
                </div>
                <Button onClick={onStart} variant="ghost" className="w-full py-4 rounded-xl border border-zinc-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all font-bold">
                  Start Intensive
                </Button>
              </Card>
            </motion.div>
          </div>

          {/* Add-ons Section - Redesigned for clarity */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="relative p-1 bg-gradient-to-r from-zinc-100 via-indigo-50 to-zinc-100 rounded-[2.5rem]">
              <div className="bg-white rounded-[2.4rem] p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center gap-10">
                  <div className="flex-1 space-y-4 text-center lg:text-left">
                    <Badge color="indigo" className="bg-indigo-50 text-indigo-600 border-none">Optional Extras</Badge>
                    <h4 className="text-2xl font-bold text-zinc-900">Need more practice?</h4>
                    <p className="text-zinc-500 leading-relaxed">
                      Add extra lessons to any plan whenever you need them. These never expire as long as your subscription is active.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
                    {[
                      { title: '1 Extra Lesson', price: '$11.99', mins: '30 extra mins' },
                      { title: '2 Extra Lessons', price: '$21.99', mins: '60 extra mins' }
                    ].map((addon, i) => (
                      <div key={i} className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 flex flex-col items-center text-center gap-2 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 transition-all cursor-pointer group">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{addon.title}</p>
                        <p className="text-2xl font-bold text-zinc-900">{addon.price}</p>
                        <p className="text-xs font-medium text-zinc-500">{addon.mins}</p>
                        <div className="mt-2 w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-colors">
                          <Icons.Plus className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Reinforcement */}
      <section className="py-32 bg-zinc-50/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900">Confidence starts here.</h2>
              <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto">
                Practice spoken Chinese in a way that fits real life. Start with one real conversation.
              </p>
            </div>
            <div className="space-y-6">
              <Button onClick={onStart} className="px-16 py-8 text-2xl rounded-3xl shadow-2xl shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Book your first session
              </Button>
              <p className="text-sm font-semibold text-zinc-400">Join learners who stopped studying and started speaking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Coach Section */}
      <section className="py-24 bg-white border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-emerald-50 rounded-[3rem] -z-10 -rotate-2" />
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                className="rounded-[2.5rem] shadow-lg border border-zinc-100"
                alt="Coach smiling"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <Badge color="green" className="bg-emerald-50 text-emerald-700 border border-emerald-100">Become a Coach</Badge>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">Share your language. <br /> Earn on your schedule.</h2>
              <p className="text-lg text-zinc-500 leading-relaxed">
                Are you a native Chinese speaker? Help learners find their confidence while hosting flexible live conversation sessions on your own schedule.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Help learners speak with confidence',
                  'Host flexible live conversation sessions',
                  'Earn on your own schedule',
                  'Build meaningful human connection'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-600 text-sm font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                      <Icons.Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <Button onClick={onBecomeCoach} variant="secondary" className="px-10 py-6 text-lg rounded-2xl border border-zinc-200 hover:bg-zinc-50 transition-colors">
                Become a coach
                <Icons.ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
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
                <li><a href="#scenarios" className="hover:text-indigo-600 transition-colors">Scenarios</a></li>
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
                <li><a href="#" className="hover:text-indigo-600 transition-colors">About us</a></li>
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
