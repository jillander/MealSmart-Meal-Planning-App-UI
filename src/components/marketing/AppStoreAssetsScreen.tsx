import React from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { AppIcon } from './AppIcon';
import { PhoneFrame } from './PhoneFrame';
import { StoreListingCopy } from './StoreListingCopy';
import {
  MatchesMockup,
  PlanMockup,
  ProgressMockup,
  ProofSlide,
  RemindersMockup,
  ScanMockup,
  ShoppingMockup } from
'./StoreMockups';

interface AppStoreAssetsScreenProps {
  navigateTo: (screen: string) => void;
}

interface Slide {
  headline: string;
  background: string;
  /** Headline colour, tuned per background for contrast. */
  ink: string;
  mockup?: React.ReactNode;
  full?: React.ReactNode;
}

const slides: Slide[] = [
{
  headline: 'Cook what you\nalready have',
  background: '#1A1A1A',
  ink: '#FFFFFF',
  mockup: <ScanMockup />
},
{
  headline: 'Scan it.\nGet dinner.',
  background: '#2F7D34',
  ink: '#FFFFFF',
  mockup: <MatchesMockup />
},
{
  headline: 'A plan that\nadapts to you',
  background: '#4CAF50',
  ink: '#FFFFFF',
  mockup: <PlanMockup />
},
{
  headline: 'See your\nprogress',
  background: '#F4EFE2',
  ink: '#1A1A1A',
  mockup: <ProgressMockup />
},
{
  headline: 'Lists that\nwrite themselves',
  background: '#1A1A1A',
  ink: '#FFFFFF',
  mockup: <ShoppingMockup />
},
{
  headline: 'Never miss\na meal',
  background: '#2F7D34',
  ink: '#FFFFFF',
  mockup: <RemindersMockup />
},
{
  headline: '',
  background: '#4CAF50',
  ink: '#FFFFFF',
  full: <ProofSlide />
}];


const iconVariants = [
{ variant: 'primary' as const, label: 'Cream' },
{ variant: 'dark' as const, label: 'Dark' },
{ variant: 'green' as const, label: 'Green' },
{ variant: 'monogram' as const, label: 'Monogram' }];


/** Store listing assets: the app icon set and the six screenshot frames. */
export function AppStoreAssetsScreen({ navigateTo }: AppStoreAssetsScreenProps) {
  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] pb-12">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-6 pb-4 pt-12 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            aria-label="Back to Today"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A1A1A] transition-colors hover:bg-[#E5E7EB]">
            
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-lg font-bold text-[#1A1A1A]">Store assets</h1>
        </div>
      </header>

      {/* App icon */}
      <section className="px-6 pt-7">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">App icon</h2>
        <div className="mt-3 flex flex-col items-center rounded-3xl bg-white p-6 shadow-sm">
          <AppIcon size={132} />
          <p className="mt-4 text-center text-sm font-semibold text-[#1A1A1A]">
            Cal in Quicksand, Pal in Pacifico
          </p>
          <p className="mt-1 max-w-[280px] text-center text-xs leading-relaxed text-[#68736D]">
            Near-black type on a warm cream field — no illustration, so it stays legible at
            40&nbsp;px on a home screen.
          </p>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {iconVariants.map((entry) =>
          <div
            key={entry.variant}
            className="flex flex-col items-center rounded-2xl bg-white p-2.5 shadow-sm">
            
              <AppIcon size={54} variant={entry.variant} />
              <span className="mt-2 text-center text-[9px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                {entry.label}
              </span>
            </div>
          )}
        </div>

        {/* Home-screen preview at true small scale */}
        <div className="mt-3 flex items-center gap-4 rounded-2xl bg-[#1A1A1A] p-4">
          <div className="flex flex-col items-center gap-1.5">
            <AppIcon size={44} />
            <span className="text-[9px] font-medium text-white/80">Cal Pal</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <AppIcon size={28} />
            <span className="text-[8px] font-medium text-white/60">28 px</span>
          </div>
          <p className="flex-1 text-[11px] leading-relaxed text-white/60">
            Legibility check at home-screen and Spotlight sizes.
          </p>
        </div>
      </section>

      {/* Screenshots */}
      <section className="pt-8">
        <div className="flex items-baseline justify-between px-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">
            App Store screenshots
          </h2>
          <span className="text-[11px] font-semibold text-[#94A3B8]">7 · 1290 × 2796</span>
        </div>
        <div className="mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 scrollbar-hide">
          {slides.map((slide, index) =>
          <figure
            key={index}
            className="w-[232px] shrink-0 snap-center overflow-hidden rounded-2xl shadow-md"
            style={{ background: slide.background }}>
            
              <div className="flex h-[502px] flex-col">
                {slide.full ?
              slide.full :

              <>
                    <h3
                  className="whitespace-pre-line px-5 pb-5 pt-8 text-[23px] font-extrabold leading-[1.12] tracking-tight"
                  style={{ color: slide.ink, fontFamily: 'var(--font-heading)' }}>
                  
                      {slide.headline}
                    </h3>
                    <PhoneFrame width={188} visibleRatio={0.97}>
                      {slide.mockup}
                    </PhoneFrame>
                  </>
              }
              </div>
            </figure>
          )}
        </div>
        <p className="px-6 text-[11px] leading-relaxed text-[#8A948F]">
          Each frame leads with one benefit in Nunito, then shows the real screen behind it — scan,
          matches, targets, projection, list, reminders, and social proof.
        </p>
      </section>

      <StoreListingCopy />
    </div>);

}