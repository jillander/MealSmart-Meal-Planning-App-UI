import React, { useState } from 'react';
import { ArrowLeftIcon, GripHorizontalIcon } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
interface WeeklyPlanScreenProps {
  navigateTo: (screen: string) => void;
}
export const WeeklyPlanScreen: React.FC<WeeklyPlanScreenProps> = ({
  navigateTo
}) => {
  const [days, setDays] = useState([{
    id: 'day-1',
    title: 'Day 1',
    subtitle: 'Yesterday',
    meals: [{
      id: 'meal-1',
      type: 'Breakfast',
      name: 'Berry Yogurt Parfait',
      duration: '5 min',
      calories: 250,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    }, {
      id: 'meal-2',
      type: 'Lunch',
      name: 'Salmon Quinoa Salad',
      duration: '30 min',
      calories: 500,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    }]
  }
  // Add more days...
  ]);
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const sourceDay = days.find(day => day.id === result.source.droppableId);
    const destDay = days.find(day => day.id === result.destination.droppableId);
    if (!sourceDay || !destDay) return;
    const [movedMeal] = sourceDay.meals.splice(result.source.index, 1);
    destDay.meals.splice(result.destination.index, 0, movedMeal);
    setDays([...days]);
  };
  const completedDays = 2;
  const totalDays = 7;
  const progressPercentage = completedDays / totalDays * 100;
  return <div className="flex flex-col min-h-screen bg-[#F8F9FA] max-w-[430px] mx-auto">
      {/* Header */}
      <header className="bg-white px-6 py-4">
        <div className="flex items-center mb-4">
          <button onClick={() => navigateTo('meal-prep')} className="mr-3">
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Week 1</h1>
        </div>
        {/* Progress Bar */}
        <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
          <div className="h-full bg-[#4CAF50] transition-all duration-500" style={{
          width: `${progressPercentage}%`
        }} />
        </div>
        <p className="text-sm text-[#757575] mt-2">
          {completedDays} of {totalDays} days completed
        </p>
      </header>
      {/* Weekly Plan */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            {days.map(day => <Droppable key={day.id} droppableId={day.id}>
                {(provided, snapshot) => <div ref={provided.innerRef} {...provided.droppableProps} className={`bg-white rounded-xl p-4 ${snapshot.isDraggingOver ? 'bg-gray-50' : ''}`}>
                    <h2 className="font-medium text-[#1A1A1A] mb-2">
                      {day.title}
                      <span className="text-sm text-[#757575] ml-2">
                        {day.subtitle}
                      </span>
                    </h2>
                    <div className="space-y-3">
                      {day.meals.map((meal, index) => <Draggable key={meal.id} draggableId={meal.id} index={index}>
                          {(provided, snapshot) => <div ref={provided.innerRef} {...provided.draggableProps} className={`bg-white rounded-lg border border-gray-100 p-3 ${snapshot.isDragging ? 'shadow-lg' : ''}`}>
                              <div className="flex items-center">
                                <div {...provided.dragHandleProps} className="mr-3">
                                  <GripHorizontalIcon size={16} className="text-gray-400" />
                                </div>
                                <img src={meal.image} alt={meal.name} className="w-12 h-12 rounded-lg object-cover" />
                                <div className="ml-3 flex-1">
                                  <p className="text-xs text-[#757575]">
                                    {meal.type}
                                  </p>
                                  <p className="font-medium text-[#1A1A1A]">
                                    {meal.name}
                                  </p>
                                  <p className="text-xs text-[#757575]">
                                    {meal.duration} • {meal.calories} cal
                                  </p>
                                </div>
                              </div>
                            </div>}
                        </Draggable>)}
                      {provided.placeholder}
                    </div>
                  </div>}
              </Droppable>)}
          </div>
        </div>
      </DragDropContext>
    </div>;
};