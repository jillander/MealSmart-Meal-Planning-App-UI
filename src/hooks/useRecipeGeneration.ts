import { useCallback, useEffect, useRef, useState } from 'react';

export type RecipeGenerationStatus = 'generating' | 'success' | 'error';

interface UseRecipeGenerationOptions {
  /** Simulates the backend returning no recipes, so the error state can be reviewed. */
  shouldFail?: boolean;
  durationMs?: number;
  onSuccess?: () => void;
  onError?: () => void;
}

interface UseRecipeGenerationResult {
  status: RecipeGenerationStatus;
  /** 0 → 1, eased, for driving the reveal animation. */
  progress: number;
  /** How many times generation has run (1 on the first pass). */
  attempt: number;
  /** Runs generation again from the start. */
  retry: () => void;
}

/**
 * Drives the recipe matching run: progress for the loading visual, plus a
 * success/error outcome and a `retry` handle the error screen can call.
 */
export function useRecipeGeneration({
  shouldFail = false,
  durationMs = 5200,
  onSuccess,
  onError
}: UseRecipeGenerationOptions = {}): UseRecipeGenerationResult {
  const [status, setStatus] = useState<RecipeGenerationStatus>('generating');
  const [progress, setProgress] = useState(0);
  const [attempt, setAttempt] = useState(1);

  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  const retry = useCallback(() => {
    setStatus('generating');
    setProgress(0);
    setAttempt((current) => current + 1);
  }, []);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / durationMs);
      setProgress(1 - Math.pow(1 - elapsed, 2.2));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const settle = window.setTimeout(() => {
      if (shouldFail) {
        setStatus('error');
        onErrorRef.current?.();
      } else {
        setStatus('success');
        onSuccessRef.current?.();
      }
    }, durationMs + 350);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
  }, [attempt, durationMs, shouldFail]);

  return { status, progress, attempt, retry };
}