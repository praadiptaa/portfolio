"use client";
import React, { useState } from "react";
import { useI18n } from "../lib/i18n";

export default function LanguageFab() {
  const { locale, setLocale } = useI18n();
  const [useEmoji, setUseEmoji] = useState(false);

  // Prefer project-provided PNG icons (placed in public/icons)
  const imgSrc = locale === 'en' ? '/icons/english-icon.png' : '/icons/indo.png';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        aria-label="Switch language"
        title={locale === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
        onClick={() => setLocale(locale === 'en' ? 'id' : 'en')}
        className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-900 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform overflow-hidden"
      >
        {!useEmoji ? (
          <img
            src={imgSrc}
            alt={locale === 'en' ? 'English' : 'Indonesia'}
            className="w-8 h-8 object-contain"
            onError={() => setUseEmoji(true)}
          />
        ) : (
          <span className="text-lg leading-none">{locale === 'en' ? '🇬🇧' : '🇮🇩'}</span>
        )}
      </button>
    </div>
  );
}
