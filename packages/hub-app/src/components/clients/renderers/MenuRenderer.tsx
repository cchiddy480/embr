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

interface MenuRendererProps {
  config: ClientConfig;
}

export function MenuRenderer({ config }: MenuRendererProps) {
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
      package: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      briefcase: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      currency: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
    const productsContent = config.content?.products || {};
    const servicesContent = config.content?.services || {};

    return (
      <div className="min-h-screen" style={{ backgroundColor: config.theme.colors.background }}>
        {/* Business Hero - Catalog Style */}
        <div
          className="px-6 py-20 relative"
          style={{
            background: `linear-gradient(to bottom, ${config.theme.colors.surface} 0%, ${config.theme.colors.background} 100%)`,
            borderBottom: `1px solid ${config.theme.colors.border}`
          }}
        >
          <EmbrKitContainer size="lg">
            <div className="text-center max-w-4xl mx-auto">
              <div
                className="inline-block px-4 py-2 rounded-full mb-6 text-sm font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: config.theme.colors.primary,
                  color: '#ffffff'
                }}
              >
                {homeContent.subtitle || 'Business Catalog'}
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 font-bold"
                style={{
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
                  color: config.theme.colors.text
                }}
              >
                {config.name}
              </h1>

              <p
                className="text-lg md:text-xl mb-12 max-w-2xl mx-auto"
                style={{
                  fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif",
                  color: config.theme.colors.textSecondary
                }}
              >
                {homeContent.description || config.description}
              </p>

              {/* Category Badges */}
              {productsContent.categories && Array.isArray(productsContent.categories) && (
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                  {productsContent.categories.map((cat: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: config.theme.colors.surface,
                        color: config.theme.colors.text,
                        border: `1px solid ${config.theme.colors.border}`
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </EmbrKitContainer>
        </div>

        {/* Product Grid - Variation-styled */}
        <div style={{
          paddingTop: varStyles.sectionSpacing,
          paddingBottom: varStyles.sectionSpacing,
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem'
        }}>
          <EmbrKitContainer size="lg">
            <h2
              className="text-3xl mb-12 text-center"
              style={{
                fontFamily: embrKitTheme.headingFontFamily,
                fontWeight: varStyles.headingWeight,
                color: config.theme.colors.text,
                letterSpacing: varStyles.letterSpacing
              }}
            >
              Featured Offerings
            </h2>

            {/* Grid of Product/Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '📦', title: 'Products', desc: productsContent.categories?.length || '4', badge: 'Popular' },
                { icon: '⚙️', title: 'Services', desc: servicesContent.categories?.length || '3', badge: 'Pro' },
                { icon: '🎯', title: 'Solutions', desc: 'Custom', badge: 'Enterprise' },
                { icon: '🚀', title: 'Packages', desc: 'Bundled', badge: 'Best Value' },
                { icon: '📊', title: 'Analytics', desc: 'Insights', badge: 'Add-on' },
                { icon: '🔒', title: 'Security', desc: 'Protected', badge: 'Premium' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer group transition-all"
                  style={{
                    backgroundColor: config.theme.colors.background,
                    padding: varStyles.cardSpacing,
                    borderRadius: varStyles.borderRadius,
                    border: varStyles.borderStyle + ' ' + config.theme.colors.border,
                    boxShadow: varStyles.shadowIntensity,
                    transitionDuration: varStyles.animationDuration
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = varStyles.hoverTransform;
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = varStyles.shadowIntensity;
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{item.icon}</div>
                    <span
                      className="px-3 py-1 text-xs uppercase"
                      style={{
                        backgroundColor: `${config.theme.colors.primary}20`,
                        color: config.theme.colors.primary,
                        borderRadius: varStyles.borderRadius,
                        fontWeight: varStyles.headingWeight
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <h3
                    className="text-xl mb-2"
                    style={{
                      fontFamily: embrKitTheme.headingFontFamily,
                      fontWeight: varStyles.headingWeight,
                      color: config.theme.colors.text,
                      letterSpacing: varStyles.letterSpacing
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-lg mb-4"
                    style={{
                      color: config.theme.colors.textSecondary,
                      fontFamily: embrKitTheme.fontFamily,
                      fontWeight: varStyles.bodyWeight
                    }}
                  >
                    {item.desc} options available
                  </p>
                  <button
                    className="text-sm font-semibold group-hover:underline"
                    style={{ color: config.theme.colors.primary }}
                  >
                    Learn more →
                  </button>
                </div>
              ))}
            </div>
          </EmbrKitContainer>
        </div>

        {/* Pricing Strip */}
        <div className="py-16" style={{ backgroundColor: config.theme.colors.surface }}>
          <EmbrKitContainer size="lg">
            <div className="text-center mb-12">
              <h2
                className="text-3xl font-bold mb-4"
                style={{
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
                  color: config.theme.colors.text
                }}
              >
                Simple, Transparent Pricing
              </h2>
              <p
                className="text-lg"
                style={{
                  color: config.theme.colors.textSecondary,
                  fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                }}
              >
                Choose the plan that works for you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { plan: 'Starter', price: '£99', features: ['Basic Access', '5 Projects', 'Email Support'] },
                { plan: 'Professional', price: '£299', features: ['Full Access', '50 Projects', 'Priority Support'], highlight: true },
                { plan: 'Enterprise', price: 'Custom', features: ['Unlimited', 'Custom Solutions', 'Dedicated Manager'] }
              ].map((tier, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-xl"
                  style={{
                    backgroundColor: tier.highlight ? config.theme.colors.primary : config.theme.colors.background,
                    border: tier.highlight ? 'none' : `2px solid ${config.theme.colors.border}`,
                    color: tier.highlight ? '#ffffff' : config.theme.colors.text
                  }}
                >
                  <h3 className="text-2xl font-bold mb-2">{tier.plan}</h3>
                  <div className="text-4xl font-black mb-6">{tier.price}</div>
                  <ul className="space-y-3">
                    {tier.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2">
                        <span>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full mt-8 py-3 rounded-lg font-semibold transition-all"
                    style={{
                      backgroundColor: tier.highlight ? '#ffffff' : config.theme.colors.primary,
                      color: tier.highlight ? config.theme.colors.primary : '#ffffff'
                    }}
                  >
                    Get Started
                  </button>
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
          '📦'
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
