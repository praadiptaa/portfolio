"use client";
import AnimatedContainer from "../../components/AnimatedContainer";

export default function AboutPage() {
  return (
    <AnimatedContainer>
      <main className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="max-w-xl text-lg text-gray-400">Hi! I'm [Your Name], a web developer focused on minimalist design and premium user experience. I love building modern websites with a monochrome aesthetic.</p>
      </main>
    </AnimatedContainer>
  );
}