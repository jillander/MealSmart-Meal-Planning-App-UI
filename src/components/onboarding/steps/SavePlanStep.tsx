import React from 'react';
import { ShieldCheckIcon } from 'lucide-react';

type Provider = 'apple' | 'google' | 'email';

interface SavePlanStepProps {
  dailyTarget: number;
  goalWeight: string;
  projectedDate: string | null;
  email: string;
  onEmail: (value: string) => void;
  isSaving: string | null;
  onProvider: (provider: Provider) => void;
  onSkip: () => void;
}

/**
 * Step 12. Account creation happens here — after the plan exists, so there is
 * something concrete to save rather than an abstract signup.
 */
export function SavePlanStep({
  dailyTarget,
  goalWeight,
  projectedDate,
  email,
  onEmail,
  isSaving,
  onProvider,
  onSkip
}: SavePlanStepProps) {
  const emailIsValid = /\S+@\S+\.\S+/.test(email);
  const savedPlanDescription = projectedDate ?
  `Keep your ${dailyTarget.toLocaleString()} cal plan and your path to ${goalWeight} kg by ${projectedDate}.` :
  `Keep your ${dailyTarget.toLocaleString()} cal plan and your personalized meal targets.`;

  return (
    <section className="flex min-h-[calc(100vh-104px)] flex-col text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#E6F6E8] text-[#4CAF50]">
        <ShieldCheckIcon size={31} />
      </div>
      <h1 className="mx-auto mt-6 max-w-[350px] text-[31px] font-extrabold leading-[1.1] tracking-tight">
        Save your plan so it’s here tomorrow
      </h1>
      <p className="mx-auto mt-3 max-w-[345px] text-[15px] leading-relaxed text-[#68736D]">
        {savedPlanDescription}
      </p>

      <label className="mt-7 block text-left">
        <span className="mb-1.5 block text-xs font-semibold text-[#68736D]">Email address</span>
        <input
          type="email"
          value={email}
          onChange={(event) => onEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className="h-14 w-full rounded-xl border border-[#E1E6E3] bg-white px-3.5 text-base font-semibold text-[#1A1A1A] outline-none placeholder:font-normal placeholder:text-[#A7AFA9] focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/15"
          aria-label="Email address" />
        
      </label>

      <div className="mt-3 space-y-3">
        <ProviderButton
          provider="email"
          label="Save with email"
          isLoading={isSaving === 'email'}
          disabled={!emailIsValid || isSaving !== null}
          onClick={() => onProvider('email')} />
        
        <div className="flex items-center gap-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#9AA39E]">
          <span className="h-px flex-1 bg-[#E8ECE9]" />
          or
          <span className="h-px flex-1 bg-[#E8ECE9]" />
        </div>
        <ProviderButton
          provider="apple"
          label="Continue with Apple"
          isLoading={isSaving === 'apple'}
          disabled={isSaving !== null}
          onClick={() => onProvider('apple')} />
        
        <ProviderButton
          provider="google"
          label="Continue with Google"
          isLoading={isSaving === 'google'}
          disabled={isSaving !== null}
          onClick={() => onProvider('google')} />
        
      </div>

      <button
        type="button"
        onClick={onSkip}
        disabled={isSaving !== null}
        className="mt-5 text-sm font-semibold text-[#58655E] hover:text-[#1A1A1A] disabled:opacity-50">
        
        Maybe later
      </button>
      <p className="mt-auto pt-8 text-xs leading-relaxed text-[#8A948F]">
        We’ll only use this to keep your plan available when you return.
      </p>
    </section>);

}

function ProviderButton({
  provider,
  label,
  isLoading,
  disabled,
  onClick






}: {provider: Provider;label: string;isLoading: boolean;disabled: boolean;onClick: () => void;}) {
  const isApple = provider === 'apple';
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-14 w-full items-center justify-center rounded-2xl border text-sm font-bold transition-all active:scale-[0.99] disabled:opacity-60 ${
      isApple ?
      'border-[#1A1A1A] bg-[#1A1A1A] text-white' :
      'border-[#DDE4DF] bg-white text-[#1A1A1A] hover:bg-[#FAFBFA]'}`
      }>
      
      {isLoading ?
      <span
        className={`h-5 w-5 animate-spin rounded-full border-2 ${
        isApple ? 'border-white/30 border-t-white' : 'border-[#C7CFCA] border-t-[#4CAF50]'}`
        } /> :


      <>
          <ProviderIcon provider={provider} />
          <span className="ml-3">{label}</span>
        </>
      }
    </button>);

}

function ProviderIcon({ provider }: {provider: Provider;}) {
  if (provider === 'apple') {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.84 1.5.05 2.78.72 3.53 1.84-3.03 1.77-2.54 5.82.35 7.04-.68 1.69-1.52 3.23-2.46 4.13zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>);

  }
  if (provider === 'email') return <span className="text-lg">✉</span>;
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
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
      
    </svg>);

}