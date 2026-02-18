import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  FilterIcon,
  ClockIcon,
  ChevronRightIcon,
  XIcon,
  BookmarkIcon,
  PlusCircleIcon,
  StarIcon,
  HeartIcon,
  InfoIcon,
  ShoppingBagIcon } from
'lucide-react';
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
  missingIngredients: string[];
  cuisine: string;
  dietaryTags: string[];
  rating?: number;
  difficulty?: string;
  liked?: boolean;
}
export const RecipeSuggestionScreen: React.FC<RecipeSuggestionScreenProps> = ({
  navigateTo
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [recipes, setRecipes] = useState<Recipe[]>([
  {
    id: '1',
    name: 'One-Pan Chicken and Rice',
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    matchPercentage: 95,
    prepTime: '30 min',
    calories: 450,
    missingIngredients: ['Garlic', 'Thyme'],
    cuisine: 'Mediterranean',
    dietaryTags: ['High Protein', 'Gluten Free'],
    rating: 4.8,
    difficulty: 'Easy',
    liked: false
  },
  {
    id: '2',
    name: 'Stir-Fried Rice Bowl',
    image:
    'https://images.unsplash.com/photo-1567337710282-00832b415979?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    matchPercentage: 85,
    prepTime: '20 min',
    calories: 380,
    missingIngredients: ['Soy Sauce', 'Ginger'],
    cuisine: 'Asian',
    dietaryTags: ['Vegetarian'],
    rating: 4.5,
    difficulty: 'Medium',
    liked: false
  },
  {
    id: '3',
    name: 'Mediterranean Vegetable Bowl',
    image:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    matchPercentage: 78,
    prepTime: '25 min',
    calories: 320,
    missingIngredients: ['Feta Cheese', 'Olives'],
    cuisine: 'Mediterranean',
    dietaryTags: ['Vegetarian', 'Low Carb'],
    rating: 4.2,
    difficulty: 'Easy',
    liked: false
  }]
  );
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
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
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
          <div className="flex items-center">
            <button
              onClick={() => navigateTo('ingredient-confirmation')}
              className="mr-3">

              <ArrowLeftIcon size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold">Recipe Suggestions</h1>
              <p className="text-sm text-[#64748B]">
                {filteredRecipes.length} recipes found with your ingredients
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">

            <FilterIcon size={20} />
          </button>
        </div>
      </header>
      {/* Cuisine Scroll */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
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
        <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <InfoIcon size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
            <p className="text-[#64748B] mb-4">
              Try adjusting your filters or adding more ingredients
            </p>
            <button
            onClick={() => {
              setSelectedCuisine('all');
              setActiveFilters([]);
            }}
            className="px-4 py-2 bg-[#4CAF50] text-white rounded-full text-sm font-medium">

              Clear all filters
            </button>
          </div> :

        <div className="space-y-6">
            {filteredRecipes.map((recipe) =>
          <div
            key={recipe.id}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">

                <div className="relative">
                  <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover" />

                  <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex items-center shadow-md">
                    <span className="text-[#4CAF50] font-semibold">
                      {recipe.matchPercentage}%
                    </span>
                    <span className="text-xs ml-1 text-gray-500">match</span>
                  </div>
                  <button
                onClick={() => toggleLikeRecipe(recipe.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">

                    <HeartIcon
                  size={16}
                  className={`${recipe.liked ? 'text-red-500 fill-red-500' : 'text-gray-400'} transition-colors`} />

                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center">
                      <div className="flex items-center bg-white/90 rounded-full px-2 py-1 mr-2">
                        <StarIcon size={14} className="text-[#FFB800] mr-1" />
                        <span className="text-xs font-medium">
                          {recipe.rating}
                        </span>
                      </div>
                      <div className="flex items-center bg-white/90 rounded-full px-2 py-1">
                        <span className="text-xs font-medium">
                          {recipe.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg text-[#1A1A1A] mb-2">
                    {recipe.name}
                  </h3>
                  <div className="flex items-center text-sm text-[#757575] mb-3">
                    <ClockIcon size={16} className="mr-1" />
                    <span>{recipe.prepTime}</span>
                    <span className="mx-2">•</span>
                    <span>{recipe.calories} cal</span>
                  </div>
                  {recipe.missingIngredients.length > 0 &&
              <div className="mb-4 p-2 bg-[#FFF3E0] rounded-lg">
                      <p className="text-sm text-[#FF9800] flex items-start">
                        <ShoppingBagIcon
                    size={14}
                    className="mr-1 mt-0.5 flex-shrink-0" />

                        <span>
                          <span className="font-medium">Missing:</span>{' '}
                          {recipe.missingIngredients.join(', ')}
                        </span>
                      </p>
                    </div>
              }
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.dietaryTags.map((tag) =>
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs text-[#64748B]">

                        {tag}
                      </span>
                )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                  onClick={() => navigateTo('recipe-detail')}
                  className="flex-1 py-2.5 bg-[#4CAF50] text-white rounded-lg text-sm font-medium flex items-center justify-center hover:bg-[#43A047] transition-colors">

                      View Recipe
                    </button>
                    <button className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <BookmarkIcon size={18} className="text-[#64748B]" />
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-2xl p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Filter Recipes</h2>
              <button
              onClick={() => setShowFilters(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">

                <XIcon size={20} />
              </button>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#64748B] mb-3">
                Dietary Preferences
              </h3>
              <div className="flex flex-wrap gap-2">
                {dietaryFilters.map((filter) =>
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilters.includes(filter) ? 'bg-[#4CAF50] text-white' : 'bg-gray-100 text-[#757575] hover:bg-gray-200'}`}>

                    {filter}
                  </button>
              )}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#64748B] mb-3">
                Sort By
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Match %', 'Prep Time', 'Calories', 'Rating'].map(
                (sortOption) =>
                <button
                  key={sortOption}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${sortOption === 'Match %' ? 'bg-[#4CAF50] text-white' : 'bg-gray-100 text-[#757575] hover:bg-gray-200'} transition-all duration-200`}>

                      {sortOption}
                    </button>

              )}
              </div>
            </div>
            <div className="flex space-x-3">
              <button
              onClick={() => {
                setActiveFilters([]);
                setSelectedCuisine('all');
              }}
              className="flex-1 py-3 border border-gray-200 text-[#1A1A1A] rounded-full font-medium hover:bg-gray-50 transition-colors">

                Reset All
              </button>
              <button
              onClick={() => setShowFilters(false)}
              className="flex-1 py-3 bg-[#4CAF50] text-white rounded-full font-medium hover:bg-[#43A047] transition-colors">

                Apply Filters
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

};