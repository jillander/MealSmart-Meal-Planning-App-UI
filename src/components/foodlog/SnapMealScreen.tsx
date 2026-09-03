import React, { useRef, useState } from 'react';
import {
  ArrowLeftIcon,
  CameraIcon,
  ImageIcon,
  InfoIcon,
  ScanLineIcon } from
'lucide-react';
import { PlateAnalyzing } from './PlateAnalyzing';
import { PlateFailure } from './PlateFailure';
import { PlateResult } from './PlateResult';
import { getPlateAnalysis } from '../../data/plateAnalyses';
import type { DetectedFood, MealSlot, PlateAnalysis } from '../../types/foodLog';
import { totalMacros } from '../../types/foodLog';
import { useMealPlan } from '../../contexts/MealPlanContext';
import { haptic } from '../../lib/haptics';

interface SnapMealScreenProps {
  navigateTo: (screen: string) => void;
  /** Preselected slot when opened from a meal section. */
  initialMealSlot?: MealSlot;
  onLogged: (summary: string) => void;
  /** Preview hook: makes the next read come back empty. */
  startFailed?: boolean;
}

type Stage = 'capture' | 'analyzing' | 'result' | 'failed';

const tips = [
'Fit the whole plate in frame',
'Shoot from above, in good light',
'One plate at a time works best'];


/** Photograph a meal you already ate and log its calories and macros. */
export const SnapMealScreen: React.FC<SnapMealScreenProps> = ({
  navigateTo,
  initialMealSlot,
  onLogged,
  startFailed = false
}) => {
  const { logPhotoMeal } = useMealPlan();
  const [stage, setStage] = useState<Stage>(startFailed ? 'failed' : 'capture');
  const [attempt, setAttempt] = useState(0);
  const [failures, setFailures] = useState(startFailed ? 1 : 0);
  const [analysis, setAnalysis] = useState<PlateAnalysis>(() => getPlateAnalysis(0));
  const [mealSlot, setMealSlot] = useState<MealSlot>(initialMealSlot ?? suggestSlot());
  const fileInput = useRef<HTMLInputElement>(null);
  const objectUrl = useRef<string>('');

  const startAnalysis = (imageOverride?: string) => {
    haptic('selection');
    const next = getPlateAnalysis(attempt);
    setAnalysis(imageOverride ? { ...next, image: imageOverride } : next);
    setAttempt((current) => current + 1);
    setStage('analyzing');
  };

  /** Records a read that came back empty so the failure copy can escalate. */
  const handleFailedRead = () => {
    setFailures((count) => count + 1);
    haptic('light');
    setStage('failed');
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(file);
    startAnalysis(objectUrl.current);
  };

  const handleConfirm = (name: string, items: DetectedFood[]) => {
    const totals = totalMacros(items);
    haptic('selection');
    logPhotoMeal(
      {
        name,
        image: analysis.image,
        calories: Math.round(totals.calories),
        protein: Math.round(totals.protein),
        carbs: Math.round(totals.carbs),
        fat: Math.round(totals.fat)
      },
      new Date(),
      mealSlot
    );
    onLogged(`${Math.round(totals.calories)} calories logged to ${mealSlot}`);
    navigateTo('home');
  };

  if (stage === 'analyzing') {
    return (
      <PlateAnalyzing
        image={analysis.image}
        onDone={() =>
        // Nothing recognised on the plate means there is nothing to log.
        analysis.items.length === 0 ? handleFailedRead() : setStage('result')
        } />);


  }

  if (stage === 'failed') {
    return (
      <>
        <PlateFailure
          image={analysis.image}
          failures={failures}
          onRetake={() => setStage('capture')}
          onPickFromLibrary={() => fileInput.current?.click()}
          onCancel={() => navigateTo('home')} />
        
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden" />
        
      </>);

  }

  if (stage === 'result') {
    return (
      <PlateResult
        analysis={analysis}
        mealSlot={mealSlot}
        onMealSlotChange={setMealSlot}
        onRetake={() => setStage('capture')}
        onCancel={() => navigateTo('home')}
        onConfirm={handleConfirm} />);


  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0B0D0C]">
      {/* Viewfinder */}
      <img
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/80" />

      <div className="relative flex min-h-screen flex-col px-6 pb-10 pt-12">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            aria-label="Close camera"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25">
            
            <ArrowLeftIcon size={20} />
          </button>
          <span className="rounded-full bg-white/15 px-3.5 py-2 text-xs font-bold text-white backdrop-blur">
            Snap what you ate
          </span>
          <span className="h-10 w-10" aria-hidden="true" />
        </div>

        {/* Framing guide */}
        <div className="mt-10 flex flex-1 items-center justify-center">
          <div className="relative aspect-square w-[78%] max-w-[300px]">
            {['left-0 top-0 border-l-4 border-t-4 rounded-tl-3xl',
            'right-0 top-0 border-r-4 border-t-4 rounded-tr-3xl',
            'left-0 bottom-0 border-l-4 border-b-4 rounded-bl-3xl',
            'right-0 bottom-0 border-r-4 border-b-4 rounded-br-3xl'].
            map((corner) =>
            <span
              key={corner}
              className={`absolute h-12 w-12 border-white/85 ${corner}`}
              aria-hidden="true" />

            )}
            <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-black/45 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur">
              <ScanLineIcon size={14} /> Center your plate
            </span>
          </div>
        </div>

        {/* Tips */}
        <div className="mb-7 rounded-2xl bg-white/10 p-4 backdrop-blur">
          <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-white/70">
            <InfoIcon size={13} /> For the best read
          </p>
          <ul className="mt-2 space-y-1">
            {tips.map((tip) =>
            <li key={tip} className="text-[13px] leading-relaxed text-white/85">
                {tip}
              </li>
            )}
          </ul>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="flex flex-col items-center gap-1.5 text-white/80 transition-colors hover:text-white">
            
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <ImageIcon size={20} />
            </span>
            <span className="text-[11px] font-semibold">Library</span>
          </button>

          <button
            type="button"
            onClick={() => startAnalysis()}
            aria-label="Take a photo of your meal"
            className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white shadow-xl transition-transform active:scale-95">
            
            <span className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#1A1A1A] text-white">
              <CameraIcon size={26} />
            </span>
          </button>

          <span className="w-12" aria-hidden="true" />
        </div>

        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden" />
        
      </div>
    </section>);

};

/** Guesses the meal slot from the time of day so the user rarely changes it. */
function suggestSlot(): MealSlot {
  const hour = new Date().getHours();
  if (hour < 11) return 'breakfast';
  if (hour < 15) return 'lunch';
  if (hour < 18) return 'snack';
  return 'dinner';
}