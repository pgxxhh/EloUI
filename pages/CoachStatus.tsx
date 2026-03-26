
import React from 'react';
import { Button, Card, Badge } from '../components/UI';
import { Icons } from '../constants';
import { motion } from 'motion/react';

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

interface CoachStatusProps {
  status: ApplicationStatus;
  onAction: () => void;
  onResubmit?: () => void;
}

const CoachStatus: React.FC<CoachStatusProps> = ({ status, onAction, onResubmit }) => {
  const renderStatusContent = () => {
    switch (status) {
      case 'PENDING':
        return (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-indigo-600 animate-pulse">
                  <Icons.Sparkles className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Badge color="indigo" className="animate-bounce">Reviewing</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Application Under Review</h1>
                <p className="text-zinc-500 text-lg max-w-md mx-auto">Our team is carefully reviewing your profile. We'll get back to you soon!</p>
              </div>
            </div>

            <Card className="p-10 space-y-8 border-zinc-100 shadow-sm">
              <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400">
                    <Icons.Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900">Audio Introduction</p>
                    <p className="text-xs text-zinc-400">Submitted on March 11, 2026</p>
                  </div>
                </div>
                <Badge color="zinc">Pending</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Estimated Feedback</h4>
                  <div className="flex items-center gap-3 text-zinc-900 font-bold">
                    <Icons.Check className="w-5 h-5 text-emerald-500" />
                    Within 48 hours
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Next Steps</h4>
                  <p className="text-sm text-zinc-500 italic">Keep an eye on your email for the final decision.</p>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <Button variant="ghost" onClick={onAction} className="text-zinc-400 hover:text-zinc-600">
                View Submitted Details
              </Button>
            </div>
          </div>
        );

      case 'APPROVED':
        return (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-600 mx-auto shadow-xl shadow-emerald-100 rotate-3">
                <Icons.Check className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Welcome to the Team!</h1>
                <p className="text-zinc-500 text-lg max-w-md mx-auto">Your application has been approved. We're excited to have you as an Elo Coach.</p>
              </div>
            </div>

            <Card className="p-10 bg-zinc-900 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full -mr-32 -mt-32"></div>
              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <Badge color="emerald" className="bg-emerald-500/20 text-emerald-400 border-none">Next Step</Badge>
                  <h3 className="text-2xl font-bold">Complete your onboarding</h3>
                  <p className="text-zinc-400">Set up your profile and availability to start receiving session requests.</p>
                </div>
                <Button onClick={onAction} className="w-full py-6 text-lg rounded-2xl bg-emerald-500 hover:bg-emerald-600 border-none shadow-xl shadow-emerald-900/20">
                  Go to Onboarding
                  <Icons.ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </Card>

            <div className="bg-indigo-50 rounded-[2rem] p-8 border border-indigo-100 flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                <Icons.Video className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-zinc-900">Pro Tip: Add a Video Intro</h4>
                <p className="text-sm text-zinc-500">Since you applied with audio, adding a video intro now can increase your bookings by up to 300%.</p>
              </div>
              <Button variant="secondary" className="bg-white border-none shadow-sm">Add Video</Button>
            </div>
          </div>
        );

      case 'REJECTED':
        return (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-zinc-100 rounded-[2.5rem] flex items-center justify-center text-zinc-400 mx-auto">
                <Icons.Mic className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Application Update</h1>
                <p className="text-zinc-500 text-lg max-w-md mx-auto">Thank you for your interest in Elo. Unfortunately, we cannot move forward with your application at this time.</p>
              </div>
            </div>

            <Card className="p-10 space-y-8 border-zinc-100 shadow-sm">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-zinc-900">Review Feedback</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Communication Quality', status: 'Needs Improvement', icon: <Icons.Mic className="w-4 h-4" /> },
                    { label: 'Teaching Background', status: 'Not Specific Enough', icon: <Icons.Sparkles className="w-4 h-4" /> }
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-zinc-400 shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.label}</p>
                        <p className="text-sm font-bold text-zinc-700">{item.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 space-y-3">
                  <h4 className="text-sm font-bold text-amber-900">Suggestions for Resubmission</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-amber-800/70 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5" />
                      Please provide more specific examples of your teaching experience.
                    </li>
                    <li className="text-sm text-amber-800/70 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5" />
                      Ensure your intro recording is in a quiet environment with clear audio.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row gap-4">
                <Button onClick={onResubmit} className="flex-1 py-4 rounded-2xl shadow-xl shadow-indigo-100">
                  Update & Resubmit
                  <Icons.ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="ghost" onClick={onAction} className="flex-1 py-4 rounded-2xl">
                  Contact Support
                </Button>
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-12 px-6"
    >
      {renderStatusContent()}
    </motion.div>
  );
};

export default CoachStatus;
