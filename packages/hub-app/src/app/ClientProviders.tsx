'use client';
import { ClientConfigProvider, useClientConfig } from '../hooks/useClientConfig';
import { useEffect, useRef, useState } from 'react';

// Escape mechanism component
function EscapeMechanism() {
  const { config, clearConfig } = useClientConfig();
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastClickTimeRef = useRef<number>(0);

  const handleEscapeClick = async () => {
    const now = Date.now();
    
    // Reset if more than 2 seconds between clicks
    if (now - lastClickTimeRef.current > 2000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    
    lastClickTimeRef.current = now;

    // Clear existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Set new timeout to reset click count
    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2000);

    // If 5 clicks detected, clear config and reload
    if (clickCount + 1 >= 5) {
      console.log('[EscapeMechanism] 5 clicks detected - clearing config and returning to hub');
      await clearConfig();
      setClickCount(0);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      // Force reload to return to hub
      window.location.reload();
    }
  };

  // Only show escape mechanism when a client config is loaded
  if (!config) return null;

  return (
    <div
      onClick={handleEscapeClick}
      className="fixed top-0 left-0 w-10 h-10 z-50 cursor-pointer"
      style={{ 
        background: 'transparent',
        // Debug: uncomment to see the clickable area
        // background: 'rgba(255, 0, 0, 0.1)' 
      }}
      title="Escape hatch: 5 rapid clicks to return to hub"
    />
  );
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClientConfigProvider>
      <EscapeMechanism />
      {/* Ensure a valid ReactNode for older type resolution */}
      <>{children}</>
    </ClientConfigProvider>
  );
} 