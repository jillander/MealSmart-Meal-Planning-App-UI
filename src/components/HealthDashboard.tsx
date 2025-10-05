import React, { useState } from 'react';
import { FootprintsIcon, TimerIcon, FlameIcon, Dumbbell, HeartIcon, BedIcon, MapPinIcon } from 'lucide-react';
import { ActivityRings } from './ActivityRings';
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
    distance: {
      current: 5.2,
      goal: 8.0
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
      time: 'Today, 7:30 AM',
      distance: '3.2 km'
    }, {
      type: 'Strength',
      duration: '45 min',
      time: 'Yesterday, 6:15 PM'
    }, {
      type: 'Yoga',
      duration: '20 min',
      time: 'Yesterday, 7:00 AM'
    }, {
      type: 'Walking',
      duration: '50 min',
      time: 'Yesterday, 12:30 PM',
      distance: '4.1 km'
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
    },
    stand: {
      current: 9,
      goal: 12
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
      {/* Enhanced Activity Rings */}
      <div className="flex justify-center mb-6">
        <ActivityRings data={{
        steps: healthData.steps,
        activity: healthData.activeMinutes,
        stand: healthData.stand,
        calories: healthData.caloriesBurned
      }} />
      </div>
      {/* Distance Progress - New section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mr-2">
              <MapPinIcon size={12} className="text-purple-500" />
            </div>
            <span className="text-sm text-[#757575]">
              Distance (Walking + Running)
            </span>
          </div>
          <span className="text-sm font-medium">
            {Math.round(healthData.distance.current / healthData.distance.goal * 100)}
            %
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-purple-500 transition-all duration-1000" style={{
          width: `${healthData.distance.current / healthData.distance.goal * 100}%`
        }}></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-[#757575]">0 km</span>
          <span className="text-xs text-[#757575]">
            {healthData.distance.current} / {healthData.distance.goal} km
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
                <div className="flex items-center text-xs text-[#757575]">
                  <span className="truncate">{workout.time}</span>
                  {workout.distance && <>
                      <span className="mx-1">•</span>
                      <span className="text-purple-500 font-medium">
                        {workout.distance}
                      </span>
                    </>}
                </div>
              </div>
              <span className="text-xs font-medium text-[#757575] ml-2 whitespace-nowrap">
                {workout.duration}
              </span>
            </div>)}
        </div>
      </div>
    </div>;
};