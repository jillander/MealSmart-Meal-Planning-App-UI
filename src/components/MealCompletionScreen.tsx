import React from 'react';
import { CameraIcon, StarIcon } from 'lucide-react';
interface MealCompletionScreenProps {
  onClose: () => void;
}
export const MealCompletionScreen: React.FC<MealCompletionScreenProps> = ({
  onClose
}) => {
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-[#1A3A3A] text-center mb-2">
          Did you prepare this meal?
        </h2>
        <p className="text-[#2B394A] text-center mb-6">
          One-Pan Chicken Dinner • 520 calories
        </p>
        {/* Photo Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center mb-6">
          <CameraIcon size={32} className="text-gray-400 mb-2" />
          <p className="text-[#2B394A] text-center text-sm">
            Take a photo of your completed meal (optional)
          </p>
        </div>
        {/* Satisfaction Rating */}
        <div className="mb-8">
          <p className="text-[#1A3A3A] text-center mb-3">
            How satisfied were you with this meal?
          </p>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map(star => <button key={star} className="p-1">
                <StarIcon size={28} className="text-gray-300" />
              </button>)}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <button className="w-full bg-[#FF6B6B] text-white py-3 px-6 rounded-full font-medium shadow-sm hover:bg-opacity-90 transition-colors" onClick={onClose}>
            Submit Feedback
          </button>
          <button className="w-full py-3 px-6 text-[#2B394A] font-medium" onClick={onClose}>
            Skip
          </button>
        </div>
      </div>
    </div>;
};