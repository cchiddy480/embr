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

  // Keyboard fallback: double-press Escape within 1.5s
  useEffect(() => {
    let escCount = 0;
    let escTimer: NodeJS.Timeout | null = null;
    const onKeyDown = async (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        escCount += 1;
        if (escTimer) clearTimeout(escTimer);
        escTimer = setTimeout(() => { escCount = 0; }, 1500);
        if (escCount >= 2) {
          await clearConfig();
          escCount = 0;
          if (escTimer) clearTimeout(escTimer);
          window.location.reload();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (escTimer) clearTimeout(escTimer);
    };
  }, [clearConfig]);

  // Only show escape mechanism when a client config is loaded
  if (!config) return null;

  return (
    <div
      onClick={handleEscapeClick}
      onDoubleClick={async () => { await clearConfig(); window.location.reload(); }}
      onContextMenu={async (e) => { e.preventDefault(); await clearConfig(); window.location.reload(); }}
      className="fixed top-0 left-0 cursor-pointer"
      style={{ 
        width: '48px',
        height: '48px',
        background: 'transparent',
        zIndex: 2147483647,
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
      {children}
    </ClientConfigProvider>
  );
} 