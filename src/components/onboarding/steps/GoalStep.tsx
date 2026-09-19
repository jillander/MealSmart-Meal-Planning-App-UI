import React from 'react';
import { OnboardingChoiceCard } from '../OnboardingChoiceCard';
import { StaggeredOptions } from '../StaggeredOptions';
import { ContinueButton, QuestionLayout } from './QuestionLayout';
import { goals, type Goal } from '../../../data/onboardingOptions';

interface GoalStepProps {
  goal: Goal | null;
  onGoalChange: (goal: Goal) => void;
  onContinue: () => void;
}

/** Step 1. The single answer that shapes every target we calculate. */
export function GoalStep({ goal, onGoalChange, onContinue }: GoalStepProps) {
  return (
    <QuestionLayout
      title="What would you like help with?"
      subtitle="Your answer shapes the plan we build together.">
      
      <StaggeredOptions>
        {goals.map((item) =>
        <OnboardingChoiceCard
          key={item.id}
          label={item.label}
          description={item.description}
          icon={item.icon}
          selected={goal === item.id}
          onClick={() => onGoalChange(item.id)} />

        )}
      </StaggeredOptions>
      <ContinueButton disabled={!goal} onClick={onContinue} />
    </QuestionLayout>);

}