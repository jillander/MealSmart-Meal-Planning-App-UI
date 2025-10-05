import React from 'react';
import { ImageIcon, CheckIcon, ArrowRightIcon } from 'lucide-react';
interface RecentUploadCardProps {
  progress: number;
  isComplete: boolean;
  timestamp: string;
  onClick: () => void;
}
export const RecentUploadCard: React.FC<RecentUploadCardProps> = ({
  progress,
  isComplete,
  timestamp,
  onClick
}) => {
  return <div className={`bg-white rounded-xl p-4 border border-gray-100 shadow-sm 
        ${isComplete ? 'hover:border-[#4CAF50] cursor-pointer' : ''}
        transition-all duration-300`} onClick={isComplete ? onClick : undefined}>
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center 
          ${isComplete ? 'bg-[#4CAF50]/10' : 'bg-gray-100'}`}>
          {isComplete ? <CheckIcon size={16} className="text-[#4CAF50]" /> : <ImageIcon size={16} className="text-gray-500" />}
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-[#1A1A1A]">
            {isComplete ? 'Ingredients Ready' : 'Processing Ingredients'}
          </h3>
          <p className="text-xs text-[#757575]">{timestamp}</p>
        </div>
        {isComplete ? <button className="flex items-center bg-[#4CAF50]/10 text-[#4CAF50] px-3 py-1 rounded-full text-xs font-medium" onClick={e => {
        e.stopPropagation();
        onClick();
      }}>
            View results
            <ArrowRightIcon size={12} className="ml-1" />
          </button> : <div className="w-16">
            <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute h-full bg-[#4CAF50] rounded-full transition-all duration-300" style={{
            width: `${progress}%`
          }} />
            </div>
            <p className="text-xs text-right text-[#757575] mt-1">
              {progress}%
            </p>
          </div>}
      </div>
    </div>;
};