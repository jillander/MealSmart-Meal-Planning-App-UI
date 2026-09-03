import React, { useState } from 'react';
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  RotateCcwIcon,
  Trash2Icon } from
'lucide-react';
import type { DetectedFood, MealSlot, PlateAnalysis } from '../../types/foodLog';
import { totalMacros } from '../../types/foodLog';
import { haptic } from '../../lib/haptics';

interface PlateResultProps {
  analysis: PlateAnalysis;
  mealSlot: MealSlot;
  onMealSlotChange: (slot: MealSlot) => void;
  onRetake: () => void;
  onCancel: () => void;
  onConfirm: (name: string, items: DetectedFood[]) => void;
}

const slots: {key: MealSlot;label: string;}[] = [
{ key: 'breakfast', label: 'Breakfast' },
{ key: 'lunch', label: 'Lunch' },
{ key: 'snack', label: 'Snack' },
{ key: 'dinner', label: 'Dinner' }];


const macroTone = {
  protein: '#4CAF50',
  carbs: '#F59E0B',
  fat: '#6366F1'
};

/** Review and correct what Cal Pal saw, then log it. */
export function PlateResult({
  analysis,
  mealSlot,
  onMealSlotChange,
  onRetake,
  onCancel,
  onConfirm
}: PlateResultProps) {
  const [items, setItems] = useState<DetectedFood[]>(analysis.items);
  const [name, setName] = useState(analysis.dishName);
  const totals = totalMacros(items);
  const macroGrams = totals.protein + totals.carbs + totals.fat;

  const setQuantity = (id: string, delta: number) => {
    haptic('light');
    setItems((current) =>
    current.map((item) =>
    item.id === id ?
    { ...item, quantity: Math.max(0.5, Math.round((item.quantity + delta) * 2) / 2) } :
    item
    )
    );
  };

  const remove = (id: string) => {
    haptic('light');
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const uncertain = items.filter((item) => item.confidence < 0.7);

  return (
    <section className="min-h-screen w-full bg-[#F8F9FA] pb-32">
      {/* Photo header */}
      <div className="relative h-[236px] w-full overflow-hidden">
        <img src={analysis.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
        <button
          type="button"
          onClick={onCancel}
          aria-label="Cancel logging"
          className="absolute left-5 top-12 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/55">
          
          <ArrowLeftIcon size={20} />
        </button>
        <button
          type="button"
          onClick={onRetake}
          className="absolute right-5 top-12 flex items-center gap-1.5 rounded-full bg-black/40 px-3.5 py-2.5 text-xs font-bold text-white backdrop-blur transition-colors hover:bg-black/55">
          
          <RotateCcwIcon size={14} /> Retake
        </button>
        <span className="absolute bottom-4 left-5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[#2F7D34]">
          {items.length} {items.length === 1 ? 'food' : 'foods'} found
        </span>
      </div>

      <div className="mx-auto w-full max-w-[430px] px-6">
        {/* Dish name */}
        <label htmlFor="plate-name" className="mt-6 block text-[11px] font-extrabold uppercase tracking-wide text-[#94A3B8]">
          What you ate
        </label>
        <input
          id="plate-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-1.5 w-full rounded-2xl border-2 border-[#E1E6E3] bg-white px-4 py-3.5 text-[17px] font-bold text-[#1A1A1A] outline-none transition-colors focus:border-[#1A1A1A]" />
        

        {/* Totals */}
        <div className="mt-4 rounded-3xl bg-[#1A1A1A] p-6 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
            Logging to {slots.find((slot) => slot.key === mealSlot)?.label.toLowerCase()}
          </p>
          <p className="mt-2 text-[46px] font-extrabold leading-none">
            {Math.round(totals.calories)}
          </p>
          <p className="mt-1 text-sm text-white/60">calories</p>

          <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-white/15">
            {(['protein', 'carbs', 'fat'] as const).map((macro) =>
            <div
              key={macro}
              style={{
                width: macroGrams ? `${totals[macro] / macroGrams * 100}%` : '0%',
                background: macroTone[macro]
              }} />

            )}
          </div>
          <div className="mt-3.5 grid grid-cols-3 gap-2">
            {(['protein', 'carbs', 'fat'] as const).map((macro) =>
            <div key={macro}>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/55">
                  <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: macroTone[macro] }}
                  aria-hidden="true" />
                
                  {macro}
                </span>
                <p className="mt-1 text-[17px] font-extrabold leading-none">
                  {Math.round(totals[macro])}g
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Low-confidence nudge */}
        {uncertain.length > 0 &&
        <div className="mt-4 flex gap-3 rounded-2xl bg-[#FFF8E6] p-4">
            <AlertCircleIcon size={17} className="mt-0.5 shrink-0 text-[#B45309]" />
            <p className="text-xs leading-relaxed text-[#7C5314]">
              Worth a check: we&rsquo;re least sure about{' '}
              <strong>{uncertain.map((item) => item.name.toLowerCase()).join(' and ')}</strong>.
              Adjust the portion or remove it.
            </p>
          </div>
        }

        {/* Items */}
        <h2 className="mb-3 mt-6 text-sm font-bold uppercase tracking-wide text-[#64748B]">
          On your plate
        </h2>
        <div className="space-y-2.5">
          {items.map((item) =>
          <div key={item.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[16px] font-bold text-[#1A1A1A]">{item.name}</p>
                  <p className="mt-0.5 text-[13px] text-[#68736D]">
                    {item.quantity === 1 ? '' : `${item.quantity} × `}
                    {item.portionLabel} · {Math.round(item.calories * item.quantity)} cal
                  </p>
                </div>
                <button
                type="button"
                onClick={() => remove(item.id)}
                aria-label={`Remove ${item.name}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#A7AFA9] transition-colors hover:bg-[#FEF2F2] hover:text-[#EF4444]">
                
                  <Trash2Icon size={15} />
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-3 text-[12px] font-semibold text-[#68736D]">
                  <span>P {Math.round(item.protein * item.quantity)}g</span>
                  <span>C {Math.round(item.carbs * item.quantity)}g</span>
                  <span>F {Math.round(item.fat * item.quantity)}g</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                  type="button"
                  onClick={() => setQuantity(item.id, -0.5)}
                  aria-label={`Less ${item.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E1E6E3] text-[#1A1A1A] transition-colors hover:bg-[#F8F9FA]">
                  
                    <MinusIcon size={14} />
                  </button>
                  <span className="w-9 text-center text-[13px] font-bold text-[#1A1A1A]">
                    {item.quantity}
                  </span>
                  <button
                  type="button"
                  onClick={() => setQuantity(item.id, 0.5)}
                  aria-label={`More ${item.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E1E6E3] text-[#1A1A1A] transition-colors hover:bg-[#F8F9FA]">
                  
                    <PlusIcon size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {items.length === 0 &&
          <div className="rounded-2xl border border-dashed border-[#CFD6D2] p-6 text-center">
              <p className="text-sm font-semibold text-[#1A1A1A]">Nothing left on the plate</p>
              <button
              type="button"
              onClick={onRetake}
              className="mt-2 text-sm font-semibold text-[#2F7D34] underline underline-offset-4">
              
                Take another photo
              </button>
            </div>
          }
        </div>

        {/* Meal slot */}
        <h2 className="mb-3 mt-6 text-sm font-bold uppercase tracking-wide text-[#64748B]">
          Add to
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {slots.map((slot) =>
          <button
            key={slot.key}
            type="button"
            onClick={() => {
              haptic('light');
              onMealSlotChange(slot.key);
            }}
            aria-pressed={mealSlot === slot.key}
            className={`rounded-xl border-2 py-3 text-[13px] font-bold transition-colors ${
            mealSlot === slot.key ?
            'border-[#1A1A1A] bg-[#1A1A1A] text-white' :
            'border-[#E1E6E3] bg-white text-[#1A1A1A] hover:bg-[#F8F9FA]'}`
            }>
            
              {slot.label}
            </button>
          )}
        </div>
      </div>

      {/* Confirm */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-100 bg-white/95 px-6 pb-7 pt-4 backdrop-blur">
        <div className="mx-auto max-w-[430px]">
          <button
            type="button"
            onClick={() => onConfirm(name.trim() || analysis.dishName, items)}
            disabled={items.length === 0}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A] disabled:bg-[#EFF1F0] disabled:text-[#9AA39E]">
            
            <CheckIcon size={19} className="mr-2" /> Log {Math.round(totals.calories)} calories
          </button>
        </div>
      </div>
    </section>);

}