import React, { useEffect, useMemo, useState } from 'react';
import { ClientConfig } from '../types/client';
import { CLIENT_APP_REGISTRY, ClientAppId, GenericClientApp } from './clients';
import { CLIENT_PLUGIN_LOADERS } from './clients/loader';

interface ClientAppProps {
  config: ClientConfig;
}

export function ClientApp({ config }: ClientAppProps) {
  const [LazyComponent, setLazyComponent] = useState<React.ComponentType<{ config: ClientConfig }> | null>(null);

  const registryComponent = useMemo(() => CLIENT_APP_REGISTRY[config.clientId as ClientAppId], [config.clientId]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      // Prefer dynamic loader if available; else use static registry
      const loader = CLIENT_PLUGIN_LOADERS[config.clientId];
      if (loader) {
        try {
          const mod = await loader();
          if (!cancelled) {
            setLazyComponent(() => (mod.default || Object.values(mod)[0]) as React.ComponentType<{ config: ClientConfig }>);
          }
          return;
        } catch (e) {
          console.warn('[ClientApp] Dynamic import failed for', config.clientId, e);
        }
      }
      // Fallback to registry component if present
      if (!cancelled) setLazyComponent(() => registryComponent || null);
    }
    setLazyComponent(null);
    load();
    return () => { cancelled = true; };
  }, [config.clientId, registryComponent]);

  if (LazyComponent) {
    return <LazyComponent config={config} />;
  }

  return <GenericClientApp config={config} />;
}