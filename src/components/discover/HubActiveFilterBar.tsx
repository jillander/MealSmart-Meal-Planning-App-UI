import React from 'react';
import { XIcon } from 'lucide-react';
import type { HubFilters } from '../../utils/hubFilters';

interface HubActiveFilterBarProps {
  filters: HubFilters;
  onChange: (filters: HubFilters) => void;
}

/** Removable chips summarizing every narrowed dimension. */
export function HubActiveFilterBar({ filters, onChange }: HubActiveFilterBarProps) {
  const remove = (key: 'meals' | 'cuisines' | 'dietary' | 'effort', value: string) =>
  onChange({ ...filters, [key]: filters[key].filter((entry) => entry !== value) });

  const chips: {label: string;onRemove: () => void;}[] = [
  ...filters.meals.map((meal) => ({ label: meal, onRemove: () => remove('meals', meal) })),
  ...(filters.maxTime !== null ?
  [{ label: `Under ${filters.maxTime} min`, onRemove: () => onChange({ ...filters, maxTime: null }) }] :
  []),
  ...filters.dietary.map((tag) => ({ label: tag, onRemove: () => remove('dietary', tag) })),
  ...(filters.maxCalories !== null ?
  [
  {
    label: `Under ${filters.maxCalories} cal`,
    onRemove: () => onChange({ ...filters, maxCalories: null })
  }] :

  []),
  ...(filters.minMatch !== null ?
  [{ label: `${filters.minMatch}%+ match`, onRemove: () => onChange({ ...filters, minMatch: null }) }] :
  []),
  ...filters.cuisines.map((cuisine) => ({ label: cuisine, onRemove: () => remove('cuisines', cuisine) })),
  ...filters.effort.map((effort) => ({ label: effort, onRemove: () => remove('effort', effort) }))];


  if (chips.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {chips.map((chip) =>
      <button
        key={chip.label}
        type="button"
        onClick={chip.onRemove}
        aria-label={`Remove ${chip.label} filter`}
        className="flex items-center gap-1.5 rounded-full border border-[#E1E5E3] bg-[#F4F6F5] py-1.5 pl-3 pr-2 text-xs font-semibold text-[#3C463F] transition-colors hover:border-[#CFD6D2] hover:bg-[#EAEEEC]">
        
          {chip.label}
          <XIcon size={13} />
        </button>
      )}
    </div>);

}