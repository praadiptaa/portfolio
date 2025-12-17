"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Locale = "en" | "id";

const translations: Record<Locale, any> = {
  en: {
    home: {
      name: "Pradipta Rahmatan Isya Hertanto",
      subtitle: "Web Developer | Minimalist & Premium Portfolio",
      welcome: "I design and build simple, beautiful websites focused on clarity and performance.",
      titlePrefix: "Welcome to",
      titleFull: "Welcome to My Portfolio Website",
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact",
      cta: { portfolio: "See Portfolio", contact: "Get in Touch" }
    },
    about: { title: "About Me", desc: "Hi! I'm [Your Name], a web developer focused on minimalist design and premium user experience. I love building modern websites with a monochrome aesthetic." },
    aboutSection: {
      title: "About Me",
      desc: "As a Frontend Developer, I orchestrate pixels and logic to build seamless user interfaces. When I’m not crafting clean code or optimizing performance, I’m on stage shredding the guitar with my band.",
      highlightsTitle: "Quick Highlights",
      highlightsDesc: "Available for freelance and collaboration. Interested in clean UI, good performance, and meaningful interactions.",
      badges: ["Open to work", "Remote", "React / Next"]
    },
    portfolio: { title: "Portfolio", project1: "Project 1", project1desc: "Short description of project 1.", project2: "Project 2", project2desc: "Short description of project 2." },
    what: { title: "What am I doing?", desc: "A few of the roles I focus on when building products." , roles: [{title:'UI/UX Designer', desc:'Design intuitive interfaces, wireframes and prototypes.'},{title:'Frontend Developer', desc:'Implement responsive, accessible UIs with React.'},{title:'Web Developer', desc:'Build full-featured websites with best practices.'},{title:'Backend Developer', desc:'Design APIs, databases, and server-side logic.'}] },
    skills: { title: "Skills", desc: "A selection of core skills I use to build products." },
    portfolio: { title: "Portfolio", desc: "Selected projects and case studies.", note: "Selected projects and case studies. Click View to read a brief overview.", project1: "Project 1", project1desc: "Short description of project 1.", project2: "Project 2", project2desc: "Short description of project 2.", view: "View" },
    contact: { title: "Let's build something great", desc: "Prefer quick messages? Find me on social media below — or send a short email. I reply to meaningful messages.", sendEmail: "Send Email", email: "diptabeldoz40@gmail.com", privacy: "I prioritize privacy — I won't share your contact details.", form: { name: "Name", email: "Email", message: "Message", send: "Send" } },
    skills: { title: "Skills", desc: "A selection of core skills I use to build products." },
    experience: {
      title: "Education & Experience",
      tabs: { education: "Education", work: "Work / Intern Experience" },
      educationList: [
        { id: 'ub', title: 'University of Brawijaya', date: 'Associate Degree • 2023 - 2026 (Expected)', img: '/logos/logo-ub.png', desc: 'Information Technology (D3 Program). Focused on software development, web technologies, system design, and practical project-based learning.' },
        { id: 'smk', title: 'SMKN 2 Probolinggo', date: 'Vocational High School • 2021 - 2023', img: '/logos/logo-smk.png', desc: 'Majored in Computer & Network Engineering. Completed practical projects in network configuration and basic server setup, participated in workshops.' },
        { id: 'smp', title: 'SMPN 2 Probolinggo', date: 'Junior High School • 2017 - 2020', img: '/logos/logo-smp.png', desc: 'Completed general junior high school education with a standard academic curriculum.' },
        { id: 'sd', title: 'SDN Kebonsari Kulon 3 Probolinggo', date: 'Elementary School • 2011 - 2017', img: '/logos/logo-sd.png', desc: 'Completed primary education with a standard elementary school curriculum.' }
      ],
      workList: [
        { id: 'paiton', title: 'PT. Paiton Operation & Maintenance Indonesia', date: 'Intern Web Developer • Jul 2025 - Dec 2025', img: '/logos/logo-paiton.png', desc: 'Developed a stock opname application using FlutterFlow, Supabase, and SQLite, built landing pages with React.js, and enhanced the company website through custom WordPress themes and PHP plugins within the ITSM System Management team.' },
        { id: 'diskominfo', title: 'Dinas Komunikasi dan Informatika (Diskominfo) Probolinggo City', date: 'IT Technician Intern • Jan 2022 - May 2022', img: '/logos/logo-diskominfo.png', desc: 'Handled hardware and network maintenance, troubleshooting, and technical support for government offices across Probolinggo City, ensuring stable IT infrastructure and daily operational continuity.' }
      ]
    },
    nav: { home: "Home", about: "About", portfolio: "Portfolio", contact: "Contact", experience: "Experience" },
    navbar: { title: "Pradipta - Personal Portfolio", resume: "Resume", contact: "Contact" },
    footer: "All rights reserved.",
    footerTagline: "Building clean interfaces & thoughtful experiences",
    footerMeta: { quickLinks: "Quick Links", connect: "Connect", emailMe: "Email Me" }
  },
  id: {
    home: {
      name: "Pradipta Rahmatan Isya Hertanto",
      subtitle: "Web Developer | Portofolio Minimalis & Premium",
      welcome: "Saya merancang dan membangun website sederhana dan indah yang berfokus pada kejelasan dan performa.",
      titlePrefix: "Selamat datang di",
      titleFull: "Selamat datang di Situs Portofolio Saya",
      about: "Tentang",
      portfolio: "Portofolio",
      contact: "Kontak",
      cta: { portfolio: "Lihat Portofolio", contact: "Hubungi" }
    },
    aboutSection: { title: "Tentang Saya", desc: "Sebagai Frontend Developer, saya menyusun piksel dan logika untuk membangun antarmuka pengguna yang mulus. Di luar pengkodean, saya bermain gitar di band.", highlightsTitle: "Sorotan Cepat", highlightsDesc: "Tersedia untuk freelance dan kolaborasi. Tertarik pada UI bersih, performa bagus, dan interaksi bermakna.", badges: ["Open to work", "Remote", "React / Next"] },
    portfolio: { title: "Portofolio", project1: "Proyek 1", project1desc: "Deskripsi singkat proyek 1.", project2: "Proyek 2", project2desc: "Deskripsi singkat proyek 2." },
    experience: {
      title: "Pendidikan & Pengalaman",
      tabs: { education: "Pendidikan", work: "Pekerjaan / Magang" },
      educationList: [
        { id: 'ub', title: 'Universitas Brawijaya', date: 'Diploma • 2023 - 2026 (Perkiraan)', img: '/logos/logo-ub.png', desc: 'Teknologi Informasi (Program D3). Fokus pada pengembangan perangkat lunak, teknologi web, desain sistem, dan pembelajaran berbasis proyek.' },
        { id: 'smk', title: 'SMKN 2 Probolinggo', date: 'Sekolah Menengah Kejuruan • 2021 - 2023', img: '/logos/logo-smk.png', desc: 'Jurusan Teknik Komputer & Jaringan. Menyelesaikan proyek praktis konfigurasi jaringan dan pengaturan server dasar, berpartisipasi dalam workshop.' },
        { id: 'smp', title: 'SMPN 2 Probolinggo', date: 'Sekolah Menengah Pertama • 2017 - 2020', img: '/logos/logo-smp.png', desc: 'Menyelesaikan pendidikan SMP dengan kurikulum akademik standar.' },
        { id: 'sd', title: 'SDN Kebonsari Kulon 3 Probolinggo', date: 'Sekolah Dasar • 2011 - 2017', img: '/logos/logo-sd.png', desc: 'Menyelesaikan pendidikan dasar dengan kurikulum sekolah dasar standar.' }
      ],
      workList: [
        { id: 'paiton', title: 'PT. Paiton Operation & Maintenance Indonesia', date: 'Intern Web Developer • Jul 2025 - Dec 2025', img: '/logos/logo-paiton.png', desc: 'Mengembangkan aplikasi stock opname menggunakan FlutterFlow, Supabase, dan SQLite, membuat landing page dengan React.js, dan meningkatkan situs perusahaan melalui tema WordPress kustom dan plugin PHP dalam tim ITSM.' },
        { id: 'diskominfo', title: 'Dinas Komunikasi dan Informatika (Diskominfo) Kota Probolinggo', date: 'Magang Teknisi IT • Jan 2022 - Mei 2022', img: '/logos/logo-diskominfo.png', desc: 'Menangani pemeliharaan perangkat keras dan jaringan, troubleshooting, dan dukungan teknis untuk kantor pemerintah di Kota Probolinggo.' }
      ]
    },
    what: { title: "Apa yang saya kerjakan?", desc: "Beberapa peran yang saya fokuskan saat membangun produk.", roles: [{title:'UI/UX Designer', desc:'Mendesain antarmuka intuitif, wireframe, dan prototipe.'},{title:'Frontend Developer', desc:'Mengimplementasikan UI responsif dan aksesibel dengan React.'},{title:'Web Developer', desc:'Membangun website penuh dengan praktik terbaik.'},{title:'Backend Developer', desc:'Merancang API, basis data, dan logika sisi server.'}] },
    skills: { title: "Keterampilan", desc: "Sejumlah keterampilan inti yang saya gunakan untuk membangun produk." },
    portfolio: { title: "Portofolio", desc: "Beberapa proyek dan studi kasus terpilih.", note: "Beberapa proyek dan studi kasus terpilih. Klik Lihat untuk membaca ringkasan singkat.", project1: "Proyek 1", project1desc: "Deskripsi singkat proyek 1.", project2: "Proyek 2", project2desc: "Deskripsi singkat proyek 2.", view: "Lihat" },
    contact: { title: "Mari bangun sesuatu yang hebat", desc: "Butuh pesan cepat? Temukan saya di media sosial — atau kirim email singkat. Saya membalas pesan yang bermakna.", sendEmail: "Kirim Email", email: "diptabeldoz40@gmail.com", privacy: "Saya menghargai privasi — saya tidak akan membagikan detail kontak Anda.", form: { name: "Nama", email: "Email", message: "Pesan", send: "Kirim" } },
    skills: { title: "Keterampilan", desc: "Sejumlah keterampilan inti yang saya gunakan untuk membangun produk." },
    nav: { home: "Beranda", about: "Tentang", portfolio: "Portofolio", contact: "Kontak", experience: "Pengalaman" },
    navbar: { title: "Pradipta - Portofolio Pribadi", resume: "Resume", contact: "Kontak" },
    footer: "Seluruh hak cipta dilindungi.",
    footerTagline: "Membangun antarmuka bersih & pengalaman bermakna",
    footerMeta: { quickLinks: "Tautan Cepat", connect: "Hubungkan", emailMe: "Kirim Email" }
  }
};

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: any;
}>({ locale: "en", setLocale: () => {}, t: translations.en });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Start with the server default to avoid hydration mismatch.
  const [locale, setLocale] = useState<Locale>('en');

  // On mount, pick up a saved locale from localStorage (client-only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('locale');
      console.log('I18n: mount - saved locale:', saved);
      if (saved === 'en' || saved === 'id') {
        if (saved !== locale) setLocale(saved as Locale);
      }
    } catch (e) {}
  }, []);

  // Persist locale and update document language when it changes
  useEffect(() => {
    try { localStorage.setItem('locale', locale); } catch (e) {}
    try { document.documentElement.lang = locale; } catch (e) {}
    console.log('I18n: locale changed ->', locale);
  }, [locale]);

  const t = translations[locale] ?? translations['en'];
  if (!translations[locale]) {
    console.warn(`I18n: missing translations for locale ${locale}, falling back to 'en'`);
  }
  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

