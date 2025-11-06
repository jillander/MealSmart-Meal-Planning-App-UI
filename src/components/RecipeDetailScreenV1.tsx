import React, { useState } from 'react';
import { ArrowLeftIcon, BookmarkIcon, ClockIcon, FlameIcon, ChefHatIcon, ShareIcon, CheckCircleIcon, CircleIcon, PlayCircleIcon, UsersIcon } from 'lucide-react';
interface RecipeDetailScreenV1Props {
  navigateTo: (screen: string) => void;
  onMarkAsPrepared: () => void;
}
export const RecipeDetailScreenV1: React.FC<RecipeDetailScreenV1Props> = ({
  navigateTo,
  onMarkAsPrepared
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
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
    name: 'Salt and pepper to taste',
    available: true
  }];
  const instructions = ['Preheat oven to 375°F (190°C)', 'Season chicken breasts with salt and pepper', 'Combine rice and 2 cups water in a large oven-safe pan', 'Dice bell peppers and mince garlic', 'Add vegetables and chicken to the pan', 'Drizzle with olive oil and bake for 25-30 minutes', 'Let rest for 5 minutes before serving'];
  const toggleIngredient = (id: number) => {
    setCheckedIngredients(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  return <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Image Section */}
      <div className="relative h-[50vh] bg-gradient-to-b from-gray-900 to-gray-800">
        <img src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="One-Pan Chicken Dinner" className="w-full h-full object-cover opacity-90" />
        {/* Floating Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <button onClick={() => navigateTo('home')} className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
            <ArrowLeftIcon size={20} className="text-gray-900" />
          </button>
          <div className="flex space-x-3">
            <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <ShareIcon size={20} className="text-gray-900" />
            </button>
            <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <BookmarkIcon size={20} className="text-gray-900" />
            </button>
          </div>
        </div>
        {/* Recipe Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <h1 className="text-3xl font-bold text-white mb-2">
            One-Pan Chicken Dinner
          </h1>
          <div className="flex items-center space-x-4 text-white/90 text-sm">
            <div className="flex items-center">
              <UsersIcon size={16} className="mr-1" />
              <span>by Chef Maria</span>
            </div>
            <span>•</span>
            <span>4.8 ⭐ (124 reviews)</span>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 px-6 py-6 border-b border-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-emerald-50 rounded-full flex items-center justify-center">
            <ClockIcon size={20} className="text-emerald-600" />
          </div>
          <p className="text-lg font-bold text-gray-900">35</p>
          <p className="text-xs text-gray-500">minutes</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-amber-50 rounded-full flex items-center justify-center">
            <FlameIcon size={20} className="text-amber-600" />
          </div>
          <p className="text-lg font-bold text-gray-900">520</p>
          <p className="text-xs text-gray-500">calories</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-blue-50 rounded-full flex items-center justify-center">
            <ChefHatIcon size={20} className="text-blue-600" />
          </div>
          <p className="text-lg font-bold text-gray-900">Medium</p>
          <p className="text-xs text-gray-500">difficulty</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-purple-50 rounded-full flex items-center justify-center">
            <UsersIcon size={20} className="text-purple-600" />
          </div>
          <p className="text-lg font-bold text-gray-900">2</p>
          <p className="text-xs text-gray-500">servings</p>
        </div>
      </div>
      {/* Video Section */}
      <div className="px-6 py-6 border-b border-gray-100">
        <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 flex items-center justify-between text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-left">
            <p className="text-sm font-medium opacity-90">Watch Tutorial</p>
            <p className="text-lg font-bold">Step-by-step video guide</p>
          </div>
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <PlayCircleIcon size={32} className="text-white" />
          </div>
        </button>
      </div>
      {/* Tab Navigation */}
      <div className="px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="flex space-x-2 bg-gray-100 rounded-full p-1">
          <button onClick={() => setActiveTab('ingredients')} className={`flex-1 py-3 rounded-full text-sm font-medium transition-all ${activeTab === 'ingredients' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
            Ingredients ({ingredients.length})
          </button>
          <button onClick={() => setActiveTab('instructions')} className={`flex-1 py-3 rounded-full text-sm font-medium transition-all ${activeTab === 'instructions' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
            Instructions ({instructions.length})
          </button>
        </div>
      </div>
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {activeTab === 'ingredients' ? <div className="space-y-3">
            {ingredients.map(ingredient => <button key={ingredient.id} onClick={() => toggleIngredient(ingredient.id)} className="w-full flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-6 h-6 mr-4 flex-shrink-0">
                  {checkedIngredients.includes(ingredient.id) ? <CheckCircleIcon size={24} className="text-emerald-500 animate-scale-in" /> : <CircleIcon size={24} className="text-gray-300" />}
                </div>
                <span className={`flex-1 text-left ${checkedIngredients.includes(ingredient.id) ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {ingredient.name}
                </span>
                {!ingredient.available && <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                    Missing
                  </span>}
              </button>)}
          </div> : <div className="space-y-6">
            {instructions.map((instruction, index) => <div key={index} className="flex">
                <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-md">
                  {index + 1}
                </div>
                <p className="flex-1 text-gray-700 leading-relaxed pt-2">
                  {instruction}
                </p>
              </div>)}
          </div>}
      </div>
      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-6 bg-gradient-to-t from-white via-white to-transparent">
        <button onClick={onMarkAsPrepared} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95">
          Mark as Prepared
        </button>
      </div>
    </div>;
};