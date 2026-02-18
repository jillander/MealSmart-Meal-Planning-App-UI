import React, { useEffect, useState, useRef } from 'react';
import {
  PlusIcon,
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  InfoIcon } from
'lucide-react';
interface MealRowProps {
  meal: {
    type: string;
    name: string;
    calories: number;
    time: string;
    image: string;
    completed: boolean;
    progress?: {
      hasIngredients: boolean;
      hasRecipe: boolean;
      viewedRecipe: boolean;
      completed: boolean;
    };
  };
  onChecklistClick: () => void;
  onCreateRecipe: () => void;
  onImportRecipe: () => void;
}
export const MealRow: React.FC<MealRowProps> = ({
  meal,
  onChecklistClick,
  onCreateRecipe,
  onImportRecipe
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Close options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node))
      {
        setShowOptions(false);
      }
    };
    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);
  // Calculate progress percentage
  const calculateProgress = () => {
    if (!meal.progress) return 0;
    let steps = 0;
    if (meal.progress.hasIngredients) steps++;
    if (meal.progress.hasRecipe) steps++;
    if (meal.progress.viewedRecipe) steps++;
    if (meal.progress.completed) steps++;
    return steps / 4 * 100;
  };
  const progressPercentage = calculateProgress();
  return (
    <div className="space-y-1">
      <div
        className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>

        <div className="flex items-start p-4">
          {/* Checkbox with improved animation */}
          <button
            onClick={onChecklistClick}
            className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${meal.completed ? 'bg-[#4CAF50] border-[#4CAF50]' : 'border-gray-300 hover:border-[#4CAF50]'}`}
            aria-label={
            meal.completed ? 'Mark as incomplete' : 'Mark as complete'
            }>

            {meal.completed &&
            <CheckIcon size={14} className="text-white animate-bounce-in" />
            }
          </button>
          {/* Image with improved hover effect */}
          <div className="ml-4 w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={meal.image}
              alt={meal.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`} />

          </div>
          {/* Content */}
          <div className="ml-4 flex-1">
            <h3 className="font-medium text-[#1A1A1A]">{meal.name}</h3>
            <p className="text-sm text-[#757575] mt-1">
              {meal.calories} calories • {meal.time}
            </p>
            {/* Preparation time indicator */}
            {!meal.completed &&
            <div className="flex items-center mt-2">
                <ClockIcon size={14} className="text-[#FF9800] mr-1" />
                <span className="text-xs text-[#FF9800]">15 min prep time</span>
              </div>
            }
          </div>
          {/* Action Button with improved popup positioning */}
          <div className="relative ml-2">
            <button
              ref={buttonRef}
              onClick={() => setShowOptions(!showOptions)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${isHovered ? 'text-[#4CAF50] bg-[#4CAF50]/10 shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'} hover:scale-110`}
              aria-label="View meal options">

              <PlusIcon
                size={20}
                className={`transition-transform duration-300 ${showOptions ? 'rotate-45' : 'rotate-0'}`} />

            </button>
            {showOptions &&
            <div
              ref={optionsRef}
              className="absolute z-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden w-48"
              style={{
                top: 'calc(100% + 4px)',
                right: 0,
                animation: 'fade-in 0.2s ease-out forwards',
                transformOrigin: 'top right'
              }}>

                <button
                onClick={() => {
                  onCreateRecipe();
                  setShowOptions(false);
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 text-gray-700 border-b border-gray-100 transition-colors duration-200">

                  Plan a Recipe
                </button>
                <button
                onClick={() => {
                  onImportRecipe();
                  setShowOptions(false);
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 text-gray-700 transition-colors duration-200">

                  Import Recipe
                </button>
              </div>
            }
          </div>
        </div>
        {/* Progress bar for meal preparation */}
        {meal.progress && progressPercentage < 100 &&
        <div className="px-4 pb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[#757575]">Meal progress</span>
              <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-[#4CAF50] font-medium flex items-center">

                {showDetails ? 'Hide' : 'Details'}
                <ChevronRightIcon
                size={14}
                className={`ml-1 transition-transform ${showDetails ? 'rotate-90' : ''}`} />

              </button>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
              className="h-full bg-[#4CAF50] transition-all duration-500"
              style={{
                width: `${progressPercentage}%`
              }}>
            </div>
            </div>
          </div>
        }
      </div>
      {/* Expandable details section */}
      {showDetails && meal.progress &&
      <div className="bg-[#F8F9FA] rounded-xl p-3 text-sm animate-fade-in">
          <div className="flex items-start mb-2">
            <InfoIcon size={16} className="text-[#4CAF50] mr-2 mt-0.5" />
            <p className="text-[#1A1A1A]">
              Complete these steps to prepare your meal:
            </p>
          </div>
          <ul className="space-y-2 pl-6">
            <li className="flex items-center">
              <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${meal.progress.hasIngredients ? 'bg-[#4CAF50] border-[#4CAF50]' : 'border-gray-300'}`}>

                {meal.progress.hasIngredients &&
              <CheckIcon size={10} className="text-white" />
              }
              </div>
              <span
              className={
              meal.progress.hasIngredients ?
              'line-through text-[#757575]' :
              ''
              }>

                Gather ingredients
              </span>
            </li>
            <li className="flex items-center">
              <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${meal.progress.hasRecipe ? 'bg-[#4CAF50] border-[#4CAF50]' : 'border-gray-300'}`}>

                {meal.progress.hasRecipe &&
              <CheckIcon size={10} className="text-white" />
              }
              </div>
              <span
              className={
              meal.progress.hasRecipe ? 'line-through text-[#757575]' : ''
              }>

                Review recipe
              </span>
            </li>
            <li className="flex items-center">
              <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${meal.progress.viewedRecipe ? 'bg-[#4CAF50] border-[#4CAF50]' : 'border-gray-300'}`}>

                {meal.progress.viewedRecipe &&
              <CheckIcon size={10} className="text-white" />
              }
              </div>
              <span
              className={
              meal.progress.viewedRecipe ?
              'line-through text-[#757575]' :
              ''
              }>

                Prepare meal
              </span>
            </li>
            <li className="flex items-center">
              <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${meal.progress.completed ? 'bg-[#4CAF50] border-[#4CAF50]' : 'border-gray-300'}`}>

                {meal.progress.completed &&
              <CheckIcon size={10} className="text-white" />
              }
              </div>
              <span
              className={
              meal.progress.completed ? 'line-through text-[#757575]' : ''
              }>

                Log meal
              </span>
            </li>
          </ul>
        </div>
      }
    </div>);

};