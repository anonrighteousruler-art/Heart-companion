import Disclaimer from '@/components/Disclaimer';
import ReflectionPrompt from '@/components/ReflectionPrompt';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-serif font-bold text-stone-800 mb-2">Heart&apos;s Companion</h1>
          <p className="text-stone-600 italic">A gentle space for reflection, remembrance, and peace.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
            <h2 className="text-2xl font-serif font-semibold text-stone-800 mb-4">Daily Reflection</h2>
            <p className="text-stone-600 mb-6">
              Take a moment to breathe. Here is a gentle thought for you today.
            </p>
            <ReflectionPrompt />
          </section>
          <Chatbot />
        </div>

        <Disclaimer />
      </div>
    </main>
  );
}
