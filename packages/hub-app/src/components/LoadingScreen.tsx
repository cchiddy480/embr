import React from 'react';

export function LoadingScreen({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--embr-background)' }}>
      {/* Smoother animated spinner */}
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mb-6" style={{ borderColor: 'var(--embr-secondary-color)' }} />
        <div className="text-lg font-medium opacity-80" style={{ color: 'var(--embr-text)' }}>{message}</div>
      </div>
    </div>
  );
} 