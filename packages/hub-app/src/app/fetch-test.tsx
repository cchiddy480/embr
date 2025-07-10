'use client';
import { useState } from 'react';

export default function FetchTest() {
  const [result, setResult] = useState<string>('');

  const handleFetch = async () => {
    try {
      const res = await fetch('/client-configs/smith-jones-wedding-2024.json');
      if (!res.ok) throw new Error('Fetch failed: ' + res.status);
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
      console.log('[FetchTest] Success:', data);
    } catch (err) {
      setResult('Error: ' + err);
      console.error('[FetchTest] Error:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#101926] text-white font-sans">
      <h1 className="text-2xl mb-4">Fetch Test</h1>
      <button
        onClick={handleFetch}
        className="bg-[#0F766E] hover:bg-[#13a89a] text-white font-semibold py-2 px-4 rounded-xl mb-6"
      >
        Fetch smith-jones-wedding-2024.json
      </button>
      <pre className="bg-gray-900 rounded-lg p-4 w-full max-w-xl overflow-x-auto text-xs">
        {result}
      </pre>
    </div>
  );
} 