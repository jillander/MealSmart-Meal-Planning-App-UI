import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeftIcon,
  CameraIcon,
  CheckIcon,
  ImageIcon,
  MailIcon,
  PencilIcon,
  Trash2Icon,
  UserIcon } from
'lucide-react';
import { ToastNotification } from './ToastNotification';
import { getInitials, isValidEmail, useUserProfile } from '../hooks/useUserProfile';
import { haptic } from '../lib/haptics';

interface ProfileScreenProps {
  navigateTo: (screen: string) => void;
}

/** Edit the signed-in user's name, email, and profile picture. */
export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigateTo }) => {
  const { profile, updateProfile } = useUserProfile();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [showEmailNotice, setShowEmailNotice] = useState(false);
  const [toast, setToast] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const objectUrl = useRef<string>('');

  // Release any locally created preview URL when leaving the screen.
  useEffect(
    () => () => {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    },
    []
  );

  const trimmedName = name.trim();
  const nameError = trimmedName.length === 0 ? 'Your name cannot be empty.' : '';
  const emailError = !isValidEmail(email) ? 'Enter a valid email address.' : '';
  const emailChanged = email.trim() !== profile.email;
  const hasChanges =
  trimmedName !== profile.name || emailChanged || avatar !== profile.avatar;
  const canSave = hasChanges && !nameError && !emailError;

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(file);
    setAvatar(objectUrl.current);
    haptic('selection');
  };

  const handleSave = () => {
    if (!canSave) return;
    haptic('selection');
    updateProfile({ name: trimmedName, email: email.trim(), avatar });
    if (emailChanged) {
      setShowEmailNotice(true);
      return;
    }
    setToast('Profile updated');
    window.setTimeout(() => navigateTo('settings'), 900);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8F9FA] pb-10">
      {toast && <ToastNotification message={toast} />}

      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-6 pb-4 pt-12 backdrop-blur">
        <div className="mx-auto flex max-w-[430px] items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('settings')}
            aria-label="Back to settings"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A1A1A] transition-colors hover:bg-[#E5E7EB]">
            
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-lg font-bold text-[#1A1A1A]">Your profile</h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[430px] px-6">
        {/* Picture */}
        <section className="pt-7">
          <div className="flex flex-col items-center rounded-3xl bg-white p-6 shadow-sm">
            <div className="relative">
              {avatar ?
              <img
                src={avatar}
                alt=""
                className="h-24 w-24 rounded-full border-2 border-white object-cover shadow-md" /> :


              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#EDF8EF] text-2xl font-extrabold text-[#2F7D34] shadow-inner">
                  {getInitials(trimmedName || 'Cal Pal')}
                </div>
              }
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                aria-label="Change profile picture"
                className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-white bg-[#1A1A1A] text-white transition-colors hover:bg-[#2A2A2A]">
                
                <CameraIcon size={15} />
              </button>
            </div>

            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden" />
            

            <div className="mt-5 flex w-full gap-2.5">
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E1E6E3] bg-white px-3 py-3 text-sm font-bold text-[#1A1A1A] transition-colors hover:bg-[#F8F9FA]">
                
                <ImageIcon size={15} /> {avatar ? 'Change photo' : 'Add photo'}
              </button>
              {avatar &&
              <button
                type="button"
                onClick={() => {
                  haptic('light');
                  setAvatar('');
                }}
                aria-label="Remove profile picture"
                className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border border-[#E1E6E3] bg-white text-[#EF4444] transition-colors hover:bg-[#FEF2F2]">
                
                  <Trash2Icon size={16} />
                </button>
              }
            </div>
            <p className="mt-3 text-center text-xs leading-relaxed text-[#8A948F]">
              Without a photo we&rsquo;ll show your initials.
            </p>
          </div>
        </section>

        {/* Details */}
        <section className="pt-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#64748B]">
            Your details
          </h2>
          <div className="space-y-3">
            <Field
              id="profile-name"
              label="Name"
              icon={UserIcon}
              value={name}
              onChange={setName}
              placeholder="Your name"
              error={nameError}
              autoComplete="name" />
            
            <Field
              id="profile-email"
              label="Email"
              icon={MailIcon}
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              error={emailError}
              type="email"
              autoComplete="email"
              hint={emailChanged && !emailError} />
            
          </div>
        </section>

        {/* Membership, read-only */}
        <section className="pt-6">
          <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-[#1A1A1A]">Membership</p>
              <p className="mt-0.5 text-xs text-[#64748B]">Cal Pal {profile.plan}</p>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('subscription')}
              className="rounded-full bg-[#F3F4F6] px-3.5 py-2 text-xs font-bold text-[#1A1A1A] transition-colors hover:bg-[#E5E7EB]">
              
              Manage
            </button>
          </div>
        </section>

        {/* Save */}
        <section className="pt-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A] disabled:bg-[#EFF1F0] disabled:text-[#9AA39E]">
            
            {hasChanges ? 'Save changes' : 'No changes to save'}
          </button>
          {hasChanges &&
          <button
            type="button"
            onClick={() => {
              setName(profile.name);
              setEmail(profile.email);
              setAvatar(profile.avatar);
            }}
            className="mt-3 w-full text-center text-sm font-semibold text-[#68736D] underline decoration-[#CFD6D2] underline-offset-4">
            
              Discard changes
            </button>
          }
        </section>
      </div>

      {/* Email confirmation notice */}
      {showEmailNotice &&
      <div
        className="fixed inset-0 z-50 flex items-end bg-black/50"
        role="dialog"
        aria-modal="true"
        aria-label="Confirm your email">
        
          <div className="mx-auto w-full max-w-[430px] rounded-t-3xl bg-white px-6 pb-8 pt-5">
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-gray-200" />
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDF8EF] text-[#2F7D34]">
              <MailIcon size={22} />
            </div>
            <h2 className="mt-4 text-xl font-bold text-[#1A1A1A]">Confirm your new email</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#68736D]">
              We sent a confirmation link to <strong>{email.trim()}</strong>. Your reminders and
              receipts keep going to your old address until you confirm.
            </p>
            <button
            type="button"
            onClick={() => {
              setShowEmailNotice(false);
              navigateTo('settings');
            }}
            className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-[#1A1A1A] text-base font-bold text-white transition-colors hover:bg-[#2A2A2A]">
            
              <CheckIcon size={18} className="mr-2" /> Got it
            </button>
          </div>
        </div>
      }
    </div>);

};

interface FieldProps {
  id: string;
  label: string;
  icon: React.ComponentType<{size?: number;className?: string;}>;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  /** Shows the email-confirmation note beneath the field. */
  hint?: boolean;
  type?: string;
  autoComplete?: string;
}

function Field({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  error,
  hint,
  type = 'text',
  autoComplete
}: FieldProps) {
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const showError = touched && Boolean(error);

  const borderTone = showError ?
  'border-[#EF4444] bg-[#FEF2F2]' :
  focused ?
  'border-[#1A1A1A] bg-white' :
  'border-[#E1E6E3] bg-white';

  return (
    <div>
      <label
        htmlFor={id}
        className="ml-1 text-[11px] font-extrabold uppercase tracking-wide text-[#94A3B8]">
        
        {label}
      </label>
      <div
        className={`mt-1.5 flex items-center gap-3 rounded-2xl border-2 px-4 shadow-sm transition-colors ${borderTone}`}>
        
        <Icon size={17} className="shrink-0 text-[#A7AFA9]" />
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTouched(true);
          }}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className="min-w-0 flex-1 bg-transparent py-4 text-[16px] font-semibold text-[#1A1A1A] outline-none placeholder:font-normal placeholder:text-[#A7AFA9]" />
        
        <PencilIcon
          size={14}
          aria-hidden="true"
          className={`shrink-0 transition-colors ${focused ? 'text-[#1A1A1A]' : 'text-[#CFD6D2]'}`} />
        
      </div>
      {showError ?
      <p id={`${id}-error`} className="ml-1 mt-1.5 text-xs font-semibold text-[#EF4444]">
          {error}
        </p> :

      hint &&
      <p className="ml-1 mt-1.5 text-xs text-[#68736D]">
            We&rsquo;ll send a link to confirm this address.
          </p>

      }
    </div>);

}