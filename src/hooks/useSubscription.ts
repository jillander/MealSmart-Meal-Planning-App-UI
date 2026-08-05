import { useCallback, useEffect, useState } from 'react';
import type { PlanId } from '../data/subscriptionPlans';
import { getPlan } from '../data/subscriptionPlans';

export interface SubscriptionState {
  status: 'active' | 'none';
  planId: PlanId;
  /** ISO date the current term renews (or ends, when cancelled). */
  renewsOn: string;
  /** True once the user cancels — access continues until `renewsOn`. */
  cancelAtPeriodEnd: boolean;
}

const STORAGE_KEY = 'calpal.subscription';

function addMonths(from: Date, months: number): string {
  const next = new Date(from);
  next.setMonth(next.getMonth() + months);
  return next.toISOString();
}

function defaultState(active: boolean): SubscriptionState {
  return {
    status: active ? 'active' : 'none',
    planId: 'annual',
    renewsOn: addMonths(new Date(), 12),
    cancelAtPeriodEnd: false
  };
}

/** Membership state, persisted locally so the screen survives navigation. */
export function useSubscription(initialActive = false) {
  const [state, setState] = useState<SubscriptionState>(() => {
    // A seeded active membership is a preview, so it ignores stored state.
    if (initialActive || typeof window === 'undefined') return defaultState(initialActive);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored) as SubscriptionState;
    } catch {

      // Ignore unreadable storage and fall back to the default.
    }return defaultState(initialActive);
  });

  useEffect(() => {
    if (initialActive) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {

      // Storage is optional — the prototype still works without it.
    }}, [state, initialActive]);

  const subscribe = useCallback((planId: PlanId) => {
    setState({
      status: 'active',
      planId,
      renewsOn: addMonths(new Date(), getPlan(planId).termMonths),
      cancelAtPeriodEnd: false
    });
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

  return { subscription: state, subscribe, changePlan, cancel, resume };
}

export function formatRenewalDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}