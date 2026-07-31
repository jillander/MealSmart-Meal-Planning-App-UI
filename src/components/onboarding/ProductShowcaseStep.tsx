import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, CheckIcon, ChevronRightIcon, ScanLineIcon, SparklesIcon } from 'lucide-react';

type ShowcaseMode = 'scan' | 'discover';
type ScanStage = 'frame' | 'detected' | 'matched';

interface ProductShowcaseStepProps {
  onContinue: () => void;
}

const recipeCards = [
{ title: 'Miso salmon bowl', detail: '520 cal · 38g protein', image: "/59e44392-6940-41f1-b50d-607efcf7856a.jpg" },
{ title: 'Roasted veg pasta', detail: '480 cal · 22g protein', image: "/875a016f-36a5-4502-9998-18926feb0a7a.jpg" },
{ title: 'Green chicken bowl', detail: '540 cal · 41g protein', image: "/83c9cf94-e7ec-4b5f-a426-703eeb37d6c6.jpg" }];


export function ProductShowcaseStep({ onContinue }: ProductShowcaseStepProps) {
  const [mode, setMode] = useState<ShowcaseMode>('scan');
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    if (mode !== 'discover' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setActiveCard((current) => (current + 1) % recipeCards.length), 2400);
    return () => window.clearInterval(timer);
  }, [mode]);

  return (
    <section className="flex min-h-[calc(100vh-104px)] flex-col text-center">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#4CAF50]">A smarter way to eat</p>
      <h1 className="mx-auto mt-2 max-w-[350px] text-[30px] font-extrabold leading-[1.1] tracking-tight">Turn what you have into a plan.</h1>
      <p className="mx-auto mt-3 max-w-[345px] text-[15px] leading-relaxed text-[#68736D]">Start with your ingredients or choose from recipes curated to fit your goals.</p>

      <div className="mx-auto mt-5 grid w-full max-w-[340px] grid-cols-2 rounded-2xl bg-[#EEF2EF] p-1">
        <ShowcaseTab active={mode === 'scan'} icon={<ScanLineIcon size={15} />} label="Scan to recipe" onClick={() => setMode('scan')} />
        <ShowcaseTab active={mode === 'discover'} icon={<SparklesIcon size={15} />} label="Discover" onClick={() => setMode('discover')} />
      </div>

      {mode === 'scan' ? <ScanJourney /> : <DiscoverJourney activeCard={activeCard} onSelect={setActiveCard} />}

      <div className="mt-5 space-y-2 text-left"><Benefit>Expert-picked recipes that fit your calorie goal.</Benefit><Benefit>One place to scan, discover, and make progress.</Benefit></div>
      <button type="button" onClick={onContinue} className="mt-auto flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] active:translate-y-0.5 active:shadow-[0_2px_0_#080808]">Make my plan <ArrowRightIcon className="ml-2" size={19} /></button>
    </section>);

}

function ShowcaseTab({ active, icon, label, onClick }: {active: boolean;icon: React.ReactNode;label: string;onClick: () => void;}) {
  return <button type="button" onClick={onClick} aria-pressed={active} className={`flex h-10 items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-colors ${active ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#68736D]'}`}>{icon}{label}</button>;
}

function ScanJourney() {
  const [stage, setStage] = useState<ScanStage>('frame');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStage('matched');
      return undefined;
    }
    const timeouts: number[] = [];
    const cycle = () => {
      setStage('frame');
      timeouts.push(window.setTimeout(() => setStage('detected'), 1250));
      timeouts.push(window.setTimeout(() => setStage('matched'), 2450));
    };
    cycle();
    const timer = window.setInterval(cycle, 5000);
    return () => {
      window.clearInterval(timer);
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  const isMatched = stage === 'matched';
  const isDetected = stage === 'detected' || isMatched;

  return (
    <div className="mx-auto mt-5 w-full max-w-[340px] overflow-hidden rounded-[28px] border-[6px] border-[#1A1A1A] bg-[#111] p-3 shadow-xl">
      <style>{`@keyframes cp-scan-line { 0%, 100% { transform: translateY(0); opacity: .45 } 50% { transform: translateY(126px); opacity: 1 } } @keyframes cp-scan-card { from { opacity: 0; transform: translateY(16px) scale(.97) } to { opacity: 1; transform: translateY(0) scale(1) } } @media (prefers-reduced-motion: reduce) { .cp-scan-line { animation: none !important; } }`}</style>
      <div className="relative h-[230px] overflow-hidden rounded-[18px]">
        <img src="/83c9cf94-e7ec-4b5f-a426-703eeb37d6c6.jpg" alt="Fresh ingredients ready to scan" className={`h-full w-full object-cover transition-opacity duration-500 ${isMatched ? 'opacity-50' : 'opacity-80'}`} />
        {!isMatched && <><span className="absolute left-4 top-4 h-8 w-8 rounded-tl-xl border-l-4 border-t-4 border-white" /><span className="absolute right-4 top-4 h-8 w-8 rounded-tr-xl border-r-4 border-t-4 border-white" /><span className="absolute bottom-4 left-4 h-8 w-8 rounded-bl-xl border-b-4 border-l-4 border-white" /><span className="absolute bottom-4 right-4 h-8 w-8 rounded-br-xl border-b-4 border-r-4 border-white" /><span className="cp-scan-line absolute inset-x-6 top-8 h-0.5 bg-[#7FD98A] shadow-[0_0_12px_#7FD98A]" style={{ animation: 'cp-scan-line 1.2s ease-in-out infinite' }} /></>}
        <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold text-white backdrop-blur">{stage === 'frame' ? 'Scanning ingredients' : stage === 'detected' ? 'Ingredients found' : 'Recipe match ready'}</div>
        {isDetected && !isMatched && <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 p-2.5 text-left shadow-lg" style={{ animation: 'cp-scan-card 300ms cubic-bezier(0.22, 1, 0.36, 1) both' }}><p className="text-[11px] font-bold text-[#1A1A1A]">Found: chicken, greens, rice</p><p className="mt-0.5 text-[10px] text-[#2F7D34]">Matching recipes to your ingredients…</p></div>}
        {isMatched && <div className="absolute inset-x-3 bottom-3 overflow-hidden rounded-2xl bg-white text-left shadow-xl" style={{ animation: 'cp-scan-card 350ms cubic-bezier(0.22, 1, 0.36, 1) both' }}><div className="flex gap-2.5 p-2.5"><img src={recipeCards[0].image} alt="Miso salmon bowl" className="h-14 w-14 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-xs font-extrabold text-[#1A1A1A]">Miso salmon bowl</p><p className="mt-0.5 text-[10px] text-[#68736D]">520 cal · 38g protein</p><span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-[#2F7D34]"><CheckIcon size={11} strokeWidth={3} /> 92% ingredient match</span></div></div></div>}
      </div>
      <div className="flex items-center justify-between px-2 pb-1 pt-3 text-left"><div><p className="text-xs font-bold text-white">Scan → match → cook</p><p className="mt-0.5 text-[10px] text-white/65">From your ingredients to a recipe suggestion.</p></div><ChevronRightIcon className="text-[#7FD98A]" size={20} /></div>
    </div>);

}

function DiscoverJourney({ activeCard, onSelect }: {activeCard: number;onSelect: (index: number) => void;}) {
  return <div className="mx-auto mt-5 w-full max-w-[340px] overflow-hidden rounded-[28px] border-[6px] border-[#1A1A1A] bg-[#F7FBF7] p-3 shadow-xl"><div className="flex items-center justify-between"><span className="text-sm font-extrabold text-[#1A1A1A]">Discover</span><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6F6E8] text-[#2F7D34]"><SparklesIcon size={16} /></span></div><div className="mt-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-left text-xs text-[#89938E] shadow-sm"><ScanLineIcon size={14} className="text-[#4CAF50]" /> Recipes matched to your goals</div><article className="mt-3 overflow-hidden rounded-2xl bg-white text-left shadow-sm"><img src={recipeCards[activeCard].image} alt="" className="h-28 w-full object-cover" /><div className="p-3"><p className="text-sm font-bold text-[#1A1A1A]">{recipeCards[activeCard].title}</p><p className="mt-1 text-[11px] text-[#68736D]">{recipeCards[activeCard].detail}</p><span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#EDF8EF] px-2 py-1 text-[10px] font-bold text-[#2F7D34]"><CheckIcon size={10} strokeWidth={3} /> Fits your plan</span></div></article><div className="mt-3 flex justify-center gap-1.5">{recipeCards.map((_, index) => <button key={index} type="button" onClick={() => onSelect(index)} aria-label={`Show recipe ${index + 1}`} className={`h-1.5 rounded-full transition-[width,background-color] ${activeCard === index ? 'w-5 bg-[#4CAF50]' : 'w-1.5 bg-[#D8DFDA]'}`} />)}</div></div>;
}

function Benefit({ children }: {children: React.ReactNode;}) {
  return <div className="flex items-center gap-2.5 text-sm text-[#3C463F]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4CAF50] text-white"><CheckIcon size={12} strokeWidth={3} /></span>{children}</div>;
}