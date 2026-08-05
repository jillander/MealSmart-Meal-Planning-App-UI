import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  LockIcon,
  ScanLineIcon,
  SparklesIcon,
  TrendingUpIcon,
  UtensilsIcon } from
'lucide-react';
import { CalPalMark } from './onboarding/CalPalMark';
import { PlanOptionCard } from './subscription/PlanOptionCard';
import { CancelFlow } from './subscription/CancelFlow';
import { ToastNotification } from './ToastNotification';
import { getPlan, plusBenefits, subscriptionPlans } from '../data/subscriptionPlans';
import type { PlanId } from '../data/subscriptionPlans';
import { formatRenewalDate, useSubscription } from '../hooks/useSubscription';
import { haptic } from '../lib/haptics';

const heroStats = [
{ icon: ScanLineIcon, value: '2 min', label: 'Scan to recipe' },
{ icon: UtensilsIcon, value: '1,200+', label: 'Recipes' },
{ icon: TrendingUpIcon, value: 'Daily', label: 'Adaptive targets' }];


interface SubscriptionScreenProps {
  navigateTo: (screen: string) => void;
  /** Seeds an active membership, so the manage state can be previewed. */
  startActive?: boolean;
}

export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  navigateTo,
  startActive = false
}) => {
  const { subscription, subscribe, changePlan, cancel, resume } = useSubscription(startActive);
  const [selected, setSelected] = useState<PlanId>(subscription.planId);
  const [showCancel, setShowCancel] = useState(false);
  const [toast, setToast] = useState('');

  const isMember = subscription.status === 'active';
  const currentPlan = getPlan(subscription.planId);
  const isChangingPlan = isMember && selected !== subscription.planId;

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  const handlePrimaryAction = () => {
    haptic('selection');
    if (!isMember) {
      subscribe(selected);
      showToast('Cal Pal Plus is active');
      return;
    }
    if (isChangingPlan) {
      changePlan(selected);
      showToast(`Switched to the ${getPlan(selected).label} plan`);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8F9FA] pb-10">
      {toast && <ToastNotification message={toast} />}

      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-6 pb-4 pt-12 backdrop-blur">
        <div className="mx-auto flex max-w-[430px] items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('settings')}
              aria-label="Back to settings"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A1A1A] transition-colors hover:bg-[#E5E7EB]">
              
              <ArrowLeftIcon size={20} />
            </button>
            <h1 className="text-lg font-bold text-[#1A1A1A]">Subscription</h1>
          </div>
          <button
            type="button"
            onClick={() => showToast('Checking for previous purchases…')}
            className="text-sm font-semibold text-[#5B6660] transition-colors hover:text-[#1A1A1A]">
            
            Restore
          </button>
        </div>
      </header>

      {/* Plus header — same treatment as the onboarding membership step */}
      <div className="mx-auto w-full max-w-[430px] px-6 pt-7 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A1A1A] text-white shadow-sm">
          <SparklesIcon size={23} />
        </div>
        <div className="mt-3 flex items-center justify-center gap-1.5">
          <CalPalMark size="sm" />
          <span className="rounded-full bg-[#EDF8EF] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#2F7D34]">
            Plus
          </span>
        </div>
        <h2 className="mx-auto mt-3 max-w-[320px] text-[25px] font-extrabold leading-[1.16] tracking-tight text-[#1A1A1A]">
          {isMember ? 'Your membership, in one place.' : 'Everything Cal Pal can do for you.'}
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {heroStats.map((stat) =>
          <div
            key={stat.label}
            className="rounded-2xl border border-[#E1E6E3] bg-white px-2 py-3 shadow-sm">
            
              <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-[#EDF8EF] text-[#2F7D34]">
                <stat.icon size={16} />
              </span>
              <p className="mt-2 text-sm font-extrabold leading-none text-[#1A1A1A]">{stat.value}</p>
              <p className="mt-1 text-[10px] font-semibold leading-tight text-[#68736D]">{stat.label}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[430px] px-6">
        {/* Membership status */}
        <section className="pt-6">
          {isMember ?
          <div className="rounded-2xl bg-[#1A1A1A] p-5 text-white shadow-sm">
              <div className="flex items-center gap-2">
                <SparklesIcon size={17} className="text-[#8BD98F]" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#8BD98F]">
                  Cal Pal Plus
                </span>
              </div>
              <p className="mt-3 text-[22px] font-bold leading-tight">
                {currentPlan.label} plan
              </p>
              <p className="mt-1 text-sm text-white/70">
                {currentPlan.price} · {currentPlan.billedAs}
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-3">
                <CalendarIcon size={16} className="shrink-0 text-white/70" />
                <p className="text-xs leading-relaxed text-white/85">
                  {subscription.cancelAtPeriodEnd ?
                `Ends on ${formatRenewalDate(subscription.renewsOn)} — you keep Plus until then.` :
                `Renews automatically on ${formatRenewalDate(subscription.renewsOn)}.`}
                </p>
              </div>
            </div> :

          <div className="rounded-2xl border border-[#E1E6E3] bg-white p-5 shadow-sm">
              <span className="inline-flex rounded-full bg-[#F3F4F6] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#5B6660]">
                Basic plan
              </span>
              <h2 className="mt-3 text-[22px] font-bold leading-tight text-[#1A1A1A]">
                Unlock everything Cal Pal can do
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#68736D]">
                You&rsquo;re on the free plan. Plus adds unlimited recipe matching and a plan that adapts as you go.
              </p>
              <div className="mt-4 space-y-2">
                {plusBenefits.map((benefit) =>
              <div key={benefit} className="flex items-center gap-2.5">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#4CAF50] text-white">
                      <CheckIcon size={10} strokeWidth={3} />
                    </span>
                    <span className="text-xs leading-snug text-[#3C463F]">{benefit}</span>
                  </div>
              )}
              </div>
            </div>
          }
        </section>

        {/* Plans */}
        <section className="pt-7">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#64748B]">
            {isMember ? 'Change your plan' : 'Choose your plan'}
          </h2>
          <div className="space-y-2.5">
            {subscriptionPlans.map((plan) =>
            <PlanOptionCard
              key={plan.id}
              plan={plan}
              selected={selected === plan.id}
              current={isMember && subscription.planId === plan.id}
              onSelect={() => {
                haptic('light');
                setSelected(plan.id);
              }} />

            )}
          </div>
          <p className="mt-3 text-center text-xs font-semibold text-[#68736D]">
            Cancel anytime · No commitment
          </p>
        </section>

        {/* Primary action */}
        <section className="pt-5">
          {isMember ?
          <button
            type="button"
            onClick={handlePrimaryAction}
            disabled={!isChangingPlan}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A] disabled:bg-[#EFF1F0] disabled:text-[#9AA39E]">
            
              {isChangingPlan ?
            `Switch to ${getPlan(selected).label}` :
            'This is your current plan'}
            </button> :

          <button
            type="button"
            onClick={handlePrimaryAction}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white shadow-[0_4px_0_#080808] transition-all hover:bg-[#2A2A2A] active:translate-y-0.5 active:shadow-[0_2px_0_#080808]">
            
              Start my Plus journey <ArrowRightIcon className="ml-2" size={19} />
            </button>
          }
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-1.5 text-center text-[10px] leading-relaxed text-[#8A948F]">
            <LockIcon size={11} /> Secure payment <span>· Restore purchase</span> <span>· No free trial</span>
          </p>
        </section>

        {/* Plan details */}
        {isMember &&
        <section className="pt-7">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#64748B]">
              Your plan details
            </h2>
            <dl className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <DetailRow label="Subscription type" value={currentPlan.label} />
              <DetailRow label="Price" value={`${currentPlan.price} · ${currentPlan.billedAs}`} />
              <DetailRow
              label={subscription.cancelAtPeriodEnd ? 'Access until' : 'Renewal date'}
              value={formatRenewalDate(subscription.renewsOn)} />
            
              <DetailRow label="Subscription via" value="App Store" isLast />
            </dl>
          </section>
        }

        {/* Membership management */}
        {isMember &&
        <section className="pt-7">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#64748B]">Membership</h2>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <ManageRow
              label="Billing history"
              description="See past charges and receipts"
              onClick={() => showToast('Billing history opens in the App Store')} />
            
              <ManageRow
              label="Payment method"
              description="Managed through your app store account"
              onClick={() => showToast('Payment method is managed by your app store')} />
            
              {subscription.cancelAtPeriodEnd ?
            <ManageRow
              label="Resume membership"
              description={`Keep Plus beyond ${formatRenewalDate(subscription.renewsOn)}`}
              tone="positive"
              isLast
              onClick={() => {
                resume();
                showToast('Your membership will continue');
              }} /> :


            <ManageRow
              label="Cancel membership"
              description="You keep Plus until the end of the term"
              tone="danger"
              isLast
              onClick={() => setShowCancel(true)} />

            }
            </div>
          </section>
        }
      </div>

      {/* Cancellation flow */}
      {showCancel &&
      <CancelFlow
        planLabel={currentPlan.label}
        planPrice={currentPlan.price}
        accessUntil={formatRenewalDate(subscription.renewsOn)}
        onClose={() => setShowCancel(false)}
        onKeep={() => {
          setShowCancel(false);
          showToast('Your membership continues');
        }}
        onAcceptOffer={() => {
          setShowCancel(false);
          showToast('50% off applied to your next term');
        }}
        onConfirmCancel={() => cancel()} />

      }
    </div>);

};

function DetailRow({ label, value, isLast = false }: {label: string;value: string;isLast?: boolean;}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 p-4 ${isLast ? '' : 'border-b border-gray-100'}`}>
      
      <dt className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{label}</dt>
      <dd className="text-sm font-semibold text-[#1A1A1A]">{value}</dd>
    </div>);

}

interface ManageRowProps {
  label: string;
  description: string;
  onClick: () => void;
  tone?: 'default' | 'danger' | 'positive';
  isLast?: boolean;
}

function ManageRow({ label, description, onClick, tone = 'default', isLast = false }: ManageRowProps) {
  const labelTone =
  tone === 'danger' ? 'text-[#EF4444]' : tone === 'positive' ? 'text-[#2F7D34]' : 'text-[#1A1A1A]';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-[#F8F9FA] ${
      isLast ? '' : 'border-b border-gray-100'}`
      }>
      
      <span className="min-w-0">
        <span className={`block text-sm font-semibold ${labelTone}`}>{label}</span>
        <span className="mt-0.5 block truncate text-xs text-[#64748B]">{description}</span>
      </span>
      <ArrowRightIcon size={16} className="shrink-0 text-[#A7AFA9]" />
    </button>);

}