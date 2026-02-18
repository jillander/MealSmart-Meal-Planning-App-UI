import React, { useState } from 'react';
import {
  ChevronRightIcon,
  ClockIcon,
  FlameIcon,
  FilterIcon,
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
  SnowflakeIcon } from
'lucide-react';
interface RecipeRecommendationHubProps {
  navigateTo: (screen: string) => void;
}
interface Recipe {
  id: string;
  title: string;
  image: string;
  matchPercentage: number;
  cookingTime: string;
  calories: number;
  difficulty: string;
  trending?: boolean;
  tags: string[];
  saved: boolean;
  liked: boolean;
}
interface CollectionShortcut {
  id: string;
  label: string;
  image: string;
}
export const RecipeRecommendationHub: React.FC<
  RecipeRecommendationHubProps> =
({ navigateTo }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );
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

  const dietaryFilters = [
  'Vegetarian',
  'Vegan',
  'Gluten Free',
  'Keto',
  'Low Carb',
  'High Protein'];

  const forYouRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Bowl',
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 95,
    cookingTime: '25 min',
    calories: 420,
    difficulty: 'Medium',
    tags: ['Vegetarian', 'Mediterranean'],
    saved: false,
    liked: false
  },
  {
    id: '2',
    title: 'Avocado Toast with Eggs',
    image:
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 92,
    cookingTime: '15 min',
    calories: 350,
    difficulty: 'Easy',
    tags: ['Breakfast', 'High Protein'],
    saved: false,
    liked: false
  },
  {
    id: '3',
    title: 'Chicken Stir Fry',
    image:
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 88,
    cookingTime: '20 min',
    calories: 480,
    difficulty: 'Medium',
    tags: ['High Protein', 'Asian'],
    saved: false,
    liked: false
  },
  {
    id: '4',
    title: 'Berry Smoothie Bowl',
    image:
    'https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 85,
    cookingTime: '10 min',
    calories: 320,
    difficulty: 'Easy',
    tags: ['Breakfast', 'Vegan'],
    saved: false,
    liked: false
  }];

  const perfectMatchRecipes: Recipe[] = [
  {
    id: '5',
    title: 'Quinoa Salad Bowl',
    image:
    'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 98,
    cookingTime: '30 min',
    calories: 380,
    difficulty: 'Easy',
    tags: ['Vegetarian', 'Lunch'],
    saved: false,
    liked: false
  },
  {
    id: '6',
    title: 'Grilled Salmon',
    image:
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 94,
    cookingTime: '25 min',
    calories: 450,
    difficulty: 'Medium',
    tags: ['High Protein', 'Dinner'],
    saved: false,
    liked: false
  },
  {
    id: '7',
    title: 'Veggie Pasta',
    image:
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 92,
    cookingTime: '35 min',
    calories: 520,
    difficulty: 'Easy',
    tags: ['Vegetarian', 'Italian'],
    saved: false,
    liked: false
  }];

  const quickAndEasyRecipes: Recipe[] = [
  {
    id: '8',
    title: '5-Minute Breakfast Wrap',
    image:
    'https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 82,
    cookingTime: '5 min',
    calories: 280,
    difficulty: 'Easy',
    tags: ['Breakfast', 'Quick'],
    saved: false,
    liked: false
  },
  {
    id: '9',
    title: 'Microwave Egg Bowl',
    image:
    'https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 78,
    cookingTime: '8 min',
    calories: 320,
    difficulty: 'Easy',
    tags: ['Breakfast', 'High Protein'],
    saved: false,
    liked: false
  },
  {
    id: '10',
    title: 'Quick Tuna Salad',
    image:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 85,
    cookingTime: '12 min',
    calories: 350,
    difficulty: 'Easy',
    tags: ['Lunch', 'High Protein'],
    saved: false,
    liked: false
  }];

  const trendingRecipes: Recipe[] = [
  {
    id: '11',
    title: 'Korean Bibimbap',
    image:
    'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 76,
    cookingTime: '40 min',
    calories: 550,
    difficulty: 'Medium',
    trending: true,
    tags: ['Asian', 'Dinner'],
    saved: false,
    liked: false
  },
  {
    id: '12',
    title: 'Acai Smoothie Bowl',
    image:
    'https://images.unsplash.com/photo-1590080874088-eec64895b423?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 80,
    cookingTime: '15 min',
    calories: 310,
    difficulty: 'Easy',
    trending: true,
    tags: ['Breakfast', 'Vegan'],
    saved: false,
    liked: false
  },
  {
    id: '13',
    title: 'Cauliflower Tacos',
    image:
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 72,
    cookingTime: '30 min',
    calories: 420,
    difficulty: 'Medium',
    trending: true,
    tags: ['Vegetarian', 'Mexican'],
    saved: false,
    liked: false
  }];

  const pantryRecipes: Recipe[] = [
  {
    id: '14',
    title: 'Pantry Pasta',
    image:
    'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 100,
    cookingTime: '20 min',
    calories: 450,
    difficulty: 'Easy',
    tags: ['Italian', 'Dinner'],
    saved: false,
    liked: false
  },
  {
    id: '15',
    title: 'Bean & Rice Bowl',
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    matchPercentage: 100,
    cookingTime: '25 min',
    calories: 380,
    difficulty: 'Easy',
    tags: ['Vegetarian', 'Lunch'],
    saved: false,
    liked: false
  }];

  const toggleFilter = (filter: string) => {
    setActiveFilters((current) =>
    current.includes(filter) ?
    current.filter((f) => f !== filter) :
    [...current, filter]
    );
  };
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<string[]>([]);
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
    setSelectedCollection(
      selectedCollection === collectionId ? null : collectionId
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
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">For You</h1>
            <p className="text-sm text-[#64748B]">
              AI-powered recipe suggestions
            </p>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <FilterIcon size={20} className="text-[#1A1A1A]" />
          </button>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Collection Shortcuts Grid - Compact Mobb Style */}
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

        {/* Quick Filters */}
        <section className="px-6 py-3 bg-white sticky top-0 z-10 border-b border-gray-100">
          <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-1">
            {dietaryFilters.map((filter) =>
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeFilters.includes(filter) ? 'bg-[#4CAF50] text-white shadow-sm' : 'bg-gray-100 text-[#757575] hover:bg-gray-200'}`}>

                {filter}
              </button>
            )}
          </div>
        </section>

        {/* Recommended For You - Horizontal Scroll */}
        <section className="py-4">
          <div className="px-6 mb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1A1A1A]">
                Recommended For You
              </h2>
              <button className="text-[#4CAF50] text-sm font-medium flex items-center hover:text-[#43A047] transition-colors">
                View All
                <ChevronRightIcon size={16} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto scrollbar-hide px-6">
            <div className="flex space-x-4 pb-2">
              {forYouRecipes.map((recipe) =>
              <div
                key={recipe.id}
                className="flex-shrink-0 w-[260px] bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => navigateTo('recipe-detail')}>

                  <div className="relative">
                    <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-36 object-cover" />

                    <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex items-center shadow-md">
                      <span className="text-[#4CAF50] font-semibold text-sm">
                        {recipe.matchPercentage}%
                      </span>
                      <span className="text-xs ml-1 text-gray-500">match</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-[#1A1A1A] mb-1 truncate">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center text-sm text-[#757575] mb-2">
                      <ClockIcon size={14} className="mr-1" />
                      <span>{recipe.cookingTime}</span>
                      <span className="mx-2">•</span>
                      <span>{recipe.calories} cal</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {recipe.tags.slice(0, 2).map((tag) =>
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-[#64748B]">

                            {tag}
                          </span>
                      )}
                      </div>
                      <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(recipe.id);
                      }}
                      className="text-[#1A1A1A] hover:scale-110 transition-transform">

                        <HeartIcon
                        size={18}
                        className={`${likedRecipes.includes(recipe.id) ? 'text-red-500 fill-red-500' : ''}`} />

                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Perfect Match Section - Horizontal Scroll */}
        <section className="py-4">
          <div className="px-6 mb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center">
                Perfect Match
                <span className="ml-2 text-xs px-2 py-0.5 bg-[#4CAF50] bg-opacity-10 text-[#4CAF50] rounded-full font-medium">
                  90%+ match
                </span>
              </h2>
              <button className="text-[#4CAF50] text-sm font-medium flex items-center hover:text-[#43A047] transition-colors">
                View All
                <ChevronRightIcon size={16} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto scrollbar-hide px-6">
            <div className="flex space-x-4 pb-2">
              {perfectMatchRecipes.map((recipe) =>
              <div
                key={recipe.id}
                onClick={() => navigateTo('recipe-detail')}
                className="flex-shrink-0 w-[280px] bg-white rounded-xl overflow-hidden shadow-sm border-2 border-[#4CAF50] hover:shadow-md transition-all duration-200 cursor-pointer">

                  <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover" />

                  <div className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-[#1A1A1A] mb-1">
                          {recipe.title}
                        </h3>
                        <div className="flex items-center text-sm text-[#757575]">
                          <span className="text-[#4CAF50] font-bold">
                            {recipe.matchPercentage}%
                          </span>
                          <span className="mx-2">•</span>
                          <ClockIcon size={14} className="mr-1" />
                          <span>{recipe.cookingTime}</span>
                        </div>
                      </div>
                      <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(recipe.id);
                      }}
                      className="text-[#1A1A1A] hover:scale-110 transition-transform">

                        <BookmarkIcon
                        size={18}
                        className={`${savedRecipes.includes(recipe.id) ? 'text-[#4CAF50] fill-[#4CAF50]' : ''}`} />

                      </button>
                    </div>
                    <div className="flex space-x-1 flex-wrap gap-y-1">
                      {recipe.tags.map((tag) =>
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-[#64748B]">

                          {tag}
                        </span>
                    )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Quick & Easy Section - Horizontal Scroll */}
        <section className="py-4">
          <div className="px-6 mb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center">
                Quick & Easy
                <span className="ml-2 text-xs px-2 py-0.5 bg-[#2196F3] bg-opacity-10 text-[#2196F3] rounded-full font-medium">
                  Under 20 min
                </span>
              </h2>
              <button className="text-[#4CAF50] text-sm font-medium flex items-center hover:text-[#43A047] transition-colors">
                View All
                <ChevronRightIcon size={16} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto scrollbar-hide px-6">
            <div className="flex space-x-4 pb-2">
              {quickAndEasyRecipes.map((recipe) =>
              <div
                key={recipe.id}
                onClick={() => navigateTo('recipe-detail')}
                className="flex-shrink-0 w-[280px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">

                  <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover" />

                  <div className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-[#1A1A1A] mb-1">
                          {recipe.title}
                        </h3>
                        <div className="flex items-center text-sm text-[#757575]">
                          <ClockIcon
                          size={14}
                          className="mr-1 text-[#2196F3]" />

                          <span className="text-[#2196F3] font-bold">
                            {recipe.cookingTime}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{recipe.calories} cal</span>
                        </div>
                      </div>
                      <div className="bg-[#2196F3] bg-opacity-10 rounded-full px-2 py-0.5 text-xs text-[#2196F3] font-medium whitespace-nowrap">
                        Time Saver
                      </div>
                    </div>
                    <div className="flex space-x-1 flex-wrap gap-y-1">
                      {recipe.tags.map((tag) =>
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-[#64748B]">

                          {tag}
                        </span>
                    )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Trending Now Section - Horizontal Scroll */}
        <section className="py-4">
          <div className="px-6 mb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center">
                Trending Now
                <FlameIcon size={16} className="ml-2 text-[#F44336]" />
              </h2>
              <button className="text-[#4CAF50] text-sm font-medium flex items-center hover:text-[#43A047] transition-colors">
                View All
                <ChevronRightIcon size={16} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto scrollbar-hide px-6">
            <div className="flex space-x-4 pb-2">
              {trendingRecipes.map((recipe) =>
              <div
                key={recipe.id}
                onClick={() => navigateTo('recipe-detail')}
                className="flex-shrink-0 w-[200px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">

                  <div className="relative">
                    <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-28 object-cover" />

                    <div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                      <FlameIcon size={14} className="text-[#F44336]" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-[#1A1A1A] text-sm mb-1 truncate">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center text-xs text-[#757575]">
                      <ClockIcon size={12} className="mr-1" />
                      <span>{recipe.cookingTime}</span>
                      <span className="mx-1">•</span>
                      <ChefHatIcon size={12} className="mr-1" />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Pantry Challenge Section - Horizontal Scroll */}
        <section className="py-4">
          <div className="px-6 mb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center">
                Pantry Challenge
                <LightbulbIcon size={16} className="ml-2 text-[#FFB800]" />
              </h2>
              <button className="text-[#4CAF50] text-sm font-medium flex items-center hover:text-[#43A047] transition-colors">
                View All
                <ChevronRightIcon size={16} />
              </button>
            </div>
            <p className="text-sm text-[#64748B] mt-1">
              Creative recipes using only what you already have
            </p>
          </div>
          <div className="overflow-x-auto scrollbar-hide px-6">
            <div className="flex space-x-4 pb-2">
              {pantryRecipes.map((recipe) =>
              <div
                key={recipe.id}
                onClick={() => navigateTo('recipe-detail')}
                className="flex-shrink-0 w-[280px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">

                  <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover" />

                  <div className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-[#1A1A1A] flex-1">
                        {recipe.title}
                      </h3>
                      <div className="bg-[#4CAF50] bg-opacity-10 rounded-full px-2 py-0.5 text-xs text-[#4CAF50] font-medium flex items-center ml-2 whitespace-nowrap">
                        <ShoppingBagIcon size={12} className="mr-1" />
                        100%
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-[#757575]">
                      <ClockIcon size={14} className="mr-1" />
                      <span>{recipe.cookingTime}</span>
                      <span className="mx-2">•</span>
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>);

};