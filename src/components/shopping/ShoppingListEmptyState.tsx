import React from 'react';
import { CompassIcon, PlusIcon, ScanLineIcon, ShoppingBasketIcon } from 'lucide-react';
import { useMealPlan } from '../../contexts/MealPlanContext';
import { haptic } from '../../lib/haptics';

interface ShoppingListEmptyStateProps {
  navigateTo: (screen: string) => void;
  onAdded: (message: string) => void;
}

/**
 * Empty shopping list. Rather than a dead end, it surfaces the recipes the user
 * is already interested in and lets them add each one's missing ingredients.
 */
export function ShoppingListEmptyState({ navigateTo, onAdded }: ShoppingListEmptyStateProps) {
  const { generatedRecipes, addToShoppingList } = useMealPlan();
  const suggestions = generatedRecipes.filter((recipe) => recipe.missingIngredients.length > 0).slice(0, 3);

  const handleAdd = (recipe: (typeof suggestions)[number]) => {
    const added = addToShoppingList(
      recipe.missingIngredients.map((ingredient) => ({
        name: ingredient,
        recipeName: recipe.name,
        recipeImage: recipe.image
      }))
    );
    haptic('selection');
    onAdded(
      added ?
      `${added} ${added === 1 ? 'item' : 'items'} added for ${recipe.name}` :
      'Those items are already on your list'
    );
  };

  return (
    <div className="px-6 pt-8">
      <style>{`
        @keyframes cp-empty-in { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        @media (prefers-reduced-motion: reduce) { .cp-empty { animation: none !important; } }
      `}</style>

      <div className="cp-empty text-center" style={{ animation: 'cp-empty-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both' }}>
        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-[#E8F5E9] text-[#4CAF50]">
          <ShoppingBasketIcon size={31} />
        </div>
        <h2
          className="mx-auto mt-5 max-w-[300px] text-[24px] font-bold leading-[1.18] tracking-tight text-[#1A1A1A]"
          style={{ fontFamily: 'var(--font-heading)' }}>
          
          Nothing to shop for yet
        </h2>
        <p className="mx-auto mt-2.5 max-w-[310px] text-[15px] leading-relaxed text-[#64748B]">
          When a recipe needs something your kitchen is missing, add it here and shop for every meal in one trip.
        </p>
      </div>

      {suggestions.length > 0 &&
      <section className="mt-8">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#64748B]">
            Missing for meals you’re considering
          </h3>
          <div className="space-y-2.5">
            {suggestions.map((recipe, index) =>
          <div
            key={recipe.id}
            className="cp-empty rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
            style={{ animation: `cp-empty-in 420ms cubic-bezier(0.22, 1, 0.36, 1) ${120 + index * 80}ms both` }}>
            
                <div className="flex items-center gap-3">
                  <img src={recipe.image} alt={recipe.name} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#1A1A1A]">{recipe.name}</p>
                    <p className="mt-0.5 truncate text-xs text-[#64748B]">
                      Needs {recipe.missingIngredients.join(', ')}
                    </p>
                  </div>
                  <button
                type="button"
                onClick={() => handleAdd(recipe)}
                className="flex h-9 shrink-0 items-center gap-1 rounded-full bg-[#1A1A1A] px-3 text-xs font-bold text-white transition-transform active:scale-95">
                
                    <PlusIcon size={14} />
                    {recipe.missingIngredients.length}
                  </button>
                </div>
              </div>
          )}
          </div>
        </section>
      }

      <section className="mt-8">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#64748B]">Or start from</h3>
        <div className="space-y-2">
          <StartRow
            icon={ScanLineIcon}
            label="Scan what you have"
            description="We’ll work out what’s missing for you"
            onClick={() => navigateTo('ingredient-capture')} />
          
          <StartRow
            icon={CompassIcon}
            label="Browse recipes"
            description="Pick a meal, then add its missing items"
            onClick={() => navigateTo('recipe-discovery')} />
          
        </div>
      </section>

      <p className="mt-7 text-center text-xs leading-relaxed text-[#94A3B8]">
        You can also type anything into the box above to add it yourself.
      </p>
    </div>);

}

interface StartRowProps {
  icon: React.ElementType;
  label: string;
  description: string;
  onClick: () => void;
}

function StartRow({ icon: Icon, label, description, onClick }: StartRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3.5 text-left shadow-sm transition-colors hover:border-[#B7DDBB]">
      
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#64748B]">
        <Icon size={19} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-[#1A1A1A]">{label}</span>
        <span className="mt-0.5 block truncate text-xs text-[#64748B]">{description}</span>
      </span>
    </button>);

}