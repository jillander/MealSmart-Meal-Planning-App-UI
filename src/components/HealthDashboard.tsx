import React, { useState } from 'react';
import { FootprintsIcon, TimerIcon, FlameIcon, Dumbbell, HeartIcon, BedIcon } from 'lucide-react';
interface HealthDashboardProps {
  onSwipe: () => void;
}
export const HealthDashboard: React.FC<HealthDashboardProps> = ({
  onSwipe
}) => {
  // Mock data for health stats
  const healthData = {
    steps: {
      current: 7543,
      goal: 10000
    },
    activeMinutes: {
      current: 35,
      goal: 60
    },
    caloriesBurned: {
      current: 420,
      goal: 600
    },
    workouts: [{
      type: 'Running',
      duration: '30 min',
      time: 'Today, 7:30 AM'
    }, {
      type: 'Strength',
      duration: '45 min',
      time: 'Yesterday, 6:15 PM'
    }, {
      type: 'Yoga',
      duration: '20 min',
      time: 'Yesterday, 7:00 AM'
    }],
    activityRings: {
      move: 75,
      exercise: 60,
      stand: 90 // percentage
    },
    sleep: {
      hours: 7.5,
      quality: 'Good',
      bedtime: '11:30 PM',
      wakeup: '7:00 AM'
    }
  };
  // Handle touch events for swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left to go back to nutrition dashboard
      onSwipe();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };
  return <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-fade-in overflow-y-auto" style={{
    maxHeight: 'calc(100vh - 240px)'
  }} // Increased height
  onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#1A1A1A]">
          Activity Summary
        </h2>
      </div>
      {/* Activity Rings - Optimized spacing */}
      <div className="flex items-center space-x-5 mb-4">
        {/* Activity Rings - Enhanced version with better text positioning */}
        <div className="relative w-24 h-24">
          {/* Stand Ring (outer) */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#E0E0E0" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#3498db" strokeWidth="8" strokeDasharray={`${healthData.activityRings.stand} 100`} strokeLinecap="round" className="ring-animation" style={{
            '--progress': healthData.activityRings.stand
          } as React.CSSProperties} />
          </svg>
          {/* Exercise Ring (middle) */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 scale-[0.75]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#E0E0E0" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#2ecc71" strokeWidth="8" strokeDasharray={`${healthData.activityRings.exercise} 100`} strokeLinecap="round" className="ring-animation" style={{
            '--progress': healthData.activityRings.exercise
          } as React.CSSProperties} />
          </svg>
          {/* Move Ring (inner) */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 scale-[0.5]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#E0E0E0" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e74c3c" strokeWidth="8" strokeDasharray={`${healthData.activityRings.move} 100`} strokeLinecap="round" className="ring-animation" style={{
            '--progress': healthData.activityRings.move
          } as React.CSSProperties} />
          </svg>
          {/* Improved text positioning with background for better readability */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="bg-white bg-opacity-80 rounded-full w-16 h-16 flex flex-col items-center justify-center">
              <p className="text-xl font-bold text-[#1A1A1A] leading-none">
                75%
              </p>
              <p className="text-[10px] text-[#757575] leading-tight">
                daily goals
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
                <FlameIcon size={14} className="text-red-500" />
              </div>
              <span className="text-sm text-[#757575]">Move</span>
            </div>
            <span className="text-sm font-medium">
              {healthData.caloriesBurned.current} cal
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <Dumbbell size={14} className="text-green-500" />
              </div>
              <span className="text-sm text-[#757575]">Exercise</span>
            </div>
            <span className="text-sm font-medium">
              {healthData.activeMinutes.current} min
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <FootprintsIcon size={14} className="text-blue-500" />
              </div>
              <span className="text-sm text-[#757575]">Steps</span>
            </div>
            <span className="text-sm font-medium">
              {healthData.steps.current.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      {/* Step Progress - Optimized spacing */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#757575]">Daily Steps</span>
          <span className="text-sm font-medium">
            {Math.round(healthData.steps.current / healthData.steps.goal * 100)}
            %
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 transition-all duration-1000" style={{
          width: `${healthData.steps.current / healthData.steps.goal * 100}%`
        }}></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-[#757575]">0</span>
          <span className="text-xs text-[#757575]">
            {healthData.steps.goal.toLocaleString()}
          </span>
        </div>
      </div>
      {/* Recent Activity - Now with proper spacing */}
      <div className="space-y-3 mt-6">
        <h3 className="text-sm font-medium text-[#1A1A1A] mb-3">
          Recent Workouts
        </h3>
        <div className="space-y-3 max-h-[200px] overflow-y-auto pb-4">
          {healthData.workouts.map((workout, index) => <div key={index} className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Dumbbell size={16} className="text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-[#1A1A1A] truncate">
                  {workout.type}
                </h4>
                <p className="text-xs text-[#757575] truncate">
                  {workout.time}
                </p>
              </div>
              <span className="text-xs font-medium text-[#757575] ml-2 whitespace-nowrap">
                {workout.duration}
              </span>
            </div>)}
        </div>
      </div>
    </div>;
};