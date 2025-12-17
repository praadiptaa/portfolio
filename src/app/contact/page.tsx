"use client";
import AnimatedContainer from "../../components/AnimatedContainer";
import { useI18n } from "../../lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <AnimatedContainer>
      <main className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">{t.contact.title}</h1>
        <p className="text-lg text-gray-400 mb-6">{t.contact.desc}<a href={`mailto:${t.contact.email}`} className="underline text-white">{t.contact.email}</a> {" "} {"or fill the form below."}</p>
        <form className="flex flex-col gap-4 w-full max-w-md">
          <input type="text" placeholder={t.contact.form.name} className="p-3 rounded bg-gray-800 text-white" />
          <input type="email" placeholder={t.contact.form.email} className="p-3 rounded bg-gray-800 text-white" />
          <textarea placeholder={t.contact.form.message} className="p-3 rounded bg-gray-800 text-white" rows={4} />
          <button type="submit" className="bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition">{t.contact.form.send}</button>
        </form>
      </main>
    </AnimatedContainer>
  );
}