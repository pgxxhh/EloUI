
import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Users, 
  Zap, 
  ShieldCheck, 
  Clock,
  Play,
  Heart,
  Target,
  ChevronRight,
  Quote,
  FileText
} from 'lucide-react';
import { Button, Card, Badge } from '../components/UI';

const About: React.FC<{ onStart?: () => void; onBack?: () => void }> = ({ onStart, onBack }) => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-indigo-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-b from-indigo-50/60 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Badge color="indigo" className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] border-indigo-100 bg-white text-indigo-600 shadow-sm">
              The Real Question
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black text-zinc-900 tracking-tight leading-[1.02]">
              You’ve studied Chinese for years. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                But can you actually use it?
              </span>
            </h1>
            <p className="text-zinc-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
              Most adult learners don't lack vocabulary. They lack the ability to turn "knowing" into "speaking" in real-life situations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button onClick={onStart} className="w-full sm:w-auto px-10 py-7 text-lg rounded-2xl bg-indigo-600 text-white font-black shadow-xl hover:scale-105 transition-all">
                Start your first real conversation
              </Button>
              <p className="text-xs font-bold text-zinc-400 max-w-[240px] text-left sm:text-center">
                See where you get stuck, and learn how to say it naturally.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative max-w-5xl mx-auto pt-12"
          >
            <div className="aspect-video rounded-[3.5rem] overflow-hidden shadow-2xl shadow-indigo-200/50 border-8 border-white relative group">
              <img 
                src="https://picsum.photos/seed/real-chinese-classroom/1200/675" 
                alt="Real Conversation Session" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all flex items-center justify-center">
                <div className="w-24 h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-10 h-10 text-indigo-600 fill-current ml-1" />
                </div>
              </div>
              <div className="absolute bottom-10 left-10">
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white/20 flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
                    <Icons.Mic className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">LIVE SESSION</p>
                    <p className="text-sm font-black text-zinc-900">Real-time practice with Coach Wei</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Elo's Answer: The Loop */}
      <section className="py-32 bg-zinc-50/50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">From real conversation to natural expression.</h2>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed">
              Elo isn't just another app for rote memorization. We turn every conversation into a complete learning loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-zinc-200 -translate-y-1/2 -z-10"></div>
            
            {[
              {
                step: '01',
                title: 'Real Talk',
                desc: 'A low-pressure, 15-minute conversation with a native coach in a real-life scenario.',
                icon: MessageSquare,
                color: 'indigo'
              },
              {
                step: '02',
                title: 'Smart Feedback',
                desc: 'Instantly identify where your expressions feel unnatural and where you were almost there.',
                icon: Zap,
                color: 'violet'
              },
              {
                step: '03',
                title: 'Speaking Debrief',
                desc: 'Take away native-level upgrades for your specific sentences, ready to use next time.',
                icon: FileText,
                color: 'emerald'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-xl shadow-zinc-200/30 space-y-6 relative group hover:-translate-y-2 transition-all duration-500">
                <div className={`w-16 h-16 rounded-2xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-indigo-500 tracking-widest">{item.step}</span>
                    <h3 className="text-xl font-black text-zinc-900">{item.title}</h3>
                  </div>
                  <p className="text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-8">
            <p className="text-sm font-bold text-zinc-400 italic">
              "It's not just about talking; it's about leaving every session with something you can actually use."
            </p>
          </div>
        </div>
      </section>

      {/* Why Real Conversation Works */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
                  The problem isn't how much you've studied. <br />
                  <span className="text-indigo-600">It's the gap between knowing and doing.</span>
                </h2>
                <div className="space-y-6 text-lg text-zinc-500 leading-relaxed font-medium">
                  <p>
                    Most adults have a massive "Input-Output Gap." You've memorized words and read textbooks, but in a real conversation, your brain pauses, takes detours, or simply disconnects.
                  </p>
                  <p>
                    Real fluency requires more than knowledge—it requires **instant reaction** in a specific context. At Elo, we don't treat Chinese as a test subject. We treat it as a tool for connection.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">Our Focus</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Beyond the Textbook', desc: 'Move past "Nǐ hǎo ma" to how colleagues actually talk.' },
                    { title: 'Contextual Reaction', desc: 'Build the muscle memory to respond without translating.' }
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <h5 className="font-bold text-zinc-900">{item.title}</h5>
                      <p className="text-xs text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative">
                <img src="https://picsum.photos/seed/chinese-interaction/800/800" alt="Natural Interaction" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent"></div>
                <div className="absolute top-12 right-12 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 max-w-[240px] rotate-3">
                  <Quote className="w-6 h-6 text-indigo-200 mb-3" />
                  <p className="text-sm font-bold text-zinc-700 leading-relaxed">
                    "I finally stopped translating in my head and started just... responding."
                  </p>
                  <p className="text-[10px] font-black text-zinc-400 mt-3 uppercase tracking-widest">— James, HSK 4 Learner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Protagonist: Speaking Debrief */}
      <section className="py-32 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] -mr-64 -mt-64"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <Card className="p-10 bg-zinc-800 border-zinc-700 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] rotate-1 scale-105 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <Sparkles className="w-8 h-8 text-indigo-400/30" />
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-indigo-500/20 text-indigo-400 border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">Native Upgrade Report</Badge>
                    <span className="text-[10px] font-mono text-zinc-500 font-bold">SESSION #128</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-zinc-900/50 rounded-3xl border border-zinc-700/50 space-y-3">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">What you said</p>
                      <p className="text-xl font-bold text-zinc-400 line-through decoration-zinc-600">“Wǒ zài yí gè dà gōngsī gōngzuò”</p>
                    </div>
                    
                    <div className="p-7 bg-indigo-500/10 rounded-3xl border border-indigo-500/30 space-y-3 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4">
                        <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                      </div>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Native Upgrade</p>
                      <p className="text-2xl font-black text-white">“Wǒ zài yì jiā dàxíng qǐyè rènzhí”</p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-zinc-700/50 space-y-4">
                    <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                      In a professional context, using the measure word <span className="text-white">“yì jiā”</span> and the formal verb <span className="text-white">“rènzhí”</span> makes your expression sound more professional and sophisticated.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-zinc-700 text-zinc-300 border-none text-[9px] font-bold">WORKPLACE</Badge>
                      <Badge className="bg-zinc-700 text-zinc-300 border-none text-[9px] font-bold">FORMAL</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="space-y-10 order-1 lg:order-2">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  See your Chinese in a <br />
                  <span className="text-indigo-400">"Speaking Mirror".</span>
                </h2>
                <p className="text-lg text-zinc-400 leading-relaxed font-medium">
                  After every session, you receive a Speaking Debrief. It doesn't just point out mistakes—it helps you see how to say what you *meant* more naturally and professionally.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { title: 'Natural Polish', desc: 'Identify "textbook expressions" that native speakers rarely use.' },
                  { title: 'Native Upgrade', desc: 'Upgrade basic vocabulary to sophisticated, native-level phrases.' },
                  { title: 'Actionable Advice', desc: 'Specific suggestions you can use in your very next conversation.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-sm font-bold text-zinc-500 italic">
                "It's not a cold correction report—it's a guide to your next breakthrough."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expression Migration Examples */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-zinc-900 tracking-tight">From "Understandable" to "Natural"</h2>
            <p className="text-zinc-500 text-lg font-medium">You don't learn new templates; you learn to say what you already want to say, better.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                original: '我想聊聊我的工作内容。',
                upgrade: '我想分享一下我目前负责的项目。',
                context: 'Professional Introduction'
              },
              {
                original: '这个价格太贵了，能不能便宜点？',
                upgrade: '这个报价超出了我们的预算，还有调整的空间吗？',
                context: 'Business Negotiation'
              }
            ].map((item, i) => (
              <Card key={i} className="p-10 bg-white border-zinc-100 shadow-xl shadow-zinc-200/30 rounded-[3rem] space-y-8 group">
                <div className="flex items-center justify-between">
                  <Badge className="bg-zinc-50 text-zinc-400 border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest">{item.context}</Badge>
                  <ArrowRight className="w-5 h-5 text-zinc-200 group-hover:text-indigo-600 transition-colors" />
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Original Expression</p>
                    <p className="text-lg font-bold text-zinc-400">{item.original}</p>
                  </div>
                  <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-2">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Natural Upgrade</p>
                    <p className="text-xl font-black text-indigo-900">{item.upgrade}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-sm font-bold text-zinc-400">
              Stop sounding like a student. Start sounding like yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Adult Real-Life Tasks */}
      <section className="py-32 bg-zinc-50/50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-zinc-900 tracking-tight">Built for your real-life tasks</h2>
            <p className="text-zinc-500 text-lg font-medium">Elo trains you for the moments that actually happen in your life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'The Interview',
                desc: 'Present your background, achievements, and goals with professional poise.',
                image: 'https://picsum.photos/seed/interview/400/500',
                tag: 'CAREER'
              },
              {
                title: 'The Social',
                desc: 'Move beyond polite nodding. Actually join the conversation and share your views.',
                image: 'https://picsum.photos/seed/social-party/400/500',
                tag: 'SOCIAL'
              },
              {
                title: 'The Negotiation',
                desc: 'Handle prices, schedules, and boundaries with clarity and cultural nuance.',
                image: 'https://picsum.photos/seed/negotiation/400/500',
                tag: 'BUSINESS'
              },
              {
                title: 'The Connection',
                desc: 'Express your true self to family and friends, moving past simple exchanges.',
                image: 'https://picsum.photos/seed/family-dinner/400/500',
                tag: 'LIFE'
              }
            ].map((scene, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 relative shadow-lg">
                  <img src={scene.image} alt={scene.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-white/90 backdrop-blur-md text-zinc-900 border-none font-black px-3 py-1 text-[10px] tracking-widest">{scene.tag}</Badge>
                  </div>
                </div>
                <h3 className="text-xl font-black text-zinc-900 mb-2">{scene.title}</h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed">{scene.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-sm font-bold text-zinc-400">
              When Chinese enters your real life, it finally stays.
            </p>
          </div>
        </div>
      </section>

      {/* Coaches Section: Human Support */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
                  The right partner makes <br />
                  <span className="text-indigo-600">all the difference.</span>
                </h2>
                <p className="text-lg text-zinc-500 leading-relaxed font-medium">
                  Elo coaches are more than native speakers. They are trained to catch you when you stumble and give you the space to find your words. No pressure, no "classroom" vibes—just a partner helping you express yourself.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { title: 'They don\'t rush you', desc: 'Patience is our core requirement. We give you the time to process and speak.' },
                  { title: 'They guide, not lecture', desc: 'Our coaches are conversation partners who lead you toward clarity.' },
                  { title: 'They understand your context', desc: 'Cross-cultural backgrounds mean they know exactly why you\'re stuck.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-zinc-900">{item.title}</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: 'Wei', role: 'Business Specialist', img: 'https://picsum.photos/seed/wei-coach/400/500' },
                { name: 'Lin', role: 'Daily Life Coach', img: 'https://picsum.photos/seed/lin-coach/400/500' },
                { name: 'Chen', role: 'Culture Expert', img: 'https://picsum.photos/seed/chen-coach/400/500' },
                { name: 'Jia', role: 'Language Guide', img: 'https://picsum.photos/seed/jia-coach/400/500' }
              ].map((coach, i) => (
                <div key={i} className={`relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-xl ${i % 2 === 1 ? 'mt-12' : ''}`}>
                  <img src={coach.img} alt={coach.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8">
                    <p className="text-white font-black text-2xl">{coach.name}</p>
                    <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">{coach.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Card className="p-16 md:p-24 bg-indigo-600 text-white rounded-[4rem] shadow-2xl shadow-indigo-200 space-y-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]"></div>
            
            <div className="space-y-6 relative z-10">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Experience Chinese <br />
                actually being used.
              </h2>
              <p className="text-indigo-100 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Start with one real conversation. See where you get stuck, and discover how naturally you can actually speak.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <Button 
                onClick={onStart}
                className="w-full sm:w-auto px-12 py-8 text-xl rounded-2xl bg-white text-indigo-600 font-black shadow-xl hover:scale-105 transition-all"
              >
                Experience the Elo way
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <Button 
                variant="secondary"
                onClick={onBack}
                className="w-full sm:w-auto px-10 py-8 text-xl rounded-2xl bg-indigo-500 text-white border-indigo-400 hover:bg-indigo-400 font-bold"
              >
                Back to Home
              </Button>
            </div>

            <div className="pt-8 flex items-center justify-center gap-10 relative z-10">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-200">
                <ShieldCheck className="w-4 h-4" />
                Cancel Anytime
              </div>
              <div className="w-px h-4 bg-indigo-400/30" />
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-200">
                <Clock className="w-4 h-4" />
                24/7 Availability
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl italic">E</span>
            </div>
            <span className="text-xl font-black tracking-tighter">Elo.</span>
          </div>
          <p className="text-zinc-400 text-sm font-medium">© 2026 Elo Language. Born for real conversation.</p>
          <div className="flex items-center gap-8">
            <button onClick={onBack} className="text-sm font-bold text-zinc-500 hover:text-indigo-600 transition-colors">Home</button>
            <button className="text-sm font-bold text-zinc-500 hover:text-indigo-600 transition-colors">Privacy Policy</button>
            <button className="text-sm font-bold text-zinc-500 hover:text-indigo-600 transition-colors">Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Internal icons helper to match StudentHome style
const Icons = {
  Mic: (props: any) => (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
};

export default About;
