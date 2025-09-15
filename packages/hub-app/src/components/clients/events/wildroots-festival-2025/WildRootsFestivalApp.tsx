import React, { useEffect, useState, useMemo } from 'react';
import { ClientConfig } from '../../types/client';
import { 
  EmbrKitProvider, 
  EmbrKitContainer, 
  EmbrKitCard,
  EmbrKitButton,
  EmbrKitGrid,
  EmbrKitBadge,
  EmbrKitStatCard,
  EmbrKitInput
} from '@embr/ui';

interface WildRootsFestivalAppProps {
  config: ClientConfig;
}

export function WildRootsFestivalApp({ config }: WildRootsFestivalAppProps) {
  const [activeTab, setActiveTab] = useState(config.navigation[0]?.id || 'home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedEvents, setBookmarkedEvents] = useState<Set<string>>(new Set());

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

  // WildRoots-specific theme
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

  // Utility functions
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
      search: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      bookmark: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
      share: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
    };
    return icons[iconName] || icons.home;
  };

  const toggleBookmark = (eventId: string) => {
    setBookmarkedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const getEventCategories = useMemo(() => {
    if (!config.content?.schedule?.events) return [];
    const categories = new Set(config.content.schedule.events.map(event => (event as any).category || 'General'));
    return Array.from(categories);
  }, [config.content?.schedule?.events]);

  const filteredEvents = useMemo(() => {
    if (!config.content?.schedule?.events) return [];
    
    return config.content.schedule.events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || (event as any).category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [config.content?.schedule?.events, searchQuery, selectedCategory]);

  const renderHomeContent = () => (
    <div className="min-h-screen">
      {/* MODERN FESTIVAL HERO SECTION */}
      <div 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${config.theme.colors.background} 0%, ${config.theme.colors.surface} 50%, ${config.theme.colors.background} 100%)`,
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Nature Elements */}
          <div className="absolute top-20 left-10 text-8xl opacity-20 animate-pulse">🌿</div>
          <div className="absolute top-40 right-20 text-6xl opacity-15 animate-bounce" style={{ animationDelay: '1s' }}>🧘</div>
          <div className="absolute bottom-40 left-20 text-7xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}>♻️</div>
          <div className="absolute bottom-20 right-10 text-9xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>🌱</div>
          <div className="absolute top-60 left-1/3 text-5xl opacity-15 animate-pulse" style={{ animationDelay: '1.5s' }}>🌻</div>
          <div className="absolute bottom-60 right-1/3 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '2.5s' }}>🦋</div>
          
          {/* Gradient Orbs */}
          <div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${config.theme.colors.primary} 0%, transparent 70%)`,
              animationDelay: '0s'
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${config.theme.colors.secondary} 0%, transparent 70%)`,
              animationDelay: '1s'
            }}
          />
        </div>

        <EmbrKitContainer size="lg" className="relative z-10">
          <div className="text-center">
            {/* Festival Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 animate-fade-in"
                 style={{ 
                   backgroundColor: `${config.theme.colors.primary}15`,
                   border: `1px solid ${config.theme.colors.primary}30`
                 }}>
              <span className="text-2xl">🌿</span>
              <span 
                className="text-sm font-medium"
                style={{ 
                  color: config.theme.colors.primary,
                  fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                }}
              >
                Sustainable Living & Wellness Festival
              </span>
            </div>

            {/* Main Heading */}
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl leading-none mb-8 animate-slide-up"
              style={{ 
                fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
                color: config.theme.colors.text,
                fontWeight: 300,
                letterSpacing: '-0.02em'
              }}
            >
              WildRoots
            </h1>
            
            {/* Subtitle */}
            <p 
              className="text-xl md:text-2xl lg:text-3xl mb-16 leading-relaxed max-w-4xl mx-auto animate-slide-up"
              style={{ 
                fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif",
                color: config.theme.colors.textSecondary,
                fontWeight: 300,
                animationDelay: '0.2s'
              }}
            >
              Connect with nature, discover sustainable living, and embrace wellness in our 
              <span style={{ color: config.theme.colors.primary }}> mindful community</span>
            </p>

            {/* Festival Stats */}
            <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <EmbrKitGrid cols={2} gap={6} className="md:grid-cols-4 max-w-4xl mx-auto">
                {config.content?.schedule?.events && (
                  <div className="text-center group">
                    <div 
                      className="text-4xl md:text-5xl font-light mb-2 transition-transform group-hover:scale-110"
                      style={{ 
                        color: config.theme.colors.primary,
                        fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif"
                      }}
                    >
                      {config.content.schedule.events.length}
                    </div>
                    <div 
                      className="text-sm font-medium uppercase tracking-wider"
                      style={{ 
                        color: config.theme.colors.textSecondary,
                        fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                      }}
                    >
                      Events
                    </div>
                  </div>
                )}
                <div className="text-center group">
                  <div 
                    className="text-4xl md:text-5xl font-light mb-2 transition-transform group-hover:scale-110"
                    style={{ 
                      color: config.theme.colors.primary,
                      fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif"
                    }}
                  >
                    25+
                  </div>
                  <div 
                    className="text-sm font-medium uppercase tracking-wider"
                    style={{ 
                      color: config.theme.colors.textSecondary,
                      fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                    }}
                  >
                    Vendors
                  </div>
                </div>
                <div className="text-center group">
                  <div 
                    className="text-4xl md:text-5xl font-light mb-2 transition-transform group-hover:scale-110"
                    style={{ 
                      color: config.theme.colors.primary,
                      fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif"
                    }}
                  >
                    8
                  </div>
                  <div 
                    className="text-sm font-medium uppercase tracking-wider"
                    style={{ 
                      color: config.theme.colors.textSecondary,
                      fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                    }}
                  >
                    Locations
                  </div>
                </div>
                <div className="text-center group">
                  <div 
                    className="text-4xl md:text-5xl font-light mb-2 transition-transform group-hover:scale-110"
                    style={{ 
                      color: config.theme.colors.primary,
                      fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif"
                    }}
                  >
                    3
                  </div>
                  <div 
                    className="text-sm font-medium uppercase tracking-wider"
                    style={{ 
                      color: config.theme.colors.textSecondary,
                      fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                    }}
                  >
                    Days
                  </div>
                </div>
              </EmbrKitGrid>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <EmbrKitButton
                variant="primary"
                size="lg"
                onClick={() => setActiveTab('schedule')}
                className="group transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 px-8 py-4"
                style={{ 
                  backgroundColor: config.theme.colors.primary,
                  color: '#ffffff',
                  fontSize: '1.125rem',
                  borderRadius: '2rem',
                  boxShadow: `0 8px 32px ${config.theme.colors.primary}30`
                }}
              >
                {getIcon('calendar')}
                <span>Explore Schedule</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </EmbrKitButton>
              
              <EmbrKitButton
                variant="secondary"
                size="lg"
                onClick={() => setActiveTab('map')}
                className="group transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 px-8 py-4"
                style={{ 
                  backgroundColor: 'transparent',
                  color: config.theme.colors.primary,
                  border: `2px solid ${config.theme.colors.primary}`,
                  fontSize: '1.125rem',
                  borderRadius: '2rem'
                }}
              >
                {getIcon('map')}
                <span>Festival Map</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </EmbrKitButton>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div 
                className="w-6 h-10 border-2 rounded-full flex justify-center"
                style={{ borderColor: config.theme.colors.textSecondary }}
              >
                <div 
                  className="w-1 h-3 rounded-full mt-2 animate-pulse"
                  style={{ backgroundColor: config.theme.colors.textSecondary }}
                />
              </div>
            </div>
          </div>
        </EmbrKitContainer>
      </div>

      {/* FEATURED EVENTS SECTION */}
      {config.content?.schedule?.events && config.content.schedule.events.length > 0 && (
        <div className="py-24" style={{ backgroundColor: config.theme.colors.background }}>
          <EmbrKitContainer size="lg">
            <div className="text-center mb-16">
              <h2 
                className="text-5xl md:text-6xl font-light mb-6"
                style={{ 
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
                  color: config.theme.colors.text 
                }}
              >
                Featured Events
              </h2>
              <p 
                className="text-xl text-center max-w-2xl mx-auto"
                style={{ 
                  color: config.theme.colors.textSecondary,
                  fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                }}
              >
                Discover workshops, talks, and experiences that inspire sustainable living
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {config.content.schedule.events.slice(0, 3).map((event, index) => (
                <div 
                  key={event.id}
                  className="group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <EmbrKitCard 
                    variant="elevated"
                    className="h-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                    style={{ 
                      backgroundColor: config.theme.colors.surface,
                      borderRadius: '1.5rem'
                    }}
                  >
                    {/* Event Image Placeholder */}
                    <div 
                      className="h-48 relative overflow-hidden"
                      style={{ 
                        background: `linear-gradient(135deg, ${config.theme.colors.primary}20 0%, ${config.theme.colors.secondary}20 100%)`
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl opacity-30">
                          {(event as any).category === 'Wellness' ? '🧘' : 
                           (event as any).category === 'Education' ? '📚' : 
                           (event as any).category === 'Food' ? '🍃' : '🌿'}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <EmbrKitBadge 
                          variant="primary"
                          className="px-3 py-1"
                          style={{ 
                            backgroundColor: config.theme.colors.primary,
                            color: '#ffffff',
                            fontSize: '0.75rem'
                          }}
                        >
                          {(event as any).category || 'Event'}
                        </EmbrKitBadge>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 
                        className="text-xl font-medium mb-3 group-hover:text-opacity-80 transition-colors"
                        style={{ 
                          fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
                          color: config.theme.colors.text 
                        }}
                      >
                        {event.title}
                      </h3>
                      
                      <p 
                        className="text-sm mb-6 leading-relaxed line-clamp-3"
                        style={{ 
                          color: config.theme.colors.textSecondary,
                          fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                        }}
                      >
                        {event.description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${config.theme.colors.primary}15` }}
                          >
                            📅
                          </div>
                          <div>
                            <div 
                              className="font-medium"
                              style={{ 
                                color: config.theme.colors.text,
                                fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                              }}
                            >
                              {new Date(event.startTime).toLocaleDateString('en-US', { 
                                weekday: 'short',
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div 
                              className="text-xs"
                              style={{ 
                                color: config.theme.colors.textSecondary,
                                fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                              }}
                            >
                              {new Date(event.startTime).toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${config.theme.colors.primary}15` }}
                          >
                            📍
                          </div>
                          <div 
                            className="font-medium"
                            style={{ 
                              color: config.theme.colors.text,
                              fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                            }}
                          >
                            {event.location}
                          </div>
                        </div>
                        
                        {event.speaker && (
                          <div className="flex items-center gap-3 text-sm">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${config.theme.colors.primary}15` }}
                            >
                              👤
                            </div>
                            <div 
                              className="font-medium"
                              style={{ 
                                color: config.theme.colors.text,
                                fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                              }}
                            >
                              {event.speaker}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-3">
                        <EmbrKitButton 
                          variant="primary"
                          size="sm"
                          className="flex-1 transition-all hover:scale-105"
                          style={{ 
                            backgroundColor: config.theme.colors.primary,
                            color: '#ffffff',
                            borderRadius: '0.75rem'
                          }}
                        >
                          Learn More
                        </EmbrKitButton>
                        
                        {(event as any).bookmarkable && (
                          <EmbrKitButton 
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(event.id);
                            }}
                            className="transition-all hover:scale-105"
                            style={{ 
                              backgroundColor: bookmarkedEvents.has(event.id) ? config.theme.colors.primary : 'transparent',
                              color: bookmarkedEvents.has(event.id) ? '#ffffff' : config.theme.colors.primary,
                              border: `1px solid ${config.theme.colors.primary}`,
                              borderRadius: '0.75rem'
                            }}
                          >
                            {getIcon('bookmark')}
                          </EmbrKitButton>
                        )}
                      </div>
                    </div>
                  </EmbrKitCard>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <EmbrKitButton 
                variant="secondary"
                size="lg"
                onClick={() => setActiveTab('schedule')}
                className="group inline-flex items-center gap-3 transition-all hover:scale-105 px-8 py-4"
                style={{ 
                  color: config.theme.colors.primary,
                  border: `2px solid ${config.theme.colors.primary}`,
                  borderRadius: '2rem'
                }}
              >
                <span>View All Events</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </EmbrKitButton>
            </div>
          </EmbrKitContainer>
        </div>
      )}

      {/* WILDROOTS-SPECIFIC: About Teaser Section */}
      {(config.content as any)?.about?.welcomeMessage && (
        <div className="px-6 py-12" style={{ backgroundColor: config.theme.colors.background }}>
          <EmbrKitContainer size="lg">
            <EmbrKitCard className="text-center">
              <h2 
                className="text-4xl mb-8"
                style={{ 
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
                  color: config.theme.colors.text 
                }}
              >
                Join Our Sustainable Journey
              </h2>
              
              <div 
                className="text-xl leading-relaxed mb-10"
                style={{ 
                  color: config.theme.colors.textSecondary,
                  fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif",
                  fontWeight: 300
                }}
              >
                {(config.content as any).about?.welcomeMessage?.split('\n')[0] || config.description}
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
    <div className="min-h-screen" style={{ backgroundColor: config.theme.colors.background }}>
      <EmbrKitContainer size="lg" className="px-6 pt-16 pb-8">
        <div className="text-center mb-12">
          <h1 
            className="text-5xl md:text-6xl font-light mb-6"
            style={{ 
              fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
              color: config.theme.colors.text 
            }}
          >
            Festival Schedule
          </h1>
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ 
              color: config.theme.colors.textSecondary,
              fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
            }}
          >
            Discover and bookmark your favorite workshops, talks, and experiences
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {getIcon('search')}
                </div>
                <EmbrKitInput
                  type="text"
                  placeholder="Search events, speakers, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full"
                  style={{
                    backgroundColor: config.theme.colors.surface,
                    border: `1px solid ${config.theme.colors.primary}30`,
                    borderRadius: '1rem',
                    color: config.theme.colors.text
                  }}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'all' ? 'scale-105' : 'hover:scale-105'
                }`}
                style={{ 
                  backgroundColor: selectedCategory === 'all' ? config.theme.colors.primary : 'transparent',
                  color: selectedCategory === 'all' ? '#ffffff' : config.theme.colors.textSecondary,
                  border: `1px solid ${selectedCategory === 'all' ? config.theme.colors.primary : config.theme.colors.primary}30`,
                  fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                }}
              >
                All Events
              </button>
              {getEventCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category ? 'scale-105' : 'hover:scale-105'
                  }`}
                  style={{ 
                    backgroundColor: selectedCategory === category ? config.theme.colors.primary : 'transparent',
                    color: selectedCategory === category ? '#ffffff' : config.theme.colors.textSecondary,
                    border: `1px solid ${selectedCategory === category ? config.theme.colors.primary : config.theme.colors.primary}30`,
                    fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p 
            className="text-sm"
            style={{ 
              color: config.theme.colors.textSecondary,
              fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
            }}
          >
            Showing {filteredEvents.length} of {config.content?.schedule?.events?.length || 0} events
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id}
                className="group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EmbrKitCard 
                  variant="elevated"
                  className="h-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
                  style={{ 
                    backgroundColor: config.theme.colors.surface,
                    borderRadius: '1.5rem'
                  }}
                >
                  {/* Event Header */}
                  <div 
                    className="h-32 relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, ${config.theme.colors.primary}20 0%, ${config.theme.colors.secondary}20 100%)`
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl opacity-30">
                        {(event as any).category === 'Wellness' ? '🧘' : 
                         (event as any).category === 'Education' ? '📚' : 
                         (event as any).category === 'Food' ? '🍃' : '🌿'}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <EmbrKitBadge 
                        variant="primary"
                        className="px-3 py-1"
                        style={{ 
                          backgroundColor: config.theme.colors.primary,
                          color: '#ffffff',
                          fontSize: '0.75rem'
                        }}
                      >
                        {(event as any).category || 'Event'}
                      </EmbrKitBadge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div 
                        className="text-2xl font-light"
                        style={{ 
                          color: config.theme.colors.text,
                          fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif"
                        }}
                      >
                        {new Date(event.startTime).toLocaleDateString('en-US', { 
                          weekday: 'short',
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div 
                        className="text-sm"
                        style={{ 
                          color: config.theme.colors.textSecondary,
                          fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                        }}
                      >
                        {new Date(event.startTime).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 
                      className="text-xl font-medium mb-3 group-hover:text-opacity-80 transition-colors"
                      style={{ 
                        fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
                        color: config.theme.colors.text 
                      }}
                    >
                      {event.title}
                    </h3>
                    
                    <p 
                      className="text-sm mb-6 leading-relaxed line-clamp-3"
                      style={{ 
                        color: config.theme.colors.textSecondary,
                        fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                      }}
                    >
                      {event.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${config.theme.colors.primary}15` }}
                        >
                          📍
                        </div>
                        <div 
                          className="font-medium"
                          style={{ 
                            color: config.theme.colors.text,
                            fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                          }}
                        >
                          {event.location}
                        </div>
                      </div>
                      
                      {event.speaker && (
                        <div className="flex items-center gap-3 text-sm">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${config.theme.colors.primary}15` }}
                          >
                            👤
                          </div>
                          <div 
                            className="font-medium"
                            style={{ 
                              color: config.theme.colors.text,
                              fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
                            }}
                          >
                            {event.speaker}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <EmbrKitButton 
                        variant="primary"
                        size="sm"
                        className="flex-1 transition-all hover:scale-105"
                        style={{ 
                          backgroundColor: config.theme.colors.primary,
                          color: '#ffffff',
                          borderRadius: '0.75rem'
                        }}
                      >
                        View Details
                      </EmbrKitButton>
                      
                      {(event as any).bookmarkable && (
                        <EmbrKitButton 
                          variant="secondary"
                          size="sm"
                          onClick={() => toggleBookmark(event.id)}
                          className="transition-all hover:scale-105"
                          style={{ 
                            backgroundColor: bookmarkedEvents.has(event.id) ? config.theme.colors.primary : 'transparent',
                            color: bookmarkedEvents.has(event.id) ? '#ffffff' : config.theme.colors.primary,
                            border: `1px solid ${config.theme.colors.primary}`,
                            borderRadius: '0.75rem'
                          }}
                        >
                          {getIcon('bookmark')}
                        </EmbrKitButton>
                      )}
                    </div>
                  </div>
                </EmbrKitCard>
              </div>
            ))}
          </div>
        ) : (
          <EmbrKitCard className="text-center py-20">
            <div className="text-8xl mb-6 opacity-30">🔍</div>
            <h3 
              className="text-2xl mb-4"
              style={{ 
                fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
                color: config.theme.colors.text 
              }}
            >
              No events found
            </h3>
            <p 
              className="text-lg max-w-md mx-auto"
              style={{ 
                color: config.theme.colors.textSecondary,
                fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
              }}
            >
              Try adjusting your search terms or category filter to find more events.
            </p>
          </EmbrKitCard>
        )}
      </EmbrKitContainer>
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
            This feature is being carefully crafted to showcase your festival content.
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
      case 'schedule':
        return renderScheduleContent();
      case 'map':
        return renderGenericContent(
          getNavItem(activeTab)?.title || 'Festival Map', 
          'Find your way around the festival grounds', 
          '🗺️'
        );
      case 'vendors':
        return renderGenericContent(
          getNavItem(activeTab)?.title || 'Vendors', 
          'Discover sustainable brands and local artisans', 
          '🏪'
        );
      case 'about':
        return renderGenericContent(
          getNavItem(activeTab)?.title || 'About & Info', 
          'Everything you need to know for an amazing festival experience', 
          'ℹ️'
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

          /* Custom Animations */
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slide-up {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }

          .animate-slide-up {
            animation: slide-up 1s ease-out forwards;
            opacity: 0;
          }

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: ${config.theme.colors.surface};
          }

          ::-webkit-scrollbar-thumb {
            background: ${config.theme.colors.primary}40;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: ${config.theme.colors.primary}60;
          }
        `
      }} />
      <div className="min-h-screen" style={{ backgroundColor: config.theme.colors.background }}>
        {/* WILDROOTS-SPECIFIC: Festival-focused navigation */}
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
                  fontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif"
                }}
              >
                {config.name}
              </h1>
            </div>
            
            {/* WILDROOTS-SPECIFIC: Festival navigation */}
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
