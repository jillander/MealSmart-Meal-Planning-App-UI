import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  BookmarkIcon,
  ClockIcon,
  BarChartIcon,
  DumbbellIcon,
  PlayIcon,
  CheckIcon,
  XIcon,
  ChefHatIcon,
  FlameIcon } from
'lucide-react';
interface RecipeDetailScreenProps {
  navigateTo: (screen: string) => void;
  onMarkAsPrepared: () => void;
}
export const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({
  navigateTo,
  onMarkAsPrepared
}) => {
  const [activeTab, setActiveTab] = useState<
    'ingredients' | 'method' | 'nutrition'>(
    'ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const toggleIngredient = (id: string) => {
    setCheckedIngredients((prev) =>
    prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  // Organized ingredient groups
  const ingredientGroups = [
  {
    title: 'Main Ingredients',
    items: [
    {
      id: 'chicken',
      name: '8 Boneless Skinless Chicken Thighs',
      emoji: '🍗'
    },
    {
      id: 'broccoli',
      name: '1 Broccoli',
      emoji: '🥦'
    },
    {
      id: 'rice',
      name: '300g Jasmine Rice',
      emoji: '🍚'
    },
    {
      id: 'onions',
      name: '3 Spring Onions',
      emoji: '🧅'
    }]

  },
  {
    title: 'For the Marinade',
    items: [
    {
      id: 'garlic-powder',
      name: '1 tbsp Garlic Powder',
      emoji: '🧄'
    },
    {
      id: 'chilli',
      name: '½ tbsp Chilli Powder',
      emoji: '🌶️'
    },
    {
      id: 'flour',
      name: '2 tbsp Plain Flour',
      emoji: '🌾'
    }]

  },
  {
    title: 'For the Sauce',
    items: [
    {
      id: 'garlic',
      name: '4 Garlic Cloves',
      emoji: '🧄'
    },
    {
      id: 'gochujang',
      name: '2 tbsp Gochujang',
      emoji: '🌶️'
    },
    {
      id: 'soy',
      name: '2 tbsp Soy Sauce',
      emoji: '🥢'
    },
    {
      id: 'honey',
      name: '3 tbsp Honey',
      emoji: '🍯'
    },
    {
      id: 'lime',
      name: '2 Limes',
      emoji: '🍋'
    }]

  },
  {
    title: 'Additional',
    items: [
    {
      id: 'sesame',
      name: '2 tbsp Sesame Seeds',
      emoji: '🌰'
    },
    {
      id: 'oil',
      name: 'Olive Oil',
      emoji: '🫒'
    }]

  }];

  // Organized instruction groups
  const instructionGroups = [
  {
    title: 'Prepare the Base',
    steps: [
    {
      number: 1,
      text: 'Heat the oven to 200°C fan. Dice the broccoli into small pieces. Cook the rice following pack instructions, adding the broccoli 3 mins before the end of the cooking time.',
      ingredients: ['broccoli', 'rice']
    }]

  },
  {
    title: 'Make the Marinade',
    steps: [
    {
      number: 2,
      text: 'Meanwhile, thinly slice the spring onions. Dice the chicken into 3cm pieces. In a bowl or flat tray, mix the garlic powder, chilli powder, flour and a pinch of salt.',
      ingredients: [
      'onions',
      'chicken',
      'garlic-powder',
      'chilli',
      'flour']

    },
    {
      number: 3,
      text: 'Coat the chicken pieces in the spice mixture, ensuring each piece is well covered.',
      ingredients: ['chicken']
    }]

  },
  {
    title: 'Prepare the Sauce',
    steps: [
    {
      number: 4,
      text: 'Finely chop or crush the garlic cloves. In a small bowl, mix together the gochujang, soy sauce, honey, and juice from the limes to create the sauce.',
      ingredients: ['garlic', 'gochujang', 'soy', 'honey', 'lime']
    }]

  },
  {
    title: 'Cook & Serve',
    steps: [
    {
      number: 5,
      text: 'Heat a drizzle of olive oil in a large frying pan over medium-high heat. Add the coated chicken pieces and cook for 8-10 minutes, turning occasionally until golden and cooked through.',
      ingredients: ['chicken', 'oil']
    },
    {
      number: 6,
      text: 'Pour the sauce over the chicken and toss to coat. Cook for another 2-3 minutes until the sauce is sticky and caramelized.',
      ingredients: []
    },
    {
      number: 7,
      text: 'Serve the sticky chicken over the rice and broccoli. Garnish with sliced spring onions and sesame seeds.',
      ingredients: ['onions', 'sesame']
    }]

  }];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-white text-[#1A1A1A]">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>

      {/* Recipe Image */}
      <div className="relative w-full h-64">
        <img
          src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="Sticky Gochujang Chicken"
          className="w-full h-full object-cover" />

        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between">
          <button
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
            onClick={() => navigateTo('recipe-discovery')}
            aria-label="Go back">

            <ArrowLeftIcon size={20} className="text-[#1A1A1A]" />
          </button>
          <button
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Save recipe">

            <BookmarkIcon size={20} className="text-[#1A1A1A]" />
          </button>
        </div>
      </div>

      {/* Recipe Header */}
      <div className="px-6 pt-6 pb-4 bg-white">
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">
          Sticky Gochujang Chicken
        </h1>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center mr-2">
            <span className="text-white text-xs font-bold">CM</span>
          </div>
          <span className="text-sm text-[#64748B]">by @ChefMaria</span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-1">
              <FlameIcon size={18} className="text-orange-500" />
            </div>
            <span className="text-sm font-bold text-[#1A1A1A]">520</span>
            <span className="text-xs text-[#64748B]">cal</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-1">
              <DumbbellIcon size={18} className="text-blue-500" />
            </div>
            <span className="text-sm font-bold text-[#1A1A1A]">35g</span>
            <span className="text-xs text-[#64748B]">protein</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-1">
              <span className="text-purple-500 font-bold text-sm">C</span>
            </div>
            <span className="text-sm font-bold text-[#1A1A1A]">45g</span>
            <span className="text-xs text-[#64748B]">carbs</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-1">
              <ClockIcon size={18} className="text-green-500" />
            </div>
            <span className="text-sm font-bold text-[#1A1A1A]">35</span>
            <span className="text-xs text-[#64748B]">mins</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-1">
              <ChefHatIcon size={18} className="text-amber-500" />
            </div>
            <span className="text-xs text-[#64748B] text-center leading-tight">
              Medium
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 mb-4">
        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === 'ingredients' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#64748B]'}`}>

            Ingredients
          </button>
          <button
            onClick={() => setActiveTab('method')}
            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === 'method' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#64748B]'}`}>

            Method
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === 'nutrition' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#64748B]'}`}>

            Nutrition
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Ingredients Tab */}
        {activeTab === 'ingredients' &&
        <div className="px-6 animate-fade-in">
            {/* Shopping List CTA */}
            <div className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">
                    At the shops?
                  </h3>
                  <p className="text-sm text-[#64748B]">
                    Start checking off your ingredients
                  </p>
                </div>
                <button className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <ArrowLeftIcon size={20} className="text-white rotate-180" />
                </button>
              </div>
            </div>

            {/* Ingredient Groups */}
            {ingredientGroups.map((group, groupIndex) =>
          <div key={groupIndex} className="mb-6">
                <h3 className="text-base font-bold text-[#1A1A1A] mb-3">
                  {group.title}
                </h3>
                <div className="space-y-3">
                  {group.items.map((item) => {
                const isChecked = checkedIngredients.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleIngredient(item.id)}
                    className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">

                        <div className="flex items-center flex-1">
                          <span className="text-2xl mr-3">{item.emoji}</span>
                          <span
                        className={`text-base ${isChecked ? 'text-[#94A3B8] line-through' : 'text-[#1A1A1A]'}`}>

                            {item.name}
                          </span>
                        </div>
                        <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isChecked ? 'bg-[#4CAF50] border-[#4CAF50]' : 'border-gray-300'}`}>

                          {isChecked &&
                      <CheckIcon size={14} className="text-white" />
                      }
                        </div>
                      </button>);

              })}
                </div>
              </div>
          )}
          </div>
        }

        {/* Method Tab */}
        {activeTab === 'method' &&
        <div className="px-6 animate-fade-in">
            {/* Cooking Mode Toggle */}
            <div className="mb-6 bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">
                    Cooking mode
                  </h3>
                  <p className="text-sm text-[#64748B]">
                    Keep your screen awake as you cook
                  </p>
                </div>
                <button className="w-12 h-7 bg-gray-300 rounded-full relative transition-colors">
                  <div className="w-5 h-5 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
                </button>
              </div>
            </div>

            {/* Instruction Groups */}
            {instructionGroups.map((group, groupIndex) =>
          <div key={groupIndex} className="mb-8">
                <h3 className="text-base font-bold text-[#1A1A1A] mb-4">
                  {group.title}
                </h3>
                <div className="space-y-6">
                  {group.steps.map((step) =>
              <div key={step.number} className="relative">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                          {step.number}
                        </div>
                        <div className="flex-1">
                          <p className="text-base text-[#1A1A1A] leading-relaxed mb-3">
                            {step.text}
                          </p>
                          {step.ingredients.length > 0 &&
                    <div className="flex flex-wrap gap-2">
                              {step.ingredients.map((ingredientId) => {
                        const ingredient = ingredientGroups.
                        flatMap((g) => g.items).
                        find((i) => i.id === ingredientId);
                        return ingredient ?
                        <div
                          key={ingredientId}
                          className="inline-flex items-center px-3 py-1.5 bg-gray-100 rounded-full">

                                    <span className="text-base mr-1.5">
                                      {ingredient.emoji}
                                    </span>
                                    <span className="text-xs text-[#64748B]">
                                      {ingredient.name.
                            split(' ').
                            slice(1).
                            join(' ')}
                                    </span>
                                  </div> :
                        null;
                      })}
                            </div>
                    }
                        </div>
                      </div>
                    </div>
              )}
                </div>
              </div>
          )}
          </div>
        }

        {/* Nutrition Tab */}
        {activeTab === 'nutrition' &&
        <div className="px-6 animate-fade-in">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">
                Nutritional Information
              </h3>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-[#1A1A1A] mb-1">
                  520
                </div>
                <div className="text-sm text-[#64748B]">
                  calories per serving
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#64748B]">Protein</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-white rounded-full mr-3 overflow-hidden">
                      <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: '70%'
                      }}>
                    </div>
                    </div>
                    <span className="text-sm font-bold text-[#1A1A1A] w-12 text-right">
                      35g
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#64748B]">Carbs</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-white rounded-full mr-3 overflow-hidden">
                      <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: '60%'
                      }}>
                    </div>
                    </div>
                    <span className="text-sm font-bold text-[#1A1A1A] w-12 text-right">
                      45g
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#64748B]">Fat</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-white rounded-full mr-3 overflow-hidden">
                      <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: '40%'
                      }}>
                    </div>
                    </div>
                    <span className="text-sm font-bold text-[#1A1A1A] w-12 text-right">
                      15g
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#64748B]">Fiber</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-white rounded-full mr-3 overflow-hidden">
                      <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: '50%'
                      }}>
                    </div>
                    </div>
                    <span className="text-sm font-bold text-[#1A1A1A] w-12 text-right">
                      8g
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Nutrition Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-sm text-[#64748B] mb-1">Sodium</div>
                <div className="text-2xl font-bold text-[#1A1A1A]">680mg</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-sm text-[#64748B] mb-1">Sugar</div>
                <div className="text-2xl font-bold text-[#1A1A1A]">12g</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-sm text-[#64748B] mb-1">Cholesterol</div>
                <div className="text-2xl font-bold text-[#1A1A1A]">95mg</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-sm text-[#64748B] mb-1">Vitamin C</div>
                <div className="text-2xl font-bold text-[#1A1A1A]">45%</div>
              </div>
            </div>
          </div>
        }
      </div>

      {/* Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 max-w-[430px] mx-auto">
        <button
          className="w-full bg-[#4CAF50] text-white py-4 rounded-full font-semibold text-base shadow-lg hover:bg-[#43A047] transition-colors"
          onClick={onMarkAsPrepared}>

          Mark as Prepared
        </button>
      </div>
    </div>);

};