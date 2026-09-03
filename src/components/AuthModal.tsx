import React, { useState } from 'react';
import { XIcon, MailIcon, ArrowRightIcon } from 'lucide-react';
export type AuthMode = 'signin' | 'signup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  /** Sets the copy and which action leads. Defaults to signing in. */
  mode?: AuthMode;
  /** Lets the user swap between signing in and creating an account. */
  onModeChange?: (mode: AuthMode) => void;
}
export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  mode = 'signin',
  onModeChange
}) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  if (!isOpen) return null;
  const isSignUp = mode === 'signup';
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const passwordValid = password.length >= 8;
  const handleSSOLogin = (provider: string) => {
    setIsLoading(provider);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(null);
      onSuccess();
    }, 1500);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 animate-fade-in sm:items-center">
      <div
        className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 pb-10 sm:pb-6 animate-slide-up relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600">
          
          <XIcon size={18} />
        </button>

        {/* Header */}
        <div className="text-center mt-4 mb-8">
          <div
            className="flex items-baseline justify-center tracking-tight text-[#1A1A1A] mb-4"
            style={{
              fontFamily: 'var(--font-wordmark)'
            }}>
            
            <span className="text-3xl font-bold">Cal</span>
            <span className="text-3xl font-medium ml-1.5 text-[#4CAF50]">
              Pal
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-sm text-gray-500 px-4">
            {isSignUp ?
            'Save your plan, keep your progress, and pick up on any device.' :
            'Sign in to get back to your plan, meals, and progress.'}
          </p>
        </div>

        {/* Auth Options */}
        <div className="space-y-3">
          {/* Apple */}
          <button
            onClick={() => handleSSOLogin('apple')}
            disabled={isLoading !== null}
            className="w-full flex items-center justify-center space-x-3 bg-black text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-gray-900 transition-colors active:scale-[0.98] disabled:opacity-70">
            
            {isLoading === 'apple' ?
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :

            <>
                <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor">
                
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.84 1.5.05 2.78.72 3.53 1.84-3.03 1.77-2.54 5.82.35 7.04-.68 1.69-1.52 3.23-2.46 4.13zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span>{isSignUp ? 'Sign up with Apple' : 'Continue with Apple'}</span>
              </>
            }
          </button>

          {/* Google */}
          <button
            onClick={() => handleSSOLogin('google')}
            disabled={isLoading !== null}
            className="w-full flex items-center justify-center space-x-3 bg-white text-gray-700 border border-gray-200 py-3.5 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors active:scale-[0.98] disabled:opacity-70 shadow-sm">
            
            {isLoading === 'google' ?
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" /> :

            <>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                
                  <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                
                  <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                
                  <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                
                </svg>
                <span>{isSignUp ? 'Sign up with Google' : 'Continue with Google'}</span>
              </>
            }
          </button>

          {/* Facebook */}
          <button
            onClick={() => handleSSOLogin('facebook')}
            disabled={isLoading !== null}
            className="w-full flex items-center justify-center space-x-3 bg-[#1877F2] text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-[#166FE5] transition-colors active:scale-[0.98] disabled:opacity-70">
            
            {isLoading === 'facebook' ?
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :

            <>
                <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor">
                
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>{isSignUp ? 'Sign up with Facebook' : 'Continue with Facebook'}</span>
              </>
            }
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs text-gray-400 uppercase font-semibold tracking-wider">
                Or
              </span>
            </div>
          </div>

          {/* Email */}
          {showEmailForm ?
          <div className="space-y-3">
              <div>
                <label
                htmlFor="auth-email"
                className="ml-1 text-[11px] font-extrabold uppercase tracking-wide text-gray-400">
                
                  Email
                </label>
                <input
                id="auth-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-[16px] font-semibold text-[#1A1A1A] outline-none transition-colors focus:border-[#1A1A1A] placeholder:font-normal placeholder:text-gray-400" />
              
              </div>
              <div>
                <label
                htmlFor="auth-password"
                className="ml-1 text-[11px] font-extrabold uppercase tracking-wide text-gray-400">
                
                  Password
                </label>
                <input
                id="auth-password"
                type="password"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={isSignUp ? 'At least 8 characters' : 'Your password'}
                className="mt-1.5 w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-[16px] font-semibold text-[#1A1A1A] outline-none transition-colors focus:border-[#1A1A1A] placeholder:font-normal placeholder:text-gray-400" />
              
              </div>
              <button
              onClick={() => handleSSOLogin('email')}
              disabled={isLoading !== null || !emailValid || !passwordValid}
              className="w-full flex items-center justify-center bg-[#1A1A1A] text-white py-3.5 px-4 rounded-xl font-bold hover:bg-[#2A2A2A] transition-colors active:scale-[0.98] disabled:bg-gray-100 disabled:text-gray-400">
              
                {isLoading === 'email' ?
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :

              <>
                    {isSignUp ? 'Create account' : 'Sign in'}
                    <ArrowRightIcon size={18} className="ml-2" />
                  </>
              }
              </button>
              <button
              onClick={() => setShowEmailForm(false)}
              className="w-full text-center text-sm font-semibold text-gray-500 underline underline-offset-4">
              
                Back to all options
              </button>
            </div> :

          <button
            onClick={() => setShowEmailForm(true)}
            disabled={isLoading !== null}
            className="w-full flex items-center justify-center space-x-3 bg-gray-100 text-[#1A1A1A] py-3.5 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors active:scale-[0.98] disabled:opacity-70">
            
              <MailIcon size={20} />
              <span>{isSignUp ? 'Sign up with Email' : 'Continue with Email'}</span>
            </button>
          }
        </div>

        {/* Mode switch */}
        {onModeChange &&
        <p className="mt-6 text-center text-sm text-gray-500">
            {isSignUp ? 'Already using Cal Pal?' : 'New to Cal Pal?'}{' '}
            <button
            onClick={() => {
              setShowEmailForm(false);
              onModeChange(isSignUp ? 'signin' : 'signup');
            }}
            className="font-semibold text-[#1A1A1A] underline underline-offset-4">
            
              {isSignUp ? 'Sign in' : 'Create an account'}
            </button>
          </p>
        }

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8 px-4">
          By continuing, you agree to our{' '}
          <a href="#" className="text-gray-600 underline hover:text-gray-900">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-gray-600 underline hover:text-gray-900">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>);

};