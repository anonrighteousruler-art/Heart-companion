'use client';

import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { beliefSystem } from '@/lib/beliefSystem';
import { Send, Bot, User } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [allowExpansion, setAllowExpansion] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // RAG simulation: Retrieve relevant beliefs
      const context = JSON.stringify(beliefSystem);
      const prompt = `
        You are a gentle, empathetic, and multilingual companion for someone grieving.
        Respond in the language the user uses.
        You must stay grounded in the provided belief system.
        
        Belief System: ${context}
        
        Expansion Permission: ${allowExpansion ? 'GRANTED' : 'DENIED'}
        
        IF Expansion Permission is GRANTED: You may incorporate modern therapeutic/counseling methods, ancient Hebrew/Jewish methods, or other helpful avenues for grief/loss, while maintaining empathy and conversational continuity.
        IF Expansion Permission is DENIED: You must NOT branch outside the provided belief system.
        
        User Query: ${input}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const botMessage = { role: 'bot' as const, text: response.text || 'I am here to listen and offer comfort.' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in chatbot:', error);
      setMessages((prev) => [...prev, { role: 'bot', text: 'I am here to listen. Please know you are not alone.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col h-[550px]">
      <h2 className="text-xl font-serif font-semibold text-stone-800 mb-4">Heart&apos;s Companion Chat</h2>
      
      <div className="flex items-center gap-2 mb-4 text-sm text-stone-600">
        <input
          type="checkbox"
          id="expansion"
          checked={allowExpansion}
          onChange={(e) => setAllowExpansion(e.target.checked)}
          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-stone-300 rounded"
        />
        <label htmlFor="expansion">Allow expansion beyond core beliefs</label>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'bot' && <Bot className="h-6 w-6 text-amber-600" />}
            <div className={`p-3 rounded-xl max-w-[80%] ${msg.role === 'user' ? 'bg-amber-100 text-stone-800' : 'bg-stone-100 text-stone-700'}`}>
              {msg.text}
            </div>
            {msg.role === 'user' && <User className="h-6 w-6 text-stone-600" />}
          </div>
        ))}
        {loading && <div className="text-stone-500 italic">Thinking...</div>}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Ask a question or share your thoughts..."
        />
        <button onClick={sendMessage} className="p-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
