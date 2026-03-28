
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
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge color="indigo" className="mb-6">Live 1:1 Spoken Chinese</Badge>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-zinc-900">
                Speak Chinese <br />
                <span className="text-indigo-600">with real people.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-2xl"
            >
              The most effective way to build fluency is to open your mouth. Practice live with supportive native-speaking coaches who help you find your voice.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8 pt-4"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button onClick={onStart} className="w-full sm:w-auto px-10 py-6 text-lg rounded-2xl shadow-xl shadow-indigo-100 hover:scale-[1.02] transition-all">
                  Start Speaking Now
                  <Icons.ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <a href="#how-it-works" className="w-full sm:w-auto">
                  <Button variant="ghost" className="w-full px-10 py-6 text-lg rounded-2xl border border-zinc-100 hover:bg-zinc-50">
                    How it works
                  </Button>
                </a>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-zinc-600">Live native coaches available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Mic className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium text-zinc-600">Voice-only practice</span>
                </div>
              </div>
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
                    <p className="text-sm font-bold">李伟 <span className="text-[10px] text-zinc-400 font-medium ml-1">Li Wei</span></p>
                    <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      正在通话
                    </p>
                  </div>
                </div>
                <Badge color="indigo" className="px-3 py-1">24:15</Badge>
              </div>
              
              <div className="flex-1 p-8 flex flex-col justify-center items-center space-y-10">
                <div className="text-center space-y-3">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">实时连线</p>
                  <h4 className="text-2xl font-bold text-zinc-900">正在与李老师练习</h4>
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
                  <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50 space-y-1">
                    <p className="text-center text-sm text-indigo-900 font-bold">“别担心语法，试着描述你的感受。”</p>
                    <p className="text-center text-[10px] text-indigo-400 font-medium italic">"Don't worry about the grammar, just try to describe the feeling."</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">通话模式</p>
                    <p className="text-sm font-bold">语音通话</p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">练习重点</p>
                    <p className="text-sm font-bold">流利度</p>
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
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">Human-first <br /> speaking practice.</h2>
              <div className="space-y-10">
                {[
                  { step: '01', title: 'Connect with a Coach', desc: 'Get matched instantly with a friendly native speaker ready to support your journey.' },
                  { step: '02', title: 'Start a Conversation', desc: 'Talk about anything. Use our optional "Starters" if you need a little help beginning.' },
                  { step: '03', title: 'Build Real Confidence', desc: 'Have a focused, voice-first session and leave with a quick reflection on your progress.' }
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



      {/* Pricing Section - Real Plans */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">Simple, conversation-based pricing.</h2>
            <p className="text-lg text-zinc-500">Choose the plan that fits your speaking goals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Elo Lite */}
            <Card className="p-8 border-2 border-zinc-100 rounded-[2.5rem] space-y-6 hover:border-indigo-100 transition-all flex flex-col shadow-sm">
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
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> 120 total minutes · 30m baseline</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> Roll over up to 30 mins</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> Valid for 7 days</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> Standard AI review</li>
              </ul>
              <Button onClick={onStart} variant="secondary" className="w-full py-4 rounded-2xl border-zinc-200 font-bold text-sm">Start with Lite</Button>
            </Card>

            {/* Elo Plus */}
            <Card className="p-8 border-2 border-indigo-600 bg-zinc-900 text-white rounded-[2.5rem] space-y-6 relative overflow-hidden flex flex-col shadow-2xl shadow-indigo-200/20">
              <div className="absolute top-4 right-4 bg-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Recommended</div>
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
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-400" /> 240 total minutes · 30m baseline</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-400" /> Roll over up to 30 mins</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-400" /> Valid for 7 days</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-400" /> Enhanced AI review</li>
              </ul>
              <Button onClick={onStart} className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 border-none font-bold text-sm">Join Elo Plus</Button>
            </Card>

            {/* Elo Intensive */}
            <Card className="p-8 border-2 border-zinc-100 rounded-[2.5rem] space-y-6 hover:border-indigo-100 transition-all flex flex-col shadow-sm">
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
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> 360 total minutes · 30m baseline</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> Roll over up to 30 mins</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> Valid for 7 days</li>
                <li className="flex items-center gap-3 text-xs font-medium"><Icons.Check className="w-4 h-4 text-indigo-600" /> Priority coach matching included</li>
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
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-indigo-600 rounded-[4rem] p-12 md:p-24 text-center space-y-10 shadow-2xl shadow-indigo-200 relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                Start speaking today.
              </h2>
              <p className="text-xl md:text-2xl text-indigo-100 leading-relaxed">
                Choose your plan and enter your first live session. Build confidence through real conversation.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <Button onClick={onStart} variant="secondary" className="w-full sm:w-auto px-12 py-8 text-xl rounded-[2rem] bg-white text-indigo-600 hover:bg-zinc-50 hover:scale-[1.02] transition-all shadow-xl font-black">
                Choose a Plan
                <Icons.ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>
            
            <div className="pt-8 flex flex-wrap justify-center gap-8 text-indigo-200/60 text-sm font-bold uppercase tracking-widest relative z-10">
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
