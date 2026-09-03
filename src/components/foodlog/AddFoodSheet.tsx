import React, { useMemo, useState } from 'react';
import { PlusIcon, SearchIcon, XIcon } from 'lucide-react';
import { commonFoods, toDetectedFood, type CommonFood } from '../../data/commonFoods';
import type { DetectedFood } from '../../types/foodLog';
import { haptic } from '../../lib/haptics';

interface AddFoodSheetProps {
  onClose: () => void;
  onAdd: (item: DetectedFood) => void;
}

const groupOrder: CommonFood['group'][] = [
'Protein',
'Carbs',
'Vegetables',
'Fats & extras',
'Drinks'];


/** Adds a food the camera missed — from the common list, or typed by hand. */
export function AddFoodSheet({ onClose, onAdd }: AddFoodSheetProps) {
  const [query, setQuery] = useState('');
  const [custom, setCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customPortion, setCustomPortion] = useState('1 serving');
  const [customCalories, setCustomCalories] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customFat, setCustomFat] = useState('');

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return commonFoods;
    return commonFoods.filter((food) => food.name.toLowerCase().includes(term));
  }, [query]);

  const grouped = groupOrder.
  map((group) => ({ group, foods: matches.filter((food) => food.group === group) })).
  filter((section) => section.foods.length > 0);

  const caloriesValue = Number(customCalories);
  const customValid = customName.trim().length > 0 && caloriesValue > 0;

  const addCustom = () => {
    if (!customValid) return;
    haptic('selection');
    onAdd({
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      portionLabel: customPortion.trim() || '1 serving',
      quantity: 1,
      calories: caloriesValue,
      protein: Number(customProtein) || 0,
      carbs: Number(customCarbs) || 0,
      fat: Number(customFat) || 0,
      confidence: 1
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Add a food">
      
      <div className="mx-auto flex max-h-[86vh] w-full max-w-[430px] flex-col rounded-t-3xl bg-white">
        <div className="shrink-0 px-6 pb-3 pt-5">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200" />
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1A1A1A]">
              {custom ? 'Add your own' : 'Add a food'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#A7AFA9] transition-colors hover:bg-[#F1F5F3] hover:text-[#1A1A1A]">
              
              <XIcon size={18} />
            </button>
          </div>

          {!custom &&
          <div className="relative mt-4">
              <SearchIcon
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A7AFA9]" />
            
              <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search foods"
              aria-label="Search foods"
              className="w-full rounded-2xl border-2 border-[#E1E6E3] bg-white py-3.5 pl-11 pr-4 text-[16px] font-semibold text-[#1A1A1A] outline-none transition-colors focus:border-[#1A1A1A] placeholder:font-normal placeholder:text-[#A7AFA9]" />
            
            </div>
          }
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">
          {custom ?
          <div className="space-y-3 pt-1">
              <Field label="Food name">
                <input
                value={customName}
                onChange={(event) => setCustomName(event.target.value)}
                placeholder="e.g. Peanut butter toast"
                className={inputClass} />
              
              </Field>
              <Field label="Portion">
                <input
                value={customPortion}
                onChange={(event) => setCustomPortion(event.target.value)}
                placeholder="1 serving"
                className={inputClass} />
              
              </Field>
              <Field label="Calories per portion">
                <input
                value={customCalories}
                onChange={(event) => setCustomCalories(event.target.value.replace(/[^\d]/g, ''))}
                inputMode="numeric"
                placeholder="250"
                className={inputClass} />
              
              </Field>
              <div className="grid grid-cols-3 gap-2.5">
                <Field label="Protein g">
                  <input
                  value={customProtein}
                  onChange={(event) => setCustomProtein(event.target.value.replace(/[^\d]/g, ''))}
                  inputMode="numeric"
                  placeholder="0"
                  className={inputClass} />
                
                </Field>
                <Field label="Carbs g">
                  <input
                  value={customCarbs}
                  onChange={(event) => setCustomCarbs(event.target.value.replace(/[^\d]/g, ''))}
                  inputMode="numeric"
                  placeholder="0"
                  className={inputClass} />
                
                </Field>
                <Field label="Fat g">
                  <input
                  value={customFat}
                  onChange={(event) => setCustomFat(event.target.value.replace(/[^\d]/g, ''))}
                  inputMode="numeric"
                  placeholder="0"
                  className={inputClass} />
                
                </Field>
              </div>
              <p className="pt-1 text-xs leading-relaxed text-[#8A948F]">
                Only calories are required — macros can be left blank if you don&rsquo;t know them.
              </p>
              <button
              type="button"
              onClick={addCustom}
              disabled={!customValid}
              className="mt-1 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A] disabled:bg-[#EFF1F0] disabled:text-[#9AA39E]">
              
                Add to plate
              </button>
              <button
              type="button"
              onClick={() => setCustom(false)}
              className="w-full py-1 text-center text-sm font-semibold text-[#68736D] underline underline-offset-4">
              
                Back to the food list
              </button>
            </div> :

          <>
              {grouped.map((section) =>
            <div key={section.group} className="mb-5">
                  <h3 className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#94A3B8]">
                    {section.group}
                  </h3>
                  <div className="space-y-2">
                    {section.foods.map((food) =>
                <button
                  key={food.id}
                  type="button"
                  onClick={() => {
                    haptic('selection');
                    onAdd(toDetectedFood(food));
                    onClose();
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#E8EEEA] bg-white p-3.5 text-left transition-colors hover:border-[#CBD5D0] hover:bg-[#FAFBFA]">
                  
                        <span className="min-w-0">
                          <span className="block truncate text-[15px] font-bold text-[#1A1A1A]">
                            {food.name}
                          </span>
                          <span className="mt-0.5 block text-[13px] text-[#68736D]">
                            {food.portionLabel} · {food.calories} cal · P {food.protein}g
                          </span>
                        </span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1F5F3] text-[#1A1A1A]">
                          <PlusIcon size={16} />
                        </span>
                      </button>
                )}
                  </div>
                </div>
            )}

              <button
              type="button"
              onClick={() => {
                setCustom(true);
                setCustomName(query.trim());
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#CFD6D2] py-4 text-sm font-bold text-[#1A1A1A] transition-colors hover:border-[#1A1A1A]">
              
                <PlusIcon size={16} />
                {query.trim() ? `Add “${query.trim()}” myself` : 'Add something else myself'}
              </button>
            </>
          }
        </div>
      </div>
    </div>);

}

const inputClass =
'w-full rounded-xl border-2 border-[#E1E6E3] bg-white px-3.5 py-3 text-[16px] font-semibold text-[#1A1A1A] outline-none transition-colors focus:border-[#1A1A1A] placeholder:font-normal placeholder:text-[#A7AFA9]';

function Field({ label, children }: {label: string;children: React.ReactNode;}) {
  return (
    <label className="block">
      <span className="ml-1 text-[11px] font-extrabold uppercase tracking-wide text-[#94A3B8]">
        {label}
      </span>
      <span className="mt-1.5 block">{children}</span>
    </label>);

}