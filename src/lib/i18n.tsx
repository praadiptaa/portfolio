import { createContext, useContext } from "react";

export type Locale = "en" | "id";

const translations = {
  en: {
    home: {
      name: "[Your Name]",
      subtitle: "Web Developer | Minimalist & Premium Portfolio",
      welcome: "Welcome to my portfolio. I build modern websites with minimalist, premium, and monochrome design.",
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact"
    },
    about: {
      title: "About Me",
      desc: "Hi! I'm [Your Name], a web developer focused on minimalist design and premium user experience. I love building modern websites with a monochrome aesthetic."
    },
    portfolio: {
      title: "Portfolio",
      project1: "Project 1",
      project1desc: "Short description of project 1.",
      project2: "Project 2",
      project2desc: "Short description of project 2."
    },
    contact: {
      title: "Contact",
      desc: "Feel free to contact me via email at ",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send"
      }
    },
    nav: {
      home: "Home",
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact"
    },
    footer: "All rights reserved."
  },
  id: {
    home: {
      name: "[Nama Anda]",
      subtitle: "Web Developer | Portofolio Minimalis & Premium",
      welcome: "Selamat datang di portofolio saya. Saya membangun website modern dengan desain minimalis, premium, dan nuansa monochrome.",
      about: "Tentang",
      portfolio: "Portofolio",
      contact: "Kontak"
    },
    about: {
      title: "Tentang Saya",
      desc: "Halo! Saya adalah [Nama Anda], seorang web developer yang fokus pada desain minimalis dan pengalaman pengguna premium. Saya suka membangun website modern dengan sentuhan estetika monochrome."
    },
    portfolio: {
      title: "Portofolio",
      project1: "Proyek 1",
      project1desc: "Deskripsi singkat proyek 1.",
      project2: "Proyek 2",
      project2desc: "Deskripsi singkat proyek 2."
    },
    contact: {
      title: "Kontak",
      desc: "Silakan hubungi saya melalui email di ",
      form: {
        name: "Nama",
        email: "Email",
        message: "Pesan",
        send: "Kirim"
      }
    },
    nav: {
      home: "Beranda",
      about: "Tentang",
      portfolio: "Portofolio",
      contact: "Kontak"
    },
    footer: "Seluruh hak cipta dilindungi."
  }
};

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof translations["en"];
}>({
  locale: "en",
  setLocale: () => {},
  t: translations.en
});



"use client";
import React, { useState } from "react";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];
  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
"use client";
import React, { createContext, useContext, useState } from "react";

export type Locale = "en" | "id";

const translations = {
  en: {
    home: {
      name: "[Your Name]",
      subtitle: "Web Developer | Minimalist & Premium Portfolio",
      welcome: "Welcome to my portfolio. I build modern websites with minimalist, premium, and monochrome design.",
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact"
    },
    about: {
      title: "About Me",
      desc: "Hi! I'm [Your Name], a web developer focused on minimalist design and premium user experience. I love building modern websites with a monochrome aesthetic."
    },
    portfolio: {
      title: "Portfolio",
      project1: "Project 1",
      project1desc: "Short description of project 1.",
      project2: "Project 2",
      project2desc: "Short description of project 2."
    },
    contact: {
      title: "Contact",
      desc: "Feel free to contact me via email at ",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send"
      }
    },
    nav: {
      home: "Home",
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact"
    },
    footer: "All rights reserved."
  },
  id: {
    home: {
      name: "[Nama Anda]",
      subtitle: "Web Developer | Portofolio Minimalis & Premium",
      welcome: "Selamat datang di portofolio saya. Saya membangun website modern dengan desain minimalis, premium, dan nuansa monochrome.",
      about: "Tentang",
      portfolio: "Portofolio",
      contact: "Kontak"
    },
    about: {
      title: "Tentang Saya",
      desc: "Halo! Saya adalah [Nama Anda], seorang web developer yang fokus pada desain minimalis dan pengalaman pengguna premium. Saya suka membangun website modern dengan sentuhan estetika monochrome."
    },
    portfolio: {
      title: "Portofolio",
      project1: "Proyek 1",
      project1desc: "Deskripsi singkat proyek 1.",
      project2: "Proyek 2",
      project2desc: "Deskripsi singkat proyek 2."
    },
    contact: {
      title: "Kontak",
      desc: "Silakan hubungi saya melalui email di ",
      form: {
        name: "Nama",
        email: "Email",
        message: "Pesan",
        send: "Kirim"
      }
    },
    nav: {
      home: "Beranda",
      about: "Tentang",
      portfolio: "Portofolio",
      contact: "Kontak"
    },
    footer: "Seluruh hak cipta dilindungi."
  }
};

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof translations["en"];
}>({
  locale: "en",
  setLocale: () => {},
  t: translations.en
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];
  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
