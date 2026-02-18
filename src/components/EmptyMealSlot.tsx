import React from 'react';
import { PlusIcon } from 'lucide-react';
interface EmptyMealSlotProps {
  type: string;
  onCapture: () => void;
}
export const EmptyMealSlot: React.FC<EmptyMealSlotProps> = ({
  type,
  onCapture
}) => {
  const getMealEmoji = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return '🌅';
      case 'lunch':
        return '🌞';
      case 'dinner':
        return '🌙';
      case 'snack':
        return '🍎';
      default:
        return '🍽️';
    }
  };
  const getMealTime = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return '8:00 AM';
      case 'lunch':
        return '12:30 PM';
      case 'dinner':
        return '7:00 PM';
      case 'snack':
        return '3:30 PM';
      default:
        return '';
    }
  };
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-[#E0E0E0] hover:border-[#4CAF50] transition-all duration-300 animate-breathe">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-[#F8F9FA] flex items-center justify-center">
            <span className="text-2xl">{getMealEmoji(type)}</span>
          </div>
          <div>
            <h3 className="font-semibold text-[#1A1A1A] capitalize">
              Plan your {type}
            </h3>
            <p className="text-sm text-[#757575]">{getMealTime(type)}</p>
            <p className="text-xs text-[#4CAF50] mt-1">
              Capture ingredients to get started
            </p>
          </div>
        </div>
        <button
          onClick={onCapture}
          className="w-10 h-10 rounded-full bg-[#4CAF50] text-white flex items-center justify-center hover:bg-[#45a049] transition-all duration-200 transform hover:scale-110">

          <PlusIcon size={20} />
        </button>
      </div>
    </div>);

};