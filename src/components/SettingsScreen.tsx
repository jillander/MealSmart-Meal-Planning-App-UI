import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  UserIcon,
  CreditCardIcon,
  BellIcon,
  HelpCircleIcon,
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
        <div className="bg-white rounded-2xl p-4 flex items-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />

          <div className="ml-4 flex-1">
            <div className="flex items-center">
              <h2 className="font-bold text-[#1A1A1A]">{user.name}</h2>
              <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wide">
                {user.plan}
              </span>
            </div>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <ChevronRightIcon size={20} className="text-gray-400" />
        </div>

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

        {/* Account Section */}
        <div>
          <SectionHeader title="Account" />
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <SettingRow
              icon={CreditCardIcon}
              iconColor="bg-indigo-50 text-indigo-600"
              label="Subscription"
              value="Manage" />

            <SettingRow
              icon={BellIcon}
              iconColor="bg-yellow-50 text-yellow-600"
              label="Notifications" />

            <SettingRow
              icon={HelpCircleIcon}
              iconColor="bg-cyan-50 text-cyan-600"
              label="Help & Support"
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
        <div>
          <SectionHeader title="Actions" />
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div
              className="px-4 py-3.5 flex items-center hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100"
              onClick={() => console.log('Logout')}>

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
              onClick={() => console.log('Delete Account')}>

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
      </div>
    </div>);

};