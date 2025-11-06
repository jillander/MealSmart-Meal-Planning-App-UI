import React, { useEffect, useState } from 'react';
import { ChefHatIcon, SparklesIcon, SearchIcon, CheckCircleIcon, Loader2Icon, BrainIcon, TargetIcon, BarChart3Icon } from 'lucide-react';
interface RecipeGenerationLoadingScreenProps {
  onComplete: () => void;
  ingredients: string[];
}
interface LoadingStep {
  id: number;
  icon: string;
  title: string;
  description: string;
  duration: number;
}
export const RecipeGenerationLoadingScreen: React.FC<RecipeGenerationLoadingScreenProps> = ({
  onComplete,
  ingredients
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  // Loading steps with engaging microcopy
  const steps: LoadingStep[] = [{
    id: 1,
    icon: '🔍',
    title: 'Analyzing your ingredients',
    description: 'Identifying flavor profiles and nutrient composition',
    duration: 2000
  }, {
    id: 2,
    icon: '🧠',
    title: 'AI is thinking...',
    description: 'Matching with 10,000+ viral recipe patterns',
    duration: 3000
  }, {
    id: 3,
    icon: '🎯',
    title: 'Finding perfect matches',
    description: 'Filtering by your preferences and calorie goals',
    duration: 2500
  }, {
    id: 4,
    icon: '📊',
    title: 'Calculating nutrition',
    description: 'Computing macros and ingredient compatibility',
    duration: 2000
  }, {
    id: 5,
    icon: '✨',
    title: 'Finalizing your recipes',
    description: 'Curating the best options just for you',
    duration: 2500
  }];
  useEffect(() => {
    // Simulate step-by-step progress
    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 50;
      const newProgress = Math.min(elapsed / totalDuration * 100, 100);
      setProgress(newProgress);
      // Update current step based on progress
      let cumulativeDuration = 0;
      for (let i = 0; i < steps.length; i++) {
        cumulativeDuration += steps[i].duration;
        if (elapsed < cumulativeDuration) {
          setCurrentStep(i);
          break;
        }
      }
      // Mark completed steps
      const completed = steps.filter((_, index) => {
        let stepEnd = 0;
        for (let j = 0; j <= index; j++) {
          stepEnd += steps[j].duration;
        }
        return elapsed >= stepEnd;
      }).map(step => step.id);
      setCompletedSteps(completed);
      // Complete at 100%
      if (newProgress >= 100) {
        clearInterval(interval);
        // Trigger haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate([50, 100, 50]);
        }
        // Navigate after brief delay
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [ingredients.length, onComplete]);
  return <div className="flex flex-col min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-white text-[#1A1A1A] border-b border-gray-100">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Animated Icon */}
        <div className="relative mb-8">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 w-32 h-32 border-4 border-emerald-200 rounded-full animate-spin-slow" />

          {/* Middle pulsing ring */}
          <div className="absolute inset-2 w-28 h-28 bg-emerald-100 rounded-full animate-pulse" />

          {/* Center icon */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <ChefHatIcon size={36} className="text-white" />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Creating Your Recipes
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Hang tight! We're crafting personalized recipes just for you
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-sm mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {steps[currentStep]?.title}
            </span>
            <span className="text-sm font-bold text-emerald-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ease-out rounded-full" style={{
            width: `${progress}%`
          }} />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {steps[currentStep]?.description}
          </p>
        </div>

        {/* Step Indicators */}
        <div className="w-full max-w-sm space-y-4">
          {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = currentStep === index;
          const isPending = !isCompleted && !isActive;
          return <div key={step.id} className={`flex items-center p-4 rounded-xl transition-all duration-300 ${isActive ? 'bg-emerald-50 border-2 border-emerald-200' : isCompleted ? 'bg-white border-2 border-emerald-500' : 'bg-gray-50 border-2 border-transparent'}`}>
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-300 text-2xl ${isCompleted ? 'bg-emerald-500' : isActive ? 'bg-emerald-100' : 'bg-gray-200'}`}>
                  {isCompleted ? <CheckCircleIcon size={24} className="text-white animate-scale-in" /> : isActive ? <span className="animate-pulse">{step.icon}</span> : <span className={isPending ? 'opacity-40' : ''}>
                      {step.icon}
                    </span>}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className={`font-semibold ${isCompleted || isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                  <p className={`text-sm ${isActive ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {step.description}
                  </p>
                </div>

                {/* Status Indicator */}
                {isCompleted && <CheckCircleIcon size={20} className="text-emerald-500 animate-scale-in" />}
                {isActive && <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />}
              </div>;
        })}
        </div>

        {/* Fun Fact / Tip */}
        <div className="mt-8 p-4 bg-white rounded-xl border border-emerald-100 max-w-sm">
          <p className="text-sm text-gray-600 text-center">
            💡 <span className="font-semibold">Did you know?</span> Our AI
            considers nutrition, taste preferences, and cooking time to find
            your perfect recipes!
          </p>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>;
};