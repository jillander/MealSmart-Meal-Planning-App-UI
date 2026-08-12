import React from 'react';

export type AppIconVariant = 'primary' | 'dark' | 'green' | 'monogram';

interface AppIconProps {
  /** Rendered pixel size of the square icon. */
  size?: number;
  variant?: AppIconVariant;
  /** iOS masks the corners itself, so the export uses a square. */
  squared?: boolean;
}

const palettes: Record<AppIconVariant, {bg: string;ink: string;}> = {
  // Cream field with near-black type — warm, food-led, and unmistakable on any wallpaper.
  primary: { bg: '#F4EFE2', ink: '#1A1A1A' },
  dark: { bg: '#1A1A1A', ink: '#FFFFFF' },
  green: { bg: '#4CAF50', ink: '#FFFFFF' },
  monogram: { bg: '#1A1A1A', ink: '#FFFFFF' }
};

/**
 * The Cal Pal app icon: the brand wordmark stacked inside a squircle, the way
 * Calm sets its script wordmark on a solid field.
 */
export function AppIcon({ size = 120, variant = 'primary', squared = false }: AppIconProps) {
  const { bg, ink } = palettes[variant];
  const isMonogram = variant === 'monogram';

  return (
    <div
      role="img"
      aria-label="Cal Pal app icon"
      className="relative flex shrink-0 items-center justify-center overflow-hidden"
      style={{
        width: size,
        height: size,
        background: bg,
        borderRadius: squared ? 0 : size * 0.225
      }}>
      
      {isMonogram ?
      <span
        style={{
          fontFamily: 'var(--font-wordmark-script)',
          color: ink,
          fontSize: size * 0.52,
          lineHeight: 1,
          marginTop: size * 0.02
        }}>
        
          Cp
        </span> :

      <div className="flex flex-col items-center" style={{ marginTop: -size * 0.015 }}>
          <span
          style={{
            fontFamily: 'var(--font-wordmark)',
            fontWeight: 700,
            color: ink,
            fontSize: size * 0.29,
            letterSpacing: '-0.02em',
            lineHeight: 1
          }}>
          
            Cal
          </span>
          <span
          style={{
            fontFamily: 'var(--font-wordmark-script)',
            color: ink,
            fontSize: size * 0.36,
            lineHeight: 1,
            marginTop: -size * 0.035
          }}>
          
            Pal
          </span>
        </div>
      }
    </div>);

}