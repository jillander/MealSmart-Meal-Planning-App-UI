import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
import type {
  Cuisine,
  DietaryTag,
  DiscoverFilters,
  DiscoverSort,
  Effort,
  MealType } from
'../../types/discover';
import { countActiveFilters, emptyFilters } from '../../types/discover';
import { haptic } from '../../lib/haptics';

interface DiscoverFilterSheetProps {
  open: boolean;
  filters: DiscoverFilters;
  /** How many recipes the draft selection would return, for the live count on Apply. */
  previewCount: number;
  onPreview: (draft: DiscoverFilters) => void;
  onApply: (draft: DiscoverFilters) => void;
  onClose: () => void;
}

const mealTypes: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
const cuisines: Cuisine[] = ['Mediterranean', 'Asian', 'Mexican', 'Italian', 'American', 'Indian'];
const dietaryTags: DietaryTag[] = [
'High protein',
'Vegetarian',
'Vegan',
'Gluten-free',
'Dairy-free',
'Low carb'];

const efforts: Effort[] = ['Easy', 'Medium', 'Advanced'];
const timeOptions = [15, 30, 45, 60];
const proteinOptions = [20, 30, 40];
const calorieOptions = [400, 500, 600];
const sortOptions: {value: DiscoverSort;label: string;}[] = [
{ value: 'recommended', label: 'Recommended' },
{ value: 'quickest', label: 'Quickest' },
{ value: 'protein', label: 'Most protein' },
{ value: 'calories', label: 'Fewest calories' },
{ value: 'popular', label: 'Most loved' }];


export function DiscoverFilterSheet({
  open,
  filters,
  previewCount,
  onPreview,
  onApply,
  onClose
}: DiscoverFilterSheetProps) {
  const [draft, setDraft] = useState<DiscoverFilters>(filters);

  // Re-seed from the applied filters each time the sheet opens.
  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

  const update = (next: DiscoverFilters) => {
    haptic('light');
    setDraft(next);
    onPreview(next);
  };

  const toggle = <T,>(list: T[], value: T): T[] =>
  list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];

  const activeCount = countActiveFilters(draft);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50" role="dialog" aria-modal="true" aria-label="Filter recipes">
      <button type="button" aria-label="Close filters" onClick={onClose} className="absolute inset-0 cursor-default" />
      <div className="relative max-h-[86vh] w-full overflow-y-auto rounded-t-3xl bg-white pb-6">
        <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-6 pb-4 pt-4">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1A1A1A]">Filters</h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => update(emptyFilters)}
                disabled={activeCount === 0}
                className="text-sm font-semibold text-[#1A1A1A] underline-offset-4 transition-colors hover:underline disabled:text-[#C7CFCA] disabled:no-underline">
                
                Reset
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[#1A1A1A] transition-colors hover:bg-gray-200">
                
                <XIcon size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 pt-5">
          <Group title="Meal">
            {mealTypes.map((meal) =>
            <Chip
              key={meal}
              label={meal}
              active={draft.mealTypes.includes(meal)}
              onClick={() => update({ ...draft, mealTypes: toggle(draft.mealTypes, meal) })} />

            )}
          </Group>

          <Group title="Ready in" hint="Total time">
            {timeOptions.map((minutes) =>
            <Chip
              key={minutes}
              label={`Under ${minutes} min`}
              active={draft.maxTime === minutes}
              onClick={() => update({ ...draft, maxTime: draft.maxTime === minutes ? null : minutes })} />

            )}
          </Group>

          <Group title="Dietary needs" hint="All selected must match">
            {dietaryTags.map((tag) =>
            <Chip
              key={tag}
              label={tag}
              active={draft.dietary.includes(tag)}
              onClick={() => update({ ...draft, dietary: toggle(draft.dietary, tag) })} />

            )}
          </Group>

          <Group title="Protein" hint="Per serving">
            {proteinOptions.map((grams) =>
            <Chip
              key={grams}
              label={`${grams}g+`}
              active={draft.minProtein === grams}
              onClick={() => update({ ...draft, minProtein: draft.minProtein === grams ? null : grams })} />

            )}
          </Group>

          <Group title="Calories" hint="Per serving">
            {calorieOptions.map((kcal) =>
            <Chip
              key={kcal}
              label={`Under ${kcal}`}
              active={draft.maxCalories === kcal}
              onClick={() => update({ ...draft, maxCalories: draft.maxCalories === kcal ? null : kcal })} />

            )}
          </Group>

          <Group title="Cuisine">
            {cuisines.map((cuisine) =>
            <Chip
              key={cuisine}
              label={cuisine}
              active={draft.cuisines.includes(cuisine)}
              onClick={() => update({ ...draft, cuisines: toggle(draft.cuisines, cuisine) })} />

            )}
          </Group>

          <Group title="Effort">
            {efforts.map((effort) =>
            <Chip
              key={effort}
              label={effort}
              active={draft.effort.includes(effort)}
              onClick={() => update({ ...draft, effort: toggle(draft.effort, effort) })} />

            )}
          </Group>

          <Group title="Sort by">
            {sortOptions.map((option) =>
            <Chip
              key={option.value}
              label={option.label}
              active={draft.sort === option.value}
              onClick={() => update({ ...draft, sort: option.value })} />

            )}
          </Group>
        </div>

        <div className="sticky bottom-0 mt-2 border-t border-gray-100 bg-white px-6 pb-2 pt-4">
          <button
            type="button"
            onClick={() => onApply(draft)}
            disabled={previewCount === 0}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A] disabled:bg-[#EFF1F0] disabled:text-[#9AA39E]">
            
            {previewCount === 0 ?
            'No recipes match' :
            `Show ${previewCount} ${previewCount === 1 ? 'recipe' : 'recipes'}`}
          </button>
        </div>
      </div>
    </div>);

}

function Group({ title, hint, children }: {title: string;hint?: string;children: React.ReactNode;}) {
  return (
    <section className="mb-6">
      <div className="mb-2.5 flex items-baseline gap-2">
        <h3 className="text-sm font-bold text-[#1A1A1A]">{title}</h3>
        {hint && <span className="text-xs text-[#94A3B8]">{hint}</span>}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </section>);

}

function Chip({ label, active, onClick }: {label: string;active: boolean;onClick: () => void;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
      active ?
      'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-sm' :
      'border-[#E7EAE8] bg-white text-[#5B6660] hover:border-[#CFD6D2] hover:text-[#1A1A1A]'}`
      }>
      
      {label}
    </button>);

}