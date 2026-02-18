import React, { useState } from 'react';
import { ChevronRightIcon, ArrowRightIcon, CheckIcon } from 'lucide-react';
interface MealPrepSetupProps {
  onComplete: () => void;
}
export const MealPrepSetup: React.FC<MealPrepSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    mealsPerDay: 3,
    cuisine: [],
    dietType: '',
    days: 7,
    portions: 'regular'
  });
  const dietTypes = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'No specific dietary restrictions'
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    description: 'No meat or fish'
  },
  {
    id: 'vegan',
    name: 'Vegan',
    description: 'No animal products'
  },
  {
    id: 'keto',
    name: 'Keto',
    description: 'Low carb, high fat'
  },
  {
    id: 'paleo',
    name: 'Paleo',
    description: 'Whole foods, no grains'
  }];

  const cuisineTypes = [
  {
    id: 'italian',
    name: 'Italian',
    emoji: '🍝'
  },
  {
    id: 'mexican',
    name: 'Mexican',
    emoji: '🌮'
  },
  {
    id: 'asian',
    name: 'Asian',
    emoji: '🍜'
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean',
    emoji: '🫒'
  },
  {
    id: 'american',
    name: 'American',
    emoji: '🍔'
  }];

  const handleCuisineToggle = (cuisineId: string) => {
    setPreferences((prev) => {
      if (prev.cuisine.includes(cuisineId)) {
        return {
          ...prev,
          cuisine: prev.cuisine.filter((id) => id !== cuisineId)
        };
      } else {
        return {
          ...prev,
          cuisine: [...prev.cuisine, cuisineId]
        };
      }
    });
  };
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">
              How many meals per day?
            </h3>
            {[2, 3, 4, 5].map((number) =>
            <button
              key={number}
              onClick={() => {
                setPreferences((prev) => ({
                  ...prev,
                  mealsPerDay: number
                }));
                setStep(2);
              }}
              className="w-full p-4 bg-white rounded-xl border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200">

                <span className="font-medium">{number} meals</span>
                <ChevronRightIcon size={20} className="text-[#4CAF50]" />
              </button>
            )}
          </div>);

      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">
              Select your diet type
            </h3>
            {dietTypes.map((diet) =>
            <button
              key={diet.id}
              onClick={() => {
                setPreferences((prev) => ({
                  ...prev,
                  dietType: diet.id
                }));
                setStep(3);
              }}
              className="w-full p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">

                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-medium text-[#1A1A1A]">{diet.name}</p>
                    <p className="text-sm text-[#757575]">{diet.description}</p>
                  </div>
                  <ChevronRightIcon size={20} className="text-[#4CAF50]" />
                </div>
              </button>
            )}
          </div>);

      case 3:
        return (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">
              What cuisines do you prefer?
            </h3>
            <p className="text-sm text-[#757575] mb-4">Select all that apply</p>
            <div className="grid grid-cols-2 gap-3">
              {cuisineTypes.map((cuisine) =>
              <button
                key={cuisine.id}
                onClick={() => handleCuisineToggle(cuisine.id)}
                className={`p-4 rounded-xl border ${preferences.cuisine.includes(cuisine.id) ? 'border-[#4CAF50] bg-[#4CAF50]/10' : 'border-gray-100 bg-white'} transition-all duration-200`}>

                  <div className="flex flex-col items-center text-center">
                    <span className="text-2xl mb-2">{cuisine.emoji}</span>
                    <span className="text-sm font-medium">{cuisine.name}</span>
                    {preferences.cuisine.includes(cuisine.id) &&
                  <CheckIcon size={16} className="text-[#4CAF50] mt-2" />
                  }
                  </div>
                </button>
              )}
            </div>
            <button
              onClick={() => setStep(4)}
              className="w-full mt-4 py-3 bg-[#4CAF50] text-white rounded-full font-medium flex items-center justify-center">

              Continue
              <ArrowRightIcon size={18} className="ml-2" />
            </button>
          </div>);

      case 4:
        return (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">
              How many days do you want to prep for?
            </h3>
            {[3, 5, 7].map((dayCount) =>
            <button
              key={dayCount}
              onClick={() => {
                setPreferences((prev) => ({
                  ...prev,
                  days: dayCount
                }));
                setStep(5);
              }}
              className="w-full p-4 bg-white rounded-xl border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-200">

                <span className="font-medium">{dayCount} days</span>
                <ChevronRightIcon size={20} className="text-[#4CAF50]" />
              </button>
            )}
          </div>);

      case 5:
        return (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">
              All set! Ready to start?
            </h3>
            <div className="bg-white rounded-xl p-5 border border-gray-100 mb-6">
              <h4 className="font-medium mb-3">Your Meal Plan Preferences</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-[#757575]">Meals per day:</span>
                  <span className="font-medium">{preferences.mealsPerDay}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#757575]">Diet type:</span>
                  <span className="font-medium">
                    {dietTypes.find((d) => d.id === preferences.dietType)?.
                    name || 'Standard'}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#757575]">Preferred cuisines:</span>
                  <span className="font-medium">
                    {preferences.cuisine.length > 0 ?
                    preferences.cuisine.
                    map(
                      (c) => cuisineTypes.find((ct) => ct.id === c)?.name
                    ).
                    join(', ') :
                    'Any'}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#757575]">Prep duration:</span>
                  <span className="font-medium">{preferences.days} days</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onComplete}
              className="w-full py-4 bg-[#4CAF50] text-white rounded-full font-medium text-lg shadow-sm hover:bg-opacity-90 transition-colors">

              Start My Meal Plan
            </button>
          </div>);

      default:
        return null;
    }
  };
  const progressPercentage = step / 5 * 100;
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
          Let's Get Started
        </h2>
        <p className="text-[#757575]">Set up your meal preferences</p>
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-[#4CAF50] transition-all duration-500"
            style={{
              width: `${progressPercentage}%`
            }}>
          </div>
        </div>
        <p className="text-xs text-[#757575] mt-2">Step {step} of 5</p>
      </div>
      {renderStepContent()}
    </div>);

};