"use client";
import React from "react";
import AnimatedContainer from "./AnimatedContainer";
import { useI18n } from "../lib/i18n";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { t, locale, setLocale } = useI18n();
  return (
    <>
      <header className="w-full flex justify-center border-b border-gray-800/20 mb-8">
        <nav className="flex gap-8 py-6 text-lg font-medium">
          <a href="/" className="hover:text-gray-400 transition">{t.nav.home}</a>
          <a href="/about" className="hover:text-gray-400 transition">{t.nav.about}</a>
          <a href="/portfolio" className="hover:text-gray-400 transition">{t.nav.portfolio}</a>
          <a href="/contact" className="hover:text-gray-400 transition">{t.nav.contact}</a>
          <select
            value={locale}
            onChange={e => setLocale(e.target.value as "en" | "id")}
            className="ml-6 px-2 py-1 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none"
            aria-label="Select language"
          >
            <option value="en">EN</option>
            <option value="id">ID</option>
          </select>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <AnimatedContainer>{children}</AnimatedContainer>
      </main>
      <footer className="w-full text-center py-6 text-gray-500 text-sm border-t border-gray-800/20 mt-8">
        &copy; {new Date().getFullYear()} {t.home.name}. {t.footer}
      </footer>
    </>
  );
}
