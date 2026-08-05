import React from 'react';
import { CheckIcon, UtensilsCrossedIcon } from 'lucide-react';
import type { ShoppingListMeal } from '../../types/shopping';

interface MealRailProps {
  meals: ShoppingListMeal[];
  /** null means "All meals". */
  activeMeal: string | null;
  onSelect: (mealName: string | null) => void;
}

/** Horizontal rail of the meals this list was built from, doubling as a filter. */
export function MealRail({ meals, activeMeal, onSelect }: MealRailProps) {
  return (
    <div className="-mx-6 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onSelect(null)}
          aria-pressed={activeMeal === null}
          className="flex w-[74px] shrink-0 flex-col items-center text-center">
          
          <span
            className={`flex h-[70px] w-[70px] items-center justify-center rounded-full border-2 transition-colors ${
            activeMeal === null ?
            'border-[#4CAF50] bg-[#E8F5E9] text-[#4CAF50]' :
            'border-transparent bg-[#F1F3F2] text-[#94A3B8]'}`
            }>
            
            <UtensilsCrossedIcon size={24} />
          </span>
          <span className={`mt-2 text-xs font-bold ${activeMeal === null ? 'text-[#1A1A1A]' : 'text-[#64748B]'}`}>
            All meals
          </span>
        </button>

        {meals.map((meal) => {
          const isActive = activeMeal === meal.name;
          const isDone = meal.remaining === 0;
          return (
            <button
              key={meal.name}
              type="button"
              onClick={() => onSelect(isActive ? null : meal.name)}
              aria-pressed={isActive}
              className="flex w-[74px] shrink-0 flex-col items-center text-center">
              
              <span className="relative">
                <span
                  className={`block h-[70px] w-[70px] overflow-hidden rounded-full border-2 transition-colors ${
                  isActive ? 'border-[#4CAF50]' : 'border-transparent'}`
                  }>
                  
                  {meal.image ?
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className={`h-full w-full object-cover transition-opacity ${isDone ? 'opacity-45' : 'opacity-100'}`} /> :


                  <span className="flex h-full w-full items-center justify-center bg-[#F1F3F2] text-lg">🍽️</span>
                  }
                </span>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[10px] font-extrabold text-white shadow ring-2 ring-[#F8F9FA] ${
                  isDone ? 'bg-[#4CAF50]' : 'bg-[#1A1A1A]'}`
                  }>
                  
                  {isDone ? <CheckIcon size={12} strokeWidth={3} /> : meal.remaining}
                </span>
              </span>
              {meal.plannedFor &&
              <span className={`mt-1.5 text-[11px] font-extrabold ${isActive ? 'text-[#2F7D34]' : 'text-[#1A1A1A]'}`}>
                  {meal.plannedFor}
                </span>
              }
              <span className="mt-0.5 line-clamp-2 text-[11px] leading-tight text-[#64748B]">{meal.name}</span>
            </button>);

        })}
      </div>
    </div>);

}