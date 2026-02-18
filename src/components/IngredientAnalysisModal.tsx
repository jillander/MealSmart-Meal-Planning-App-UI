import React, { useEffect, useState } from 'react';
import {
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  RefreshCwIcon,
  PlayIcon,
  SkipForwardIcon } from
'lucide-react';
import { AnalysisStepIndicator } from './AnalysisStepIndicator';
import { AnalysisProgressCircle } from './AnalysisProgressCircle';
import { AnalysisDetailsLog } from './AnalysisDetailsLog';
interface IngredientAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (ingredients: any[]) => void;
  testMode?: boolean; // Add test mode prop
}
export const IngredientAnalysisModal: React.FC<
  IngredientAnalysisModalProps> =
({ isOpen, onClose, onComplete, testMode = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [analysisStarted, setAnalysisStarted] = useState(false); // Track if analysis has started
  const steps = [
  {
    id: 0,
    name: 'Uploading',
    message: 'Sending image to server...',
    duration: testMode ? 5000 : 2000 // Longer durations in test mode
  },
  {
    id: 1,
    name: 'Detecting',
    message: 'Identifying items in image...',
    duration: testMode ? 6000 : 3000
  },
  {
    id: 2,
    name: 'Searching',
    message: 'Matching with our database...',
    duration: testMode ? 7000 : 2500
  },
  {
    id: 3,
    name: 'Finalizing',
    message: 'Preparing your ingredients...',
    duration: testMode ? 5000 : 1500
  }];

  // Simulate haptic feedback
  const triggerHapticFeedback = () => {
    console.log('Haptic feedback triggered');
    // In a real app, we would use a native bridge or web API for haptics
  };
  const addLog = (message: string) => {
    setLogs((prev) => [
    ...prev,
    `[${new Date().toLocaleTimeString()}] ${message}`]
    );
  };
  const retryAnalysis = () => {
    setHasError(false);
    setCurrentStep(0);
    setProgress(0);
    setLogs([]);
    startAnalysis();
    triggerHapticFeedback();
  };
  // Manual step progression for test mode
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      addLog(`Manually advancing to step: ${steps[currentStep + 1].name}`);
      // Update progress based on steps
      const newProgress = (currentStep + 1) / (steps.length - 1) * 100;
      setProgress(newProgress);
    } else {
      // Final step - complete the analysis
      setProgress(100);
      addLog('Analysis complete!');
      setTimeout(() => {
        const mockIngredients = [
        {
          id: 1,
          name: 'Tomatoes',
          quantity: '3 medium',
          image: 'https://images.unsplash.com/photo-1546104710-46c39da16c89'
        },
        {
          id: 2,
          name: 'Onions',
          quantity: '2 medium',
          image:
          'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1'
        },
        {
          id: 3,
          name: 'Bell Peppers',
          quantity: '1 large',
          image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83'
        },
        {
          id: 4,
          name: 'Garlic',
          quantity: '4 cloves',
          image:
          'https://images.unsplash.com/photo-1615477550927-6ec413976534'
        }];

        onComplete(mockIngredients);
      }, 1000);
    }
  };
  // Skip to completion for test mode
  const skipToCompletion = () => {
    setCurrentStep(steps.length - 1);
    setProgress(100);
    addLog('Analysis skipped to completion!');
    setTimeout(() => {
      const mockIngredients = [
      {
        id: 1,
        name: 'Tomatoes',
        quantity: '3 medium',
        image: 'https://images.unsplash.com/photo-1546104710-46c39da16c89'
      },
      {
        id: 2,
        name: 'Onions',
        quantity: '2 medium',
        image: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1'
      },
      {
        id: 3,
        name: 'Bell Peppers',
        quantity: '1 large',
        image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83'
      },
      {
        id: 4,
        name: 'Garlic',
        quantity: '4 cloves',
        image: 'https://images.unsplash.com/photo-1615477550927-6ec413976534'
      }];

      onComplete(mockIngredients);
    }, 1000);
  };
  const startAnalysis = () => {
    setAnalysisStarted(true);
    addLog('Starting ingredient analysis...');
    // If in test mode, wait for manual progression
    if (testMode) {
      addLog('TEST MODE: Manual step progression enabled');
      setCurrentStep(0);
      setProgress(0);
      return;
    }
    // Simulate the analysis process with timeouts
    let totalDuration = 0;
    let accumulatedProgress = 0;
    steps.forEach((step, index) => {
      totalDuration += step.duration;
      // Schedule the step to start at the right time
      setTimeout(() => {
        setCurrentStep(index);
        addLog(`Starting step: ${step.name}`);
        triggerHapticFeedback();
        // Simulate progress updates within this step
        const intervalTime = 100; // Update every 100ms
        const progressPerInterval =
        step.duration / intervalTime / (totalDuration / 100);
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            const newProgress = Math.min(
              prev + progressPerInterval,
              accumulatedProgress + step.duration / totalDuration * 100
            );
            return newProgress;
          });
        }, intervalTime);
        // Schedule the end of this interval
        setTimeout(() => {
          clearInterval(progressInterval);
          addLog(`Completed step: ${step.name}`);
          accumulatedProgress += step.duration / totalDuration * 100;
          // If it's the last step, complete the process
          if (index === steps.length - 1) {
            setProgress(100);
            addLog('Analysis complete!');
            setTimeout(() => {
              // Simulate found ingredients
              const mockIngredients = [
              {
                id: 1,
                name: 'Tomatoes',
                quantity: '3 medium',
                image:
                'https://images.unsplash.com/photo-1546104710-46c39da16c89'
              },
              {
                id: 2,
                name: 'Onions',
                quantity: '2 medium',
                image:
                'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1'
              },
              {
                id: 3,
                name: 'Bell Peppers',
                quantity: '1 large',
                image:
                'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83'
              },
              {
                id: 4,
                name: 'Garlic',
                quantity: '4 cloves',
                image:
                'https://images.unsplash.com/photo-1615477550927-6ec413976534'
              }];

              onComplete(mockIngredients);
            }, 1000);
          }
          // Randomly simulate an error (10% chance) but not on the last step
          if (index < steps.length - 1 && Math.random() < 0.1) {
            setHasError(true);
            addLog('ERROR: Connection interrupted. Please retry.');
            triggerHapticFeedback();
          }
        }, step.duration);
      }, totalDuration - step.duration);
    });
  };
  useEffect(() => {
    if (isOpen && !analysisStarted) {
      startAnalysis();
    }
    // Reset state when modal closes
    if (!isOpen) {
      setAnalysisStarted(false);
      setCurrentStep(0);
      setProgress(0);
      setLogs([]);
      setHasError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-[430px] bg-white rounded-t-[24px] shadow-xl transform transition-transform duration-300 ease-out animate-slide-up">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-1.5 bg-white rounded-full opacity-80" />
        </div>
        {/* Test Mode Indicator */}
        {testMode &&
        <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              Test Mode
            </span>
          </div>
        }
        {/* Header */}
        <div className="pt-6 px-6 flex justify-between items-center">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#1A1A1A]">
              Analyzing your ingredients
            </h2>
            <p className="text-sm text-[#757575] mt-1 animate-pulse">
              {!hasError ? steps[currentStep]?.message : 'Analysis interrupted'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#757575] hover:bg-gray-100">

            <XIcon size={20} />
          </button>
        </div>
        {/* Progress Circle */}
        <div className="flex justify-center mt-6 mb-4">
          <AnalysisProgressCircle
            progress={progress}
            size={64}
            hasError={hasError} />

        </div>
        {/* Steps Indicator */}
        <div className="px-6 mt-2">
          <AnalysisStepIndicator
            steps={steps}
            currentStep={currentStep}
            hasError={hasError}
            onRetry={retryAnalysis} />

        </div>
        {/* Test Mode Controls */}
        {testMode &&
        <div className="px-6 mt-6">
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <h3 className="text-sm font-medium text-red-800 mb-2">
                Test Mode Controls
              </h3>
              <div className="flex space-x-2">
                <button
                onClick={goToNextStep}
                className="flex-1 py-2 px-3 bg-red-600 text-white text-sm rounded-lg flex items-center justify-center">

                  <PlayIcon size={14} className="mr-1" />
                  Next Step
                </button>
                <button
                onClick={skipToCompletion}
                className="flex-1 py-2 px-3 bg-red-600 text-white text-sm rounded-lg flex items-center justify-center">

                  <SkipForwardIcon size={14} className="mr-1" />
                  Complete
                </button>
              </div>
            </div>
          </div>
        }
        {/* Details Toggle */}
        <div className="px-6 mt-6 pb-6 border-t border-gray-100 pt-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center text-sm text-[#757575] font-medium">

            {showDetails ?
            <ChevronUpIcon size={16} className="mr-1" /> :

            <ChevronDownIcon size={16} className="mr-1" />
            }
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
          {showDetails &&
          <div className="mt-3">
              <AnalysisDetailsLog logs={logs} />
            </div>
          }
          {/* Error State */}
          {hasError &&
          <div className="mt-4 bg-red-50 rounded-xl p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 text-red-500">
                  <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor">

                    <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd" />

                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Connection error
                  </h3>
                  <p className="text-xs text-red-700 mt-1">
                    We couldn't complete the analysis. Please check your
                    connection and try again.
                  </p>
                  <button
                  onClick={retryAnalysis}
                  className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none">

                    <RefreshCwIcon size={14} className="mr-1" />
                    Retry Analysis
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

};