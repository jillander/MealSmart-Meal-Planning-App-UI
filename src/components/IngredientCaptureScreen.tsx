import React, { useState } from 'react';
import { XIcon, CameraIcon, ImageIcon, SunIcon, LayersIcon, HandIcon, SettingsIcon } from 'lucide-react';
import { IngredientAnalysisModal } from './IngredientAnalysisModal';
interface IngredientCaptureScreenProps {
  navigateTo: (screen: string) => void;
}
export const IngredientCaptureScreen: React.FC<IngredientCaptureScreenProps> = ({
  navigateTo
}) => {
  const [activeTab, setActiveTab] = useState('fridge');
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const handleCapture = () => {
    // Simulate taking a photo
    setShowAnalysisModal(true);
  };
  const handleAnalysisComplete = (ingredients: any[]) => {
    console.log('Analysis complete with ingredients:', ingredients);
    setShowAnalysisModal(false);
    // Navigate to the confirmation screen with the detected ingredients
    navigateTo('ingredient-confirmation');
  };
  return <div className="flex flex-col min-h-screen bg-[#F4F1DE]">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#F4F1DE] text-[#1A3A3A]">
        <span className="text-sm">9:41 AM</span>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Signal</span>
          <span className="text-sm">WiFi</span>
          <span className="text-sm">Battery</span>
        </div>
      </div>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold text-[#1A3A3A]">
          Capture Ingredients
        </h1>
        <div className="flex items-center">
          <button className={`mr-2 px-3 py-1 rounded-full text-xs ${testMode ? 'bg-[#FF6B6B] text-white' : 'bg-gray-200 text-[#1A3A3A]'}`} onClick={() => setTestMode(!testMode)}>
            {testMode ? 'Test Mode ON' : 'Test Mode'}
          </button>
          <button className="p-2 text-[#1A3A3A]" onClick={() => navigateTo('home')}>
            <XIcon size={24} />
          </button>
        </div>
      </header>
      {/* Tab Navigation */}
      <div className="px-6 mb-4">
        <div className="flex bg-[#FFF9F2] p-1 rounded-full">
          <button className={`flex-1 py-2 px-4 rounded-full text-center transition-all duration-200 ${activeTab === 'fridge' ? 'bg-[#FF6B6B] text-white' : 'text-[#1A3A3A]'}`} onClick={() => setActiveTab('fridge')}>
            Fridge Photo
          </button>
          <button className={`flex-1 py-2 px-4 rounded-full text-center transition-all duration-200 ${activeTab === 'receipt' ? 'bg-[#FF6B6B] text-white' : 'text-[#1A3A3A]'}`} onClick={() => setActiveTab('receipt')}>
            Receipt Scan
          </button>
        </div>
      </div>
      {/* Camera Viewfinder */}
      <div className="px-6 mb-6">
        <div className="relative aspect-[3/4] bg-black rounded-xl overflow-hidden flex items-center justify-center">
          {activeTab === 'fridge' ? <>
              {/* Animated border for fridge photo */}
              <div className="absolute inset-8">
                <div className="absolute inset-0 border-2 border-white opacity-70 rounded-lg"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#FF6B6B] rounded-tl animate-border-tl"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#FF6B6B] rounded-tr animate-border-tr"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#FF6B6B] rounded-bl animate-border-bl"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#FF6B6B] rounded-br animate-border-br"></div>
              </div>
              <div className="text-white text-center z-10">
                <CameraIcon size={48} className="mx-auto mb-3 animate-pulse" />
                <p className="text-lg font-medium">
                  Let's see what's in your fridge!
                </p>
                <p className="text-sm opacity-80 mt-2">
                  Position your ingredients in frame
                </p>
              </div>
            </> : <>
              {/* Scanning animation for receipt */}
              <div className="absolute inset-0 border-2 border-dashed border-white opacity-70 m-8 rounded-lg"></div>
              <div className="absolute inset-8 overflow-hidden rounded-lg">
                <div className="absolute inset-x-0 h-1.5 bg-[#FF6B6B] animate-scan"></div>
              </div>
              <div className="text-white text-center z-10">
                <CameraIcon size={48} className="mx-auto mb-3" />
                <p className="text-lg font-medium">
                  Ready to scan your receipt!
                </p>
                <p className="text-sm opacity-80 mt-2">
                  Hold it steady and centered
                </p>
              </div>
            </>}
        </div>
      </div>
      {/* Tips Section */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-medium text-[#1A3A3A] mb-3">Quick Tips</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="bg-[#A0CED9] p-2 rounded-full mr-3">
              <SunIcon size={20} className="text-[#1A3A3A]" />
            </div>
            <p className="text-[#2B394A]">Find a well-lit spot</p>
          </div>
          <div className="flex items-center">
            <div className="bg-[#A0CED9] p-2 rounded-full mr-3">
              <LayersIcon size={20} className="text-[#1A3A3A]" />
            </div>
            <p className="text-[#2B394A]">Space items slightly apart</p>
          </div>
          <div className="flex items-center">
            <div className="bg-[#A0CED9] p-2 rounded-full mr-3">
              <HandIcon size={20} className="text-[#1A3A3A]" />
            </div>
            <p className="text-[#2B394A]">Keep your phone steady</p>
          </div>
        </div>
      </div>
      {/* Test Mode Controls - Only visible in test mode */}
      {testMode && <div className="px-6 mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
          <h3 className="font-medium text-red-800 mb-2">Test Mode Controls</h3>
          <p className="text-sm text-red-700 mb-3">
            Use these buttons to test the app flow manually:
          </p>
          <div className="flex flex-wrap gap-2">
            <button onClick={handleCapture} className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm">
              1. Open Analysis Modal
            </button>
            <button onClick={() => navigateTo('ingredient-confirmation')} className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm">
              2. Skip to Confirmation
            </button>
            <button onClick={() => navigateTo('recipe-suggestions')} className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm">
              3. Skip to Recipes
            </button>
          </div>
        </div>}
      {/* Capture Button */}
      <div className="flex flex-col items-center px-6 mt-auto mb-6">
        <button onClick={handleCapture} className="w-20 h-20 bg-[#FF6B6B] rounded-full flex items-center justify-center mb-4 shadow-lg hover:bg-opacity-90 transition-transform active:scale-95">
          <div className="w-16 h-16 border-4 border-white rounded-full"></div>
        </button>
        <button className="flex items-center text-[#1A3A3A] font-medium hover:opacity-80 transition-opacity">
          <ImageIcon size={20} className="mr-2" />
          Upload from Gallery
        </button>
      </div>
      {/* Analysis Modal */}
      <IngredientAnalysisModal isOpen={showAnalysisModal} onClose={() => setShowAnalysisModal(false)} onComplete={handleAnalysisComplete} testMode={testMode} />
      {/* Add the animations to the global styles */}
      <style jsx global>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(calc(100% - 6px));
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes border-tl {
          0%,
          100% {
            border-color: rgba(255, 107, 107, 0.3);
          }
          25%,
          75% {
            border-color: rgba(255, 107, 107, 1);
          }
        }
        @keyframes border-tr {
          25%,
          100% {
            border-color: rgba(255, 107, 107, 0.3);
          }
          50%,
          75% {
            border-color: rgba(255, 107, 107, 1);
          }
        }
        @keyframes border-br {
          50%,
          100% {
            border-color: rgba(255, 107, 107, 0.3);
          }
          75% {
            border-color: rgba(255, 107, 107, 1);
          }
        }
        @keyframes border-bl {
          0%,
          75% {
            border-color: rgba(255, 107, 107, 0.3);
          }
          25% {
            border-color: rgba(255, 107, 107, 1);
          }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
        .animate-border-tl {
          animation: border-tl 4s ease-in-out infinite;
        }
        .animate-border-tr {
          animation: border-tr 4s ease-in-out infinite;
        }
        .animate-border-br {
          animation: border-br 4s ease-in-out infinite;
        }
        .animate-border-bl {
          animation: border-bl 4s ease-in-out infinite;
        }
      `}</style>
    </div>;
};