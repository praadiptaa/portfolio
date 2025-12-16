"use client";
import AnimatedContainer from "../../components/AnimatedContainer";

export default function ContactPage() {
  return (
    <AnimatedContainer>
      <main className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <p className="text-lg text-gray-400 mb-6">Feel free to contact me via email at <a href="mailto:email@domain.com" className="underline text-white">email@domain.com</a> or fill the form below.</p>
        <form className="flex flex-col gap-4 w-full max-w-md">
          <input type="text" placeholder="Name" className="p-3 rounded bg-gray-800 text-white" />
          <input type="email" placeholder="Email" className="p-3 rounded bg-gray-800 text-white" />
          <textarea placeholder="Message" className="p-3 rounded bg-gray-800 text-white" rows={4} />
          <button type="submit" className="bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition">Send</button>
        </form>
      </main>
    </AnimatedContainer>
  );
}