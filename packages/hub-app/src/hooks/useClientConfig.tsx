'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { ClientConfig } from '../types/client';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Preferences } from '@capacitor/preferences';

const STORAGE_CLIENT_ID_KEY = 'embr-last-client-id';
const STORAGE_CONFIG_KEY = 'embr-client-config';

interface ClientConfigContextType {
  config: ClientConfig | null;
  isExpired: boolean;
  loading: boolean;
  loadConfig: (clientId?: string) => Promise<void>;
  clearConfig: () => Promise<void>;
}

const ClientConfigContext = createContext<ClientConfigContextType | undefined>(undefined);

export function ClientConfigProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [config, setConfig] = useState<ClientConfig | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Emergency timeout to prevent infinite loading
  useEffect(() => {
    const emergencyTimeout = setTimeout(() => {
      if (loading) {
        console.warn('[ClientConfigProvider] Emergency timeout - forcing loading to false');
        setLoading(false);
      }
    }, 3000); // 3 second emergency timeout
    
    return () => clearTimeout(emergencyTimeout);
  }, [loading]);
  
  // Immediate fallback for browser environments
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      // In browser, if no cached config, immediately stop loading
      const cachedConfig = localStorage.getItem(STORAGE_CONFIG_KEY);
      if (!cachedConfig) {
        console.log('[ClientConfigProvider] No cached config in browser - stopping loading immediately');
        setLoading(false);
      }
    }
  }, []);

  // Check if config is expired
  const checkExpiry = useCallback((expiry: string | null | undefined) => {
    if (!expiry) {
      setIsExpired(false);
      return;
    }
    const expiryDate = new Date(expiry);
    const now = new Date();
    console.log('[checkExpiry] expiryDate:', expiryDate, 'now:', now);
    setIsExpired(expiryDate < now);
  }, []);

  useEffect(() => {
    console.log('[ClientConfigProvider] MOUNTED');
  }, []);
  useEffect(() => {
    console.log('[ClientConfigProvider] config changed:', config);
  }, [config]);

  useEffect(() => {
    // On mount, try to load cached config from storage
    (async () => {
      console.log('[ClientConfigProvider] Starting initial load...');
      setLoading(true);
      
      // Very aggressive timeout - 1 second max
      const loadingTimeout = setTimeout(() => {
        console.warn('[ClientConfigProvider] Initial load timed out; releasing loading state');
        setLoading(false);
      }, 1000);
      
      try {
        let cachedConfig: string | null = null;
        
        // Always try localStorage first in browser
        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            cachedConfig = localStorage.getItem(STORAGE_CONFIG_KEY);
            console.log('[ClientConfigProvider] localStorage result:', cachedConfig ? 'found' : 'not found');
          } catch (e) {
            console.warn('[ClientConfigProvider] localStorage access failed:', e);
          }
        }
        
        // If no localStorage result, try Capacitor with very short timeout
        if (!cachedConfig) {
          try {
            const preferencesPromise = Preferences.get({ key: STORAGE_CONFIG_KEY });
            const timeoutPromise = new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Preferences timeout')), 500)
            );
            
            const result = await Promise.race([preferencesPromise, timeoutPromise]) as any;
            cachedConfig = result?.value || null;
            console.log('[ClientConfigProvider] Capacitor result:', cachedConfig ? 'found' : 'not found');
          } catch (prefError) {
            console.warn('[ClientConfigProvider] Capacitor Preferences failed:', prefError);
          }
        }
        
        // Process the cached config if found
        if (cachedConfig) {
          try {
            const parsed = JSON.parse(cachedConfig);
            setConfig(parsed);
            checkExpiry(parsed.expiry);
            console.log('[ClientConfigProvider] Successfully loaded cached config:', parsed.clientId);
          } catch (e) {
            console.warn('[ClientConfigProvider] Failed to parse cached config:', e);
            // Clear invalid config
            if (typeof window !== 'undefined' && window.localStorage) {
              localStorage.removeItem(STORAGE_CONFIG_KEY);
            }
          }
        } else {
          console.log('[ClientConfigProvider] No cached config found');
        }
      } catch (err) {
        console.warn('[ClientConfigProvider] Initial load failed:', err);
      } finally {
        clearTimeout(loadingTimeout);
        setLoading(false);
        console.log('[ClientConfigProvider] Initial load complete, loading set to false');
      }
    })();
  }, [checkExpiry]);

  // Access code to client ID mapping - static fallback for known codes
  const ACCESS_CODE_MAPPING: Record<string, string> = {
    'WILDROOTS2025': 'wildroots-festival-2025',
    'PEAKFORM2025': 'peakform-physio-2025',
    // Add more access codes here as needed
  };

  // Helper function to resolve access code to client ID
  const resolveClientId = async (input: string): Promise<string> => {
    const upperInput = input.toUpperCase();
    
    // First check static mapping
    const clientIdFromMapping = ACCESS_CODE_MAPPING[upperInput];
    if (clientIdFromMapping) {
      console.log('[resolveClientId] Access code mapped from static:', input, '→', clientIdFromMapping);
      return clientIdFromMapping;
    }

    // Try to find access code by scanning config files
    const configFileNames = [
      'wildroots-festival-2025.json',
      'peakform-physio-2025.json',
      'smith-jones-wedding-2024.json', 
      'demo-festival.json'
      // Add more as needed, or make this dynamic
    ];

    for (const fileName of configFileNames) {
      try {
        const clientId = fileName.replace('.json', '');
        const res = await fetch(`/client-configs/${fileName}`);
        if (res.ok) {
          const config = await res.json();
          if (config.accessCode && config.accessCode.toUpperCase() === upperInput) {
            console.log('[resolveClientId] Access code found in config:', input, '→', clientId);
            return clientId;
          }
        }
      } catch (error) {
        // Continue to next config file
        console.log('[resolveClientId] Could not check', fileName, error);
      }
    }

    // If not an access code, treat as direct client ID
    console.log('[resolveClientId] Using as direct client ID:', input);
    return input;
  };

  // Load config from static file or fallback to generic
  const loadConfig = useCallback(async (clientIdOrAccessCode?: string) => {
    console.log('[loadConfig] called with clientIdOrAccessCode:', clientIdOrAccessCode);
    console.log('[loadConfig] window:', typeof window);
    
    if (!clientIdOrAccessCode) {
      // Try to load from storage
      try {
        let cachedConfig: string | null = null;
        
        if (typeof window !== 'undefined' && window.localStorage) {
          cachedConfig = localStorage.getItem(STORAGE_CONFIG_KEY);
        } else {
          const { value } = await Preferences.get({ key: STORAGE_CONFIG_KEY });
          cachedConfig = value;
        }
        
        if (cachedConfig) {
          try {
            const parsed = JSON.parse(cachedConfig);
            setConfig(parsed);
            checkExpiry(parsed.expiry);
            console.log('[loadConfig] loaded from storage:', parsed);
            return;
          } catch (error) {
            console.error('Failed to parse cached config:', error);
            // Clear invalid config
            if (typeof window !== 'undefined' && window.localStorage) {
              localStorage.removeItem(STORAGE_CONFIG_KEY);
            } else {
              await Preferences.remove({ key: STORAGE_CONFIG_KEY });
            }
            throw new Error('Invalid cached config');
          }
        } else {
          throw new Error('No cached config found');
        }
      } catch (error) {
        console.error('Failed to load cached config:', error);
        throw new Error('No cached config found');
      }
    }

    // Resolve access code to client ID
    const clientId = await resolveClientId(clientIdOrAccessCode);

    // Try to fetch from Firestore first
    try {
      const docRef = doc(db, 'client-configs', clientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const fetchedConfig = docSnap.data() as ClientConfig;
        setConfig(fetchedConfig);
        checkExpiry(fetchedConfig.expiry);
        // Save to storage
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(STORAGE_CLIENT_ID_KEY, clientId);
          localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(fetchedConfig));
        } else {
          await Preferences.set({ key: STORAGE_CLIENT_ID_KEY, value: clientId });
          await Preferences.set({ key: STORAGE_CONFIG_KEY, value: JSON.stringify(fetchedConfig) });
        }
        console.log('[loadConfig] loaded from Firestore:', fetchedConfig);
        return;
      } else {
        throw new Error('Config not found in Firestore');
      }
    } catch (err) {
      console.warn(`[ClientConfigProvider] Could not fetch config for ${clientId} from Firestore, falling back to static.`, err);
    }
    
    // Fallback: fetch from static JSON
    try {
      const res = await fetch(`/client-configs/${clientId}.json`);
      if (!res.ok) throw new Error('Config not found');
      const fetchedConfig = await res.json();
      setConfig(fetchedConfig);
      checkExpiry(fetchedConfig.expiry);
      // Save to storage
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_CLIENT_ID_KEY, clientId);
        localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(fetchedConfig));
      } else {
        await Preferences.set({ key: STORAGE_CLIENT_ID_KEY, value: clientId });
        await Preferences.set({ key: STORAGE_CONFIG_KEY, value: JSON.stringify(fetchedConfig) });
      }
      console.log('[loadConfig] loaded from static JSON:', fetchedConfig);
      return;
    } catch (err) {
      console.warn(`[ClientConfigProvider] Could not fetch config for ${clientId} from static JSON.`, err);
    }

    // Fallback: create a generic config for unknown clientIds
    const genericConfig: ClientConfig = {
      clientId,
      name: `App for ${clientId}`,
      description: `A custom app for ${clientId}`,
      version: '1.0.0',
      expiry: '2024-12-31T23:59:59Z',
      theme: {
        colors: {
          primary: '#0F766E',
          secondary: '#38F9E4',
          accent: '#FFD700',
        background: undefined,
          surface: '#22304a',
          text: '#FFFFFF',
          textSecondary: '#CCCCCC'
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter'
        },
        logo: {
          light: '/embr_logo_transparent_dark.svg',
          dark: '/embr_logo_transparent_dark.svg',
          favicon: '/favicon.ico'
        }
      },
      navigation: [
        {
          id: 'home',
          title: 'Home',
          icon: 'home',
          path: '/'
        }
      ],
      features: {
        offline: true,
        pushNotifications: false,
        qrCode: false,
        analytics: false
      },
      content: {},
      pushNotifications: {
        topics: [`embr_${clientId}`],
        defaultTitle: 'Embr App',
        defaultIcon: '/icon.png'
      },
      analytics: {
        enabled: false
      }
    };

    setConfig(genericConfig);
    checkExpiry(genericConfig.expiry);
    // Save to storage
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_CLIENT_ID_KEY, clientId);
      localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(genericConfig));
    } else {
      await Preferences.set({ key: STORAGE_CLIENT_ID_KEY, value: clientId });
      await Preferences.set({ key: STORAGE_CONFIG_KEY, value: JSON.stringify(genericConfig) });
    }
    console.log('[loadConfig] loaded generic config:', genericConfig);
  }, [checkExpiry]);

  // Clear config
  const clearConfig = useCallback(async () => {
    setConfig(null);
    setIsExpired(false);
    setLoading(false);
    
    // Clear from storage
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_CLIENT_ID_KEY);
      localStorage.removeItem(STORAGE_CONFIG_KEY);
    } else {
      await Preferences.remove({ key: STORAGE_CLIENT_ID_KEY });
      await Preferences.remove({ key: STORAGE_CONFIG_KEY });
    }
  }, []);

  return (
    <ClientConfigContext.Provider value={{ config, isExpired, loading, loadConfig, clearConfig }}>
      {children}
    </ClientConfigContext.Provider>
  );
}

export function useClientConfig() {
  const ctx = useContext(ClientConfigContext);
  console.log('[useClientConfig] called, ctx:', ctx);
  if (!ctx) throw new Error('useClientConfig must be used within a ClientConfigProvider');
  return ctx;
} 