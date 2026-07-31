import React, { useMemo, useState } from 'react';
import {
  CameraIcon,
  ClockIcon,
  FlameIcon,
  PlusIcon,
  ScanLineIcon,
  SparklesIcon } from
'lucide-react';
import { useMealPlan } from '../../contexts/MealPlanContext';
import { AddToMealPlanModal } from '../AddToMealPlanModal';
import { ToastNotification } from '../ToastNotification';
import { PantryPicker, pantryItems } from './PantryPicker';
import { SampleKitchenScan, sampleDetections } from './SampleKitchenScan';

type StartPath = 'scan' | 'plan';
type Phase = 'pick' | 'results';
type PickMode = 'sample' | 'manual';

interface FirstRecipeStepProps {
  path: StartPath;
  onDone: () => void;
}

const copyByPath: Record<StartPath, {eyebrow: string;title: string;body: string;}> = {
  scan: {
    eyebrow: 'See it in action',
    title: 'From ingredients to dinner.',
    body: 'Here’s a kitchen we already scanned. Tap the tags to see how your matches change.'
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
  const [phase, setPhase] = useState<Phase>(path === 'plan' ? 'results' : 'pick');
  const [mode, setMode] = useState<PickMode>('sample');
  const [selected, setSelected] = useState<string[]>(sampleDetections.map((detection) => detection.id));
  const [activeRecipe, setActiveRecipe] = useState<{id: string;title: string;image: string;cookingTime: string;calories: number;} | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const selectedLabels = useMemo(() => {
    const source = mode === 'sample' ? sampleDetections : pantryItems;
    return source.filter((item) => selected.includes(item.id)).map((item) => item.label);
  }, [mode, selected]);

  const recipes = useMemo(
    () =>
    generatedRecipes.slice(0, 3).map((recipe, index) => ({
      id: recipe.id,
      title: recipe.name,
      image: recipe.image,
      cookingTime: recipe.prepTime,
      calories: recipe.calories,
      match: Math.max(52, Math.min(98, 60 + selectedLabels.length * 8 - index * 4)),
      uses: selectedLabels.slice(0, Math.max(1, selectedLabels.length - index))
    })),
    [generatedRecipes, selectedLabels]
  );

  const switchMode = (nextMode: PickMode) => {
    setMode(nextMode);
    setSelected(nextMode === 'sample' ? sampleDetections.map((detection) => detection.id) : ['chicken', 'spinach', 'rice']);
  };

  const toggleItem = (id: string) =>
  setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const handleMealAdded = (
  recipe: {id: string;title: string;image: string;cookingTime: string;calories: number;},
  date: Date,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') =>
  {
    addMeal(recipe, date, mealType);
    setActiveRecipe(null);
    setToastMessage('Meal added to your plan');
    window.setTimeout(onDone, 1350);
  };

  return (
    <section className="relative flex min-h-[calc(100vh-104px)] flex-col">
      <style>{`@keyframes cp-rise { 0% { transform: translateY(10px); opacity: 0 } 100% { transform: translateY(0); opacity: 1 } } @media (prefers-reduced-motion: reduce) { .cp-rise-item { animation: none !important; } }`}</style>

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#4CAF50]">{copy.eyebrow}</p>
        <h1 className="mt-2 max-w-[360px] text-[29px] font-extrabold leading-[1.1] tracking-tight">{copy.title}</h1>
        <p className="mt-2.5 max-w-[360px] text-[15px] leading-relaxed text-[#68736D]">{copy.body}</p>
      </div>

      {path === 'scan' && phase === 'pick' ?
      <div className="mt-5 flex flex-1 flex-col">
          {mode === 'sample' ?
        <SampleKitchenScan selected={selected} onToggle={toggleItem} /> :

        <PantryPicker selected={selected} onToggle={toggleItem} />
        }

          <button
          type="button"
          onClick={() => switchMode(mode === 'sample' ? 'manual' : 'sample')}
          className="mt-3 self-center text-sm font-semibold text-[#58655E] underline underline-offset-4 hover:text-[#1A1A1A]">
          
            {mode === 'sample' ? 'Use my own ingredients instead' : 'Back to the sample kitchen'}
          </button>

          <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-[#F1F8F2] p-3 text-left">
            <CameraIcon className="mt-0.5 shrink-0 text-[#4CAF50]" size={16} />
            <p className="text-xs leading-relaxed text-[#496150]">In the app you’ll scan your own fridge or receipt — we’ll notify you the moment your recipes are ready.</p>
          </div>

          <button
          type="button"
          disabled={selected.length === 0}
          onClick={() => setPhase('results')}
          className="mt-auto flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-[transform,box-shadow,background-color] enabled:active:translate-y-0.5 enabled:active:shadow-[0_2px_0_#080808] disabled:bg-[#E7EBE9] disabled:text-[#9AA39E] disabled:shadow-none">
          
            <SparklesIcon className="mr-2" size={18} />
            {selected.length ? `Match recipes (${selected.length})` : 'Select an ingredient'}
          </button>
        </div> :

      <div className="mt-6 flex flex-1 flex-col">
          {path === 'scan' &&
        <div className="mb-3 flex items-center justify-between gap-2 rounded-xl bg-[#EDF8EF] px-3 py-2">
              <span className="flex items-center gap-2 text-xs font-semibold text-[#2F7D34]"><ScanLineIcon size={15} /> Matched to {selectedLabels.length} ingredients</span>
              <button type="button" onClick={() => setPhase('pick')} className="text-xs font-bold text-[#2F7D34] underline underline-offset-2">Edit</button>
            </div>
        }
          <div className="space-y-3">
            {recipes.map((recipe, index) =>
          <div key={recipe.id} className="cp-rise-item flex items-center gap-3 rounded-2xl border border-[#E1E6E3] bg-white p-2.5" style={{ animation: `cp-rise 360ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 70}ms both` }}>
                <div className="relative shrink-0">
                  <img src={recipe.image} alt={recipe.title} className="h-16 w-16 rounded-xl object-cover" />
                  {path === 'scan' && <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-[#4CAF50] px-1.5 py-0.5 text-[9px] font-extrabold text-white shadow">{recipe.match}%</span>}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#1A1A1A]">{recipe.title}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-[#68736D]"><span className="flex items-center gap-1"><ClockIcon size={13} /> {recipe.cookingTime}</span><span className="flex items-center gap-1"><FlameIcon size={13} /> {recipe.calories} cal</span></div>
                  {path === 'scan' && recipe.uses.length > 0 && <p className="mt-1 truncate text-[11px] font-semibold text-[#2F7D34]">Uses {recipe.uses.join(', ')}</p>}
                </div>
                <button type="button" onClick={() => setActiveRecipe({ id: recipe.id, title: recipe.title, image: recipe.image, cookingTime: recipe.cookingTime, calories: recipe.calories })} className="flex h-9 items-center gap-1 rounded-full bg-[#1A1A1A] px-3 text-xs font-bold text-white active:scale-95"><PlusIcon size={14} /> Add</button>
              </div>
          )}
          </div>
          <p className="mt-auto pt-5 text-center text-xs leading-relaxed text-[#7A857F]">Add one meal to continue to your membership options.</p>
        </div>
      }

      {activeRecipe && <AddToMealPlanModal recipe={activeRecipe} onClose={() => setActiveRecipe(null)} onAdd={(date, mealType) => handleMealAdded(activeRecipe, date, mealType)} />}
      {toastMessage && <ToastNotification message={toastMessage} />}
    </section>);

}