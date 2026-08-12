import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  UserIcon,
  CreditCardIcon,
  BellIcon,
  HelpCircleIcon,
  SmartphoneIcon,
  LogOutIcon,
  ChevronRightIcon,
  PencilIcon,
  HeartIcon,
  FileTextIcon,
  ShieldCheckIcon,
  Trash2Icon,
  TargetIcon,
  UtensilsIcon,
  ScaleIcon,
  RulerIcon,
  FlameIcon } from
'lucide-react';
import { AuthModal } from './AuthModal';
import { getInitials, useUserProfile } from '../hooks/useUserProfile';
interface SettingsScreenProps {
  navigateTo: (screen: string) => void;
}
const ProviderGlyph = ({
  provider


}: {provider: 'google' | 'facebook' | 'apple';}) => {
  if (provider === 'google') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        
      </svg>);

  }
  if (provider === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="#1877F2"
          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        
      </svg>);

  }
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="#1A1A1A"
      aria-hidden="true">
      
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.84 1.5.05 2.78.72 3.53 1.84-3.03 1.77-2.54 5.82.35 7.04-.68 1.69-1.52 3.23-2.46 4.13zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>);

};
export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigateTo
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState<
    Record<'google' | 'facebook' | 'apple', boolean>>(
    {
      google: true,
      facebook: false,
      apple: false
    });
  const toggleConnectedAccount = (
  provider: 'google' | 'facebook' | 'apple') =>
  {
    setConnectedAccounts((prev) => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };
  const { profile: user } = useUserProfile();
  const [appleHealthConnected, setAppleHealthConnected] = useState(true);
  const [dietPreferences, setDietPreferences] = useState<string[]>([
  'High Protein',
  'Low Carb']
  );
  const allDietPreferences = [
  'Vegetarian',
  'Vegan',
  'Gluten Free',
  'Dairy Free',
  'Keto',
  'Low Carb',
  'High Protein',
  'Mediterranean'];

  const toggleDietPreference = (pref: string) => {
    if (dietPreferences.includes(pref)) {
      setDietPreferences(dietPreferences.filter((p) => p !== pref));
    } else {
      setDietPreferences([...dietPreferences, pref]);
    }
  };
  const SectionHeader = ({ title }: {title: string;}) =>
  <h3 className="px-5 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
      {title}
    </h3>;

  const SettingRow = ({
    icon: Icon,
    iconColor,
    label,
    value,
    showChevron = true,
    showToggle = false,
    toggleValue = false,
    onToggle,
    isDestructive = false,
    isLast = false,
    onClick












  }: {icon: any;iconColor: string;label: string;value?: string;showChevron?: boolean;showToggle?: boolean;toggleValue?: boolean;onToggle?: () => void;isDestructive?: boolean;isLast?: boolean;onClick?: () => void;}) =>
  <div
    className={`px-4 py-3.5 flex items-center hover:bg-gray-50 transition-colors cursor-pointer ${!isLast ? 'border-b border-gray-100' : ''}`}
    onClick={onClick}>
    
      <div
      className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 ${iconColor}`}>
      
        <Icon size={18} className="text-current" />
      </div>
      <div className="flex-1">
        <p
        className={`font-medium text-sm ${isDestructive ? 'text-red-500' : 'text-[#1A1A1A]'}`}>
        
          {label}
        </p>
      </div>
      <div className="flex items-center">
        {value &&
      <span className="text-sm font-medium text-gray-500 mr-2">
            {value}
          </span>
      }
        {showToggle &&
      <div
        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${toggleValue ? 'bg-[#4CAF50]' : 'bg-gray-200'}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle && onToggle();
        }}>
        
            <div
          className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${toggleValue ? 'translate-x-5' : 'translate-x-0'}`} />
        
          </div>
      }
        {showChevron && !showToggle &&
      <ChevronRightIcon size={18} className="text-gray-400" />
      }
        {value && !showChevron && !showToggle &&
      <PencilIcon size={14} className="text-gray-300 ml-2" />
      }
      </div>
    </div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] max-w-[430px] mx-auto pb-24">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 bg-white text-[#1A1A1A] border-b border-gray-100">
        <span className="text-sm font-medium">9:41 AM</span>
        <div className="flex items-center space-x-3">
          <span className="text-sm">5G</span>
          <span className="text-sm">100%</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white px-6 py-4 mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigateTo('home')}
            className="mr-3 p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
            
            <ArrowLeftIcon size={20} className="text-gray-900" />
          </button>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Settings</h1>
        </div>
      </header>

      <div className="space-y-6 px-5">
        {/* Profile Section */}
        {isLoggedIn ?
        <button
          type="button"
          onClick={() => navigateTo('profile')}
          className="bg-white rounded-2xl p-4 flex w-full items-center text-left shadow-sm hover:bg-gray-50 transition-colors">
          
            {user.avatar ?
          <img
            src={user.avatar}
            alt=""
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" /> :


          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EDF8EF] text-base font-extrabold text-[#2F7D34]">
                {getInitials(user.name)}
              </span>
          }
            <div className="ml-4 min-w-0 flex-1">
              <div className="flex items-center">
                <h2 className="font-bold text-[#1A1A1A]">{user.name}</h2>
                <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wide">
                  {user.plan}
                </span>
              </div>
              <p className="truncate text-sm text-gray-500">{user.email}</p>
            </div>
            <ChevronRightIcon size={20} className="shrink-0 text-gray-400" />
          </button> :

        <div
          className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100"
          onClick={() => setShowAuthModal(true)}>
          
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400">
              <UserIcon size={32} />
            </div>
            <h2 className="font-bold text-[#1A1A1A] text-lg mb-1">
              Sign in to Cal Pal
            </h2>
            <p className="text-sm text-gray-500 mb-4 px-4">
              Sync your meal plans, recipes, and progress across all your
              devices.
            </p>
            <button
            className="w-full bg-[#1A1A1A] text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setShowAuthModal(true);
            }}>
            
              Sign In / Create Account
            </button>
          </div>
        }

        {/* Goals & Body Section */}
        <div>
          <SectionHeader title="Goals & Body" />
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <SettingRow
              icon={ScaleIcon}
              iconColor="bg-blue-50 text-blue-600"
              label="Current Weight"
              value="72 kg"
              showChevron={false} />
            
            <SettingRow
              icon={TargetIcon}
              iconColor="bg-green-50 text-green-600"
              label="Goal Weight"
              value="68 kg"
              showChevron={false} />
            
            <SettingRow
              icon={RulerIcon}
              iconColor="bg-purple-50 text-purple-600"
              label="Height"
              value="178 cm"
              showChevron={false} />
            
            <SettingRow
              icon={FlameIcon}
              iconColor="bg-orange-50 text-orange-600"
              label="Daily Calorie Goal"
              value="1800 cal"
              showChevron={false}
              isLast={true} />
            
          </div>
        </div>

        {/* Nutrition & Diet Section */}
        <div>
          <SectionHeader title="Nutrition & Diet" />
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-3">
            <SettingRow
              icon={UtensilsIcon}
              iconColor="bg-emerald-50 text-emerald-600"
              label="Macro Targets"
              value="120g P / 250g C / 65g F" />
            
            <SettingRow
              icon={HeartIcon}
              iconColor="bg-rose-50 text-rose-600"
              label="Diet Preferences"
              value={`${dietPreferences.length} selected`}
              isLast={true} />
            
          </div>

          {/* Diet Tags */}
          <div className="flex flex-wrap gap-2 px-1">
            {allDietPreferences.map((pref) => {
              const isActive = dietPreferences.includes(pref);
              return (
                <button
                  key={pref}
                  onClick={() => toggleDietPreference(pref)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${isActive ? 'bg-[#4CAF50] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'}`}>
                  
                  {pref}
                </button>);

            })}
          </div>
        </div>

        {/* Health Integrations */}
        <div>
          <SectionHeader title="Integrations" />
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <SettingRow
              icon={HeartIcon}
              iconColor="bg-red-50 text-red-500"
              label="Apple Health"
              value={appleHealthConnected ? 'Connected' : 'Not Connected'}
              showChevron={false}
              showToggle={true}
              toggleValue={appleHealthConnected}
              onToggle={() => setAppleHealthConnected(!appleHealthConnected)}
              isLast={true} />
            
          </div>
        </div>

        {/* Connected Accounts Section */}
        {isLoggedIn &&
        <div>
            <SectionHeader title="Connected Accounts" />
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {[
            {
              id: 'google' as const,
              label: 'Google'
            },
            {
              id: 'facebook' as const,
              label: 'Facebook'
            },
            {
              id: 'apple' as const,
              label: 'Apple'
            }].
            map((provider, index, arr) => {
              const isConnected = connectedAccounts[provider.id];
              return (
                <div
                  key={provider.id}
                  className={`px-4 py-3.5 flex items-center ${index !== arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  
                    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3 bg-gray-50">
                      <ProviderGlyph provider={provider.id} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-[#1A1A1A]">
                        {provider.label}
                      </p>
                      <p className="text-xs text-gray-400">
                        {isConnected ? 'Connected' : 'Not connected'}
                      </p>
                    </div>
                    <button
                    onClick={() => toggleConnectedAccount(provider.id)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${isConnected ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-[#4CAF50] text-white hover:bg-[#43A047]'}`}>
                    
                      {isConnected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>);

            })}
            </div>
          </div>
        }

        {/* Account Section */}
        <div>
          <SectionHeader title="Account" />
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <SettingRow
              icon={CreditCardIcon}
              iconColor="bg-indigo-50 text-indigo-600"
              label="Subscription"
              value="Manage"
              onClick={() => navigateTo('subscription')} />
            
            <SettingRow
              icon={BellIcon}
              iconColor="bg-yellow-50 text-yellow-600"
              label="Notifications"
              value="Manage"
              onClick={() => navigateTo('notifications')} />
            
            <SettingRow
              icon={HelpCircleIcon}
              iconColor="bg-cyan-50 text-cyan-600"
              label="Help & Support" />
            
            <SettingRow
              icon={SmartphoneIcon}
              iconColor="bg-emerald-50 text-emerald-600"
              label="Brand & store assets"
              value="View"
              onClick={() => navigateTo('app-store')}
              isLast={true} />
            
          </div>
        </div>

        {/* Legal Section */}
        <div>
          <SectionHeader title="Legal" />
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <SettingRow
              icon={FileTextIcon}
              iconColor="bg-gray-100 text-gray-600"
              label="Terms and Conditions" />
            
            <SettingRow
              icon={ShieldCheckIcon}
              iconColor="bg-gray-100 text-gray-600"
              label="Privacy Policy"
              isLast={true} />
            
          </div>
        </div>

        {/* Account Actions */}
        {isLoggedIn &&
        <div>
            <SectionHeader title="Actions" />
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div
              className="px-4 py-3.5 flex items-center hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100"
              onClick={() => setIsLoggedIn(false)}>
              
                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3 bg-amber-50 text-amber-600">
                  <LogOutIcon size={18} className="text-current" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-amber-600">Log Out</p>
                </div>
                <ChevronRightIcon size={18} className="text-gray-400" />
              </div>

              <div
              className="px-4 py-3.5 flex items-center hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => {
                setIsLoggedIn(false);
                console.log('Delete Account');
              }}>
              
                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3 bg-red-50 text-red-500">
                  <Trash2Icon size={18} className="text-current" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-red-500">
                    Delete Account
                  </p>
                </div>
                <ChevronRightIcon size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
        }
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          setIsLoggedIn(true);
        }} />
      
    </div>);

};