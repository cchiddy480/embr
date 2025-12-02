import React, { useState } from 'react';
import { ClientConfig } from '../../../../types/client';

interface PeakFormPhysioAppProps {
  config: ClientConfig;
}

export function PeakFormPhysioApp({ config }: PeakFormPhysioAppProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [_selectedExercise, _setSelectedExercise] = useState(null);
  const [_selectedArticle, _setSelectedArticle] = useState(null);
  const [bookmarkedExercises, setBookmarkedExercises] = useState(new Set(['ex-2']));
  const [bookmarkedArticles, setBookmarkedArticles] = useState(new Set(['article-2']));

  const handleBookmarkExercise = (exerciseId: string) => {
    const newBookmarks = new Set(bookmarkedExercises);
    if (newBookmarks.has(exerciseId)) {
      newBookmarks.delete(exerciseId);
    } else {
      newBookmarks.add(exerciseId);
    }
    setBookmarkedExercises(newBookmarks);
  };

  const handleBookmarkArticle = (articleId: string) => {
    const newBookmarks = new Set(bookmarkedArticles);
    if (newBookmarks.has(articleId)) {
      newBookmarks.delete(articleId);
    } else {
      newBookmarks.add(articleId);
    }
    setBookmarkedArticles(newBookmarks);
  };

  const unreadNotifications = config.content.notifications?.recent?.filter(n => !n.read).length || 0;

  const renderHome = () => (
    <div style={{ padding: '1rem' }}>
      {/* Hero Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${config.theme.colors.primary} 0%, ${config.theme.colors.secondary} 100%)`,
        borderRadius: '1rem',
        padding: '2rem',
        color: 'white',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ 
          margin: '0 0 0.5rem 0', 
          fontSize: '1.8rem',
          fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`,
          fontWeight: 700
        }}>
          {config.content.home.title}
        </h1>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '1rem' }}>
          {config.content.home.subtitle}
        </p>
      </div>

      {/* Quick Links */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          color: config.theme.colors.primary,
          fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`,
          fontWeight: 600,
          marginBottom: '1rem'
        }}>
          Quick Access
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {config.content.home.quickLinks?.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.path.replace('/', ''))}
              style={{
                background: config.theme.colors.surface,
                border: `1px solid ${config.theme.colors.border}`,
                borderRadius: '0.75rem',
                padding: '1.5rem 1rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = config.theme.colors.surfaceElevated;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = config.theme.colors.surface;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {link.icon === 'calendar' && '📅'}
                {link.icon === 'fitness' && '💪'}
                {link.icon === 'mail' && '📧'}
              </div>
              <div style={{ 
                color: config.theme.colors.text,
                fontWeight: 500,
                fontSize: '0.9rem'
              }}>
                {link.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Latest Tips */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          color: config.theme.colors.primary,
          fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`,
          fontWeight: 600,
          marginBottom: '1rem'
        }}>
          Latest Wellness Tips
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {config.content.home.latestTips?.slice(0, 3).map((tip) => (
            <div
              key={tip.id}
              onClick={() => setSelectedArticle(tip)}
              style={{
                background: config.theme.colors.surface,
                border: `1px solid ${config.theme.colors.border}`,
                borderRadius: '0.75rem',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = config.theme.colors.surfaceElevated;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = config.theme.colors.surface;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: config.theme.colors.secondary,
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  {tip.category === 'Posture' && '🧘'}
                  {tip.category === 'Recovery' && '💧'}
                  {tip.category === 'Fitness' && '🏃'}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    margin: '0 0 0.25rem 0',
                    color: config.theme.colors.text,
                    fontSize: '1rem',
                    fontWeight: 600,
                    fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`
                  }}>
                    {tip.title}
                  </h3>
                  <p style={{ 
                    margin: 0,
                    color: config.theme.colors.textSecondary,
                    fontSize: '0.9rem',
                    lineHeight: 1.4
                  }}>
                    {tip.summary}
                  </p>
                  <span style={{
                    display: 'inline-block',
                    background: config.theme.colors.primary,
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    marginTop: '0.5rem'
                  }}>
                    {tip.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Map Card */}
      <div style={{
        background: config.theme.colors.surface,
        border: `1px solid ${config.theme.colors.border}`,
        borderRadius: '0.75rem',
        padding: '1.5rem',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          margin: '0 0 0.5rem 0',
          color: config.theme.colors.primary,
          fontSize: '1.1rem',
          fontWeight: 600,
          fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`
        }}>
          Find Your Clinic
        </h3>
        <p style={{ 
          margin: '0 0 1rem 0',
          color: config.theme.colors.textSecondary,
          fontSize: '0.9rem'
        }}>
          Get directions to our Main Clinic or Sports Clinic
        </p>
        <button
          onClick={() => setActiveTab('clinic')}
          style={{
            background: config.theme.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '0.9rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = config.theme.colors.primaryHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = config.theme.colors.primary;
          }}
        >
          View Locations
        </button>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ 
        color: config.theme.colors.primary,
        fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`,
        fontWeight: 600,
        marginBottom: '1.5rem'
      }}>
        {config.content.appointments.title}
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {config.content.appointments.upcoming?.map((appointment) => (
          <div
            key={appointment.id}
            style={{
              background: config.theme.colors.surface,
              border: `1px solid ${config.theme.colors.border}`,
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{
                background: config.theme.colors.primary,
                color: 'white',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                textAlign: 'center',
                minWidth: '80px'
              }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                  {new Date(appointment.date).getDate()}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                  {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: '0 0 0.25rem 0',
                  color: config.theme.colors.text,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`
                }}>
                  {appointment.time} - {appointment.type}
                </h3>
                <p style={{ 
                  margin: '0 0 0.25rem 0',
                  color: config.theme.colors.textSecondary,
                  fontSize: '0.9rem'
                }}>
                  with {appointment.therapist}
                </p>
                <p style={{ 
                  margin: 0,
                  color: config.theme.colors.textSecondary,
                  fontSize: '0.9rem'
                }}>
                  📍 {appointment.location}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                style={{
                  flex: 1,
                  background: 'transparent',
                  color: config.theme.colors.primary,
                  border: `1px solid ${config.theme.colors.primary}`,
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = config.theme.colors.primary;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = config.theme.colors.primary;
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  flex: 1,
                  background: config.theme.colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = config.theme.colors.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = config.theme.colors.primary;
                }}
              >
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExercises = () => (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ 
        color: config.theme.colors.primary,
        fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`,
        fontWeight: 600,
        marginBottom: '1.5rem'
      }}>
        {config.content.exercises.title}
      </h1>

      {/* Category Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        {config.content.exercises.categories?.map((category) => (
          <button
            key={category.id}
            style={{
              background: config.theme.colors.surface,
              color: config.theme.colors.text,
              border: `1px solid ${config.theme.colors.border}`,
              borderRadius: '1.5rem',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = config.theme.colors.primary;
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = config.theme.colors.surface;
              e.currentTarget.style.color = config.theme.colors.text;
            }}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Exercise Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '1rem' 
      }}>
        {config.content.exercises.featured?.map((exercise) => (
          <div
            key={exercise.id}
            style={{
              background: config.theme.colors.surface,
              border: `1px solid ${config.theme.colors.border}`,
              borderRadius: '0.75rem',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: 'none'
            }}
            onClick={() => setSelectedExercise(exercise)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              height: '120px',
              background: config.theme.colors.secondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: config.theme.colors.primary,
                opacity: 0.7,
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.8rem'
              }}>
                {exercise.duration}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookmarkExercise(exercise.id);
                }}
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  left: '0.5rem',
                  background: config.theme.colors.primary,
                  opacity: 0.7,
                  color: bookmarkedExercises.has(exercise.id) ? config.theme.colors.secondary : 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                {bookmarkedExercises.has(exercise.id) ? '⭐' : '☆'}
              </button>
              🏃‍♂️
            </div>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ 
                margin: '0 0 0.5rem 0',
                color: config.theme.colors.text,
                fontSize: '1rem',
                fontWeight: 600,
                fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`
              }}>
                {exercise.title}
              </h3>
              <p style={{ 
                margin: '0 0 0.5rem 0',
                color: config.theme.colors.textSecondary,
                fontSize: '0.9rem',
                lineHeight: 1.4
              }}>
                {exercise.description}
              </p>
              <span style={{
                display: 'inline-block',
                background: config.theme.colors.primary,
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem'
              }}>
                {exercise.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWellness = () => (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ 
        color: config.theme.colors.primary,
        fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`,
        fontWeight: 600,
        marginBottom: '1.5rem'
      }}>
        {config.content.wellness.title}
      </h1>

      {/* Category Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        {config.content.wellness.categories?.map((category) => (
          <button
            key={category}
            style={{
              background: config.theme.colors.surface,
              color: config.theme.colors.text,
              border: `1px solid ${config.theme.colors.border}`,
              borderRadius: '1.5rem',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = config.theme.colors.primary;
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = config.theme.colors.surface;
              e.currentTarget.style.color = config.theme.colors.text;
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {config.content.wellness.articles?.map((article) => (
          <div
            key={article.id}
            style={{
              background: config.theme.colors.surface,
              border: `1px solid ${config.theme.colors.border}`,
              borderRadius: '0.75rem',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: 'none'
            }}
            onClick={() => setSelectedArticle(article)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', padding: '1.5rem' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: config.theme.colors.secondary,
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0
              }}>
                📖
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkArticle(article.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'transparent',
                    color: bookmarkedArticles.has(article.id) ? config.theme.colors.secondary : config.theme.colors.textSecondary,
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}
                >
                  {bookmarkedArticles.has(article.id) ? '⭐' : '☆'}
                </button>
                <h3 style={{ 
                  margin: '0 0 0.5rem 0',
                  color: config.theme.colors.text,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`
                }}>
                  {article.title}
                </h3>
                <p style={{ 
                  margin: '0 0 0.5rem 0',
                  color: config.theme.colors.textSecondary,
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}>
                  {article.summary}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: config.theme.colors.textSecondary }}>
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
                <span style={{
                  display: 'inline-block',
                  background: config.theme.colors.primary,
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  marginTop: '0.5rem'
                }}>
                  {article.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMore = () => (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ 
        color: config.theme.colors.primary,
        fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`,
        fontWeight: 600,
        marginBottom: '1.5rem'
      }}>
        More
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button
          onClick={() => setActiveTab('clinic')}
          style={{
            background: config.theme.colors.surface,
            border: `1px solid ${config.theme.colors.border}`,
            borderRadius: '0.75rem',
            padding: '1.5rem',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = config.theme.colors.surfaceElevated;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = config.theme.colors.surface;
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '1.5rem' }}>🏥</div>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', color: config.theme.colors.text, fontSize: '1rem', fontWeight: 600, fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif` }}>
                Clinic Information
              </h3>
              <p style={{ margin: 0, color: config.theme.colors.textSecondary, fontSize: '0.9rem' }}>
                Contact details, hours, and team information
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setShowNotifications(true)}
          style={{
            background: config.theme.colors.surface,
            border: `1px solid ${config.theme.colors.border}`,
            borderRadius: '0.75rem',
            padding: '1.5rem',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = config.theme.colors.surfaceElevated;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = config.theme.colors.surface;
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '1.5rem' }}>🔔</div>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', color: config.theme.colors.text, fontSize: '1rem', fontWeight: 600, fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif` }}>
                Notifications
              </h3>
              <p style={{ margin: 0, color: config.theme.colors.textSecondary, fontSize: '0.9rem' }}>
                View your recent notifications and updates
              </p>
            </div>
            {unreadNotifications > 0 && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: config.theme.colors.primary,
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                {unreadNotifications}
              </div>
            )}
          </div>
        </button>

        <div style={{
          background: config.theme.colors.surface,
          border: `1px solid ${config.theme.colors.border}`,
          borderRadius: '0.75rem',
          padding: '1.5rem'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: config.theme.colors.text, fontSize: '1rem', fontWeight: 600, fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif` }}>
            App Settings
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: config.theme.colors.text, fontSize: '0.9rem' }}>Push Notifications</span>
              <div style={{
                width: '44px',
                height: '24px',
                background: config.theme.colors.primary,
                borderRadius: '12px',
                position: 'relative',
                cursor: 'pointer'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: 'transform 0.2s'
                }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: config.theme.colors.text, fontSize: '0.9rem' }}>Offline Mode</span>
              <div style={{
                width: '44px',
                height: '24px',
                background: config.theme.colors.border,
                borderRadius: '12px',
                position: 'relative',
                cursor: 'pointer'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  width: '20px',
                  height: '20px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: 'transform 0.2s'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: config.theme.colors.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: config.theme.colors.surface,
        borderRadius: '1rem',
        padding: '1.5rem',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: config.theme.colors.text, fontSize: '1.2rem', fontWeight: 600, fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif` }}>
            Notifications
          </h2>
          <button
            onClick={() => setShowNotifications(false)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: config.theme.colors.textSecondary
            }}
          >
            ✕
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {config.content.notifications?.recent?.map((notification) => (
            <div
              key={notification.id}
              style={{
                background: notification.read ? config.theme.colors.surface : config.theme.colors.surfaceElevated,
                border: `1px solid ${config.theme.colors.border}`,
                borderRadius: '0.75rem',
                padding: '1rem',
                borderLeft: notification.read ? `4px solid ${config.theme.colors.border}` : `4px solid ${config.theme.colors.primary}`
              }}
            >
              <h4 style={{ 
                margin: '0 0 0.5rem 0',
                color: config.theme.colors.text,
                fontSize: '0.9rem',
                fontWeight: 600,
                fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`
              }}>
                {notification.title}
              </h4>
              <p style={{ 
                margin: '0 0 0.5rem 0',
                color: config.theme.colors.textSecondary,
                fontSize: '0.9rem',
                lineHeight: 1.4
              }}>
                {notification.message}
              </p>
              <div style={{ 
                fontSize: '0.8rem',
                color: config.theme.colors.textSecondary
              }}>
                {notification.date} at {notification.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'appointments': return renderAppointments();
      case 'exercises': return renderExercises();
      case 'wellness': return renderWellness();
      case 'more': return renderMore();
      default: return renderHome();
    }
  };

  return (
    <div style={{ 
      background: config.theme.colors.background,
      color: config.theme.colors.text,
      minHeight: '100vh',
      fontFamily: `"${config.theme.typography.body}", system-ui, sans-serif`
    }}>
      {/* Header */}
      <header style={{
        background: config.theme.colors.primary,
        color: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ fontSize: '1.5rem' }}>🏥</div>
          <h1 style={{ 
            margin: 0, 
            fontSize: '1.2rem',
            fontFamily: `"${config.theme.typography.heading}", Inter, system-ui, sans-serif`,
            fontWeight: 600
          }}>
            {config.name}
          </h1>
        </div>
        <button
          onClick={() => setShowNotifications(true)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          🔔
          {unreadNotifications > 0 && (
            <div style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: config.theme.colors.secondary,
              color: 'white',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 600
            }}>
              {unreadNotifications}
            </div>
          )}
        </button>
      </header>

      {/* Main Content */}
      <main style={{ paddingBottom: '80px' }}>
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: config.theme.colors.surface,
        borderTop: `1px solid ${config.theme.colors.border}`,
        display: 'flex',
        padding: '0.5rem 0',
        zIndex: 100
      }}>
        {config.navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.path.replace('/', ''))}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: activeTab === item.path.replace('/', '') ? config.theme.colors.primary : config.theme.colors.textSecondary,
              padding: '0.5rem',
              cursor: 'pointer',
              transition: 'color 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <div style={{ fontSize: '1.2rem' }}>
              {item.icon === 'home' && '🏠'}
              {item.icon === 'calendar' && '📅'}
              {item.icon === 'fitness' && '💪'}
              {item.icon === 'wellness' && '🧘'}
              {item.icon === 'menu' && '⚙️'}
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 500 }}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Modals */}
      {showNotifications && renderNotifications()}
    </div>
  );
}