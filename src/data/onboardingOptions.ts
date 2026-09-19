import {
  Clock3Icon,
  CookieIcon,
  DumbbellIcon,
  HeartPulseIcon,
  LeafIcon,
  ListChecksIcon,
  SaladIcon,
  TargetIcon,
  UtensilsIcon } from
'lucide-react';

export type Goal = 'lose' | 'maintain' | 'muscle' | 'consistent' | 'healthy';
export type Activity = 'low' | 'light' | 'moderate' | 'high';
export type Pace = 'gentle' | 'steady' | 'focused';
export type StartPath = 'scan' | 'plan';

export const goals: Array<{
  id: Goal;
  label: string;
  description: string;
  icon: typeof TargetIcon;
}> = [
{ id: 'lose', label: 'Lose weight', description: 'Build sustainable habits', icon: TargetIcon },
{
  id: 'maintain',
  label: 'Maintain my weight',
  description: 'Feel balanced and energized',
  icon: HeartPulseIcon
},
{
  id: 'muscle',
  label: 'Build muscle',
  description: 'Fuel training and recovery',
  icon: DumbbellIcon
},
{
  id: 'consistent',
  label: 'Eat more consistently',
  description: 'Bring calm to everyday meals',
  icon: Clock3Icon
},
{
  id: 'healthy',
  label: 'Plan healthier meals',
  description: 'Make good choices feel easier',
  icon: SaladIcon
}];


export const barriers = [
{ id: 'no-time', label: 'I run out of time', icon: Clock3Icon },
{ id: 'what-to-cook', label: 'I never know what to cook', icon: UtensilsIcon },
{ id: 'lose-track', label: 'I lose track of what I eat', icon: ListChecksIcon },
{ id: 'snacking', label: 'I snack more than I plan', icon: CookieIcon },
{ id: 'protein', label: 'I don’t get enough protein', icon: DumbbellIcon },
{ id: 'waste', label: 'I waste food I’ve bought', icon: LeafIcon }];


export const foodPreferences = [
{ id: 'high-protein', label: 'High protein' },
{ id: 'vegetarian', label: 'Vegetarian' },
{ id: 'low-carb', label: 'Lower carb' },
{ id: 'dairy-free', label: 'Dairy-free' },
{ id: 'gluten-free', label: 'Gluten-free' },
{ id: 'quick', label: 'Under 30 min' }];


export const cuisines = ['Mediterranean', 'Asian', 'Italian', 'Mexican', 'American', 'Indian'];

/** What we say back after someone names their biggest barrier. */
export const barrierCopyMap: Record<string, {empathy: string;promise: string;}> = {
  'no-time': {
    empathy: 'weekday meals are genuinely hard to fit in.',
    promise: 'We’ll prioritize quick meals you can make on busy days.'
  },
  'what-to-cook': {
    empathy: 'deciding what to cook is the hardest part for most people.',
    promise: 'We’ll suggest meals from what you already have — no more guessing.'
  },
  'lose-track': {
    empathy: 'losing track by evening is one of the most common struggles.',
    promise: 'We’ll make logging fast, so it actually sticks.'
  },
  snacking: {
    empathy: 'unplanned snacks trip up almost everyone.',
    promise: 'We’ll build in satisfying options so snacks fit your plan.'
  },
  protein: {
    empathy: 'hitting protein is tough without a plan.',
    promise: 'We’ll center your plan on high-protein meals you enjoy.'
  },
  waste: {
    empathy: 'watching groceries go to waste is frustrating — and fixable.',
    promise: 'We’ll turn what you already have into meals first.'
  }
};

export const activityLabels: Record<Activity, string> = {
  low: 'Mostly sitting',
  light: 'Lightly active',
  moderate: 'Active most days',
  high: 'Very active'
};

export const paceLabels: Record<Pace, string> = {
  gentle: 'Gentle',
  steady: 'Steady',
  focused: 'Focused'
};