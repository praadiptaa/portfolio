

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { I18nProvider } from "../lib/i18n";
import { MotionProvider } from "../lib/MotionProvider";
import { SmoothScrollScript } from "../components/SmoothScrollScript";
import Footer from "../components/Footer";
import LanguageFab from "../components/LanguageFab";
import MusicFab from "../components/MusicFab";
import ClientErrorBoundary from "../components/ClientErrorBoundary";
import Background3D from "../components/Background3D";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pradipta — Personal Portfolio",
  description: "Crafting elegant, high-performance web experiences. Portfolio and case studies.",
  openGraph: {
    title: "Pradipta — Portfolio",
    description: "Selected projects and case studies showcasing design and frontend work.",
    url: "https://yourdomain.com",
    images: [
      {
        url: "/profile.jpeg",
        alt: "Pradipta Rahmatan Isya Hertanto",
      },
    ],
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent text-foreground`}>
        <a href="#home" className="skip-link sr-only focus:not-sr-only focus:translate-y-0 focus:top-4">Skip to content</a>
        <I18nProvider>
          <MotionProvider>
            <SmoothScrollScript />
            <header className="w-full flex justify-center border-b border-gray-800/20 mb-8 sticky top-0 z-50 bg-transparent backdrop-blur">
              <Navbar />
            </header>
            <Background3D />
            <main className="flex-1 flex flex-col items-center justify-center w-full relative z-10">
              <ClientErrorBoundary>
                {children}
              </ClientErrorBoundary>
            </main>
            <LanguageFab />
            <MusicFab />
            {/* client footer renders translations */}
            <Footer />
          </MotionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
