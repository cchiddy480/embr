import React, { useEffect, useState } from 'react';
import { ClientConfig } from '../../types/client';
import { 
  EmbrKitProvider, 
  EmbrKitContainer, 
  EmbrKitCard,
  EmbrKitButton,
  EmbrKitGrid,
  EmbrKitBadge,
  EmbrKitStatCard
} from '@embr/ui';

interface GenericClientAppProps {
  config: ClientConfig;
}

export function GenericClientApp({ config }: GenericClientAppProps) {
  const [activeTab, setActiveTab] = useState(config.navigation[0]?.id || 'home');

  // Set page background to client theme
  useEffect(() => {
    const prevBodyBg = document.body.style.background;
    const prevHtmlBg = document.documentElement.style.background;
    const prevBodyColor = document.body.style.color;
    document.body.style.background = config.theme.colors.background;
    document.documentElement.style.background = config.theme.colors.background;
    document.body.style.color = config.theme.colors.text;
    return () => {
      document.body.style.background = prevBodyBg;
      document.documentElement.style.background = prevHtmlBg;
      document.body.style.color = prevBodyColor;
    };
  }, [config.theme.colors.background, config.theme.colors.text]);

  // Generic theme
  const embrKitTheme = {
    primaryColor: config.theme.colors.primary,
    secondaryColor: config.theme.colors.secondary,
    backgroundColor: config.theme.colors.background,
    surfaceColor: config.theme.colors.surface,
    textColor: config.theme.colors.text,
    textSecondaryColor: config.theme.colors.textSecondary,
    headingFontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
    fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      home: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      calendar: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      map: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
        </svg>
      ),
      store: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      info: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };
    return icons[iconName] || icons.home;
  };

  const renderHomeContent = () => (
    <div className="min-h-screen">
      {/* GENERIC: Simple hero section */}
      <div 
        className="px-6 py-12 text-center relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${config.theme.colors.background} 0%, ${config.theme.colors.surface} 100%)`,
        }}
      >
        <EmbrKitContainer size="lg">
          <div className="relative z-10">
            <h1 
              className="text-4xl md:text-5xl leading-tight mb-6"
              style={{ 
                fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
                color: config.theme.colors.text,
                fontWeight: 600
              }}
            >
              Welcome to<br />
              <span style={{ color: config.theme.colors.primary }}>{config.name}</span>
            </h1>
            
            <p 
              className="text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto"
              style={{ 
                fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif",
                color: config.theme.colors.textSecondary,
                fontWeight: 400
              }}
            >
              {config.description}
            </p>

            {/* GENERIC: Simple stat cards */}
            <div className="mb-16">
              <EmbrKitGrid cols={2} gap={6} className="md:grid-cols-3">
                <EmbrKitStatCard 
                  value="3"
                  label="Features"
                  color={config.theme.colors.primary}
                  size="lg"
                  className="p-6 text-center"
                  style={{
                    backgroundColor: config.theme.colors.surface,
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px hsl(0 0% 0% / 0.1)'
                  }}
                />
                <EmbrKitStatCard 
                  value="24/7"
                  label="Available"
                  color={config.theme.colors.primary}
                  size="lg"
                  className="p-6 text-center"
                  style={{
                    backgroundColor: config.theme.colors.surface,
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px hsl(0 0% 0% / 0.1)'
                  }}
                />
                <EmbrKitStatCard 
                  value="100%"
                  label="Secure"
                  color={config.theme.colors.primary}
                  size="lg"
                  className="p-6 text-center"
                  style={{
                    backgroundColor: config.theme.colors.surface,
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px hsl(0 0% 0% / 0.1)'
                  }}
                />
              </EmbrKitGrid>
            </div>

            {/* GENERIC: Simple action buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {config.navigation.slice(1, 3).map((navItem, index) => (
                <EmbrKitButton
                  key={navItem.id}
                  variant={index === 0 ? "primary" : "secondary"}
                  size="lg"
                  onClick={() => setActiveTab(navItem.id)}
                  className="transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                  style={{ 
                    padding: '1.25rem 2rem',
                    fontSize: '1.125rem',
                    backgroundColor: index === 0 ? config.theme.colors.primary : config.theme.colors.secondary,
                    color: '#ffffff'
                  }}
                >
                  {getIcon(navItem.icon)}
                  {navItem.title}
                </EmbrKitButton>
              ))}
            </div>
          </div>
        </EmbrKitContainer>
      </div>
    </div>
  );

  const renderGenericContent = (title: string, description: string, emoji: string) => (
    <EmbrKitContainer size="lg" className="px-6 pt-16 pb-8">
      <EmbrKitCard className="text-center">
        <h1 className="text-4xl md:text-5xl mb-4" style={{ 
          fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif", 
          color: config.theme.colors.text 
        }}>
          {title}
        </h1>
        <p className="text-xl mb-12" style={{ 
          color: config.theme.colors.textSecondary,
          fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
        }}>
          {description}
        </p>

        <div className="py-20">
          <div className="text-8xl mb-6 opacity-30">{emoji}</div>
          <h3 className="text-2xl mb-4" style={{ 
            fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif", 
            color: config.theme.colors.text 
          }}>
            Coming Soon
          </h3>
          <p className="text-lg max-w-2xl mx-auto" style={{ 
            color: config.theme.colors.textSecondary,
            fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
          }}>
            This feature is being carefully crafted for your {config.name.toLowerCase()} experience.
            </p>
          </div>
      </EmbrKitCard>
    </EmbrKitContainer>
  );

  const renderContent = () => {
    const getNavItem = (id: string) => config.navigation.find(nav => nav.id === id);
    
    switch (activeTab) {
      case 'home':
        return renderHomeContent();
      default:
        return renderGenericContent(
          getNavItem(activeTab)?.title || 'Feature', 
          'This feature is coming soon', 
          '🚀'
        );
    }
  };

  return (
    <EmbrKitProvider initialTheme={embrKitTheme}>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --embr-primary-color: ${config.theme.colors.primary};
            --embr-secondary-color: ${config.theme.colors.secondary};
            --embr-text-color: ${config.theme.colors.text};
            --embr-button-outline-color: ${config.theme.colors.primary};
            --embr-primary-hover: ${config.theme.colors.primary};
            --embr-secondary-hover: ${config.theme.colors.secondary};
            --embr-text-hover: ${config.theme.colors.text};
            --embr-background: ${config.theme.colors.background};
            --embr-surface: ${config.theme.colors.surface};
            --embr-surface-elevated: ${config.theme.colors.surface};
            --embr-text-on-dark: ${config.theme.colors.text};
            --embr-text-secondary-dark-bg: ${config.theme.colors.textSecondary};
            --embr-border: hsl(0 0% 0% / 0.12);
          }
          
          .embr-btn:focus-visible,
          .embr-input:focus-visible,
          .embr-form-input:focus-visible,
          .embr-select-trigger:focus-visible,
          .embr-date-input:focus-visible {
            outline-color: ${config.theme.colors.primary} !important;
          }
          
          .embr-btn-primary:focus,
          .embr-btn-primary:focus-visible,
          .embr-btn-secondary:focus,
          .embr-btn-secondary:focus-visible {
            outline: none !important;
            box-shadow: none !important;
          }
        `
      }} />
      <div className="min-h-screen min-h-[100dvh]" style={{ backgroundColor: config.theme.colors.background }}>
        {/* GENERIC: Simple navigation */}
        <div 
          className="sticky top-0 z-50 backdrop-blur-md border-b"
          style={{ 
            backgroundColor: `${config.theme.colors.surface}95`,
            borderColor: `${config.theme.colors.text}10`
          }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <h1 
                className="text-xl font-semibold"
                style={{ 
                  color: config.theme.colors.text,
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif"
                }}
              >
                {config.name}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              {config.navigation.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === item.id ? 'scale-105' : 'hover:scale-105'
                  }`}
                  style={{ 
                    backgroundColor: activeTab === item.id ? config.theme.colors.primary : 'transparent',
                    color: activeTab === item.id ? '#ffffff' : config.theme.colors.textSecondary,
                    fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                  }}
                >
                  {getIcon(item.icon)}
                  <span className="hidden md:inline">{item.title}</span>
                </button>
              ))}
            </div>
            
            <EmbrKitBadge
              variant="primary" 
              style={{ 
                backgroundColor: `${config.theme.colors.primary}20`,
                color: config.theme.colors.primary
              }}
            >
              v{config.version}
            </EmbrKitBadge>
          </div>
        </div>

        {/* Content */}
        <div className="pt-12 md:pt-16 pb-8">
          {renderContent()}
        </div>
      </div>
    </EmbrKitProvider>
  );
}
