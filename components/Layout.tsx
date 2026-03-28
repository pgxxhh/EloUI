
import React from 'react';
import { AppView, AuthRole, AuthMode } from '../types';
import { VerificationBanner } from './VerificationUI';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setView: (view: AppView) => void;
  onAuth: (role: AuthRole, mode: AuthMode) => void;
  onLogout: () => void;
  isLoggedIn?: boolean;
  isEmailVerified?: boolean;
  onVerify?: () => void;
  onResend?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  setView, 
  onAuth, 
  onLogout, 
  isLoggedIn = false,
  isEmailVerified = false,
  onVerify = () => {},
  onResend = () => {}
}) => {
  const isFocusMode = currentView === 'EMAIL_VERIFICATION' || currentView === 'LESSON_REVIEW' || currentView === 'HISTORY_DETAIL' || currentView === 'SESSION' || currentView === 'VOICE_CALL' || currentView === 'CLASSROOM' || currentView === 'LANDING' || currentView === 'COACH_LANDING' || currentView === 'COACH_APPLY' || currentView === 'COACH_STATUS' || currentView === 'COACH_ONBOARDING_SUCCESS' || currentView === 'COACH_ONBOARDING' || currentView === 'AUTH';

  return (
    <div className={`min-h-screen flex flex-col ${isFocusMode ? '' : 'max-w-7xl mx-auto px-6'}`}>
      {isLoggedIn && !isEmailVerified && !isFocusMode && (
        <VerificationBanner onVerify={onVerify} onResend={onResend} />
      )}
      {!isFocusMode && (
        <header className="py-8 flex justify-between items-center">
          <div 
            className="text-2xl font-bold text-zinc-900 cursor-pointer flex items-center gap-2"
            onClick={() => setView('STUDENT_HOME')}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-lg">E</div>
            Elo
          </div>
          
          <nav className="flex items-center gap-8">
            <button 
              className={`text-sm font-medium ${currentView === 'FIND_COACH' ? 'text-indigo-600' : 'text-zinc-500 hover:text-zinc-900'}`}
              onClick={() => setView('FIND_COACH')}
            >
              Find a Coach
            </button>

            <button 
              className={`text-sm font-medium ${currentView === 'HISTORY' ? 'text-indigo-600' : 'text-zinc-500 hover:text-zinc-900'}`}
              onClick={() => setView('HISTORY')}
            >
              History
            </button>
            
            <button 
              className={`text-sm font-medium ${currentView === 'COACH_HUB' ? 'text-indigo-600' : 'text-zinc-500 hover:text-zinc-900'}`}
              onClick={() => {
                // If not logged in as coach, go to auth, else hub
                if (!isLoggedIn) onAuth('COACH', 'LOGIN');
                else setView('COACH_HUB');
              }}
            >
              Coach Hub
            </button>

            <button 
              className={`text-sm font-medium ${currentView === 'BILLING' ? 'text-indigo-600' : 'text-zinc-500 hover:text-zinc-900'}`}
              onClick={() => setView('BILLING')}
            >
              Billing
            </button>

            <button 
              className={`text-sm font-medium ${currentView === 'ADMIN' ? 'text-indigo-600' : 'text-zinc-500 hover:text-zinc-900'}`}
              onClick={() => setView('ADMIN')}
            >
              Admin
            </button>

            {!isLoggedIn ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-zinc-100">
                <button 
                  className="text-sm font-medium text-zinc-500 hover:text-zinc-900"
                  onClick={() => onAuth('STUDENT', 'LOGIN')}
                >
                  Log in
                </button>
                <button 
                  className="text-sm font-medium bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-800 transition-colors"
                  onClick={() => onAuth('STUDENT', 'SIGNUP')}
                >
                  Get started
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-zinc-100">
                 <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600 border border-indigo-100 cursor-pointer">
                  JD
                </div>
                <button 
                  className="text-sm font-medium text-zinc-500 hover:text-zinc-900"
                  onClick={onLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </nav>
        </header>
      )}
      <main className={`flex-1 ${isFocusMode ? '' : 'py-4'}`}>
        {children}
      </main>
      {!isFocusMode && (
        <footer className="py-12 text-center text-zinc-400 text-xs border-t border-zinc-100 mt-20">
          © 2024 Elo Chinese. Designed for speaking confidence.
        </footer>
      )}
    </div>
  );
};

export default Layout;
