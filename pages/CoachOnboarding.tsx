
import React, { useState } from 'react';
import { Button, Card, Badge } from '../components/UI';
import { Icons } from '../constants';

const CoachOnboarding: React.FC<{ onComplete: () => void, checkVerification: (action: () => void) => void }> = ({ onComplete, checkVerification }) => {
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      checkVerification(() => {
        onComplete();
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-12 animate-in fade-in duration-700">
      {/* Progress Header */}
      <div className="space-y-6">
        <div className="flex justify-between items-end px-2">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Coach Application</h1>
            <p className="text-zinc-500 font-medium">Step {step} of 3: {step === 1 ? 'Basic Profile' : step === 2 ? 'Demo Session' : 'Agreement'}</p>
          </div>
          <Badge color="indigo">{Math.round((step / 3) * 100)}% Complete</Badge>
        </div>
        <div className="h-2 bg-zinc-100 rounded-full overflow-hidden flex gap-1">
          <div className={`h-full transition-all duration-500 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-zinc-200'}`} style={{ width: '33.33%' }}></div>
          <div className={`h-full transition-all duration-500 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-zinc-200'}`} style={{ width: '33.33%' }}></div>
          <div className={`h-full transition-all duration-500 rounded-full ${step >= 3 ? 'bg-indigo-600' : 'bg-zinc-200'}`} style={{ width: '33.33%' }}></div>
        </div>
      </div>

      <div className="relative">
        {step === 1 && (
          <div className="animate-in slide-in-from-right-8 duration-500">
            <Card className="p-10 space-y-10">
              <div className="space-y-8">
                <section className="space-y-4">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-2">Identification</h3>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-700 ml-1">Legal Full Name</label>
                        <input type="text" placeholder="As shown on ID" className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-700 ml-1">Current City</label>
                        <input type="text" placeholder="e.g. Shanghai, CN" className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" />
                     </div>
                  </div>
                </section>
                <section className="space-y-4">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-2">Academic Background</h3>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-zinc-700 ml-1">Highest Degree / University</label>
                     <input type="text" placeholder="e.g. MA Applied Linguistics, Fudan University" className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                </section>
              </div>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-8 duration-500">
            <Card className="p-10 space-y-8">
              <div className="text-center max-w-lg mx-auto space-y-4">
                <h3 className="text-2xl font-bold text-zinc-900">Upload Demo Session</h3>
                <p className="text-zinc-500 text-sm">Please record a 3-5 minute video of yourself explaining a simple Chinese concept in both English and Mandarin.</p>
              </div>
              
              <div className={`relative w-full h-64 border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center transition-all ${isUploading ? 'border-indigo-500 bg-indigo-50/20' : 'border-zinc-200 hover:border-indigo-300 bg-zinc-50'}`}>
                {isUploading ? (
                  <div className="space-y-4 text-center">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-indigo-600 font-bold uppercase tracking-widest text-[10px]">Uploading 42%</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-600"><Icons.Mic /></div>
                    <Button onClick={() => setIsUploading(true)} variant="secondary" className="px-8">Select Video File</Button>
                    <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">MP4, MOV up to 500MB</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-right-8 duration-500">
            <Card className="p-10 space-y-10">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">Final Agreement</h3>
                <div className="max-h-60 overflow-y-auto p-6 bg-zinc-50 rounded-2xl border border-zinc-100 text-sm text-zinc-600 leading-relaxed space-y-4">
                  <p className="font-bold text-zinc-900">1. Quality Standards</p>
                  <p>Coaches must maintain a minimum 4.5/5.0 rating to remain active on the platform. Encouraging behavior is paramount.</p>
                  <p className="font-bold text-zinc-900">2. Earnings & Payouts</p>
                  <p>Payments are calculated per session minute and disbursed every Friday via global bank transfer or PayPal.</p>
                  <p className="font-bold text-zinc-900">3. Privacy Policy</p>
                  <p>Coach-student sessions are recorded solely for the purpose of AI review generation and quality monitoring.</p>
                </div>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="w-6 h-6 border-2 border-zinc-200 rounded-lg flex items-center justify-center group-hover:border-indigo-400 transition-colors">
                     <Icons.Check />
                  </div>
                  <span className="text-sm font-medium text-zinc-700 italic">I have read and agree to the Elo Coach Terms of Service.</span>
                </label>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={() => step > 1 && setStep(step - 1)} disabled={step === 1} className="px-8">Previous</Button>
        <Button onClick={handleNext} className="px-16 py-4 shadow-2xl">
          {step === 3 ? 'Finish Application' : 'Continue'}
          <Icons.ArrowRight />
        </Button>
      </div>

      {step === 3 && (
        <p className="text-center text-xs text-zinc-400">Applications are reviewed within <span className="font-bold text-zinc-900">48 hours</span>. We will reach out via email.</p>
      )}
    </div>
  );
};

export default CoachOnboarding;
