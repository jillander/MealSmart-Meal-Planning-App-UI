
import React, { useState } from 'react';
import {
  CheckCircle2Icon,
  ClockIcon,
  FlameIcon,
  ImageIcon,
  PlusIcon,
  ScanLineIcon,
  SwitchCameraIcon } from
'lucide-react';
import { useMealPlan } from '../../contexts/MealPlanContext';
import { AddToMealPlanModal } from '../AddToMealPlanModal';
import { IngredientAnalysisModal } from '../IngredientAnalysisModal';
import { ToastNotification } from '../ToastNotification';

type StartPath = 'scan' | 'plan';

interface FirstRecipeStepProps {
  path: StartPath;
  onDone: () => void;
}

const copyByPath: Record<StartPath, {eyebrow: string;title: string;body: string;}> = {
  scan: {
    eyebrow: 'Scan your ingredients',
    title: 'What’s in your kitchen?',
    body: 'Capture what you have and we’ll suggest meals that fit your plan.'
  },
  plan: {
    eyebrow: 'Plan today’s meals',
    title: 'Pick your first meal',
    body: 'Choose one balanced option, then add it straight to today’s plan.'
  }
};

export function FirstRecipeStep({ path, onDone }: FirstRecipeStepProps) {
  const { generatedRecipes, addMeal } = useMealPlan();
  const copy = copyByPath[path];
  const [scanComplete, setScanComplete] = useState(path === 'plan');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState<(typeof recipes)[number] | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const recipes = generatedRecipes.slice(0, 3).map((recipe) => ({
    id: recipe.id,
    title: recipe.name,
    image: recipe.image,
    cookingTime: recipe.prepTime,
    calories: recipe.calories,
    matchPercentage: recipe.matchPercentage
  }));

  const handleMealAdded = (recipe: (typeof recipes)[number], date: Date, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    addMeal(recipe, date, mealType);
    setActiveRecipe(null);
    setToastMessage('Meal added to your plan');
    window.setTimeout(onDone, 1350);
  };

  return (
    <section className="relative flex min-h-[calc(100vh-104px)] flex-col">
      <style>{`
        @keyframes cp-rise { 0% { transform: translateY(10px); opacity: 0 } 100% { transform: translateY(0); opacity: 1 } }
      `}</style>

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#4CAF50]">{copy.eyebrow}</p>
        <h1 className="mt-2 max-w-[360px] text-[30px] font-extrabold leading-[1.1] tracking-tight">{copy.title}</h1>
        <p className="mt-3 max-w-[360px] text-[15px] leading-relaxed text-[#68736D]">{copy.body}</p>
      </div>

      {path === 'scan' && !scanComplete ?
      <div className="mt-6 flex flex-1 flex-col">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-[28px] bg-black">
            <img
            src="/83c9cf94-e7ec-4b5f-a426-703eeb37d6c6.jpg"
            alt="Live camera view of fresh ingredients"
            className="h-full w-full object-cover" />
          
            <span className="absolute left-4 top-4 h-7 w-7 rounded-tl-xl border-l-4 border-t-4 border-white/90" />
            <span className="absolute right-4 top-4 h-7 w-7 rounded-tr-xl border-r-4 border-t-4 border-white/90" />
            <span className="absolute bottom-24 left-4 h-7 w-7 rounded-bl-xl border-b-4 border-l-4 border-white/90" />
            <span className="absolute bottom-24 right-4 h-7 w-7 rounded-br-xl border-b-4 border-r-4 border-white/90" />
            <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">Point at your ingredients</div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-6 pb-5 pt-10">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm"><ImageIcon size={18} /></span>
              <button type="button" onClick={() => setShowAnalysis(true)} aria-label="Capture photo" className="flex h-[70px] w-[70px] items-center justify-center rounded-full border-4 border-white/90 bg-white/20 backdrop-blur-sm transition-transform active:scale-90"><span className="h-[52px] w-[52px] rounded-full bg-white" /></button>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm"><SwitchCameraIcon size={18} /></span>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-[#68736D]">Tap the shutter to capture. We’ll identify your ingredients, then suggest recipes.</p>
        </div> :

      <div className="mt-6 flex flex-1 flex-col">
          {path === 'scan' && <div className="mb-3 flex items-center gap-2 rounded-xl bg-[#EDF8EF] px-3 py-2 text-xs font-semibold text-[#2F7D34]"><ScanLineIcon size={15} /> Recipes matched to your ingredients</div>}
          <div className="space-y-3">
            {recipes.map((recipe, index) =>
          <div key={recipe.id} className="flex items-center gap-3 rounded-2xl border border-[#E1E6E3] bg-white p-2.5" style={{ animation: `cp-rise 360ms ease-out ${index * 80}ms both` }}>
                <img src={recipe.image} alt={recipe.title} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#1A1A1A]">{recipe.title}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-[#68736D]"><span className="flex items-center gap-1"><ClockIcon size={13} /> {recipe.cookingTime}</span><span className="flex items-center gap-1"><FlameIcon size={13} /> {recipe.calories} cal</span></div>
                </div>
                <button type="button" onClick={() => setActiveRecipe(recipe)} className="flex h-9 items-center gap-1 rounded-full bg-[#1A1A1A] px-3 text-xs font-bold text-white active:scale-95"><PlusIcon size={14} /> Add</button>
              </div>
          )}
          </div>
          <p className="mt-auto pt-5 text-center text-xs leading-relaxed text-[#7A857F]">Add one meal to continue to your membership options.</p>
        </div>
      }

      <IngredientAnalysisModal
        isOpen={showAnalysis}
        onClose={() => setShowAnalysis(false)}
        onComplete={() => {
          setShowAnalysis(false);
          setScanComplete(true);
        }} />
      

      {activeRecipe && <AddToMealPlanModal recipe={activeRecipe} onClose={() => setActiveRecipe(null)} onAdd={(date, mealType) => handleMealAdded(activeRecipe, date, mealType)} />}
      {toastMessage && <ToastNotification message={toastMessage} />}
    </section>);

}