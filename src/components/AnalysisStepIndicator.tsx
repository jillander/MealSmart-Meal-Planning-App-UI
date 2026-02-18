import React from 'react';
import {
  CloudUploadIcon,
  SearchIcon,
  DatabaseIcon,
  CheckCircleIcon,
  RefreshCwIcon } from
'lucide-react';
interface Step {
  id: number;
  name: string;
  message: string;
  duration: number;
}
interface AnalysisStepIndicatorProps {
  steps: Step[];
  currentStep: number;
  hasError: boolean;
  onRetry: () => void;
}
export const AnalysisStepIndicator: React.FC<AnalysisStepIndicatorProps> = ({
  steps,
  currentStep,
  hasError,
  onRetry
}) => {
  // Get icon based on step name
  const getStepIcon = (
  stepName: string,
  isActive: boolean,
  isComplete: boolean,
  hasError: boolean) =>
  {
    const iconSize = 18;
    const iconClassName = `${isActive ? 'animate-pulse' : ''} ${isComplete ? 'text-[#4CAF50]' : isActive ? 'text-[#FF9800]' : 'text-[#BDBDBD]'}`;
    switch (stepName.toLowerCase()) {
      case 'uploading':
        return <CloudUploadIcon size={iconSize} className={iconClassName} />;
      case 'detecting':
        return <SearchIcon size={iconSize} className={iconClassName} />;
      case 'searching':
        return <DatabaseIcon size={iconSize} className={iconClassName} />;
      case 'finalizing':
        return <CheckCircleIcon size={iconSize} className={iconClassName} />;
      default:
        return <CloudUploadIcon size={iconSize} className={iconClassName} />;
    }
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isActive = index === currentStep;
          const isError = hasError && isActive;
          return (
            <div key={step.id} className="flex flex-col items-center relative">
              {/* Step Icon */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${isComplete ? 'bg-[#4CAF50]/10' : isActive ? 'bg-[#FF9800]/10' : 'bg-gray-100'}
                  ${isError ? 'bg-red-50' : ''}
                  transition-all duration-250`}>

                {isError ?
                <button
                  onClick={onRetry}
                  className="text-red-500 hover:text-red-600">

                    <RefreshCwIcon size={18} />
                  </button> :

                getStepIcon(step.name, isActive, isComplete, hasError)
                }
              </div>
              {/* Step Name */}
              <span
                className={`text-xs mt-2 font-medium
                  ${isComplete ? 'text-[#4CAF50]' : isActive ? 'text-[#FF9800]' : 'text-[#BDBDBD]'}
                  ${isError ? 'text-red-500' : ''}
                  transition-colors duration-250`}>

                {step.name}
              </span>
              {/* Connector Line */}
              {index < steps.length - 1 &&
              <div
                className={`absolute top-5 left-10 w-[calc(100%-1rem)] h-0.5
                    ${index < currentStep ? 'bg-[#4CAF50]' : 'bg-gray-200'}
                    transition-colors duration-250`}
                style={{
                  width: 'calc(100% + 1rem)'
                }} />

              }
            </div>);

        })}
      </div>
    </div>);

};