import React from 'react';
import { ClientConfig } from '../types/client';

interface ClientAppProps {
  config: ClientConfig;
  onReset: () => void;
}

export function ClientApp({ config, onReset }: ClientAppProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
      <h2 className="text-2xl font-bold mb-4">{config.name}</h2>
      <pre className="bg-gray-100 rounded-lg p-4 w-full max-w-xl overflow-x-auto mb-4 text-xs">
        {JSON.stringify(config, null, 2)}
      </pre>
      <button
        onClick={onReset}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Reset App
      </button>
    </div>
  );
} 