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
    // On mount, try to load cached config from Capacitor Storage
    (async () => {
      setLoading(true);
      const { value: cachedConfig } = await Preferences.get({ key: STORAGE_CONFIG_KEY });
      if (cachedConfig) {
        try {
          const parsed = JSON.parse(cachedConfig);
          setConfig(parsed);
          checkExpiry(parsed.expiry);
          console.log('[ClientConfigProvider] loaded cached config from Capacitor Storage:', parsed);
        } catch (e) {
          console.warn('[ClientConfigProvider] Failed to parse cached config from Capacitor Storage');
        }
      }
      setLoading(false);
    })();
  }, [checkExpiry]);

  // Load config from static file or fallback to generic
  const loadConfig = useCallback(async (clientId?: string) => {
    console.log('[loadConfig] called with clientId:', clientId);
    console.log('[loadConfig] window:', typeof window);
    if (!clientId) {
      // Try to load from Capacitor Storage
      const { value: cachedConfig } = await Preferences.get({ key: STORAGE_CONFIG_KEY });
      if (cachedConfig) {
        try {
          const parsed = JSON.parse(cachedConfig);
          setConfig(parsed);
          checkExpiry(parsed.expiry);
          console.log('[loadConfig] loaded from Capacitor Storage:', parsed);
          return;
        } catch (error) {
          console.error('Failed to parse cached config:', error);
          await Preferences.remove({ key: STORAGE_CONFIG_KEY });
          throw new Error('Invalid cached config');
        }
      } else {
        throw new Error('No cached config found');
      }
    }

    // Try to fetch from Firestore first
    try {
      const docRef = doc(db, 'client-configs', clientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const fetchedConfig = docSnap.data();
        setConfig(fetchedConfig);
        checkExpiry(fetchedConfig.expiry);
        await Preferences.set({ key: STORAGE_CLIENT_ID_KEY, value: clientId });
        await Preferences.set({ key: STORAGE_CONFIG_KEY, value: JSON.stringify(fetchedConfig) });
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
      await Preferences.set({ key: STORAGE_CLIENT_ID_KEY, value: clientId });
      await Preferences.set({ key: STORAGE_CONFIG_KEY, value: JSON.stringify(fetchedConfig) });
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
          background: '#101926',
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
    await Preferences.set({ key: STORAGE_CLIENT_ID_KEY, value: clientId });
    await Preferences.set({ key: STORAGE_CONFIG_KEY, value: JSON.stringify(genericConfig) });
    console.log('[loadConfig] loaded generic config:', genericConfig);
  }, [checkExpiry]);

  // Clear config
  const clearConfig = useCallback(async () => {
    setConfig(null);
    setIsExpired(false);
    await Preferences.remove({ key: STORAGE_CLIENT_ID_KEY });
    await Preferences.remove({ key: STORAGE_CONFIG_KEY });
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