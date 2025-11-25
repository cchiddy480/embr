import React, { useEffect, useState } from 'react';
import { ClientConfig } from '../../../types/client';
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitCard,
  EmbrKitButton,
  EmbrKitGrid,
  EmbrKitBadge,
  EmbrKitStatCard
} from '@embr/ui';
import { getVariationStyles } from '../../../lib/templateVariations';

interface FestivalRendererProps {
  config: ClientConfig;
}

export function FestivalRenderer({ config }: FestivalRendererProps) {
  const [activeTab, setActiveTab] = useState(config.navigation[0]?.id || 'home');

  // Get variation styles (defaults to 'modern' if not specified)
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
    // Use variation fonts or fallback to config theme fonts
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
      location: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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

  const renderHomeContent = () => {
    const homeContent = config.content?.home || {};
    const scheduleContent = config.content?.schedule || {};
    const vendorsContent = config.content?.vendors || {};

    return (
      <div className="min-h-screen">
        {/* Festival Hero - Bold, Asymmetric, Energetic */}
        <div
          className="px-6 py-16 md:py-24 relative overflow-hidden"
          style={{
            background: `linear-gradient(165deg, ${config.theme.colors.primary} 0%, ${config.theme.colors.secondary} 100%)`,
          }}
        >
          {/* Animated decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-10 left-10 text-8xl animate-bounce" style={{ animationDuration: '3s' }}>🎪</div>
            <div className="absolute top-32 right-20 text-6xl animate-pulse" style={{ animationDuration: '4s' }}>🎭</div>
            <div className="absolute bottom-32 left-32 text-7xl animate-bounce" style={{ animationDuration: '3.5s' }}>🎵</div>
            <div className="absolute bottom-16 right-16 text-8xl animate-pulse" style={{ animationDuration: '2.5s' }}>🎉</div>
          </div>

          <EmbrKitContainer size="lg">
            <div className="relative z-10 text-center">
              {/* Festival Badge */}
              <div className="inline-block mb-6 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Festival 2025
              </div>

              <h1
                className="text-6xl md:text-7xl lg:text-8xl leading-none mb-8 font-black"
                style={{
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
                  color: '#ffffff',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  letterSpacing: '-0.02em'
                }}
              >
                {config.name}
              </h1>

              <p
                className="text-2xl md:text-3xl mb-16 leading-relaxed max-w-3xl mx-auto font-light"
                style={{
                  fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif",
                  color: 'rgba(255, 255, 255, 0.95)'
                }}
              >
                {homeContent.description || config.description}
              </p>

              {/* Ticket-Style Stats Cards */}
              <div className="mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: scheduleContent.events?.length || '12', label: 'Events', icon: '🎪' },
                    { value: vendorsContent.categories?.length || '8', label: 'Vendors', icon: '🎭' },
                    { value: '3', label: 'Days', icon: '📅' },
                    { value: '100+', label: 'Guests', icon: '🎉' }
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-6 relative transition-transform"
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: varStyles.borderRadius,
                        borderLeft: `4px dashed ${config.theme.colors.primary}`,
                        borderRight: `4px dashed ${config.theme.colors.primary}`,
                        boxShadow: varStyles.shadowIntensity,
                        // Rotation is vibrant-only feature (playful), skip for minimal/classic
                        transform: config.variation === 'vibrant' ? `rotate(${idx % 2 === 0 ? '-' : ''}1deg)` : 'none',
                        transitionDuration: varStyles.animationDuration
                      }}
                    >
                      <div className="text-3xl mb-2">{stat.icon}</div>
                      <div
                        className="text-4xl mb-1"
                        style={{
                          color: config.theme.colors.primary,
                          fontWeight: varStyles.headingWeight,
                          fontFamily: embrKitTheme.headingFontFamily
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-sm font-semibold uppercase tracking-wide"
                        style={{ color: config.theme.colors.textSecondary }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bold CTA Buttons - Variation-styled */}
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => setActiveTab(config.navigation[1]?.id)}
                  className="px-12 py-5 text-xl transition-all transform hover:shadow-2xl"
                  style={{
                    backgroundColor: '#ffffff',
                    color: config.theme.colors.primary,
                    fontWeight: varStyles.headingWeight,
                    fontFamily: embrKitTheme.headingFontFamily,
                    borderRadius: varStyles.borderRadius,
                    boxShadow: varStyles.shadowIntensity,
                    transitionDuration: varStyles.animationDuration,
                    transform: 'scale(1)',
                    letterSpacing: varStyles.letterSpacing
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = varStyles.hoverTransform}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  View Schedule →
                </button>
                <button
                  onClick={() => setActiveTab(config.navigation[2]?.id)}
                  className="px-12 py-5 text-xl transition-all"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    fontWeight: varStyles.bodyWeight,
                    fontFamily: embrKitTheme.bodyFontFamily,
                    border: varStyles.borderStyle + ' rgba(255, 255, 255, 0.5)',
                    borderRadius: varStyles.borderRadius,
                    backdropFilter: 'blur(10px)',
                    transitionDuration: varStyles.animationDuration
                  }}
                >
                  Explore Vendors
                </button>
              </div>
            </div>
          </EmbrKitContainer>
        </div>

        {/* Zigzag Features Section - Variation-styled */}
        <div style={{
          backgroundColor: config.theme.colors.background,
          paddingTop: varStyles.sectionSpacing,
          paddingBottom: varStyles.sectionSpacing
        }}>
          <EmbrKitContainer size="lg">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div
                className="transition-all duration-300 hover:-translate-y-2"
                style={{
                  backgroundColor: config.theme.colors.surface,
                  padding: varStyles.cardSpacing,
                  borderRadius: varStyles.borderRadius,
                  boxShadow: varStyles.shadowIntensity,
                  border: varStyles.accentUsage === 'minimal' ? `1px solid ${config.theme.colors.border}` : 'none'
                }}
              >
                <div className="text-6xl mb-6">🎵</div>
                <h2
                  className="text-3xl mb-4"
                  style={{
                    fontFamily: embrKitTheme.headingFontFamily,
                    fontWeight: varStyles.headingWeight,
                    color: config.theme.colors.text,
                    letterSpacing: varStyles.letterSpacing
                  }}
                >
                  Amazing Live Music
                </h2>
                <p
                  className="text-lg leading-relaxed"
                  style={{
                    color: config.theme.colors.textSecondary,
                    fontFamily: embrKitTheme.fontFamily,
                    fontWeight: varStyles.bodyWeight,
                    lineHeight: varStyles.layoutDensity === 'spacious' ? '2' : '1.75'
                  }}
                >
                  Experience incredible performances from talented artists across multiple stages throughout the festival.
                </p>
              </div>

              <div
                className="transition-all duration-300 hover:-translate-y-2"
                style={{
                  backgroundColor: config.theme.colors.surface,
                  padding: varStyles.cardSpacing,
                  borderRadius: varStyles.borderRadius,
                  boxShadow: varStyles.shadowIntensity,
                  border: varStyles.accentUsage === 'minimal' ? `1px solid ${config.theme.colors.border}` : 'none',
                  marginTop: varStyles.layoutDensity === 'compact' ? '0' : '3rem'
                }}
              >
                <div className="text-6xl mb-6">🍔</div>
                <h2
                  className="text-3xl mb-4"
                  style={{
                    fontFamily: embrKitTheme.headingFontFamily,
                    fontWeight: varStyles.headingWeight,
                    color: config.theme.colors.text,
                    letterSpacing: varStyles.letterSpacing
                  }}
                >
                  Delicious Food
                </h2>
                <p
                  className="text-lg leading-relaxed"
                  style={{
                    color: config.theme.colors.textSecondary,
                    fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                  }}
                >
                  Discover amazing food vendors offering everything from local favorites to international cuisine.
                </p>
              </div>
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
          '🎪'
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
