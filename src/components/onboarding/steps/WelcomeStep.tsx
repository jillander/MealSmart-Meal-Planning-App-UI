import React, { useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { AuthModal, type AuthMode } from '../../AuthModal';
import { CalPalMark } from '../CalPalMark';
import { CoreLoopPreview } from '../CoreLoopPreview';

interface WelcomeStepProps {
  onStart: () => void;
  onSignIn: () => void;
}

/**
 * Step 0. Sells the core loop before asking anything. There is one way in —
 * "Build my plan" — so nobody lands in an empty app without a plan.
 */
export function WelcomeStep({ onStart, onSignIn }: WelcomeStepProps) {
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  return (
    <section className="flex min-h-screen flex-col bg-[#F7FBF7] px-6 pb-8 pt-9">
      <div className="flex justify-center">
        <CalPalMark size="lg" />
      </div>

      {/* The core loop, running, before a single question is asked */}
      <div className="mt-6">
        <CoreLoopPreview />
      </div>

      <div className="mt-auto pt-7 text-center">
        <h1 className="text-[34px] font-extrabold leading-[1.07] tracking-tight text-[#1A1A1A]">
          Scan your fridge.
          <br />
          Get dinner.
        </h1>
        <p className="mx-auto mt-3.5 max-w-[320px] text-[15px] leading-relaxed text-[#68736D]">
          Cal Pal turns the ingredients you already have into recipes that hit your calorie and
          protein goals.
        </p>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_5px_0_#080808] transition-transform active:translate-y-0.5 active:shadow-[0_3px_0_#080808]">
        
        Build my plan <ArrowRightIcon className="ml-2" size={19} />
      </button>

      <p className="mt-5 text-center text-sm text-[#68736D]">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => setAuthMode('signin')}
          className="font-semibold text-[#1A1A1A] underline underline-offset-4">
          
          Log in
        </button>
      </p>

      <AuthModal
        isOpen={authMode !== null}
        mode="signin"
        onClose={() => setAuthMode(null)}
        onSuccess={() => {
          setAuthMode(null);
          onSignIn();
        }} />
      
    </section>);

}