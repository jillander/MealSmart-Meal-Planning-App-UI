import React, { useEffect, useRef, useState } from 'react';
import { Trash2Icon } from 'lucide-react';
import { haptic } from '../lib/haptics';

interface SwipeToDeleteProps {
  children: React.ReactNode;
  onDelete: () => void;
  /** Announced on the delete control, e.g. "Delete Greek Yogurt Bowl". */
  label: string;
}

const ACTION_WIDTH = 88;
/** Past this, releasing snaps the action open instead of closing. */
const OPEN_THRESHOLD = 40;
/** Past this, releasing deletes outright. */
const COMMIT_THRESHOLD = 190;

/** Swipe a row left to reveal a delete action; flick further to delete immediately. */
export function SwipeToDelete({ children, onDelete, label }: SwipeToDeleteProps) {
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [height, setHeight] = useState<number | null>(null);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const armed = useRef(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!removing) return;
    // Collapse first, then hand the removal back to the list.
    const timer = window.setTimeout(onDelete, 260);
    return () => window.clearTimeout(timer);
  }, [removing, onDelete]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    startX.current = event.clientX;
    startOffset.current = offset;
    setDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const delta = event.clientX - startX.current;
    // Only left-swipes open; rubber-band anything past the action width.
    const next = Math.min(0, startOffset.current + delta);
    const eased = next < -ACTION_WIDTH ? -ACTION_WIDTH + (next + ACTION_WIDTH) * 0.55 : next;
    if (!armed.current && eased <= -OPEN_THRESHOLD) {
      armed.current = true;
      haptic('light');
    }
    setOffset(eased);
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    armed.current = false;
    if (offset <= -COMMIT_THRESHOLD) {
      commitDelete();
      return;
    }
    setOffset(offset <= -OPEN_THRESHOLD ? -ACTION_WIDTH : 0);
  };

  const commitDelete = () => {
    if (removing) return;
    haptic('selection');
    // Pin the current height first so the collapse has something to animate from.
    setHeight(rowRef.current?.offsetHeight ?? null);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => setRemoving(true)));
  };

  return (
    <div
      ref={rowRef}
      className="relative overflow-hidden transition-all duration-[240ms] ease-out"
      style={
      removing ?
      { height: 0, opacity: 0 } :
      height !== null ?
      { height } :
      undefined
      }>
      
      {/* Delete action revealed behind the row */}
      <div className="absolute inset-y-0 right-0 flex w-[88px] items-stretch">
        <button
          type="button"
          onClick={commitDelete}
          aria-label={label}
          className="flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-[#EF4444] text-white transition-colors hover:bg-[#DC2626]">
          
          <Trash2Icon size={20} />
          <span className="text-[11px] font-bold">Delete</span>
        </button>
      </div>

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        style={{
          transform: `translate3d(${removing ? -420 : offset}px, 0, 0)`,
          touchAction: 'pan-y'
        }}
        className={`relative ${dragging ? '' : 'transition-transform duration-200 ease-out'}`}>
        
        {children}
      </div>
    </div>);

}