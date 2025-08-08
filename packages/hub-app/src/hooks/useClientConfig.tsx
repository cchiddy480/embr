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

  // Storage helpers: gracefully fall back to localStorage when Capacitor is not available
  const storage = {
    async get(key: string): Promise<string | null> {
      try {
        const { value } = await Preferences.get({ key });
        return value ?? null;
      } catch (err) {
        try {
          return typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
        } catch {
          return null;
        }
      }
    },
    async set(key: string, value: string): Promise<void> {
      try {
        await Preferences.set({ key, value });
      } catch (err) {
        try {
          if (typeof window !== 'undefined') window.localStorage.setItem(key, value);
        } catch {}
      }
    },
    async remove(key: string): Promise<void> {
      try {
        await Preferences.remove({ key });
      } catch (err) {
        try {
          if (typeof window !== 'undefined') window.localStorage.removeItem(key);
        } catch {}
      }
    }
  };

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
    // On mount, try to load cached config (Capacitor Preferences or localStorage fallback)
    (async () => {
      setLoading(true);
      try {
        const cachedConfig = await storage.get(STORAGE_CONFIG_KEY);
        if (cachedConfig) {
          try {
            const parsed = JSON.parse(cachedConfig);
            setConfig(parsed);
            checkExpiry(parsed.expiry);
            console.log('[ClientConfigProvider] loaded cached config:', parsed);
          } catch (e) {
            console.warn('[ClientConfigProvider] Failed to parse cached config', e);
            await storage.remove(STORAGE_CONFIG_KEY);
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [checkExpiry]);

  // Access code to client ID mapping - static fallback for known codes
  const ACCESS_CODE_MAPPING: Record<string, string> = {
    'WILDROOTS2025': 'wildroots-festival-2025',
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
      // Try to load from Capacitor Storage
      const cachedConfig = await storage.get(STORAGE_CONFIG_KEY);
      if (cachedConfig) {
        try {
          const parsed = JSON.parse(cachedConfig);
          setConfig(parsed);
          checkExpiry(parsed.expiry);
          console.log('[loadConfig] loaded from cached storage:', parsed);
          return;
        } catch (error) {
          console.error('Failed to parse cached config:', error);
          await storage.remove(STORAGE_CONFIG_KEY);
          throw new Error('Invalid cached config');
        }
      } else {
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
         await storage.set(STORAGE_CLIENT_ID_KEY, clientId);
         await storage.set(STORAGE_CONFIG_KEY, JSON.stringify(fetchedConfig));
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
      await storage.set(STORAGE_CLIENT_ID_KEY, clientId);
      await storage.set(STORAGE_CONFIG_KEY, JSON.stringify(fetchedConfig));
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
    await storage.set(STORAGE_CLIENT_ID_KEY, clientId);
    await storage.set(STORAGE_CONFIG_KEY, JSON.stringify(genericConfig));
    console.log('[loadConfig] loaded generic config:', genericConfig);
  }, [checkExpiry]);

  // Clear config
  const clearConfig = useCallback(async () => {
    setConfig(null);
    setIsExpired(false);
    await storage.remove(STORAGE_CLIENT_ID_KEY);
    await storage.remove(STORAGE_CONFIG_KEY);
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