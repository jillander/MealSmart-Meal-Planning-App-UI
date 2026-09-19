import React, { useMemo, useState } from 'react';
import {
  ArrowRightIcon,
  BikeIcon,
  CheckIcon,
  DumbbellIcon,
  FootprintsIcon,
  SofaIcon,
  UserIcon } from
'lucide-react';
import { WheelPicker, WheelOption } from './WheelPicker';
import { haptic } from '../../lib/haptics';

type Activity = 'low' | 'light' | 'moderate' | 'high';

interface Profile {
  age: string;
  height: string;
  weight: string;
  goalWeight: string;
  calculation: string;
  reminderTimes: string[];
}

interface PersonalDetailsStepProps {
  profile: Profile;
  onProfileChange: (profile: Profile) => void;
  activity: Activity;
  onActivityChange: (activity: Activity) => void;
  /** Whether a goal weight is part of this person's goal. */
  wantsWeightTarget: boolean;
  isMuscleGoal: boolean;
  /** Opens directly on one sub-question, for previewing a single screen. */
  initialCard?: string;
  onContinue: () => void;
}

const calculationProfiles = [
{ id: 'female', label: 'Female' },
{ id: 'male', label: 'Male' },
{ id: 'general', label: 'Prefer not to say' }];


const activityOptions: {
  id: Activity;
  label: string;
  description: string;
  icon: typeof SofaIcon;
}[] = [
{ id: 'low', label: 'Mostly sitting', description: 'Desk work, little walking', icon: SofaIcon },
{ id: 'light', label: 'Lightly active', description: 'Some walking most days', icon: FootprintsIcon },
{ id: 'moderate', label: 'Active most days', description: 'On your feet or training 3–4×', icon: BikeIcon },
{ id: 'high', label: 'Very active', description: 'Training hard or physical job', icon: DumbbellIcon }];


const range = (from: number, to: number) =>
Array.from({ length: to - from + 1 }, (_, index) => from + index);

const cmOptions: WheelOption[] = range(130, 215).map((cm) => ({ value: cm, label: `${cm} cm` }));
const inchOptions: WheelOption[] = range(51, 84).map((inches) => ({
  value: Math.round(inches * 2.54),
  label: `${Math.floor(inches / 12)}′ ${inches % 12}″`
}));
const kgOptions: WheelOption[] = range(35, 200).map((kg) => ({ value: kg, label: `${kg} kg` }));
const lbOptions: WheelOption[] = range(80, 440).map((lb) => ({
  value: Math.round(lb / 2.205),
  label: `${lb} lb`
}));
const ageOptions: WheelOption[] = range(14, 90).map((age) => ({ value: age, label: `${age} years` }));

/**
 * The details needed to size a starting calorie target, split into one
 * decision per screen so the whole thing is taps and flicks — never typing.
 */
export function PersonalDetailsStep({
  profile,
  onProfileChange,
  activity,
  onActivityChange,
  wantsWeightTarget,
  isMuscleGoal,
  initialCard,
  onContinue
}: PersonalDetailsStepProps) {
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');

  const cards: ('profile' | 'age' | 'height' | 'weight' | 'goal' | 'activity')[] = useMemo(
    () =>
    wantsWeightTarget ?
    ['profile', 'age', 'height', 'weight', 'goal', 'activity'] :
    ['profile', 'age', 'height', 'weight', 'activity'],
    [wantsWeightTarget]
  );

  const [index, setIndex] = useState(() => {
    const found = cards.indexOf(initialCard as (typeof cards)[number]);
    return found < 0 ? 0 : found;
  });

  const card = cards[index];
  const isLast = index === cards.length - 1;
  const advance = () => {
    if (isLast) {
      onContinue();
      return;
    }
    setIndex((current) => Math.min(cards.length - 1, current + 1));
  };

  const set = (patch: Partial<Profile>) => onProfileChange({ ...profile, ...patch });

  const weight = Number(profile.weight) || 72;
  const goalWeight = Number(profile.goalWeight) || weight;
  const delta = Math.abs(goalWeight - weight);

  const heading: Record<typeof card, {title: string;subtitle: string;}> = {
    profile: {
      title: 'Which applies to you?',
      subtitle: 'Used only to calculate how much energy your body needs.'
    },
    age: {
      title: 'How old are you?',
      subtitle: 'Age changes how many calories your body uses at rest.'
    },
    height: {
      title: 'What’s your height?',
      subtitle: 'Scroll to your height — no typing needed.'
    },
    weight: {
      title: 'And your weight today?',
      subtitle: 'This is your starting point. You can update it any time.'
    },
    goal: {
      title: isMuscleGoal ? 'What weight are you building toward?' : 'Where would you like to get to?',
      subtitle: 'We’ll pace your plan to reach it without crash dieting.'
    },
    activity: {
      title: 'How active is a normal week?',
      subtitle: 'The last of the numbers — then we’ll set your pace.'
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-104px)] flex-col">
      <style>{`
        @keyframes cp-card-in { 0% { opacity: 0; transform: translateY(14px) } 100% { opacity: 1; transform: translateY(0) } }
        @media (prefers-reduced-motion: reduce) { .cp-detail { animation: none !important; } }
      `}</style>

      {/* Sub-progress, so the burst of questions has a visible end */}
      <div className="flex items-center gap-1.5">
        {cards.map((item, position) =>
        <span
          key={item}
          className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
          position <= index ? 'bg-[#4CAF50]' : 'bg-[#E3E9E5]'}`
          } />

        )}
        <span className="ml-1.5 shrink-0 text-[11px] font-bold text-[#8A948F]">
          {Math.min(index + 1, cards.length)}/{cards.length}
        </span>
      </div>

      <div key={card} className="cp-detail mt-6" style={{ animation: 'cp-card-in 380ms cubic-bezier(0.22, 1, 0.36, 1) both' }}>
        <h1 className="max-w-[360px] text-[29px] font-extrabold leading-[1.13] tracking-tight text-[#1A1A1A]">
          {heading[card].title}
        </h1>
        <p className="mt-2.5 max-w-[350px] text-[15px] leading-relaxed text-[#68736D]">
          {heading[card].subtitle}
        </p>
      </div>

      <div className="mt-7 flex flex-1 flex-col">
        {card === 'profile' &&
        <div className="space-y-3">
            {calculationProfiles.map((option) => {
            const selected = profile.calculation === option.id;
            return (
              <button
                type="button"
                key={option.id}
                onClick={() => {
                  haptic('selection');
                  set({ calculation: option.id });
                  window.setTimeout(advance, 160);
                }}
                className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all active:scale-[0.99] ${
                selected ? 'border-[#4CAF50] bg-[#EDF8EF]' : 'border-[#E1E6E3] bg-white hover:border-[#B7DDBB]'}`
                }>
                
                  <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  selected ? 'bg-[#4CAF50] text-white' : 'bg-[#F3F6F4] text-[#59645E]'}`
                  }>
                  
                    <UserIcon size={19} />
                  </span>
                  <span className="flex-1 text-[15px] font-bold text-[#1A1A1A]">
                    {option.label}
                  </span>
                  <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  selected ? 'border-[#4CAF50] bg-[#4CAF50] text-white' : 'border-[#D5DCD7] text-transparent'}`
                  }>
                  
                    <CheckIcon size={13} strokeWidth={3.5} />
                  </span>
                </button>);

          })}
          </div>
        }

        {card === 'age' &&
        <WheelPicker
          options={ageOptions}
          value={Number(profile.age) || 31}
          onChange={(value) => set({ age: String(value) })}
          ariaLabel="Age in years" />

        }

        {card === 'height' &&
        <>
            <UnitToggle
            options={[
            { id: 'cm', label: 'cm' },
            { id: 'ft', label: 'ft, in' }]
            }
            value={heightUnit}
            onChange={(unit) => setHeightUnit(unit as 'cm' | 'ft')} />
          
            <div className="mt-5">
              <WheelPicker
              options={heightUnit === 'cm' ? cmOptions : inchOptions}
              value={Number(profile.height) || 170}
              onChange={(value) => set({ height: String(value) })}
              ariaLabel="Height" />
            
            </div>
          </>
        }

        {card === 'weight' &&
        <>
            <UnitToggle
            options={[
            { id: 'kg', label: 'kg' },
            { id: 'lb', label: 'lb' }]
            }
            value={weightUnit}
            onChange={(unit) => setWeightUnit(unit as 'kg' | 'lb')} />
          
            <div className="mt-5">
              <WheelPicker
              options={weightUnit === 'kg' ? kgOptions : lbOptions}
              value={weight}
              onChange={(value) => set({ weight: String(value) })}
              ariaLabel="Current weight" />
            
            </div>
          </>
        }

        {card === 'goal' &&
        <>
            <WheelPicker
            options={weightUnit === 'kg' ? kgOptions : lbOptions}
            value={goalWeight}
            onChange={(value) => set({ goalWeight: String(value) })}
            ariaLabel="Goal weight" />
          
            <p className="mt-5 rounded-2xl bg-[#F1F8F2] p-3.5 text-center text-[13px] font-semibold text-[#2F7D34]">
              {delta === 0 ?
            'Holding steady at your current weight.' :
            `That’s ${delta} kg to ${goalWeight < weight ? 'lose' : 'gain'} from ${weight} kg.`}
            </p>
          </>
        }

        {card === 'activity' &&
        <div className="space-y-3">
            {activityOptions.map((option) => {
            const selected = activity === option.id;
            const Icon = option.icon;
            return (
              <button
                type="button"
                key={option.id}
                onClick={() => {
                  haptic('selection');
                  onActivityChange(option.id);
                  window.setTimeout(advance, 160);
                }}
                className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all active:scale-[0.99] ${
                selected ? 'border-[#4CAF50] bg-[#EDF8EF]' : 'border-[#E1E6E3] bg-white hover:border-[#B7DDBB]'}`
                }>
                
                  <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  selected ? 'bg-[#4CAF50] text-white' : 'bg-[#F3F6F4] text-[#59645E]'}`
                  }>
                  
                    <Icon size={19} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[15px] font-bold text-[#1A1A1A]">{option.label}</span>
                    <span className="block text-xs text-[#78837D]">{option.description}</span>
                  </span>
                  <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  selected ? 'border-[#4CAF50] bg-[#4CAF50] text-white' : 'border-[#D5DCD7] text-transparent'}`
                  }>
                  
                    <CheckIcon size={13} strokeWidth={3.5} />
                  </span>
                </button>);

          })}
          </div>
        }

        {/* Tap-to-select cards advance on their own; wheels need confirming */}
        {card !== 'profile' && card !== 'activity' &&
        <button
          type="button"
          onClick={advance}
          className="mt-auto flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-all hover:bg-[#2A2A2A] active:translate-y-0.5 active:shadow-[0_2px_0_#080808]">
          
            {isLast ? 'Set my pace' : 'Continue'} <ArrowRightIcon className="ml-2" size={19} />
          </button>
        }
      </div>
    </section>);

}

function UnitToggle({
  options,
  value,
  onChange




}: {options: {id: string;label: string;}[];value: string;onChange: (id: string) => void;}) {
  return (
    <div className="mx-auto flex w-[188px] rounded-full bg-[#F1F4F2] p-1">
      {options.map((option) =>
      <button
        type="button"
        key={option.id}
        onClick={() => onChange(option.id)}
        aria-pressed={value === option.id}
        className={`flex-1 rounded-full py-2 text-[13px] font-bold transition-colors ${
        value === option.id ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#78837D]'}`
        }>
        
          {option.label}
        </button>
      )}
    </div>);

}