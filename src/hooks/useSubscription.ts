import { useCallback, useEffect, useState } from 'react';
import type { PlanId } from '../data/subscriptionPlans';
import { getPlan } from '../data/subscriptionPlans';

/** Length of the free trial every paid plan starts with. */
export const TRIAL_DAYS = 3;

export interface SubscriptionState {
  /**
   * `trialing` — inside the free trial, full access, nothing charged yet.
   * `expired` — the trial ran out and no payment was taken, so access is locked.
   */
  status: 'active' | 'trialing' | 'expired' | 'none';
  planId: PlanId;
  /** ISO date the current term renews (or ends, when cancelled). */
  renewsOn: string;
  /** ISO date the free trial finishes. Only meaningful while trialing. */
  trialEndsOn: string;
  /** True once the user cancels — access continues until `renewsOn`. */
  cancelAtPeriodEnd: boolean;
  /** ISO date billing restarts, when the member paused instead of cancelling. */
  pausedUntil: string | null;
}

const STORAGE_KEY = 'calpal.subscription';

function addMonths(from: Date, months: number): string {
  const next = new Date(from);
  next.setMonth(next.getMonth() + months);
  return next.toISOString();
}

function addDays(from: Date, days: number): string {
  const next = new Date(from);
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

type Seed = 'none' | 'active' | 'trialExpired';

function defaultState(seed: Seed): SubscriptionState {
  const now = new Date();
  if (seed === 'trialExpired') {
    return {
      status: 'expired',
      planId: 'annual',
      renewsOn: addMonths(now, 12),
      // The trial finished today, which is why the block just appeared.
      trialEndsOn: now.toISOString(),
      cancelAtPeriodEnd: false,
      pausedUntil: null
    };
  }
  return {
    status: seed === 'active' ? 'active' : 'none',
    planId: 'annual',
    renewsOn: addMonths(now, 12),
    trialEndsOn: addDays(now, TRIAL_DAYS),
    cancelAtPeriodEnd: false,
    pausedUntil: null
  };
}

/**
 * Membership state, persisted locally so the screen survives navigation.
 * `seed` forces a preview state and bypasses storage.
 */
export function useSubscription(seed: Seed = 'none') {
  const [state, setState] = useState<SubscriptionState>(() => {
    if (seed !== 'none' || typeof window === 'undefined') return defaultState(seed);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<SubscriptionState>;
        return { ...defaultState('none'), ...parsed } as SubscriptionState;
      }
    } catch {

      // Ignore unreadable storage and fall back to the default.
    }return defaultState('none');
  });

  useEffect(() => {
    if (seed !== 'none') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {

      // Storage is optional — the prototype still works without it.
    }}, [state, seed]);

  /** Picking a plan starts the free trial; billing begins when it ends. */
  const startTrial = useCallback((planId: PlanId) => {
    const now = new Date();
    setState({
      status: 'trialing',
      planId,
      renewsOn: addDays(now, TRIAL_DAYS),
      trialEndsOn: addDays(now, TRIAL_DAYS),
      cancelAtPeriodEnd: false,
      pausedUntil: null
    });
  }, []);

  const subscribe = useCallback((planId: PlanId) => {
    setState({
      status: 'active',
      planId,
      renewsOn: addMonths(new Date(), getPlan(planId).termMonths),
      trialEndsOn: new Date().toISOString(),
      cancelAtPeriodEnd: false,
      pausedUntil: null
    });
  }, []);

  /** Pausing keeps the membership but stops billing for a few months. */
  const pause = useCallback((months: number) => {
    setState((current) => ({
      ...current,
      cancelAtPeriodEnd: false,
      pausedUntil: addMonths(new Date(), months),
      renewsOn: addMonths(new Date(), months)
    }));
  }, []);

  const unpause = useCallback(() => {
    setState((current) => ({ ...current, pausedUntil: null }));
  }, []);

  const changePlan = useCallback((planId: PlanId) => {
    setState((current) => ({
      ...current,
      planId,
      renewsOn: addMonths(new Date(), getPlan(planId).termMonths),
      cancelAtPeriodEnd: false
    }));
  }, []);

  const cancel = useCallback(() => {
    setState((current) => ({ ...current, cancelAtPeriodEnd: true }));
  }, []);

  const resume = useCallback(() => {
    setState((current) => ({ ...current, cancelAtPeriodEnd: false }));
  }, []);

  /** Trial ran out without payment — access is locked until they choose. */
  const expireTrial = useCallback(() => {
    setState((current) => ({ ...current, status: 'expired' }));
  }, []);

  /** They walked away at the end of the trial, so there is no subscription. */
  const declineAfterTrial = useCallback(() => {
    setState((current) => ({ ...current, status: 'none' }));
  }, []);

  return {
    subscription: state,
    startTrial,
    subscribe,
    changePlan,
    cancel,
    resume,
    pause,
    unpause,
    expireTrial,
    declineAfterTrial
  };
}

export function formatRenewalDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}