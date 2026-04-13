'use client';

import { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, RefreshCw } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

export default function ReflectionPrompt() {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPrompt = async () => {
    setLoading(true);
    try {
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: 'Provide a very short, gentle, and comforting faith-based (Christian) reflection prompt for someone grieving the loss of a loved one. Keep it under 2 sentences.',
      });
      setPrompt(result.text || 'Take a deep breath and know that you are loved and never alone.');
    } catch (error) {
      console.error('Error fetching prompt:', error);
      setPrompt('Take a deep breath and know that you are loved and never alone.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompt();
  }, []);

  return (
    <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
      <div className="flex items-center gap-2 mb-4 text-stone-700">
        <Sparkles className="h-5 w-5 text-amber-600" />
        <h3 className="font-semibold">Gentle Thought</h3>
      </div>
      {loading ? (
        <p className="text-stone-500 italic">Finding a gentle thought for you...</p>
      ) : (
        <p className="text-stone-800 font-serif text-lg leading-relaxed">{prompt}</p>
      )}
      <button
        onClick={fetchPrompt}
        className="mt-4 flex items-center gap-2 text-sm text-stone-500 hover:text-amber-700 transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        Another thought
      </button>
    </div>
  );
}
