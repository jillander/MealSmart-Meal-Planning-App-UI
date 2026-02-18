import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  FilterIcon,
  ClockIcon,
  HeartIcon,
  BookmarkIcon,
  ChevronDownIcon,
  XIcon,
  PlusIcon } from
'lucide-react';
import { AddToMealPlanModal } from './AddToMealPlanModal';
import { ToastNotification } from './ToastNotification';
import { useMealPlan } from '../contexts/MealPlanContext';
interface CategoryBrowseScreenProps {
  navigateTo: (screen: string) => void;
  categoryId: string;
  categoryLabel: string;
}
interface Recipe {
  id: string;
  title: string;
  image: string;
  matchPercentage: number;
  cookingTime: string;
  calories: number;
  difficulty: string;
  tags: string[];
  saved: boolean;
  liked: boolean;
}
export const CategoryBrowseScreen: React.FC<CategoryBrowseScreenProps> = ({
  navigateTo,
  categoryId,
  categoryLabel
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    'match' | 'time' | 'calories' | 'rating'>(
    'match');
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
  const { addMeal } = useMealPlan();
  // Mock recipe data based on category
  const getRecipesByCategory = (categoryId: string): Recipe[] => {
    const recipeDatabase: Record<string, Recipe[]> = {
      'high-protein': [
      {
        id: 'hp1',
        title: 'Grilled Chicken Bowl',
        image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 95,
        cookingTime: '25 min',
        calories: 420,
        difficulty: 'Easy',
        tags: ['High Protein', 'Low Carb', 'Gluten Free'],
        saved: false,
        liked: false
      },
      {
        id: 'hp2',
        title: 'Salmon Power Bowl',
        image:
        'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 92,
        cookingTime: '30 min',
        calories: 480,
        difficulty: 'Medium',
        tags: ['High Protein', 'Omega-3'],
        saved: false,
        liked: false
      },
      {
        id: 'hp3',
        title: 'Egg White Scramble',
        image:
        'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 88,
        cookingTime: '15 min',
        calories: 280,
        difficulty: 'Easy',
        tags: ['High Protein', 'Breakfast', 'Low Cal'],
        saved: false,
        liked: false
      },
      {
        id: 'hp4',
        title: 'Tuna Salad Bowl',
        image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 90,
        cookingTime: '10 min',
        calories: 350,
        difficulty: 'Easy',
        tags: ['High Protein', 'Quick', 'Low Carb'],
        saved: false,
        liked: false
      },
      {
        id: 'hp5',
        title: 'Greek Yogurt Parfait',
        image:
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 85,
        cookingTime: '5 min',
        calories: 320,
        difficulty: 'Easy',
        tags: ['High Protein', 'Breakfast', 'Quick'],
        saved: false,
        liked: false
      },
      {
        id: 'hp6',
        title: 'Turkey Meatballs',
        image:
        'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 93,
        cookingTime: '35 min',
        calories: 380,
        difficulty: 'Medium',
        tags: ['High Protein', 'Dinner'],
        saved: false,
        liked: false
      }],

      'quick-healthy': [
      {
        id: 'qh1',
        title: '10-Minute Stir Fry',
        image:
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 94,
        cookingTime: '10 min',
        calories: 320,
        difficulty: 'Easy',
        tags: ['Quick', 'Vegetarian', 'Asian'],
        saved: false,
        liked: false
      },
      {
        id: 'qh2',
        title: 'Avocado Toast',
        image:
        'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 91,
        cookingTime: '5 min',
        calories: 280,
        difficulty: 'Easy',
        tags: ['Quick', 'Breakfast', 'Vegetarian'],
        saved: false,
        liked: false
      },
      {
        id: 'qh3',
        title: 'Caprese Salad',
        image:
        'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 89,
        cookingTime: '8 min',
        calories: 250,
        difficulty: 'Easy',
        tags: ['Quick', 'Vegetarian', 'Italian'],
        saved: false,
        liked: false
      },
      {
        id: 'qh4',
        title: 'Smoothie Bowl',
        image:
        'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 87,
        cookingTime: '5 min',
        calories: 300,
        difficulty: 'Easy',
        tags: ['Quick', 'Breakfast', 'Vegan'],
        saved: false,
        liked: false
      },
      {
        id: 'qh5',
        title: 'Chicken Wrap',
        image:
        'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 92,
        cookingTime: '12 min',
        calories: 380,
        difficulty: 'Easy',
        tags: ['Quick', 'High Protein', 'Lunch'],
        saved: false,
        liked: false
      },
      {
        id: 'qh6',
        title: 'Greek Salad',
        image:
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 88,
        cookingTime: '10 min',
        calories: 220,
        difficulty: 'Easy',
        tags: ['Quick', 'Vegetarian', 'Mediterranean'],
        saved: false,
        liked: false
      }],

      'batch-cook': [
      {
        id: 'bc1',
        title: 'Chicken Meal Prep Bowls',
        image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 96,
        cookingTime: '45 min',
        calories: 420,
        difficulty: 'Medium',
        tags: ['Meal Prep', 'High Protein', 'Batch Cook'],
        saved: false,
        liked: false
      },
      {
        id: 'bc2',
        title: 'Chili Con Carne',
        image:
        'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 93,
        cookingTime: '60 min',
        calories: 380,
        difficulty: 'Medium',
        tags: ['Batch Cook', 'High Protein', 'Freezer Friendly'],
        saved: false,
        liked: false
      },
      {
        id: 'bc3',
        title: 'Vegetable Curry',
        image:
        'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 90,
        cookingTime: '50 min',
        calories: 320,
        difficulty: 'Medium',
        tags: ['Batch Cook', 'Vegetarian', 'Vegan'],
        saved: false,
        liked: false
      },
      {
        id: 'bc4',
        title: 'Lasagna',
        image:
        'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 91,
        cookingTime: '75 min',
        calories: 480,
        difficulty: 'Hard',
        tags: ['Batch Cook', 'Italian', 'Freezer Friendly'],
        saved: false,
        liked: false
      },
      {
        id: 'bc5',
        title: 'Pulled Pork',
        image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 94,
        cookingTime: '240 min',
        calories: 450,
        difficulty: 'Medium',
        tags: ['Batch Cook', 'High Protein', 'BBQ'],
        saved: false,
        liked: false
      },
      {
        id: 'bc6',
        title: 'Beef Stew',
        image:
        'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 92,
        cookingTime: '120 min',
        calories: 410,
        difficulty: 'Medium',
        tags: ['Batch Cook', 'High Protein', 'Comfort Food'],
        saved: false,
        liked: false
      }],

      'protein-dinners': [
      {
        id: 'pd1',
        title: 'Steak & Vegetables',
        image:
        'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 97,
        cookingTime: '30 min',
        calories: 520,
        difficulty: 'Medium',
        tags: ['High Protein', 'Dinner', 'Low Carb'],
        saved: false,
        liked: false
      },
      {
        id: 'pd2',
        title: 'Grilled Salmon Fillet',
        image:
        'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 95,
        cookingTime: '25 min',
        calories: 480,
        difficulty: 'Easy',
        tags: ['High Protein', 'Dinner', 'Omega-3'],
        saved: false,
        liked: false
      },
      {
        id: 'pd3',
        title: 'Chicken Breast & Quinoa',
        image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 93,
        cookingTime: '35 min',
        calories: 450,
        difficulty: 'Easy',
        tags: ['High Protein', 'Dinner', 'Gluten Free'],
        saved: false,
        liked: false
      },
      {
        id: 'pd4',
        title: 'Turkey Meatloaf',
        image:
        'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 91,
        cookingTime: '60 min',
        calories: 420,
        difficulty: 'Medium',
        tags: ['High Protein', 'Dinner', 'Comfort Food'],
        saved: false,
        liked: false
      },
      {
        id: 'pd5',
        title: 'Shrimp Stir Fry',
        image:
        'https://images.unsplash.com/photo-1633504581786-316c8002b1b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 94,
        cookingTime: '20 min',
        calories: 380,
        difficulty: 'Easy',
        tags: ['High Protein', 'Dinner', 'Quick'],
        saved: false,
        liked: false
      },
      {
        id: 'pd6',
        title: 'Pork Tenderloin',
        image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 92,
        cookingTime: '40 min',
        calories: 460,
        difficulty: 'Medium',
        tags: ['High Protein', 'Dinner', 'Low Fat'],
        saved: false,
        liked: false
      }],

      'meal-prep': [
      {
        id: 'mp1',
        title: 'Overnight Oats',
        image:
        'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 96,
        cookingTime: '5 min',
        calories: 320,
        difficulty: 'Easy',
        tags: ['Meal Prep', 'Breakfast', 'Quick'],
        saved: false,
        liked: false
      },
      {
        id: 'mp2',
        title: 'Mason Jar Salads',
        image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 94,
        cookingTime: '15 min',
        calories: 280,
        difficulty: 'Easy',
        tags: ['Meal Prep', 'Lunch', 'Vegetarian'],
        saved: false,
        liked: false
      },
      {
        id: 'mp3',
        title: 'Burrito Bowls',
        image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 92,
        cookingTime: '30 min',
        calories: 420,
        difficulty: 'Easy',
        tags: ['Meal Prep', 'Lunch', 'Mexican'],
        saved: false,
        liked: false
      },
      {
        id: 'mp4',
        title: 'Protein Pancakes',
        image:
        'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 90,
        cookingTime: '20 min',
        calories: 350,
        difficulty: 'Easy',
        tags: ['Meal Prep', 'Breakfast', 'High Protein'],
        saved: false,
        liked: false
      },
      {
        id: 'mp5',
        title: 'Egg Muffins',
        image:
        'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 93,
        cookingTime: '25 min',
        calories: 180,
        difficulty: 'Easy',
        tags: ['Meal Prep', 'Breakfast', 'High Protein'],
        saved: false,
        liked: false
      },
      {
        id: 'mp6',
        title: 'Chicken & Rice Bowls',
        image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 95,
        cookingTime: '40 min',
        calories: 450,
        difficulty: 'Medium',
        tags: ['Meal Prep', 'Lunch', 'High Protein'],
        saved: false,
        liked: false
      }],

      freezer: [
      {
        id: 'fr1',
        title: 'Breakfast Burritos',
        image:
        'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 95,
        cookingTime: '30 min',
        calories: 380,
        difficulty: 'Easy',
        tags: ['Freezer Friendly', 'Breakfast', 'Mexican'],
        saved: false,
        liked: false
      },
      {
        id: 'fr2',
        title: 'Meatballs',
        image:
        'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 93,
        cookingTime: '40 min',
        calories: 320,
        difficulty: 'Medium',
        tags: ['Freezer Friendly', 'High Protein', 'Italian'],
        saved: false,
        liked: false
      },
      {
        id: 'fr3',
        title: 'Vegetable Soup',
        image:
        'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 91,
        cookingTime: '45 min',
        calories: 220,
        difficulty: 'Easy',
        tags: ['Freezer Friendly', 'Vegetarian', 'Soup'],
        saved: false,
        liked: false
      },
      {
        id: 'fr4',
        title: 'Chicken Pot Pie',
        image:
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 92,
        cookingTime: '60 min',
        calories: 480,
        difficulty: 'Hard',
        tags: ['Freezer Friendly', 'Comfort Food', 'Dinner'],
        saved: false,
        liked: false
      },
      {
        id: 'fr5',
        title: 'Enchiladas',
        image:
        'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 94,
        cookingTime: '50 min',
        calories: 420,
        difficulty: 'Medium',
        tags: ['Freezer Friendly', 'Mexican', 'Dinner'],
        saved: false,
        liked: false
      },
      {
        id: 'fr6',
        title: "Shepherd's Pie",
        image:
        'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        matchPercentage: 90,
        cookingTime: '70 min',
        calories: 450,
        difficulty: 'Medium',
        tags: ['Freezer Friendly', 'Comfort Food', 'Dinner'],
        saved: false,
        liked: false
      }]

    };
    return recipeDatabase[categoryId] || [];
  };
  const [recipes] = useState<Recipe[]>(getRecipesByCategory(categoryId));
  const dietaryFilters = [
  'Vegetarian',
  'Vegan',
  'Gluten Free',
  'High Protein',
  'Low Carb',
  'Low Cal'];

  const sortOptions = [
  {
    id: 'match',
    label: 'Match %'
  },
  {
    id: 'time',
    label: 'Prep Time'
  },
  {
    id: 'calories',
    label: 'Calories'
  },
  {
    id: 'rating',
    label: 'Rating'
  }];

  const toggleFilter = (filter: string) => {
    setActiveFilters((current) =>
    current.includes(filter) ?
    current.filter((f) => f !== filter) :
    [...current, filter]
    );
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
  mealType: 'breakfast' | 'lunch' | 'dinner') =>
  {
    if (selectedRecipeForPlan) {
      // Add the meal to the context
      addMeal(
        {
          id: selectedRecipeForPlan.id,
          title: selectedRecipeForPlan.title,
          image: selectedRecipeForPlan.image,
          cookingTime: selectedRecipeForPlan.cookingTime,
          calories: selectedRecipeForPlan.calories
        },
        date,
        mealType
      );
      showToast(
        `${selectedRecipeForPlan.title} added to ${mealType} on ${date.toLocaleDateString()}`
      );
    }
  };
  // Filter and sort recipes
  const getFilteredAndSortedRecipes = () => {
    let filtered = recipes;
    // Apply dietary filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter((recipe) =>
      recipe.tags.some((tag) => activeFilters.includes(tag))
      );
    }
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchPercentage - a.matchPercentage;
        case 'time':
          return parseInt(a.cookingTime) - parseInt(b.cookingTime);
        case 'calories':
          return a.calories - b.calories;
        case 'rating':
          return b.matchPercentage - a.matchPercentage;
        // Using match as proxy for rating
        default:
          return 0;
      }
    });
    return sorted;
  };
  const filteredRecipes = getFilteredAndSortedRecipes();
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
      <header className="bg-white px-6 py-4 border-b border-gray-100 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <button
              onClick={() => navigateTo('recipe-discovery')}
              className="mr-3 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Go back">

              <ArrowLeftIcon size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-[#1A1A1A]">
                {categoryLabel}
              </h1>
              <p className="text-sm text-[#64748B]">
                {filteredRecipes.length} recipe
                {filteredRecipes.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Open filters">

            <FilterIcon size={20} />
          </button>
        </div>
      </header>

      {/* Active Filters Display */}
      {activeFilters.length > 0 &&
      <div className="px-6 py-3 bg-white border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) =>
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className="px-3 py-1.5 bg-[#4CAF50] text-white rounded-full text-sm font-medium flex items-center hover:bg-[#43A047] transition-colors">

                {filter}
                <XIcon size={14} className="ml-1.5" />
              </button>
          )}
            <button
            onClick={() => setActiveFilters([])}
            className="px-3 py-1.5 text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors">

              Clear all
            </button>
          </div>
        </div>
      }

      {/* Recipe Grid */}
      <main className="flex-1 overflow-y-auto p-6 pb-24">
        {filteredRecipes.length === 0 ?
        <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FilterIcon size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more results
            </p>
            <button
            onClick={() => setActiveFilters([])}
            className="px-4 py-2 bg-[#4CAF50] text-white rounded-full text-sm font-medium hover:bg-[#43A047] transition-colors">

              Clear all filters
            </button>
          </div> :

        <div className="grid grid-cols-2 gap-4">
            {filteredRecipes.map((recipe) =>
          <div
            key={recipe.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">

                {/* Recipe Image */}
                <div
              className="relative cursor-pointer"
              onClick={() => navigateTo('recipe-detail')}>

                  <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover" />

                  {/* Subtle + button in top right */}
                  <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToMealPlan(recipe);
                }}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
                aria-label="Add to meal plan">

                    <PlusIcon size={18} className="text-[#1A1A1A]" />
                  </button>
                </div>

                {/* Recipe Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-[#1A1A1A] mb-2 line-clamp-2">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center text-xs text-[#64748B]">
                    <ClockIcon size={12} className="mr-1" />
                    <span>{recipe.cookingTime}</span>
                  </div>
                </div>
              </div>
          )}
          </div>
        }
      </main>

      {/* Filter Modal */}
      {showFilters &&
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-2xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Filter & Sort</h2>
              <button
              onClick={() => setShowFilters(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close filters">

                <XIcon size={20} />
              </button>
            </div>

            {/* Dietary Filters */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#64748B] mb-3">
                Dietary Preferences
              </h3>
              <div className="flex flex-wrap gap-2">
                {dietaryFilters.map((filter) =>
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilters.includes(filter) ? 'bg-[#4CAF50] text-white shadow-sm' : 'bg-gray-100 text-[#757575] hover:bg-gray-200'}`}>

                    {filter}
                  </button>
              )}
              </div>
            </div>

            {/* Sort Options */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#64748B] mb-3">
                Sort By
              </h3>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((option) =>
              <button
                key={option.id}
                onClick={() => setSortBy(option.id as typeof sortBy)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${sortBy === option.id ? 'bg-[#4CAF50] text-white shadow-sm' : 'bg-gray-100 text-[#757575] hover:bg-gray-200'}`}>

                    {option.label}
                  </button>
              )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
              onClick={() => {
                setActiveFilters([]);
                setSortBy('match');
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