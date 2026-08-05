import React from 'react';
import { XIcon } from 'lucide-react';
import type { DiscoverFilters } from '../../types/discover';

interface ActiveFilterBarProps {
  filters: DiscoverFilters;
  onChange: (filters: DiscoverFilters) => void;
  onClearAll: () => void;
}

interface ActiveChip {
  label: string;
  remove: () => void;
}

/** Row of removable chips summarizing every narrowed dimension. */
export function ActiveFilterBar({ filters, onChange, onClearAll }: ActiveFilterBarProps) {
  const chips: ActiveChip[] = [
  ...filters.mealTypes.map((meal) => ({
    label: meal,
    remove: () => onChange({ ...filters, mealTypes: filters.mealTypes.filter((entry) => entry !== meal) })
  })),
  ...(filters.maxTime !== null ?
  [{ label: `Under ${filters.maxTime} min`, remove: () => onChange({ ...filters, maxTime: null }) }] :
  []),
  ...filters.dietary.map((tag) => ({
    label: tag,
    remove: () => onChange({ ...filters, dietary: filters.dietary.filter((entry) => entry !== tag) })
  })),
  ...(filters.minProtein !== null ?
  [{ label: `${filters.minProtein}g+ protein`, remove: () => onChange({ ...filters, minProtein: null }) }] :
  []),
  ...(filters.maxCalories !== null ?
  [{ label: `Under ${filters.maxCalories} kcal`, remove: () => onChange({ ...filters, maxCalories: null }) }] :
  []),
  ...filters.cuisines.map((cuisine) => ({
    label: cuisine,
    remove: () => onChange({ ...filters, cuisines: filters.cuisines.filter((entry) => entry !== cuisine) })
  })),
  ...filters.effort.map((effort) => ({
    label: effort,
    remove: () => onChange({ ...filters, effort: filters.effort.filter((entry) => entry !== effort) })
  }))];


  if (chips.length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto px-6 pb-3 scrollbar-hide">
      {chips.map((chip) =>
      <button
        key={chip.label}
        type="button"
        onClick={chip.remove}
        aria-label={`Remove ${chip.label} filter`}
        className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#E1E5E3] bg-[#F4F6F5] py-2 pl-3.5 pr-2.5 text-sm font-semibold text-[#3C463F] transition-colors hover:border-[#CFD6D2] hover:bg-[#EAEEEC]">
        
          {chip.label}
          <XIcon size={14} />
        </button>
      )}
      <button
        type="button"
        onClick={onClearAll}
        className="shrink-0 px-2 text-sm font-semibold text-[#757575] transition-colors hover:text-[#1A1A1A]">
        
        Clear all
      </button>
    </div>);

}