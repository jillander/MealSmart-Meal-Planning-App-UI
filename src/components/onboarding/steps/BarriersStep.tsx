import React from 'react';
import { OnboardingChoiceCard } from '../OnboardingChoiceCard';
import { StaggeredOptions } from '../StaggeredOptions';
import { ContinueButton, QuestionLayout } from './QuestionLayout';
import { barriers } from '../../../data/onboardingOptions';

interface BarriersStepProps {
  selected: string[];
  onToggle: (id: string) => void;
  onContinue: () => void;
}

/** Step 2. Multi-select — what we echo back on the validation screen. */
export function BarriersStep({ selected, onToggle, onContinue }: BarriersStepProps) {
  return (
    <QuestionLayout
      title="What makes eating well hard right now?"
      subtitle="Pick anything that sounds familiar. We’ll shape your plan around it.">
      
      <StaggeredOptions>
        {barriers.map((item) =>
        <OnboardingChoiceCard
          key={item.id}
          label={item.label}
          icon={item.icon}
          multiSelect
          selected={selected.includes(item.id)}
          onClick={() => onToggle(item.id)} />

        )}
      </StaggeredOptions>
      <ContinueButton
        label={selected.length ? 'Continue' : 'Skip for now'}
        onClick={onContinue} />
      
    </QuestionLayout>);

}