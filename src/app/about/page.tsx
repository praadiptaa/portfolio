"use client";
import AnimatedContainer from "../../components/AnimatedContainer";
import { useI18n } from "../../lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <AnimatedContainer>
      <main className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">{t.about.title}</h1>
        <p className="max-w-xl text-lg text-gray-400">{t.about.desc}</p>
      </main>
    </AnimatedContainer>
  );
}