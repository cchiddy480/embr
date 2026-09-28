import React, { useEffect, useMemo, useState } from 'react';
import { ClientConfig } from '../../../types/client';

interface FestivalRendererProps {
  config: ClientConfig;
}

type FlexibleContent = Record<string, any>;

function formatTime(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
}

function navLabel(item: ClientConfig['navigation'][number]) {
  return item.title || (item as any).label || item.id;
}

function GuideIcon({ name }: { name: string }) {
  const paths: Record<string, JSX.Element> = {
    home: <path d="M3 10.8 10 5l7 5.8V18a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1v-7.2Z" />,
    calendar: <><path d="M5 3v3m10-3v3M3.5 8.5h13M5 5h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /></>,
    map: <><path d="m3 5 4-2 6 2 4-2v12l-4 2-6-2-4 2V5Z" /><path d="M7 3v12m6-10v12" /></>,
    location: <><path d="M15 8c0 3.5-5 8-5 8S5 11.5 5 8a5 5 0 1 1 10 0Z" /><circle cx="10" cy="8" r="1.5" /></>,
    store: <><path d="M3 8h14l-1.5-4h-11L3 8Zm1 0v9h12V8M8 17v-5h4v5" /><path d="M3 8a2.5 2.5 0 0 0 4 2 2.5 2.5 0 0 0 3 0 2.5 2.5 0 0 0 3 0 2.5 2.5 0 0 0 4-2" /></>,
    info: <><circle cx="10" cy="10" r="7.5" /><path d="M10 9v5m0-8.2v.2" /></>,
    users: <><circle cx="7" cy="7" r="3" /><circle cx="14" cy="8" r="2.5" /><path d="M2.5 17c.5-3.2 2-5 4.5-5s4 1.8 4.5 5m.5-4.5c2.5 0 4 1.5 4.5 4.5" /></>,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || paths.info}
    </svg>
  );
}

export function FestivalRenderer({ config }: FestivalRendererProps) {
  const content = config.content as FlexibleContent;
  const visibleNavigation = useMemo(
    () => config.navigation.filter((item) => item.id === 'home' || Boolean(content?.[item.id])),
    [config.navigation, content]
  );
  const [activeTab, setActiveTab] = useState(visibleNavigation[0]?.id || 'home');
  const colors = config.theme.colors;
  const border = colors.border || `${colors.text}22`;
  const headingFont = config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif";
  const bodyFont = config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif";

  useEffect(() => {
    if (!visibleNavigation.some((item) => item.id === activeTab)) {
      setActiveTab(visibleNavigation[0]?.id || 'home');
    }
  }, [activeTab, visibleNavigation]);

  useEffect(() => {
    const previous = {
      bodyBackground: document.body.style.background,
      htmlBackground: document.documentElement.style.background,
      bodyColor: document.body.style.color,
    };
    document.body.style.background = colors.background;
    document.documentElement.style.background = colors.background;
    document.body.style.color = colors.text;
    return () => {
      document.body.style.background = previous.bodyBackground;
      document.documentElement.style.background = previous.htmlBackground;
      document.body.style.color = previous.bodyColor;
    };
  }, [colors.background, colors.text]);

  const allEvents = Array.isArray(content?.schedule?.events)
    ? [...content.schedule.events].sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''))
    : [];

  const openTab = (id?: string) => {
    if (id && visibleNavigation.some((item) => item.id === id)) setActiveTab(id);
  };

  const renderHome = () => {
    const home = content?.home || {};
    const firstEvent = allEvents[0];
    const date = firstEvent?.startTime ? formatDate(firstEvent.startTime) : '';

    return (
      <div>
        <section className="border-b px-5 py-10 sm:px-8 sm:py-14" style={{ borderColor: border }}>
          <div className="mx-auto max-w-3xl">
            {date ? (
              <p className="font-mono text-xs font-medium uppercase tracking-[0.16em]" style={{ color: colors.primary }}>{date}</p>
            ) : null}
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl" style={{ color: colors.text, fontFamily: headingFont }}>
              {home.title || config.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 sm:text-lg" style={{ color: colors.textSecondary }}>
              {home.description || config.description}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10">
          {firstEvent ? (
            <button
              type="button"
              onClick={() => openTab('schedule')}
              className="w-full rounded-2xl border p-5 text-left transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
              style={{ backgroundColor: colors.surface, borderColor: border, color: colors.text, ['--tw-ring-color' as any]: colors.primary, ['--tw-ring-offset-color' as any]: colors.background }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: colors.primary }}>First on the schedule</span>
                <span className="font-mono text-xs" style={{ color: colors.textSecondary }}>{formatTime(firstEvent.startTime)}</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.025em]" style={{ fontFamily: headingFont }}>{firstEvent.title}</h2>
              {firstEvent.location ? <p className="mt-2 text-sm" style={{ color: colors.textSecondary }}>{firstEvent.location}</p> : null}
              {firstEvent.description ? <p className="mt-4 max-w-xl text-sm leading-6" style={{ color: colors.textSecondary }}>{firstEvent.description}</p> : null}
            </button>
          ) : (
            <div className="rounded-2xl border p-6" style={{ backgroundColor: colors.surface, borderColor: border }}>
              <p className="font-semibold">Schedule details are being finalised.</p>
              <p className="mt-2 text-sm leading-6" style={{ color: colors.textSecondary }}>Check back from the same link for the latest event information.</p>
            </div>
          )}

          {visibleNavigation.length > 1 ? (
            <section className="mt-10">
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: colors.textSecondary }}>In this guide</h2>
              <div className="mt-3 divide-y rounded-2xl border px-5" style={{ backgroundColor: colors.surface, borderColor: border }}>
                {visibleNavigation.filter((item) => item.id !== 'home').map((item) => (
                  <button key={item.id} type="button" onClick={() => openTab(item.id)} className="flex min-h-[56px] w-full items-center justify-between gap-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2" style={{ borderColor: border, color: colors.text, ['--tw-ring-color' as any]: colors.primary }}>
                    <span className="flex items-center gap-3"><span style={{ color: colors.primary }}><GuideIcon name={item.icon} /></span><span className="font-medium">{navLabel(item)}</span></span>
                    <span aria-hidden="true" style={{ color: colors.textSecondary }}>→</span>
                  </button>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    );
  };

  const renderEvents = (title: string, events: FlexibleContent[]) => (
    <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.16em]" style={{ color: colors.primary }}>Event plan</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]" style={{ fontFamily: headingFont }}>{title}</h1>
      <ol className="mt-8 border-t" style={{ borderColor: border }}>
        {events.map((event, index) => (
          <li key={event.id || `${event.title}-${index}`} className="grid grid-cols-[64px_1fr] gap-4 border-b py-6 sm:grid-cols-[88px_1fr]" style={{ borderColor: border }}>
            <time className="font-mono text-sm font-medium" style={{ color: colors.primary }}>{formatTime(event.startTime)}</time>
            <div>
              <h2 className="text-lg font-semibold tracking-[-0.015em]" style={{ fontFamily: headingFont }}>{event.title}</h2>
              {event.location ? <p className="mt-1 text-sm" style={{ color: colors.textSecondary }}>{event.location}</p> : null}
              {event.speaker ? <p className="mt-1 text-sm" style={{ color: colors.textSecondary }}>{event.speaker}</p> : null}
              {event.description ? <p className="mt-3 max-w-xl text-sm leading-6" style={{ color: colors.textSecondary }}>{event.description}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );

  const renderContacts = (title: string, contacts: FlexibleContent[]) => (
    <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="text-4xl font-semibold tracking-[-0.04em]" style={{ fontFamily: headingFont }}>{title}</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {contacts.map((contact, index) => (
          <article key={contact.id || `${contact.name}-${index}`} className="rounded-2xl border p-5" style={{ backgroundColor: colors.surface, borderColor: border }}>
            <h2 className="text-lg font-semibold" style={{ fontFamily: headingFont }}>{contact.name}</h2>
            {contact.role ? <p className="mt-1 text-sm" style={{ color: colors.textSecondary }}>{contact.role}</p> : null}
            <div className="mt-5 flex flex-col gap-2 text-sm font-medium" style={{ color: colors.primary }}>
              {contact.phone ? <a className="flex min-h-11 items-center" href={`tel:${contact.phone}`}>Call {contact.phone}</a> : null}
              {contact.whatsapp ? <a className="flex min-h-11 items-center" href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}>Open WhatsApp</a> : null}
              {contact.email ? <a className="flex min-h-11 items-center" href={`mailto:${contact.email}`}>Email {contact.name}</a> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  const renderDetails = (title: string, section: FlexibleContent) => {
    const items = section.locations || section.vendors || section.categories || section.list;
    const copy = section.body || section.description;
    return (
      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <h1 className="text-4xl font-semibold tracking-[-0.04em]" style={{ fontFamily: headingFont }}>{title}</h1>
        {copy ? <p className="mt-5 max-w-2xl whitespace-pre-line leading-7" style={{ color: colors.textSecondary }}>{copy}</p> : null}
        {Array.isArray(items) && items.length ? (
          <div className="mt-8 divide-y rounded-2xl border px-5" style={{ backgroundColor: colors.surface, borderColor: border }}>
            {items.map((item: FlexibleContent | string, index: number) => (
              <div key={typeof item === 'string' ? item : item.id || item.name || index} className="py-5" style={{ borderColor: border }}>
                <h2 className="font-semibold">{typeof item === 'string' ? item : item.name || item.label || item.title}</h2>
                {typeof item !== 'string' && (item.description || item.address) ? <p className="mt-1 text-sm leading-6" style={{ color: colors.textSecondary }}>{item.description || item.address}</p> : null}
              </div>
            ))}
          </div>
        ) : null}
        {section.venue?.name ? (
          <div className="mt-8 rounded-2xl border p-5" style={{ backgroundColor: colors.surface, borderColor: border }}>
            <p className="font-semibold">{section.venue.name}</p>
            {section.venue.address ? <p className="mt-1 text-sm" style={{ color: colors.textSecondary }}>{section.venue.address}</p> : null}
          </div>
        ) : null}
        {!copy && !(Array.isArray(items) && items.length) && !section.venue?.name ? (
          <div className="mt-8 rounded-2xl border p-6" style={{ backgroundColor: colors.surface, borderColor: border }}>
            <p className="font-semibold">Nothing has been added here yet.</p>
            <p className="mt-2 text-sm" style={{ color: colors.textSecondary }}>Please check with your organiser if you need this information now.</p>
          </div>
        ) : null}
      </section>
    );
  };

  const activeItem = visibleNavigation.find((item) => item.id === activeTab);
  const activeTitle = activeItem ? navLabel(activeItem) : 'Guide';
  const activeContent = content?.[activeTab] || {};
  const view = activeTab === 'home'
    ? renderHome()
    : Array.isArray(activeContent.events) && activeContent.events.length
      ? renderEvents(activeTitle, [...activeContent.events].sort((a, b) => (a.startTime || '').localeCompare(b.startTime || '')))
      : Array.isArray(activeContent.contacts) && activeContent.contacts.length
        ? renderContacts(activeTitle, activeContent.contacts)
        : renderDetails(activeTitle, activeContent);

  return (
    <div className="min-h-screen min-h-[100dvh] pb-24 md:pb-0" style={{ backgroundColor: colors.background, color: colors.text, fontFamily: bodyFont }}>
      <header className="sticky top-0 z-40 border-b backdrop-blur-xl" style={{ backgroundColor: `${colors.background}EE`, borderColor: border }}>
        <div className="mx-auto flex min-h-[68px] max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
          <button type="button" onClick={() => openTab('home')} className="min-h-11 min-w-0 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2" style={{ ['--tw-ring-color' as any]: colors.primary }}>
            <p className="truncate text-sm font-semibold" style={{ fontFamily: headingFont }}>{config.name}</p>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: colors.textSecondary }}>Live event guide</p>
          </button>
          <nav aria-label="Guide sections" className="hidden items-center gap-1 md:flex">
            {visibleNavigation.map((item) => (
              <button key={item.id} type="button" onClick={() => openTab(item.id)} aria-current={activeTab === item.id ? 'page' : undefined} className="min-h-11 rounded-lg px-3 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2" style={{ backgroundColor: activeTab === item.id ? `${colors.primary}18` : 'transparent', color: activeTab === item.id ? colors.primary : colors.textSecondary, ['--tw-ring-color' as any]: colors.primary }}>
                {navLabel(item)}
              </button>
            ))}
          </nav>
          <span className="flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em]" style={{ borderColor: border, color: colors.textSecondary }}><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colors.primary }} /> Live</span>
        </div>
      </header>

      <main>{view}</main>

      <nav aria-label="Guide sections" className="fixed inset-x-0 bottom-0 z-50 border-t backdrop-blur-xl md:hidden" style={{ backgroundColor: `${colors.surface}F5`, borderColor: border, paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="mx-auto grid max-w-lg grid-flow-col auto-cols-fr">
          {visibleNavigation.slice(0, 5).map((item) => (
            <button key={item.id} type="button" onClick={() => openTab(item.id)} aria-current={activeTab === item.id ? 'page' : undefined} className="flex min-h-[64px] flex-col items-center justify-center gap-1 px-1 text-[10px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset" style={{ color: activeTab === item.id ? colors.primary : colors.textSecondary, ['--tw-ring-color' as any]: colors.primary }}>
              <GuideIcon name={item.icon} />
              <span className="max-w-full truncate">{navLabel(item)}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
