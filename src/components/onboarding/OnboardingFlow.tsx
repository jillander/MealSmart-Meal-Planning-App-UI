import React, { useEffect, useMemo, useState } from 'react';
import { OnboardingProgress } from './OnboardingProgress';
import { OnboardingPaywall } from './OnboardingPaywall';
import { FirstRecipeStep } from './FirstRecipeStep';
import { ProductShowcaseStep } from './ProductShowcaseStep';
import { PersonalDetailsStep } from './PersonalDetailsStep';
import { RealisticTargetStep } from './RealisticTargetStep';
import { DetailsThankYouStep } from './DetailsThankYouStep';
import { PlanBuildingStep } from './PlanBuildingStep';
import { PremiumWelcomeStep } from './PremiumWelcomeStep';
import { ReminderStep } from './ReminderStep';
import { LaunchOfferScreen } from '../subscription/LaunchOfferScreen';
// One file per screen — see components/onboarding/steps/
import { WelcomeStep } from './steps/WelcomeStep';
import { GoalStep } from './steps/GoalStep';
import { BarriersStep } from './steps/BarriersStep';
import { ValidationStep } from './steps/ValidationStep';
import { PaceStep } from './steps/PaceStep';
import { FoodPreferencesStep } from './steps/FoodPreferencesStep';
import { PlanRevealStep } from './steps/PlanRevealStep';
import { SavePlanStep } from './steps/SavePlanStep';
import { StartPathStep } from './steps/StartPathStep';
import {
  activityLabels,
  barrierCopyMap,
  goals,
  paceLabels,
  type Activity,
  type Goal,
  type Pace,
  type StartPath } from
'../../data/onboardingOptions';
import { computeTargets } from '../../lib/targets';
import { getProjectionDetails } from '../../lib/projection';

interface OnboardingFlowProps {
  onComplete: () => void;
  onSignIn: () => void;
  initialStep?: number;
  /** Which sub-question of the details run to open on, for Screens previews. */
  initialDetailCard?: string;
}

/**
 * The onboarding route table. Each case below is ONE screen, and every screen
 * lives in its own file — this component only owns the answers and the order.
 *
 *  0  Welcome (core loop demo)      9  Thank you
 *  1  Goal                         10  Building your plan
 *  2  Barriers                     11  Your starting plan
 *  3  Validation                   12  Save your plan
 *  4  Scan & Discover showcase     13  First win path
 *  5  Personal details (6 cards)   14  Recipe activation
 *  6  Sustainable pace             15  Membership  → one-time offer
 *  7  Realistic target             16  Plus activated
 *  8  Food preferences             17  Stay on track
 */
const TOTAL_STEPS = 17;

export function OnboardingFlow({
  onComplete,
  onSignIn,
  initialStep = 0,
  initialDetailCard
}: OnboardingFlowProps) {
  const [step, setStep] = useState(() => Math.min(TOTAL_STEPS, Math.max(0, initialStep)));
  const [goal, setGoal] = useState<Goal | null>(null);
  const [selectedBarriers, setSelectedBarriers] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(['high-protein']);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [activity, setActivity] = useState<Activity>('moderate');
  const [pace, setPace] = useState<Pace>('steady');
  const [startPath, setStartPath] = useState<StartPath | null>(null);
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    age: '31',
    height: '170',
    weight: '72',
    goalWeight: '66',
    calculation: 'female',
    reminderTimes: ['Breakfast', 'Lunch', 'Dinner']
  });
  // Set once the user commits to a term on the paywall — the one-time
  // discount lands on top before the trial is confirmed.
  const [offerPlan, setOfferPlan] = useState<'annual' | 'monthly' | null>(null);

  const wantsWeightTarget = goal === 'lose' || goal === 'maintain' || goal === 'muscle';
  const targets = useMemo(() => computeTargets(goal, pace), [goal, pace]);
  const goalLabel = goals.find((item) => item.id === goal)?.label ?? 'health goal';

  const barrierPrimary = selectedBarriers[0];
  const barrierCopy = barrierCopyMap[barrierPrimary] ?? {
    empathy: 'eating well on a busy schedule is hard.',
    promise: 'We’ll build a flexible plan around your real routine.'
  };

  const suggestedPath: StartPath =
  barrierPrimary === 'what-to-cook' || barrierPrimary === 'waste' ? 'scan' : 'plan';

  const commitmentLine =
  wantsWeightTarget && profile.goalWeight ?
  `Built to reach ${profile.goalWeight} kg, with a protein target of ${targets.proteinGoal}g/day.` :
  `Built for ${goalLabel.toLowerCase()}, with a protein target of ${targets.proteinGoal}g/day.`;
  const commitmentDetail = selectedPreferences.includes('quick') ?
  'We’ll prioritize meals you can make in under 30 minutes.' :
  selectedCuisines.length ?
  `Expect more ${selectedCuisines.slice(0, 2).join(' & ')} ideas in your plan.` :
  barrierCopy.promise;

  const hasProjectedGoal = goal === 'lose' || goal === 'muscle';
  const projection = hasProjectedGoal ?
  getProjectionDetails(profile.weight, profile.goalWeight, pace) :
  null;

  const next = () => setStep((current) => Math.min(TOTAL_STEPS, current + 1));
  const back = () => setStep((current) => Math.max(0, current - 1));

  const toggle = (id: string, values: string[], setValues: (items: string[]) => void) => {
    setValues(values.includes(id) ? values.filter((item) => item !== id) : [...values, id]);
  };

  const handleSavePlan = (provider: 'apple' | 'google' | 'email') => {
    setIsSaving(provider);
    window.setTimeout(() => {
      setIsSaving(null);
      next();
    }, 700);
  };

  // Guide the user toward the first action that best fits their stated barrier.
  useEffect(() => {
    if (step === 13 && !startPath) setStartPath(suggestedPath);
  }, [step, startPath, suggestedPath]);

  /** The answers we built the plan from, read back before it's generated. */
  const reviewItems = [
  { label: 'Goal', value: goalLabel },
  { label: 'Age', value: `${profile.age} years` },
  { label: 'Height', value: `${profile.height} cm` },
  { label: 'Weight', value: `${profile.weight} kg` },
  ...(wantsWeightTarget || goal === null ?
  [{ label: 'Goal weight', value: `${profile.goalWeight} kg` }] :
  []),
  { label: 'Activity', value: activityLabels[activity] },
  { label: 'Pace', value: paceLabels[pace] }];


  const renderStep = () => {
    switch (step) {
      case 0:
        return <WelcomeStep onStart={next} onSignIn={onSignIn} />;
      case 1:
        return <GoalStep goal={goal} onGoalChange={setGoal} onContinue={next} />;
      case 2:
        return (
          <BarriersStep
            selected={selectedBarriers}
            onToggle={(id) => toggle(id, selectedBarriers, setSelectedBarriers)}
            onContinue={next} />);


      case 3:
        return (
          <ValidationStep
            goalLabel={goalLabel}
            empathy={barrierCopy.empathy}
            promise={barrierCopy.promise}
            onContinue={next} />);


      case 4:
        return <ProductShowcaseStep onContinue={next} />;
      case 5:
        return (
          <PersonalDetailsStep
            profile={profile}
            onProfileChange={setProfile}
            activity={activity}
            onActivityChange={setActivity}
            wantsWeightTarget={wantsWeightTarget || goal === null}
            isMuscleGoal={goal === 'muscle'}
            initialCard={initialDetailCard}
            onContinue={next} />);


      case 6:
        return <PaceStep pace={pace} onPaceChange={setPace} onContinue={next} />;
      case 7:
        return (
          <RealisticTargetStep
            weightKg={profile.weight}
            goalWeight={profile.goalWeight}
            pace={pace}
            hasWeightTarget={wantsWeightTarget || goal === null}
            goalLabel={goalLabel}
            onContinue={next} />);


      case 8:
        return (
          <FoodPreferencesStep
            selectedPreferences={selectedPreferences}
            onTogglePreference={(id) => toggle(id, selectedPreferences, setSelectedPreferences)}
            selectedCuisines={selectedCuisines}
            onToggleCuisine={(cuisine) => toggle(cuisine, selectedCuisines, setSelectedCuisines)}
            onContinue={next} />);


      case 9:
        return <DetailsThankYouStep items={reviewItems} onContinue={next} />;
      case 10:
        return (
          <PlanBuildingStep
            goalLabel={goalLabel}
            pace={pace}
            preferences={selectedPreferences}
            cuisines={selectedCuisines}
            onContinue={next} />);


      case 11:
        return (
          <PlanRevealStep
            targets={targets}
            weightKg={profile.weight}
            goalWeight={profile.goalWeight}
            pace={pace}
            goal={goal}
            commitmentLine={commitmentLine}
            commitmentDetail={commitmentDetail}
            onContinue={next} />);


      case 12:
        return (
          <SavePlanStep
            dailyTarget={targets.calorieGoal}
            goalWeight={profile.goalWeight}
            projectedDate={projection?.projectedDate ?? null}
            email={email}
            onEmail={setEmail}
            isSaving={isSaving}
            onProvider={handleSavePlan}
            onSkip={next} />);


      case 13:
        return (
          <StartPathStep
            startPath={startPath}
            onStartPathChange={setStartPath}
            onContinue={next} />);


      case 14:
        return <FirstRecipeStep path={startPath ?? 'scan'} onDone={next} />;
      case 15:
        return (
          <OnboardingPaywall
            goalLabel={goalLabel}
            calorieGoal={targets.calorieGoal}
            proteinGoal={targets.proteinGoal}
            goalWeight={hasProjectedGoal ? profile.goalWeight : null}
            projectedDate={projection?.projectedDate ?? null}
            onSubscribe={(planId) => setOfferPlan(planId === 'monthly' ? 'monthly' : 'annual')}
            onSkip={() => setStep(17)} />);


      case 16:
        return (
          <PremiumWelcomeStep
            goalLabel={goalLabel}
            proteinGoal={targets.proteinGoal}
            onStart={() => setStep(17)} />);


      case 17:
        return (
          <ReminderStep
            times={profile.reminderTimes}
            onTimesChange={(reminderTimes) => setProfile({ ...profile, reminderTimes })}
            onComplete={onComplete} />);


      default:
        return null;
    }
  };

  const hasProgress = step > 0 && step < TOTAL_STEPS;

  return (
    <main className="min-h-screen w-full bg-[#FAFBFA] text-[#1A1A1A]">
      {hasProgress &&
      <OnboardingProgress current={step} total={TOTAL_STEPS - 1} onBack={back} />
      }
      <div
        className={`${hasProgress ? 'px-5 pb-8 pt-7' : ''} mx-auto flex min-h-screen w-full max-w-[430px] flex-col`}>
        
        {renderStep()}
      </div>

      {/* One-time discount, fired the moment they commit to a term */}
      {offerPlan &&
      <LaunchOfferScreen
        onClaim={() => {
          setOfferPlan(null);
          setStep(16);
        }}
        onDismiss={() => {
          setOfferPlan(null);
          setStep(16);
        }}
        onRestore={() => setOfferPlan(null)} />

      }
    </main>);

}