import React, { useMemo, useState } from 'react';
import {
  ArrowLeftIcon,
  CheckIcon,
  PlusIcon,
  SparklesIcon,
  Trash2Icon } from
'lucide-react';
import { useMealPlan } from '../contexts/MealPlanContext';
import { ToastNotification } from './ToastNotification';
import { aisleEmoji, aisleOrder, guessAisle } from '../utils/groceries';
import type { GroceryAisle } from '../types/shopping';
import { haptic } from '../lib/haptics';

interface ShoppingListScreenProps {
  navigateTo: (screen: string) => void;
}

export const ShoppingListScreen: React.FC<ShoppingListScreenProps> = ({ navigateTo }) => {
  const {
    shoppingList,
    addToShoppingList,
    toggleShoppingItem,
    removeShoppingItem,
    clearCheckedShoppingItems,
    setAllShoppingItemsChecked
  } = useMealPlan();
  const [draft, setDraft] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const checkedCount = shoppingList.filter((item) => item.checked).length;
  const total = shoppingList.length;
  const percentage = total ? Math.round(checkedCount / total * 100) : 0;
  const allChecked = total > 0 && checkedCount === total;

  const grouped = useMemo(() => {
    return aisleOrder.
    map((aisle) => ({
      aisle,
      items: shoppingList.filter((item) => item.aisle === aisle)
    })).
    filter((group) => group.items.length > 0);
  }, [shoppingList]);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(''), 2000);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    const name = draft.trim();
    if (!name) return;
    const added = addToShoppingList([{ name, aisle: guessAisle(name) }]);
    setDraft('');
    haptic('selection');
    showToast(added ? `${name} added` : `${name} is already on your list`);
  };

  const handleToggle = (itemId: string) => {
    haptic('selection');
    toggleShoppingItem(itemId);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] pb-8">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-6 pb-4 pt-12 backdrop-blur">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            aria-label="Back to Today"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A1A1A] transition-colors hover:bg-[#E5E7EB]">
            
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-lg font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-heading)' }}>
            Shopping list
          </h1>
          <button
            type="button"
            onClick={() => {
              haptic('light');
              setAllShoppingItemsChecked(!allChecked);
            }}
            disabled={total === 0}
            className="text-sm font-semibold text-[#4CAF50] transition-colors hover:text-[#3d9440] disabled:text-[#C7CFCA]">
            
            {allChecked ? 'Uncheck all' : 'Check all'}
          </button>
        </div>

        {total > 0 &&
        <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
              <span>
                {checkedCount} of {total} in the basket
              </span>
              <span>{percentage}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EDF0EE]">
              <span
              className="block h-full rounded-full bg-[#4CAF50] transition-[width] duration-300 ease-out"
              style={{ width: `${percentage}%` }} />
            
            </div>
          </div>
        }
      </header>

      <div className="px-6 pt-5">
        <form onSubmit={handleAdd} className="flex items-center gap-2">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Add an item…"
            aria-label="Add an item to your shopping list"
            className="h-12 flex-1 rounded-xl border border-[#E1E6E3] bg-white px-4 text-sm font-medium text-[#1A1A1A] outline-none placeholder:font-normal placeholder:text-[#A7AFA9] focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/15" />
          
          <button
            type="submit"
            disabled={!draft.trim()}
            aria-label="Add item"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1A1A1A] text-white transition-colors hover:bg-[#2A2A2A] disabled:bg-[#E7EBE9] disabled:text-[#9AA39E]">
            
            <PlusIcon size={20} />
          </button>
        </form>
      </div>

      {total === 0 ?
      <div className="flex flex-col items-center px-6 pt-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F5E9] text-3xl">🛒</div>
          <h2 className="mt-5 text-xl font-bold text-[#1A1A1A]">Your list is empty</h2>
          <p className="mt-2 max-w-[300px] text-sm leading-relaxed text-[#64748B]">
            When a recipe needs something you don’t have, add the missing ingredients here and shop them in one trip.
          </p>
          <button
          type="button"
          onClick={() => navigateTo('recipe-discovery')}
          className="mt-7 flex items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#2A2A2A]">
          
            <SparklesIcon size={17} className="mr-2" /> Find a recipe to cook
          </button>
        </div> :

      <div className="px-6 pt-6">
          {grouped.map((group) =>
        <section key={group.aisle} className="mb-6">
              <div className="mb-2.5 flex items-center gap-2">
                <span aria-hidden="true">{aisleEmoji[group.aisle as GroceryAisle]}</span>
                <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">{group.aisle}</h2>
                <span className="text-xs font-semibold text-[#A7AFA9]">{group.items.length}</span>
              </div>
              <ul className="space-y-2">
                {group.items.map((item) =>
            <li key={item.id}>
                    <div
                className={`flex items-center gap-3 rounded-2xl border p-3 transition-colors ${item.checked ? 'border-[#E1E6E3] bg-[#F4F7F5]' : 'border-gray-100 bg-white shadow-sm'}`}>
                
                      <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  role="checkbox"
                  aria-checked={item.checked}
                  aria-label={`Mark ${item.name} as bought`}
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all ${item.checked ? 'border-[#4CAF50] bg-[#4CAF50] text-white' : 'border-[#C7CFCA] bg-white text-transparent hover:border-[#4CAF50]'}`}>
                  
                        <CheckIcon size={15} strokeWidth={3} />
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className={`truncate text-sm font-semibold ${item.checked ? 'text-[#9AA39E] line-through' : 'text-[#1A1A1A]'}`}>
                          {item.name}
                          {item.quantity && <span className="ml-1.5 font-normal text-[#64748B]">{item.quantity}</span>}
                        </p>
                        {item.recipeName &&
                  <p className="mt-0.5 truncate text-xs text-[#94A3B8]">for {item.recipeName}</p>
                  }
                      </div>
                      <button
                  type="button"
                  onClick={() => removeShoppingItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#A7AFA9] transition-colors hover:bg-[#F3F4F6] hover:text-[#EF4444]">
                  
                        <Trash2Icon size={16} />
                      </button>
                    </div>
                  </li>
            )}
              </ul>
            </section>
        )}

          <div className="mt-2 space-y-3">
            {checkedCount > 0 &&
          <button
            type="button"
            onClick={() => {
              clearCheckedShoppingItems();
              showToast('Bought items cleared');
            }}
            className="h-12 w-full rounded-xl bg-[#F3F4F6] text-sm font-semibold text-[#374151] transition-colors hover:bg-[#E5E7EB]">
            
                Clear {checkedCount} bought {checkedCount === 1 ? 'item' : 'items'}
              </button>
          }
            {allChecked &&
          <button
            type="button"
            onClick={() => navigateTo('ingredient-capture')}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#4CAF50] text-base font-bold text-white shadow-[0_4px_0_#2F7D34] transition-all hover:bg-[#43A047] active:translate-y-0.5 active:shadow-[0_2px_0_#2F7D34]">
            
                <SparklesIcon size={18} className="mr-2" /> Got everything — scan it in
              </button>
          }
          </div>
        </div>
      }

      {toastMessage && <ToastNotification message={toastMessage} />}
    </div>);

};