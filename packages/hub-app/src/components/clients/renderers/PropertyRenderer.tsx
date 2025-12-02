import React, { useEffect, useState } from 'react';
import { ClientConfig } from '../../../types/client';
import {
  EmbrKitProvider,
  EmbrKitContainer,
  EmbrKitCard,
  EmbrKitButton,
  EmbrKitBadge
} from '@embr/ui';
import { getVariationStyles } from '../../../lib/templateVariations';

interface PropertyRendererProps {
  config: ClientConfig;
}

export function PropertyRenderer({ config }: PropertyRendererProps) {
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
      building: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      star: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
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
    const propertiesContent = config.content?.properties || {};
    const featuresContent = config.content?.features || {};
    const locationContent = config.content?.location || {};

    // Sample luxury amenities for showcase
    const luxuryAmenities = [
      { icon: '🏊', title: 'Rooftop Pool', description: 'Infinity pool with stunning city views' },
      { icon: '💪', title: 'Fitness Center', description: '24/7 state-of-the-art gym facilities' },
      { icon: '🧘', title: 'Wellness Spa', description: 'Private spa and relaxation areas' },
      { icon: '👔', title: 'Concierge', description: 'Premium concierge services' },
      { icon: '🚗', title: 'Parking', description: 'Secure underground parking' },
      { icon: '🌿', title: 'Green Spaces', description: 'Landscaped gardens and terraces' },
    ];

    // Count nearby amenities
    const nearbyCount = locationContent.nearby
      ? Object.keys(locationContent.nearby).length
      : 4;

    return (
      <div className="min-h-screen">
        {/* Luxury Property Hero - Vertical Split Layout */}
        <div className="grid md:grid-cols-5 min-h-[85vh]">
          {/* Left: Hero Content (3 columns) */}
          <div
            className="md:col-span-3 px-8 md:px-16 py-20 md:py-32 flex flex-col justify-center relative overflow-hidden"
            style={{ backgroundColor: config.theme.colors.background }}
          >
            {/* Subtle luxury patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5" style={{
              background: `radial-gradient(circle, ${config.theme.colors.primary} 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />

            <div className="relative z-10 max-w-2xl">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-md border" style={{
                borderColor: config.theme.colors.primary,
                backgroundColor: 'transparent'
              }}>
                <span style={{ color: config.theme.colors.primary, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                  LUXURY LIVING
                </span>
              </div>

              <h1
                className="text-5xl md:text-7xl leading-tight mb-6"
                style={{
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Cormorant Garamond', serif",
                  color: config.theme.colors.text,
                  fontWeight: 300,
                  letterSpacing: '-0.02em'
                }}
              >
                {homeContent.title || config.name}
              </h1>

              {homeContent.subtitle && (
                <p
                  className="text-xl md:text-2xl mb-8 leading-relaxed"
                  style={{
                    fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif",
                    color: config.theme.colors.primary,
                    fontWeight: 500
                  }}
                >
                  {homeContent.subtitle}
                </p>
              )}

              <p
                className="text-lg md:text-xl mb-12 leading-relaxed"
                style={{
                  fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif",
                  color: config.theme.colors.textSecondary,
                  fontWeight: 400,
                  lineHeight: '1.8'
                }}
              >
                {homeContent.description || config.description}
              </p>

              {/* Premium CTA */}
              <div className="flex flex-wrap gap-4">
                <EmbrKitButton
                  variant="primary"
                  size="lg"
                  onClick={() => setActiveTab('properties')}
                  className="transition-all duration-300 px-10 py-4"
                  style={{
                    backgroundColor: config.theme.colors.primary,
                    color: '#ffffff',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    fontSize: '0.875rem'
                  }}
                >
                  Explore Units
                </EmbrKitButton>
                <EmbrKitButton
                  variant="ghost"
                  size="lg"
                  onClick={() => setActiveTab('tour')}
                  className="transition-all duration-300 px-10 py-4 border-2"
                  style={{
                    borderColor: config.theme.colors.border,
                    color: config.theme.colors.text,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    fontSize: '0.875rem'
                  }}
                >
                  Virtual Tour
                </EmbrKitButton>
              </div>
            </div>
          </div>

          {/* Right: Key Stats Panel (2 columns) */}
          <div
            className="md:col-span-2 px-8 py-20 md:py-32 flex flex-col justify-center"
            style={{ backgroundColor: config.theme.colors.surface }}
          >
            <div className="space-y-8 max-w-md">
              <div className="pb-8 border-b" style={{ borderColor: config.theme.colors.border }}>
                <h3
                  className="text-sm font-bold uppercase tracking-wider mb-6"
                  style={{ color: config.theme.colors.textSecondary, letterSpacing: '0.15em' }}
                >
                  Property Highlights
                </h3>
              </div>

              <div className="space-y-6">
                {/* Stat 1 */}
                <div className="flex items-baseline gap-4">
                  <div className="text-5xl font-light" style={{ color: config.theme.colors.primary, fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Cormorant Garamond', serif" }}>
                    A+
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider" style={{ color: config.theme.colors.textSecondary }}>Location</div>
                    <div className="text-sm font-medium" style={{ color: config.theme.colors.text }}>Premium Rating</div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-baseline gap-4">
                  <div className="text-5xl font-light" style={{ color: config.theme.colors.primary, fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Cormorant Garamond', serif" }}>
                    {nearbyCount}+
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider" style={{ color: config.theme.colors.textSecondary }}>Nearby</div>
                    <div className="text-sm font-medium" style={{ color: config.theme.colors.text }}>Premium Amenities</div>
                  </div>
                </div>

                {propertiesContent.propertyTypes && Array.isArray(propertiesContent.propertyTypes) && (
                  <div className="flex items-baseline gap-4">
                    <div className="text-5xl font-light" style={{ color: config.theme.colors.primary, fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Cormorant Garamond', serif" }}>
                      {propertiesContent.propertyTypes.length}
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider" style={{ color: config.theme.colors.textSecondary }}>Unit Types</div>
                      <div className="text-sm font-medium" style={{ color: config.theme.colors.text }}>Available</div>
                    </div>
                  </div>
                )}

                {featuresContent.categories && Array.isArray(featuresContent.categories) && (
                  <div className="flex items-baseline gap-4">
                    <div className="text-5xl font-light" style={{ color: config.theme.colors.primary, fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Cormorant Garamond', serif" }}>
                      {featuresContent.categories.length}
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider" style={{ color: config.theme.colors.textSecondary }}>Lifestyle</div>
                      <div className="text-sm font-medium" style={{ color: config.theme.colors.text }}>Feature Sets</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* World-Class Amenities - Luxury Grid */}
        <div className="px-6 py-24" style={{ backgroundColor: config.theme.colors.background }}>
          <EmbrKitContainer size="xl">
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl mb-4"
                style={{
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Cormorant Garamond', serif",
                  color: config.theme.colors.text,
                  fontWeight: 300,
                  letterSpacing: '-0.02em'
                }}
              >
                World-Class Amenities
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto leading-relaxed"
                style={{
                  color: config.theme.colors.textSecondary,
                  fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                }}
              >
                Experience unparalleled luxury with our curated selection of premium facilities
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {luxuryAmenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-sm border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                  style={{
                    backgroundColor: config.theme.colors.surface,
                    borderColor: config.theme.colors.border
                  }}
                >
                  {/* Hover overlay */}
                  <div
                    className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500"
                    style={{ backgroundColor: config.theme.colors.primary }}
                  />

                  <div className="p-8">
                    <div className="text-5xl mb-6">{amenity.icon}</div>
                    <h3
                      className="text-2xl mb-3"
                      style={{
                        fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Cormorant Garamond', serif",
                        color: config.theme.colors.text,
                        fontWeight: 400
                      }}
                    >
                      {amenity.title}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: config.theme.colors.textSecondary,
                        fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                      }}
                    >
                      {amenity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </EmbrKitContainer>
        </div>

        {/* Location Excellence - Premium Neighborhood Showcase */}
        <div
          className="px-6 py-24 relative overflow-hidden"
          style={{
            background: `linear-gradient(to bottom, ${config.theme.colors.surface} 0%, ${config.theme.colors.background} 100%)`
          }}
        >
          <EmbrKitContainer size="lg">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2
                  className="text-4xl md:text-5xl mb-4"
                  style={{
                    fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Cormorant Garamond', serif",
                    color: config.theme.colors.text,
                    fontWeight: 300,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Prime Location
                </h2>
                <p
                  className="text-lg leading-relaxed"
                  style={{
                    color: config.theme.colors.textSecondary,
                    fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                  }}
                >
                  Situated in one of the city's most prestigious neighborhoods
                </p>
              </div>

              {/* Location highlights in elegant 2-column layout */}
              {locationContent.nearby && (
                <div className="grid md:grid-cols-2 gap-8">
                  {Object.entries(locationContent.nearby as Record<string, string>).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-start gap-6 p-6 rounded-sm"
                      style={{
                        backgroundColor: config.theme.colors.background,
                        border: `1px solid ${config.theme.colors.border}`
                      }}
                    >
                      <div
                        className="text-4xl flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full"
                        style={{ backgroundColor: `${config.theme.colors.primary}10` }}
                      >
                        {key === 'transit' && '🚇'}
                        {key === 'shopping' && '🛍️'}
                        {key === 'parks' && '🌳'}
                        {key === 'schools' && '🎓'}
                        {!['transit', 'shopping', 'parks', 'schools'].includes(key) && '📍'}
                      </div>
                      <div className="flex-1">
                        <h4
                          className="text-xl mb-2 capitalize"
                          style={{
                            fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Cormorant Garamond', serif",
                            color: config.theme.colors.text,
                            fontWeight: 400
                          }}
                        >
                          {key}
                        </h4>
                        <p
                          className="leading-relaxed"
                          style={{
                            color: config.theme.colors.textSecondary,
                            fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif",
                            fontSize: '0.95rem'
                          }}
                        >
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </EmbrKitContainer>
        </div>

        {/* Final CTA - Schedule Viewing */}
        <div
          className="px-6 py-20 text-center"
          style={{ backgroundColor: config.theme.colors.surface }}
        >
          <EmbrKitContainer size="md">
            <div className="text-6xl mb-6">🏢</div>
            <h2
              className="text-3xl md:text-4xl mb-4"
              style={{
                fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Cormorant Garamond', serif",
                color: config.theme.colors.text,
                fontWeight: 300
              }}
            >
              Schedule Your Private Viewing
            </h2>
            <p
              className="text-lg mb-8 max-w-xl mx-auto leading-relaxed"
              style={{
                color: config.theme.colors.textSecondary,
                fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
              }}
            >
              Experience luxury living firsthand. Book your exclusive property tour today.
            </p>
            <EmbrKitButton
              variant="primary"
              size="lg"
              onClick={() => setActiveTab('contact')}
              className="px-12 py-4"
              style={{
                backgroundColor: config.theme.colors.primary,
                color: '#ffffff',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontSize: '0.875rem'
              }}
            >
              Book Viewing
            </EmbrKitButton>
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
          '🏢'
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
