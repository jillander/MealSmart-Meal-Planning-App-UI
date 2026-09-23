import React, { useMemo, useState } from 'react';
import {
  ChevronRightIcon,
  ClockIcon,
  FlameIcon,
  FilterIcon,
  SearchIcon,
  SparklesIcon,
  ShoppingBagIcon,
  ChefHatIcon,
  HeartIcon,
  BookmarkIcon,
  LightbulbIcon,
  TrendingUpIcon,
  TimerIcon,
  PackageIcon,
  DumbbellIcon,
  UtensilsIcon,
  SnowflakeIcon,
  PlusIcon } from
'lucide-react';
import { AddToMealPlanModal } from './AddToMealPlanModal';
import { MacroChips } from './MacroChips';
import { ToastNotification } from './ToastNotification';
import { useMealPlan } from '../contexts/MealPlanContext';
import { HubFilterSheet } from './discover/HubFilterSheet';
import { HubActiveFilterBar } from './discover/HubActiveFilterBar';
import { RecipeSearchScreen } from './discover/RecipeSearchScreen';
import { SearchChips } from './discover/SearchChips';
import {
  applyHubFilters,
  countActiveHubFilters,
  dietaryOptions,
  emptyHubFilters } from
'../utils/hubFilters';
import type { HubFilters, HubRecipe } from '../utils/hubFilters';
import {
  applyHubSearch,
  countIngredientMatches,
  emptyHubSearch,
  hasActiveSearch } from
'../utils/hubSearch';
import type { HubSearch } from '../utils/hubSearch';
import {
  allHubRecipes,
  forYouRecipes,
  pantryRecipes,
  perfectMatchRecipes,
  quickAndEasyRecipes,
  trendingRecipes } from
'../data/hubRecipes';
interface RecipeRecommendationHubProps {
  navigateTo: (screen: string) => void;
  /** Open straight onto search or results, for Screens previews. */
  initialView?: 'idle' | 'search' | 'results' | 'filters' | 'empty';
}
type Recipe = HubRecipe;
interface CollectionShortcut {
  id: string;
  label: string;
  image: string;
}
export const RecipeRecommendationHub: React.FC<
  RecipeRecommendationHubProps> =
({ navigateTo, initialView = 'idle' }) => {
  const demoFilters: HubFilters =
  initialView === 'results' || initialView === 'filters' ?
  { ...emptyHubFilters, meals: ['Dinner'] } :
  initialView === 'empty' ?
  { ...emptyHubFilters, maxTime: 15, dietary: ['Vegan'] } :
  emptyHubFilters;
  const demoSearch: HubSearch =
  initialView === 'results' || initialView === 'filters' ?
  { ingredients: ['Chicken', 'Pasta'], dishQueries: [] } :
  initialView === 'empty' ?
  { ingredients: ['Chicken', 'Tofu'], dishQueries: [] } :
  initialView === 'search' ?
  { ingredients: ['Chicken', 'Pasta'], dishQueries: [] } :
  emptyHubSearch;

  const [filters, setFilters] = useState<HubFilters>(demoFilters);
  const [draftFilters, setDraftFilters] = useState<HubFilters>(demoFilters);
  const [search, setSearch] = useState<HubSearch>(demoSearch);
  const [showSearch, setShowSearch] = useState(initialView === 'search');
  const [showFilters, setShowFilters] = useState(initialView === 'filters');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<string[]>([]);
  const [showAddToMealPlan, setShowAddToMealPlan] = useState(false);
  const [selectedRecipeForPlan, setSelectedRecipeForPlan] =
  useState<Recipe | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    visible: boolean;
  }>({
    message: '',
    visible: false
  });
  // Use the meal plan context
  const { addMeal, generatedRecipes } = useMealPlan();
  const collections: CollectionShortcut[] = [
  {
    id: 'high-protein',
    label: 'High Protein, Low Cal',
    image:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'quick-healthy',
    label: 'Quick, Healthy Dinner',
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'batch-cook',
    label: 'Batch Cook',
    image:
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'protein-dinners',
    label: '+45g Protein Dinners',
    image:
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'meal-prep',
    label: 'Meal Prep',
    image:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'freezer',
    label: 'Freezer Friendly',
    image:
    'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }];

  // One shared vocabulary with the Filters sheet — the chips ARE the filter.
  const dietaryFilters = dietaryOptions;
  // Every carousel draws from one pool, so search and filters cover all of them.
  const allRecipes = allHubRecipes;
  const activeFilterCount = countActiveHubFilters(filters);
  const searchActive = hasActiveSearch(search);
  /** Search AND filters — each constraint narrows the same list. */
  const filteredRecipes = useMemo(
    () => applyHubFilters(applyHubSearch(allRecipes, search), filters),
    [allRecipes, search, filters]
  );
  const draftCount = useMemo(
    () => applyHubFilters(applyHubSearch(allRecipes, search), draftFilters).length,
    [allRecipes, search, draftFilters]
  );
  const showResults = activeFilterCount > 0 || searchActive;
  const toggleFilter = (filter: string) => {
    const next = {
      ...filters,
      dietary: filters.dietary.includes(filter) ?
      filters.dietary.filter((entry) => entry !== filter) :
      [...filters.dietary, filter]
    };
    setFilters(next);
    setDraftFilters(next);
  };
  const toggleSave = (recipeId: string) => {
    setSavedRecipes((current) =>
    current.includes(recipeId) ?
    current.filter((id) => id !== recipeId) :
    [...current, recipeId]
    );
  };
  const toggleLike = (recipeId: string) => {
    setLikedRecipes((current) =>
    current.includes(recipeId) ?
    current.filter((id) => id !== recipeId) :
    [...current, recipeId]
    );
  };
  const handleCollectionClick = (collectionId: string) => {
    // Navigate to category browse screen with collection data
    const collection = collections.find((c) => c.id === collectionId);
    if (collection) {
      // Store the selected category in a way that can be passed to CategoryBrowseScreen
      // For now, we'll use the navigateTo function with a special format
      navigateTo(`category-browse:${collectionId}:${collection.label}`);
    }
  };
  const showToast = (message: string) => {
    setToast({
      message,
      visible: true
    });
    setTimeout(
      () =>
      setToast({
        message: '',
        visible: false
      }),
      3000
    );
  };
  const handleAddToMealPlan = (recipe: Recipe) => {
    setSelectedRecipeForPlan(recipe);
    setShowAddToMealPlan(true);
  };
  const handleConfirmAddToMealPlan = (
  date: Date,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') =>
  {
    if (selectedRecipeForPlan) {
      // Add the meal to the context
      addMeal(
        {
          id: selectedRecipeForPlan.id,
          title: selectedRecipeForPlan.title,
          image: selectedRecipeForPlan.image,
          cookingTime: selectedRecipeForPlan.cookingTime,
          calories: selectedRecipeForPlan.calories,
          protein: selectedRecipeForPlan.protein,
          carbs: selectedRecipeForPlan.carbs,
          fat: selectedRecipeForPlan.fat
        },
        date,
        mealType
      );
      showToast(
        `${selectedRecipeForPlan.title} added to ${mealType} on ${date.toLocaleDateString()}`
      );
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {/* Toast Notification */}
      {toast.visible && <ToastNotification message={toast.message} />}

      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-white text-[#1A1A1A]">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">For You</h1>
            <p className="text-sm text-[#64748B]">
              AI-powered recipe suggestions
            </p>
          </div>
          <button
            onClick={() => {
              setDraftFilters(filters);
              setShowFilters(true);
            }}
            aria-label="Filter recipes"
            className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
            activeFilterCount > 0 ?
            'bg-[#1A1A1A] text-white' :
            'bg-gray-100 text-[#1A1A1A] hover:bg-gray-200'}`
            }>
            
            <FilterIcon size={20} />
            {activeFilterCount > 0 &&
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4CAF50] px-1.5 text-[11px] font-extrabold text-white ring-2 ring-white">
                {activeFilterCount}
              </span>
            }
          </button>
        </div>

        {/* Search — opens a dedicated screen so many ingredients can be added */}
        <button
          type="button"
          onClick={() => setShowSearch(true)}
          className="mt-4 flex h-11 w-full items-center gap-2.5 rounded-full bg-[#F3F4F6] px-4 text-left transition-colors hover:bg-[#EBEDEF]">
          
          <SearchIcon size={18} className="shrink-0 text-[#9CA3AF]" />
          <span className="text-[15px] text-[#9CA3AF]">Search ingredients, recipes…</span>
        </button>

        <SearchChips
          search={search}
          meals={[]}
          onSearchChange={setSearch}
          onMealsChange={() => {}}
          className="mt-3" />
        
      </header>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Collection Shortcuts Grid — hidden once a search is running */}
        {!showResults &&
        <section className="px-6 py-4 bg-white border-b border-gray-100">
          <div className="grid grid-cols-2 gap-3">
            {collections.map((collection) => {
              const isSelected = selectedCollection === collection.id;
              return (
                <button
                  key={collection.id}
                  onClick={() => handleCollectionClick(collection.id)}
                  className={`
                    flex items-center p-2.5 rounded-2xl transition-all duration-200 active:scale-95
                    ${isSelected ? 'bg-[#E8F5E9] shadow-sm' : 'bg-[#F5F5F5] hover:bg-[#EEEEEE]'}
                  `}>
                  
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white">
                    <img
                      src={collection.image}
                      alt={collection.label}
                      className="w-full h-full object-cover" />
                    
                  </div>
                  <span
                    className={`ml-3 text-sm text-left leading-tight ${isSelected ? 'font-semibold text-[#1A1A1A]' : 'font-medium text-[#424242]'}`}>
                    
                    {collection.label}
                  </span>
                </button>);

            })}
          </div>
        </section>
        }

        {/* Quick dietary chips — same state as the Filters sheet */}
        {!showResults &&
        <section className="px-6 py-3 bg-white sticky top-0 z-10 border-b border-gray-100">
          <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-1">
            {dietaryFilters.map((filter) =>
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full border text-sm font-medium whitespace-nowrap transition-all ${filters.dietary.includes(filter) ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-sm' : 'border-[#E7EAE8] bg-white text-[#5B6660] hover:border-[#CFD6D2] hover:text-[#1A1A1A]'}`}>
              
                {filter}
              </button>
            )}
          </div>
        </section>
        }

        {/* Results — search AND filters, replacing the curated shelves */}
        {showResults &&
        <section className="px-6 py-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#1A1A1A]">
                {filteredRecipes.length}{' '}
                {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
                {search.ingredients.length > 0 &&
              <span className="ml-2 text-sm font-medium text-[#64748B]">
                    {search.ingredients.join(' · ')}
                  </span>
              }
              </h2>
              <button
              onClick={() => {
                setFilters(emptyHubFilters);
                setDraftFilters(emptyHubFilters);
                setSearch(emptyHubSearch);
              }}
              className="shrink-0 text-sm font-semibold text-[#757575] transition-colors hover:text-[#1A1A1A]">
              
                Clear all
              </button>
            </div>

            <SearchChips
            search={search}
            meals={[]}
            onSearchChange={setSearch}
            onMealsChange={() => {}}
            className="mb-3" />
          

            <HubActiveFilterBar
            filters={filters}
            onChange={(next) => {
              setFilters(next);
              setDraftFilters(next);
            }} />
          

            {filteredRecipes.length === 0 ?
          <div className="flex flex-col items-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
                  🍽️
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#1A1A1A]">
                  {search.ingredients.length > 0 ?
              'No recipes with these ingredients' :
              'No recipes match'}
                </h3>
                <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-[#64748B]">
                  Try removing a chip or loosening filters.
                </p>
                <div className="mt-6 flex w-full max-w-[280px] flex-col gap-2.5">
                  {search.ingredients.length > 0 &&
              <button
                type="button"
                onClick={() => setSearch({ ...search, ingredients: [] })}
                className="flex h-12 items-center justify-center rounded-xl bg-[#1A1A1A] text-sm font-bold text-white transition-colors hover:bg-[#2A2A2A]">
                
                      Clear ingredients
                    </button>
              }
                  <button
                type="button"
                onClick={() => {
                  setSearch(emptyHubSearch);
                  setFilters(emptyHubFilters);
                  setDraftFilters(emptyHubFilters);
                }}
                className="flex h-12 items-center justify-center rounded-xl border border-[#DDE2DF] bg-white text-sm font-bold text-[#1A1A1A] transition-colors hover:bg-[#FAFBFA]">
                
                    Reset all
                  </button>
                </div>
              </div> :

          <div className="grid grid-cols-2 gap-3">
                {filteredRecipes.map((recipe) => {
              const matches = countIngredientMatches(recipe, search.ingredients);
              return (
                <div
                  key={recipe.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  
                    <div
                    className="relative cursor-pointer"
                    onClick={() => navigateTo('recipe-detail')}>
                    
                      <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-[120px] object-cover" />
                    
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToMealPlan(recipe);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
                      aria-label={`Add ${recipe.title} to meal plan`}>
                      
                        <PlusIcon size={16} className="text-[#1A1A1A]" />
                      </button>
                      <span className="absolute bottom-2 left-2.5 text-[10px] font-semibold text-white bg-[#4CAF50]/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        {recipe.matchPercentage}% match
                      </span>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-[#1A1A1A] text-sm mb-1 line-clamp-1">
                        {recipe.title}
                      </h3>
                      {matches > 0 &&
                    <p className="mb-1 text-[11px] font-semibold text-[#4CAF50]">
                          {matches} ingredient{matches === 1 ? '' : 's'} match
                        </p>
                    }
                      <div className="flex items-center justify-between text-xs text-[#64748B]">
                        <div className="flex items-center">
                          <ClockIcon size={11} className="mr-1" />
                          <span>{recipe.cookingTime}</span>
                        </div>
                        <span>{recipe.calories} cal</span>
                      </div>
                      <MacroChips
                      calories={recipe.calories}
                      protein={recipe.protein}
                      className="mt-2" />
                    
                    </div>
                  </div>);

            })}
              </div>
          }
          </section>
        }

        {/* Curated rails — hidden while search or filters are narrowing */}
        {!showResults &&
        <>
        {/* Your Generated Recipes */}
        {generatedRecipes && generatedRecipes.length > 0 &&
          <section className="py-5">
            <div className="px-6 mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center">
                Your Generated Recipes
                <SparklesIcon size={16} className="ml-2 text-[#4CAF50]" />
              </h2>
              <button
                onClick={() => navigateTo('recipe-suggestions')}
                className="text-[#4CAF50] text-sm font-medium flex items-center hover:text-[#43A047] transition-colors">
                
                View All <ChevronRightIcon size={16} />
              </button>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-3 pl-6 pr-3">
                {generatedRecipes.map((recipe) =>
                <div
                  key={recipe.id}
                  className="flex-shrink-0 w-[220px] bg-white rounded-2xl shadow-sm overflow-hidden border border-[#4CAF50]/20">
                  
                    <div
                    className="relative cursor-pointer"
                    onClick={() => navigateTo('recipe-detail')}>
                    
                      <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-[150px] object-cover" />
                    
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToMealPlan({
                          id: recipe.id,
                          title: recipe.name,
                          image: recipe.image,
                          cookingTime: recipe.prepTime,
                          calories: recipe.calories,
                          matchPercentage: recipe.matchPercentage,
                          difficulty: recipe.difficulty,
                          tags: recipe.dietaryTags,
                          saved: false,
                          liked: false
                        });
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
                      aria-label="Add to meal plan">
                      
                        <PlusIcon size={16} className="text-[#1A1A1A]" />
                      </button>
                      <div className="absolute bottom-2.5 left-3">
                        <span className="text-[10px] font-semibold text-white bg-[#4CAF50]/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                          {recipe.matchPercentage}% match
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-[#1A1A1A] text-sm mb-1.5 line-clamp-1">
                        {recipe.name}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-[#64748B]">
                        <div className="flex items-center">
                          <ClockIcon size={11} className="mr-1" />
                          <span>{recipe.prepTime}</span>
                        </div>
                        <span>{recipe.calories} cal</span>
                      </div>
                      <MacroChips
                      calories={recipe.calories}
                      protein={recipe.protein}
                      carbs={recipe.carbs}
                      fat={recipe.fat}
                      className="mt-2" />
                    
                    </div>
                  </div>
                )}
                <div className="flex-shrink-0 w-3" />
              </div>
            </div>
          </section>
          }

        {/* Recommended For You */}
        <section className="py-5">
          <div className="px-6 mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1A1A1A]">
              Recommended For You
            </h2>
            <button className="text-[#4CAF50] text-sm font-medium flex items-center hover:text-[#43A047] transition-colors">
              View All <ChevronRightIcon size={16} />
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-3 pl-6 pr-3">
              {forYouRecipes.map((recipe) =>
                <div
                  key={recipe.id}
                  className="flex-shrink-0 w-[220px] bg-white rounded-2xl shadow-sm overflow-hidden">
                  
                  <div
                    className="relative cursor-pointer"
                    onClick={() => navigateTo('recipe-detail')}>
                    
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-[150px] object-cover" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToMealPlan(recipe);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
                      aria-label="Add to meal plan">
                      
                      <PlusIcon size={16} className="text-[#1A1A1A]" />
                    </button>
                    <div className="absolute bottom-2.5 left-3">
                      <span className="text-[10px] font-semibold text-white bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        {recipe.matchPercentage}% match
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-[#1A1A1A] text-sm mb-1.5 line-clamp-1">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <div className="flex items-center">
                        <ClockIcon size={11} className="mr-1" />
                        <span>{recipe.cookingTime}</span>
                      </div>
                      <span>{recipe.calories} cal</span>
                    </div>
                    <MacroChips
                      calories={recipe.calories}
                      protein={recipe.protein}
                      className="mt-2" />
                    
                  </div>
                </div>
                )}
              {/* Peek spacer */}
              <div className="flex-shrink-0 w-3" />
            </div>
          </div>
        </section>

        {/* Perfect Match */}
        <section className="py-5">
          <div className="px-6 mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center">
              Perfect Match
              <span className="ml-2 text-xs px-2 py-0.5 bg-[#4CAF50]/10 text-[#4CAF50] rounded-full font-medium">
                90%+ match
              </span>
            </h2>
            <button className="text-[#4CAF50] text-sm font-medium flex items-center hover:text-[#43A047] transition-colors">
              View All <ChevronRightIcon size={16} />
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-3 pl-6 pr-3">
              {perfectMatchRecipes.map((recipe) =>
                <div
                  key={recipe.id}
                  className="flex-shrink-0 w-[220px] bg-white rounded-2xl overflow-hidden shadow-sm border border-[#4CAF50]/20">
                  
                  <div
                    className="relative cursor-pointer"
                    onClick={() => navigateTo('recipe-detail')}>
                    
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-[150px] object-cover" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToMealPlan(recipe);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
                      aria-label="Add to meal plan">
                      
                      <PlusIcon size={16} className="text-[#1A1A1A]" />
                    </button>
                    <div className="absolute bottom-2.5 left-3">
                      <span className="text-[10px] font-semibold text-white bg-[#4CAF50]/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        {recipe.matchPercentage}% match
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-[#1A1A1A] text-sm mb-1.5 line-clamp-1">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <div className="flex items-center">
                        <ClockIcon size={11} className="mr-1" />
                        <span>{recipe.cookingTime}</span>
                      </div>
                      <span>{recipe.calories} cal</span>
                    </div>
                    <MacroChips
                      calories={recipe.calories}
                      protein={recipe.protein}
                      className="mt-2" />
                    
                  </div>
                </div>
                )}
              <div className="flex-shrink-0 w-3" />
            </div>
          </div>
        </section>

        {/* Quick & Easy */}
        <section className="py-5">
          <div className="px-6 mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center">
              Quick & Easy
              <span className="ml-2 text-xs px-2 py-0.5 bg-[#2196F3]/10 text-[#2196F3] rounded-full font-medium">
                Under 20 min
              </span>
            </h2>
            <button className="text-[#4CAF50] text-sm font-medium flex items-center hover:text-[#43A047] transition-colors">
              View All <ChevronRightIcon size={16} />
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-3 pl-6 pr-3">
              {quickAndEasyRecipes.map((recipe) =>
                <div
                  key={recipe.id}
                  className="flex-shrink-0 w-[220px] bg-white rounded-2xl shadow-sm overflow-hidden">
                  
                  <div
                    className="relative cursor-pointer"
                    onClick={() => navigateTo('recipe-detail')}>
                    
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-[150px] object-cover" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToMealPlan(recipe);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
                      aria-label="Add to meal plan">
                      
                      <PlusIcon size={16} className="text-[#1A1A1A]" />
                    </button>
                    <div className="absolute bottom-2.5 left-3">
                      <span className="text-[10px] font-semibold text-white bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        {recipe.cookingTime}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-[#1A1A1A] text-sm mb-1.5 line-clamp-1">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <div className="flex items-center">
                        <ClockIcon size={11} className="mr-1" />
                        <span>{recipe.cookingTime}</span>
                      </div>
                      <span>{recipe.calories} cal</span>
                    </div>
                    <MacroChips
                      calories={recipe.calories}
                      protein={recipe.protein}
                      className="mt-2" />
                    
                  </div>
                </div>
                )}
              <div className="flex-shrink-0 w-3" />
            </div>
          </div>
        </section>

        {/* Trending Now */}
        <section className="py-5">
          <div className="px-6 mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center">
              Trending Now
              <FlameIcon size={16} className="ml-2 text-[#F44336]" />
            </h2>
            <button className="text-[#4CAF50] text-sm font-medium flex items-center hover:text-[#43A047] transition-colors">
              View All <ChevronRightIcon size={16} />
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-3 pl-6 pr-3">
              {trendingRecipes.map((recipe) =>
                <div
                  key={recipe.id}
                  className="flex-shrink-0 w-[220px] bg-white rounded-2xl shadow-sm overflow-hidden">
                  
                  <div
                    className="relative cursor-pointer"
                    onClick={() => navigateTo('recipe-detail')}>
                    
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-[150px] object-cover" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToMealPlan(recipe);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
                      aria-label="Add to meal plan">
                      
                      <PlusIcon size={16} className="text-[#1A1A1A]" />
                    </button>
                    <div className="absolute bottom-2.5 left-3 flex items-center space-x-1.5">
                      <FlameIcon size={12} className="text-[#F44336]" />
                      <span className="text-[10px] font-semibold text-white bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        Trending
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-[#1A1A1A] text-sm mb-1.5 line-clamp-1">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <div className="flex items-center">
                        <ClockIcon size={11} className="mr-1" />
                        <span>{recipe.cookingTime}</span>
                      </div>
                      <span>{recipe.calories} cal</span>
                    </div>
                    <MacroChips
                      calories={recipe.calories}
                      protein={recipe.protein}
                      className="mt-2" />
                    
                  </div>
                </div>
                )}
              <div className="flex-shrink-0 w-3" />
            </div>
          </div>
        </section>

        {/* Pantry Challenge */}
        <section className="py-5">
          <div className="px-6 mb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center">
                Pantry Challenge
                <LightbulbIcon size={16} className="ml-2 text-[#FFB800]" />
              </h2>
              <button className="text-[#4CAF50] text-sm font-medium flex items-center hover:text-[#43A047] transition-colors">
                View All <ChevronRightIcon size={16} />
              </button>
            </div>
            <p className="text-sm text-[#64748B] mt-0.5">
              Creative recipes using only what you already have
            </p>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-3 pl-6 pr-3">
              {pantryRecipes.map((recipe) =>
                <div
                  key={recipe.id}
                  className="flex-shrink-0 w-[220px] bg-white rounded-2xl shadow-sm overflow-hidden">
                  
                  <div
                    className="relative cursor-pointer"
                    onClick={() => navigateTo('recipe-detail')}>
                    
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-[150px] object-cover" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToMealPlan(recipe);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
                      aria-label="Add to meal plan">
                      
                      <PlusIcon size={16} className="text-[#1A1A1A]" />
                    </button>
                    <div className="absolute bottom-2.5 left-3">
                      <span className="text-[10px] font-semibold text-white bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        100% pantry match
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-[#1A1A1A] text-sm mb-1.5 line-clamp-1">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <div className="flex items-center">
                        <ClockIcon size={11} className="mr-1" />
                        <span>{recipe.cookingTime}</span>
                      </div>
                      <span>{recipe.calories} cal</span>
                    </div>
                    <MacroChips
                      calories={recipe.calories}
                      protein={recipe.protein}
                      className="mt-2" />
                    
                  </div>
                </div>
                )}
              <div className="flex-shrink-0 w-3" />
            </div>
          </div>
        </section>
          </>
        }
      </div>

      {/* Search pushes over Discover; filters stay one tap away inside it */}
      {showSearch &&
      <RecipeSearchScreen
        search={search}
        meals={filters.meals}
        resultCount={filteredRecipes.length}
        onSearchChange={setSearch}
        onMealsChange={(meals) => {
          setFilters({ ...filters, meals });
          setDraftFilters({ ...draftFilters, meals });
        }}
        onOpenFilters={() => {
          setDraftFilters(filters);
          setShowFilters(true);
        }}
        onSubmit={() => setShowSearch(false)}
        onBack={() => setShowSearch(false)} />

      }

      <HubFilterSheet
        open={showFilters}
        filters={filters}
        previewCount={draftCount}
        onPreview={setDraftFilters}
        onApply={(next) => {
          setFilters(next);
          setDraftFilters(next);
          setShowFilters(false);
          setShowSearch(false);
        }}
        onClose={() => setShowFilters(false)} />
      

      {/* Add to Meal Plan Modal */}
      {showAddToMealPlan && selectedRecipeForPlan &&
      <AddToMealPlanModal
        recipe={{
          id: selectedRecipeForPlan.id,
          title: selectedRecipeForPlan.title,
          image: selectedRecipeForPlan.image,
          cookingTime: selectedRecipeForPlan.cookingTime,
          calories: selectedRecipeForPlan.calories
        }}
        onClose={() => {
          setShowAddToMealPlan(false);
          setSelectedRecipeForPlan(null);
        }}
        onAdd={handleConfirmAddToMealPlan} />

      }
    </div>);

};