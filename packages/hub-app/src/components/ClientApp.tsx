import React, { useState } from 'react';
import { ClientConfig } from '../types/client';
// Import fixed EmbrKit components
import { 
  EmbrKitProvider, 
  EmbrKitContainer, 
  EmbrKitCard,
  EmbrKitButton,
  EmbrKitGrid,
  EmbrKitBadge,
  EmbrKitStatCard
} from '@embr/ui';

interface ClientAppProps {
  config: ClientConfig;
}

export function ClientApp({ config }: ClientAppProps) {
  const [activeTab, setActiveTab] = useState(config.navigation[0]?.id || 'home');

  // Convert config to EmbrKit theme with button color overrides
  const embrKitTheme = {
    primaryColor: config.theme.colors.primary,
    secondaryColor: config.theme.colors.secondary,
    backgroundColor: config.theme.colors.background,
    surfaceColor: config.theme.colors.surface,
    textColor: config.theme.colors.text,
    textSecondaryColor: config.theme.colors.textSecondary,
    headingFontFamily: "'Playfair Display', serif",
    fontFamily: "'Inter', sans-serif"
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
      {/* CUSTOM: Hero Section with Decorative Elements */}
      <div 
        className="px-6 py-12 text-center relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${config.theme.colors.background} 0%, ${config.theme.colors.surface} 100%)`,
        }}
      >
        {/* CUSTOM: Decorative Elements - Can't be done with standard components */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 text-6xl">🌿</div>
          <div className="absolute top-20 right-16 text-4xl">🧘</div>
          <div className="absolute bottom-20 left-20 text-5xl">♻️</div>
          <div className="absolute bottom-10 right-10 text-6xl">🌱</div>
        </div>

        {/* EMBRKIT: Container for proper layout */}
        <EmbrKitContainer size="lg">
          <div className="relative z-10">
            {/* CUSTOM: Main heading with client fonts - using EmbrKit typography classes */}
            <h1 
              className="text-5xl md:text-6xl leading-tight mb-6"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                color: config.theme.colors.text,
                fontWeight: 400
              }}
            >
              Welcome to<br />
              <span style={{ color: config.theme.colors.primary }}>WildRoots Festival</span>
            </h1>
            
            {/* CUSTOM: Subtitle with client styling */}
            <p 
              className="text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                color: config.theme.colors.textSecondary,
                fontWeight: 300
              }}
            >
              Your digital companion for the Sustainable Living & Wellness Festival experience. 
              Navigate workshops, discover vendors, and plan your mindful weekend.
            </p>

            {/* EMBRKIT: Grid system with Stat Cards - IMPROVED LAYOUT */}
            <div className="mb-16">
              <EmbrKitGrid cols={2} gap={6} className="md:grid-cols-4">
                {config.content?.schedule?.events && (
                  <EmbrKitStatCard 
                    value={config.content.schedule.events.length}
                    label="Events"
                    color={config.theme.colors.primary}
                    size="lg"
                    className="p-8 text-center"
                    style={{
                      backgroundColor: config.theme.colors.surface,
                      borderRadius: '1rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                )}
                <EmbrKitStatCard 
                  value="3"
                  label="Vendors"
                  color={config.theme.colors.primary}
                  size="lg"
                  className="p-8 text-center"
                  style={{
                    backgroundColor: config.theme.colors.surface,
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <EmbrKitStatCard 
                  value="8"
                  label="Locations"
                  color={config.theme.colors.primary}
                  size="lg"
                  className="p-8 text-center"
                  style={{
                    backgroundColor: config.theme.colors.surface,
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <EmbrKitStatCard 
                  value="3"
                  label="Days"
                  color={config.theme.colors.primary}
                  size="lg"
                  className="p-8 text-center"
                  style={{
                    backgroundColor: config.theme.colors.surface,
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </EmbrKitGrid>
            </div>

            {/* EMBRKIT: Action Buttons with custom styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <EmbrKitButton
                variant="primary"
                size="lg"
                onClick={() => setActiveTab('schedule')}
                className="transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                style={{ 
                  padding: '1.25rem 2rem', // py-5 px-8 equivalent
                  fontSize: '1.125rem', // text-lg
                  backgroundColor: config.theme.colors.primary,
                  color: '#ffffff'
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View Schedule
              </EmbrKitButton>
              
              <EmbrKitButton
                variant="secondary"
                size="lg"
                onClick={() => setActiveTab('map')}
                className="transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                style={{ 
                  padding: '1.25rem 2rem',
                  fontSize: '1.125rem',
                  backgroundColor: config.theme.colors.secondary,
                  color: '#ffffff'
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                </svg>
                Festival Map
              </EmbrKitButton>
            </div>
          </div>
        </EmbrKitContainer>
      </div>

      {/* EMBRKIT: Featured Events Section using Cards */}
      {config.content?.schedule?.events && config.content.schedule.events.length > 0 && (
        <div className="px-6 py-12" style={{ backgroundColor: config.theme.colors.surface }}>
          <EmbrKitContainer size="lg">
            <h2 
              className="text-4xl text-center mb-12"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                color: config.theme.colors.text 
              }}
            >
              Featured Events
            </h2>
            
            <div className="space-y-8">
              {config.content.schedule.events.slice(0, 3).map((event) => (
                <EmbrKitCard 
                    key={event.id} 
                  variant="elevated"
                  className="hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  style={{ 
                    backgroundColor: config.theme.colors.background,
                    padding: '2rem' // Substantial padding
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 
                          className="text-2xl font-normal group-hover:text-opacity-80 transition-colors"
                          style={{ 
                            fontFamily: "'Playfair Display', serif",
                            color: config.theme.colors.text 
                          }}
                        >
                      {event.title}
                    </h3>
                        <EmbrKitBadge 
                          variant="primary"
                          style={{ 
                            backgroundColor: config.theme.colors.primary,
                            color: '#ffffff'
                          }}
                        >
                          {(event as any).category || 'Event'}
                        </EmbrKitBadge>
                      </div>
                      
                      <p 
                        className="text-lg mb-6 leading-relaxed"
                        style={{ 
                          color: config.theme.colors.textSecondary,
                          fontFamily: "'Inter', sans-serif"
                        }}
                      >
                      {event.description}
                    </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base">
                        <div className="flex items-center gap-3">
                          <div 
                            className="text-2xl"
                            style={{ color: config.theme.colors.primary }}
                          >
                            📅
                          </div>
                          <div>
                            <div 
                              className="font-medium"
                              style={{ 
                                color: config.theme.colors.text,
                                fontFamily: "'Inter', sans-serif"
                              }}
                            >
                              {new Date(event.startTime).toLocaleDateString('en-US', { 
                                weekday: 'long',
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div 
                              style={{ 
                                color: config.theme.colors.textSecondary,
                                fontFamily: "'Inter', sans-serif"
                              }}
                            >
                              {new Date(event.startTime).toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div 
                            className="text-2xl"
                            style={{ color: config.theme.colors.primary }}
                          >
                            📍
                          </div>
                          <div>
                            <div 
                              className="font-medium"
                              style={{ 
                                color: config.theme.colors.text,
                                fontFamily: "'Inter', sans-serif"
                              }}
                            >
                              {event.location}
                            </div>
                          </div>
                        </div>
                        
                        {event.speaker && (
                          <div className="flex items-center gap-3">
                            <div 
                              className="text-2xl"
                              style={{ color: config.theme.colors.primary }}
                            >
                              👤
                            </div>
                            <div>
                              <div 
                                className="font-medium"
                                style={{ 
                                  color: config.theme.colors.text,
                                  fontFamily: "'Inter', sans-serif"
                                }}
                              >
                                {event.speaker}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {(event as any).bookmarkable && (
                    <div className="flex gap-4 pt-6 border-t border-opacity-10" style={{ borderColor: config.theme.colors.text }}>
                      <EmbrKitButton 
                        variant="secondary"
                        size="sm"
                        className="transition-all hover:scale-105"
                        style={{ 
                          backgroundColor: config.theme.colors.secondary,
                          color: '#ffffff'
                        }}
                      >
                        🔖 Bookmark
                      </EmbrKitButton>
                      <EmbrKitButton 
                        variant="text"
                        size="sm"
                        className="transition-all hover:scale-105"
                        style={{ 
                          color: config.theme.colors.primary,
                          border: `2px solid ${config.theme.colors.primary}`
                        }}
                      >
                        Share
                      </EmbrKitButton>
                    </div>
                  )}
                </EmbrKitCard>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <EmbrKitButton 
                variant="secondary"
                size="lg"
                onClick={() => setActiveTab('schedule')}
                className="inline-flex items-center gap-3 transition-all hover:scale-105"
                style={{ 
                  color: config.theme.colors.primary,
                  border: `2px solid ${config.theme.colors.primary}`
                }}
              >
                View All Events
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </EmbrKitButton>
            </div>
          </EmbrKitContainer>
        </div>
      )}

      {/* EMBRKIT: About Teaser Section using Card */}
      {(config.content as any)?.about?.welcomeMessage && (
        <div className="px-6 py-12" style={{ backgroundColor: config.theme.colors.background }}>
          <EmbrKitContainer size="lg">
            <EmbrKitCard className="text-center">
              <h2 
                className="text-4xl mb-8"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: config.theme.colors.text 
                }}
              >
                Join Our Sustainable Journey
              </h2>
              
              <div 
                className="text-xl leading-relaxed mb-10"
                style={{ 
                  color: config.theme.colors.textSecondary,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300
                }}
              >
                {(config.content as any).about.welcomeMessage.split('\n')[0]}
              </div>
              
              <EmbrKitButton 
                variant="primary"
                size="lg"
                onClick={() => setActiveTab('about')}
                className="inline-flex items-center gap-3 transition-all hover:scale-105"
                style={{ 
                  backgroundColor: config.theme.colors.primary,
                  color: '#ffffff'
                }}
              >
                Learn More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </EmbrKitButton>
            </EmbrKitCard>
          </EmbrKitContainer>
        </div>
            )}
          </div>
        );
      
  const renderScheduleContent = () => (
    <EmbrKitContainer size="lg" className="px-6 py-8">
      <div className="text-center mb-12">
        <h1 
          className="text-4xl md:text-5xl mb-4"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: config.theme.colors.text 
          }}
        >
          Festival Schedule
        </h1>
        <p 
          className="text-xl"
          style={{ 
            color: config.theme.colors.textSecondary,
            fontFamily: "'Inter', sans-serif"
          }}
        >
          Filter by category and bookmark your favorite sessions
        </p>
      </div>

      {config.content?.schedule?.events && config.content.schedule.events.length > 0 ? (
        <div className="space-y-8">
          {config.content.schedule.events.map((event) => (
            <EmbrKitCard 
              key={event.id} 
              variant="elevated"
              className="hover:shadow-xl transition-all cursor-pointer"
              style={{ 
                backgroundColor: config.theme.colors.surface,
                padding: '2rem'
              }}
            >
              <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: config.theme.colors.text }}>
                {event.title}
              </h3>
              <p className="text-lg mb-4" style={{ color: config.theme.colors.textSecondary }}>
                {event.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-base">
                <div>
                  <strong>📅 Date:</strong> {new Date(event.startTime).toLocaleDateString()}
                </div>
                <div>
                  <strong>📍 Location:</strong> {event.location}
                </div>
                {event.speaker && (
                  <div>
                    <strong>👤 Speaker:</strong> {event.speaker}
                  </div>
                )}
              </div>
            </EmbrKitCard>
          ))}
        </div>
      ) : (
        <EmbrKitCard className="text-center py-16">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-xl" style={{ color: config.theme.colors.textSecondary }}>
            No events scheduled yet.
          </p>
        </EmbrKitCard>
      )}
    </EmbrKitContainer>
  );

  const renderGenericContent = (title: string, description: string, emoji: string) => (
    <EmbrKitContainer size="lg" className="px-6 py-8">
      <EmbrKitCard className="text-center">
        <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: config.theme.colors.text }}>
          {title}
        </h1>
        <p className="text-xl mb-12" style={{ color: config.theme.colors.textSecondary }}>
          {description}
        </p>

        <div className="py-20">
          <div className="text-8xl mb-6 opacity-30">{emoji}</div>
          <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: config.theme.colors.text }}>
            Coming Soon
          </h3>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: config.theme.colors.textSecondary }}>
            This feature is being carefully crafted to showcase your festival content.
            </p>
          </div>
      </EmbrKitCard>
    </EmbrKitContainer>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent();
      case 'schedule':
        return renderScheduleContent();
      case 'map':
        return renderGenericContent('Festival Map', 'Find your way around the festival grounds', '🗺️');
      case 'vendors':
        return renderGenericContent('Vendors', 'Discover sustainable brands and local artisans', '🏪');
      case 'about':
        return renderGenericContent('About & Info', 'Everything you need to know for an amazing festival experience', 'ℹ️');
      default:
        return renderHomeContent();
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
                --embr-primary-hover: ${config.theme.colors.primary};
                --embr-secondary-hover: ${config.theme.colors.secondary};
                --embr-text-hover: ${config.theme.colors.text};
              }
              
              /* Override any remaining teal glows with client colors */
              .embr-btn:focus-visible,
              .embr-input:focus-visible,
              .embr-form-input:focus-visible,
              .embr-select-trigger:focus-visible,
              .embr-date-input:focus-visible {
                outline-color: ${config.theme.colors.primary} !important;
              }
            `
          }} />
      <div className="min-h-screen" style={{ backgroundColor: config.theme.colors.background }}>
        {/* CUSTOM: Top Navigation Bar - Exact replica of HTML version */}
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
                className="text-xl"
                style={{ 
                  color: config.theme.colors.text,
                  fontFamily: "'Playfair Display', serif" 
                }}
              >
                {config.name}
              </h1>
            </div>
            
            {/* CUSTOM: Navigation Pills - Exact replica */}
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
                    fontFamily: "'Inter', sans-serif"
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
        <div className="pb-8">
          {renderContent()}
        </div>
    </div>
    </EmbrKitProvider>
  );
} 