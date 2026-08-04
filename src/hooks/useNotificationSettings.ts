import { useCallback, useEffect, useState } from 'react';
import type { MealReminderKey, NotificationSettings } from '../types/notifications';

const STORAGE_KEY = 'cal-pal-notification-settings';

const defaultSettings: NotificationSettings = {
  pushEnabled: false,
  meals: [
  { key: 'breakfast', label: 'Breakfast', time: '08:00', enabled: true },
  { key: 'lunch', label: 'Lunch', time: '12:30', enabled: true },
  { key: 'dinner', label: 'Dinner', time: '18:30', enabled: true }],

  planTomorrow: true,
  weeklyProgress: false,
  lowPantry: false
};

/** Notification preferences, persisted locally so they survive navigation. */
export function useNotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaultSettings;
      const parsed = JSON.parse(stored) as Partial<NotificationSettings>;
      return {
        ...defaultSettings,
        ...parsed,
        meals: parsed.meals?.length ? parsed.meals : defaultSettings.meals
      };
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {

      // Persistence is a convenience here, never a requirement.
    }}, [settings]);

  const setPushEnabled = useCallback((pushEnabled: boolean) => {
    setSettings((current) => ({ ...current, pushEnabled }));
  }, []);

  const toggleMeal = useCallback((key: MealReminderKey) => {
    setSettings((current) => ({
      ...current,
      meals: current.meals.map((meal) =>
      meal.key === key ? { ...meal, enabled: !meal.enabled } : meal
      )
    }));
  }, []);

  const setMealTime = useCallback((key: MealReminderKey, time: string) => {
    setSettings((current) => ({
      ...current,
      meals: current.meals.map((meal) => meal.key === key ? { ...meal, time } : meal)
    }));
  }, []);

  const toggleExtra = useCallback((key: 'planTomorrow' | 'weeklyProgress' | 'lowPantry') => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  }, []);

  return { settings, setPushEnabled, toggleMeal, setMealTime, toggleExtra };
}

/** Formats "18:30" as "6:30 pm" for display. */
export function formatReminderTime(time: string): string {
  const [hourText, minuteText] = time.split(':');
  const hour = Number(hourText);
  const suffix = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minuteText} ${suffix}`;
}