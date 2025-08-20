import React, { useState } from 'react';
import { ArrowLeftIcon, CalendarIcon, PlusIcon, ListIcon, CheckCircleIcon, ChevronRightIcon } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
interface MealPrepScreenProps {
  navigateTo: (screen: string) => void;
}
type ViewType = 'daily' | 'weekly' | 'monthly';
// Helper function to generate meal data
const generateMeals = (completed: boolean = false) => [{
  type: 'Breakfast',
  name: 'Berry Yogurt Parfait',
  time: '5 min prep',
  calories: 250,
  image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  completed
}, {
  type: 'Lunch',
  name: 'Grilled Chicken Salad',
  time: '20 min prep',
  calories: 420,
  image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  completed
}, {
  type: 'Dinner',
  name: 'Baked Salmon with Veggies',
  time: '25 min prep',
  calories: 520,
  image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  completed
}];
// Generate a month's worth of data
const initialMonthData = Array.from({
  length: 30
}).map((_, index) => ({
  day: index + 1,
  label: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'short'
  }),
  completed: index < 2,
  date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  }),
  meals: generateMeals(index < 2)
}));
export const MealPrepScreen: React.FC<MealPrepScreenProps> = ({
  navigateTo
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(0);
  const [viewType, setViewType] = useState<ViewType>('weekly');
  const [mealData, setMealData] = useState(initialMonthData);
  // Calculate progress based on view type
  const getProgress = () => {
    switch (viewType) {
      case 'daily':
        return {
          completed: mealData[selectedDay].completed ? 1 : 0,
          total: 1
        };
      case 'weekly':
        return {
          completed: 2,
          total: 7
        };
      case 'monthly':
        return {
          completed: mealData.filter(d => d.completed).length,
          total: 30
        };
      default:
        return {
          completed: 2,
          total: 7
        };
    }
  };
  const {
    completed: completedDays,
    total: totalDays
  } = getProgress();
  const progressPercentage = completedDays / totalDays * 100;
  // Enhanced drag and drop handling
  const handleDragEnd = (result: any) => {
    const {
      source,
      destination
    } = result;
    if (!destination) return;
    const newMealData = [...mealData];
    const sourceDay = parseInt(source.droppableId);
    const destDay = parseInt(destination.droppableId);
    const sourceType = source.droppableId.split('-')[1];
    const destType = destination.droppableId.split('-')[1];
    // Get all meals of the source type
    const sourceMeals = newMealData[sourceDay].meals.filter(m => m.type.toLowerCase() === sourceType);
    const destMeals = newMealData[destDay].meals.filter(m => m.type.toLowerCase() === destType);
    // Remove the dragged meal
    const [movedMeal] = sourceMeals.splice(source.index, 1);
    // Update the meal type if moving between different meal types
    if (sourceType !== destType) {
      movedMeal.type = destType.charAt(0).toUpperCase() + destType.slice(1);
    }
    // Insert the meal at the new position
    destMeals.splice(destination.index, 0, movedMeal);
    // Update the meal data
    newMealData[sourceDay].meals = [...newMealData[sourceDay].meals.filter(m => m.type.toLowerCase() !== sourceType), ...sourceMeals];
    newMealData[destDay].meals = [...newMealData[destDay].meals.filter(m => m.type.toLowerCase() !== destType), ...destMeals];
    setMealData(newMealData);
  };
  return <div className="flex flex-col min-h-screen bg-[#F8F9FA] max-w-[430px] mx-auto">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-white text-[#1A1A1A]">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>
      {/* Header */}
      <header className="bg-white px-6 py-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => navigateTo('home')} className="mr-3">
              <ArrowLeftIcon size={20} />
            </button>
            <h1 className="text-xl font-bold">Meal Plan</h1>
          </div>
          <div className="flex space-x-2">
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button onClick={() => setViewType('daily')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${viewType === 'daily' ? 'bg-white text-[#4CAF50] shadow-sm' : 'text-gray-500'}`}>
                Daily
              </button>
              <button onClick={() => setViewType('weekly')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${viewType === 'weekly' ? 'bg-white text-[#4CAF50] shadow-sm' : 'text-gray-500'}`}>
                Weekly
              </button>
              <button onClick={() => setViewType('monthly')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${viewType === 'monthly' ? 'bg-white text-[#4CAF50] shadow-sm' : 'text-gray-500'}`}>
                Monthly
              </button>
            </div>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </header>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-1">
          {/* Date Sidebar */}
          <div className="w-20 bg-white border-r border-gray-100">
            {Array.from({
            length: viewType === 'monthly' ? 30 : viewType === 'weekly' ? 7 : 1
          }).map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() + index);
            const isSelected = index === selectedDay;
            const isCompleted = mealData[index].completed;
            return <button key={index} onClick={() => setSelectedDay(index)} className={`w-full py-4 flex flex-col items-center transition-all duration-200 ${isSelected ? 'bg-[#E8F5E9] border-r-2 border-[#4CAF50]' : 'hover:bg-[#F5F7FA]'}`}>
                  <span className={`text-sm font-medium ${isSelected ? 'text-[#4CAF50]' : 'text-[#64748B]'}`}>
                    {date.toLocaleDateString('en-US', {
                  weekday: 'short'
                })}
                  </span>
                  <span className={`text-xl font-bold mt-1 ${isSelected ? 'text-[#4CAF50]' : 'text-[#64748B]'}`}>
                    {date.getDate()}
                  </span>
                  <span className="text-xs text-[#94A3B8] mt-1">
                    {date.toLocaleDateString('en-US', {
                  month: 'short'
                })}
                  </span>
                  {isCompleted && <CheckCircleIcon size={16} className="text-[#4CAF50] mt-2" />}
                </button>;
          })}
          </div>
          {/* Main Content */}
          <div className="flex-1">
            {/* Progress Section */}
            <div className="p-6 border-b border-gray-100 bg-white">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#1A1A1A]">
                    {viewType.charAt(0).toUpperCase() + viewType.slice(1)}{' '}
                    Progress
                  </h2>
                  <p className="text-sm text-[#64748B]">
                    {completedDays} of {totalDays} days completed
                  </p>
                </div>
                <span className="text-2xl font-bold text-[#4CAF50]">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className="flex space-x-1.5">
                {Array.from({
                length: totalDays
              }).map((_, index) => <div key={index} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${index < completedDays ? 'bg-[#4CAF50]' : 'bg-[#E2E8F0]'}`} />)}
              </div>
            </div>
            {/* Meals Section */}
            <div className="p-6 space-y-8">
              {['breakfast', 'lunch', 'dinner'].map(mealType => <div key={mealType}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#1A1A1A] capitalize">
                      {mealType}
                    </h3>
                    <button className="text-[#4CAF50] text-sm font-medium flex items-center hover:text-[#43A047] transition-colors">
                      Edit
                      <ChevronRightIcon size={16} className="ml-1" />
                    </button>
                  </div>
                  <Droppable droppableId={`${selectedDay}-${mealType}`}>
                    {provided => <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
                        {mealData[selectedDay].meals.filter(meal => meal.type.toLowerCase() === mealType).map((meal, index) => <Draggable key={`${selectedDay}-${mealType}-${index}`} draggableId={`${selectedDay}-${mealType}-${index}`} index={index}>
                              {(provided, snapshot) => <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`bg-white rounded-xl p-4 border border-gray-100 transition-all duration-200 ${snapshot.isDragging ? 'shadow-lg scale-[1.02]' : ''}`}>
                                  <div className="flex items-center">
                                    <img src={meal.image} alt={meal.name} className="w-20 h-20 rounded-lg object-cover" />
                                    <div className="ml-4 flex-1">
                                      <h4 className="font-medium text-[#1A1A1A]">
                                        {meal.name}
                                      </h4>
                                      <p className="text-sm text-[#64748B]">
                                        {meal.time} • {meal.calories} cal
                                      </p>
                                      <div className="flex space-x-3 mt-3">
                                        <button className="px-4 py-1.5 bg-[#E8F5E9] text-[#4CAF50] rounded-lg text-sm font-medium hover:bg-[#C8E6C9] transition-colors">
                                          View Recipe
                                        </button>
                                        {!meal.completed && <button className="px-4 py-1.5 bg-[#F3F4F6] text-[#374151] rounded-lg text-sm font-medium hover:bg-[#E5E7EB] transition-colors">
                                            Grocery List
                                          </button>}
                                      </div>
                                    </div>
                                    {meal.completed && <CheckCircleIcon size={20} className="text-[#4CAF50]" />}
                                  </div>
                                </div>}
                            </Draggable>)}
                        {provided.placeholder}
                      </div>}
                  </Droppable>
                </div>)}
            </div>
          </div>
        </div>
      </DragDropContext>
      {/* Add Meal Button */}
      <div className="fixed bottom-20 right-6">
        <button className="px-4 py-3 bg-[#4CAF50] text-white rounded-full text-sm font-medium flex items-center shadow-lg hover:bg-[#43A047] transition-colors">
          <PlusIcon size={16} className="mr-2" />
          Add Meal
        </button>
      </div>
    </div>;
};