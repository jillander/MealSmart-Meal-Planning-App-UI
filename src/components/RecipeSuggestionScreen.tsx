import React, { useEffect, useState } from 'react';
import {
  ArrowLeftIcon,
  FilterIcon,
  ClockIcon,
  XIcon,
  BookmarkIcon,
  PlusCircleIcon,
  ShoppingBagIcon,
  CalendarIcon,
  SearchIcon,
  ChefHatIcon } from
'lucide-react';
import { useMealPlan } from '../contexts/MealPlanContext';
import { AddToMealPlanModal } from './AddToMealPlanModal';
import { ToastNotification } from './ToastNotification';
interface RecipeSuggestionScreenProps {
  navigateTo: (screen: string) => void;
}
interface Recipe {
  id: string;
  name: string;
  image: string;
  matchPercentage: number;
  prepTime: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  missingIngredients: string[];
  cuisine: string;
  dietaryTags: string[];
  difficulty: string;
  inspiredBy: {
    name: string;
    handle: string;
    avatar: string;
  };
}
export const RecipeSuggestionScreen: React.FC<RecipeSuggestionScreenProps> = ({
  navigateTo
}) => {
  const {
    addSavedRecipe,
    removeSavedRecipe,
    isRecipeSaved,
    addMeal,
    addGeneratedRecipe
  } = useMealPlan();
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
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
  const [recipes, setRecipes] = useState<Recipe[]>([
  {
    id: 'gen-1',
    name: 'One-Pan Chicken and Rice',
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    matchPercentage: 95,
    prepTime: '30 min',
    calories: 450,
    protein: 38,
    carbs: 42,
    fat: 14,
    missingIngredients: ['Garlic', 'Thyme'],
    cuisine: 'Mediterranean',
    dietaryTags: ['High Protein', 'Gluten Free'],
    difficulty: 'Easy',
    inspiredBy: {
      name: 'Chef Maria',
      handle: '@chefmaria',
      avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'gen-2',
    name: 'Stir-Fried Rice Bowl',
    image:
    'https://images.unsplash.com/photo-1567337710282-00832b415979?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    matchPercentage: 85,
    prepTime: '20 min',
    calories: 380,
    protein: 22,
    carbs: 52,
    fat: 11,
    missingIngredients: ['Soy Sauce', 'Ginger'],
    cuisine: 'Asian',
    dietaryTags: ['Vegetarian'],
    difficulty: 'Medium',
    inspiredBy: {
      name: 'Wok Master',
      handle: '@wokmaster',
      avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'gen-3',
    name: 'Mediterranean Vegetable Bowl',
    image:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    matchPercentage: 78,
    prepTime: '25 min',
    calories: 320,
    protein: 18,
    carbs: 38,
    fat: 12,
    missingIngredients: ['Feta Cheese', 'Olives'],
    cuisine: 'Mediterranean',
    dietaryTags: ['Vegetarian', 'Low Carb'],
    difficulty: 'Easy',
    inspiredBy: {
      name: 'Green Kitchen',
      handle: '@greenkitchen',
      avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  }]
  );
  useEffect(() => {
    recipes.forEach((recipe) => addGeneratedRecipe(recipe));
  }, []);
  const cuisineTypes = [
  'all',
  'Mediterranean',
  'Asian',
  'Italian',
  'Mexican',
  'American'];

  const dietaryFilters = [
  'Vegetarian',
  'Vegan',
  'Gluten Free',
  'High Protein',
  'Low Carb',
  'Dairy Free'];

  const toggleFilter = (filter: string) => {
    setActiveFilters((current) =>
    current.includes(filter) ?
    current.filter((f) => f !== filter) :
    [...current, filter]
    );
  };
  const filteredRecipes = recipes.filter((recipe) => {
    if (selectedCuisine !== 'all' && recipe.cuisine !== selectedCuisine)
    return false;
    if (
    activeFilters.length > 0 &&
    !recipe.dietaryTags.some((tag) => activeFilters.includes(tag)))

    return false;
    return true;
  });
  const toggleLikeRecipe = (id: string) => {
    setRecipes(
      recipes.map((recipe) =>
      recipe.id === id ?
      {
        ...recipe,
        liked: !recipe.liked
      } :
      recipe
      )
    );
  };
  const handleToggleSave = (recipe: Recipe) => {
    if (isRecipeSaved(recipe.id)) {
      removeSavedRecipe(recipe.id);
      showToast('Recipe removed from saved');
    } else {
      addSavedRecipe({
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        calories: recipe.calories,
        cookingTime: recipe.prepTime,
        matchPercentage: recipe.matchPercentage,
        savedAt: new Date().toISOString()
      });
      showToast('Recipe saved to your collection');
    }
  };
  const handleAddToPlan = (recipe: Recipe) => {
    setSelectedRecipeForPlan(recipe);
    setShowAddToMealPlan(true);
  };
  const handleConfirmAddToMealPlan = (
  date: Date,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') =>
  {
    if (selectedRecipeForPlan) {
      addMeal(
        {
          id: selectedRecipeForPlan.id,
          title: selectedRecipeForPlan.name,
          image: selectedRecipeForPlan.image,
          cookingTime: selectedRecipeForPlan.prepTime,
          calories: selectedRecipeForPlan.calories
        },
        date,
        mealType
      );
      showToast(
        `${selectedRecipeForPlan.name} added to ${mealType} on ${date.toLocaleDateString()}`
      );
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
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {toast.visible && <ToastNotification message={toast.message} />}

      {/* Header */}
      <header className="bg-white px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => navigateTo('ingredient-confirmation')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors">
            
            <ArrowLeftIcon size={20} className="text-[#1A1A1A]" />
          </button>
          <button
            onClick={() => setShowFilters(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
            
            <FilterIcon size={18} className="text-[#1A1A1A]" />
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">
            Recipe Suggestions
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            {filteredRecipes.length} recipes found with your ingredients
          </p>
        </div>
      </header>

      {/* Cuisine Scroll - Sticky */}
      <div className="bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <div className="px-6 py-3 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2">
            {cuisineTypes.map((cuisine) =>
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(cuisine)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${selectedCuisine === cuisine ? 'bg-[#4CAF50] text-white shadow-md' : 'bg-gray-100 text-[#757575] hover:bg-gray-200'}`}>
              
                {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Recipe List */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredRecipes.length === 0 ?
        <div className="flex flex-col items-center justify-center h-64 text-center animate-fade-in">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4">
              <SearchIcon size={32} className="text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
              No recipes found
            </h3>
            <p className="text-[#64748B] mb-6 max-w-[250px]">
              Try adjusting your filters or adding more ingredients to your
              pantry.
            </p>
            <button
            onClick={() => {
              setSelectedCuisine('all');
              setActiveFilters([]);
            }}
            className="px-6 py-3 bg-[#4CAF50] text-white rounded-full text-sm font-semibold shadow-md hover:bg-[#43A047] transition-colors">
            
              Clear all filters
            </button>
          </div> :

        <div className="space-y-6">
            {filteredRecipes.map((recipe) =>
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden animate-fade-in">
            
                {/* Image Container */}
                <div className="relative h-52">
                  <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover" />
              

                  {/* Match Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#4CAF50] mr-2"></div>
                    <span className="text-[#1A1A1A] font-bold text-sm">
                      {recipe.matchPercentage}%
                    </span>
                    <span className="text-xs ml-1 text-[#64748B] font-medium">
                      match
                    </span>
                  </div>

                  {/* Gradient Overlay & Bottom Badges */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-12">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                        <ChefHatIcon
                      size={14}
                      className="text-[#1A1A1A] mr-1.5" />
                    
                        <span className="text-xs font-bold text-[#1A1A1A]">
                          {recipe.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-1 leading-tight">
                    {recipe.name}
                  </h3>

                  {/* Influencer Row */}
                  <div className="flex items-center mt-2 mb-3">
                    <img
                  src={recipe.inspiredBy.avatar}
                  alt={recipe.inspiredBy.name}
                  className="w-6 h-6 rounded-full object-cover mr-2" />
                
                    <span className="text-xs text-[#64748B] mr-1">
                      Inspired by
                    </span>
                    <span className="text-xs font-semibold text-[#4CAF50]">
                      {recipe.inspiredBy.handle}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-[#64748B] mb-4">
                    <ClockIcon size={16} className="mr-1.5" />
                    <span className="font-medium">{recipe.prepTime}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="font-medium">{recipe.calories} cal</span>
                  </div>

                  {/* Macros Breakdown */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-5">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-2">
                        <div className="flex items-center mb-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#4CAF50] mr-1.5"></div>
                          <span className="text-xs font-semibold text-[#1A1A1A]">
                            P {recipe.protein}g
                          </span>
                        </div>
                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                        className="h-full bg-[#4CAF50]"
                        style={{
                          width: `${recipe.protein * 4 / recipe.calories * 100}%`
                        }}>
                      </div>
                        </div>
                      </div>
                      <div className="flex-1 mx-2">
                        <div className="flex items-center mb-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#FF9800] mr-1.5"></div>
                          <span className="text-xs font-semibold text-[#1A1A1A]">
                            C {recipe.carbs}g
                          </span>
                        </div>
                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                        className="h-full bg-[#FF9800]"
                        style={{
                          width: `${recipe.carbs * 4 / recipe.calories * 100}%`
                        }}>
                      </div>
                        </div>
                      </div>
                      <div className="flex-1 ml-2">
                        <div className="flex items-center mb-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#2196F3] mr-1.5"></div>
                          <span className="text-xs font-semibold text-[#1A1A1A]">
                            F {recipe.fat}g
                          </span>
                        </div>
                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                        className="h-full bg-[#2196F3]"
                        style={{
                          width: `${recipe.fat * 9 / recipe.calories * 100}%`
                        }}>
                      </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Missing Ingredients - Redesigned */}
                  {recipe.missingIngredients.length > 0 &&
              <div className="mb-5 bg-gradient-to-r from-amber-50/60 to-orange-50/60 rounded-xl p-4 border border-amber-100/50">
                      <div className="flex items-center mb-3">
                        <ShoppingBagIcon
                    size={16}
                    className="text-amber-600 mr-2" />
                  
                        <span className="text-sm font-semibold text-amber-900">
                          Missing from your pantry
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {recipe.missingIngredients.map((ing) =>
                  <div
                    key={ing}
                    className="flex items-center bg-amber-50 border border-amber-200/60 rounded-full px-3 py-1.5 shadow-sm">
                    
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></div>
                            <span className="text-sm font-medium text-amber-700">
                              {ing}
                            </span>
                          </div>
                  )}
                      </div>
                      <button className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center transition-colors group">
                        <PlusCircleIcon
                    size={14}
                    className="mr-1.5 group-hover:scale-110 transition-transform" />
                  
                        Add to shopping list
                      </button>
                    </div>
              }

                  {/* Dietary Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {recipe.dietaryTags.map((tag) =>
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-[#64748B]">
                  
                        {tag}
                      </span>
                )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                  onClick={() => navigateTo('recipe-detail')}
                  className="flex-1 py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-semibold flex items-center justify-center hover:bg-gray-800 transition-colors shadow-sm">
                  
                      View Recipe
                    </button>
                    <button
                  onClick={() => handleAddToPlan(recipe)}
                  className="flex-1 py-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-semibold flex items-center justify-center hover:bg-emerald-100 transition-colors">
                  
                      <CalendarIcon size={16} className="mr-1.5" />
                      Add to Plan
                    </button>
                    <button
                  onClick={() => handleToggleSave(recipe)}
                  className={`w-12 h-12 border rounded-xl flex items-center justify-center transition-colors ${isRecipeSaved(recipe.id) ? 'border-[#4CAF50] bg-[#4CAF50]/10 text-[#4CAF50]' : 'border-gray-200 hover:bg-gray-50 text-[#64748B]'}`}>
                  
                      <BookmarkIcon
                    size={20}
                    className={
                    isRecipeSaved(recipe.id) ? 'fill-[#4CAF50]' : ''
                    } />
                  
                    </button>
                  </div>
                </div>
              </div>
          )}
          </div>
        }
      </div>

      {/* Filter Modal */}
      {showFilters &&
      <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-fade-in backdrop-blur-sm">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                Filter Recipes
              </h2>
              <button
              onClick={() => setShowFilters(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              
                <XIcon size={18} className="text-[#1A1A1A]" />
              </button>
            </div>

            <div className="mb-8">
              <h3 className="text-base font-semibold text-[#1A1A1A] mb-4">
                Dietary Preferences
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {dietaryFilters.map((filter) =>
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeFilters.includes(filter) ? 'bg-[#4CAF50] text-white shadow-md' : 'bg-gray-100 text-[#757575] hover:bg-gray-200'}`}>
                
                    {filter}
                  </button>
              )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-base font-semibold text-[#1A1A1A] mb-4">
                Sort By
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {['Match %', 'Prep Time', 'Calories'].map((sortOption) =>
              <button
                key={sortOption}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${sortOption === 'Match %' ? 'bg-[#4CAF50] text-white shadow-md' : 'bg-gray-100 text-[#757575] hover:bg-gray-200'}`}>
                
                    {sortOption}
                  </button>
              )}
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
              onClick={() => {
                setActiveFilters([]);
                setSelectedCuisine('all');
              }}
              className="flex-1 py-3.5 border border-gray-200 text-[#1A1A1A] rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              
                Reset All
              </button>
              <button
              onClick={() => setShowFilters(false)}
              className="flex-1 py-3.5 bg-[#4CAF50] text-white rounded-xl font-semibold shadow-md hover:bg-[#43A047] transition-colors">
              
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      }

      {/* Add to Meal Plan Modal */}
      {showAddToMealPlan && selectedRecipeForPlan &&
      <AddToMealPlanModal
        recipe={{
          id: selectedRecipeForPlan.id,
          title: selectedRecipeForPlan.name,
          image: selectedRecipeForPlan.image,
          cookingTime: selectedRecipeForPlan.prepTime,
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