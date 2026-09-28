'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { TripConfigSchema, type TripConfig } from '../types/blocks-schema';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const STORAGE_CLIENT_ID_KEY = 'embr-last-client-id';
const STORAGE_CONFIG_KEY = 'embr-client-config';

interface ClientConfigContextType {
  config: TripConfig | null;
  isExpired: boolean;
  loading: boolean;
  loadConfig: (clientId?: string) => Promise<void>;
  clearConfig: () => Promise<void>;
}

const ClientConfigContext = createContext<ClientConfigContextType | undefined>(undefined);

export function ClientConfigProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [config, setConfig] = useState<TripConfig | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkExpiry = useCallback((expiry: string | null | undefined) => {
    if (!expiry) {
      setIsExpired(false);
      return;
    }
    setIsExpired(new Date(expiry) < new Date());
  }, []);

  useEffect(() => {
    // On mount, try to load cached config from localStorage
    (async () => {
      setLoading(true);
      // Safety valve: never hang the UI on first load
      const loadingTimeout = setTimeout(() => setLoading(false), 3000);
      try {
        const cachedConfig = localStorage.getItem(STORAGE_CONFIG_KEY);
        if (cachedConfig) {
          const parsed = TripConfigSchema.safeParse(JSON.parse(cachedConfig));
          if (parsed.success) {
            setConfig(parsed.data);
            checkExpiry(parsed.data.expiry);
          } else {
            localStorage.removeItem(STORAGE_CONFIG_KEY);
          }
        }
      } catch {
        // Corrupt cache — ignore and continue without it.
      } finally {
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    })();
  }, [checkExpiry]);

  // Resolve an access code to a clientId via Firestore's access-codes/{CODE}
  // collection (written by scripts/configs-push.js). Anything that isn't a
  // known, non-revoked code is treated as a direct clientId/slug — exactly
  // how a real trip link (/c/<id> or ?client=<id>) already works.
  const resolveClientId = useCallback(async (input: string): Promise<string> => {
    const codeUpper = input.toUpperCase();
    try {
      const codeSnap = await getDoc(doc(db, 'access-codes', codeUpper));
      if (codeSnap.exists()) {
        const data = codeSnap.data();
        if (!data.revoked && typeof data.tripId === 'string') return data.tripId;
      }
    } catch (error) {
      console.warn('[resolveClientId] Firestore access-code lookup failed, treating as direct clientId:', error);
    }
    return input;
  }, []);

  const loadConfig = useCallback(async (clientIdOrAccessCode?: string) => {
    if (!clientIdOrAccessCode) {
      const cachedConfig = localStorage.getItem(STORAGE_CONFIG_KEY);
      if (!cachedConfig) throw new Error('No cached config found');
      const parsed = TripConfigSchema.safeParse(JSON.parse(cachedConfig));
      if (!parsed.success) {
        localStorage.removeItem(STORAGE_CONFIG_KEY);
        throw new Error('Invalid cached config');
      }
      setConfig(parsed.data);
      checkExpiry(parsed.data.expiry);
      return;
    }

    const clientId = await resolveClientId(clientIdOrAccessCode);

    const applyConfig = (raw: unknown): boolean => {
      const parsed = TripConfigSchema.safeParse(raw);
      if (!parsed.success) return false;
      setConfig(parsed.data);
      checkExpiry(parsed.data.expiry);
      localStorage.setItem(STORAGE_CLIENT_ID_KEY, clientId);
      localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(parsed.data));
      return true;
    };

    // Firestore is the live source of truth for a deployed guide.
    try {
      const docSnap = await getDoc(doc(db, 'client-configs', clientId));
      if (docSnap.exists() && applyConfig(docSnap.data())) return;
    } catch (err) {
      console.warn(`[ClientConfigProvider] Could not fetch config for ${clientId} from Firestore, falling back to static.`, err);
    }

    // Static JSON fallback — the same file scripts/configs-push.js reads
    // from and scripts/create-client.js writes to, useful if Firestore is
    // briefly unreachable or a guide hasn't been pushed yet.
    try {
      const res = await fetch(`/client-configs/${clientId}.json`);
      if (res.ok && applyConfig(await res.json())) return;
    } catch (err) {
      console.warn(`[ClientConfigProvider] Could not fetch config for ${clientId} from static JSON.`, err);
    }

    // Nothing valid found — the caller renders this as an honest "this
    // link isn't pointing at a guide" state, not a fabricated placeholder.
    throw new Error(`No guide found for ${clientId}`);
  }, [checkExpiry, resolveClientId]);

  const clearConfig = useCallback(async () => {
    setConfig(null);
    setIsExpired(false);
    setLoading(false);
    localStorage.removeItem(STORAGE_CLIENT_ID_KEY);
    localStorage.removeItem(STORAGE_CONFIG_KEY);
  }, []);

  return (
    <ClientConfigContext.Provider value={{ config, isExpired, loading, loadConfig, clearConfig }}>
      {children}
    </ClientConfigContext.Provider>
  );
}

export function useClientConfig() {
  const ctx = useContext(ClientConfigContext);
  if (!ctx) throw new Error('useClientConfig must be used within a ClientConfigProvider');
  return ctx;
}
