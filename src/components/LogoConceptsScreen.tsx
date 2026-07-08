import React, { useState, Component } from 'react';
import { ArrowLeftIcon, CheckIcon } from 'lucide-react';
interface LogoConceptsScreenProps {
  navigateTo: (screen: string) => void;
}
// --- Custom SVG Marks ---
const MarkCRing = ({ color, size = 40 }: {color: string;size?: number;}) =>
<svg
  width={size}
  height={size}
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  
    <path
    d="M37 13.5C33.7 9.2 28.6 6.5 23 6.5C13.3 6.5 5.5 14.3 5.5 24C5.5 33.7 13.3 41.5 23 41.5C32.7 41.5 40.5 33.7 40.5 24"
    stroke={color}
    strokeWidth="6.5"
    strokeLinecap="round" />
  
    <path
    d="M40.2 23.8C43.6 22.6 45.8 19.4 45.5 15.8C42 16.2 39.1 18.6 38.2 21.9C37.1 19.6 34.7 18.1 32 18.1C34.1 21.6 37 23.8 40.2 23.8Z"
    fill={color} />
  
  </svg>;

const MarkBanana = ({ color, size = 40 }: {color: string;size?: number;}) =>
<svg
  width={size}
  height={size}
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  
    <path
    d="M12 8C10 12 8 19 8 26C8 33 12 38 18 41C24 44 31 42 35 38C39 34 41 28 40 22C39 16 35 12 30 10C25 8 19 7 12 8Z"
    fill={color}
    opacity="0.2" />
  
    <path
    d="M14 10C12 14 10 20 10 26C10 32 13 37 19 39.6C24 42 30 41 33.6 37.6C37 34 38.6 29 37.6 23.6C36.6 18 33 14 29 12C24 10 19 9 14 10Z"
    fill={color} />
  
    <circle cx="22" cy="24" r="2.5" fill="#fff" />
    <circle cx="30" cy="22" r="2.5" fill="#fff" />
    <path
    d="M24 29C25 30.5 27 30.5 28 29"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round" />
  
  </svg>;

const MarkAvocado = ({
  color,
  size = 40



}: {color: string;size?: number;}) =>
<svg
  width={size}
  height={size}
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  
    <path
    d="M24 4C15 4 8 16 8 30C8 40 15 44 24 44C33 44 40 40 40 30C40 16 33 4 24 4Z"
    fill={color}
    opacity="0.2" />
  
    <path
    d="M24 8C17 8 12 18 12 30C12 38 17 40 24 40C31 40 36 38 36 30C36 18 31 8 24 8Z"
    fill={color} />
  
    <circle cx="24" cy="30" r="7" fill="#fff" opacity="0.3" />
    <circle cx="20" cy="20" r="2.5" fill="#fff" />
    <circle cx="28" cy="20" r="2.5" fill="#fff" />
    <path
    d="M22 24C23 25.5 25 25.5 26 24"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round" />
  
  </svg>;

const MarkFlame = ({ color, size = 40 }: {color: string;size?: number;}) =>
<svg
  width={size}
  height={size}
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  
    <path
    d="M24 4C24 4 10 18 10 32C10 39.732 16.268 46 24 46C31.732 46 38 39.732 38 32C38 18 24 4 24 4Z"
    fill={color} />
  
    <path
    d="M24 16C24 16 16 26 16 34C16 38.418 19.582 42 24 42C28.418 42 32 38.418 32 34C32 26 24 16 24 16Z"
    fill="#fff"
    opacity="0.3" />
  
    <circle cx="20" cy="32" r="2.5" fill="#fff" />
    <circle cx="28" cy="32" r="2.5" fill="#fff" />
    <path
    d="M22 37C23 38.5 25 38.5 26 37"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round" />
  
  </svg>;

const MarkBowl = ({ color, size = 40 }: {color: string;size?: number;}) =>
<svg
  width={size}
  height={size}
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  
    <path
    d="M6 24C6 33.941 14.0589 42 24 42C33.9411 42 42 33.941 42 24H6Z"
    fill={color} />
  
    <path
    d="M24 4L25.5 12.5L34 14L25.5 15.5L24 24L22.5 15.5L14 14L22.5 12.5L24 4Z"
    fill={color} />
  
  </svg>;

const MarkPlate = ({ color, size = 40 }: {color: string;size?: number;}) =>
<svg
  width={size}
  height={size}
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  
    <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="6" />
    <path d="M24 4A20 20 0 0 1 44 24H24V4Z" fill={color} />
  </svg>;

// --- Data ---
const concepts = [
{
  id: 'c-ring',
  name: 'Minimal C-Ring',
  desc: 'Clean, abstract calorie progress ring.',
  icon: MarkCRing
},
{
  id: 'banana',
  name: 'Banana Pal (Mascot)',
  desc: 'A polished, modern take on the original mascot.',
  icon: MarkBanana
},
{
  id: 'avocado',
  name: 'Avocado Pal (Mascot)',
  desc: 'Friendly, healthy, and approachable.',
  icon: MarkAvocado
},
{
  id: 'flame',
  name: 'Flame Buddy (Mascot)',
  desc: 'Energetic and motivating calorie burn.',
  icon: MarkFlame
},
{
  id: 'bowl',
  name: 'Spark Bowl',
  desc: 'Fresh recipes generated from your budget.',
  icon: MarkBowl
},
{
  id: 'plate',
  name: 'Plate Chart',
  desc: 'Data-driven, geometric, and precise.',
  icon: MarkPlate
}];

interface Palette {
  id: string;
  name: string;
  accent: string;
  ink: string;
  tileBg: string;
  tileFg: string;
}
const palettes: Palette[] = [
{
  id: 'forest',
  name: 'Forest Fresh',
  accent: '#16A34A',
  ink: '#14241B',
  tileBg: '#16A34A',
  tileFg: '#FFFFFF'
},
{
  id: 'ink-lime',
  name: 'Ink & Lime',
  accent: '#84CC16',
  ink: '#1A1A1A',
  tileBg: '#1A1A1A',
  tileFg: '#84CC16'
},
{
  id: 'sunrise',
  name: 'Sunrise Coral',
  accent: '#F97316',
  ink: '#1C1917',
  tileBg: '#F97316',
  tileFg: '#FFFFFF'
},
{
  id: 'berry',
  name: 'Berry Pop',
  accent: '#E11D6B',
  ink: '#1A1A1A',
  tileBg: '#E11D6B',
  tileFg: '#FFFFFF'
},
{
  id: 'ocean',
  name: 'Ocean Teal',
  accent: '#0D9488',
  ink: '#13262A',
  tileBg: '#0D9488',
  tileFg: '#FFFFFF'
},
{
  id: 'midnight',
  name: 'Midnight',
  accent: '#1A1A1A',
  ink: '#1A1A1A',
  tileBg: '#1A1A1A',
  tileFg: '#FFFFFF'
}];

export const LogoConceptsScreen: React.FC<LogoConceptsScreenProps> = ({
  navigateTo
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('forest');
  const activeColor =
  palettes.find((p) => p.id === selectedColor) ?? palettes[0];
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-['Inter']">
      {/* Header */}
      <div className="bg-white px-5 py-4 border-b border-[#F3F4F6] flex items-center sticky top-0 z-10">
        <button
          onClick={() => navigateTo('home')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors mr-3"
          aria-label="Go back">
          
          <ArrowLeftIcon size={20} className="text-[#1A1A1A]" />
        </button>
        <div>
          <h1
            className="text-xl font-bold text-[#1A1A1A]"
            style={{
              fontFamily: 'var(--font-heading)'
            }}>
            
            Cal Pal — Logos
          </h1>
          <p className="text-xs text-[#64748B]">6 distinct marks & mascots</p>
        </div>
      </div>

      <div className="p-5 space-y-8 pb-24">
        {/* Color Picker */}
        <section>
          <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-3">
            1. Choose a Color Palette
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {palettes.map((p) => {
              const isActive = p.id === selectedColor;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedColor(p.id)}
                  className={`relative bg-white rounded-2xl p-3 border-2 transition-all duration-200 text-left active:scale-[0.98] ${isActive ? 'border-[#1A1A1A] shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}>
                  
                  {isActive &&
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                      <CheckIcon size={10} className="text-white" />
                    </div>
                  }
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-4 h-4 rounded-full border border-black/5"
                      style={{
                        backgroundColor: p.accent
                      }} />
                    
                    <span className="text-xs text-[#1A1A1A] font-semibold">
                      {p.name}
                    </span>
                  </div>
                </button>);

            })}
          </div>
        </section>

        {/* Concepts List */}
        <section>
          <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-3">
            2. Choose a Logo Mark
          </h2>
          <div className="space-y-5">
            {concepts.map((concept, idx) => {
              const IconComponent = concept.icon;
              return (
                <div
                  key={concept.id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">
                        Option 0{idx + 1}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        {concept.name}
                      </p>
                    </div>
                  </div>

                  {/* Main Preview */}
                  <div className="flex items-center justify-center gap-3 py-4">
                    <IconComponent size={46} color={activeColor.accent} />
                    <span
                      className="flex items-baseline tracking-tight leading-none"
                      style={{
                        fontFamily: 'var(--font-wordmark)'
                      }}>
                      
                      <span
                        className="text-[40px] font-bold"
                        style={{
                          color: activeColor.ink
                        }}>
                        
                        Cal
                      </span>
                      <span
                        className="text-[42px] font-normal ml-2"
                        style={{
                          fontFamily: 'var(--font-wordmark-script)',
                          color: activeColor.accent
                        }}>
                        
                        Pal
                      </span>
                    </span>
                  </div>

                  <div className="w-full h-px bg-gray-100" />

                  {/* App Icon Proofs */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-[22%] flex items-center justify-center shadow-md"
                      style={{
                        backgroundColor: activeColor.tileBg
                      }}>
                      
                      <IconComponent size={36} color={activeColor.tileFg} />
                    </div>
                    <div
                      className="w-16 h-16 rounded-[22%] flex items-center justify-center shadow-md"
                      style={{
                        backgroundColor:
                        activeColor.tileFg === '#FFFFFF' ?
                        '#FFFFFF' :
                        activeColor.tileBg,
                        border: '1px solid #ECECEC'
                      }}>
                      
                      <IconComponent
                        size={36}
                        color={
                        activeColor.tileFg === '#FFFFFF' ?
                        activeColor.accent :
                        activeColor.tileFg
                        } />
                      
                    </div>
                    <p className="text-xs text-[#64748B] flex-1 leading-relaxed">
                      {concept.desc}
                    </p>
                  </div>
                </div>);

            })}
          </div>
        </section>
      </div>
    </div>);

};