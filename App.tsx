
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AppView, AuthRole, AuthMode } from './types';
import Layout from './components/Layout';
import StudentHome from './pages/StudentHome';
import Matching from './pages/Matching';
import Session from './pages/Session';
import Review from './pages/Review';
import CoachDashboard from './pages/CoachDashboard';
import CoachOnboarding from './pages/CoachOnboarding';
import Landing from './pages/Landing';
import CoachLanding from './pages/CoachLanding';
import CoachApply from './pages/CoachApply';
import CoachStatus, { ApplicationStatus } from './pages/CoachStatus';
import CoachApprovedOnboarding from './pages/CoachApprovedOnboarding';
import Billing from './pages/Billing';
import Auth from './pages/Auth';
import History from './pages/History';
import HistoryDetail from './pages/HistoryDetail';
import FindCoach from './pages/FindCoach';
import CoachHub from './pages/CoachHub';
import Classroom from './pages/Classroom';
import VoiceCall from './pages/VoiceCall';
import Admin from './pages/Admin';
import LessonReview from './pages/LessonReview';
import PreCheck from './pages/PreCheck';
import CoachEarnings from './pages/CoachEarnings';
import SessionProcessing from './pages/SessionProcessing';
import { Button } from './components/UI';
import { Icons } from './constants';
import { VerificationModal, VerificationWaitingPage } from './components/VerificationUI';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('LANDING');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedContextId, setSelectedContextId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [authConfig, setAuthConfig] = useState<{role: AuthRole, mode: AuthMode}>({ role: 'STUDENT', mode: 'LOGIN' });
  const [coachApplicationStatus, setCoachApplicationStatus] = useState<ApplicationStatus>('PENDING');

  const handleAuthRedirect = (role: AuthRole, mode: AuthMode) => {
    setAuthConfig({ role, mode });
    setView('AUTH');
  };

  const handleAuthSuccess = (role: AuthRole) => {
    setIsLoggedIn(true);
    if (role === 'COACH') {
      setView('COACH_LANDING');
    } else {
      setView('STUDENT_HOME');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsEmailVerified(false);
    setView('LANDING');
  };

  const checkVerification = (action: () => void) => {
    if (!isEmailVerified && isLoggedIn) {
      setShowVerificationModal(true);
    } else {
      action();
    }
  };

  const renderView = () => {
    switch (view) {
      case 'LANDING':
        return (
          <Landing 
            onStart={() => handleAuthRedirect('STUDENT', 'SIGNUP')}
            onLogin={() => handleAuthRedirect('STUDENT', 'LOGIN')}
            onBecomeCoach={() => setView('COACH_LANDING')}
          />
        );
      case 'STUDENT_HOME':
        return (
          <StudentHome 
            selectedContextId={selectedContextId}
            setSelectedContextId={setSelectedContextId}
            onStartSession={() => checkVerification(() => {
              if (!isLoggedIn) handleAuthRedirect('STUDENT', 'SIGNUP');
              else setView('FIND_COACH');
            })} 
            onGoToPayment={() => checkVerification(() => setView('BILLING'))}
            onGoToHistory={() => setView('HISTORY')}
            onGoToBookings={() => setView('BOOKING')}
            onJoinLesson={() => setView('PRE_CHECK')}
          />
        );
      case 'BOOKING':
        return (
          <div className="max-w-4xl mx-auto py-12 space-y-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setView('STUDENT_HOME')} className="p-2">
                <Icons.ArrowRight className="w-5 h-5 rotate-180" />
              </Button>
              <h1 className="text-3xl font-bold text-zinc-900">My Bookings</h1>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {/* Reuse UserBookingCard here or create a more detailed list */}
              <p className="text-zinc-500 italic">Complete booking list view coming soon...</p>
            </div>
          </div>
        );
      case 'HISTORY':
        return (
          <History 
            onBack={() => setView('STUDENT_HOME')} 
            onSelectSession={(id) => {
              setSelectedSessionId(id);
              setView('HISTORY_DETAIL');
            }} 
          />
        );
      case 'HISTORY_DETAIL':
        return (
          <HistoryDetail 
            sessionId={selectedSessionId}
            onBack={() => setView('HISTORY')} 
          />
        );
      case 'BILLING':
        return <Billing onBack={() => setView('STUDENT_HOME')} checkVerification={checkVerification} />;
      case 'MATCHING':
        return <Matching onMatchFound={() => setView('SESSION')} />;
      case 'SESSION':
        return (
          <Session 
            selectedContextId={selectedContextId}
            onEndSession={() => setView('SESSION_PROCESSING')} 
          />
        );
      case 'SESSION_PROCESSING':
        return (
          <SessionProcessing 
            onComplete={() => setView('LESSON_REVIEW')} 
            onBack={() => setView('STUDENT_HOME')} 
          />
        );
      case 'REVIEW':
        return <Review onReturnHome={() => setView('STUDENT_HOME')} />;
      case 'LESSON_REVIEW':
        return <LessonReview onBack={() => setView('STUDENT_HOME')} />;
      case 'COACH_DASHBOARD':
        return <CoachDashboard />;
      case 'COACH_LANDING':
        return (
          <CoachLanding 
            onStart={() => checkVerification(() => setView('COACH_APPLY'))} 
            onLogin={() => handleAuthRedirect('COACH', 'LOGIN')}
            onBackToLearner={() => setView('LANDING')}
          />
        );
      case 'COACH_APPLY':
        return <CoachApply onSubmit={() => setView('COACH_STATUS')} onBack={() => setView('COACH_LANDING')} />;
      case 'COACH_STATUS':
        return (
          <div className="space-y-8">
            {/* Demo Status Toggles */}
            <div className="max-w-3xl mx-auto flex gap-2 p-2 bg-zinc-100 rounded-2xl">
              {(['PENDING', 'APPROVED', 'REJECTED'] as ApplicationStatus[]).map(s => (
                <button 
                  key={s}
                  onClick={() => setCoachApplicationStatus(s)}
                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${coachApplicationStatus === s ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <CoachStatus 
              status={coachApplicationStatus} 
              onAction={() => checkVerification(() => {
                if (coachApplicationStatus === 'APPROVED') setView('COACH_ONBOARDING_SUCCESS');
              })}
              onResubmit={() => setView('COACH_APPLY')}
            />
          </div>
        );
      case 'COACH_ONBOARDING_SUCCESS':
        return <CoachApprovedOnboarding onComplete={() => setView('COACH_HUB')} />;
      case 'COACH_ONBOARDING':
        return <CoachOnboarding onComplete={() => setView('COACH_DASHBOARD')} checkVerification={checkVerification} />;
      case 'AUTH':
        return (
          <Auth 
            initialRole={authConfig.role} 
            initialMode={authConfig.mode} 
            onSuccess={handleAuthSuccess} 
          />
        );
      case 'FIND_COACH':
        return (
          <FindCoach 
            selectedContextId={selectedContextId}
            onStartLesson={(type) => setView(type === 'VOICE' ? 'VOICE_CALL' : 'CLASSROOM')} 
            onBack={() => setView('STUDENT_HOME')}
          />
        );
      case 'COACH_HUB':
        return <CoachHub onViewEarnings={() => setView('COACH_EARNINGS')} />;
      case 'CLASSROOM':
        return (
          <Classroom 
            selectedContextId={selectedContextId}
            onEnd={() => setView('SESSION_PROCESSING')} 
          />
        );
      case 'VOICE_CALL':
        return (
          <VoiceCall 
            selectedContextId={selectedContextId}
            coachName="Coach Wei" 
            coachAvatar="https://picsum.photos/seed/wei/200/200" 
            onEnd={() => setView('SESSION_PROCESSING')} 
          />
        );
      case 'ADMIN':
        return <Admin />;
      case 'PRE_CHECK':
        return (
          <PreCheck 
            onEnter={() => setView('CLASSROOM')} 
            onBack={() => setView('STUDENT_HOME')} 
          />
        );
      case 'COACH_EARNINGS':
        return <CoachEarnings onBack={() => setView('COACH_HUB')} />;
      case 'EMAIL_VERIFICATION':
        return (
          <VerificationWaitingPage 
            email="975022570yp@gmail.com"
            onResend={() => console.log('Resending...')}
            onChangeEmail={() => console.log('Changing email...')}
            onBackToLogin={() => setView('AUTH')}
          />
        );
      default:
        return <StudentHome onStartSession={() => setView('MATCHING')} onGoToPayment={() => setView('BILLING')} />;
    }
  };

  return (
    <Layout 
      currentView={view} 
      setView={setView} 
      onAuth={handleAuthRedirect}
      onLogout={handleLogout}
      isLoggedIn={isLoggedIn}
      isEmailVerified={isEmailVerified}
      onVerify={() => setView('EMAIL_VERIFICATION')}
      onResend={() => console.log('Resending...')}
    >
      <div className="py-4">
        {renderView()}
      </div>

      <VerificationModal 
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        onVerify={() => {
          setShowVerificationModal(false);
          setView('EMAIL_VERIFICATION');
        }}
        onResend={() => console.log('Resending...')}
      />

      {/* Demo: Verify Email Button (Floating) */}
      {isLoggedIn && (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-2">
          {!isEmailVerified ? (
            <button 
              onClick={() => {
                setIsEmailVerified(true);
                confetti({
                  particleCount: 150,
                  spread: 70,
                  origin: { y: 0.6 },
                  colors: ['#4f46e5', '#10b981']
                });
              }}
              className="bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg hover:bg-emerald-600 transition-all"
            >
              Demo: Verify Email
            </button>
          ) : (
            <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
              <Icons.Check className="w-3 h-3" />
              Verified
              <button 
                onClick={() => setIsEmailVerified(false)}
                className="ml-2 opacity-60 hover:opacity-100"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      )}

      {/* Design Rationale (Developer/Designer Sidebar) */}
      <div className="fixed bottom-6 right-6 group z-50">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] p-6 rounded-2xl w-64 shadow-2xl mb-4 pointer-events-none border border-zinc-800">
          <h4 className="font-bold uppercase tracking-widest text-indigo-400 mb-2">Design Rationale</h4>
          <ul className="space-y-2 list-disc pl-3 leading-relaxed">
            <li><span className="font-bold text-white">Soft HUD:</span> Using zinc-900 for session interface to reduce peripheral distractions.</li>
            <li><span className="font-bold text-white">FOMO/Urgency:</span> Coach invitations use real-time countdowns to optimize matching speed.</li>
            <li><span className="font-bold text-white">Trust Layers:</span> Skeleton screens and detailed AI feedback justify the "value" of each session.</li>
          </ul>
        </div>
        <div className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center cursor-help shadow-lg">
          ?
        </div>
      </div>
    </Layout>
  );
};

export default App;
