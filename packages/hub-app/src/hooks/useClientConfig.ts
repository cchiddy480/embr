import React, { useState, useCallback } from 'react';
import { ClientConfig } from '../types/client';

const LOCAL_STORAGE_KEY = 'embr-client-config';

export function useClientConfig() {
  const [config, setConfig] = useState<ClientConfig | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  // Load config from localStorage or by clientId
  const loadConfig = useCallback(async (clientId?: string) => {
    if (!clientId) {
      // Try to load from localStorage
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        setConfig(parsed);
        setIsExpired(false); // TODO: check expiry
        return;
      } else {
        throw new Error('No cached config');
      }
    }
    // Mock: load config by clientId (replace with real fetch later)
    const mockConfig: ClientConfig = {
      clientId,
      name: `Demo App for ${clientId}`,
      description: 'A demo app for testing the Embr platform',
      version: '1.0.0',
      expiry: '2099-12-31T23:59:59Z',
      theme: { 
        colors: { 
          primary: '#0070f3',
          secondary: '#6c757d',
          accent: '#28a745',
          background: '#ffffff',
          surface: '#f8f9fa',
          text: '#212529',
          textSecondary: '#6c757d'
        },
        fonts: {
          heading: 'Inter, sans-serif',
          body: 'Inter, sans-serif'
        },
        logo: {
          light: '/logo-light.png',
          dark: '/logo-dark.png',
          favicon: '/favicon.ico'
        }
      },
      navigation: [
        { id: 'home', title: 'Home', path: '/', icon: 'home' }
      ],
      features: {
        offline: true,
        pushNotifications: true,
        qrCode: true,
        analytics: true
      },
      content: {
        schedule: {
          enabled: false,
          timezone: 'UTC',
          events: []
        }
      },
      pushNotifications: {
        topics: ['general'],
        defaultTitle: 'Embr App',
        defaultIcon: '/icon.png'
      },
      analytics: {
        enabled: false
      }
    };
    setConfig(mockConfig);
    setIsExpired(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockConfig));
  }, []);

  // Clear config
  const clearConfig = useCallback(async () => {
    setConfig(null);
    setIsExpired(false);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  return { config, loadConfig, clearConfig, isExpired };
} 