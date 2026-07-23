import React from 'react';

type ReferenceApp = 'yazio' | 'osta';

interface ReferenceScreenProps {
  reference: ReferenceApp;
  index: number;
}

// Reference onboarding screenshots used purely for side-by-side comparison
// against the Cal Pal flow. These are external product references, not part
// of the Cal Pal app itself.
const references: Record<ReferenceApp, {label: string;images: string[];}> = {
  yazio: {
    label: 'YAZIO',
    images: ["/Yazio_iOS_Onboarding_0.png", "/Yazio_iOS_Onboarding_1.png", "/Yazio_iOS_Onboarding_2.png", "/Yazio_iOS_Onboarding_3.png", "/Yazio_iOS_Onboarding_4.png", "/Yazio_iOS_Onboarding_5.png", "/Yazio_iOS_Onboarding_6.png", "/Yazio_iOS_Onboarding_7.png", "/Yazio_iOS_Onboarding_8.png", "/Yazio_iOS_Onboarding_9.png", "/Yazio_iOS_Onboarding_10.png", "/Yazio_iOS_Onboarding_11.png", "/Yazio_iOS_Onboarding_12.png", "/Yazio_iOS_Onboarding_13.png", "/Yazio_iOS_Onboarding_14.png", "/Yazio_iOS_Onboarding_15.png"]

















  },
  osta: {
    label: 'OSTA',
    images: ["/onboarding_1.jpg", "/onboarding_2.jpg", "/onboarding_3.jpg", "/onboarding_4.jpg", "/onboarding_5.jpg", "/onboarding_6.jpg", "/onboarding_7.jpg", "/onboarding_8.jpg", "/onboarding_9.jpg", "/onboarding_10.jpg", "/onboarding_11.jpg", "/onboarding_12.jpg", "/onboarding_13.jpg", "/onboarding_15.jpg", "/onboarding_16.jpg", "/onboarding_17.jpg", "/onboarding_18.jpg", "/onboarding_19.jpg"]



















  }
};

export function ReferenceScreen({ reference, index }: ReferenceScreenProps) {
  const set = references[reference];
  const src = set.images[index];

  if (!src) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0E0F10] px-8 text-center text-white">
        <span className="mb-3 rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
          {set.label} reference
        </span>
        <p className="text-lg font-bold">Screenshot not available</p>
        <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-white/60">
          Upload the {set.label} onboarding screenshots to display them here for
          comparison.
        </p>
      </div>);

  }

  return (
    <div className="relative min-h-screen w-full bg-black">
      <span className="absolute left-3 top-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
        {set.label} · {index + 1}/{set.images.length}
      </span>
      <img
        src={src}
        alt={`${set.label} onboarding screen ${index + 1}`}
        className="min-h-screen w-full object-contain" />
      
    </div>);

}