"use client";
import AnimatedContainer from "../../components/AnimatedContainer";

export default function PortfolioPage() {
  return (
    <AnimatedContainer>
      <main className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Project 1</h2>
            <p className="text-gray-400">Short description of project 1.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Project 2</h2>
            <p className="text-gray-400">Short description of project 2.</p>
          </div>
        </div>
      </main>
    </AnimatedContainer>
  );
}