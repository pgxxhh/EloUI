
import React from 'react';
import { Button, Card, Badge } from '../components/UI';
import { Icons } from '../constants';
import { motion } from 'motion/react';

interface CoachLandingProps {
  onStart: () => void;
  onLogin: () => void;
  onBackToLearner: () => void;
}

const CoachLanding: React.FC<CoachLandingProps> = ({ onStart, onLogin, onBackToLearner }) => {
  return (
    <div className="bg-white text-zinc-900 font-sans selection:bg-indigo-100">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBackToLearner}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
              <span className="text-xl font-bold tracking-tight">Elo</span>
            </div>
            <div className="hidden lg:flex items-center gap-8">
              <a href="#why-coach" className="text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors">Why coach</a>
              <a href="#earnings" className="text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors">Earnings</a>
              <a href="#how-it-works" className="text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors">How it works</a>
              <a href="#faq" className="text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors">FAQ</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onBackToLearner} className="hidden sm:block text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors mr-4">For Learners</button>
            <button onClick={onLogin} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Log in</button>
            <Button onClick={onStart} className="px-5 py-2.5 text-sm font-bold">
              Become a coach
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge color="indigo" className="mb-6">Recruiting Now</Badge>
                <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-zinc-900">
                  Host real conversations. <br />
                  <span className="text-indigo-600">Earn on your terms.</span>
                </h1>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-xl"
              >
                Help learners build spoken Chinese confidence through live, voice-first conversation sessions. No lesson planning, no rigid curriculum—just meaningful human connection.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8 pt-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    { icon: <Icons.Clock className="w-5 h-5" />, text: 'Flexible schedule (set your own hours)' },
                    { icon: <Icons.Check className="w-5 h-5" />, text: 'Weekly payouts (transparent earnings)' },
                    { icon: <Icons.Mic className="w-5 h-5" />, text: 'Voice-first format (no video required)' },
                    { icon: <Icons.Sparkles className="w-5 h-5" />, text: 'Platform-provided topics (zero prep time)' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-zinc-600">
                      <div className="text-indigo-500">{item.icon}</div>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button onClick={onStart} className="w-full sm:w-auto px-10 py-6 text-lg rounded-2xl shadow-lg shadow-indigo-100">
                    Start your application
                    <Icons.ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <a href="#earnings" className="w-full sm:w-auto">
                    <Button variant="ghost" className="w-full px-10 py-6 text-lg rounded-2xl border border-zinc-100 hover:bg-zinc-50">
                      View earnings details
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="relative hidden lg:block">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-indigo-50 rounded-[3rem] -z-10 rotate-2" />
                <Card className="p-10 overflow-hidden rounded-[3rem] border-zinc-100 shadow-2xl bg-white space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Next Payout</p>
                      <p className="text-4xl font-bold text-zinc-900">$342.50</p>
                    </div>
                    <Badge color="green" className="bg-emerald-50 text-emerald-700 border-emerald-100">Scheduled: Friday</Badge>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Recent Activity</p>
                    <div className="space-y-3">
                      {[
                        { type: 'Session', label: '15m Conversation', amount: '+$12.00', time: '2h ago' },
                        { type: 'Session', label: '30m Conversation', amount: '+$24.00', time: '5h ago' },
                        { type: 'Bonus', label: 'High Rating Bonus', amount: '+$5.00', time: 'Yesterday' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.type === 'Bonus' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
                              {item.type === 'Bonus' ? <Icons.Sparkles className="w-4 h-4" /> : <Icons.Mic className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="text-sm font-bold">{item.label}</p>
                              <p className="text-[10px] text-zinc-400 font-medium">{item.time}</p>
                            </div>
                          </div>
                          <p className="text-sm font-bold text-zinc-900">{item.amount}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">S</div>
                      <p className="text-xs text-zinc-500 italic">"Li Wei is so patient! I finally felt comfortable speaking without checking my notes."</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Coach With Elo - Differentiation */}
      <section id="why-coach" className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge color="indigo" className="mb-2">The Elo Difference</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Conversation, not tutoring.</h2>
            <p className="text-lg text-zinc-500">We've removed the administrative burden of traditional teaching so you can focus on what matters: helping people speak.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Zero Prep Time', desc: 'No lesson plans to write. We provide the scenarios, keywords, and session goals for every learner.', icon: <Icons.Sparkles /> },
              { title: 'Human-First', desc: 'Focus on building learner confidence and natural flow, not correcting every minor grammar mistake.', icon: <Icons.Mic /> },
              { title: 'Voice-Only', desc: 'Host sessions from anywhere without worrying about your background or camera setup.', icon: <Icons.Mic /> },
              { title: 'Platform Support', desc: 'Our real-time tools help you guide the conversation and provide feedback effortlessly.', icon: <Icons.Check /> }
            ].map((item, i) => (
              <Card key={i} className="p-8 border-none shadow-sm hover:shadow-md transition-all bg-white">
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

      {/* Earnings & Flexibility */}
      <section id="earnings" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <Badge color="indigo" className="bg-indigo-50 text-indigo-600">Earnings & Support</Badge>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">A platform built for <br /> your lifestyle.</h2>
              <p className="text-xl text-zinc-500 leading-relaxed">
                Whether you want to coach for 5 hours a week or 40, Elo provides the stability and transparency you need to thrive.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Weekly Payouts', desc: 'Earnings are settled every Friday. No waiting weeks for your hard-earned money.', icon: <Icons.Calendar /> },
                  { title: 'Transparent Rates', desc: 'Know exactly what you earn per minute. No hidden fees or marketplace commissions.', icon: <Icons.Check /> },
                  { title: 'Total Flexibility', desc: 'Set your recurring availability or hop online whenever you have a spare 15 minutes.', icon: <Icons.Clock /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex-shrink-0 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900">{item.title}</h4>
                      <p className="text-sm text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-zinc-50 rounded-[3rem] -z-10 -rotate-2" />
              <Card className="bg-white p-10 rounded-[3rem] shadow-xl border border-zinc-100 space-y-8">
                <div className="text-center space-y-2">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Estimated Weekly Earnings</p>
                  <p className="text-6xl font-bold text-zinc-900">$480.00</p>
                  <p className="text-sm text-zinc-500">Based on ~20 hours of coaching</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex justify-between items-center">
                    <span className="text-sm font-medium text-zinc-600">Base Rate</span>
                    <span className="font-bold text-zinc-900">$24.00 / hr</span>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex justify-between items-center">
                    <span className="text-sm font-medium text-zinc-600">Impact Bonus</span>
                    <span className="font-bold text-emerald-600">+$2.00 / hr</span>
                  </div>
                </div>

                <p className="text-[10px] text-center text-zinc-400 font-medium leading-relaxed">
                  *Earnings examples are for illustrative purposes. Actual earnings depend on your availability, session volume, and performance bonuses.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline */}
      <section id="how-it-works" className="py-24 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">From applicant to <br /> coach in days.</h2>
            <p className="text-xl text-zinc-400">Our onboarding process is designed to be fast, clear, and supportive.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-white/10 -z-0" />
            {[
              { step: '01', title: 'Apply (10 mins)', desc: 'Share your background and a short voice intro. We review applications within 48 hours.' },
              { step: '02', title: 'Intro Call', desc: 'A 15-minute chat to meet the team and discuss the Elo coaching philosophy.' },
              { step: '03', title: 'Onboarding', desc: 'Complete a quick platform walkthrough and set your initial availability.' },
              { step: '04', title: 'Start Hosting', desc: 'Get matched with your first learners and start making an impact immediately.' }
            ].map((item, i) => (
              <div key={i} className="relative z-10 space-y-6">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold shadow-lg shadow-indigo-900/20">
                  {item.step}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button onClick={onStart} className="px-10 py-6 text-lg rounded-2xl bg-white text-zinc-900 hover:bg-zinc-100">
              Start your application
            </Button>
          </div>
        </div>
      </section>

      {/* Who thrives as an Elo coach? */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Who thrives as an Elo coach?</h2>
            <p className="text-lg text-zinc-500">You don't need to be a certified teacher to be a world-class conversation partner.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Patient Listeners', desc: 'You enjoy hearing others speak and give them the space to find their own words.', icon: <Icons.Mic /> },
              { title: 'Encouraging Partners', desc: 'You naturally celebrate small wins and help learners feel safe making mistakes.', icon: <Icons.Sparkles /> },
              { title: 'Native-Level Speakers', desc: 'You have standard pronunciation and a deep, intuitive grasp of modern Chinese.', icon: <Icons.Check /> },
              { title: 'Reliable Professionals', desc: 'You value consistency and show up ready to support the learners who count on you.', icon: <Icons.Clock /> }
            ].map((item, i) => (
              <Card key={i} className="p-8 border-zinc-100 hover:border-indigo-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-zinc-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900">Common questions.</h2>
            <p className="text-lg text-zinc-500">Everything you need to know about joining the Elo community.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: 'Who can apply to be a coach?', a: 'We look for native-level Chinese speakers with standard pronunciation and a passion for helping others. You should be patient, encouraging, and reliable.' },
              { q: 'Do I need formal teaching experience?', a: 'No. While experience is helpful, Elo is about real-life conversation, not formal grammar drills. We provide the structure; you provide the human connection.' },
              { q: 'What kind of sessions will I host?', a: 'Sessions are live, voice-first conversations (no video required) based on practical, real-life scenarios provided by the platform.' },
              { q: 'How flexible is the schedule?', a: 'Completely. You can set recurring hours or simply hop online whenever you have free time to match with waiting learners.' },
              { q: 'How do payouts work?', a: 'Earnings are settled weekly and paid out every Friday via your preferred method (Direct Deposit, PayPal, etc.).' },
              { q: 'What support does Elo provide?', a: 'We provide the learners, the session topics, real-time guidance tools, and 24/7 support for any technical or platform issues.' },
              { q: 'How quickly can I start coaching?', a: 'Most qualified applicants move from application to their first session in less than 7 days.' }
            ].map((faq, i) => (
              <Card key={i} className="p-8 border-zinc-100 shadow-sm bg-white">
                <h4 className="text-lg font-bold text-zinc-900 mb-3">{faq.q}</h4>
                <p className="text-zinc-500 leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900">Ready to share your language?</h2>
              <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto">
                Join our community of coaches and start making a meaningful impact through real conversation.
              </p>
            </div>
            <div className="space-y-6">
              <Button onClick={onStart} className="px-16 py-8 text-2xl rounded-3xl shadow-2xl shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Start your application
              </Button>
              <p className="text-sm font-semibold text-zinc-400">Weekly payouts · No lesson prep · Total flexibility</p>
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
                <li><button onClick={onBackToLearner} className="hover:text-indigo-600 transition-colors">Start practicing</button></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help center</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Coaches</h5>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-indigo-600 transition-colors">Become a Coach</button></li>
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

export default CoachLanding;

