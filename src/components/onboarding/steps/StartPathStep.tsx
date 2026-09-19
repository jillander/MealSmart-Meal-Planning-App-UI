import React from 'react';
import { CalendarDaysIcon, ScanLineIcon } from 'lucide-react';
import { OnboardingChoiceCard } from '../OnboardingChoiceCard';
import { ContinueButton, QuestionLayout } from './QuestionLayout';
import type { StartPath } from '../../../data/onboardingOptions';

interface StartPathStepProps {
  startPath: StartPath | null;
  onStartPathChange: (path: StartPath) => void;
  onContinue: () => void;
}

/** Step 13. Chooses the first win, pre-selected from their stated barrier. */
export function StartPathStep({
  startPath,
  onStartPathChange,
  onContinue
}: StartPathStepProps) {
  return (
    <QuestionLayout
      title="How would you like to start today?"
      subtitle="We’ve highlighted the best first step for you — you can change it.">
      
      <div className="space-y-3">
        <OnboardingChoiceCard
          label="Use ingredients I have"
          description="Tap what’s in your kitchen for instant recipe matches"
          icon={ScanLineIcon}
          selected={startPath === 'scan'}
          onClick={() => onStartPathChange('scan')} />
        
        <OnboardingChoiceCard
          label="Plan today’s meals"
          description="Browse balanced meal ideas and add one to today’s plan"
          icon={CalendarDaysIcon}
          selected={startPath === 'plan'}
          onClick={() => onStartPathChange('plan')} />
        
      </div>
      <ContinueButton disabled={!startPath} label="Show me my options" onClick={onContinue} />
    </QuestionLayout>);

}