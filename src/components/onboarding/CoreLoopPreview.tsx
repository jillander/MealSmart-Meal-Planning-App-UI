import React, { useEffect, useRef, useState } from 'react';
import {
  CameraIcon,
  CheckIcon,
  ImageIcon,
  ImportIcon,
  ShoppingBasketIcon,
  SparklesIcon,
  XIcon,
  ZapIcon } from
'lucide-react';
import { HomeScreen } from '../HomeScreen';
import { NavigationBar } from '../NavigationBar';
import { RecipeSuggestionScreen } from '../RecipeSuggestionScreen';

/** The beats of the recording, in the order they happen. */
type Beat = 'home' | 'menu' | 'camera' | 'capture' | 'reading' | 'results';

const beats: {id: Beat;duration: number;}[] = [
{ id: 'home', duration: 2000 },
{ id: 'menu', duration: 1800 },
{ id: 'camera', duration: 2800 },
{ id: 'capture', duration: 720 },
{ id: 'reading', duration: 2600 },
{ id: 'results', duration: 9000 }];


/** Four user-facing labels; each covers the beats that belong to that step. */
const railSteps = [
{ label: 'Open Cal Pal', beat: 'home' as Beat, covers: ['home', 'menu'] },
{ label: 'Scan your fridge', beat: 'camera' as Beat, covers: ['camera', 'capture'] },
{ label: 'Cal Pal reads it', beat: 'reading' as Beat, covers: ['reading'] },
{ label: 'Recipes that fit', beat: 'results' as Beat, covers: ['results'] }];


const detections = ['Chicken', 'Spinach', 'Peppers', 'Tomatoes'];

const readingSteps = ['Reading your ingredients', 'Matching to your targets'];

const FRIDGE = "/77337459-d221-4d34-a908-139c8eb1e1fa.jpg";


/** The phone is authored at true iPhone width, then scaled down as one unit. */
const BASE_WIDTH = 390;
const SCREEN_WIDTH = 178;
const SCREEN_HEIGHT = 336;
const SCALE = SCREEN_WIDTH / BASE_WIDTH;
/** Authored height that maps to the visible screen, so bottom chrome lands right. */
const BASE_HEIGHT = Math.round(SCREEN_HEIGHT / SCALE);

/**
 * A looping demo of Cal Pal's core loop, played on a phone raised into an open
 * fridge: open the app, tap the + to capture ingredients, shoot the fridge in
 * the app's camera, let Cal Pal read it, then scroll the real recipe results.
 */
export function CoreLoopPreview() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [readingStep, setReadingStep] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const readingTimer = useRef<number | undefined>(undefined);
  const screen = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | undefined>(undefined);

  const beat = beats[index].id;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Land on the payoff and let the viewer step through it themselves.
      setIndex(beats.length - 1);
      setIsPaused(true);
      return undefined;
    }
    if (isPaused) return undefined;
    timer.current = window.setTimeout(
      () => setIndex((current) => (current + 1) % beats.length),
      beats[index].duration
    );
    return () => window.clearTimeout(timer.current);
  }, [index, isPaused]);

  useEffect(() => {
    if (beat !== 'reading') return undefined;
    setReadingStep(0);
    readingTimer.current = window.setTimeout(() => setReadingStep(1), 1300);
    return () => window.clearTimeout(readingTimer.current);
  }, [beat]);

  /** Drift the real results list down the page so more recipes come into view. */
  useEffect(() => {
    if (beat !== 'results') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let start = 0;
    const run = (now: number) => {
      const list = screen.current?.querySelector<HTMLElement>('.overflow-y-auto');
      if (!list) {
        frame.current = window.requestAnimationFrame(run);
        return;
      }
      if (!start) start = now;
      const elapsed = now - start;
      const distance = list.scrollHeight - list.clientHeight;
      // Hold on the top match, then travel the whole list so every recipe shows.
      const progress = Math.min(Math.max((elapsed - 1100) / 7200, 0), 1);
      list.scrollTop = distance * progress;
      if (progress < 1) frame.current = window.requestAnimationFrame(run);
    };
    frame.current = window.requestAnimationFrame(run);
    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [beat, index]);

  const jumpTo = (target: Beat) => {
    window.clearTimeout(timer.current);
    setIndex(beats.findIndex((item) => item.id === target));
    setIsPaused(true);
  };

  const isApp = beat === 'home' || beat === 'menu';
  const isCamera = beat === 'camera' || beat === 'capture';
  /** The fridge is only behind the phone while it is being photographed. */
  const showFridge = isCamera || beat === 'reading';
  const railIndex = railSteps.findIndex((step) => step.covers.includes(beat));

  return (
    <div className="w-full">
      <style>{`
        @keyframes cp-rise { 0% { transform: translate(58%, 52%) rotate(13deg) scale(.94) } 100% { transform: translate(0,0) rotate(0) scale(1) } }
        @keyframes cp-tap { 0% { opacity: 0; transform: scale(.4) } 30% { opacity: .9 } 100% { opacity: 0; transform: scale(1.5) } }
        @keyframes cp-menu-in { from { opacity: 0; transform: translate(-50%, 12px) scale(.96) } to { opacity: 1; transform: translate(-50%, 0) scale(1) } }
        @keyframes cp-open { from { opacity: 0; transform: scale(1.08) } to { opacity: 1; transform: scale(1) } }
        @keyframes cp-bracket { from { opacity: 0; transform: scale(1.16) } to { opacity: 1; transform: scale(1) } }
        @keyframes cp-chip { from { opacity: 0; transform: translateY(10px) scale(.9) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes cp-flash { 0% { opacity: 0 } 14% { opacity: .95 } 100% { opacity: 0 } }
        @keyframes cp-shutter { 0% { transform: scale(1) } 38% { transform: scale(.8) } 100% { transform: scale(1) } }
        @keyframes cp-veil { from { transform: translateY(0) } to { transform: translateY(-101%) } }
        @keyframes cp-shimmer { 0% { transform: translateX(-120%) } 100% { transform: translateX(120%) } }
        @keyframes cp-halo { 0%, 100% { opacity: .3; transform: scale(1) } 50% { opacity: .58; transform: scale(1.05) } }
        @keyframes cp-fade-up { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes cp-rec { 0%, 100% { opacity: 1 } 50% { opacity: .3 } }
        /* The tab bar is supplied separately, so the page's own bar stays hidden. */
        .cp-home nav { display: none !important; }
        /* Bind the results page to the phone screen so its list scrolls in view. */
        .cp-results > div { height: 100% !important; min-height: 0 !important; }
        @media (prefers-reduced-motion: reduce) {
          .cp-anim { animation: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
        }
      `}</style>

      {/* Stage — a clean surface, with the fridge appearing only at the camera */}
      <div className="relative mx-auto h-[372px] w-full max-w-[318px] overflow-hidden rounded-[28px] bg-[#ECF1EC]">
        <img
          src={FRIDGE}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full scale-110 object-cover blur-[2px] brightness-[0.82] transition-opacity duration-500 ease-out ${
          showFridge ? 'opacity-100' : 'opacity-0'}`
          } />
        

        {/* The phone itself */}
        <div className="absolute inset-0 flex items-start justify-center pt-4">
          <div
            key={beat === 'home' ? 'lift' : 'settled'}
            className="cp-anim relative"
            style={
            beat === 'home' ?
            { animation: 'cp-rise 1.6s cubic-bezier(0.23,1,0.32,1) both' } :
            undefined
            }>
            
            {/* Machined side buttons */}
            <span className="absolute -left-[4px] top-[70px] h-8 w-[3px] rounded-l-sm bg-[#5B6460]" />
            <span className="absolute -left-[4px] top-[112px] h-11 w-[3px] rounded-l-sm bg-[#5B6460]" />
            <span className="absolute -right-[4px] top-[96px] h-14 w-[3px] rounded-r-sm bg-[#5B6460]" />

            {/* Contact shadow, so the device sits in the scene */}
            <span className="absolute -bottom-3 left-1/2 h-6 w-[78%] -translate-x-1/2 rounded-[100%] bg-black/35 blur-lg" />

            <div className="relative overflow-hidden rounded-[32px] bg-[#8E9793] p-[1px] shadow-[0_26px_48px_-16px_rgba(6,10,8,0.65)]">
              <div className="overflow-hidden rounded-[31px] border-[4px] border-[#141716] bg-[#141716]">
              <div
                  className="relative overflow-hidden rounded-[26px] bg-black"
                  style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}>
                  
                {/* Everything inside the screen is authored at 390px, then scaled */}
                <div
                    ref={screen}
                    style={{
                      width: BASE_WIDTH,
                      height: BASE_HEIGHT,
                      transform: `scale(${SCALE})`,
                      transformOrigin: 'top left'
                    }}>
                    
                  {isApp &&
                    <div className="pointer-events-none relative h-full w-full" aria-hidden="true">
                      <div className="cp-home">
                        <HomeScreen navigateTo={() => undefined} />
                      </div>
                      {/* The app's real tab bar, with the + centred */}
                      <NavigationBar currentScreen="home" navigateTo={() => undefined} />

                      {/* The + being tapped */}
                      {beat === 'home' &&
                      <span
                        className="cp-anim absolute left-1/2 z-40 h-[76px] w-[76px] -translate-x-1/2 rounded-full border-[3px] border-[#1A1A1A]/45 bg-[#1A1A1A]/15"
                        style={{
                          bottom: 28,
                          animation: 'cp-tap 1s cubic-bezier(0.23,1,0.32,1) .8s both'
                        }} />

                      }

                      {/* The menu that + opens, with capture about to be chosen */}
                      {beat === 'menu' && <PlusMenu />}
                    </div>
                    }

                  {isCamera && <CameraScreen beat={beat} />}
                  {beat === 'reading' && <ReadingScreen step={readingStep} />}
                  {beat === 'results' &&
                    <div
                      className="cp-results pointer-events-none h-full w-full overflow-hidden"
                      aria-hidden="true">
                      
                      <RecipeSuggestionScreen navigateTo={() => undefined} />
                    </div>
                    }
                </div>

                {/* Dynamic Island */}
                <div className="absolute left-1/2 top-[6px] h-[11px] w-[46px] -translate-x-1/2 rounded-full bg-[#0B0D0C]" />

                {/* Glass glare across the panel */}
                <span className="pointer-events-none absolute -left-8 -top-10 h-[150%] w-16 rotate-[22deg] bg-white/10 blur-md" />
                <span className="pointer-events-none absolute left-6 -top-10 h-[150%] w-4 rotate-[22deg] bg-white/[0.07] blur-md" />
                <span className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/10" />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage rail — names the loop and lets the viewer scrub it */}
      <div className="mx-auto mt-5 flex w-full max-w-[300px] items-center gap-1.5">
        {railSteps.map((step, position) =>
        <button
          key={step.label}
          type="button"
          onClick={() => jumpTo(step.beat)}
          aria-label={step.label}
          aria-current={railIndex === position}
          className="group flex-1 pb-1 pt-2">
          
            <span
            className={`block h-[3px] w-full rounded-full transition-colors duration-200 ${
            railIndex === position ? 'bg-[#1A1A1A]' : 'bg-[#DCE3DE] group-hover:bg-[#BFC9C3]'}`
            } />
          
          </button>
        )}
      </div>
      <p
        key={railIndex}
        className="cp-anim mt-1 text-center text-[13px] font-bold text-[#1A1A1A]"
        style={{ animation: 'cp-fade-up .3s ease-out both' }}>
        
        {railSteps[railIndex]?.label}
      </p>
    </div>);

}

/** The app's + menu exactly as the tab bar opens it, with capture being chosen. */
function PlusMenu() {
  return (
    <>
      <div className="absolute inset-0 z-30 bg-black/30" />

      {/* The + turns into a close button while the menu is open */}
      <span
        className="absolute left-1/2 z-40 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#1A1A1A] text-white shadow-lg"
        style={{ bottom: 38 }}>
        
        <XIcon size={24} />
      </span>

      <div
        className="cp-anim absolute left-1/2 z-40 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
        style={{ bottom: 110, animation: 'cp-menu-in .22s ease-out both' }}>
        
        <div className="relative flex items-center border-b border-gray-100 bg-[#F4FAF4] px-4 py-4">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#4CAF50] bg-opacity-10">
            <CameraIcon size={18} className="text-[#4CAF50]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#1A1A1A]">Capture new ingredients</p>
            <p className="text-xs text-[#757575]">Scan food from your fridge</p>
          </div>
          <span
            className="cp-anim absolute left-7 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full border-[3px] border-[#4CAF50]/70 bg-[#4CAF50]/20"
            style={{ animation: 'cp-tap .9s cubic-bezier(0.23,1,0.32,1) .6s both' }} />
          
        </div>
        <div className="flex items-center border-b border-gray-100 px-4 py-4">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#2196F3] bg-opacity-10">
            <ImportIcon size={18} className="text-[#2196F3]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#1A1A1A]">Import from recipe sites</p>
            <p className="text-xs text-[#757575]">Add recipes from websites</p>
          </div>
        </div>
        <div className="flex items-center border-b border-gray-100 px-4 py-4">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A]">
            <CameraIcon size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#1A1A1A]">Snap a meal</p>
            <p className="text-xs text-[#757575]">Log calories from a photo</p>
          </div>
        </div>
        <div className="flex items-center px-4 py-4">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F59E0B] bg-opacity-10">
            <ShoppingBasketIcon size={18} className="text-[#F59E0B]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#1A1A1A]">Shopping list</p>
            <p className="text-xs text-[#757575]">Ingredients you still need</p>
          </div>
        </div>
      </div>
    </>);

}

/** Cal Pal's ingredient camera: mode tabs, framing guides, and the shutter. */
function CameraScreen({ beat }: {beat: Beat;}) {
  return (
    <div
      className="cp-anim relative h-full w-full"
      style={{ animation: 'cp-open .3s cubic-bezier(0.23,1,0.32,1) both' }}>
      
      <img src={FRIDGE} alt="" className="h-full w-full object-cover" />

      {/* Header and capture mode, as in the app's capture screen */}
      <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent px-6 pb-12 pt-4">
        <div className="flex items-center justify-between text-white">
          <span className="text-[15px] font-bold tracking-tight">9:41</span>
          <StatusIcons tone="light" />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
            <XIcon size={20} strokeWidth={2.5} />
          </span>
          <p className="text-[17px] font-bold text-white">Capture ingredients</p>
          <span className="h-11 w-11" />
        </div>
        <div className="mt-4 flex rounded-full bg-black/35 p-1 backdrop-blur-sm">
          <span className="flex-1 rounded-full bg-[#4CAF50] py-2 text-center text-[14px] font-bold text-white">
            Fridge photo
          </span>
          <span className="flex-1 rounded-full py-2 text-center text-[14px] font-semibold text-white/80">
            Receipt scan
          </span>
        </div>
      </div>

      {/* Framing guides */}
      <div className="absolute inset-x-12 bottom-[264px] top-[228px]">
        <div className="absolute inset-0 rounded-2xl border-2 border-white/45" />
        {[
        'left-0 top-0 border-l-[4px] border-t-[4px] rounded-tl-2xl',
        'right-0 top-0 border-r-[4px] border-t-[4px] rounded-tr-2xl',
        'left-0 bottom-0 border-b-[4px] border-l-[4px] rounded-bl-2xl',
        'right-0 bottom-0 border-b-[4px] border-r-[4px] rounded-br-2xl'].
        map((position) =>
        <span
          key={position}
          className={`cp-anim absolute h-14 w-14 border-[#7FD98A] ${position}`}
          style={{ animation: 'cp-bracket .34s cubic-bezier(0.23,1,0.32,1) .5s both' }} />

        )}
      </div>

      {beat === 'camera' &&
      <>
          <span
          className="cp-anim absolute left-1/2 top-[188px] -translate-x-1/2 rounded-full bg-black/55 px-4 py-1.5 text-[14px] font-semibold text-white backdrop-blur-sm"
          style={{ animation: 'cp-chip .3s ease-out .75s both' }}>
          
            Position your ingredients in frame
          </span>

          <div className="absolute inset-x-0 bottom-[224px] flex flex-wrap justify-center gap-2 px-8">
            {detections.map((label, position) =>
          <span
            key={label}
            className="cp-anim flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[14px] font-bold text-[#1A1A1A] shadow-md"
            style={{
              animation: `cp-chip .38s cubic-bezier(0.23,1,0.32,1) ${
              1.25 + position * 0.24}s both`

            }}>
            
                <CheckIcon size={13} strokeWidth={3.5} className="text-[#2F7D34]" />
                {label}
              </span>
          )}
          </div>
        </>
      }

      {/* Camera chrome */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 bg-gradient-to-t from-[#0B0D0C] via-[#0B0D0C]/65 to-transparent pb-10 pt-20">
        <span className="flex items-center gap-2 text-[13px] font-semibold text-white/85">
          <span
            className="cp-anim h-2 w-2 rounded-full bg-[#7FD98A]"
            style={{ animation: 'cp-rec 1.1s ease-in-out infinite' }} />
          
          Detecting ingredients
        </span>
        <div className="flex w-full items-center justify-between px-12">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
            <ImageIcon size={19} />
          </span>
          <span
            className="cp-anim flex h-[62px] w-[62px] items-center justify-center rounded-full border-[4px] border-white/85"
            style={
            beat === 'capture' ?
            { animation: 'cp-shutter .44s cubic-bezier(0.23,1,0.32,1) both' } :
            undefined
            }>
            
            <span className="h-[44px] w-[44px] rounded-full bg-white/90" />
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
            <ZapIcon size={19} />
          </span>
        </div>
      </div>

      {beat === 'capture' &&
      <div
        className="cp-anim pointer-events-none absolute inset-0 bg-white"
        style={{ animation: 'cp-flash .5s ease-out both' }} />

      }
    </div>);

}

/** The app's analysis treatment: the shot itself carries the loading. */
function ReadingScreen({ step }: {step: number;}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#0B0D0C] px-10">
      <div className="relative flex h-[300px] w-[300px] items-center justify-center">
        <span
          className="cp-anim absolute inset-0 rounded-full bg-[#4CAF50]/25 blur-2xl"
          style={{ animation: 'cp-halo 2s ease-in-out infinite' }} />
        
        <div className="relative h-[270px] w-[270px] overflow-hidden rounded-full">
          <img src={FRIDGE} alt="" className="h-full w-full object-cover" />
          <div
            className="cp-anim absolute inset-0 bg-white/45 backdrop-blur-[5px]"
            style={{ animation: 'cp-veil 2.4s cubic-bezier(0.23,1,0.32,1) both' }} />
          
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <span
              className="cp-anim absolute inset-y-0 w-2/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
              style={{ animation: 'cp-shimmer 1.5s ease-in-out infinite' }} />
            
          </div>
        </div>
      </div>

      <p
        key={step}
        className="cp-anim mt-9 text-center text-[24px] font-bold leading-tight text-white"
        style={{ animation: 'cp-fade-up .3s ease-out both' }}>
        
        {readingSteps[step]}
      </p>
      <p className="mt-3 flex items-center gap-2 text-[17px] font-semibold text-[#8BD98F]">
        <SparklesIcon size={17} /> Powered by Cal Pal AI
      </p>
      <div className="mt-7 h-[5px] w-56 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-[#7FD98A] transition-[width] duration-[1200ms] ease-out"
          style={{ width: step === 0 ? '38%' : '96%' }} />
        
      </div>
    </div>);

}

/** Tiny signal and battery marks, so the frame reads as a real screen. */
function StatusIcons({ tone }: {tone: 'light' | 'dark';}) {
  const fill = tone === 'light' ? 'bg-white' : 'bg-[#1A1A1A]';
  const border = tone === 'light' ? 'border-white/80' : 'border-[#1A1A1A]/70';
  return (
    <span className="flex items-center gap-2">
      <span className="flex items-end gap-[3px]">
        {[6, 9, 12, 15].map((height) =>
        <span key={height} className={`w-[3px] rounded-sm ${fill}`} style={{ height }} />
        )}
      </span>
      <span className={`ml-1 h-[14px] w-[25px] rounded-[4px] border ${border} p-[2px]`}>
        <span className={`block h-full w-[70%] rounded-[1px] ${fill}`} />
      </span>
    </span>);

}