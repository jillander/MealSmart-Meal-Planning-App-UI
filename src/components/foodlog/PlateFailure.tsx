import React from 'react';
import {
  ArrowLeftIcon,
  CameraIcon,
  ImageIcon,
  LayersIcon,
  MaximizeIcon,
  ScanSearchIcon,
  SunIcon } from
'lucide-react';

interface PlateFailureProps {
  /** The photo that failed, shown back so the user can see what went wrong. */
  image: string;
  /** How many attempts have failed in a row. Drives the escalated message. */
  failures: number;
  onRetake: () => void;
  onPickFromLibrary: () => void;
  onCancel: () => void;
}

const tips = [
{
  icon: SunIcon,
  title: 'Find better light',
  body: 'Daylight or a bright kitchen light beats a dim table.'
},
{
  icon: MaximizeIcon,
  title: 'Fit the whole plate',
  body: 'Step back so nothing is cropped off the edges.'
},
{
  icon: LayersIcon,
  title: 'One plate at a time',
  body: 'Clear away packaging, phones, and other dishes.'
},
{
  icon: ScanSearchIcon,
  title: 'Shoot from above',
  body: 'A straight-down angle shows portion sizes clearly.'
}];


/**
 * Shown when the vision model returns nothing usable. The photo stays on
 * screen so the tips read as advice about this shot, not generic help text.
 */
export function PlateFailure({
  image,
  failures,
  onRetake,
  onPickFromLibrary,
  onCancel
}: PlateFailureProps) {
  const repeated = failures > 1;

  return (
    <section className="min-h-screen w-full bg-[#F8F9FA] pb-36">
      <header className="flex items-center gap-3 px-5 pb-2 pt-12">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Back to Today"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1A1A1A] shadow-sm transition-colors hover:bg-[#F1F5F3]">
          
          <ArrowLeftIcon size={19} />
        </button>
        <h1 className="text-[15px] font-bold text-[#1A1A1A]">Snap a meal</h1>
      </header>

      <div className="px-5 pt-4">
        {/* The photo that failed */}
        <div className="relative mx-auto h-[186px] w-[186px] overflow-hidden rounded-full shadow-md">
          <img src={image} alt="The photo Cal Pal could not read" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#0B0D0C]/55 backdrop-blur-[3px]" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#B45309] shadow-lg">
              <ScanSearchIcon size={26} />
            </span>
          </div>
        </div>

        <div className="mt-7 text-center">
          <h2 className="text-[26px] font-extrabold leading-[1.12] tracking-tight text-[#1A1A1A]">
            {repeated ? 'Still no luck reading that one' : 'We couldn’t read that plate'}
          </h2>
          <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-relaxed text-[#68736D]">
            {repeated ?
            'Tricky lighting and busy backgrounds are usually the culprit. One clear shot from above is normally all it takes.' :
            'Nothing on the plate came back clearly enough to count. A quick retake with the tips below almost always works.'}
          </p>
        </div>

        {/* Tips — the actual instruction for a better result */}
        <h3 className="mb-3 mt-8 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#94A3B8]">
          For a clear result
        </h3>
        <ul className="space-y-2.5">
          {tips.map((tip) =>
          <li key={tip.title} className="flex items-start gap-3.5 rounded-2xl bg-white p-4 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDF8EF] text-[#2F7D34]">
                <tip.icon size={18} strokeWidth={2.2} />
              </span>
              <span className="min-w-0">
                <span className="block text-[14px] font-bold leading-tight text-[#1A1A1A]">
                  {tip.title}
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-[#68736D]">
                  {tip.body}
                </span>
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Actions */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-100 bg-white/95 px-5 pb-7 pt-4 backdrop-blur">
        <div className="mx-auto max-w-[430px]">
          <button
            type="button"
            onClick={onRetake}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A] active:scale-[0.99]">
            
            <CameraIcon size={19} className="mr-2" /> Retake with these tips
          </button>
          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={onPickFromLibrary}
              className="flex items-center gap-1.5 py-1 text-sm font-semibold text-[#1A1A1A] hover:opacity-70">
              
              <ImageIcon size={16} /> Pick a clearer photo
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="py-1 text-sm font-semibold text-[#8A948F] hover:text-[#1A1A1A]">
              
              Not now
            </button>
          </div>
        </div>
      </div>
    </section>);

}