import React from 'react';
import {
  ArrowLeftIcon,
  BellIcon,
  BellOffIcon,
  CalendarCheckIcon,
  CoffeeIcon,
  MoonIcon,
  ShoppingBasketIcon,
  SunIcon,
  TrendingUpIcon } from
'lucide-react';
import { formatReminderTime, useNotificationSettings } from '../hooks/useNotificationSettings';
import { haptic } from '../lib/haptics';
import type { MealReminderKey } from '../types/notifications';

interface NotificationsScreenProps {
  navigateTo: (screen: string) => void;
}

const mealIcons: Record<MealReminderKey, React.ElementType> = {
  breakfast: CoffeeIcon,
  lunch: SunIcon,
  dinner: MoonIcon
};

const mealHints: Record<MealReminderKey, string> = {
  breakfast: 'A nudge to start the day on plan',
  lunch: 'Log or plan your midday meal',
  dinner: 'Check in before you cook'
};

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ navigateTo }) => {
  const { settings, setPushEnabled, toggleMeal, setMealTime, toggleExtra } = useNotificationSettings();
  const { pushEnabled, meals } = settings;
  const activeMeals = meals.filter((meal) => meal.enabled);

  const handlePushToggle = () => {
    haptic('selection');
    setPushEnabled(!pushEnabled);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] pb-10">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-6 pb-4 pt-12 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            aria-label="Back to Today"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A1A1A] transition-colors hover:bg-[#E5E7EB]">
            
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-lg font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-heading)' }}>
            Notifications
          </h1>
        </div>
      </header>

      <div className="px-6 pt-6">
        <h2 className="text-[26px] font-bold leading-[1.15] tracking-tight text-[#1A1A1A]" style={{ fontFamily: 'var(--font-heading)' }}>
          Gentle nudges, on your schedule
        </h2>
        <p className="mt-2.5 text-[15px] leading-relaxed text-[#64748B]">
          Set reminders around the meals that matter, so staying on plan never depends on memory.
        </p>
      </div>

      {/* Master switch */}
      <div className="px-6 pt-6">
        <div className={`rounded-2xl p-4 shadow-sm transition-colors ${pushEnabled ? 'bg-[#1A1A1A]' : 'bg-white ring-1 ring-gray-100'}`}>
          <div className="flex items-center gap-3">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${pushEnabled ? 'bg-[#4CAF50] text-white' : 'bg-[#F3F4F6] text-[#94A3B8]'}`}>
              {pushEnabled ? <BellIcon size={20} /> : <BellOffIcon size={20} />}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-bold ${pushEnabled ? 'text-white' : 'text-[#1A1A1A]'}`}>
                {pushEnabled ? 'Notifications are on' : 'Turn on notifications'}
              </p>
              <p className={`mt-0.5 text-xs leading-relaxed ${pushEnabled ? 'text-white/70' : 'text-[#64748B]'}`}>
                {pushEnabled ?
                `${activeMeals.length} meal ${activeMeals.length === 1 ? 'reminder' : 'reminders'} scheduled` :
                'Required for any reminder below to reach you'}
              </p>
            </div>
            <Switch checked={pushEnabled} onChange={handlePushToggle} label="Enable notifications" onDark={pushEnabled} />
          </div>
        </div>
      </div>

      {/* Meal reminders */}
      <section className="px-6 pt-7">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#64748B]">Meal reminders</h3>
        <div className={`space-y-2 transition-opacity ${pushEnabled ? 'opacity-100' : 'opacity-55'}`}>
          {meals.map((meal) => {
            const Icon = mealIcons[meal.key];
            const isActive = pushEnabled && meal.enabled;
            return (
              <div
                key={meal.key}
                className={`rounded-2xl border bg-white p-4 shadow-sm transition-colors ${isActive ? 'border-[#B7DDBB]' : 'border-gray-100'}`}>
                
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${isActive ? 'bg-[#E8F5E9] text-[#4CAF50]' : 'bg-[#F3F4F6] text-[#94A3B8]'}`}>
                    <Icon size={19} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#1A1A1A]">{meal.label}</p>
                    <p className="mt-0.5 truncate text-xs text-[#64748B]">
                      {isActive ? `Reminding you at ${formatReminderTime(meal.time)}` : mealHints[meal.key]}
                    </p>
                  </div>
                  <Switch
                    checked={meal.enabled}
                    disabled={!pushEnabled}
                    onChange={() => {
                      haptic('light');
                      toggleMeal(meal.key);
                    }}
                    label={`${meal.label} reminder`} />
                  
                </div>

                {meal.enabled &&
                <label className="mt-3.5 flex items-center justify-between gap-3 rounded-xl bg-[#F8F9FA] px-3.5 py-3">
                    <span className="text-xs font-semibold text-[#64748B]">Remind me to track at</span>
                    <input
                    type="time"
                    value={meal.time}
                    disabled={!pushEnabled}
                    onChange={(event) => setMealTime(meal.key, event.target.value)}
                    aria-label={`${meal.label} reminder time`}
                    className="rounded-lg border border-[#E1E6E3] bg-white px-2.5 py-1.5 text-sm font-bold text-[#1A1A1A] outline-none transition-colors focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/15 disabled:text-[#94A3B8]" />
                  
                  </label>
                }
              </div>);

          })}
        </div>
      </section>

      {/* Other reminders */}
      <section className="px-6 pt-7">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#64748B]">Keep me on track</h3>
        <div className={`overflow-hidden rounded-2xl bg-white shadow-sm transition-opacity ${pushEnabled ? 'opacity-100' : 'opacity-55'}`}>
          <ExtraRow
            icon={CalendarCheckIcon}
            iconClass="bg-[#E8F5E9] text-[#4CAF50]"
            label="Plan tomorrow’s meals"
            description="An evening prompt to set up the next day"
            checked={settings.planTomorrow}
            disabled={!pushEnabled}
            onChange={() => toggleExtra('planTomorrow')} />
          
          <ExtraRow
            icon={TrendingUpIcon}
            iconClass="bg-indigo-50 text-indigo-600"
            label="Weekly progress recap"
            description="Your streak and averages every Sunday"
            checked={settings.weeklyProgress}
            disabled={!pushEnabled}
            onChange={() => toggleExtra('weeklyProgress')} />
          
          <ExtraRow
            icon={ShoppingBasketIcon}
            iconClass="bg-amber-50 text-amber-600"
            label="Missing ingredients"
            description="When a planned recipe needs a shop"
            checked={settings.lowPantry}
            disabled={!pushEnabled}
            onChange={() => toggleExtra('lowPantry')}
            isLast />
          
        </div>
      </section>

      {!pushEnabled &&
      <div className="px-6 pt-6">
          <button
          type="button"
          onClick={handlePushToggle}
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-all hover:bg-[#2A2A2A] active:translate-y-0.5 active:shadow-[0_2px_0_#080808]">
          
            <BellIcon size={18} className="mr-2" /> Turn on notifications
          </button>
        </div>
      }

      <p className="px-6 pt-6 text-center text-xs leading-relaxed text-[#94A3B8]">
        You can change these any time. We only send what you’ve asked for.
      </p>
    </div>);

};

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  disabled?: boolean;
  onDark?: boolean;
}

function Switch({ checked, onChange, label, disabled = false, onDark = false }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed ${
      checked ? 'bg-[#4CAF50]' : onDark ? 'bg-white/25' : 'bg-[#E1E6E3]'} ${
      disabled ? 'opacity-60' : ''}`}>
      
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-[left] duration-200 ease-out ${checked ? 'left-6' : 'left-1'}`} />
      
    </button>);

}

interface ExtraRowProps {
  icon: React.ElementType;
  iconClass: string;
  label: string;
  description: string;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
  isLast?: boolean;
}

function ExtraRow({ icon: Icon, iconClass, label, description, checked, disabled, onChange, isLast = false }: ExtraRowProps) {
  return (
    <div className={`flex items-center gap-3 p-4 ${isLast ? '' : 'border-b border-gray-100'}`}>
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
        <Icon size={19} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#1A1A1A]">{label}</p>
        <p className="mt-0.5 truncate text-xs text-[#64748B]">{description}</p>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onChange={() => {
          haptic('light');
          onChange();
        }}
        label={label} />
      
    </div>);

}