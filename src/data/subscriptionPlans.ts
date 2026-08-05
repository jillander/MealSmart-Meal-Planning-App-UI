export type PlanId = 'annual' | 'quarterly' | 'monthly';

export interface SubscriptionPlan {
  id: PlanId;
  /** Short duration label, e.g. "12 months". */
  label: string;
  /** Total charged per billing term. */
  price: string;
  /** Same cost expressed per month, for comparison. */
  perMonth: string;
  /** Billing cadence in plain language. */
  billedAs: string;
  /** Anchor price shown struck through, when the plan is discounted. */
  strikethrough?: string;
  badge?: string;
  /** Months in the term — used to work out the next renewal date. */
  termMonths: number;
}

/** The three IAP options. Shared by the onboarding paywall and Manage subscription. */
export const subscriptionPlans: SubscriptionPlan[] = [
{
  id: 'annual',
  label: '12 months',
  price: '$49.98',
  perMonth: '$4.16 / mo',
  billedAs: 'Billed yearly',
  strikethrough: '$99.92',
  badge: 'Best value',
  termMonths: 12
},
{
  id: 'quarterly',
  label: '3 months',
  price: '$24.98',
  perMonth: '$8.33 / mo',
  billedAs: 'Billed quarterly',
  termMonths: 3
},
{
  id: 'monthly',
  label: '1 month',
  price: '$12.98',
  perMonth: '$12.98 / mo',
  billedAs: 'Billed monthly',
  termMonths: 1
}];


export function getPlan(id: PlanId): SubscriptionPlan {
  return subscriptionPlans.find((plan) => plan.id === id) ?? subscriptionPlans[0];
}

export const plusBenefits = [
'Unlimited recipes from the ingredients you have',
'Daily calorie and macro targets that adapt',
'Weekly meal plans and shopping lists',
'Progress tracking with your projected goal date'];