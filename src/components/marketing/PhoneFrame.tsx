import React from 'react';

/** True iPhone-class dimensions the mockups are authored at. */
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

interface PhoneFrameProps {
  children: React.ReactNode;
  /** Rendered width of the frame; content is scaled down from 390px to match. */
  width: number;
  /** How much of the 844px screen stays visible before the frame is cropped. */
  visibleRatio?: number;
}

/**
 * Renders a mockup at real phone dimensions, then scales the whole device down.
 * Scaling (rather than resizing) keeps type and spacing in correct proportion.
 */
export function PhoneFrame({ children, width, visibleRatio = 0.86 }: PhoneFrameProps) {
  const scale = width / BASE_WIDTH;
  const bezel = Math.round(width * 0.028);
  const radius = Math.round(width * 0.15);

  return (
    <div
      className="relative mx-auto overflow-hidden bg-[#0B0D0C] shadow-2xl"
      style={{
        width: width + bezel * 2,
        height: BASE_HEIGHT * scale * visibleRatio + bezel,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        padding: bezel,
        paddingBottom: 0
      }}>
      
      <div
        className="relative overflow-hidden bg-white"
        style={{
          width,
          height: BASE_HEIGHT * scale * visibleRatio,
          borderTopLeftRadius: radius - bezel,
          borderTopRightRadius: radius - bezel
        }}>
        
        <div
          style={{
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left'
          }}>
          
          {children}
        </div>
        {/* Dynamic Island */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#0B0D0C]"
          style={{ top: width * 0.028, width: width * 0.26, height: width * 0.075 }} />
        
      </div>
    </div>);

}