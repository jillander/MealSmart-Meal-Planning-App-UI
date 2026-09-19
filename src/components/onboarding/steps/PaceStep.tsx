import React from 'react';
import { OnboardingChoiceCard } from '../OnboardingChoiceCard';
import { ContinueButton, QuestionLayout } from './QuestionLayout';
import type { Pace } from '../../../data/onboardingOptions';

interface PaceStepProps {
  pace: Pace;
  onPaceChange: (pace: Pace) => void;
  onContinue: () => void;
}

/** Step 6. Sits right after the numbers, before we show the projection. */
export function PaceStep({ pace, onPaceChange, onContinue }: PaceStepProps) {
  return (
    <QuestionLayout
      title="What pace feels sustainable?"
      subtitle="Small, repeatable choices tend to create the strongest results.">
      
      <div className="space-y-3">
        <OnboardingChoiceCard
          label="Gentle"
          description="More flexibility and a slower change"
          selected={pace === 'gentle'}
          onClick={() => onPaceChange('gentle')} />
        
        <OnboardingChoiceCard
          label="Steady"
          description="A balanced, practical pace for most people"
          selected={pace === 'steady'}
          onClick={() => onPaceChange('steady')} />
        
        <OnboardingChoiceCard
          label="Focused"
          description="More structure, still built around real meals"
          selected={pace === 'focused'}
          onClick={() => onPaceChange('focused')} />
        
      </div>
      <div className="mt-4 rounded-2xl bg-[#FFF9E9] p-3 text-xs leading-relaxed text-[#7A5A18]">
        <span className="font-bold">Our recommendation:</span> Steady. You can adjust your target
        whenever your routine changes.
      </div>
      <ContinueButton onClick={onContinue} />
    </QuestionLayout>);

}