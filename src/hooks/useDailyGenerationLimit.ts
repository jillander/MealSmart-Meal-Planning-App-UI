import { useCallback, useEffect, useState } from 'react';

/** Successful fridge / receipt → recipe generations allowed per calendar day. */
export const DAILY_GENERATION_LIMIT = 3;

const STORAGE_KEY = 'cal-pal-daily-generations';

interface StoredCount {
  date: string;
  count: number;
}

function todayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function readCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const stored = JSON.parse(raw) as StoredCount;
    // A new day resets the allowance automatically.
    return stored.date === todayKey() ? stored.count : 0;
  } catch {
    return 0;
  }
}

function writeCount(count: number) {
  if (typeof window === 'undefined') return;
  const value: StoredCount = { date: todayKey(), count };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

/**
 * Tracks successful recipe generations for today. Only runs that actually
 * returned recipes count — an empty match never uses up an attempt.
 */
export function useDailyGenerationLimit() {
  const [used, setUsed] = useState(readCount);

  // Re-read on focus so crossing midnight with the app open resets the count.
  useEffect(() => {
    const sync = () => setUsed(readCount());
    window.addEventListener('focus', sync);
    return () => window.removeEventListener('focus', sync);
  }, []);

  const recordSuccess = useCallback(() => {
    const next = readCount() + 1;
    writeCount(next);
    setUsed(next);
  }, []);

  const isLimitReached = useCallback(() => readCount() >= DAILY_GENERATION_LIMIT, []);

  return {
    used: Math.min(used, DAILY_GENERATION_LIMIT),
    limit: DAILY_GENERATION_LIMIT,
    recordSuccess,
    isLimitReached
  };
}

/** Time until local midnight, when the allowance resets. */
export function timeUntilReset(now: Date = new Date()): {hours: number;minutes: number;} {
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const totalMinutes = Math.max(0, Math.ceil((midnight.getTime() - now.getTime()) / 60000));
  return { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 };
}