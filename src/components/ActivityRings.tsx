import React from 'react';
import { FootprintsIcon, TimerIcon, FlameIcon, BedIcon } from 'lucide-react';
interface ActivityRingsProps {
  data: {
    steps: {
      current: number;
      goal: number;
    };
    activity: {
      current: number;
      goal: number;
    };
    stand: {
      current: number;
      goal: number;
    };
    calories: {
      current: number;
      goal: number;
    };
  };
  size?: number;
}
export const ActivityRings: React.FC<ActivityRingsProps> = ({
  data,
  size = 150
}) => {
  // Calculate percentages
  const stepsPercentage = Math.min(100, Math.round(data.steps.current / data.steps.goal * 100));
  const activityPercentage = Math.min(100, Math.round(data.activity.current / data.activity.goal * 100));
  const standPercentage = Math.min(100, Math.round(data.stand.current / data.stand.goal * 100));
  const caloriesPercentage = Math.min(100, Math.round(data.calories.current / data.calories.goal * 100));
  // Calculate overall percentage
  const overallPercentage = Math.round((stepsPercentage + activityPercentage + standPercentage + caloriesPercentage) / 4);
  // SVG parameters
  const center = size / 2;
  const strokeWidth = 8;
  const gap = 5;
  // Calculate radii for each ring (from outer to inner)
  const radius1 = center - strokeWidth / 2; // Blue (steps) - outermost
  const radius2 = radius1 - strokeWidth - gap; // Green (activity)
  const radius3 = radius2 - strokeWidth - gap; // Orange (stand)
  const radius4 = radius3 - strokeWidth - gap; // Red (calories) - innermost
  // Calculate circumferences
  const circumference1 = 2 * Math.PI * radius1;
  const circumference2 = 2 * Math.PI * radius2;
  const circumference3 = 2 * Math.PI * radius3;
  const circumference4 = 2 * Math.PI * radius4;
  // Calculate strokeDashoffset values
  const offset1 = circumference1 * (1 - stepsPercentage / 100);
  const offset2 = circumference2 * (1 - activityPercentage / 100);
  const offset3 = circumference3 * (1 - standPercentage / 100);
  const offset4 = circumference4 * (1 - caloriesPercentage / 100);
  return <div className="flex flex-col items-center">
      {/* Rings Container */}
      <div className="relative" style={{
      width: size,
      height: size
    }}>
        {/* Steps Ring (outermost - blue) */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle cx={center} cy={center} r={radius1} fill="none" stroke="#E0E0E0" strokeWidth={strokeWidth} />
          <circle cx={center} cy={center} r={radius1} fill="none" stroke="#2196F3" // Blue
        strokeWidth={strokeWidth} strokeDasharray={circumference1} strokeDashoffset={offset1} strokeLinecap="round" className="activity-ring steps-ring" />
        </svg>
        {/* Activity Ring (green) */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle cx={center} cy={center} r={radius2} fill="none" stroke="#E0E0E0" strokeWidth={strokeWidth} />
          <circle cx={center} cy={center} r={radius2} fill="none" stroke="#4CAF50" // Green
        strokeWidth={strokeWidth} strokeDasharray={circumference2} strokeDashoffset={offset2} strokeLinecap="round" className="activity-ring activity-ring-green" />
        </svg>
        {/* Stand Ring (orange) */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle cx={center} cy={center} r={radius3} fill="none" stroke="#E0E0E0" strokeWidth={strokeWidth} />
          <circle cx={center} cy={center} r={radius3} fill="none" stroke="#FF9800" // Orange
        strokeWidth={strokeWidth} strokeDasharray={circumference3} strokeDashoffset={offset3} strokeLinecap="round" className="activity-ring stand-ring" />
        </svg>
        {/* Calories Ring (innermost - red) */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle cx={center} cy={center} r={radius4} fill="none" stroke="#E0E0E0" strokeWidth={strokeWidth} />
          <circle cx={center} cy={center} r={radius4} fill="none" stroke="#F44336" // Red
        strokeWidth={strokeWidth} strokeDasharray={circumference4} strokeDashoffset={offset4} strokeLinecap="round" className="activity-ring calories-ring" />
        </svg>
        {/* Center Text with White Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center shadow-sm">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1A1A1A]">
                {overallPercentage}%
              </p>
              <p className="text-xs text-[#757575]">completed</p>
            </div>
          </div>
        </div>
      </div>
      {/* Legend with Icons */}
      <div className="mt-6 w-full max-w-xs">
        <div className="grid grid-cols-2 gap-y-4">
          {/* Steps (Blue) */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <FootprintsIcon size={18} className="text-[#2196F3]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]">
                {data.steps.current.toLocaleString()} steps
              </p>
              <p className="text-xs text-[#757575]">
                Goal: {data.steps.goal.toLocaleString()}
              </p>
            </div>
          </div>
          {/* Activity (Green) */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <TimerIcon size={18} className="text-[#4CAF50]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]">
                {data.activity.current} min active
              </p>
              <p className="text-xs text-[#757575]">
                Goal: {data.activity.goal} min
              </p>
            </div>
          </div>
          {/* Stand (Orange) */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2">
              <BedIcon size={18} className="text-[#FF9800]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]">
                {data.stand.current} hrs stand
              </p>
              <p className="text-xs text-[#757575]">
                Goal: {data.stand.goal} hrs
              </p>
            </div>
          </div>
          {/* Calories (Red) */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
              <FlameIcon size={18} className="text-[#F44336]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]">
                {data.calories.current} cal
              </p>
              <p className="text-xs text-[#757575]">
                Goal: {data.calories.goal} cal
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fill-ring {
          0% {
            stroke-dashoffset: var(--initial-offset);
          }
          100% {
            stroke-dashoffset: var(--final-offset);
          }
        }
        .activity-ring {
          transition: stroke-dashoffset 1.5s ease-out;
          animation: fill-ring 1.5s ease-out forwards;
        }
        .steps-ring {
          --initial-offset: ${circumference1};
          --final-offset: ${offset1};
        }
        .activity-ring-green {
          --initial-offset: ${circumference2};
          --final-offset: ${offset2};
          animation-delay: 0.2s;
        }
        .stand-ring {
          --initial-offset: ${circumference3};
          --final-offset: ${offset3};
          animation-delay: 0.4s;
        }
        .calories-ring {
          --initial-offset: ${circumference4};
          --final-offset: ${offset4};
          animation-delay: 0.6s;
        }
      `}</style>
    </div>;
};