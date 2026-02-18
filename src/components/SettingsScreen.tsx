import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  UserIcon,
  CreditCardIcon,
  BellIcon,
  HelpCircleIcon,
  LogOutIcon,
  ChevronRightIcon } from
'lucide-react';
interface SettingsScreenProps {
  navigateTo: (screen: string) => void;
}
export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigateTo
}) => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'Premium',
    avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] max-w-[430px] mx-auto">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-white text-[#1A1A1A] border-b border-gray-100">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>
      {/* Header */}
      <header className="bg-white px-6 py-4">
        <h1 className="text-xl font-bold text-[#1A1A1A]">Settings</h1>
      </header>
      {/* Profile Section */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-xl p-4 flex items-center mb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover" />

          <div className="ml-4">
            <h2 className="font-medium text-[#1A1A1A]">{user.name}</h2>
            <p className="text-sm text-[#757575]">{user.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-[#4CAF50] bg-opacity-10 text-[#4CAF50] rounded text-xs font-medium">
              {user.plan}
            </span>
          </div>
          <ChevronRightIcon size={20} className="ml-auto text-gray-400" />
        </div>
      </div>
      {/* Settings Sections */}
      <div className="px-6 flex-1">
        <div className="space-y-4">
          {/* Subscription Section */}
          <div className="bg-white rounded-xl overflow-hidden">
            <button className="w-full px-4 py-3 flex items-center hover:bg-gray-50">
              <div className="w-8 h-8 rounded-full bg-[#4CAF50] bg-opacity-10 flex items-center justify-center mr-3">
                <CreditCardIcon size={18} className="text-[#4CAF50]" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-[#1A1A1A]">Subscription</p>
                <p className="text-xs text-[#757575]">
                  Premium Plan • $9.99/month
                </p>
              </div>
              <ChevronRightIcon size={20} className="text-gray-400" />
            </button>
          </div>
          {/* Notifications Section */}
          <div className="bg-white rounded-xl overflow-hidden">
            <button className="w-full px-4 py-3 flex items-center hover:bg-gray-50">
              <div className="w-8 h-8 rounded-full bg-[#2196F3] bg-opacity-10 flex items-center justify-center mr-3">
                <BellIcon size={18} className="text-[#2196F3]" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-[#1A1A1A]">Notifications</p>
                <p className="text-xs text-[#757575]">Manage your alerts</p>
              </div>
              <ChevronRightIcon size={20} className="text-gray-400" />
            </button>
          </div>
          {/* Help Section */}
          <div className="bg-white rounded-xl overflow-hidden">
            <button className="w-full px-4 py-3 flex items-center hover:bg-gray-50">
              <div className="w-8 h-8 rounded-full bg-[#FF9800] bg-opacity-10 flex items-center justify-center mr-3">
                <HelpCircleIcon size={18} className="text-[#FF9800]" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-[#1A1A1A]">Help & Support</p>
                <p className="text-xs text-[#757575]">FAQs and contact</p>
              </div>
              <ChevronRightIcon size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      {/* Logout Button */}
      <div className="px-6 py-6">
        <button className="w-full px-4 py-3 flex items-center justify-center text-[#F44336] bg-[#F44336] bg-opacity-10 rounded-xl hover:bg-opacity-20 transition-colors">
          <LogOutIcon size={18} className="mr-2" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>);

};