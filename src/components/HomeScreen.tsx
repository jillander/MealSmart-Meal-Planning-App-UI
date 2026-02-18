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
import { useMealPlan } from '../contexts/MealPlanContext';
interface HomeScreenProps {
  navigateTo: (screen: string) => void;
}
export const HomeScreen: React.FC<HomeScreenProps> = ({ navigateTo }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [showImportGuide, setShowImportGuide] = useState(false);
  const [overallProgress, setOverallProgress] = useState(2);
  // Use the meal plan context
  const { getMealsForDate, updateMeal } = useMealPlan();
  const meals = getMealsForDate(selectedDate);
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
      if (activeTab === 'nutrition') {
        setActiveTab('health');
      }
    } else if (touchEnd - touchStart > 30) {
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
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] max-w-[430px] mx-auto">
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

      {/* Status Bar - Refined */}
      <div className="flex justify-between items-center px-5 py-2.5 bg-white text-[#1A1A1A] border-b border-[#F3F4F6]">
        <span className="text-sm font-medium tracking-tight">9:41 AM</span>
        <div className="flex items-center space-x-2.5">
          <span className="text-sm tracking-tight">5G</span>
          <span className="text-sm tracking-tight">100%</span>
        </div>
      </div>

      {/* App Header - Refined */}
      <header className="flex justify-between items-center px-5 py-4 bg-white border-b border-[#F3F4F6]">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">
            MealSmart
          </h1>
          <span className="ml-2.5 text-[10px] px-2 py-0.5 bg-[#4CAF50]/8 text-[#4CAF50] rounded-full font-semibold tracking-wide">
            AI
          </span>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F8F9FA] text-[#1A1A1A] hover:bg-[#F0F1F3] active:scale-95 transition-all duration-200">
          <BellIcon size={18} strokeWidth={2} />
        </button>
      </header>

      <main className="flex-1 overflow-hidden">
        {isFirstTimeUser ?
        <MealPrepSetup onComplete={() => setIsFirstTimeUser(false)} /> :

        <>
            {/* Calendar Strip - Refined spacing */}
            <div className="px-5 py-3 bg-white border-b border-[#F3F4F6]">
              <CalendarStrip
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate} />

            </div>

            {/* Swipeable Dashboard Section - Refined */}
            <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>

              <div className="flex justify-center mt-3 space-x-2 px-5">
                <button
                onClick={() => setActiveTab('nutrition')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'nutrition' ? 'bg-[#4CAF50] text-white shadow-sm' : 'bg-white text-[#64748B] hover:bg-[#F8F9FA] border border-[#E5E7EB]'}`}>

                  Nutrition
                </button>
                <button
                onClick={() => setActiveTab('health')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'health' ? 'bg-[#4CAF50] text-white shadow-sm' : 'bg-white text-[#64748B] hover:bg-[#F8F9FA] border border-[#E5E7EB]'}`}>

                  Health
                </button>
              </div>

              <div className="relative h-[320px] overflow-hidden">
                <div
                className={`absolute inset-0 transition-all duration-300 ease-out transform ${activeTab === 'nutrition' ? 'translate-x-0 opacity-100' : 'translate-x-[-100%] opacity-0'}`}>

                  <div className="mx-5 mt-4 p-5 bg-white rounded-2xl shadow-sm border border-[#F3F4F6]">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-[#94A3B8] mb-1.5 tracking-wide uppercase">
                          Calories Left Today
                        </p>
                        <div className="flex items-baseline space-x-2">
                          <p className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
                            550
                          </p>
                          <p className="text-base text-[#64748B] font-medium">
                            calories
                          </p>
                        </div>
                      </div>
                      <div className="relative w-20 h-20">
                        <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 100 100">

                          <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#F1F5F9"
                          strokeWidth="5" />

                          <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#2196F3"
                          strokeWidth="5"
                          strokeDasharray="282.7"
                          strokeDashoffset="84.81"
                          strokeLinecap="round"
                          className="transition-all duration-700 ease-out" />

                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xl font-bold text-[#1A1A1A] tracking-tight">
                            70%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
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
                      className="bg-[#FAFAFA] rounded-xl p-3.5 text-center hover:bg-[#F5F6F7] transition-colors duration-200">

                          <div className="relative w-12 h-12 mx-auto mb-2">
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
                            stroke="#F1F5F9"
                            strokeWidth="3.5" />

                              <circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="none"
                            stroke={stat.color}
                            strokeWidth="3.5"
                            strokeDasharray={`${stat.progress * 1.26} 126`}
                            strokeLinecap="round"
                            className="transition-all duration-700 ease-out" />

                            </svg>
                          </div>
                          <p className="text-sm font-bold text-[#1A1A1A] tracking-tight">
                            {stat.value}
                          </p>
                          <p className="text-xs text-[#94A3B8] font-medium mt-0.5">
                            {stat.label}
                          </p>
                        </div>
                    )}
                    </div>
                  </div>
                </div>
                <div
                className={`absolute inset-0 transition-all duration-300 ease-out transform ${activeTab === 'health' ? 'translate-x-0 opacity-100' : 'translate-x-[100%] opacity-0'}`}>

                  <div className="mx-5 mt-4">
                    <HealthDashboard
                    onSwipe={() => setActiveTab('nutrition')} />

                  </div>
                </div>
              </div>
            </div>

            {/* Recent Uploads Section - Refined */}
            {recentUploads.length > 0 &&
          <div className="px-5 pt-4 pb-2">
                <h2 className="text-lg font-bold text-[#1A1A1A] mb-3 tracking-tight">
                  Recent Uploads
                </h2>
                <div className="space-y-3 mb-3">
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

            {/* Meals Section Header - Refined */}
            <div className="px-5 pt-4 pb-2">
              <h2 className="text-xl font-bold text-[#1A1A1A] tracking-tight">
                Today's Meals
              </h2>
            </div>

            {/* Meals List Section - Refined spacing */}
            <div className="flex-1 overflow-y-auto pb-24">
              <div className="px-5 py-2 space-y-4">
                {['breakfast', 'lunch', 'snack', 'dinner'].map((mealType) => {
                const mealItems = meals.filter(
                  (meal) => meal.type === mealType
                );
                return (
                  <div key={mealType}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-semibold text-[#1A1A1A] capitalize tracking-tight">
                          {mealType}
                        </h3>
                        <span className="text-sm text-[#94A3B8] font-medium">
                          {mealItems.filter((m) => m.completed).length}/
                          {mealItems.length}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {mealItems.map((meal) =>
                      <MealRow
                        key={meal.id}
                        meal={meal}
                        onChecklistClick={() => {
                          updateMeal(meal.id, {
                            completed: !meal.completed
                          });
                          showToast(
                            !meal.completed ?
                            'Meal logged successfully' :
                            'Meal unmarked'
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
      <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white/95 backdrop-blur-lg border-t border-[#F3F4F6] z-20">
        <div className="flex justify-around items-center py-3 px-5 relative">
          <button className="flex flex-col items-center p-2 text-[#4CAF50] transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-[#4CAF50]/8 flex items-center justify-center mb-1">
              <HomeIcon size={20} strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-semibold tracking-wide">
              Home
            </span>
          </button>
          <button
            className="flex flex-col items-center p-2 text-[#94A3B8] hover:text-[#64748B] transition-all duration-200"
            onClick={() => navigateTo('meal-prep')}>

            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1 hover:bg-[#F8F9FA] transition-colors duration-200">
              <CalendarIcon size={20} strokeWidth={2} />
            </div>
            <span className="text-[10px] font-semibold tracking-wide">
              Meal Prep
            </span>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowPlusOptions(!showPlusOptions)}
              className="w-14 h-14 bg-[#1A1A1A] rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 -mt-6">

              {showPlusOptions ?
              <XIcon
                size={24}
                strokeWidth={2.5}
                className="transition-transform duration-200" /> :


              <PlusIcon
                size={24}
                strokeWidth={2.5}
                className="transition-transform duration-300" />

              }
            </button>
            {showPlusOptions &&
            <div
              className="fixed left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] w-72 overflow-hidden z-30"
              style={{
                bottom: '88px',
                animation: 'scale-up 0.2s ease-out forwards'
              }}>

                <button
                className="w-full px-5 py-4 flex items-center text-left hover:bg-[#FAFAFA] border-b border-[#F3F4F6] transition-colors duration-200"
                onClick={() => {
                  navigateTo('ingredient-capture');
                  setShowPlusOptions(false);
                }}>

                  <div className="w-11 h-11 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center mr-3.5">
                    <CameraIcon
                    size={20}
                    className="text-[#4CAF50]"
                    strokeWidth={2} />

                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] tracking-tight">
                      Capture ingredients
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      Scan food from your fridge
                    </p>
                  </div>
                </button>
                <button
                className="w-full px-5 py-4 flex items-center text-left hover:bg-[#FAFAFA] border-b border-[#F3F4F6] transition-colors duration-200"
                onClick={() => {
                  setShowImportGuide(true);
                  setShowPlusOptions(false);
                }}>

                  <div className="w-11 h-11 rounded-xl bg-[#2196F3]/10 flex items-center justify-center mr-3.5">
                    <ImportIcon
                    size={20}
                    className="text-[#2196F3]"
                    strokeWidth={2} />

                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] tracking-tight">
                      Import recipe
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      Add from recipe sites
                    </p>
                  </div>
                </button>
                <button
                className="w-full px-5 py-4 flex items-center text-left hover:bg-[#FAFAFA] transition-colors duration-200"
                onClick={() => {
                  navigateTo('meal-prep');
                  setShowPlusOptions(false);
                }}>

                  <div className="w-11 h-11 rounded-xl bg-[#FF9800]/10 flex items-center justify-center mr-3.5">
                    <CalendarIcon
                    size={20}
                    className="text-[#FF9800]"
                    strokeWidth={2} />

                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A] tracking-tight">
                      Plan meals
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      Schedule your meals
                    </p>
                  </div>
                </button>
              </div>
            }
          </div>
          <button
            className="flex flex-col items-center p-2 text-[#94A3B8] hover:text-[#64748B] transition-all duration-200"
            onClick={() => navigateTo('progress')}>

            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1 hover:bg-[#F8F9FA] transition-colors duration-200">
              <BarChartIcon size={20} strokeWidth={2} />
            </div>
            <span className="text-[10px] font-semibold tracking-wide">
              Progress
            </span>
          </button>
        </div>
      </nav>

      {showPlusOptions &&
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 transition-opacity duration-200"
        onClick={() => setShowPlusOptions(false)}>
      </div>
      }
    </div>);

};