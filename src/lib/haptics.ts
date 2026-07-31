type HapticStyle = 'light' | 'medium' | 'selection' | 'success';

const patterns: Record<HapticStyle, number | number[]> = {
  light: 8,
  medium: 16,
  selection: 12,
  success: [12, 40, 18]
};

/**
 * Fires a short haptic tap where the device supports it.
 * Silently no-ops on desktop, unsupported browsers, or when the user
 * has asked for reduced motion (a proxy for reduced sensory feedback).
 */
export function haptic(style: HapticStyle = 'light'): void {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
  if (typeof navigator.vibrate !== 'function') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  try {
    navigator.vibrate(patterns[style]);
  } catch {

    // Vibration can throw if the document is not focused — safe to ignore.
  }}