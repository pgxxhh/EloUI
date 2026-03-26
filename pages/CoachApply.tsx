
import React, { useState } from 'react';
import { Button, Card, Badge } from '../components/UI';
import { Icons } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

interface CoachApplyProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const CoachApply: React.FC<CoachApplyProps> = ({ onSubmit, onBack }) => {
  const [step, setStep] = useState(1);
  const [introType, setIntroType] = useState<'video' | 'audio'>('video');
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    degree: '',
    experience: '',
    languages: '',
    strengths: '',
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else onSubmit(formData);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
      {/* Header & Progress */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Coach Application</h1>
            <p className="text-zinc-500 font-medium">
              Step {step} of {totalSteps}: {
                step === 1 ? 'Personal Info' : 
                step === 2 ? 'Background' : 
                step === 3 ? 'Intro Submission' : 
                'Final Review'
              }
            </p>
          </div>
          <Badge color="indigo" className="px-4 py-1">{Math.round(progress)}% Complete</Badge>
        </div>
        <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-indigo-600 rounded-full"
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <Card className="p-10 space-y-8 border-zinc-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-700 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Li Wei" 
                      className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                    <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest ml-1">As shown on your ID</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-700 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="wei@example.com" 
                      className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-700 ml-1">Current Location</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Beijing, China" 
                      className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <Card className="p-10 space-y-8 border-zinc-100 shadow-sm">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-700 ml-1">Highest Degree / University</label>
                    <input 
                      type="text" 
                      placeholder="e.g. MA in Applied Linguistics, Peking University" 
                      className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                      value={formData.degree}
                      onChange={(e) => setFormData({...formData, degree: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-700 ml-1">Teaching Experience</label>
                    <textarea 
                      placeholder="Tell us about your background in teaching or language exchange..." 
                      rows={4}
                      className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    />
                    <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest ml-1">Min. 100 characters</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-700 ml-1">Languages Spoken</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Mandarin (Native), English (Fluent)" 
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                        value={formData.languages}
                        onChange={(e) => setFormData({...formData, languages: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-700 ml-1">Core Strengths</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Business Chinese, HSK Prep" 
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                        value={formData.strengths}
                        onChange={(e) => setFormData({...formData, strengths: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl font-bold text-zinc-900">Introduce Yourself</h2>
                <p className="text-zinc-500">We want to hear your voice and see your personality. This is the most important part of your application.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={() => setIntroType('video')}
                  className={`p-8 rounded-[2.5rem] border-2 transition-all text-left space-y-4 ${introType === 'video' ? 'border-indigo-600 bg-indigo-50/30' : 'border-zinc-100 bg-white hover:border-zinc-200'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${introType === 'video' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                    <Icons.Video className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-zinc-900">Video Introduction</h4>
                      <Badge color="emerald" className="text-[8px] px-2">Recommended</Badge>
                    </div>
                    <p className="text-sm text-zinc-500 mt-1">Faster review and 3x higher student booking rate.</p>
                  </div>
                </button>
                <button 
                  onClick={() => setIntroType('audio')}
                  className={`p-8 rounded-[2.5rem] border-2 transition-all text-left space-y-4 ${introType === 'audio' ? 'border-indigo-600 bg-indigo-50/30' : 'border-zinc-100 bg-white hover:border-zinc-200'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${introType === 'audio' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                    <Icons.Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Audio Introduction</h4>
                    <p className="text-sm text-zinc-500 mt-1">Accepted if you're not comfortable on camera.</p>
                  </div>
                </button>
              </div>

              <Card className="p-10 border-zinc-100 shadow-sm">
                <div className="space-y-8">
                  <div className={`relative w-full h-64 border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center transition-all ${isUploading ? 'border-indigo-500 bg-indigo-50/20' : 'border-zinc-200 hover:border-indigo-300 bg-zinc-50'}`}>
                    {isUploading ? (
                      <div className="space-y-4 text-center">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-indigo-600 font-bold uppercase tracking-widest text-[10px]">Uploading 68%</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-600">
                          {introType === 'video' ? <Icons.Video /> : <Icons.Mic />}
                        </div>
                        <Button onClick={() => setIsUploading(true)} variant="secondary" className="px-8">
                          Select {introType === 'video' ? 'Video' : 'Audio'} File
                        </Button>
                        <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">
                          {introType === 'video' ? 'MP4, MOV up to 500MB' : 'MP3, WAV up to 50MB'}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 space-y-3">
                    <div className="flex items-center gap-2 text-amber-700">
                      <Icons.Sparkles className="w-4 h-4" />
                      <span className="text-sm font-bold uppercase tracking-widest text-[10px]">Quality Tips</span>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Record for 60-90 seconds',
                        'Speak both Mandarin and English',
                        'Ensure good lighting/audio',
                        'Smile and be yourself!'
                      ].map((tip, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-amber-800/70">
                          <div className="w-1 h-1 bg-amber-400 rounded-full" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <Card className="p-10 space-y-10 border-zinc-100 shadow-sm">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">Final Review</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Name</p>
                        <p className="font-bold text-zinc-900">{formData.fullName || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Location</p>
                        <p className="font-bold text-zinc-900">{formData.location || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Intro Type</p>
                        <p className="font-bold text-zinc-900 uppercase">{introType}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Status</p>
                        <Badge color="emerald">Ready to submit</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-zinc-900">Submission Checklist</h4>
                    <div className="space-y-3">
                      {[
                        'Personal information is accurate',
                        'Teaching background is detailed',
                        'Intro material meets quality standards',
                        'I agree to the Elo Coach Terms'
                      ].map((item, i) => (
                        <label key={i} className="flex items-center gap-4 cursor-pointer group">
                          <div className="w-6 h-6 border-2 border-zinc-200 rounded-lg flex items-center justify-center group-hover:border-indigo-400 transition-colors bg-white">
                            <Icons.Check className="w-4 h-4 text-indigo-600" />
                          </div>
                          <span className="text-sm font-medium text-zinc-600">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-zinc-100">
        <Button variant="ghost" onClick={handlePrev} className="px-8">
          <Icons.ArrowRight className="w-5 h-5 rotate-180 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext} className="px-16 py-4 rounded-2xl shadow-xl shadow-indigo-100">
          {step === totalSteps ? 'Submit Application' : 'Continue'}
          {step !== totalSteps && <Icons.ArrowRight className="w-5 h-5 ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default CoachApply;
