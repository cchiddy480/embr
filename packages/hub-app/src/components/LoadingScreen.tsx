import React from 'react';

export function LoadingScreen({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Smoother animated spinner */}
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#38F9E4] border-opacity-80 mb-6" />
        <div className="text-white text-lg font-medium opacity-80">{message}</div>
      </div>
    </div>
  );
} 