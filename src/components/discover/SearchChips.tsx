import React from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { ingredientEmoji } from '../../data/searchSuggestions';
import type { HubSearch } from '../../utils/hubSearch';

interface SearchChipsProps {
  search: HubSearch;
  meals: string[];
  onSearchChange: (search: HubSearch) => void;
  onMealsChange: (meals: string[]) => void;
  className?: string;
}

/**
 * The chips under the search field. Three visual languages, so people can
 * see at a glance what is an ingredient, what is a dish, and what is a meal.
 */
export function SearchChips({
  search,
  meals,
  onSearchChange,
  onMealsChange,
  className = ''
}: SearchChipsProps) {
  const hasChips = search.ingredients.length + search.dishQueries.length + meals.length > 0;
  if (!hasChips) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {search.ingredients.map((name) =>
      <Chip
        key={`ing-${name}`}
        label={name}
        leading={<span aria-hidden="true">{ingredientEmoji(name)}</span>}
        className="border-[#CFE8D3] bg-[#EDF8EF] text-[#276B2C]"
        onRemove={() =>
        onSearchChange({
          ...search,
          ingredients: search.ingredients.filter((entry) => entry !== name)
        })
        } />

      )}

      {search.dishQueries.map((query) =>
      <Chip
        key={`dish-${query}`}
        label={query}
        leading={<SearchIcon size={13} className="text-[#7A857F]" />}
        className="border-[#DDE2DF] bg-white text-[#3C463F]"
        onRemove={() =>
        onSearchChange({
          ...search,
          dishQueries: search.dishQueries.filter((entry) => entry !== query)
        })
        } />

      )}

      {meals.map((meal) =>
      <Chip
        key={`meal-${meal}`}
        label={meal}
        className="border-[#1A1A1A] bg-[#1A1A1A] text-white"
        onRemove={() => onMealsChange(meals.filter((entry) => entry !== meal))} />

      )}
    </div>);

}

function Chip({
  label,
  leading,
  className,
  onRemove





}: {label: string;leading?: React.ReactNode;className: string;onRemove: () => void;}) {
  return (
    <span
      className={`flex items-center gap-1.5 rounded-full border py-1.5 pl-3 pr-2 text-[13px] font-semibold ${className}`}>
      
      {leading}
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="rounded-full p-0.5 transition-opacity hover:opacity-70">
        
        <XIcon size={13} />
      </button>
    </span>);

}