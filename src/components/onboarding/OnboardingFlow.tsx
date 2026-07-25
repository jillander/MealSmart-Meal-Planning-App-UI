
import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRightIcon,
  BrainCircuitIcon,
  CalendarDaysIcon,
  CameraIcon,
  CheckCircle2Icon,
  ChevronDownIcon,
  Clock3Icon,
  CookieIcon,
  DumbbellIcon,
  FlameIcon,
  HeartPulseIcon,
  LeafIcon,
  ListChecksIcon,
  SaladIcon,
  ScanLineIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TargetIcon,
  UtensilsIcon } from
'lucide-react';
import { CalPalMark } from './CalPalMark';
import { OnboardingChoiceCard } from './OnboardingChoiceCard';
import { OnboardingProgress } from './OnboardingProgress';
import { OnboardingPaywall } from './OnboardingPaywall';
import { FirstRecipeStep } from './FirstRecipeStep';

type Goal = 'lose' | 'maintain' | 'muscle' | 'consistent' | 'healthy';
type Activity = 'low' | 'light' | 'moderate' | 'high';
type Pace = 'gentle' | 'steady' | 'focused';
type StartPath = 'scan' | 'plan';

interface OnboardingFlowProps {
  onComplete: () => void;
  onSignIn: () => void;
  initialStep?: number;
}

const TOTAL_STEPS = 12;

const goals: Array<{
  id: Goal;
  label: string;
  description: string;
  icon: typeof TargetIcon;
}> = [
{ id: 'lose', label: 'Lose weight', description: 'Build sustainable habits', icon: TargetIcon },
{ id: 'maintain', label: 'Maintain my weight', description: 'Feel balanced and energized', icon: HeartPulseIcon },
{ id: 'muscle', label: 'Build muscle', description: 'Fuel training and recovery', icon: DumbbellIcon },
{ id: 'consistent', label: 'Eat more consistently', description: 'Bring calm to everyday meals', icon: Clock3Icon },
{ id: 'healthy', label: 'Plan healthier meals', description: 'Make good choices feel easier', icon: SaladIcon }];


const barriers = [
{ id: 'no-time', label: 'I run out of time', icon: Clock3Icon },
{ id: 'what-to-cook', label: 'I never know what to cook', icon: UtensilsIcon },
{ id: 'lose-track', label: 'I lose track of what I eat', icon: ListChecksIcon },
{ id: 'snacking', label: 'I snack more than I plan', icon: CookieIcon },
{ id: 'protein', label: 'I don’t get enough protein', icon: DumbbellIcon },
{ id: 'waste', label: 'I waste food I’ve bought', icon: LeafIcon }];


const foodPreferences = [
{ id: 'high-protein', label: 'High protein' },
{ id: 'vegetarian', label: 'Vegetarian' },
{ id: 'low-carb', label: 'Lower carb' },
{ id: 'dairy-free', label: 'Dairy-free' },
{ id: 'gluten-free', label: 'Gluten-free' },
{ id: 'quick', label: 'Under 30 min' }];


const cuisines = ['Mediterranean', 'Asian', 'Italian', 'Mexican', 'American', 'Indian'];

const barrierCopyMap: Record<string, {empathy: string;promise: string;}> = {
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

export function OnboardingFlow({
  onComplete,
  onSignIn,
  initialStep = 0
}: OnboardingFlowProps) {
  const [step, setStep] = useState(() =>
  Math.min(TOTAL_STEPS, Math.max(0, initialStep))
  );
  const [goal, setGoal] = useState<Goal | null>(null);
  const [selectedBarriers, setSelectedBarriers] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(['high-protein']);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [activity, setActivity] = useState<Activity>('moderate');
  const [pace, setPace] = useState<Pace>('steady');
  const [startPath, setStartPath] = useState<StartPath | null>(null);
  const [profile, setProfile] = useState({ age: '31', height: '170', weight: '72', goalWeight: '66', calculation: 'female' });

  const wantsWeightTarget = goal === 'lose' || goal === 'maintain' || goal === 'muscle';

  const dailyTarget = useMemo(() => {
    if (goal === 'muscle') return 2220;
    if (goal === 'lose') return pace === 'gentle' ? 1840 : pace === 'focused' ? 1580 : 1710;
    if (goal === 'maintain') return 2050;
    return 1900;
  }, [goal, pace]);

  const proteinTarget = goal === 'muscle' ? 132 : goal === 'lose' ? 112 : 98;
  const goalLabel = goals.find((item) => item.id === goal)?.label ?? 'health goal';

  const barrierPrimary = selectedBarriers[0];
  const barrierCopy = barrierCopyMap[barrierPrimary] ?? {
    empathy: 'eating well on a busy schedule is hard.',
    promise: 'We’ll build a flexible plan around your real routine.'
  };

  const suggestedPath: StartPath =
  barrierPrimary === 'what-to-cook' || barrierPrimary === 'waste' ?
  'scan' :
  'plan';

  const commitmentLine = wantsWeightTarget && profile.goalWeight ?
  `Built to reach ${profile.goalWeight} kg, with a protein target of ${proteinTarget}g/day.` :
  `Built for ${goalLabel.toLowerCase()}, with a protein target of ${proteinTarget}g/day.`;
  const commitmentDetail = selectedPreferences.includes('quick') ?
  'We’ll prioritize meals you can make in under 30 minutes.' :
  selectedCuisines.length ?
  `Expect more ${selectedCuisines.slice(0, 2).join(' & ')} ideas in your plan.` :
  barrierCopy.promise;

  const next = () => setStep((current) => Math.min(TOTAL_STEPS, current + 1));
  const back = () => setStep((current) => Math.max(0, current - 1));

  const toggleSelection = (id: string, values: string[], setValues: (items: string[]) => void) => {
    setValues(values.includes(id) ? values.filter((item) => item !== id) : [...values, id]);
  };

  // Guide the user toward the first action that best fits their stated barrier.
  useEffect(() => {
    if (step === 10 && !startPath) setStartPath(suggestedPath);
  }, [step, startPath, suggestedPath]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <WelcomeStep onStart={next} onSignIn={onSignIn} />;
      case 1:
        return <CredibilityStep onContinue={next} />;
      case 2:
        return (
          <QuestionLayout title="What would you like help with?" subtitle="Your answer shapes the plan we build together.">
            <div className="space-y-2.5">
              {goals.map((item) =>
              <OnboardingChoiceCard
                key={item.id}
                label={item.label}
                description={item.description}
                icon={item.icon}
                selected={goal === item.id}
                onClick={() => setGoal(item.id)} />

              )}
            </div>
            <ContinueButton disabled={!goal} onClick={next} />
          </QuestionLayout>);

      case 3:
        return (
          <QuestionLayout title="What makes eating well hard right now?" subtitle="Pick anything that sounds familiar. We’ll shape your plan around it.">
            <div className="space-y-2.5">
              {barriers.map((item) =>
              <OnboardingChoiceCard
                key={item.id}
                label={item.label}
                icon={item.icon}
                multiSelect
                selected={selectedBarriers.includes(item.id)}
                onClick={() => toggleSelection(item.id, selectedBarriers, setSelectedBarriers)} />

              )}
            </div>
            <ContinueButton label={selectedBarriers.length ? 'Continue' : 'Skip for now'} onClick={next} />
          </QuestionLayout>);

      case 4:
        return <ValidationStep goalLabel={goalLabel} empathy={barrierCopy.empathy} promise={barrierCopy.promise} onContinue={next} />;
      case 5:
        return (
          <QuestionLayout
            title="Let’s make your target realistic"
            subtitle="These details help estimate a starting calorie target. You can edit everything later.">
            
            <div className="space-y-4 rounded-3xl border border-[#E1E6E3] bg-white p-4 shadow-sm">
              <div className="grid grid-cols-3 gap-3">
                <NumberField label="Age" value={profile.age} suffix="yrs" onChange={(value) => setProfile({ ...profile, age: value })} />
                <NumberField label="Height" value={profile.height} suffix="cm" onChange={(value) => setProfile({ ...profile, height: value })} />
                <NumberField label="Weight" value={profile.weight} suffix="kg" onChange={(value) => setProfile({ ...profile, weight: value })} />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#68736D]">
                  {goal === 'muscle' ? 'Target weight' : 'Goal weight'}
                  {!wantsWeightTarget && <span className="ml-1 normal-case text-[#9AA39E]">(optional)</span>}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <NumberField label="Current" value={profile.weight} suffix="kg" onChange={(value) => setProfile({ ...profile, weight: value })} />
                  <NumberField label="Goal" value={profile.goalWeight} suffix="kg" onChange={(value) => setProfile({ ...profile, goalWeight: value })} />
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#68736D]">Calculation profile</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                  { id: 'female', label: 'Female' },
                  { id: 'male', label: 'Male' },
                  { id: 'general', label: 'General estimate' }].
                  map((option) =>
                  <button
                    type="button"
                    key={option.id}
                    onClick={() => setProfile({ ...profile, calculation: option.id })}
                    className={`min-h-12 rounded-xl border px-2 text-xs font-semibold transition-colors ${profile.calculation === option.id ? 'border-[#4CAF50] bg-[#EDF8EF] text-[#2F7D34]' : 'border-[#E1E6E3] text-[#59645E] hover:border-[#B7DDBB]'}`}>
                    
                      {option.label}
                    </button>
                  )}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#68736D]">Typical activity</p>
                <div className="relative">
                  <select
                    value={activity}
                    onChange={(event) => setActivity(event.target.value as Activity)}
                    className="w-full appearance-none rounded-xl border border-[#E1E6E3] bg-white px-3.5 py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/15">
                    
                    <option value="low">Mostly sitting</option>
                    <option value="light">Lightly active</option>
                    <option value="moderate">Active most days</option>
                    <option value="high">Very active / training often</option>
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[#718078]" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 rounded-2xl bg-[#F1F8F2] p-3 text-xs leading-relaxed text-[#496150]">
              <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#4CAF50]" />
              <span>Your details stay private and are used only to personalize your starting plan.</span>
            </div>
            <ContinueButton onClick={next} />
          </QuestionLayout>);

      case 6:
        return (
          <QuestionLayout title="Make it feel like your food" subtitle="Pick the preferences you’d like us to keep in mind. You can change these anytime.">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#68736D]">Dietary preferences</p>
            <div className="grid grid-cols-2 gap-3">
              {foodPreferences.map((item) => {
                const selected = selectedPreferences.includes(item.id);
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => toggleSelection(item.id, selectedPreferences, setSelectedPreferences)}
                    className={`relative min-h-20 rounded-2xl border p-3 text-left transition-all active:scale-[0.98] ${selected ? 'border-[#4CAF50] bg-[#EDF8EF]' : 'border-[#E1E6E3] bg-white hover:border-[#B7DDBB]'}`}>
                    
                    <span className="text-sm font-semibold text-[#1A1A1A]">{item.label}</span>
                    <span className={`absolute bottom-3 right-3 flex h-5 w-5 items-center justify-center rounded-md ${selected ? 'bg-[#4CAF50] text-white' : 'border border-[#C7CFCA] bg-white text-transparent'}`}>
                      <CheckCircle2Icon size={14} strokeWidth={3} />
                    </span>
                  </button>);

              })}
            </div>
            <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-[#68736D]">Favorite cuisines</p>
            <div className="flex flex-wrap gap-2">
              {cuisines.map((cuisine) => {
                const selected = selectedCuisines.includes(cuisine);
                return (
                  <button
                    type="button"
                    key={cuisine}
                    onClick={() => toggleSelection(cuisine, selectedCuisines, setSelectedCuisines)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all active:scale-[0.97] ${selected ? 'border-[#4CAF50] bg-[#4CAF50] text-white' : 'border-[#E1E6E3] bg-white text-[#59645E] hover:border-[#B7DDBB]'}`}>
                    
                    {cuisine}
                  </button>);

              })}
            </div>
            <ContinueButton onClick={next} />
          </QuestionLayout>);

      case 7:
        return (
          <QuestionLayout title="What pace feels sustainable?" subtitle="Small, repeatable choices tend to create the strongest results.">
            <div className="space-y-3">
              <OnboardingChoiceCard label="Gentle" description="More flexibility and a slower change" selected={pace === 'gentle'} onClick={() => setPace('gentle')} />
              <OnboardingChoiceCard label="Steady" description="A balanced, practical pace for most people" selected={pace === 'steady'} onClick={() => setPace('steady')} />
              <OnboardingChoiceCard label="Focused" description="More structure, still built around real meals" selected={pace === 'focused'} onClick={() => setPace('focused')} />
            </div>
            <div className="mt-4 rounded-2xl bg-[#FFF9E9] p-3 text-xs leading-relaxed text-[#7A5A18]">
              <span className="font-bold">Our recommendation:</span> Steady. You can adjust your target whenever your routine changes.
            </div>
            <ContinueButton onClick={next} />
          </QuestionLayout>);

      case 8:
        return <ProgressCelebrationStep onContinue={next} />;
      case 9:
        return (
          <PlanRevealStep
            dailyTarget={dailyTarget}
            proteinTarget={proteinTarget}
            commitmentLine={commitmentLine}
            commitmentDetail={commitmentDetail}
            onContinue={next} />);


      case 10:
        return (
          <QuestionLayout title="How would you like to start today?" subtitle="We’ve highlighted the best first step for you — you can change it.">
            <div className="space-y-3">
              <OnboardingChoiceCard label="Scan ingredients I have" description="Capture what’s in your kitchen, then get recipe matches" icon={ScanLineIcon} selected={startPath === 'scan'} onClick={() => setStartPath('scan')} />
              <OnboardingChoiceCard label="Plan today’s meals" description="Browse balanced meal ideas and add one to today’s plan" icon={CalendarDaysIcon} selected={startPath === 'plan'} onClick={() => setStartPath('plan')} />
            </div>
            <ContinueButton disabled={!startPath} label="Show me my options" onClick={next} />
          </QuestionLayout>);

      case 11:
        return <FirstRecipeStep path={startPath ?? 'scan'} onDone={next} />;
      case 12:
        return <OnboardingPaywall goalLabel={goalLabel} onContinue={onComplete} onSkip={onComplete} />;
      default:
        return null;
    }
  };

  const hasProgress = step > 0 && step < TOTAL_STEPS;

  return (
    <main className="min-h-screen w-full bg-[#FAFBFA] text-[#1A1A1A]">
      {hasProgress && <OnboardingProgress current={step} total={TOTAL_STEPS - 1} onBack={back} />}
      <div className={`${hasProgress ? 'px-5 pb-8 pt-7' : ''} mx-auto flex min-h-screen w-full max-w-[430px] flex-col`}>
        {renderStep()}
      </div>
    </main>);

}

function WelcomeStep({ onStart, onSignIn }: {onStart: () => void;onSignIn: () => void;}) {
  return (
    <section className="flex min-h-screen flex-col overflow-hidden bg-[#F7FBF7] px-6 pb-8 pt-9">
      <div className="flex justify-center"><CalPalMark size="lg" /></div>
      <div className="relative mx-auto mt-6 w-full max-w-[340px]">
        <div className="absolute -left-2 top-6 -z-0 h-28 w-28 -rotate-6 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-lg">
          <img
            src="/875a016f-36a5-4502-9998-18926feb0a7a.jpg"
            alt="Greek yogurt parfait with berries"
            className="h-full w-full object-cover" />
          
        </div>
        <div className="absolute -right-2 bottom-4 -z-0 h-28 w-28 rotate-6 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-lg">
          <img
            src="/59e44392-6940-41f1-b50d-607efcf7856a.jpg"
            alt="Fresh salmon salad bowl"
            className="h-full w-full object-cover" />
          
        </div>
        <div className="relative z-10 mx-auto w-[240px] overflow-hidden rounded-[32px] border-[6px] border-white bg-white shadow-2xl">
          <img
            src="/83c9cf94-e7ec-4b5f-a426-703eeb37d6c6.jpg"
            alt="A balanced Cal Pal grain bowl with grilled chicken, quinoa, avocado and vegetables"
            className="h-[264px] w-full object-cover" />
          
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[#2F7D34] shadow-sm backdrop-blur-sm">
            <FlameIcon size={13} /> 540 cal
          </div>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-[#1A1A1A]/92 px-3.5 py-2 text-white shadow-lg backdrop-blur-sm">
            <span className="flex items-center gap-1 text-xs font-bold"><DumbbellIcon size={13} className="text-[#7FD98A]" /> 38g protein</span>
            <span className="h-3 w-px bg-white/25" />
            <span className="flex items-center gap-1 text-xs font-bold"><Clock3Icon size={13} className="text-[#7FD98A]" /> 12 min</span>
          </div>
        </div>
        <div className="absolute -right-1 top-1 z-20 flex items-center gap-1.5 rounded-full bg-[#4CAF50] px-3 py-1.5 text-xs font-extrabold text-white shadow-lg">
          <SparklesIcon size={13} /> Fits your plan
        </div>
      </div>
      <div className="mt-auto pt-6 text-center">
        <span className="mb-4 inline-block rounded-full bg-[#E6F6E8] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#2F7D34]">Nutrition, without the noise</span>
        <h1 className="text-[38px] font-extrabold leading-[1.06] tracking-tight text-[#1A1A1A]">Meals that work for your real life.</h1>
        <p className="mx-auto mt-4 max-w-[320px] text-[15px] leading-relaxed text-[#68736D]">Build a flexible plan, use what you have, and make steady progress one meal at a time.</p>
      </div>
      <button type="button" onClick={onStart} className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_5px_0_#080808] transition-transform active:translate-y-0.5 active:shadow-[0_3px_0_#080808]">
        Build my plan <ArrowRightIcon className="ml-2" size={19} />
      </button>
      <p className="mt-5 text-center text-sm text-[#68736D]">
        Already using Cal Pal?{' '}
        <button type="button" onClick={onSignIn} className="font-semibold text-[#1A1A1A] underline underline-offset-4">Sign in</button>
      </p>
    </section>);

}

function CredibilityStep({ onContinue }: {onContinue: () => void;}) {
  const points = [
  { icon: SaladIcon, title: 'Built on nutrition science', body: 'Targets use established energy-balance methods.' },
  { icon: SparklesIcon, title: 'Personalized to you', body: 'Your plan adapts to your goal, food, and routine.' },
  { icon: ShieldCheckIcon, title: 'Your data stays private', body: 'Used only to personalize — never sold.' }];

  return (
    <section className="flex min-h-[calc(100vh-104px)] flex-col">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#4CAF50]">You’re in good company</p>
        <h1 className="mt-3 max-w-[360px] text-[31px] font-extrabold leading-[1.12] tracking-tight">Join the first 10,000 people eating smarter.</h1>
        <p className="mt-3 max-w-[360px] text-[15px] leading-relaxed text-[#68736D]">Cal Pal is new — and built carefully. Here’s what your plan is grounded in.</p>
      </div>
      <div className="mt-7 flex-1 space-y-3">
        {points.map((point) => {
          const Icon = point.icon;
          return (
            <div key={point.title} className="flex items-start gap-3 rounded-2xl border border-[#E9EFEB] bg-white p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDF8EF] text-[#4CAF50]"><Icon size={20} /></div>
              <div>
                <p className="text-sm font-bold text-[#1A1A1A]">{point.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#68736D]">{point.body}</p>
              </div>
            </div>);

        })}
      </div>
      <ContinueButton onClick={onContinue} />
    </section>);

}

function QuestionLayout({ title, subtitle, children }: {title: string;subtitle: string;children: React.ReactNode;}) {
  return (
    <section className="flex min-h-[calc(100vh-104px)] flex-col">
      <div>
        <h1 className="max-w-[360px] text-[31px] font-extrabold leading-[1.12] tracking-tight text-[#1A1A1A]">{title}</h1>
        <p className="mt-3 max-w-[360px] text-[15px] leading-relaxed text-[#68736D]">{subtitle}</p>
      </div>
      <div className="mt-7 flex-1">{children}</div>
    </section>);

}

function ContinueButton({ onClick, disabled = false, label = 'Continue' }: {onClick: () => void;disabled?: boolean;label?: string;}) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-all enabled:hover:bg-[#2A2A2A] enabled:active:translate-y-0.5 enabled:active:shadow-[0_2px_0_#080808] disabled:bg-[#E7EBE9] disabled:text-[#9AA39E] disabled:shadow-none">
      {label} <ArrowRightIcon className="ml-2" size={19} />
    </button>);

}

function NumberField({ label, value, suffix, onChange }: {label: string;value: string;suffix: string;onChange: (value: string) => void;}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-[#68736D]">{label}</span>
      <div className="relative">
        <input value={value} inputMode="numeric" onChange={(event) => onChange(event.target.value.replace(/[^0-9]/g, ''))} className="h-12 w-full rounded-xl border border-[#E1E6E3] bg-[#FCFDFC] px-3 pr-8 text-base font-bold text-[#1A1A1A] outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/15" aria-label={label} />
        <span className="pointer-events-none absolute right-2 top-3.5 text-[10px] font-semibold text-[#88938D]">{suffix}</span>
      </div>
    </label>);

}

function ValidationStep({ goalLabel, empathy, promise, onContinue }: {goalLabel: string;empathy: string;promise: string;onContinue: () => void;}) {
  return (
    <section className="flex min-h-[calc(100vh-104px)] flex-col justify-between py-5 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E6F6E8] text-[#4CAF50]"><SparklesIcon size={38} /></div>
      <div className="my-auto">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#4CAF50]">You’re not alone</p>
        <h1 className="mt-3 text-[32px] font-extrabold leading-[1.1] tracking-tight">Honestly, {empathy}</h1>
        <p className="mx-auto mt-4 max-w-[330px] text-[16px] leading-relaxed text-[#68736D]">{promise}</p>
      </div>
      <div className="rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-[#E9EFEB]">
        <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1A] text-white"><BrainCircuitIcon size={20} /></div><div><p className="text-sm font-bold">Built around your goal to {goalLabel.toLowerCase()}</p><p className="text-xs text-[#68736D]">Not a one-size-fits-all diet.</p></div></div>
      </div>
      <ContinueButton label="Make my plan" onClick={onContinue} />
    </section>);

}

function ProgressCelebrationStep({ onContinue }: {onContinue: () => void;}) {
  return (
    <section className="relative flex min-h-[calc(100vh-104px)] flex-col items-center justify-center text-center">
      <style>{`
        @keyframes cp-pop { 0% { transform: scale(0.5); opacity: 0 } 60% { transform: scale(1.12) } 100% { transform: scale(1); opacity: 1 } }
        @keyframes cp-confetti { 0% { transform: translateY(0) scale(0); opacity: 0 } 30% { opacity: 1 } 100% { transform: translateY(-64px) scale(1); opacity: 0 } }
      `}</style>
      <div className="relative">
        {[0, 1, 2, 3, 4, 5].map((i) =>
        <span
          key={i}
          className="absolute block h-2 w-2 rounded-full"
          style={{
            left: `${[-42, -20, 6, 24, 40, -4][i]}px`,
            top: '12px',
            background: ['#4CAF50', '#FFB020', '#1A1A1A', '#4CAF50', '#FFB020', '#4CAF50'][i],
            animation: `cp-confetti ${900 + i * 120}ms ease-out ${180 + i * 60}ms both`
          }} />

        )}
        <div className="flex h-24 w-24 items-center justify-center rounded-[30px] bg-[#4CAF50] text-white shadow-lg" style={{ animation: 'cp-pop 500ms cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <CheckCircle2Icon size={52} strokeWidth={2.2} />
        </div>
      </div>
      <h1 className="mt-8 text-[34px] font-extrabold leading-[1.08] tracking-tight">You’re crushing it already!</h1>
      <p className="mx-auto mt-4 max-w-[320px] text-[16px] leading-relaxed text-[#68736D]">That’s everything we need. Let’s turn your answers into a plan that actually fits.</p>
      <div className="mt-10 w-full"><ContinueButton label="Build my plan" onClick={onContinue} /></div>
    </section>);

}

function PlanRevealStep({ dailyTarget, proteinTarget, commitmentLine, commitmentDetail, onContinue }: {dailyTarget: number;proteinTarget: number;commitmentLine: string;commitmentDetail: string;onContinue: () => void;}) {
  return (
    <section className="flex min-h-[calc(100vh-104px)] flex-col text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#1A1A1A] text-white"><FlameIcon size={29} /></div>
      <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-[#4CAF50]">Your starting plan is ready</p>
      <h1 className="mt-2 text-[32px] font-extrabold leading-[1.1] tracking-tight">A realistic target for your real life.</h1>
      <div className="mt-6 rounded-[28px] bg-[#1A1A1A] p-6 text-white shadow-lg">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Daily energy target</p>
        <div className="mt-2 flex items-baseline justify-center"><span className="text-5xl font-extrabold tracking-tight">{dailyTarget.toLocaleString()}</span><span className="ml-2 text-sm font-semibold text-white/65">calories</span></div>
        <div className="mt-6 grid grid-cols-3 border-t border-white/15 pt-5 text-left"><Stat label="Protein" value={`${proteinTarget}g`} /><Stat label="Carbs" value="210g" /><Stat label="Fats" value="62g" /></div>
      </div>
      <div className="mt-4 rounded-2xl bg-[#EDF8EF] p-4 text-left"><p className="text-sm font-bold text-[#286B2D]">{commitmentLine}</p><p className="mt-1 text-xs leading-relaxed text-[#496150]">{commitmentDetail}</p></div>
      <div className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs font-semibold text-[#59645E] ring-1 ring-[#E9EFEB]">
        <SparklesIcon size={14} className="text-[#4CAF50]" /> You’re joining the first 10,000 eating smarter with Cal Pal.
      </div>
      <p className="mt-3 text-xs leading-relaxed text-[#7A857F]">This is a flexible starting estimate, not medical advice. You can adjust it anytime.</p>
      <ContinueButton label="This looks good" onClick={onContinue} />
    </section>);

}

function Stat({ label, value }: {label: string;value: string;}) {
  return <div className="border-r border-white/15 px-3 first:pl-0 last:border-r-0 last:pr-0"><p className="text-xs text-white/60">{label}</p><p className="mt-1 text-base font-bold">{value}</p></div>;
}

function SavePlanStep({ name, onName, isSaving, onProvider, onGuest }: {name: string;onName: (value: string) => void;isSaving: string | null;onProvider: (provider: string) => void;onGuest: () => void;}) {
  return (
    <section className="flex min-h-[calc(100vh-104px)] flex-col text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#E6F6E8] text-[#4CAF50]"><ShieldCheckIcon size={31} /></div>
      <h1 className="mt-6 text-[32px] font-extrabold leading-[1.1] tracking-tight">Save the plan you just built</h1>
      <p className="mx-auto mt-3 max-w-[340px] text-[15px] leading-relaxed text-[#68736D]">Keep your target, your first recipe, and your progress when you switch devices.</p>
      <label className="mt-6 block text-left">
        <span className="mb-1.5 block text-xs font-semibold text-[#68736D]">First name <span className="font-normal text-[#9AA39E]">(optional)</span></span>
        <input value={name} onChange={(event) => onName(event.target.value)} placeholder="What should we call you?" className="h-12 w-full rounded-xl border border-[#E1E6E3] bg-white px-3.5 text-base font-semibold text-[#1A1A1A] outline-none placeholder:font-normal placeholder:text-[#A7AFA9] focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/15" aria-label="First name" />
      </label>
      <div className="mt-4 space-y-3">
        <ProviderButton provider="apple" label="Continue with Apple" isLoading={isSaving === 'apple'} disabled={isSaving !== null} onClick={() => onProvider('apple')} />
        <ProviderButton provider="google" label="Continue with Google" isLoading={isSaving === 'google'} disabled={isSaving !== null} onClick={() => onProvider('google')} />
        <ProviderButton provider="email" label="Continue with email" isLoading={isSaving === 'email'} disabled={isSaving !== null} onClick={() => onProvider('email')} />
      </div>
      <button type="button" onClick={onGuest} disabled={isSaving !== null} className="mt-5 text-sm font-semibold text-[#58655E] underline underline-offset-4 hover:text-[#1A1A1A] disabled:opacity-50">Continue as guest</button>
      <p className="mt-auto pt-8 text-xs leading-relaxed text-[#8A948F]">By continuing, you agree to Cal Pal’s Terms of Service and Privacy Policy.</p>
    </section>);

}

function ProviderButton({ provider, label, isLoading, disabled, onClick }: {provider: 'apple' | 'google' | 'email';label: string;isLoading: boolean;disabled: boolean;onClick: () => void;}) {
  const isApple = provider === 'apple';
  return <button type="button" disabled={disabled} onClick={onClick} className={`flex h-14 w-full items-center justify-center rounded-2xl border text-sm font-bold transition-all active:scale-[0.99] disabled:opacity-60 ${isApple ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white' : 'border-[#DDE4DF] bg-white text-[#1A1A1A] hover:bg-[#FAFBFA]'}`}>
    {isLoading ? <span className={`h-5 w-5 animate-spin rounded-full border-2 ${isApple ? 'border-white/30 border-t-white' : 'border-[#C7CFCA] border-t-[#4CAF50]'}`} /> : <><ProviderIcon provider={provider} /><span className="ml-3">{label}</span></>}
  </button>;
}

function ProviderIcon({ provider }: {provider: 'apple' | 'google' | 'email';}) {
  if (provider === 'apple') {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.84 1.5.05 2.78.72 3.53 1.84-3.03 1.77-2.54 5.82.35 7.04-.68 1.69-1.52 3.23-2.46 4.13zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>);

  }
  if (provider === 'email') return <span className="text-lg">✉</span>;
  return <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>;
}

function ReadyStep({ path, name, onStart }: {path: StartPath;name: string;onStart: () => void;}) {
  const content = {
    scan: { icon: ScanLineIcon, title: 'Let’s find a meal from what you have.', body: 'Snap the ingredients in your kitchen and we’ll build ideas around your calorie target.', button: 'Open ingredient scan' },
    plan: { icon: CalendarDaysIcon, title: 'Your day is ready to take shape.', body: 'Start with a flexible meal plan that fits your target and food preferences.', button: 'View my plan' },
    log: { icon: CameraIcon, title: 'Let’s make today count.', body: 'Log a meal in a few taps and see how it fits your personalized target.', button: 'Log my first meal' }
  }[path];
  const Icon = content.icon;
  return <section className="flex min-h-screen flex-col justify-center bg-[#F7FBF7] px-6 text-center"><div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] bg-[#1A1A1A] text-white shadow-lg"><Icon size={43} strokeWidth={1.8} /></div><p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-[#4CAF50]">{name ? `You’re all set, ${name}` : 'You’re all set'}</p><h1 className="mx-auto mt-3 max-w-[350px] text-[35px] font-extrabold leading-[1.08] tracking-tight">{content.title}</h1><p className="mx-auto mt-4 max-w-[330px] text-[16px] leading-relaxed text-[#68736D]">{content.body}</p><button type="button" onClick={onStart} className="mt-10 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_5px_0_#080808] active:translate-y-0.5 active:shadow-[0_3px_0_#080808]">{content.button}<ArrowRightIcon className="ml-2" size={19} /></button></section>;
}