export type MealReminderKey = 'breakfast' | 'lunch' | 'dinner';

export interface MealReminder {
  key: MealReminderKey;
  label: string;
  /** 24h "HH:MM", so it works directly with a time input. */
  time: string;
  enabled: boolean;
}

export interface NotificationSettings {
  /** Master switch — when off, nothing is sent. */
  pushEnabled: boolean;
  meals: MealReminder[];
  planTomorrow: boolean;
  weeklyProgress: boolean;
  lowPantry: boolean;
}