
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AppView, AuthRole, AuthMode, Coach } from './types';
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
import LiveLesson from './components/LiveLesson';
import Admin from './pages/Admin';
import LessonReview from './pages/LessonReview';
import PreCheck from './pages/PreCheck';
import About from './pages/About';
import CoachEarnings from './pages/CoachEarnings';
import SessionProcessing from './pages/SessionProcessing';
import TrialSuccess from './pages/TrialSuccess';
import PostTrialUpgrade from './pages/PostTrialUpgrade';
import { Button } from './components/UI';
import { SCENARIOS } from './constants';
import { Icons } from './constants';
import { VerificationModal, VerificationWaitingPage } from './components/VerificationUI';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('LANDING');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedContextId, setSelectedContextId] = useState<string | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
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
            onTrialPurchase={() => {
              setIsLoggedIn(true); // Simulate login for trial
              setView('TRIAL_SUCCESS');
            }}
            onAbout={() => setView('ABOUT')}
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
            onJoinLesson={() => setView('PRE_CHECK')}
          />
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
        return (
          <Matching 
            onMatchFound={() => setView('LIVE_LESSON')} 
            coachName={selectedCoach?.name}
            topicName={SCENARIOS.find(s => s.id === selectedContextId)?.chineseTitle || 'Open Conversation'}
          />
        );
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
        return <LessonReview onBack={() => setView('POST_TRIAL_UPGRADE')} />;
      case 'ABOUT':
        return (
          <About 
            onStart={() => handleAuthRedirect('STUDENT', 'SIGNUP')} 
            onBack={() => setView('LANDING')} 
          />
        );
      case 'TRIAL_SUCCESS':
        return (
          <TrialSuccess 
            onStartNow={() => setView('FIND_COACH')}
            onScheduleLater={() => setView('STUDENT_HOME')}
            onViewDashboard={() => setView('STUDENT_HOME')}
          />
        );
      case 'POST_TRIAL_UPGRADE':
        return (
          <PostTrialUpgrade 
            onUpgrade={(planId) => {
              console.log('Upgrading to:', planId);
              setView('BILLING');
            }}
            onMaybeLater={() => setView('STUDENT_HOME')}
          />
        );
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
            onStartLesson={(type, coach) => {
              setSelectedCoach(coach);
              setView('MATCHING');
            }} 
            onBack={() => setView('STUDENT_HOME')}
          />
        );
      case 'COACH_HUB':
        return <CoachHub onViewEarnings={() => setView('COACH_EARNINGS')} />;
      case 'LIVE_LESSON':
        return (
          <LiveLesson 
            coachName={selectedCoach?.name || "Coach Wei"}
            topic={SCENARIOS.find(s => s.id === selectedContextId)?.title || "Open Conversation"}
            onLeave={() => setView('SESSION_PROCESSING')}
          />
        );
      case 'ADMIN':
        return <Admin />;
      case 'PRE_CHECK':
        return (
          <PreCheck 
            onEnter={() => setView('LIVE_LESSON')} 
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

    </Layout>
  );
};

export default App;
