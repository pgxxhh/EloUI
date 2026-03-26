
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, RefreshCcw, XCircle, Info, Check } from 'lucide-react';
import { Button, Modal } from './UI';

interface VerificationBannerProps {
  onVerify: () => void;
  onResend: () => void;
}

export const VerificationBanner: React.FC<VerificationBannerProps> = ({ onVerify, onResend }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-indigo-600 text-white overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <div className="text-sm font-medium">
            <span className="opacity-80">Action required:</span> Confirm your email to unlock all features.
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onVerify}
            className="text-sm font-bold bg-white text-indigo-600 px-4 py-1.5 rounded-full hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Verify now
          </button>
          <button 
            onClick={onResend}
            className="hidden sm:flex text-sm font-medium text-white/80 hover:text-white transition-colors items-center gap-1"
          >
            <RefreshCcw className="w-3 h-3" />
            Resend
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <XCircle className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  onResend: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, onVerify, onResend }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-8">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-indigo-50 rounded-[20px] flex items-center justify-center shrink-0">
            <Mail className="w-7 h-7 text-indigo-600" />
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">Security Check</div>
            <h2 className="text-2xl font-bold text-zinc-900 leading-tight">Verification Required</h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-zinc-500 leading-relaxed text-sm">
            To protect your account and enable high-risk actions like purchases or applications, we need you to confirm your email address.
          </p>

          <div className="bg-zinc-50 rounded-3xl p-5 flex gap-4 border border-zinc-100">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
              <Info className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              You can still browse coaches and explore Elo, but this specific action requires a verified email.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={onVerify} className="w-full py-4 rounded-2xl shadow-lg shadow-indigo-500/20">
            Complete verification
          </Button>
          <Button variant="secondary" onClick={onResend} className="w-full py-4 rounded-2xl bg-white border border-zinc-200 hover:bg-zinc-50">
            <RefreshCcw className="w-4 h-4" />
            Resend verification email
          </Button>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-indigo-600 transition-colors">
            Contact support
          </button>
          <button onClick={onClose} className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">
            Maybe later
          </button>
        </div>
      </div>
    </Modal>
  );
};

interface VerificationWaitingPageProps {
  email: string;
  onResend: () => void;
  onChangeEmail: () => void;
  onBackToLogin: () => void;
}

export const VerificationWaitingPage: React.FC<VerificationWaitingPageProps> = ({ email, onResend, onChangeEmail, onBackToLogin }) => {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-200">
            E
          </div>
        </div>

        <Card className="p-10 space-y-8">
          <div className="space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Email Verification</div>
            <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Check your email</h1>
            <p className="text-zinc-500 leading-relaxed">
              We sent a verification link to <span className="text-zinc-900 font-medium">{email}</span>. Confirm your email to finish setting up your Elo account.
            </p>
          </div>

          <div className="bg-indigo-50/50 rounded-3xl p-6 space-y-3 border border-indigo-100/50">
            <h3 className="font-bold text-zinc-900">Still waiting?</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Confirm your email to finish setup and unlock the full Elo experience. Check spam or promotions folders, then resend if the message has not arrived.
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={onResend} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700">
              Resend verification email
            </Button>
            <Button variant="secondary" onClick={onChangeEmail} className="w-full py-4 bg-white border border-zinc-200">
              Change email
            </Button>
            <Button variant="ghost" onClick={onBackToLogin} className="w-full py-4">
              Back to login
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-zinc-400">
              Need more help? <button className="text-zinc-900 font-medium hover:underline">Contact support</button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-[40px] shadow-2xl shadow-zinc-200/50 border border-white p-8 ${className}`}>
    {children}
  </div>
);
