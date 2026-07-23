import React from 'react';

interface CalPalMarkProps {
  tone?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export function CalPalMark({ tone = 'dark', size = 'md' }: CalPalMarkProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  const isLight = tone === 'light';

  return (
    <div
      className={`flex items-baseline tracking-tight ${sizeClasses[size]}`}
      style={{ fontFamily: 'var(--font-wordmark)' }}
      aria-label="Cal Pal">
      
      <span className={`font-bold ${isLight ? 'text-white' : 'text-[#1A1A1A]'}`}>
        Cal
      </span>
      <span
        className={`ml-1.5 font-normal ${size === 'lg' ? 'text-[1.08em]' : ''} ${isLight ? 'text-white' : 'text-[#1A1A1A]'}`}
        style={{ fontFamily: 'var(--font-wordmark-script)' }}>
        
        Pal
      </span>
    </div>);

}