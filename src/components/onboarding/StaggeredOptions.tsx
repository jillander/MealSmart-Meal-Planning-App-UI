import React, { Children, useEffect, useState } from 'react';
import { haptic } from '../../lib/haptics';

interface StaggeredOptionsProps {
  children: React.ReactNode;
  /** Delay before the first option appears, in ms. */
  initialDelay?: number;
  /** Gap between each option appearing, in ms. */
  stagger?: number;
  className?: string;
}

/**
 * Reveals its children one at a time with a spring-like rise and a light
 * haptic tap per option — the cascading entrance used on the question screens.
 * Respects prefers-reduced-motion by rendering everything immediately.
 */
export function StaggeredOptions({ children, initialDelay = 780, stagger = 150, className = 'space-y-2.5' }: StaggeredOptionsProps) {
  const items = Children.toArray(children);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(items.length);
      return undefined;
    }

    setRevealed(0);
    const timeouts = items.map((_, index) =>
    window.setTimeout(() => {
      setRevealed(index + 1);
      haptic('light');
    }, initialDelay + index * stagger)
    );

    return () => timeouts.forEach((timeout) => window.clearTimeout(timeout));
  }, [items.length, initialDelay, stagger]);

  return (
    <div className={className}>
      <style>{`
        @keyframes cp-option-in {
          0% { opacity: 0; transform: translateY(22px) scale(0.97) }
          55% { opacity: 1; transform: translateY(-5px) scale(1.012) }
          78% { transform: translateY(1.5px) scale(0.996) }
          100% { opacity: 1; transform: translateY(0) scale(1) }
        }
        @media (prefers-reduced-motion: reduce) {
          .cp-option { animation: none !important; }
        }
      `}</style>
      {items.map((child, index) =>
      <div
        key={index}
        className="cp-option"
        style={{
          visibility: index < revealed ? 'visible' : 'hidden',
          animation: index < revealed ? 'cp-option-in 560ms cubic-bezier(0.34, 1.4, 0.5, 1) both' : undefined
        }}>
        
          {child}
        </div>
      )}
    </div>);

}