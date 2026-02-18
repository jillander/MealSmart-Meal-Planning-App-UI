import React from 'react';
import {
  XIcon,
  LinkIcon,
  CameraIcon,
  ArrowRightIcon,
  ClipboardIcon } from
'lucide-react';
interface RecipeImportGuideProps {
  onClose: () => void;
  onImport: () => void;
}
export const RecipeImportGuide: React.FC<RecipeImportGuideProps> = ({
  onClose,
  onImport
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#1A1A1A]">Import a Recipe</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">

            <XIcon size={20} />
          </button>
        </div>
        <p className="text-[#757575] mb-6">
          Choose how you want to import your recipe. We'll help you convert it
          into a meal-ready format.
        </p>
        <div className="space-y-4 mb-6">
          <button className="w-full p-4 bg-white rounded-xl border border-gray-200 flex items-center hover:border-[#4CAF50] transition-all duration-200">
            <div className="w-10 h-10 rounded-full bg-[#4CAF50] bg-opacity-10 flex items-center justify-center mr-4">
              <LinkIcon size={20} className="text-[#4CAF50]" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-[#1A1A1A]">Paste URL</h3>
              <p className="text-xs text-[#757575]">
                Import from a recipe website
              </p>
            </div>
            <ArrowRightIcon size={18} className="text-gray-400" />
          </button>
          <button className="w-full p-4 bg-white rounded-xl border border-gray-200 flex items-center hover:border-[#4CAF50] transition-all duration-200">
            <div className="w-10 h-10 rounded-full bg-[#2196F3] bg-opacity-10 flex items-center justify-center mr-4">
              <CameraIcon size={20} className="text-[#2196F3]" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-[#1A1A1A]">Scan Recipe</h3>
              <p className="text-xs text-[#757575]">
                Take a photo of a printed recipe
              </p>
            </div>
            <ArrowRightIcon size={18} className="text-gray-400" />
          </button>
          <button className="w-full p-4 bg-white rounded-xl border border-gray-200 flex items-center hover:border-[#4CAF50] transition-all duration-200">
            <div className="w-10 h-10 rounded-full bg-[#FF9800] bg-opacity-10 flex items-center justify-center mr-4">
              <ClipboardIcon size={20} className="text-[#FF9800]" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-[#1A1A1A]">Paste Text</h3>
              <p className="text-xs text-[#757575]">
                Copy and paste recipe text
              </p>
            </div>
            <ArrowRightIcon size={18} className="text-gray-400" />
          </button>
        </div>
        <div className="bg-[#F8F9FA] rounded-xl p-4 mb-6">
          <h4 className="font-medium text-sm text-[#1A1A1A] mb-2">
            Supported Recipe Sites
          </h4>
          <p className="text-xs text-[#757575]">
            AllRecipes, Food Network, Epicurious, Tasty, NYT Cooking, and many
            more!
          </p>
        </div>
        <button
          onClick={onImport}
          className="w-full py-3 bg-[#4CAF50] text-white rounded-full font-medium">

          Continue
        </button>
      </div>
    </div>);

};