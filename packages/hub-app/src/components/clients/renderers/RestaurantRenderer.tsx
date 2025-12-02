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

interface RestaurantRendererProps {
  config: ClientConfig;
}

export function RestaurantRenderer({ config }: RestaurantRendererProps) {
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
      'book-open': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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
    const menuContent = config.content?.menu || {};
    const locationContent = config.content?.location || {};

    // Sample signature dishes for display
    const signatureDishes = [
      { name: 'Pan-Seared Salmon', description: 'Wild-caught salmon with seasonal vegetables', price: '$32', emoji: '🐟' },
      { name: 'Beef Wellington', description: 'Tender beef wrapped in puff pastry', price: '$48', emoji: '🥩' },
      { name: 'Truffle Risotto', description: 'Creamy arborio rice with black truffle', price: '$28', emoji: '🍄' },
    ];

    // Count open days from hours
    const openDaysCount = locationContent.hours
      ? Object.values(locationContent.hours as Record<string, string>).filter((day: string) => day.toLowerCase() !== 'closed').length
      : 6;

    return (
      <div className="min-h-screen">
        {/* Restaurant Hero - Elegant Full-Width with Overlay */}
        <div
          className="relative px-6 py-20 md:py-32 overflow-hidden"
          style={{
            background: `linear-gradient(to bottom right, ${config.theme.colors.primary}15 0%, ${config.theme.colors.background} 50%, ${config.theme.colors.secondary}10 100%)`,
          }}
        >
          {/* Elegant decorative corner ornaments */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 opacity-20" style={{ borderColor: config.theme.colors.primary }} />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 opacity-20" style={{ borderColor: config.theme.colors.primary }} />

          {/* Floating food elements - positioned elegantly */}
          <div className="absolute top-12 right-12 text-5xl opacity-10 animate-pulse" style={{ animationDuration: '4s' }}>🍷</div>
          <div className="absolute bottom-16 left-16 text-5xl opacity-10 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}>🍽️</div>

          <EmbrKitContainer size="lg">
            <div className="text-center relative z-10">
              {/* Chef's Special Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full border-2" style={{
                borderColor: config.theme.colors.primary,
                backgroundColor: `${config.theme.colors.primary}10`
              }}>
                <span className="text-2xl">⭐</span>
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: config.theme.colors.primary }}>
                  Fine Dining Experience
                </span>
              </div>

              <h1
                className="text-5xl md:text-7xl leading-tight mb-6"
                style={{
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Playfair Display', serif",
                  color: config.theme.colors.text,
                  fontWeight: 700,
                  letterSpacing: '-0.02em'
                }}
              >
                {homeContent.title || config.name}
              </h1>

              {homeContent.subtitle && (
                <p
                  className="text-2xl md:text-3xl mb-6 italic"
                  style={{
                    fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Playfair Display', serif",
                    color: config.theme.colors.primary,
                    fontWeight: 400
                  }}
                >
                  {homeContent.subtitle}
                </p>
              )}

              <p
                className="text-lg md:text-xl mb-12 leading-relaxed max-w-3xl mx-auto"
                style={{
                  fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif",
                  color: config.theme.colors.textSecondary,
                  fontWeight: 400
                }}
              >
                {homeContent.description || config.description}
              </p>

              {/* Reservation CTA - Prominent */}
              <div className="mb-16">
                <EmbrKitButton
                  variant="primary"
                  size="lg"
                  onClick={() => setActiveTab('menu')}
                  className="transition-all duration-300 transform hover:scale-105 hover:shadow-2xl px-12 py-4 text-lg"
                  style={{
                    backgroundColor: config.theme.colors.primary,
                    color: '#ffffff',
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}
                >
                  View Our Menu
                </EmbrKitButton>
              </div>

              {/* Elegant Divider */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="w-24 h-px" style={{ backgroundColor: config.theme.colors.border }} />
                <span className="text-2xl" style={{ color: config.theme.colors.primary }}>✦</span>
                <div className="w-24 h-px" style={{ backgroundColor: config.theme.colors.border }} />
              </div>

              {/* Quick Info Cards - Horizontal Layout */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="p-4 rounded-lg border" style={{
                  backgroundColor: config.theme.colors.background,
                  borderColor: config.theme.colors.border
                }}>
                  <div className="text-3xl font-bold mb-1" style={{ color: config.theme.colors.primary }}>5★</div>
                  <div className="text-sm" style={{ color: config.theme.colors.textSecondary }}>Rating</div>
                </div>
                <div className="p-4 rounded-lg border" style={{
                  backgroundColor: config.theme.colors.background,
                  borderColor: config.theme.colors.border
                }}>
                  <div className="text-3xl font-bold mb-1" style={{ color: config.theme.colors.primary }}>{openDaysCount}</div>
                  <div className="text-sm" style={{ color: config.theme.colors.textSecondary }}>Days Open</div>
                </div>
                {menuContent.categories && Array.isArray(menuContent.categories) && (
                  <div className="p-4 rounded-lg border" style={{
                    backgroundColor: config.theme.colors.background,
                    borderColor: config.theme.colors.border
                  }}>
                    <div className="text-3xl font-bold mb-1" style={{ color: config.theme.colors.primary }}>{menuContent.categories.length}</div>
                    <div className="text-sm" style={{ color: config.theme.colors.textSecondary }}>Courses</div>
                  </div>
                )}
                {menuContent.dietary && Array.isArray(menuContent.dietary) && (
                  <div className="p-4 rounded-lg border" style={{
                    backgroundColor: config.theme.colors.background,
                    borderColor: config.theme.colors.border
                  }}>
                    <div className="text-3xl font-bold mb-1" style={{ color: config.theme.colors.primary }}>{menuContent.dietary.length}+</div>
                    <div className="text-sm" style={{ color: config.theme.colors.textSecondary }}>Options</div>
                  </div>
                )}
              </div>
            </div>
          </EmbrKitContainer>
        </div>

        {/* Chef's Signature Dishes - Elegant Menu Preview */}
        <div className="px-6 py-20" style={{ backgroundColor: config.theme.colors.surface }}>
          <EmbrKitContainer size="lg">
            <div className="text-center mb-12">
              <h2
                className="text-4xl md:text-5xl mb-4"
                style={{
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Playfair Display', serif",
                  color: config.theme.colors.text,
                  fontWeight: 700
                }}
              >
                Chef's Signature Dishes
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto italic"
                style={{
                  color: config.theme.colors.textSecondary,
                  fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                }}
              >
                Expertly crafted, beautifully presented
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {signatureDishes.map((dish, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                  style={{
                    backgroundColor: config.theme.colors.background,
                    borderColor: config.theme.colors.border
                  }}
                >
                  {/* Dish "Photo" Area - Using emoji as elegant placeholder */}
                  <div
                    className="h-48 flex items-center justify-center text-8xl relative overflow-hidden"
                    style={{ backgroundColor: `${config.theme.colors.primary}05` }}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-500">{dish.emoji}</span>
                    {/* Elegant overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                      style={{ backgroundColor: `${config.theme.colors.primary}90` }}
                    >
                      <span className="text-white font-semibold text-lg">View Details</span>
                    </div>
                  </div>

                  {/* Dish Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3
                        className="text-xl font-semibold"
                        style={{
                          fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Playfair Display', serif",
                          color: config.theme.colors.text
                        }}
                      >
                        {dish.name}
                      </h3>
                      <span
                        className="text-xl font-bold"
                        style={{ color: config.theme.colors.primary }}
                      >
                        {dish.price}
                      </span>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: config.theme.colors.textSecondary,
                        fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                      }}
                    >
                      {dish.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </EmbrKitContainer>
        </div>

        {/* Today's Special - Spotlight Section */}
        <div
          className="px-6 py-16 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${config.theme.colors.primary} 0%, ${config.theme.colors.secondary} 100%)`
          }}
        >
          <EmbrKitContainer size="md">
            <div className="text-center text-white">
              <div className="text-5xl mb-4">👨‍🍳</div>
              <h2
                className="text-3xl md:text-4xl mb-4 font-bold"
                style={{
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Playfair Display', serif"
                }}
              >
                Today's Special
              </h2>
              <p className="text-xl mb-6 opacity-95" style={{ fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif" }}>
                Ask your server about our chef's daily creation, featuring seasonal ingredients at their peak
              </p>
              <EmbrKitButton
                variant="secondary"
                size="lg"
                onClick={() => setActiveTab('menu')}
                className="bg-white hover:bg-opacity-90 transition-all"
                style={{
                  color: config.theme.colors.primary,
                  fontWeight: 600
                }}
              >
                Explore Full Menu
              </EmbrKitButton>
            </div>
          </EmbrKitContainer>
        </div>

        {/* The Experience - Features with Elegant Layout */}
        <div className="px-6 py-20" style={{ backgroundColor: config.theme.colors.background }}>
          <EmbrKitContainer size="lg">
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl mb-4"
                style={{
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Playfair Display', serif",
                  color: config.theme.colors.text,
                  fontWeight: 700
                }}
              >
                The {config.name} Experience
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{
                  color: config.theme.colors.textSecondary,
                  fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                }}
              >
                Where culinary artistry meets warm hospitality
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {/* Feature 1 */}
              <div className="text-center">
                <div
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl"
                  style={{ backgroundColor: `${config.theme.colors.primary}15` }}
                >
                  🌱
                </div>
                <h3
                  className="text-2xl mb-3 font-semibold"
                  style={{
                    fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Playfair Display', serif",
                    color: config.theme.colors.text
                  }}
                >
                  Farm to Table
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    color: config.theme.colors.textSecondary,
                    fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                  }}
                >
                  Fresh, locally-sourced ingredients delivered daily from trusted farms. Every dish celebrates the season.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center">
                <div
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl"
                  style={{ backgroundColor: `${config.theme.colors.primary}15` }}
                >
                  👨‍🍳
                </div>
                <h3
                  className="text-2xl mb-3 font-semibold"
                  style={{
                    fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Playfair Display', serif",
                    color: config.theme.colors.text
                  }}
                >
                  Master Chefs
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    color: config.theme.colors.textSecondary,
                    fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                  }}
                >
                  Award-winning culinary team with decades of experience crafting unforgettable dining experiences.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center">
                <div
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl"
                  style={{ backgroundColor: `${config.theme.colors.primary}15` }}
                >
                  🍷
                </div>
                <h3
                  className="text-2xl mb-3 font-semibold"
                  style={{
                    fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Playfair Display', serif",
                    color: config.theme.colors.text
                  }}
                >
                  Wine Pairings
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    color: config.theme.colors.textSecondary,
                    fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                  }}
                >
                  Curated wine selection from renowned vineyards, expertly paired to enhance your culinary journey.
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
          '🍽️'
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
