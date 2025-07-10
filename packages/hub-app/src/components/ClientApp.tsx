import React, { useState } from 'react';
import { ClientConfig } from '../types/client';

interface ClientAppProps {
  config: ClientConfig;
  // onBack: () => void; // Remove this prop
}

export function ClientApp({ config }: ClientAppProps) {
  const [activeTab, setActiveTab] = useState(config.navigation[0]?.id || 'home');

  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      home: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      schedule: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      heart: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      users: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      'map-pin': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      'check-circle': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      calendar: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      map: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
        </svg>
      ),
      music: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      info: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };
    return icons[iconName] || icons.home;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4" style={{ color: config.theme.colors.text }}>
              Welcome to {config.name}
            </h1>
            <p className="text-lg mb-6" style={{ color: config.theme.colors.textSecondary }}>
              {config.description}
            </p>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4" style={{ color: config.theme.colors.text }}>
                App Features
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Object.entries(config.features).map(([feature, enabled]) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div 
                      className={`w-2 h-2 rounded-full ${enabled ? 'bg-green-400' : 'bg-gray-400'}`}
                    />
                    <span style={{ color: config.theme.colors.textSecondary }}>
                      {feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'schedule':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: config.theme.colors.text }}>
              Schedule
            </h2>
            {config.content.schedule?.enabled && config.content.schedule.events.length > 0 ? (
              <div className="space-y-4">
                {config.content.schedule.events.map((event) => (
                  <div 
                    key={event.id} 
                    className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20"
                  >
                    <h3 className="font-semibold mb-2" style={{ color: config.theme.colors.text }}>
                      {event.title}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: config.theme.colors.textSecondary }}>
                      {event.description}
                    </p>
                    <div className="text-xs space-y-1" style={{ color: config.theme.colors.textSecondary }}>
                      <div>📍 {event.location}</div>
                      <div>🕐 {new Date(event.startTime).toLocaleString()}</div>
                      {event.notes && <div>📝 {event.notes}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: config.theme.colors.textSecondary }}>
                No schedule events available.
              </p>
            )}
          </div>
        );
      
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: config.theme.colors.text }}>
              {config.navigation.find(nav => nav.id === activeTab)?.title || 'Page'}
            </h2>
            <p style={{ color: config.theme.colors.textSecondary }}>
              This feature is coming soon.
            </p>
          </div>
        );
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col font-sans"
      style={{ backgroundColor: config.theme.colors.background }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 border-b"
        style={{ 
          backgroundColor: config.theme.colors.surface,
          borderColor: `${config.theme.colors.text}20`
        }}
      >
        <div className="flex items-center gap-3">
          {/* Remove the header back button and any references to onBack */}
          <h1 className="text-lg font-semibold" style={{ color: config.theme.colors.text }}>
            {config.name}
          </h1>
        </div>
        <div className="text-xs px-2 py-1 rounded-full bg-white/10" style={{ color: config.theme.colors.textSecondary }}>
          v{config.version}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Navigation */}
      {config.navigation.length > 1 && (
        <div 
          className="flex border-t p-2 gap-1"
          style={{ 
            backgroundColor: config.theme.colors.surface,
            borderColor: `${config.theme.colors.text}20`
          }}
        >
          {config.navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-colors duration-200 ${
                activeTab === item.id ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
              style={{ color: activeTab === item.id ? config.theme.colors.primary : config.theme.colors.textSecondary }}
            >
              {getIcon(item.icon)}
              <span className="text-xs font-medium">{item.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 