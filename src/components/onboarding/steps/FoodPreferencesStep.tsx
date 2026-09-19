import React from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { ContinueButton, QuestionLayout } from './QuestionLayout';
import { cuisines, foodPreferences } from '../../../data/onboardingOptions';

interface FoodPreferencesStepProps {
  selectedPreferences: string[];
  onTogglePreference: (id: string) => void;
  selectedCuisines: string[];
  onToggleCuisine: (cuisine: string) => void;
  onContinue: () => void;
}

/**
 * Step 8. Deliberately after the numbers and the projection — this is the
 * bridge from "your targets" to "the food you'll actually eat".
 */
export function FoodPreferencesStep({
  selectedPreferences,
  onTogglePreference,
  selectedCuisines,
  onToggleCuisine,
  onContinue
}: FoodPreferencesStepProps) {
  return (
    <QuestionLayout
      title="Now the part you’ll actually taste"
      subtitle="Your numbers are set. Tell us what you like to eat, and we’ll match recipes to it.">
      
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#68736D]">
        Dietary preferences
      </p>
      <div className="grid grid-cols-2 gap-3">
        {foodPreferences.map((item) => {
          const selected = selectedPreferences.includes(item.id);
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onTogglePreference(item.id)}
              className={`relative min-h-20 rounded-2xl border p-3 text-left transition-all active:scale-[0.98] ${
              selected ?
              'border-[#4CAF50] bg-[#EDF8EF]' :
              'border-[#E1E6E3] bg-white hover:border-[#B7DDBB]'}`
              }>
              
              <span className="text-sm font-semibold text-[#1A1A1A]">{item.label}</span>
              <span
                className={`absolute bottom-3 right-3 flex h-5 w-5 items-center justify-center rounded-md ${
                selected ?
                'bg-[#4CAF50] text-white' :
                'border border-[#C7CFCA] bg-white text-transparent'}`
                }>
                
                <CheckCircle2Icon size={14} strokeWidth={3} />
              </span>
            </button>);

        })}
      </div>

      <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-[#68736D]">
        Favorite cuisines
      </p>
      <div className="flex flex-wrap gap-2">
        {cuisines.map((cuisine) => {
          const selected = selectedCuisines.includes(cuisine);
          return (
            <button
              type="button"
              key={cuisine}
              onClick={() => onToggleCuisine(cuisine)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all active:scale-[0.97] ${
              selected ?
              'border-[#4CAF50] bg-[#4CAF50] text-white' :
              'border-[#E1E6E3] bg-white text-[#59645E] hover:border-[#B7DDBB]'}`
              }>
              
              {cuisine}
            </button>);

        })}
      </div>

      <ContinueButton onClick={onContinue} />
    </QuestionLayout>);

}