import React, { useState } from 'react';
import {
  XIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  SunriseIcon,
  SunIcon,
  MoonIcon,
  CoffeeIcon } from
'lucide-react';
interface AddToMealPlanModalProps {
  recipe: {
    id: string;
    title: string;
    image: string;
    cookingTime: string;
    calories: number;
  };
  onClose: () => void;
  onAdd: (
  date: Date,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack')
  => void;
}
export const AddToMealPlanModal: React.FC<AddToMealPlanModalProps> = ({
  recipe,
  onClose,
  onAdd
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMealType, setSelectedMealType] = useState<
    'breakfast' | 'lunch' | 'dinner' | 'snack' | null>(
    null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };
  const days = getDaysInMonth(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear());

  };
  const isPastDate = (date: Date) => {
    return date < today;
  };
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };
  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };
  const handleAddToMealPlan = () => {
    if (selectedMealType) {
      onAdd(selectedDate, selectedMealType);
      onClose();
    }
  };
  const mealTypes = [
  {
    id: 'breakfast' as const,
    label: 'Breakfast',
    icon: SunriseIcon,
    color: 'from-orange-400 to-amber-400',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-200'
  },
  {
    id: 'lunch' as const,
    label: 'Lunch',
    icon: SunIcon,
    color: 'from-yellow-400 to-orange-400',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    borderColor: 'border-yellow-200'
  },
  {
    id: 'snack' as const,
    label: 'Snack',
    icon: CoffeeIcon,
    color: 'from-pink-400 to-rose-400',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    borderColor: 'border-pink-200'
  },
  {
    id: 'dinner' as const,
    label: 'Dinner',
    icon: MoonIcon,
    color: 'from-indigo-400 to-purple-400',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    borderColor: 'border-indigo-200'
  }];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-fade-in">
      <div className="bg-white w-full max-w-[430px] mx-auto rounded-t-3xl animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-[#1A1A1A]">
              Add to Meal Plan
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close">

              <XIcon size={20} />
            </button>
          </div>
          {/* Recipe Preview */}
          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-16 h-16 rounded-lg object-cover" />

            <div className="ml-3 flex-1">
              <h3 className="font-medium text-[#1A1A1A] text-sm line-clamp-1">
                {recipe.title}
              </h3>
              <p className="text-xs text-[#64748B] mt-1">
                {recipe.cookingTime} • {recipe.calories} cal
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Calendar Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#64748B] mb-3">
              Select Date
            </h3>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Previous month">

                <ChevronLeftIcon size={20} />
              </button>
              <h4 className="font-semibold text-[#1A1A1A]">
                {currentMonth.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </h4>
              <button
                onClick={handleNextMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Next month">

                <ChevronRightIcon size={20} />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) =>
              <div
                key={index}
                className="text-center text-xs font-medium text-[#64748B] pb-2">

                  {day}
                </div>
              )}
              {days.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} />;
                }
                const isSelected = isSameDay(day, selectedDate);
                const isToday = isSameDay(day, today);
                const isPast = isPastDate(day);
                return (
                  <button
                    key={index}
                    onClick={() => !isPast && setSelectedDate(day)}
                    disabled={isPast}
                    className={`
                      aspect-square rounded-lg text-sm font-medium transition-all duration-200
                      ${isSelected ? 'bg-[#4CAF50] text-white shadow-md scale-105' : ''}
                      ${!isSelected && isToday ? 'bg-blue-50 text-blue-600 border border-blue-200' : ''}
                      ${!isSelected && !isToday && !isPast ? 'hover:bg-gray-100 text-[#1A1A1A]' : ''}
                      ${isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                    `}>

                    {day.getDate()}
                  </button>);

              })}
            </div>
          </div>

          {/* Meal Type Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#64748B] mb-3">
              Select Meal Type
            </h3>
            <div className="space-y-3">
              {mealTypes.map((mealType) => {
                const Icon = mealType.icon;
                const isSelected = selectedMealType === mealType.id;
                return (
                  <button
                    key={mealType.id}
                    onClick={() => setSelectedMealType(mealType.id)}
                    className={`
                      w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center
                      ${isSelected ? `${mealType.borderColor} ${mealType.bgColor}` : 'border-gray-200 hover:border-gray-300'}
                    `}>

                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${mealType.color} flex items-center justify-center mr-4`}>

                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-[#1A1A1A]">
                        {mealType.label}
                      </h4>
                      <p className="text-sm text-[#64748B]">
                        {selectedDate.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    {isSelected &&
                    <div className="w-6 h-6 rounded-full bg-[#4CAF50] flex items-center justify-center">
                        <CheckIcon size={16} className="text-white" />
                      </div>
                    }
                  </button>);

              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 text-[#1A1A1A] rounded-full font-medium hover:bg-gray-50 transition-colors">

              Cancel
            </button>
            <button
              onClick={handleAddToMealPlan}
              disabled={!selectedMealType}
              className={`flex-1 py-3 rounded-full font-medium transition-colors ${selectedMealType ? 'bg-[#4CAF50] text-white hover:bg-[#43A047]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>

              Add to Plan
            </button>
          </div>
        </div>
      </div>
    </div>);

};