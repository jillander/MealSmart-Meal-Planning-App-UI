import React from 'react';
import { CheckIcon, PlusIcon } from 'lucide-react';

export interface PantryItem {
  id: string;
  label: string;
  group: 'Protein' | 'Veg' | 'Staples';
}

export const pantryItems: PantryItem[] = [
{ id: 'chicken', label: 'Chicken', group: 'Protein' },
{ id: 'salmon', label: 'Salmon', group: 'Protein' },
{ id: 'eggs', label: 'Eggs', group: 'Protein' },
{ id: 'spinach', label: 'Spinach', group: 'Veg' },
{ id: 'tomatoes', label: 'Tomatoes', group: 'Veg' },
{ id: 'peppers', label: 'Peppers', group: 'Veg' },
{ id: 'broccoli', label: 'Broccoli', group: 'Veg' },
{ id: 'rice', label: 'Rice', group: 'Staples' },
{ id: 'pasta', label: 'Pasta', group: 'Staples' },
{ id: 'chickpeas', label: 'Chickpeas', group: 'Staples' }];


interface PantryPickerProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export function PantryPicker({ selected, onToggle }: PantryPickerProps) {
  const groups: PantryItem['group'][] = ['Protein', 'Veg', 'Staples'];

  return (
    <div className="space-y-4">
      {groups.map((group) =>
      <div key={group}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#68736D]">{group}</p>
          <div className="flex flex-wrap gap-2">
            {pantryItems.filter((item) => item.group === group).map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onToggle(item.id)}
                aria-pressed={isSelected}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors active:scale-[0.97] ${isSelected ? 'border-[#4CAF50] bg-[#4CAF50] text-white' : 'border-[#E1E6E3] bg-white text-[#59645E] hover:border-[#B7DDBB]'}`}>
                
                  {isSelected ? <CheckIcon size={14} strokeWidth={3} /> : <PlusIcon size={14} />}
                  {item.label}
                </button>);

          })}
          </div>
        </div>
      )}
    </div>);

}