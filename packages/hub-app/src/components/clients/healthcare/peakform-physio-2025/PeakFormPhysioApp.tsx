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

interface PeakFormPhysioAppProps {
  config: ClientConfig;
}

export function PeakFormPhysioApp({ config }: PeakFormPhysioAppProps) {
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

  // PeakForm-specific theme
  const embrKitTheme = {
    primaryColor: config.theme.colors.primary,
    secondaryColor: config.theme.colors.secondary,
    backgroundColor: config.theme.colors.background,
    surfaceColor: config.theme.colors.surface,
    textColor: config.theme.colors.text,
    textSecondaryColor: config.theme.colors.textSecondary,
    headingFontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', sans-serif` : "'Inter', sans-serif",
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
      activity: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      'map-pin': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      heart: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    };
    return icons[iconName] || icons.home;
  };

  const renderHomeContent = () => (
    <div className="min-h-screen">
      {/* PEAKFORM-SPECIFIC: Medical/Healthcare Hero Section */}
      <div 
        className="px-6 py-16 text-center relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${config.theme.colors.background} 0%, ${config.theme.colors.surfaceElevated || config.theme.colors.surface} 100%)`,
        }}
      >
        {/* PEAKFORM-SPECIFIC: Medical decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 text-6xl">🏥</div>
          <div className="absolute top-20 right-16 text-4xl">💪</div>
          <div className="absolute bottom-20 left-20 text-5xl">🩺</div>
          <div className="absolute bottom-10 right-10 text-6xl">⚕️</div>
        </div>

        <EmbrKitContainer size="lg">
          <div className="relative z-10">
            {/* PEAKFORM-SPECIFIC: Medical-focused heading */}
            <h1 
              className="text-4xl md:text-5xl leading-tight mb-6"
              style={{ 
                fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', sans-serif` : "'Inter', sans-serif",
                color: config.theme.colors.text,
                fontWeight: 600
              }}
            >
              Your Path to<br />
              <span style={{ color: config.theme.colors.primary }}>Peak Performance</span>
            </h1>
            
            {/* PEAKFORM-SPECIFIC: Healthcare-focused subtitle */}
            <p 
              className="text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto"
              style={{ 
                fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif",
                color: config.theme.colors.textSecondary,
                fontWeight: 400
              }}
            >
              Professional physiotherapy care, personalized exercise plans, and expert guidance to help you recover, strengthen, and perform at your best.
            </p>

            {/* PEAKFORM-SPECIFIC: Healthcare-focused stat cards */}
            <div className="mb-16">
              <EmbrKitGrid cols={2} gap={6} className="md:grid-cols-4">
                {config.content?.appointments?.upcoming && (
                  <EmbrKitStatCard 
                    value={config.content.appointments.upcoming.length}
                    label="Upcoming Appointments"
                    color={config.theme.colors.primary}
                    size="lg"
                    className="p-6 text-center"
                    style={{
                      backgroundColor: config.theme.colors.surface,
                      borderRadius: '1rem',
                      boxShadow: '0 4px 6px -1px hsl(0 0% 0% / 0.1)'
                    }}
                  />
                )}
                {config.content?.exerciseLibrary?.exercises && (
                  <EmbrKitStatCard 
                    value={config.content.exerciseLibrary.exercises.length}
                    label="Exercise Library"
                    color={config.theme.colors.primary}
                    size="lg"
                    className="p-6 text-center"
                    style={{
                      backgroundColor: config.theme.colors.surface,
                      borderRadius: '1rem',
                      boxShadow: '0 4px 6px -1px hsl(0 0% 0% / 0.1)'
                    }}
                  />
                )}
                {config.content?.staff && (
                  <EmbrKitStatCard 
                    value={config.content.staff.length}
                    label="Expert Staff"
                    color={config.theme.colors.primary}
                    size="lg"
                    className="p-6 text-center"
                    style={{
                      backgroundColor: config.theme.colors.surface,
                      borderRadius: '1rem',
                      boxShadow: '0 4px 6px -1px hsl(0 0% 0% / 0.1)'
                    }}
                  />
                )}
                {config.content?.wellnessTips && (
                  <EmbrKitStatCard 
                    value={config.content.wellnessTips.length}
                    label="Wellness Tips"
                    color={config.theme.colors.primary}
                    size="lg"
                    className="p-6 text-center"
                    style={{
                      backgroundColor: config.theme.colors.surface,
                      borderRadius: '1rem',
                      boxShadow: '0 4px 6px -1px hsl(0 0% 0% / 0.1)'
                    }}
                  />
                )}
              </EmbrKitGrid>
            </div>

            {/* PEAKFORM-SPECIFIC: Healthcare-focused action buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <EmbrKitButton
                variant="primary"
                size="lg"
                onClick={() => setActiveTab('appointments')}
                className="transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                style={{ 
                  padding: '1.25rem 2rem',
                  fontSize: '1.125rem',
                  backgroundColor: config.theme.colors.primary,
                  color: '#ffffff'
                }}
              >
                {getIcon('calendar')}
                My Appointments
              </EmbrKitButton>
              
              <EmbrKitButton
                variant="secondary"
                size="lg"
                onClick={() => setActiveTab('exercises')}
                className="transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                style={{ 
                  padding: '1.25rem 2rem',
                  fontSize: '1.125rem',
                  backgroundColor: config.theme.colors.secondary,
                  color: '#ffffff'
                }}
              >
                {getIcon('activity')}
                Exercise Library
              </EmbrKitButton>
            </div>
          </div>
        </EmbrKitContainer>
      </div>

      {/* PEAKFORM-SPECIFIC: Upcoming Appointments Section */}
      {config.content?.appointments?.upcoming && config.content.appointments.upcoming.length > 0 && (
        <div className="px-6 py-12" style={{ backgroundColor: config.theme.colors.background }}>
          <EmbrKitContainer size="lg">
            <h2 
              className="text-3xl text-center mb-12"
              style={{ 
                fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', sans-serif` : "'Inter', sans-serif",
                color: config.theme.colors.text 
              }}
            >
              Upcoming Appointments
            </h2>
            
            <div className="space-y-6">
              {config.content.appointments.upcoming.slice(0, 2).map((appointment) => (
                <EmbrKitCard 
                  key={appointment.id} 
                  variant="elevated"
                  className="hover:shadow-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: config.theme.colors.surface,
                    padding: '1.5rem'
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold"
                      style={{ 
                        backgroundColor: config.theme.colors.primary,
                        color: '#ffffff'
                      }}
                    >
                      {new Date(appointment.date).getDate()}
                    </div>
                    <div>
                      <h3 
                        className="text-xl font-semibold mb-1"
                        style={{ 
                          fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', sans-serif` : "'Inter', sans-serif",
                          color: config.theme.colors.text 
                        }}
                      >
                        {appointment.type}
                      </h3>
                      <p 
                        className="text-lg"
                        style={{ 
                          color: config.theme.colors.textSecondary,
                          fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                        }}
                      >
                        {appointment.time} • {appointment.duration}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: config.theme.colors.textSecondary,
                          fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                        }}
                      >
                        with {appointment.therapist}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t" style={{ borderColor: `${config.theme.colors.border}50` }}>
                    {appointment.canReschedule && (
                      <EmbrKitButton 
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        style={{ 
                          backgroundColor: config.theme.colors.secondary,
                          color: '#ffffff'
                        }}
                      >
                        Reschedule
                      </EmbrKitButton>
                    )}
                    {appointment.canCancel && (
                      <EmbrKitButton 
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        style={{ 
                          borderColor: config.theme.colors.primary,
                          color: config.theme.colors.primary
                        }}
                      >
                        Cancel
                      </EmbrKitButton>
                    )}
                  </div>
                </EmbrKitCard>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <EmbrKitButton 
                variant="secondary"
                size="lg"
                onClick={() => setActiveTab('appointments')}
                className="inline-flex items-center gap-3 transition-all hover:scale-105"
                style={{ 
                  color: config.theme.colors.primary,
                  border: `2px solid ${config.theme.colors.primary}`
                }}
              >
                View All Appointments
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </EmbrKitButton>
            </div>
          </EmbrKitContainer>
        </div>
      )}
    </div>
  );

  const renderGenericContent = (title: string, description: string, emoji: string) => (
    <EmbrKitContainer size="lg" className="px-6 pt-16 pb-8">
      <EmbrKitCard className="text-center">
        <h1 className="text-4xl md:text-5xl mb-4" style={{ 
          fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', sans-serif` : "'Inter', sans-serif", 
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
            fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', sans-serif` : "'Inter', sans-serif", 
            color: config.theme.colors.text 
          }}>
            Coming Soon
          </h3>
          <p className="text-lg max-w-2xl mx-auto" style={{ 
            color: config.theme.colors.textSecondary,
            fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
          }}>
            This feature is being carefully crafted for your physiotherapy experience.
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
      case 'appointments':
        return renderGenericContent(
          getNavItem(activeTab)?.title || 'My Appointments', 
          'Manage your upcoming physiotherapy sessions', 
          '📅'
        );
      case 'exercises':
        return renderGenericContent(
          getNavItem(activeTab)?.title || 'Exercise Library', 
          'Browse exercises and rehabilitation plans', 
          '💪'
        );
      case 'clinic':
        return renderGenericContent(
          getNavItem(activeTab)?.title || 'Clinic Info', 
          'Find our location and contact information', 
          '🏥'
        );
      case 'wellness':
        return renderGenericContent(
          getNavItem(activeTab)?.title || 'Wellness Tips', 
          'Health tips and wellness information', 
          '💚'
        );
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
            --embr-button-outline-color: ${config.theme.colors.primary};
            --embr-primary-hover: ${config.theme.colors.primary};
            --embr-secondary-hover: ${config.theme.colors.secondary};
            --embr-text-hover: ${config.theme.colors.text};
            --embr-background: ${config.theme.colors.background};
            --embr-surface: ${config.theme.colors.surface};
            --embr-surface-elevated: ${config.theme.colors.surfaceElevated || config.theme.colors.surface};
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
        {/* PEAKFORM-SPECIFIC: Medical-focused navigation */}
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
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', sans-serif` : "'Inter', sans-serif"
                }}
              >
                {config.name}
              </h1>
            </div>
            
            {/* PEAKFORM-SPECIFIC: Medical navigation */}
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
