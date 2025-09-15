import React from 'react';
import { ClientConfig } from '../types/client';
import { CLIENT_APP_REGISTRY, ClientAppId, GenericClientApp } from './clients';

interface ClientAppProps {
  config: ClientConfig;
}

export function ClientApp({ config }: ClientAppProps) {
  // Get the specific client app component
  const ClientAppComponent = CLIENT_APP_REGISTRY[config.clientId as ClientAppId];
  
  // If we have a specific client app, render it
  if (ClientAppComponent) {
    return <ClientAppComponent config={config} />;
  }
  
  // Fallback to generic client app for unknown clients
  return <GenericClientApp config={config} />;
} 