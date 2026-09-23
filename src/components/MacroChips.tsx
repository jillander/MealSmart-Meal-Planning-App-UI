import React from 'react';
import { getMacros } from '../utils/macros';

interface MacroChipsProps {
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  /** "compact" for recipe cards, "row" for the wider meal rows on Today. */
  variant?: 'compact' | 'row';
  className?: string;
}

/**
 * Protein / carbs / fat, always in the same order and colour so the three
 * numbers are readable at a glance without labels competing with the title.
 */
export function MacroChips({
  calories,
  protein,
  carbs,
  fat,
  variant = 'compact',
  className = ''
}: MacroChipsProps) {
  const macros = getMacros({ calories, protein, carbs, fat });
  const items = [
  { key: 'P', value: macros.protein, color: '#4CAF50' },
  { key: 'C', value: macros.carbs, color: '#2196F3' },
  { key: 'F', value: macros.fat, color: '#FF9800' }];


  const compact = variant === 'compact';

  return (
    <ul
      className={`flex items-center ${compact ? 'gap-1.5' : 'gap-2'} ${className}`}
      aria-label={`Protein ${macros.protein} grams, carbs ${macros.carbs} grams, fat ${macros.fat} grams`}>
      
      {items.map((item) =>
      <li
        key={item.key}
        className={`flex items-center rounded-md bg-[#F4F6F5] ${
        compact ? 'gap-1 px-1.5 py-0.5 text-[10px]' : 'gap-1.5 px-2 py-1 text-xs'} font-semibold text-[#3C463F]`
        }>
        
          <span
          className={`${compact ? 'h-1.5 w-1.5' : 'h-2 w-2'} rounded-full`}
          style={{ backgroundColor: item.color }}
          aria-hidden="true" />
        
          {item.key} {item.value}g
        </li>
      )}
    </ul>);

}