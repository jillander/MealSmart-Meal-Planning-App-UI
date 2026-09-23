import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeftIcon, PlusIcon, SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { SearchChips } from './SearchChips';
import { ingredientSuggestions, intentSuggestions } from '../../data/searchSuggestions';
import { resolveToken } from '../../utils/hubSearch';
import type { HubSearch } from '../../utils/hubSearch';
import { haptic } from '../../lib/haptics';

interface RecipeSearchScreenProps {
  search: HubSearch;
  meals: string[];
  resultCount: number;
  onSearchChange: (search: HubSearch) => void;
  onMealsChange: (meals: string[]) => void;
  onOpenFilters: () => void;
  /** Commit the current chips and show results. */
  onSubmit: () => void;
  onBack: () => void;
}

/**
 * The search screen, pushed over Discover. People add as many ingredients as
 * they like, so nothing here navigates away on a single tap.
 */
export function RecipeSearchScreen({
  search,
  meals,
  resultCount,
  onSearchChange,
  onMealsChange,
  onOpenFilters,
  onSubmit,
  onBack
}: RecipeSearchScreenProps) {
  const [query, setQuery] = useState('');
  const [bannerVisible, setBannerVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addIngredient = (name: string) => {
    haptic('selection');
    if (!search.ingredients.some((entry) => entry.toLowerCase() === name.toLowerCase())) {
      onSearchChange({ ...search, ingredients: [...search.ingredients, name] });
    }
    setQuery('');
    inputRef.current?.focus();
  };

  const addDishQuery = (name: string) => {
    haptic('selection');
    if (!search.dishQueries.some((entry) => entry.toLowerCase() === name.toLowerCase())) {
      onSearchChange({ ...search, dishQueries: [...search.dishQueries, name] });
    }
    setQuery('');
    inputRef.current?.focus();
  };

  const addMeal = (meal: string) => {
    haptic('selection');
    if (!meals.includes(meal)) onMealsChange([...meals, meal]);
    setQuery('');
    inputRef.current?.focus();
  };

  /** Typed text resolves to whichever kind of chip it actually is. */
  const commitQuery = () => {
    const token = query.trim();
    if (!token) {
      onSubmit();
      return;
    }
    const resolved = resolveToken(token);
    if (resolved.kind === 'ingredient') addIngredient(resolved.value);else
    if (resolved.kind === 'meal') addMeal(resolved.value);else
    addDishQuery(resolved.value);
  };

  const term = query.trim().toLowerCase();
  const visibleIngredients = useMemo(
    () =>
    ingredientSuggestions.filter(
      (item) =>
      !search.ingredients.some((entry) => entry.toLowerCase() === item.name.toLowerCase()) && (
      !term || item.name.toLowerCase().includes(term))
    ),
    [search.ingredients, term]
  );
  const visibleIntents = useMemo(
    () =>
    intentSuggestions.filter((item) => {
      const alreadyOn =
      item.kind === 'meal' ?
      meals.includes(item.name) :
      search.dishQueries.some((entry) => entry.toLowerCase() === item.name.toLowerCase());
      return !alreadyOn && (!term || item.name.toLowerCase().includes(term));
    }),
    [meals, search.dishQueries, term]
  );

  const hasChips = search.ingredients.length + search.dishQueries.length + meals.length > 0;
  const nothingSuggested = visibleIngredients.length === 0 && visibleIntents.length === 0;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-white">
      {/* Header: back + the same field, focused */}
      <div className="border-b border-gray-100 px-4 pb-3 pt-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Discover"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#1A1A1A] transition-colors hover:bg-gray-100">
            
            <ChevronLeftIcon size={24} />
          </button>

          <div className="flex h-11 flex-1 items-center gap-2 rounded-full bg-[#F3F4F6] px-4">
            <SearchIcon size={18} className="shrink-0 text-[#9CA3AF]" />
            <input
              ref={inputRef}
              type="search"
              inputMode="search"
              enterKeyHint="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  commitQuery();
                }
              }}
              placeholder={hasChips ? '' : 'Search ingredients, recipes…'}
              aria-label="Search ingredients or recipes"
              className="h-full w-full bg-transparent text-[15px] text-[#1A1A1A] outline-none placeholder:text-[#9CA3AF]" />
            
          </div>

          <button
            type="button"
            onClick={onOpenFilters}
            aria-label="Filter recipes"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[#1A1A1A] transition-colors hover:bg-gray-200">
            
            <SlidersHorizontalIcon size={18} />
          </button>
        </div>

        <SearchChips
          search={search}
          meals={meals}
          onSearchChange={onSearchChange}
          onMealsChange={onMealsChange}
          className="mt-3 pl-12" />
        
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {bannerVisible &&
        <div className="mx-4 mt-4 flex items-start gap-3 rounded-2xl bg-[#F3F4F6] p-4">
            <p className="flex-1 text-[15px] leading-snug text-[#3C463F]">
              You can now add as many ingredients as you like
            </p>
            <button
            type="button"
            onClick={() => setBannerVisible(false)}
            aria-label="Hide tip"
            className="text-[#6B7471] transition-colors hover:text-[#1A1A1A]">
            
              <XIcon size={20} />
            </button>
          </div>
        }

        {nothingSuggested ?
        <div className="px-6 py-10 text-center">
            <p className="text-[15px] text-[#6B7471]">
              Nothing matching “{query.trim()}”.
            </p>
            <button
            type="button"
            onClick={commitQuery}
            className="mt-3 text-[15px] font-semibold text-[#1A1A1A] underline underline-offset-4">
            
              Search recipes for it anyway
            </button>
          </div> :

        <ul className="mt-2 divide-y divide-gray-100">
            {visibleIngredients.map((item) =>
          <SuggestionRow
            key={item.name}
            label={item.name}
            leading={
            <span className="text-[20px]" aria-hidden="true">
                    {item.emoji}
                  </span>
            }
            onAdd={() => addIngredient(item.name)} />

          )}

            {visibleIntents.map((item) =>
          <SuggestionRow
            key={item.name}
            label={item.name}
            leading={<SearchIcon size={20} className="text-[#9CA3AF]" />}
            onAdd={() => item.kind === 'meal' ? addMeal(item.name) : addDishQuery(item.name)} />

          )}
          </ul>
        }
      </div>

      {/* Commit the chips */}
      {hasChips &&
      <div className="absolute inset-x-0 bottom-0 border-t border-gray-100 bg-white px-5 pb-6 pt-3">
          <button
          type="button"
          onClick={onSubmit}
          disabled={resultCount === 0}
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A] disabled:bg-[#EFF1F0] disabled:text-[#9AA39E]">
          
            {resultCount === 0 ?
          'No recipes match' :
          `Show ${resultCount} ${resultCount === 1 ? 'recipe' : 'recipes'}`}
          </button>
        </div>
      }
    </div>);

}

function SuggestionRow({
  label,
  leading,
  onAdd




}: {label: string;leading: React.ReactNode;onAdd: () => void;}) {
  return (
    <li>
      <button
        type="button"
        onClick={onAdd}
        className="flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors hover:bg-[#FAFBFA]">
        
        <span className="flex w-6 justify-center">{leading}</span>
        <span className="flex-1 text-[17px] text-[#1A1A1A]">{label}</span>
        <PlusIcon size={22} className="text-[#1A1A1A]" aria-hidden="true" />
      </button>
    </li>);

}