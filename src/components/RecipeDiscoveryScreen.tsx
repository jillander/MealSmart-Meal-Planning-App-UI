import React, { useEffect, useState } from 'react';
import { FilterIcon, ClockIcon, ChefHatIcon, XIcon, StarIcon, SearchIcon, SlidersIcon } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useInView } from 'react-intersection-observer';
interface RecipeDiscoveryScreenProps {
  navigateTo: (screen: string) => void;
}
interface Recipe {
  id: string;
  name: string;
  image: string;
  cookingTime: string;
  difficulty: string;
  matchPercentage: number;
  dietaryTags: string[];
  rating: number;
  calories: number;
  description?: string;
  isFeatured?: boolean;
}
export const RecipeDiscoveryScreen: React.FC<RecipeDiscoveryScreenProps> = ({
  navigateTo
}) => {
  const [activeCategory, setActiveCategory] = useState('Trending');
  const [showFilters, setShowFilters] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([{
    id: '1',
    name: 'Avocado & Egg Toast',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cookingTime: '10 min',
    difficulty: 'Easy',
    matchPercentage: 95,
    dietaryTags: ['Vegetarian', 'High-Protein'],
    rating: 4.8,
    calories: 320,
    description: 'Start your day with this protein-packed breakfast classic.',
    isFeatured: true
  }, {
    id: '2',
    name: 'Mediterranean Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cookingTime: '20 min',
    difficulty: 'Medium',
    matchPercentage: 88,
    dietaryTags: ['Vegan', 'Gluten-Free'],
    rating: 4.5,
    calories: 420
  }, {
    id: '3',
    name: 'Salmon with Roasted Vegetables',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cookingTime: '30 min',
    difficulty: 'Medium',
    matchPercentage: 75,
    dietaryTags: ['High-Protein', 'Low-Carb'],
    rating: 4.7,
    calories: 520,
    description: 'Omega-rich salmon with a colorful medley of roasted vegetables.'
  }, {
    id: '4',
    name: 'Berry Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cookingTime: '15 min',
    difficulty: 'Easy',
    matchPercentage: 92,
    dietaryTags: ['Vegan', 'Gluten-Free'],
    rating: 4.6,
    calories: 280
  }, {
    id: '5',
    name: 'Chicken Stir Fry',
    image: 'https://images.unsplash.com/photo-1512058454905-6b841e7ad132?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cookingTime: '25 min',
    difficulty: 'Medium',
    matchPercentage: 82,
    dietaryTags: ['High-Protein'],
    rating: 4.4,
    calories: 480,
    description: 'Quick and flavorful weeknight dinner option packed with protein.'
  }, {
    id: '6',
    name: 'Quinoa Salad',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cookingTime: '15 min',
    difficulty: 'Easy',
    matchPercentage: 90,
    dietaryTags: ['Vegan', 'Gluten-Free'],
    rating: 4.3,
    calories: 350
  }, {
    id: '7',
    name: 'Chocolate Banana Pancakes',
    image: 'https://images.unsplash.com/photo-1575853121743-60c24f0a7502?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cookingTime: '20 min',
    difficulty: 'Easy',
    matchPercentage: 78,
    dietaryTags: ['Vegetarian'],
    rating: 4.9,
    calories: 450,
    description: 'Decadent yet nutritious pancakes for a weekend breakfast treat.'
  }, {
    id: '8',
    name: 'Lentil Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cookingTime: '40 min',
    difficulty: 'Easy',
    matchPercentage: 85,
    dietaryTags: ['Vegan', 'High-Protein'],
    rating: 4.2,
    calories: 320
  }]);
  const categories = ['Trending', 'Quick Meals', 'Protein-Rich', 'Low-Carb', 'Vegetarian', 'Vegan', 'Breakfast', 'Lunch', 'Dinner'];
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const dietaryFilters = ['Vegetarian', 'Vegan', 'Gluten-Free', 'High-Protein', 'Low-Carb', 'Dairy-Free'];
  const toggleFilter = (filter: string) => {
    setActiveFilters(current => current.includes(filter) ? current.filter(f => f !== filter) : [...current, filter]);
  };
  // Get match percentage color based on value
  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-[#4CAF50]';
    if (percentage >= 70) return 'bg-[#8BC34A]';
    if (percentage >= 50) return 'bg-[#FFEB3B]';
    return 'bg-[#FF9800]';
  };
  // Recipe Card component with animation
  const RecipeCard: React.FC<{
    recipe: Recipe;
    index: number;
  }> = ({
    recipe,
    index
  }) => {
    const {
      ref,
      inView
    } = useInView({
      triggerOnce: true,
      threshold: 0.1
    });
    return <div ref={ref} className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{
      transitionDelay: `${index * 50}ms`
    }} onClick={() => navigateTo('recipe-detail')}>
        <div className="relative">
          <img src={recipe.image} alt={recipe.name} className="w-full aspect-[4/3] object-cover" />
          {/* Match percentage indicator */}
          <div className="absolute top-3 left-3 flex items-center space-x-1">
            <div className={`${getMatchColor(recipe.matchPercentage)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
              {recipe.matchPercentage}% Match
            </div>
          </div>
          {/* Dietary tags */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
            {recipe.dietaryTags.map((tag, i) => <span key={i} className="bg-white bg-opacity-90 text-[#1A1A1A] text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                {tag}
              </span>)}
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-[#1A1A1A] line-clamp-1">
              {recipe.name}
            </h3>
            <div className="flex items-center">
              <StarIcon size={14} className="text-[#FFB800] mr-1" />
              <span className="text-xs font-medium">{recipe.rating}</span>
            </div>
          </div>
          {recipe.description && <p className="text-xs text-gray-500 mb-2 line-clamp-2">
              {recipe.description}
            </p>}
          <div className="flex items-center justify-between text-xs text-[#757575]">
            <div className="flex items-center">
              <ClockIcon size={12} className="mr-1" />
              <span>{recipe.cookingTime}</span>
            </div>
            <div className="flex items-center">
              <ChefHatIcon size={12} className="mr-1" />
              <span>{recipe.difficulty}</span>
            </div>
            <span>{recipe.calories} cal</span>
          </div>
        </div>
      </div>;
  };
  return <div className="flex flex-col min-h-screen bg-[#F8F9FA] w-full">
      {/* Header with search */}
      <div className="bg-white px-6 py-4 border-b border-gray-100 sticky top-0 z-20">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-[#1A1A1A]">Discover Recipes</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
            <SearchIcon size={20} />
          </button>
        </div>
        {/* Category tabs */}
        <div className="overflow-x-auto scrollbar-hide -mx-1 pb-1">
          <div className="flex space-x-2 px-1">
            {categories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeCategory === category ? 'bg-[#4CAF50] text-white shadow-sm' : 'bg-gray-100 text-[#757575] hover:bg-gray-200'}`}>
                {category}
              </button>)}
          </div>
        </div>
      </div>
      {/* Masonry grid */}
      <div className="flex-1 p-4 overflow-y-auto">
        <ResponsiveMasonry columnsCountBreakPoints={{
        350: 1,
        500: 2
      }}>
          <Masonry gutter="16px">
            {recipes.map((recipe, index) => <RecipeCard key={recipe.id} recipe={recipe} index={index} />)}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      {/* Floating filter button */}
      <div className="fixed bottom-[80px] right-6 z-30">
        <button onClick={() => setShowFilters(!showFilters)} className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${showFilters ? 'bg-[#1A1A1A] rotate-90' : 'bg-[#4CAF50]'}`}>
          {showFilters ? <XIcon size={24} className="text-white" /> : <SlidersIcon size={24} className="text-white" />}
        </button>
      </div>
      {/* Filter panel */}
      {showFilters && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-end animate-fade-in">
          <div className="bg-white w-full rounded-t-2xl p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Filter Recipes</h2>
              <button onClick={() => setShowFilters(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <XIcon size={20} />
              </button>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#64748B] mb-3">
                Dietary Preferences
              </h3>
              <div className="flex flex-wrap gap-2">
                {dietaryFilters.map(filter => <button key={filter} onClick={() => toggleFilter(filter)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilters.includes(filter) ? 'bg-[#4CAF50] text-white' : 'bg-gray-100 text-[#757575] hover:bg-gray-200'}`}>
                    {filter}
                  </button>)}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#64748B] mb-3">
                Cooking Time
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Under 15 min', 'Under 30 min', 'Under 60 min'].map(time => <button key={time} className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-[#757575] hover:bg-gray-200 transition-all duration-200">
                      {time}
                    </button>)}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#64748B] mb-3">
                Calories
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Under 300', 'Under 500', 'Under 800'].map(calRange => <button key={calRange} className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-[#757575] hover:bg-gray-200 transition-all duration-200">
                    {calRange}
                  </button>)}
              </div>
            </div>
            <div className="flex space-x-3">
              <button onClick={() => setActiveFilters([])} className="flex-1 py-3 border border-gray-200 text-[#1A1A1A] rounded-full font-medium hover:bg-gray-50 transition-colors">
                Reset All
              </button>
              <button onClick={() => setShowFilters(false)} className="flex-1 py-3 bg-[#4CAF50] text-white rounded-full font-medium hover:bg-[#43A047] transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </div>}
    </div>;
};