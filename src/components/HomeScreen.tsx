import React, { useEffect, useState } from 'react';
import {
  BellIcon,
  HomeIcon,
  CalendarIcon,
  SettingsIcon,
  PlusIcon,
  CameraIcon,
  ImportIcon,
  XIcon,
  BarChartIcon } from
'lucide-react';
import { CalendarStrip } from './CalendarStrip';
import { MealRow } from './MealRow';
import { ToastNotification } from './ToastNotification';
import { HealthDashboard } from './HealthDashboard';
import { MealPrepSetup } from './MealPrepSetup';
import { RecipeImportGuide } from './RecipeImportGuide';
import { RecentUploadCard } from './RecentUploadCard';
interface HomeScreenProps {
  navigateTo: (screen: string) => void;
}
export const HomeScreen: React.FC<HomeScreenProps> = ({ navigateTo }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [showImportGuide, setShowImportGuide] = useState(false);
  const [overallProgress, setOverallProgress] = useState(2); // 0-4 scale
  const [meals, setMeals] = useState([
  {
    type: 'breakfast',
    name: 'Avocado Toast',
    calories: 350,
    cookingTime: '15 min',
    time: '8:00 AM',
    image:
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    completed: true,
    progress: {
      hasIngredients: true,
      hasRecipe: true,
      viewedRecipe: true,
      completed: true
    }
  },
  {
    type: 'lunch',
    name: 'Chicken Salad',
    calories: 450,
    cookingTime: '20 min',
    time: '12:30 PM',
    image:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    completed: true,
    progress: {
      hasIngredients: true,
      hasRecipe: true,
      viewedRecipe: true,
      completed: true
    }
  },
  {
    type: 'snack',
    name: 'Greek Yogurt',
    calories: 150,
    cookingTime: '10 min',
    time: '3:30 PM',
    image:
    'https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    completed: false,
    progress: {
      hasIngredients: true,
      hasRecipe: true,
      viewedRecipe: false,
      completed: false
    }
  },
  {
    type: 'dinner',
    name: 'Salmon Bowl',
    calories: 550,
    cookingTime: '30 min',
    time: '7:00 PM',
    image:
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    completed: false,
    progress: {
      hasIngredients: true,
      hasRecipe: true,
      viewedRecipe: false,
      completed: false
    }
  }]
  );
  const completedMeals = meals.filter((meal) => meal.completed).length;
  const totalMeals = meals.length;
  const [toast, setToast] = useState<{
    message: string;
    visible: boolean;
  }>({
    message: '',
    visible: false
  });
  const [activeTab, setActiveTab] = useState<'nutrition' | 'health'>(
    'nutrition'
  );
  const [showPlusOptions, setShowPlusOptions] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [recentUploads, setRecentUploads] = useState([
  {
    id: 1,
    progress: 100,
    isComplete: true,
    timestamp: 'Today, 9:41 AM',
    ingredients: [
    {
      id: 1,
      name: 'Tomatoes',
      quantity: '3 medium'
    },
    {
      id: 2,
      name: 'Onions',
      quantity: '2 medium'
    },
    {
      id: 3,
      name: 'Bell Peppers',
      quantity: '1 large'
    }]

  },
  {
    id: 2,
    progress: 68,
    isComplete: false,
    timestamp: 'Just now',
    ingredients: []
  }]
  );
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 30) {
      // Reduced threshold for better detection
      // Swipe left to go to health dashboard
      if (activeTab === 'nutrition') {
        setActiveTab('health');
      }
    } else if (touchEnd - touchStart > 30) {
      // Reduced threshold for better detection
      // Swipe right to go to nutrition dashboard
      if (activeTab === 'health') {
        setActiveTab('nutrition');
      }
    }
    setTouchStart(0);
    setTouchEnd(0);
  };
  const showToast = (message: string) => {
    setToast({
      message,
      visible: true
    });
    setTimeout(
      () =>
      setToast({
        message: '',
        visible: false
      }),
      3000
    );
  };
  const dailyCalorieGoal = 1800;
  const consumedCalories = 1250;
  const remainingCalories = dailyCalorieGoal - consumedCalories;
  const macros = {
    protein: {
      consumed: 90,
      goal: 120
    },
    carbs: {
      consumed: 243,
      goal: 280
    },
    fat: {
      consumed: 49,
      goal: 60
    }
  };
  const handleViewResults = (uploadId: number) => {
    navigateTo('ingredient-confirmation');
  };
  // Simulate progress update for the incomplete upload
  useEffect(() => {
    if (recentUploads.some((upload) => !upload.isComplete)) {
      const interval = setInterval(() => {
        setRecentUploads((prev) =>
        prev.map((upload) =>
        !upload.isComplete && upload.progress < 100 ?
        {
          ...upload,
          progress: Math.min(upload.progress + 2, 100),
          isComplete: upload.progress + 2 >= 100
        } :
        upload
        )
        );
      }, 300);
      return () => clearInterval(interval);
    }
  }, [recentUploads]);
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] max-w-[430px] mx-auto">
      {/* Toast Notification */}
      {toast.visible && <ToastNotification message={toast.message} />}
      {/* Recipe Import Guide */}
      {showImportGuide &&
      <RecipeImportGuide
        onClose={() => setShowImportGuide(false)}
        onImport={() => {
          setShowImportGuide(false);
          showToast('Recipe imported successfully!');
        }} />

      }
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-white text-[#1A1A1A] border-b border-gray-100">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>
      {/* App Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">MealSmart</h1>
          <span className="ml-3 text-xs px-3 py-1 bg-[#4CAF50] bg-opacity-10 text-[#4CAF50] rounded-full font-semibold">
            AI
          </span>
        </div>
        <button className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1A1A1A] text-white hover:bg-opacity-90 transition-all duration-200">
          <BellIcon size={20} />
        </button>
      </header>
      <main className="flex-1 overflow-hidden">
        {isFirstTimeUser ?
        <MealPrepSetup onComplete={() => setIsFirstTimeUser(false)} /> :

        <>
            {/* Calendar Strip - Reduced padding */}
            <div className="px-6 py-3 bg-white border-b border-gray-100">
              <CalendarStrip
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate} />

            </div>
            {/* Swipeable Dashboard Section - Optimized spacing */}
            <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>

              {/* Dashboard Navigation Pills - Reduced margin */}
              <div className="flex justify-center mt-2 space-x-2">
                <button
                onClick={() => setActiveTab('nutrition')}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'nutrition' ? 'bg-[#4CAF50] text-white' : 'bg-gray-100 text-gray-500'}`}>

                  Nutrition
                </button>
                <button
                onClick={() => setActiveTab('health')}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'health' ? 'bg-[#4CAF50] text-white' : 'bg-gray-100 text-gray-500'}`}>

                  Health
                </button>
              </div>
              {/* Dashboard Container - Reduced height */}
              <div className="relative h-[320px] overflow-hidden">
                {/* Nutrition Dashboard - Reduced margins */}
                <div
                className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${activeTab === 'nutrition' ? 'translate-x-0 opacity-100' : 'translate-x-[-100%] opacity-0'}`}>

                  <div className="mx-6 mt-3 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#757575] mb-2">
                          Calories Left Today
                        </p>
                        <div className="flex items-baseline space-x-2">
                          <p className="text-4xl font-bold text-[#1A1A1A]">
                            550
                          </p>
                          <p className="text-lg text-[#757575]">calories</p>
                        </div>
                      </div>
                      {/* Progress Circle */}
                      <div className="relative w-20 h-20">
                        <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 100 100">

                          <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#E0E0E0"
                          strokeWidth="6" />

                          <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#2196F3"
                          strokeWidth="6"
                          strokeDasharray="282.7"
                          strokeDashoffset="84.81"
                          strokeLinecap="round"
                          className="transition-all duration-500" />

                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xl font-bold text-[#1A1A1A]">
                            70%
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Macro Stats - Centered icons and refined styling */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                    {
                      label: 'Protein',
                      value: '30g left',
                      color: '#4CAF50',
                      icon: '🥩',
                      progress: 75
                    },
                    {
                      label: 'Carbs',
                      value: '37g left',
                      color: '#FF9800',
                      icon: '🌾',
                      progress: 85
                    },
                    {
                      label: 'Fat',
                      value: '11g left',
                      color: '#2196F3',
                      icon: '🥑',
                      progress: 60
                    }].
                    map((stat) =>
                    <div
                      key={stat.label}
                      className="bg-[#F8F9FA] rounded-xl p-4 text-center">

                          <div className="relative w-12 h-12 mx-auto mb-2">
                            {/* Centered icon with better positioning */}
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                              <span className="text-xl">{stat.icon}</span>
                            </div>
                            <svg
                          className="w-full h-full -rotate-90 absolute inset-0"
                          viewBox="0 0 48 48">

                              <circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="none"
                            stroke="#E0E0E0"
                            strokeWidth="4" />

                              <circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="none"
                            stroke={stat.color}
                            strokeWidth="4"
                            strokeDasharray={`${stat.progress * 1.26} 126`}
                            strokeLinecap="round"
                            className="transition-all duration-700" />

                            </svg>
                          </div>
                          <p className="text-sm font-bold text-[#1A1A1A]">
                            {stat.value}
                          </p>
                          <p className="text-xs text-[#757575] font-medium">
                            {stat.label}
                          </p>
                        </div>
                    )}
                    </div>
                  </div>
                </div>
                {/* Health Dashboard */}
                <div
                className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${activeTab === 'health' ? 'translate-x-0 opacity-100' : 'translate-x-[100%] opacity-0'}`}>

                  <div className="mx-6 mt-3">
                    <HealthDashboard
                    onSwipe={() => setActiveTab('nutrition')} />

                  </div>
                </div>
              </div>
            </div>
            {/* Recent Uploads Section - NEW SECTION */}
            {recentUploads.length > 0 &&
          <div className="px-6 pt-3 pb-1">
                <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">
                  Recent Uploads
                </h2>
                <div className="space-y-3 mb-4">
                  {recentUploads.map((upload) =>
              <RecentUploadCard
                key={upload.id}
                progress={upload.progress}
                isComplete={upload.isComplete}
                timestamp={upload.timestamp}
                onClick={() => handleViewResults(upload.id)} />

              )}
                </div>
              </div>
          }
            {/* Meals Section Header - Optimized spacing */}
            <div className="px-6 pt-3 pb-1">
              <h2 className="text-xl font-bold text-[#1A1A1A]">
                Today's Meals
              </h2>
            </div>
            {/* Meals List Section - Always Visible with improved scrolling */}
            <div className="flex-1 overflow-y-auto pb-24">
              <div className="px-6 py-2 space-y-4">
                {['breakfast', 'lunch', 'snack', 'dinner'].map((mealType) => {
                const mealItems = meals.filter(
                  (meal) => meal.type === mealType
                );
                return (
                  <div key={mealType}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-[#1A1A1A] capitalize">
                          {mealType}
                        </h3>
                        <span className="text-sm text-[#757575]">
                          {mealItems.filter((m) => m.completed).length}/
                          {mealItems.length}
                        </span>
                      </div>
                      <div className="space-y-4">
                        {mealItems.map((meal, index) =>
                      <MealRow
                        key={index}
                        meal={meal}
                        onChecklistClick={() => {
                          const newMeals = [...meals];
                          const mealIndex = meals.indexOf(meal);
                          newMeals[mealIndex].completed = !meal.completed;
                          setMeals(newMeals);
                          showToast(
                            !meal.completed ?
                            'Meal unmarked' :
                            'Meal logged successfully'
                          );
                        }}
                        onCreateRecipe={() => {
                          navigateTo('recipe-detail');
                          showToast('Creating new recipe...');
                        }}
                        onImportRecipe={() => {
                          setShowImportGuide(true);
                        }} />

                      )}
                      </div>
                    </div>);

              })}
              </div>
            </div>
          </>
        }
      </main>
      {/* Bottom Navigation - Refined */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-gray-100 z-20">
        <div className="flex justify-around items-center py-4 px-6 relative">
          <button className="flex flex-col items-center p-2 text-[#4CAF50]">
            <HomeIcon
              size={24}
              className="transition-transform hover:scale-110 duration-200" />

            <span className="text-xs mt-1 font-medium">Home</span>
          </button>
          <button
            className="flex flex-col items-center p-2 text-[#757575] hover:text-[#1A1A1A] transition-colors duration-200"
            onClick={() => navigateTo('meal-prep')}>

            <CalendarIcon
              size={24}
              className="transition-transform hover:scale-110 duration-200" />

            <span className="text-xs mt-1 font-medium">Meal Prep</span>
          </button>
          {/* Plus Button with Menu - Improved positioning and options */}
          <div className="relative">
            <button
              onClick={() => setShowPlusOptions(!showPlusOptions)}
              className="w-14 h-14 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 -mt-5">

              {showPlusOptions ?
              <XIcon size={24} className="animate-spin-once" /> :

              <PlusIcon
                size={24}
                className="transition-transform hover:rotate-90 duration-300" />

              }
            </button>
            {showPlusOptions &&
            <div
              className="fixed left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl border border-gray-100 w-64 overflow-hidden animate-scale-up z-30"
              style={{
                bottom: '80px'
              }}>

                <button
                className="w-full px-4 py-4 flex items-center text-left hover:bg-gray-50 border-b border-gray-100"
                onClick={() => {
                  navigateTo('ingredient-capture');
                  setShowPlusOptions(false);
                }}>

                  <div className="w-10 h-10 rounded-full bg-[#4CAF50] bg-opacity-10 flex items-center justify-center mr-3">
                    <CameraIcon size={18} className="text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      Capture ingredients
                    </p>
                    <p className="text-xs text-[#757575]">
                      Scan food from your fridge
                    </p>
                  </div>
                </button>
                <button
                className="w-full px-4 py-4 flex items-center text-left hover:bg-gray-50 border-b border-gray-100"
                onClick={() => {
                  setShowImportGuide(true);
                  setShowPlusOptions(false);
                }}>

                  <div className="w-10 h-10 rounded-full bg-[#2196F3] bg-opacity-10 flex items-center justify-center mr-3">
                    <ImportIcon size={18} className="text-[#2196F3]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      Import recipe
                    </p>
                    <p className="text-xs text-[#757575]">
                      Add from recipe sites
                    </p>
                  </div>
                </button>
                <button
                className="w-full px-4 py-4 flex items-center text-left hover:bg-gray-50"
                onClick={() => {
                  navigateTo('meal-prep');
                  setShowPlusOptions(false);
                }}>

                  <div className="w-10 h-10 rounded-full bg-[#FF9800] bg-opacity-10 flex items-center justify-center mr-3">
                    <CalendarIcon size={18} className="text-[#FF9800]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      Plan meals
                    </p>
                    <p className="text-xs text-[#757575]">
                      Schedule your meals
                    </p>
                  </div>
                </button>
              </div>
            }
          </div>
          <button
            className="flex flex-col items-center p-2 text-[#757575] hover:text-[#1A1A1A] transition-colors duration-200"
            onClick={() => navigateTo('progress')}>

            <BarChartIcon
              size={24}
              className="transition-transform hover:scale-110 duration-200" />

            <span className="text-xs mt-1 font-medium">Progress</span>
          </button>
        </div>
      </nav>
      {/* Overlay when plus menu is open */}
      {showPlusOptions &&
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-10 animate-fade-in"
        onClick={() => setShowPlusOptions(false)}>
      </div>
      }
    </div>);

};