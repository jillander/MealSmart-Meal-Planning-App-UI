import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
interface RecipeLoadingScreenProps {
  navigateTo: (screen: string) => void;
}
export const RecipeLoadingScreen: React.FC<RecipeLoadingScreenProps> = ({
  navigateTo
}) => {
  const [percentage, setPercentage] = useState(0);
  const [statusStep, setStatusStep] = useState(0);
  const targetPercentage = 94; // The final match percentage to display
  const statusTexts = [
  'Analyzing flavor profiles...',
  'Balancing macronutrients...',
  'Curating perfect matches...',
  'Finalizing your recipe...'];

  useEffect(() => {
    // Smooth percentage counter
    const duration = 4500; // 4.5 seconds to fill
    const fps = 60;
    const totalFrames = duration / 1000 * fps;
    const increment = targetPercentage / totalFrames;
    let currentPercentage = 0;
    const counterInterval = setInterval(() => {
      currentPercentage += increment;
      if (currentPercentage >= targetPercentage) {
        setPercentage(targetPercentage);
        clearInterval(counterInterval);
      } else {
        // Use an ease-out calculation for smoother ending
        const progress = currentPercentage / targetPercentage;
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        setPercentage(Math.floor(easeOutProgress * targetPercentage));
      }
    }, 1000 / fps);
    // Status text cycler
    const textInterval = setInterval(() => {
      setStatusStep((prev) => prev < statusTexts.length - 1 ? prev + 1 : prev);
    }, 1200);
    // Auto-navigate after animation completes
    const navTimeout = setTimeout(() => {
      navigateTo('recipe-suggestions');
    }, 5500);
    return () => {
      clearInterval(counterInterval);
      clearInterval(textInterval);
      clearTimeout(navTimeout);
    };
  }, [navigateTo, targetPercentage]);
  return (
    <div className="flex flex-col min-h-screen bg-[#FCFBFA] relative overflow-hidden font-['Inter']">
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-12 pb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A45] animate-pulse"></div>
          <span className="text-sm font-semibold text-[#1A1A1A] tracking-wide">
            AI Matching
          </span>
        </div>
        <button
          onClick={() => navigateTo('ingredient-confirmation')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
          
          <XIcon size={20} className="text-[#1A1A1A]" />
        </button>
      </div>

      {/* Center 2.5D Liquid Bowl */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <div className="relative w-64 h-64 rounded-full bg-white shadow-[inset_0_4px_20px_rgba(0,0,0,0.03),_0_24px_50px_rgba(255,122,69,0.15)] overflow-hidden border border-gray-50 flex items-center justify-center">
          {/* Liquid Fill Container */}
          <div
            className="absolute bottom-0 left-0 right-0 w-full transition-all duration-75 ease-linear"
            style={{
              height: `${percentage}%`
            }}>
            
            {/* SVG Wave Effect */}
            <div className="absolute top-0 left-0 w-[200%] h-6 -mt-5 animate-wave opacity-80">
              <svg
                viewBox="0 0 800 50"
                className="w-full h-full"
                preserveAspectRatio="none">
                
                <path
                  d="M0,25 C100,50 200,0 300,25 C400,50 500,0 600,25 C700,50 800,0 800,25 L800,50 L0,50 Z"
                  fill="#FF8C61" />
                
              </svg>
            </div>
            <div
              className="absolute top-0 left-0 w-[200%] h-6 -mt-4 animate-wave"
              style={{
                animationDirection: 'reverse',
                animationDuration: '4s'
              }}>
              
              <svg
                viewBox="0 0 800 50"
                className="w-full h-full"
                preserveAspectRatio="none">
                
                <path
                  d="M0,25 C100,0 200,50 300,25 C400,0 500,50 600,25 C700,0 800,50 800,25 L800,50 L0,50 Z"
                  fill="#FF7A45" />
                
              </svg>
            </div>

            {/* Solid Liquid Body */}
            <div className="absolute top-2 bottom-0 left-0 right-0 bg-gradient-to-b from-[#FF7A45] to-[#E65C2B]"></div>
          </div>

          {/* Center Text Overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full mix-blend-exclusion">
            <span
              className="text-7xl font-extrabold tracking-tighter text-white drop-shadow-sm"
              style={{
                fontFamily: 'var(--font-heading)'
              }}>
              
              {percentage}
              <span className="text-4xl">%</span>
            </span>
            <span className="text-sm font-medium text-white/90 tracking-wide mt-1 uppercase">
              Match Found
            </span>
          </div>
        </div>

        {/* Dynamic Status Text */}
        <div className="h-12 mt-12 flex items-center justify-center">
          <p
            key={statusStep}
            className="text-lg font-medium text-[#64748B] animate-text-fade text-center px-8">
            
            {statusTexts[statusStep]}
          </p>
        </div>
      </div>

      {/* Bottom Premium Skeleton Section */}
      <div className="px-6 pb-12">
        <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100/50">
          {/* Skeleton Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#F3F4F6] animate-soft-pulse"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 w-1/3 bg-[#F3F4F6] rounded-full animate-soft-pulse"></div>
              <div
                className="h-3 w-1/4 bg-[#F3F4F6] rounded-full animate-soft-pulse"
                style={{
                  animationDelay: '0.2s'
                }}>
              </div>
            </div>
          </div>

          {/* Skeleton Body Lines */}
          <div className="space-y-3 mb-8">
            <div
              className="h-3 w-full bg-[#F3F4F6] rounded-full animate-soft-pulse"
              style={{
                animationDelay: '0.1s'
              }}>
            </div>
            <div
              className="h-3 w-11/12 bg-[#F3F4F6] rounded-full animate-soft-pulse"
              style={{
                animationDelay: '0.2s'
              }}>
            </div>
            <div
              className="h-3 w-4/5 bg-[#F3F4F6] rounded-full animate-soft-pulse"
              style={{
                animationDelay: '0.3s'
              }}>
            </div>
            <div
              className="h-3 w-2/3 bg-[#F3F4F6] rounded-full animate-soft-pulse"
              style={{
                animationDelay: '0.4s'
              }}>
            </div>
          </div>

          {/* Skeleton Footer / "Contributing Foods" area */}
          <div>
            <div className="h-4 w-1/2 bg-[#F3F4F6] rounded-full animate-soft-pulse mb-4"></div>
            <div className="flex space-x-3">
              <div
                className="h-16 w-16 rounded-2xl bg-[#F3F4F6] animate-soft-pulse"
                style={{
                  animationDelay: '0.5s'
                }}>
              </div>
              <div
                className="h-16 w-16 rounded-2xl bg-[#F3F4F6] animate-soft-pulse"
                style={{
                  animationDelay: '0.6s'
                }}>
              </div>
              <div
                className="h-16 w-16 rounded-2xl bg-[#F3F4F6] animate-soft-pulse"
                style={{
                  animationDelay: '0.7s'
                }}>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom gradient for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FCFBFA] to-transparent pointer-events-none"></div>
    </div>);

};