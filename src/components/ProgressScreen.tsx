import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  TrendingUpIcon,
  CalendarIcon,
  BarChart2Icon,
  AwardIcon,
  CheckCircleIcon,
  XCircleIcon } from
'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
  Cell } from
'recharts';
interface ProgressScreenProps {
  navigateTo: (screen: string) => void;
}
export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  navigateTo
}) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>(
    'weekly'
  );
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
  const weeklyData = [
  {
    day: 'Mon',
    breakfast: 320,
    lunch: 420,
    snack: 150,
    dinner: 760,
    total: 1650,
    target: 1800
  },
  {
    day: 'Tue',
    breakfast: 350,
    lunch: 480,
    snack: 120,
    dinner: 770,
    total: 1720,
    target: 1800
  },
  {
    day: 'Wed',
    breakfast: 380,
    lunch: 510,
    snack: 180,
    dinner: 770,
    total: 1840,
    target: 1800
  },
  {
    day: 'Thu',
    breakfast: 340,
    lunch: 450,
    snack: 160,
    dinner: 840,
    total: 1790,
    target: 1800
  },
  {
    day: 'Fri',
    breakfast: 310,
    lunch: 430,
    snack: 140,
    dinner: 830,
    total: 1710,
    target: 1800,
    isToday: true
  },
  {
    day: 'Sat',
    breakfast: 420,
    lunch: 550,
    snack: 200,
    dinner: 750,
    total: 1920,
    target: 1800
  },
  {
    day: 'Sun',
    breakfast: 300,
    lunch: 400,
    snack: 130,
    dinner: 820,
    total: 1650,
    target: 1800
  }];

  const macros = [
  {
    label: 'Protein',
    current: 110,
    target: 120,
    color: '#4CAF50',
    unit: 'g'
  },
  {
    label: 'Carbs',
    current: 210,
    target: 250,
    color: '#F59E0B',
    unit: 'g'
  },
  {
    label: 'Fat',
    current: 55,
    target: 65,
    color: '#3B82F6',
    unit: 'g'
  }];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce(
        (sum: number, entry: any) => sum + entry.value,
        0
      );
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl text-xs">
          <p className="font-bold text-gray-900 mb-1">{label}</p>
          {payload.map((entry: any, index: number) =>
          <div
            key={index}
            className="flex items-center justify-between gap-4 mb-0.5">
            
              <span className="capitalize text-gray-600 flex items-center gap-1">
                <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: entry.color
                }}>
              </span>
                {entry.name}
              </span>
              <span className="font-medium text-gray-900">{entry.value}</span>
            </div>
          )}
          <div className="mt-1 pt-1 border-t border-gray-100 flex justify-between gap-4 font-bold">
            <span>Total</span>
            <span>{total} cal</span>
          </div>
        </div>);

    }
    return null;
  };
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] max-w-[430px] mx-auto pb-6">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-5 py-3 bg-white text-[#1A1A1A] border-b border-gray-50">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-50 sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={() => navigateTo('home')}
            className="mr-3 p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
            
            <ArrowLeftIcon size={20} className="text-gray-900" />
          </button>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Progress</h1>
        </div>

        <div className="flex items-center bg-gray-100 rounded-xl p-1">
          {(['daily', 'weekly', 'monthly'] as const).map((tab) =>
          <button
            key={tab}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${activeTab === tab ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(tab)}>
            
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        {/* Summary Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                <TrendingUpIcon size={14} className="text-green-600" />
              </div>
              <span className="text-xs font-medium text-gray-500">
                Avg Calories
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900">
                {progressStats.calories.average}
              </span>
              <span className="text-xs text-gray-400">
                / {progressStats.calories.goal}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <BarChart2Icon size={14} className="text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-500">
                Avg Protein
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900">
                {progressStats.protein.average}g
              </span>
              <span className="text-xs text-gray-400">
                / {progressStats.protein.goal}g
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                <CalendarIcon size={14} className="text-orange-600" />
              </div>
              <span className="text-xs font-medium text-gray-500">
                On Track
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900">
                {progressStats.daysOnTrack}
              </span>
              <span className="text-xs text-gray-400">days</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <AwardIcon size={14} className="text-purple-600" />
              </div>
              <span className="text-xs font-medium text-gray-500">
                Best Streak
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900">
                {progressStats.longestStreak}
              </span>
              <span className="text-xs text-gray-400">days</span>
            </div>
          </div>
        </div>

        {/* Calorie Chart Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-gray-900">
              Calorie Intake
            </h2>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Target: 1800
            </div>
          </div>

          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{
                  top: 10,
                  right: 0,
                  left: -20,
                  bottom: 0
                }}>
                
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F3F4F6" />
                
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: '#9CA3AF'
                  }}
                  dy={10} />
                
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: '#9CA3AF'
                  }} />
                
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    fill: '#F9FAFB'
                  }} />
                
                <ReferenceLine
                  y={1800}
                  stroke="#EF4444"
                  strokeDasharray="3 3" />
                
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{
                    fontSize: '10px',
                    color: '#6B7280'
                  }} />
                
                <Bar
                  dataKey="breakfast"
                  name="Breakfast"
                  stackId="a"
                  fill="#F59E0B"
                  radius={[0, 0, 0, 0]} />
                
                <Bar
                  dataKey="lunch"
                  name="Lunch"
                  stackId="a"
                  fill="#4CAF50"
                  radius={[0, 0, 0, 0]} />
                
                <Bar
                  dataKey="snack"
                  name="Snack"
                  stackId="a"
                  fill="#60A5FA"
                  radius={[0, 0, 0, 0]} />
                
                <Bar
                  dataKey="dinner"
                  name="Dinner"
                  stackId="a"
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]} />
                
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Macro Breakdown */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Macro Breakdown
          </h2>
          <div className="space-y-4">
            {macros.map((macro) =>
            <div key={macro.label}>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-gray-700">{macro.label}</span>
                  <span className="text-gray-500">
                    <span className="text-gray-900 font-bold">
                      {macro.current}
                    </span>
                    /{macro.target}
                    {macro.unit}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(macro.current / macro.target * 100, 100)}%`,
                    backgroundColor: macro.color
                  }} />
                
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Meal Completion & Week Glance */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-1">
                Meal Completion
              </h2>
              <p className="text-xs text-gray-500 mb-3">
                You're crushing your goals!
              </p>
              <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg w-fit">
                <TrendingUpIcon size={12} />
                +5% vs last week
              </div>
            </div>

            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#F3F4F6"
                  strokeWidth="8" />
                
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeDasharray={`${progressStats.mealCompletionRate * 2.51} 251`}
                  strokeLinecap="round" />
                
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%">
                    
                    <stop offset="0%" stopColor="#4CAF50" />
                    <stop offset="100%" stopColor="#81C784" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-900">
                  {progressStats.mealCompletionRate}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              This Week at a Glance
            </h2>
            <div className="flex justify-between items-center">
              {weeklyData.map((day, i) => {
                const isOnTrack =
                day.total >= day.target - 100 && day.total <= day.target + 100;
                return (
                  <div
                    key={day.day}
                    className="flex flex-col items-center gap-2">
                    
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${isOnTrack ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      
                      {isOnTrack ?
                      <CheckCircleIcon size={14} /> :

                      <XCircleIcon size={14} />
                      }
                    </div>
                    <span className="text-[10px] font-medium text-gray-400">
                      {day.day.charAt(0)}
                    </span>
                  </div>);

              })}
            </div>
          </div>
        </div>
      </main>
    </div>);

};