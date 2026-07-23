import React, { useState } from 'react';
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  ClockIcon,
  FlameIcon,
  PlusIcon,
  Share2Icon,
  TrophyIcon } from
'lucide-react';
import { useMealPlan } from '../../contexts/MealPlanContext';
import { AddToMealPlanModal } from '../AddToMealPlanModal';

interface FirstRecipeStepProps {
  onDone: () => void;
}

export function FirstRecipeStep({ onDone }: FirstRecipeStepProps) {
  const { generatedRecipes, addMeal } = useMealPlan();
  const [showModal, setShowModal] = useState(false);
  const [added, setAdded] = useState(false);

  const recipe = generatedRecipes[0];
  const recipeForModal = {
    id: recipe?.id ?? 'gen-1',
    title: recipe?.name ?? 'One-Pan Chicken and Rice',
    image:
    recipe?.image ??
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    cookingTime: recipe?.prepTime ?? '30 min',
    calories: recipe?.calories ?? 450
  };

  return (
    <section className="relative flex min-h-[calc(100vh-104px)] flex-col text-center">
      <style>{`
        @keyframes cp-pop { 0% { transform: scale(0.6); opacity: 0 } 60% { transform: scale(1.08) } 100% { transform: scale(1); opacity: 1 } }
        @keyframes cp-rise { 0% { transform: translateY(12px); opacity: 0 } 100% { transform: translateY(0); opacity: 1 } }
      `}</style>

      <div
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#4CAF50] text-white shadow-lg"
        style={{ animation: 'cp-pop 480ms cubic-bezier(0.34,1.56,0.64,1) both' }}>
        
        <TrophyIcon size={38} />
      </div>
      <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-[#4CAF50]">
        Your first recipe
      </p>
      <h1 className="mx-auto mt-2 max-w-[340px] text-[30px] font-extrabold leading-[1.1] tracking-tight">
        Nice — this one fits your plan.
      </h1>
      <p className="mx-auto mt-3 max-w-[330px] text-[15px] leading-relaxed text-[#68736D]">
        Add it to this week and it’ll be waiting for you on your home screen.
      </p>

      {/* Recipe card */}
      <div
        className="mt-6 overflow-hidden rounded-3xl border border-[#E1E6E3] bg-white text-left shadow-sm"
        style={{ animation: 'cp-rise 420ms ease-out 160ms both' }}>
        
        <div className="relative h-40 w-full">
          <img
            src={recipeForModal.image}
            alt={recipeForModal.title}
            className="h-full w-full object-cover" />
          
          {recipe?.matchPercentage != null &&
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[#2F7D34] shadow-sm">
              {recipe.matchPercentage}% match
            </span>
          }
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-[#1A1A1A]">{recipeForModal.title}</h2>
          <div className="mt-2 flex items-center gap-4 text-sm text-[#68736D]">
            <span className="flex items-center gap-1">
              <ClockIcon size={15} /> {recipeForModal.cookingTime}
            </span>
            <span className="flex items-center gap-1">
              <FlameIcon size={15} /> {recipeForModal.calories} cal
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6">
        {added ?
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-[#EDF8EF] py-3.5 text-sm font-bold text-[#2F7D34]">
            <CheckCircle2Icon size={18} /> Added to this week’s plan
          </div> :

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-all hover:bg-[#2A2A2A] active:translate-y-0.5 active:shadow-[0_2px_0_#080808]">
          
            <PlusIcon className="mr-2" size={19} /> Add to this week’s plan
          </button>
        }
        <div className="mt-3 flex items-center justify-center gap-6">
          {!added &&
          <button
            type="button"
            onClick={onDone}
            className="text-sm font-semibold text-[#58655E] hover:text-[#1A1A1A]">
            
              Maybe later
            </button>
          }
          <button
            type="button"
            onClick={onDone}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#58655E] hover:text-[#1A1A1A]">
            
            <Share2Icon size={15} /> Share
          </button>
          {added &&
          <button
            type="button"
            onClick={onDone}
            className="flex items-center gap-1 text-sm font-bold text-[#2F7D34]">
            
              Continue <ArrowRightIcon size={16} />
            </button>
          }
        </div>
      </div>

      {showModal &&
      <AddToMealPlanModal
        recipe={recipeForModal}
        onClose={() => setShowModal(false)}
        onAdd={(date, mealType) => {
          addMeal(recipeForModal, date, mealType);
          setAdded(true);
        }} />

      }
    </section>);

}