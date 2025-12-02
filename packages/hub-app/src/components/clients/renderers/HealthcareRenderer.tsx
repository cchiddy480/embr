import React, { useEffect, useState } from 'react';
import { ClientConfig } from '../../../types/client';
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitCard,
  EmbrKitBadge
} from '@embr/ui';
import { getVariationStyles } from '../../../lib/templateVariations';

interface HealthcareRendererProps {
  config: ClientConfig;
}

export function HealthcareRenderer({ config }: HealthcareRendererProps) {
  const [activeTab, setActiveTab] = useState(config.navigation[0]?.id || 'home');
  const varStyles = getVariationStyles(config.variation);

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

  const embrKitTheme = {
    primaryColor: config.theme.colors.primary,
    secondaryColor: config.theme.colors.secondary,
    backgroundColor: config.theme.colors.background,
    surfaceColor: config.theme.colors.surface,
    textColor: config.theme.colors.text,
    textSecondaryColor: config.theme.colors.textSecondary,
    headingFontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : varStyles.headingFont,
    fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : varStyles.bodyFont
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
      fitness: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      ),
      location: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      mail: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

  const renderHomeContent = () => {
    const homeContent = config.content?.home || {};
    const appointmentsContent = config.content?.appointments || {};
    const exercisesContent = config.content?.exercises || {};

    return (
      <div className="min-h-screen" style={{ backgroundColor: config.theme.colors.background }}>
        {/* Healthcare Hero - Split Screen, Professional, Clean */}
        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Left Side - Gradient Background with Icon */}
          <div
            className="px-8 py-16 md:py-24 flex flex-col justify-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${config.theme.colors.primary} 0%, ${config.theme.colors.secondary} 100%)`
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <div className="text-9xl">🏥</div>
            </div>

            <div className="relative z-10 max-w-xl">
              <div
                className="inline-block px-4 py-2 rounded-lg mb-6 text-sm font-semibold"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff'
                }}
              >
                {homeContent.subtitle || 'Professional Healthcare'}
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 font-bold"
                style={{
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
                  color: '#ffffff'
                }}
              >
                {config.name}
              </h1>

              <p
                className="text-xl mb-8 leading-relaxed"
                style={{
                  fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif",
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                {homeContent.description || config.description}
              </p>

              <button
                onClick={() => setActiveTab(config.navigation[1]?.id)}
                className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: '#ffffff',
                  color: config.theme.colors.primary
                }}
              >
                Book Appointment →
              </button>
            </div>
          </div>

          {/* Right Side - Stats & Quick Actions */}
          <div className="px-8 py-16 md:py-24 flex flex-col justify-center" style={{ backgroundColor: config.theme.colors.surface }}>
            <div className="max-w-xl mx-auto w-full">
              <h3
                className="text-2xl mb-8"
                style={{
                  fontFamily: embrKitTheme.headingFontFamily,
                  fontWeight: varStyles.headingWeight,
                  color: config.theme.colors.text,
                  letterSpacing: varStyles.letterSpacing
                }}
              >
                Your Health Dashboard
              </h3>

              {/* Clean Stats - Variation-styled */}
              <div className="space-y-4 mb-8">
                {[
                  { label: 'Next Appointment', value: 'Tomorrow, 2:00 PM', icon: '📅' },
                  { label: 'Active Programs', value: appointmentsContent.upcoming?.length || '2', icon: '💪' },
                  { label: 'Exercise Library', value: exercisesContent.exercises?.length || '15', icon: '🏃' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center transition-all"
                    style={{
                      backgroundColor: config.theme.colors.background,
                      padding: varStyles.cardSpacing,
                      borderRadius: varStyles.borderRadius,
                      borderLeft: `4px solid ${config.theme.colors.primary}`,
                      boxShadow: varStyles.shadowIntensity,
                      transitionDuration: varStyles.animationDuration
                    }}
                  >
                    <div className="text-3xl mr-4">{item.icon}</div>
                    <div>
                      <div
                        className="text-sm"
                        style={{
                          color: config.theme.colors.textSecondary,
                          fontWeight: varStyles.bodyWeight,
                          fontFamily: embrKitTheme.fontFamily
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-lg"
                        style={{
                          color: config.theme.colors.text,
                          fontWeight: varStyles.headingWeight,
                          fontFamily: embrKitTheme.headingFontFamily
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveTab(config.navigation[2]?.id)}
                  className="p-4 rounded-lg text-center transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: config.theme.colors.background,
                    border: `2px solid ${config.theme.colors.primary}`
                  }}
                >
                  <div className="text-2xl mb-2">🏋️</div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: config.theme.colors.text }}
                  >
                    Exercises
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab(config.navigation[3]?.id)}
                  className="p-4 rounded-lg text-center transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: config.theme.colors.background,
                    border: `2px solid ${config.theme.colors.primary}`
                  }}
                >
                  <div className="text-2xl mb-2">📍</div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: config.theme.colors.text }}
                  >
                    Location
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges - Horizontal Strip */}
        <div className="py-12" style={{ backgroundColor: config.theme.colors.primary }}>
          <EmbrKitContainer size="lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: '✓', label: 'Licensed Professionals' },
                { icon: '✓', label: 'Evidence-Based Care' },
                { icon: '✓', label: 'Personalized Treatment' },
                { icon: '✓', label: '24/7 Support' }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center justify-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#ffffff'
                    }}
                  >
                    {badge.icon}
                  </div>
                  <span
                    className="font-semibold"
                    style={{ color: '#ffffff' }}
                  >
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </EmbrKitContainer>
        </div>

        {/* Service Areas - Timeline Style */}
        <div className="py-20" style={{ backgroundColor: config.theme.colors.background }}>
          <EmbrKitContainer size="lg">
            <h2
              className="text-4xl font-bold mb-16 text-center"
              style={{
                fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
                color: config.theme.colors.text
              }}
            >
              Comprehensive Care
            </h2>

            <div className="space-y-12">
              {[
                { icon: '🩺', title: 'Initial Assessment', desc: 'Thorough evaluation of your health and wellness goals' },
                { icon: '📋', title: 'Treatment Plan', desc: 'Customized program designed specifically for you' },
                { icon: '💪', title: 'Active Recovery', desc: 'Guided exercises and rehabilitation protocols' },
                { icon: '📈', title: 'Progress Tracking', desc: 'Regular monitoring and plan adjustments' }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                    style={{
                      backgroundColor: config.theme.colors.surface,
                      border: `3px solid ${config.theme.colors.primary}`
                    }}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{
                        fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
                        color: config.theme.colors.text
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-lg"
                      style={{
                        color: config.theme.colors.textSecondary,
                        fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </EmbrKitContainer>
        </div>
      </div>
    );
  };

  const renderGenericContent = (title: string, description: string, emoji: string) => (
    <EmbrKitContainer size="lg" className="px-6 pt-16 pb-8">
      <EmbrKitCard className="text-center p-12">
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
    const navItem = getNavItem(activeTab);

    switch (activeTab) {
      case 'home':
        return renderHomeContent();
      default:
        return renderGenericContent(
          navItem?.title || 'Feature',
          config.content?.[activeTab]?.description || 'This feature is coming soon',
          '🏥'
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
            --embr-background: ${config.theme.colors.background};
            --embr-surface: ${config.theme.colors.surface};
            --embr-text: ${config.theme.colors.text};
            --embr-text-secondary: ${config.theme.colors.textSecondary};
            --embr-button-outline-color: ${config.theme.colors.primary};
          }
        `
      }} />
      <div className="min-h-screen min-h-[100dvh]" style={{ backgroundColor: config.theme.colors.background }}>
        {/* Navigation */}
        <div
          className="sticky top-0 z-50 backdrop-blur-md border-b"
          style={{
            backgroundColor: `${config.theme.colors.surface}95`,
            borderColor: `${config.theme.colors.text}10`
          }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <h1
              className="text-xl font-semibold"
              style={{
                color: config.theme.colors.text,
                fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif"
              }}
            >
              {config.name}
            </h1>

            <div className="flex items-center gap-2">
              {config.navigation.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === item.id ? 'scale-105' : 'hover:scale-105'
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
