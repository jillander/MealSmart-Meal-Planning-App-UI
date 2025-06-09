import React from 'react';
import { CheckIcon, CameraIcon, BookOpenIcon, EyeIcon, UtensilsIcon } from 'lucide-react';
interface ProgressFlowBarProps {
  currentStep: number; // 0-4
}
export const ProgressFlowBar: React.FC<ProgressFlowBarProps> = ({
  currentStep
}) => {
  const steps = [{
    id: 1,
    label: 'Capture Ingredients',
    icon: CameraIcon
  }, {
    id: 2,
    label: 'Pick a Recipe',
    icon: BookOpenIcon
  }, {
    id: 3,
    label: 'View Recipe',
    icon: EyeIcon
  }, {
    id: 4,
    label: 'Log Meal',
    icon: UtensilsIcon
  }];
  const getStepStatus = (stepId: number) => {
    if (stepId <= currentStep) return 'completed';
    if (stepId === currentStep + 1) return 'active';
    return 'pending';
  };
  const getStepStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[#4CAF50] text-white border-[#4CAF50]';
      case 'active':
        return 'bg-[#FF9800] text-white border-[#FF9800] animate-pulse';
      default:
        return 'bg-white text-[#757575] border-[#E0E0E0]';
    }
  };
  const getConnectorStyles = (stepId: number) => {
    return stepId <= currentStep ? 'bg-[#4CAF50]' : 'bg-[#E0E0E0]';
  };
  return <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
        const status = getStepStatus(step.id);
        const Icon = step.icon;
        return <div key={step.id} className="flex flex-col items-center relative z-10">
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getStepStyles(status)}`}>
                {status === 'completed' ? <CheckIcon size={20} className="animate-scale-in" /> : <Icon size={20} />}
              </div>
              <span className={`text-xs mt-2 text-center font-medium max-w-[80px] ${status === 'completed' ? 'text-[#4CAF50]' : status === 'active' ? 'text-[#FF9800]' : 'text-[#757575]'}`}>
                {step.label}
              </span>
              {/* Connector Line */}
              {index < steps.length - 1 && <div className="absolute top-6 left-12 w-[calc(100vw/4-3rem)] h-0.5 -z-10">
                  <div className={`h-full transition-all duration-500 ${getConnectorStyles(step.id)}`} />
                </div>}
            </div>;
      })}
      </div>
      {/* Progress Status Text */}
      <div className="text-center mt-4">
        <p className="text-sm text-[#757575]">
          {currentStep === 0 && 'Ready to capture ingredients'}
          {currentStep === 1 && 'Ingredients captured! Pick a recipe'}
          {currentStep === 2 && 'Recipe selected! View the details'}
          {currentStep === 3 && 'Recipe viewed! Log your meal'}
          {currentStep === 4 && '🎉 Meal completed!'}
        </p>
      </div>
    </div>;
};