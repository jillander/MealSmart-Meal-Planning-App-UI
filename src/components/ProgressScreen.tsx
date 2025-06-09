import React, { useState } from 'react';
import { ArrowLeftIcon, TrendingUpIcon, CalendarIcon, BarChart2Icon, AwardIcon } from 'lucide-react';
interface ProgressScreenProps {
  navigateTo: (screen: string) => void;
}
export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  navigateTo
}) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  // Mock data for progress stats
  const progressStats = {
    calories: {
      average: 1750,
      goal: 1800,
      trend: 'stable'
    },
    protein: {
      average: 110,
      goal: 120,
      trend: 'increasing'
    },
    mealCompletionRate: 85,
    daysOnTrack: 16,
    longestStreak: 21
  };
  const weeklyData = [{
    day: 'Mon',
    calories: 1650,
    target: 1800
  }, {
    day: 'Tue',
    calories: 1720,
    target: 1800
  }, {
    day: 'Wed',
    calories: 1840,
    target: 1800
  }, {
    day: 'Thu',
    calories: 1790,
    target: 1800
  }, {
    day: 'Fri',
    calories: 1710,
    target: 1800
  }, {
    day: 'Sat',
    calories: 1920,
    target: 1800
  }, {
    day: 'Sun',
    calories: 1650,
    target: 1800
  }];
  return <div className="flex flex-col min-h-screen bg-[#F8F9FA] max-w-[430px] mx-auto">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-white text-[#1A1A1A] border-b border-gray-100">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white">
        <div className="flex items-center">
          <button onClick={() => navigateTo('home')} className="mr-3 p-1">
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Progress</h1>
        </div>
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button className={`px-3 py-1 text-xs font-medium rounded-md ${activeTab === 'daily' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#757575]'}`} onClick={() => setActiveTab('daily')}>
            Daily
          </button>
          <button className={`px-3 py-1 text-xs font-medium rounded-md ${activeTab === 'weekly' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#757575]'}`} onClick={() => setActiveTab('weekly')}>
            Weekly
          </button>
          <button className={`px-3 py-1 text-xs font-medium rounded-md ${activeTab === 'monthly' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#757575]'}`} onClick={() => setActiveTab('monthly')}>
            Monthly
          </button>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 p-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-[#4CAF50] bg-opacity-10 flex items-center justify-center mr-2">
                <TrendingUpIcon size={16} className="text-[#4CAF50]" />
              </div>
              <h3 className="text-sm font-medium text-[#757575]">
                Avg. Calories
              </h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-[#1A1A1A]">
                {progressStats.calories.average}
              </span>
              <span className="text-sm text-[#757575] ml-1">
                / {progressStats.calories.goal}
              </span>
            </div>
            <div className="mt-2 text-xs text-[#4CAF50]">
              On track with your goal
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-[#2196F3] bg-opacity-10 flex items-center justify-center mr-2">
                <BarChart2Icon size={16} className="text-[#2196F3]" />
              </div>
              <h3 className="text-sm font-medium text-[#757575]">
                Avg. Protein
              </h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-[#1A1A1A]">
                {progressStats.protein.average}g
              </span>
              <span className="text-sm text-[#757575] ml-1">
                / {progressStats.protein.goal}g
              </span>
            </div>
            <div className="mt-2 text-xs text-[#2196F3]">
              Trending upward +5%
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-[#FF9800] bg-opacity-10 flex items-center justify-center mr-2">
                <CalendarIcon size={16} className="text-[#FF9800]" />
              </div>
              <h3 className="text-sm font-medium text-[#757575]">
                Days on Track
              </h3>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#1A1A1A]">
                {progressStats.daysOnTrack}
              </span>
            </div>
            <div className="mt-2 text-xs text-[#FF9800]">Last 30 days</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-[#9C27B0] bg-opacity-10 flex items-center justify-center mr-2">
                <AwardIcon size={16} className="text-[#9C27B0]" />
              </div>
              <h3 className="text-sm font-medium text-[#757575]">
                Best Streak
              </h3>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#1A1A1A]">
                {progressStats.longestStreak} days
              </span>
            </div>
            <div className="mt-2 text-xs text-[#9C27B0]">Keep it up!</div>
          </div>
        </div>
        {/* Weekly Chart */}
        <div className="px-6 py-2">
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
            Calorie Intake
          </h2>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="h-48 flex items-end justify-between">
              {weeklyData.map((day, index) => {
              const heightPercentage = day.calories / 2000 * 100;
              const targetPercentage = day.target / 2000 * 100;
              const isToday = index === 4; // Assuming Friday is today
              return <div key={day.day} className="flex flex-col items-center flex-1">
                    <div className="relative w-full flex justify-center mb-2">
                      <div className="w-6 bg-[#4CAF50] bg-opacity-20 rounded-t-md" style={{
                    height: `${heightPercentage}%`
                  }}></div>
                      <div className={`absolute w-12 h-0.5 ${isToday ? 'bg-[#4CAF50]' : 'bg-gray-300'}`} style={{
                    bottom: `${targetPercentage}%`
                  }}></div>
                    </div>
                    <span className={`text-xs ${isToday ? 'font-medium text-[#4CAF50]' : 'text-[#757575]'}`}>
                      {day.day}
                    </span>
                  </div>;
            })}
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#4CAF50] bg-opacity-20 rounded-sm mr-2"></div>
                <span className="text-xs text-[#757575]">Actual</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-0.5 bg-gray-300 mr-2"></div>
                <span className="text-xs text-[#757575]">Target (1800)</span>
              </div>
            </div>
          </div>
        </div>
        {/* Completion Rate */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
            Meal Completion Rate
          </h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E0E0E0" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#4CAF50" strokeWidth="8" strokeDasharray={`${progressStats.mealCompletionRate} 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-[#1A1A1A]">
                  {progressStats.mealCompletionRate}%
                </span>
              </div>
            </div>
            <div className="ml-6">
              <h3 className="font-medium text-[#1A1A1A]">Great progress!</h3>
              <p className="text-sm text-[#757575] mt-1">
                You've completed {progressStats.mealCompletionRate}% of your
                planned meals this week.
              </p>
              <p className="text-xs text-[#4CAF50] mt-2 font-medium">
                That's 5% better than last week
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>;
};