import React, { useMemo, useState } from 'react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  PlusIcon,
  ScanLineIcon,
  Trash2Icon } from
'lucide-react';
import { useMealPlan } from '../contexts/MealPlanContext';
import { ToastNotification } from './ToastNotification';
import { MealRail } from './shopping/MealRail';
import { ShoppingListEmptyState } from './shopping/ShoppingListEmptyState';
import { aisleEmoji, aisleOrder, guessAisle } from '../utils/groceries';
import type { GroceryAisle, ShoppingListMeal } from '../types/shopping';
import { haptic } from '../lib/haptics';

interface ShoppingListScreenProps {
  navigateTo: (screen: string) => void;
  /** Starts on the empty state, so it can be previewed with items already seeded. */
  startEmpty?: boolean;
}

export const ShoppingListScreen: React.FC<ShoppingListScreenProps> = ({ navigateTo, startEmpty = false }) => {
  const {
    shoppingList,
    addToShoppingList,
    toggleShoppingItem,
    removeShoppingItem,
    clearCheckedShoppingItems,
    setAllShoppingItemsChecked
  } = useMealPlan();
  const [draft, setDraft] = useState('');
  const [activeMeal, setActiveMeal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  // Cleared as soon as the user adds their first item.
  const [previewEmpty, setPreviewEmpty] = useState(startEmpty);
  const isEmpty = previewEmpty || shoppingList.length === 0;

  // Meals the list was built from, with how many of their items are still needed.
  const meals = useMemo<ShoppingListMeal[]>(() => {
    const byName = new Map<string, ShoppingListMeal>();
    shoppingList.forEach((item) => {
      if (!item.recipeName) return;
      const existing = byName.get(item.recipeName);
      if (existing) {
        existing.total += 1;
        existing.remaining += item.checked ? 0 : 1;
        return;
      }
      byName.set(item.recipeName, {
        name: item.recipeName,
        image: item.recipeImage,
        plannedFor: item.plannedFor,
        total: 1,
        remaining: item.checked ? 0 : 1
      });
    });
    return Array.from(byName.values());
  }, [shoppingList]);

  const visibleItems = useMemo(
    () => activeMeal ? shoppingList.filter((item) => item.recipeName === activeMeal) : shoppingList,
    [shoppingList, activeMeal]
  );

  const checkedCount = visibleItems.filter((item) => item.checked).length;
  const total = visibleItems.length;
  const percentage = total ? Math.round(checkedCount / total * 100) : 0;
  const allChecked = total > 0 && checkedCount === total;
  const extrasCount = shoppingList.filter((item) => !item.recipeName).length;

  const grouped = useMemo(() => {
    return aisleOrder.
    map((aisle) => ({
      aisle,
      items: visibleItems.filter((item) => item.aisle === aisle)
    })).
    filter((group) => group.items.length > 0);
  }, [visibleItems]);

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
    setPreviewEmpty(false);
    haptic('selection');
    showToast(added ? `${name} added` : `${name} is already on your list`);
  };

  const handleToggle = (itemId: string) => {
    haptic('selection');
    toggleShoppingItem(itemId);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] pb-8">
      <style>{`
        @keyframes cp-complete-in { from { opacity: 0; transform: translateY(14px) scale(0.985) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @media (prefers-reduced-motion: reduce) { .cp-complete { animation: none !important; } }
      `}</style>
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
            disabled={isEmpty}
            className="text-sm font-semibold text-[#4CAF50] transition-colors hover:text-[#3d9440] disabled:text-[#C7CFCA]">
            
            {allChecked ? 'Uncheck all' : 'Check all'}
          </button>
        </div>

        {!isEmpty && total > 0 &&
        <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
              <span>
                {checkedCount} of {total} in the basket
                {activeMeal ? ` · ${activeMeal}` : ''}
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

      {!isEmpty && meals.length > 0 &&
      <section className="px-6 pt-5" aria-label="Meals on this list">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">Shopping for</h2>
            <span className="text-xs text-[#94A3B8]">
              {meals.length} {meals.length === 1 ? 'meal' : 'meals'}
              {extrasCount > 0 ? ` · ${extrasCount} extra` : ''}
            </span>
          </div>
          <MealRail meals={meals} activeMeal={activeMeal} onSelect={setActiveMeal} />
        </section>
      }

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

      {isEmpty ?
      <ShoppingListEmptyState
        navigateTo={navigateTo}
        onAdded={(message) => {
          setPreviewEmpty(false);
          showToast(message);
        }} /> :


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
                        {item.recipeName ?
                  <button
                    type="button"
                    onClick={() => setActiveMeal(item.recipeName ?? null)}
                    className="mt-1 flex items-center gap-1.5 text-left">
                    
                            {item.recipeImage &&
                    <img
                      src={item.recipeImage}
                      alt=""
                      className="h-4 w-4 shrink-0 rounded-full object-cover" />

                    }
                            <span className="truncate text-xs text-[#94A3B8]">
                              {item.recipeName}
                              {item.plannedFor ? ` · ${item.plannedFor}` : ''}
                            </span>
                          </button> :

                  <p className="mt-1 text-xs text-[#94A3B8]">Extra item</p>
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
          <div
            className="cp-complete overflow-hidden rounded-2xl bg-[#1A1A1A] p-4 shadow-[0_10px_28px_rgba(26,26,26,0.18)]"
            style={{ animation: 'cp-complete-in 460ms cubic-bezier(0.22, 1, 0.36, 1) both' }}>
            
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4CAF50] text-white">
                    <CheckIcon size={20} strokeWidth={3} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white">
                      {activeMeal ? `${activeMeal} is ready to cook` : 'Basket complete'}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/65">
                      Scan your haul so Cal Pal knows what’s in your kitchen.
                    </p>
                  </div>
                </div>
                <button
              type="button"
              onClick={() => navigateTo('ingredient-capture')}
              className="group mt-3.5 flex w-full items-center justify-center rounded-xl bg-[#4CAF50] py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#43A047] active:scale-[0.99]">
              
                  <ScanLineIcon size={18} className="mr-2" />
                  Scan what I bought
                  <ArrowRightIcon
                size={17}
                className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5" />
              
                </button>
              </div>
          }
          </div>
        </div>
      }

      {toastMessage && <ToastNotification message={toastMessage} />}
    </div>);

};