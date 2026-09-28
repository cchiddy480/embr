import React, { useEffect, useMemo, useState } from 'react';
import { ClientConfig } from '../types/client';
import { TripConfigSchema, isTripConfigShape } from '../types/blocks-schema';
import { BlockRenderer } from './clients/renderers/BlockRenderer';
import { CLIENT_APP_REGISTRY, ClientAppId, GenericClientApp } from './clients';
import { CLIENT_PLUGIN_LOADERS } from './clients/loader';

interface ClientAppProps {
  config: ClientConfig;
}

export function ClientApp({ config }: ClientAppProps) {
  const [LazyComponent, setLazyComponent] = useState<React.ComponentType<{ config: ClientConfig }> | null>(null);

  // Phase B configs (a `blocks` array) route straight to the block engine,
  // ahead of the legacy loader/registry/GenericClientApp chain below. That
  // chain stays untouched for any config still on the old template shape
  // (e.g. wildroots-festival-2025) until it's migrated. Computed via
  // useMemo (not an early return before other hooks) so every hook below
  // still runs unconditionally on every render, per rules-of-hooks.
  const tripConfigResult = useMemo(
    () => (isTripConfigShape(config) ? TripConfigSchema.safeParse(config) : null),
    [config]
  );

  const registryComponent = useMemo(() => CLIENT_APP_REGISTRY[config.clientId as ClientAppId], [config.clientId]);

  useEffect(() => {
    // A trip-shaped config renders via BlockRenderer below; skip the
    // legacy dynamic-import/registry lookup entirely for it.
    if (tripConfigResult) return;

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
  }, [config.clientId, registryComponent, tripConfigResult]);

  if (tripConfigResult) {
    if (tripConfigResult.success) {
      return <BlockRenderer config={tripConfigResult.data} />;
    }
    console.error('[ClientApp] config has a `blocks` array but failed TripConfigSchema validation:', tripConfigResult.error.flatten());
    // Fall through to the legacy chain below only as a last resort — it
    // won't know what to do with `blocks` either, but this avoids a hard
    // crash on a malformed config in production.
  }

  if (LazyComponent) {
    return <LazyComponent config={config} />;
  }

  return <GenericClientApp config={config} />;
}