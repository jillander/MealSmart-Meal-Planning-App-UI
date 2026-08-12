import React from 'react';
import {
  BellIcon,
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  FlameIcon,
  ScanLineIcon,
  SparklesIcon,
  StarIcon } from
'lucide-react';
import { AppIcon } from './AppIcon';

/**
 * Simplified in-app compositions used inside the store device frames.
 * They mirror the real screens at a legible scale for a 1290×2796 export.
 */

export function ScanMockup() {
  return (
    <div className="relative h-full w-full bg-[#111312]">
      <img
        src="https://images.unsplash.com/photo-1543168256-418811576931?w=800&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-95" />
      
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div className="mt-14 flex items-center justify-between">
          <span className="rounded-full bg-black/50 px-4 py-2 text-[15px] font-bold text-white backdrop-blur">
            Scan your ingredients
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur">
            <ScanLineIcon size={20} />
          </span>
        </div>

        <div className="relative mx-auto aspect-square w-[80%] rounded-[28px] border-2 border-white/85">
          {[
          { label: 'Chicken', top: '12%', left: '6%' },
          { label: 'Spinach', top: '44%', left: '48%' },
          { label: 'Tomatoes', top: '72%', left: '12%' }].
          map((tag) =>
          <span
            key={tag.label}
            style={{ top: tag.top, left: tag.left }}
            className="absolute rounded-full bg-[#4CAF50] px-3 py-1.5 text-[14px] font-extrabold text-white shadow-lg">
            
              {tag.label}
            </span>
          )}
        </div>

        <div className="mb-4 rounded-3xl bg-white p-4 shadow-xl">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80"
              alt=""
              className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
            
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-extrabold uppercase tracking-wide text-[#2F7D34]">
                92% match
              </p>
              <p className="mt-0.5 truncate text-[18px] font-bold text-[#1A1A1A]">
                Garlic Chicken Bowl
              </p>
              <p className="mt-0.5 whitespace-nowrap text-[14px] text-[#68736D]">
                25 min · 480 kcal
              </p>
            </div>
            <ChevronRightIcon size={22} className="shrink-0 text-[#A7AFA9]" />
          </div>
        </div>
      </div>
    </div>);

}

export function MatchesMockup() {
  const recipes = [
  {
    name: 'Herb Chicken Bowl',
    meta: '25 min · 480 kcal',
    match: '92%',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80'
  },
  {
    name: 'Spinach Rice Skillet',
    meta: '20 min · 410 kcal',
    match: '88%',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&q=80'
  },
  {
    name: 'Tomato Pepper Pasta',
    meta: '30 min · 520 kcal',
    match: '84%',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&q=80'
  }];

  return (
    <div className="h-full w-full bg-[#F8F9FA]">
      <div className="px-6 pb-5 pt-16">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-[#2F7D34]">
          From your kitchen
        </p>
        <h3 className="mt-1.5 text-[27px] font-extrabold leading-[1.15] tracking-tight text-[#1A1A1A]">
          14 recipes you can
          <br />
          cook tonight
        </h3>
      </div>
      <div className="space-y-3.5 px-6">
        {recipes.map((recipe) =>
        <div key={recipe.name} className="flex items-center gap-4 rounded-2xl bg-white p-3.5 shadow-sm">
            <img src={recipe.image} alt="" className="h-[72px] w-[72px] shrink-0 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
              <span className="inline-block rounded-full bg-[#EDF8EF] px-2.5 py-1 text-[12px] font-extrabold text-[#2F7D34]">
                {recipe.match} match
              </span>
              <p className="mt-1.5 truncate text-[17px] font-bold text-[#1A1A1A]">{recipe.name}</p>
              <p className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-[14px] text-[#68736D]">
                <ClockIcon size={13} /> {recipe.meta}
              </p>
            </div>
          </div>
        )}
        <div className="rounded-2xl border border-dashed border-[#CFD6D2] p-4 text-center text-[14px] font-semibold text-[#68736D]">
          Missing one item? We add it to your list.
        </div>
      </div>
    </div>);

}

export function PlanMockup() {
  const macros = [
  { label: 'Protein', value: '128 g', pct: 72, color: '#4CAF50' },
  { label: 'Carbs', value: '186 g', pct: 58, color: '#F6B93B' },
  { label: 'Fats', value: '54 g', pct: 44, color: '#FF8A65' }];

  return (
    <div className="h-full w-full bg-[#F8F9FA]">
      <div className="px-6 pb-5 pt-16">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-[#2F7D34]">
          Your daily plan
        </p>
        <h3 className="mt-1.5 text-[27px] font-extrabold leading-[1.15] tracking-tight text-[#1A1A1A]">
          Targets that adapt
          <br />
          as you go
        </h3>
      </div>

      <div className="mx-6 rounded-3xl bg-[#1A1A1A] p-6 text-center text-white">
        <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-white/60">
          Calories left today
        </p>
        <p className="mt-2 text-[58px] font-extrabold leading-none">856</p>
        <p className="mt-1.5 text-[15px] text-white/60">of 2,140 kcal</p>
        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-[60%] rounded-full bg-[#8BD98F]" />
        </div>
      </div>

      <div className="mt-5 space-y-3 px-6">
        {macros.map((macro) =>
        <div key={macro.label} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-bold text-[#1A1A1A]">{macro.label}</span>
              <span className="text-[15px] font-semibold text-[#68736D]">{macro.value}</span>
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#EEF1EF]">
              <div
              className="h-full rounded-full"
              style={{ width: `${macro.pct}%`, background: macro.color }} />
            
            </div>
          </div>
        )}
      </div>
    </div>);

}

export function ProgressMockup() {
  return (
    <div className="h-full w-full bg-[#F8F9FA]">
      <div className="px-6 pb-5 pt-16">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-[#2F7D34]">
          Your projection
        </p>
        <h3 className="mt-1.5 text-[27px] font-extrabold leading-[1.15] tracking-tight text-[#1A1A1A]">
          On track for 68 kg
          <br />
          by 12 Nov
        </h3>
      </div>

      <div className="mx-6 rounded-3xl bg-white p-5 shadow-sm">
        <svg viewBox="0 0 260 130" className="w-full" role="img" aria-label="Projected weight curve">
          <defs>
            <clipPath id="storeCurveClip">
              <path d="M10 26 C70 34 120 66 175 88 C205 100 230 104 250 106 L250 122 L10 122 Z" />
            </clipPath>
          </defs>
          <rect x="10" y="26" width="240" height="96" fill="#EDF8EF" clipPath="url(#storeCurveClip)" />
          <line x1="10" y1="106" x2="250" y2="106" stroke="#CFD6D2" strokeWidth="1" strokeDasharray="4 4" />
          <path
            d="M10 26 C70 34 120 66 175 88 C205 100 230 104 250 106"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="3"
            strokeLinecap="round" />
          
          <circle cx="250" cy="106" r="5" fill="#4CAF50" />
          <circle cx="250" cy="106" r="10" fill="#4CAF50" opacity="0.18" />
        </svg>
        <div className="mt-3 flex justify-between text-[13px] font-semibold text-[#94A3B8]">
          <span>Today</span>
          <span>Week 6</span>
          <span>Goal</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 px-6">
        {[
        { label: 'Current streak', value: '18 days' },
        { label: 'Meals cooked', value: '46' },
        { label: 'Weight change', value: '−4.2 kg' },
        { label: 'Plan adherence', value: '91%' }].
        map((stat) =>
        <div key={stat.label} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-[24px] font-extrabold leading-none text-[#1A1A1A]">{stat.value}</p>
            <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-wide text-[#94A3B8]">
              {stat.label}
            </p>
          </div>
        )}
      </div>
    </div>);

}

export function ShoppingMockup() {
  const items = [
  { name: 'Chicken thighs', note: 'Herb Chicken Bowl', done: true },
  { name: 'Baby spinach', note: 'Spinach Rice Skillet', done: true },
  { name: 'Cherry tomatoes', note: 'Tomato Pepper Pasta', done: false },
  { name: 'Greek yogurt', note: 'Breakfast bowls', done: false },
  { name: 'Brown rice', note: 'Spinach Rice Skillet', done: false }];

  return (
    <div className="h-full w-full bg-[#F8F9FA]">
      <div className="px-6 pb-4 pt-16">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-[#2F7D34]">
          Shopping list
        </p>
        <h3 className="mt-1.5 text-[27px] font-extrabold leading-[1.15] tracking-tight text-[#1A1A1A]">
          Only what your
          <br />
          meals need
        </h3>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#E7EBE9]">
          <div className="h-full w-[40%] rounded-full bg-[#4CAF50]" />
        </div>
      </div>

      <div className="flex gap-3 px-6 pb-4">
        {[
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&q=80',
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=120&q=80',
        'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=120&q=80'].
        map((image) =>
        <img key={image} src={image} alt="" className="h-14 w-14 rounded-full object-cover" />
        )}
      </div>

      <div className="space-y-2.5 px-6">
        {items.map((item) =>
        <div key={item.name} className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-sm">
            <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
            item.done ? 'border-[#4CAF50] bg-[#4CAF50] text-white' : 'border-[#CFD6D2] text-transparent'}`
            }>
            
              <CheckIcon size={13} strokeWidth={3} />
            </span>
            <div className="min-w-0">
              <p
              className={`truncate text-[17px] font-semibold ${
              item.done ? 'text-[#A7AFA9] line-through' : 'text-[#1A1A1A]'}`
              }>
              
                {item.name}
              </p>
              <p className="mt-0.5 truncate text-[13px] text-[#94A3B8]">Recipe · {item.note}</p>
            </div>
          </div>
        )}
      </div>
    </div>);

}

export function RemindersMockup() {
  const reminders = [
  { meal: 'Breakfast', time: '8:00 am', on: true },
  { meal: 'Lunch', time: '12:30 pm', on: true },
  { meal: 'Dinner', time: '6:30 pm', on: false }];

  return (
    <div className="h-full w-full bg-[#F8F9FA]">
      <div className="px-6 pb-5 pt-16">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.1em] text-[#2F7D34]">
          Stay on track
        </p>
        <h3 className="mt-1.5 text-[27px] font-extrabold leading-[1.15] tracking-tight text-[#1A1A1A]">
          A nudge at the
          <br />
          right moment
        </h3>
      </div>

      <div className="mx-6 flex items-center gap-4 rounded-2xl bg-[#1A1A1A] p-5 text-white">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
          <BellIcon size={21} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-bold">Meal reminders</p>
          <p className="mt-0.5 text-[14px] text-white/60">2 reminders scheduled</p>
        </div>
        <span className="flex h-8 w-14 shrink-0 items-center rounded-full bg-[#4CAF50] px-1">
          <span className="ml-auto h-6 w-6 rounded-full bg-white" />
        </span>
      </div>

      <div className="mt-5 space-y-3 px-6">
        {reminders.map((reminder) =>
        <div
          key={reminder.meal}
          className={`flex items-center justify-between gap-3 rounded-2xl border-2 bg-white p-4 shadow-sm ${
          reminder.on ? 'border-[#4CAF50]' : 'border-transparent'}`
          }>
          
            <div className="min-w-0">
              <p className="text-[18px] font-bold text-[#1A1A1A]">{reminder.meal}</p>
              <p className="mt-0.5 whitespace-nowrap text-[14px] text-[#68736D]">
                Reminding you at {reminder.time}
              </p>
            </div>
            <span
            className={`flex h-8 w-14 shrink-0 items-center rounded-full px-1 ${
            reminder.on ? 'bg-[#4CAF50]' : 'bg-[#E1E6E3]'}`
            }>
            
              <span className={`h-6 w-6 rounded-full bg-white ${reminder.on ? 'ml-auto' : ''}`} />
            </span>
          </div>
        )}
      </div>
    </div>);

}

/** Closing social-proof slide, shown without a device frame. */
export function ProofSlide() {
  const quotes = [
  'Finally, recipes for what I actually have',
  'No more 7pm what-do-I-cook panic',
  'The scan is genuinely magic',
  'Lost 6 kg without tracking every crumb'];

  return (
    <div className="flex h-full flex-col justify-center px-7">
      <h3 className="text-center text-[30px] font-extrabold leading-tight tracking-tight text-white">
        It works.
      </h3>
      <div className="mt-6 space-y-3">
        {quotes.map((quote) =>
        <div key={quote} className="rounded-2xl bg-white px-4 py-3.5 shadow-sm">
            <p className="text-[13px] font-bold leading-snug text-[#1A1A1A]">&ldquo;{quote}&rdquo;</p>
            <div className="mt-1.5 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, index) =>
            <StarIcon key={index} size={11} className="fill-[#F6B93B] text-[#F6B93B]" />
            )}
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 flex flex-col items-center gap-2">
        <AppIcon size={54} />
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/80">
          <SparklesIcon size={12} /> Cooking made obvious
        </span>
      </div>
    </div>);

}

/** Small badge used on the first slide to echo the in-app streak treatment. */
export function FlameBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white">
      <FlameIcon size={12} /> 18 day streak
    </span>);

}