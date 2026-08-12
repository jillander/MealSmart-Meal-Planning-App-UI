import React, { useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import {
  buildDescriptionText,
  storeDescription,
  storeKeywords,
  storeName,
  storePromo,
  storeSubtitle } from
'../../data/storeListing';
import { haptic } from '../../lib/haptics';

/** The App Store listing text, with each field copyable for App Store Connect. */
export function StoreListingCopy() {
  const [copied, setCopied] = useState('');

  const copy = (field: string, value: string) => {
    haptic('selection');
    navigator.clipboard?.writeText(value);
    setCopied(field);
    window.setTimeout(() => setCopied(''), 1800);
  };

  return (
    <section className="px-6 pt-8">
      <h2 className="text-sm font-bold uppercase tracking-wide text-[#64748B]">
        App Store listing
      </h2>

      <div className="mt-3 space-y-2.5">
        <Field
          label="App name"
          limit={`${storeName.length}/30`}
          value={storeName}
          copied={copied === 'name'}
          onCopy={() => copy('name', storeName)} />
        
        <Field
          label="Subtitle"
          limit={`${storeSubtitle.length}/30`}
          value={storeSubtitle}
          copied={copied === 'subtitle'}
          onCopy={() => copy('subtitle', storeSubtitle)} />
        
        <Field
          label="Promotional text"
          limit={`${storePromo.length}/170`}
          value={storePromo}
          copied={copied === 'promo'}
          onCopy={() => copy('promo', storePromo)} />
        
        <Field
          label="Keywords"
          limit={`${storeKeywords.length}/100`}
          value={storeKeywords}
          copied={copied === 'keywords'}
          onCopy={() => copy('keywords', storeKeywords)}
          warn={storeKeywords.length > 100} />
        
      </div>

      {/* Description */}
      <div className="mt-3 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#94A3B8]">
            Description
          </span>
          <button
            type="button"
            onClick={() => copy('description', buildDescriptionText())}
            className="flex items-center gap-1.5 rounded-full bg-[#1A1A1A] px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-[#2A2A2A]">
            
            {copied === 'description' ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
            {copied === 'description' ? 'Copied' : 'Copy all'}
          </button>
        </div>

        <div className="space-y-4 px-4 py-4">
          {storeDescription.map((section, index) =>
          <div key={index}>
              {section.heading &&
            <h3 className="mb-1.5 text-[12px] font-extrabold tracking-wide text-[#2F7D34]">
                  {section.heading}
                </h3>
            }
              {section.body &&
            <p className="whitespace-pre-line text-[13px] leading-relaxed text-[#3C463F]">
                  {section.body}
                </p>
            }
              {section.bullets &&
            <ul className={`space-y-1 ${section.body ? 'mt-2' : ''}`}>
                  {section.bullets.map((bullet) =>
              <li key={bullet} className="flex gap-2 text-[13px] leading-relaxed text-[#3C463F]">
                      <span className="text-[#4CAF50]">•</span>
                      <span>{bullet}</span>
                    </li>
              )}
                </ul>
            }
            </div>
          )}
        </div>
      </div>
    </section>);

}

interface FieldProps {
  label: string;
  limit: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
  warn?: boolean;
}

function Field({ label, limit, value, copied, onCopy, warn = false }: FieldProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#94A3B8]">
          {label}
        </span>
        <div className="flex items-center gap-2.5">
          <span
            className={`text-[11px] font-semibold ${warn ? 'text-[#EF4444]' : 'text-[#94A3B8]'}`}>
            
            {limit}
          </span>
          <button
            type="button"
            onClick={onCopy}
            aria-label={`Copy ${label}`}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3F4F6] text-[#1A1A1A] transition-colors hover:bg-[#E5E7EB]">
            
            {copied ? <CheckIcon size={13} className="text-[#2F7D34]" /> : <CopyIcon size={13} />}
          </button>
        </div>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-[#1A1A1A]">{value}</p>
    </div>);

}