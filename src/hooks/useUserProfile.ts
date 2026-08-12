import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'cal-pal-user-profile';

export interface UserProfile {
  name: string;
  email: string;
  /** Photo URL, or empty when the user has no picture yet. */
  avatar: string;
  plan: string;
}

const defaultProfile: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  plan: 'Premium',
  avatar:
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

/** The signed-in user's details, persisted locally so edits survive navigation. */
export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaultProfile;
      return { ...defaultProfile, ...(JSON.parse(stored) as Partial<UserProfile>) };
    } catch {
      return defaultProfile;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {

      // Persistence is a convenience here, never a requirement.
    }}, [profile]);

  const updateProfile = useCallback((changes: Partial<UserProfile>) => {
    setProfile((current) => ({ ...current, ...changes }));
  }, []);

  return { profile, updateProfile };
}

/** Initials fallback for when there is no photo, e.g. "John Doe" -> "JD". */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}