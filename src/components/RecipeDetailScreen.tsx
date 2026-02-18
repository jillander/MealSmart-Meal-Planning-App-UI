import React from 'react';
import {
  ArrowLeftIcon,
  BookmarkIcon,
  ClockIcon,
  BarChartIcon,
  DumbbellIcon,
  PlayIcon,
  CheckIcon,
  XIcon } from
'lucide-react';
interface RecipeDetailScreenProps {
  navigateTo: (screen: string) => void;
  onMarkAsPrepared: () => void;
}
export const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({
  navigateTo,
  onMarkAsPrepared
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFE8D6]">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#FFE8D6] text-[#1A3A3A]">
        <span className="text-sm">9:41 AM</span>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Signal</span>
          <span className="text-sm">WiFi</span>
          <span className="text-sm">Battery</span>
        </div>
      </div>
      {/* Recipe Image */}
      <div className="relative w-full h-64">
        <img
          src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="One-Pan Chicken Dinner"
          className="w-full h-full object-cover" />

        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between">
          <button
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
            onClick={() => navigateTo('home')}>

            <ArrowLeftIcon size={20} className="text-[#1A3A3A]" />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <BookmarkIcon size={20} className="text-[#1A3A3A]" />
          </button>
        </div>
      </div>
      {/* Recipe Content */}
      <div className="flex-1 bg-[#FFF9F2] rounded-t-3xl -mt-6 px-6 py-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-[#1A3A3A] mb-1">
          One-Pan Chicken Dinner
        </h1>
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
          <span className="text-sm text-[#2B394A]">by @ChefMaria</span>
        </div>
        {/* Stats Row */}
        <div className="flex justify-between mb-6">
          <div className="flex flex-col items-center">
            <BarChartIcon size={20} className="text-[#FF6B6B] mb-1" />
            <span className="text-sm font-medium text-[#1A3A3A]">520</span>
            <span className="text-xs text-[#2B394A]">calories</span>
          </div>
          <div className="flex flex-col items-center">
            <DumbbellIcon size={20} className="text-[#FF6B6B] mb-1" />
            <span className="text-sm font-medium text-[#1A3A3A]">35g</span>
            <span className="text-xs text-[#2B394A]">protein</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 mb-1 flex items-center justify-center">
              <span className="text-[#FF6B6B] font-bold">F</span>
            </div>
            <span className="text-sm font-medium text-[#1A3A3A]">15g</span>
            <span className="text-xs text-[#2B394A]">fat</span>
          </div>
          <div className="flex flex-col items-center">
            <ClockIcon size={20} className="text-[#FF6B6B] mb-1" />
            <span className="text-sm font-medium text-[#1A3A3A]">35</span>
            <span className="text-xs text-[#2B394A]">minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 mb-1 flex items-center justify-center">
              <span className="text-[#FF6B6B] font-bold">M</span>
            </div>
            <span className="text-xs text-[#2B394A]">Medium</span>
            <span className="text-xs text-[#2B394A]">difficulty</span>
          </div>
        </div>
        {/* Video Button */}
        <button className="w-full bg-[#A0CED9] bg-opacity-20 rounded-xl p-4 flex items-center justify-center mb-6">
          <div className="w-10 h-10 bg-[#A0CED9] rounded-full flex items-center justify-center mr-3">
            <PlayIcon size={20} className="text-[#1A3A3A]" />
          </div>
          <span className="font-medium text-[#1A3A3A]">Watch Video</span>
        </button>
        {/* Ingredients Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-[#1A3A3A] mb-3">
            Ingredients (Serves 2)
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <div className="w-6 h-6 bg-[#ADF7B6] rounded-full flex items-center justify-center mr-3">
                <CheckIcon size={16} className="text-[#1A3A3A]" />
              </div>
              <span className="text-[#1A3A3A]">2 chicken breasts</span>
            </li>
            <li className="flex items-center">
              <div className="w-6 h-6 bg-[#ADF7B6] rounded-full flex items-center justify-center mr-3">
                <CheckIcon size={16} className="text-[#1A3A3A]" />
              </div>
              <span className="text-[#1A3A3A]">1 cup brown rice</span>
            </li>
            <li className="flex items-center">
              <div className="w-6 h-6 bg-[#ADF7B6] rounded-full flex items-center justify-center mr-3">
                <CheckIcon size={16} className="text-[#1A3A3A]" />
              </div>
              <span className="text-[#1A3A3A]">2 bell peppers</span>
            </li>
            <li className="flex items-center">
              <div className="w-6 h-6 bg-[#FF6B6B] bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                <XIcon size={16} className="text-[#FF6B6B]" />
              </div>
              <span className="text-[#1A3A3A]">1 tbsp olive oil (missing)</span>
            </li>
            <li className="flex items-center">
              <div className="w-6 h-6 bg-[#ADF7B6] rounded-full flex items-center justify-center mr-3">
                <CheckIcon size={16} className="text-[#1A3A3A]" />
              </div>
              <span className="text-[#1A3A3A]">2 cloves garlic</span>
            </li>
          </ul>
        </div>
        {/* Instructions Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-[#1A3A3A] mb-3">
            Instructions
          </h2>
          <ol className="space-y-4">
            <li className="flex">
              <span className="w-6 h-6 bg-[#A0CED9] rounded-full flex items-center justify-center mr-3 shrink-0 text-[#1A3A3A] font-medium">
                1
              </span>
              <span className="text-[#1A3A3A]">Preheat oven to 375°F</span>
            </li>
            <li className="flex">
              <span className="w-6 h-6 bg-[#A0CED9] rounded-full flex items-center justify-center mr-3 shrink-0 text-[#1A3A3A] font-medium">
                2
              </span>
              <span className="text-[#1A3A3A]">
                Season chicken with salt and pepper
              </span>
            </li>
            <li className="flex">
              <span className="w-6 h-6 bg-[#A0CED9] rounded-full flex items-center justify-center mr-3 shrink-0 text-[#1A3A3A] font-medium">
                3
              </span>
              <span className="text-[#1A3A3A]">
                Combine rice and 2 cups water in pan
              </span>
            </li>
            <li className="flex">
              <span className="w-6 h-6 bg-[#A0CED9] rounded-full flex items-center justify-center mr-3 shrink-0 text-[#1A3A3A] font-medium">
                4
              </span>
              <span className="text-[#1A3A3A]">
                Add remaining ingredients and bake for 25 minutes
              </span>
            </li>
          </ol>
        </div>
        {/* Mark as Prepared Button */}
        <button
          className="w-full bg-[#FF6B6B] text-white py-4 px-6 rounded-full font-medium text-lg shadow-sm hover:bg-opacity-90 transition-colors"
          onClick={onMarkAsPrepared}>

          Mark as Prepared
        </button>
      </div>
    </div>);

};