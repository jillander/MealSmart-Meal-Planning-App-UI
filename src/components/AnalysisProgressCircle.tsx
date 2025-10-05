import React from 'react';
import { AlertTriangleIcon } from 'lucide-react';
interface AnalysisProgressCircleProps {
  progress: number;
  size: number;
  hasError: boolean;
}
export const AnalysisProgressCircle: React.FC<AnalysisProgressCircleProps> = ({
  progress,
  size,
  hasError
}) => {
  const radius = size / 2 - 4;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress / 100 * circumference;
  return <div className="relative" style={{
    width: size,
    height: size
  }}>
      {/* Background Circle */}
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E0E0E0" strokeWidth="4" />
        {/* Progress Circle */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={hasError ? '#F44336' : '#4CAF50'} strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-300 ease-out" />
      </svg>
      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {hasError ? <AlertTriangleIcon size={size / 3} className="text-[#F44336]" /> : <span className="text-lg font-bold text-[#1A1A1A]">
            {Math.round(progress)}%
          </span>}
      </div>
    </div>;
};