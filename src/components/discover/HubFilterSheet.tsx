import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
import {
  buildHubFacets,
  countActiveHubFilters,
  emptyHubFilters } from
'../../utils/hubFilters';
import type { HubFilters, HubRecipe, HubSort } from '../../utils/hubFilters';

interface HubFilterSheetProps {
  open: boolean;
  filters: HubFilters;
  /** Full pool, used to build facet options and the live result count. */
  recipes: HubRecipe[];
  previewCount: number;
  onPreview: (draft: HubFilters) => void;
  onApply: (draft: HubFilters) => void;
  onClose: () => void;
}

const timeOptions = [15, 20, 30, 45];
const calorieOptions = [350, 450, 550];
const matchOptions = [80, 90];
const sortOptions: {value: HubSort;label: string;}[] = [
{ value: 'match', label: 'Best match' },
{ value: 'quickest', label: 'Quickest' },
{ value: 'calories', label: 'Fewest calories' },
{ value: 'popular', label: 'Trending' }];


export function HubFilterSheet({
  open,
  filters,
  recipes,
  previewCount,
  onPreview,
  onApply,
  onClose
}: HubFilterSheetProps) {
  const [draft, setDraft] = useState<HubFilters>(filters);
  const facets = buildHubFacets(recipes);

  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

  const update = (next: HubFilters) => {
    setDraft(next);
    onPreview(next);
  };

  const toggle = (list: string[], value: string): string[] =>
  list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];

  const activeCount = countActiveHubFilters(draft);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Filter recipes">
      
      <button type="button" aria-label="Close filters" onClick={onClose} className="absolute inset-0 cursor-default" />
      <div className="relative max-h-[86vh] w-full max-w-[430px] mx-auto overflow-y-auto rounded-t-3xl bg-white pb-4">
        <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-6 pb-4 pt-4">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1A1A1A]">Filters</h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => update(emptyHubFilters)}
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
          {facets.meals.length > 0 &&
          <Group title="Meal">
              {facets.meals.map((meal) =>
            <Chip
              key={meal}
              label={meal}
              active={draft.meals.includes(meal)}
              onClick={() => update({ ...draft, meals: toggle(draft.meals, meal) })} />

            )}
            </Group>
          }

          <Group title="Ready in" hint="Total time">
            {timeOptions.map((minutes) =>
            <Chip
              key={minutes}
              label={`Under ${minutes} min`}
              active={draft.maxTime === minutes}
              onClick={() => update({ ...draft, maxTime: draft.maxTime === minutes ? null : minutes })} />

            )}
          </Group>

          {facets.dietary.length > 0 &&
          <Group title="Dietary needs" hint="All selected must match">
              {facets.dietary.map((tag) =>
            <Chip
              key={tag}
              label={tag}
              active={draft.dietary.includes(tag)}
              onClick={() => update({ ...draft, dietary: toggle(draft.dietary, tag) })} />

            )}
            </Group>
          }

          <Group title="Calories" hint="Per serving">
            {calorieOptions.map((kcal) =>
            <Chip
              key={kcal}
              label={`Under ${kcal}`}
              active={draft.maxCalories === kcal}
              onClick={() => update({ ...draft, maxCalories: draft.maxCalories === kcal ? null : kcal })} />

            )}
          </Group>

          <Group title="Ingredient match" hint="Based on your kitchen">
            {matchOptions.map((percent) =>
            <Chip
              key={percent}
              label={`${percent}%+ match`}
              active={draft.minMatch === percent}
              onClick={() => update({ ...draft, minMatch: draft.minMatch === percent ? null : percent })} />

            )}
          </Group>

          {facets.cuisines.length > 0 &&
          <Group title="Cuisine">
              {facets.cuisines.map((cuisine) =>
            <Chip
              key={cuisine}
              label={cuisine}
              active={draft.cuisines.includes(cuisine)}
              onClick={() => update({ ...draft, cuisines: toggle(draft.cuisines, cuisine) })} />

            )}
            </Group>
          }

          <Group title="Effort">
            {facets.efforts.map((effort) =>
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

        <div className="sticky bottom-0 border-t border-gray-100 bg-white px-6 pb-2 pt-4">
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