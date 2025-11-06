import React, { useState } from 'react';
import { ArrowLeftIcon, BookmarkIcon, ClockIcon, FlameIcon, ChefHatIcon, ShareIcon, CheckIcon, PlayIcon, UsersIcon, TrendingUpIcon, HeartIcon, MessageCircleIcon } from 'lucide-react';
interface RecipeDetailScreenV2Props {
  navigateTo: (screen: string) => void;
  onMarkAsPrepared: () => void;
}
export const RecipeDetailScreenV2: React.FC<RecipeDetailScreenV2Props> = ({
  navigateTo,
  onMarkAsPrepared
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const ingredients = [{
    id: 1,
    name: '2 chicken breasts',
    available: true
  }, {
    id: 2,
    name: '1 cup brown rice',
    available: true
  }, {
    id: 3,
    name: '2 bell peppers',
    available: true
  }, {
    id: 4,
    name: '1 tbsp olive oil',
    available: false
  }, {
    id: 5,
    name: '2 cloves garlic',
    available: true
  }, {
    id: 6,
    name: 'Salt and pepper',
    available: true
  }];
  const instructions = ['Preheat oven to 375°F (190°C)', 'Season chicken breasts with salt and pepper', 'Combine rice and 2 cups water in a large oven-safe pan', 'Dice bell peppers and mince garlic', 'Add vegetables and chicken to the pan', 'Drizzle with olive oil and bake for 25-30 minutes'];
  const toggleIngredient = (id: number) => {
    setCheckedIngredients(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const toggleStep = (index: number) => {
    setCompletedSteps(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };
  const progress = completedSteps.length / instructions.length * 100;
  return <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-20">
        <button onClick={() => navigateTo('home')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeftIcon size={20} />
        </button>
        <div className="flex space-x-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <ShareIcon size={20} />
          </button>
          <button onClick={() => setIsBookmarked(!isBookmarked)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <BookmarkIcon size={20} className={isBookmarked ? 'fill-emerald-500 text-emerald-500' : ''} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Hero Card */}
        <div className="mx-6 mt-6 bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="relative h-56">
            <img src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="One-Pan Chicken Dinner" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900 shadow-md">
              ⭐ 4.8 (124)
            </div>
            <button className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
              <PlayIcon size={20} className="text-gray-900 ml-0.5" />
            </button>
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              One-Pan Chicken Dinner
            </h1>
            <p className="text-gray-600 mb-4">
              A delicious and easy weeknight meal that's packed with protein and
              vegetables
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <UsersIcon size={16} className="mr-1" />
              <span className="font-medium">Chef Maria</span>
              <span className="mx-2">•</span>
              <span>Updated 2 days ago</span>
            </div>
          </div>
        </div>
        {/* Stats Grid */}
        <div className="mx-6 mt-4 grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <ClockIcon size={20} className="text-emerald-600" />
              </div>
              <TrendingUpIcon size={16} className="text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">35 min</p>
            <p className="text-sm text-gray-500">Total time</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <FlameIcon size={20} className="text-amber-600" />
              </div>
              <TrendingUpIcon size={16} className="text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">520</p>
            <p className="text-sm text-gray-500">Calories</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <ChefHatIcon size={20} className="text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">Medium</p>
            <p className="text-sm text-gray-500">Difficulty</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <UsersIcon size={20} className="text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">2 servings</p>
            <p className="text-sm text-gray-500">Serves</p>
          </div>
        </div>
        {/* Ingredients Card */}
        <div className="mx-6 mt-6 bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Ingredients</h2>
            <span className="text-sm text-gray-500">
              {checkedIngredients.length}/{ingredients.length} checked
            </span>
          </div>
          <div className="space-y-2">
            {ingredients.map(ingredient => <button key={ingredient.id} onClick={() => toggleIngredient(ingredient.id)} className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className={`w-6 h-6 rounded-lg mr-3 flex items-center justify-center transition-colors ${checkedIngredients.includes(ingredient.id) ? 'bg-emerald-500' : 'bg-gray-200 group-hover:bg-gray-300'}`}>
                  {checkedIngredients.includes(ingredient.id) && <CheckIcon size={16} className="text-white" />}
                </div>
                <span className={`flex-1 text-left ${checkedIngredients.includes(ingredient.id) ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {ingredient.name}
                </span>
                {!ingredient.available && <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-lg">
                    Missing
                  </span>}
              </button>)}
          </div>
        </div>
        {/* Instructions Card */}
        <div className="mx-6 mt-6 bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Instructions</h2>
            <span className="text-sm text-gray-500">
              {completedSteps.length}/{instructions.length} done
            </span>
          </div>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500" style={{
              width: `${progress}%`
            }} />
            </div>
          </div>
          <div className="space-y-4">
            {instructions.map((instruction, index) => <button key={index} onClick={() => toggleStep(index)} className="w-full flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className={`w-8 h-8 rounded-full mr-4 flex items-center justify-center flex-shrink-0 font-bold transition-all ${completedSteps.includes(index) ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'}`}>
                  {completedSteps.includes(index) ? <CheckIcon size={16} /> : index + 1}
                </div>
                <p className={`flex-1 text-left leading-relaxed ${completedSteps.includes(index) ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {instruction}
                </p>
              </button>)}
          </div>
        </div>
        {/* Social Proof */}
        <div className="mx-6 mt-6 bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Community Feedback
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-red-50 rounded-full flex items-center justify-center">
                <HeartIcon size={20} className="text-red-500 fill-red-500" />
              </div>
              <p className="text-lg font-bold text-gray-900">1.2k</p>
              <p className="text-xs text-gray-500">Likes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-blue-50 rounded-full flex items-center justify-center">
                <MessageCircleIcon size={20} className="text-blue-500" />
              </div>
              <p className="text-lg font-bold text-gray-900">124</p>
              <p className="text-xs text-gray-500">Reviews</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-purple-50 rounded-full flex items-center justify-center">
                <BookmarkIcon size={20} className="text-purple-500" />
              </div>
              <p className="text-lg font-bold text-gray-900">856</p>
              <p className="text-xs text-gray-500">Saved</p>
            </div>
          </div>
        </div>
      </div>
      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-6 bg-gradient-to-t from-white via-white to-transparent">
        <button onClick={onMarkAsPrepared} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95">
          Complete Recipe
        </button>
      </div>
    </div>;
};