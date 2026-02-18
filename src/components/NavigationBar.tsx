import React, { useState } from 'react';
import {
  HomeIcon,
  CompassIcon,
  PlusIcon,
  BarChartIcon,
  SettingsIcon,
  CameraIcon,
  ImportIcon,
  XIcon } from
'lucide-react';
interface NavigationBarProps {
  currentScreen: string;
  navigateTo: (screen: string) => void;
  onShowImportGuide?: () => void;
}
export const NavigationBar: React.FC<NavigationBarProps> = ({
  currentScreen,
  navigateTo,
  onShowImportGuide
}) => {
  const [showPlusOptions, setShowPlusOptions] = useState(false);
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-gray-100 z-20">
        <div className="flex justify-around items-center py-4 px-6 relative">
          <button
            onClick={() => navigateTo('home')}
            className={`flex flex-col items-center p-2 ${currentScreen === 'home' ? 'text-[#4CAF50]' : 'text-[#757575]'}`}>

            <HomeIcon
              size={24}
              className="transition-transform hover:scale-110 duration-200" />

            <span className="text-xs mt-1 font-medium">Home</span>
          </button>
          <button
            onClick={() => navigateTo('recipe-discovery')}
            className={`flex flex-col items-center p-2 ${currentScreen === 'recipe-discovery' ? 'text-[#4CAF50]' : 'text-[#757575]'}`}>

            <CompassIcon
              size={24}
              className="transition-transform hover:scale-110 duration-200" />

            <span className="text-xs mt-1 font-medium">Discovery</span>
          </button>
          {/* Plus Button with Menu */}
          <div className="relative">
            <button
              onClick={() => setShowPlusOptions(!showPlusOptions)}
              className="w-14 h-14 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 -mt-5">

              {showPlusOptions ?
              <XIcon size={24} className="animate-spin-once" /> :

              <PlusIcon
                size={24}
                className="transition-transform hover:rotate-90 duration-300" />

              }
            </button>
            {/* Plus Options Menu */}
            {showPlusOptions &&
            <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-gray-100 w-64 overflow-hidden animate-scale-up">
                <button
                onClick={() => {
                  navigateTo('ingredient-capture');
                  setShowPlusOptions(false);
                }}
                className="w-full px-4 py-4 flex items-center text-left hover:bg-gray-50 border-b border-gray-100">

                  <div className="w-10 h-10 rounded-full bg-[#4CAF50] bg-opacity-10 flex items-center justify-center mr-3">
                    <CameraIcon size={18} className="text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      Capture new ingredients
                    </p>
                    <p className="text-xs text-[#757575]">
                      Scan food from your fridge
                    </p>
                  </div>
                </button>
                <button
                onClick={() => {
                  if (onShowImportGuide) {
                    onShowImportGuide();
                  }
                  setShowPlusOptions(false);
                }}
                className="w-full px-4 py-4 flex items-center text-left hover:bg-gray-50">

                  <div className="w-10 h-10 rounded-full bg-[#2196F3] bg-opacity-10 flex items-center justify-center mr-3">
                    <ImportIcon size={18} className="text-[#2196F3]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      Import from recipe sites
                    </p>
                    <p className="text-xs text-[#757575]">
                      Add recipes from websites
                    </p>
                  </div>
                </button>
              </div>
            }
          </div>
          <button
            onClick={() => navigateTo('progress')}
            className={`flex flex-col items-center p-2 ${currentScreen === 'progress' ? 'text-[#4CAF50]' : 'text-[#757575]'}`}>

            <BarChartIcon
              size={24}
              className="transition-transform hover:scale-110 duration-200" />

            <span className="text-xs mt-1 font-medium">Progress</span>
          </button>
          <button
            onClick={() => navigateTo('settings')}
            className={`flex flex-col items-center p-2 ${currentScreen === 'settings' ? 'text-[#4CAF50]' : 'text-[#757575]'}`}>

            <SettingsIcon
              size={24}
              className="transition-transform hover:scale-110 duration-200" />

            <span className="text-xs mt-1 font-medium">Settings</span>
          </button>
        </div>
      </nav>
      {/* Overlay when plus menu is open */}
      {showPlusOptions &&
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-10 animate-fade-in"
        onClick={() => setShowPlusOptions(false)} />

      }
    </>);

};