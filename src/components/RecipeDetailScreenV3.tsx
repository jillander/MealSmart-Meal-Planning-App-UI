import React, { useState } from 'react';
import { ArrowLeftIcon, BookmarkIcon, ClockIcon, FlameIcon, ChefHatIcon, ShareIcon, CheckIcon, PlayIcon, UsersIcon, StarIcon, ShoppingCartIcon, PrinterIcon, MoreVerticalIcon } from 'lucide-react';
interface RecipeDetailScreenV3Props {
  navigateTo: (screen: string) => void;
  onMarkAsPrepared: () => void;
}
export const RecipeDetailScreenV3: React.FC<RecipeDetailScreenV3Props> = ({
  navigateTo,
  onMarkAsPrepared
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [servings, setServings] = useState(2);
  const ingredients = [{
    id: 1,
    name: 'chicken breasts',
    amount: 2,
    unit: 'pieces'
  }, {
    id: 2,
    name: 'brown rice',
    amount: 1,
    unit: 'cup'
  }, {
    id: 3,
    name: 'bell peppers',
    amount: 2,
    unit: 'pieces'
  }, {
    id: 4,
    name: 'olive oil',
    amount: 1,
    unit: 'tbsp'
  }, {
    id: 5,
    name: 'garlic cloves',
    amount: 2,
    unit: 'pieces'
  }, {
    id: 6,
    name: 'salt and pepper',
    amount: 1,
    unit: 'to taste'
  }];
  const instructions = [{
    step: 1,
    title: 'Preheat & Prep',
    description: 'Preheat oven to 375°F (190°C) and gather all ingredients',
    time: '5 min'
  }, {
    step: 2,
    title: 'Season Chicken',
    description: 'Season chicken breasts generously with salt and pepper',
    time: '2 min'
  }, {
    step: 3,
    title: 'Prepare Rice',
    description: 'Combine rice and 2 cups water in a large oven-safe pan',
    time: '3 min'
  }, {
    step: 4,
    title: 'Prep Vegetables',
    description: 'Dice bell peppers into 1-inch pieces and mince garlic',
    time: '5 min'
  }, {
    step: 5,
    title: 'Combine',
    description: 'Add vegetables and chicken to the pan with rice',
    time: '2 min'
  }, {
    step: 6,
    title: 'Bake',
    description: 'Drizzle with olive oil and bake for 25-30 minutes',
    time: '30 min'
  }];
  const toggleIngredient = (id: number) => {
    setCheckedIngredients(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const adjustServings = (delta: number) => {
    const newServings = Math.max(1, servings + delta);
    setServings(newServings);
  };
  return <div className="flex flex-col min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Compact Header */}
      <div className="bg-white/80 backdrop-blur-md px-6 py-3 flex items-center justify-between border-b border-emerald-100 sticky top-0 z-20">
        <button onClick={() => navigateTo('home')} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeftIcon size={18} />
        </button>
        <div className="flex space-x-1">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <PrinterIcon size={18} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <ShareIcon size={18} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <BookmarkIcon size={18} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <MoreVerticalIcon size={18} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Hero Section with Floating Card */}
        <div className="relative px-6 pt-6 pb-16">
          <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="One-Pan Chicken Dinner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <button className="absolute top-4 right-4 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <PlayIcon size={24} className="text-emerald-600 ml-1" />
            </button>
          </div>
          {/* Floating Info Card */}
          <div className="absolute left-6 right-6 -bottom-8 bg-white rounded-2xl shadow-xl p-5">
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              One-Pan Chicken Dinner
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <StarIcon size={16} className="text-amber-400 fill-amber-400 mr-1" />
                  <span className="font-semibold">4.8</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">124 reviews</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <UsersIcon size={16} className="mr-1" />
                <span>Chef Maria</span>
              </div>
            </div>
          </div>
        </div>
        {/* Quick Stats Bar */}
        <div className="px-6 pt-4 pb-6">
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-3">
                <ClockIcon size={18} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Time</p>
                <p className="font-bold text-gray-900">35 min</p>
              </div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="flex items-center">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mr-3">
                <FlameIcon size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Calories</p>
                <p className="font-bold text-gray-900">520</p>
              </div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                <ChefHatIcon size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Level</p>
                <p className="font-bold text-gray-900">Medium</p>
              </div>
            </div>
          </div>
        </div>
        {/* Ingredients Section */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Ingredients</h2>
              <div className="flex items-center space-x-2">
                <button onClick={() => adjustServings(-1)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  -
                </button>
                <span className="text-sm font-medium w-12 text-center">
                  {servings} servings
                </span>
                <button onClick={() => adjustServings(1)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  +
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {ingredients.map(ingredient => {
              const multiplier = servings / 2;
              const adjustedAmount = ingredient.unit !== 'to taste' ? Math.round(ingredient.amount * multiplier * 10) / 10 : ingredient.amount;
              return <button key={ingredient.id} onClick={() => toggleIngredient(ingredient.id)} className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div className={`w-5 h-5 rounded-md mr-3 flex items-center justify-center transition-all ${checkedIngredients.includes(ingredient.id) ? 'bg-emerald-500' : 'bg-gray-200 group-hover:bg-gray-300'}`}>
                      {checkedIngredients.includes(ingredient.id) && <CheckIcon size={14} className="text-white" />}
                    </div>
                    <span className={`flex-1 text-left text-sm ${checkedIngredients.includes(ingredient.id) ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      <span className="font-semibold">
                        {adjustedAmount} {ingredient.unit}
                      </span>{' '}
                      {ingredient.name}
                    </span>
                  </button>;
            })}
            </div>
            <button className="w-full mt-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-medium text-sm hover:bg-emerald-100 transition-colors flex items-center justify-center">
              <ShoppingCartIcon size={18} className="mr-2" />
              Add missing items to cart
            </button>
          </div>
        </div>
        {/* Instructions Section */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Cooking Steps
            </h2>
            <div className="space-y-3">
              {instructions.map((instruction, index) => <button key={index} onClick={() => setActiveStep(index)} className={`w-full p-4 rounded-xl transition-all ${activeStep === index ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200' : 'bg-gray-50 hover:bg-gray-100'}`}>
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0 ${activeStep === index ? 'bg-emerald-500 text-white' : 'bg-white text-gray-600'}`}>
                      {instruction.step}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {instruction.title}
                        </h3>
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                          {instruction.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {instruction.description}
                      </p>
                    </div>
                  </div>
                </button>)}
            </div>
          </div>
        </div>
      </div>
      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto px-6 py-4 bg-gradient-to-t from-white via-white to-transparent">
        <button onClick={onMarkAsPrepared} className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center">
          <CheckIcon size={20} className="mr-2" />
          Mark as Completed
        </button>
      </div>
    </div>;
};