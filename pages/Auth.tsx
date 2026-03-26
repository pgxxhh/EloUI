
import React, { useState } from 'react';
import { Button, Card } from '../components/UI';
import { AuthRole, AuthMode } from '../types';

interface AuthProps {
  initialRole: AuthRole;
  initialMode: AuthMode;
  onSuccess: (role: AuthRole) => void;
}

const Auth: React.FC<AuthProps> = ({ initialRole, initialMode, onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [role, setRole] = useState<AuthRole>(initialRole);

  const isStudent = role === 'STUDENT';

  return (
    <div className="max-w-md mx-auto py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-3xl font-bold text-zinc-900">
          {mode === 'LOGIN' ? 'Welcome back' : 'Start your journey'}
        </h1>
        
        {/* Role Switcher */}
        <div className="flex justify-center p-1 bg-zinc-100 rounded-xl max-w-[240px] mx-auto">
          <button 
            onClick={() => setRole('STUDENT')}
            className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${isStudent ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            Student
          </button>
          <button 
            onClick={() => setRole('COACH')}
            className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${!isStudent ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            Coach
          </button>
        </div>

        <p className="text-zinc-500 text-sm">
          {isStudent 
            ? 'Join 5,000+ learners building speaking confidence.' 
            : 'Help students open their mouths and earn while you do it.'}
        </p>
      </div>

      <Card className="p-8 shadow-xl shadow-zinc-100 border-zinc-200/60">
        <div className="space-y-6">
          {/* Social Auth (Modern SaaS Standard) */}
          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center justify-center gap-3 px-4 py-2.5 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors text-sm font-medium text-zinc-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-zinc-400 font-bold tracking-widest">or</span></div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Email address</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-zinc-300"
              />
            </div>
            
            {mode === 'LOGIN' && (
              <div className="space-y-1">
                <div className="flex justify-between items-end ml-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Password</label>
                  <button className="text-[10px] text-indigo-600 hover:underline font-bold">Forgot?</button>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-zinc-300"
                />
              </div>
            )}
          </div>

          <Button 
            className="w-full py-4 text-base"
            onClick={() => onSuccess(role)}
          >
            {mode === 'LOGIN' ? 'Sign in' : 'Create account'}
          </Button>

          <p className="text-center text-sm text-zinc-500">
            {mode === 'LOGIN' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              className="text-indigo-600 font-semibold hover:underline"
              onClick={() => setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
            >
              {mode === 'LOGIN' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </Card>
      
      <p className="text-center mt-8 text-xs text-zinc-400">
        By continuing, you agree to Elo's <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default Auth;
