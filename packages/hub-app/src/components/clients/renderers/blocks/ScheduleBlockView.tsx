import React from 'react';
import { GuideCard } from './GuideCard';
import type { ScheduleBlock, Theme } from '../../../../types/blocks-schema';

interface ScheduleBlockViewProps {
  block: ScheduleBlock;
  theme: Theme;
}

const MONO_FONT = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// Groups events by their `day` label, preserving the order they were
// authored in — never re-sorted by `time`, since that field is free text
// (e.g. "9am", "approx 2:30pm") and re-sorting it risks scrambling a
// correctly-ordered but non-standard-format schedule. See lib/import.ts's
// ambiguity-handling rules for why times are never silently normalized.
function groupByDay(events: ScheduleBlock['events']) {
  const days: { day: string; events: ScheduleBlock['events'] }[] = [];
  for (const event of events) {
    const group = days.find((d) => d.day === event.day);
    if (group) group.events.push(event);
    else days.push({ day: event.day, events: [event] });
  }
  return days;
}

export function ScheduleBlockView({ block, theme }: ScheduleBlockViewProps) {
  if (block.events.length === 0) {
    return (
      <GuideCard theme={theme} className="text-center">
        <p style={{ color: theme.colors.textSecondary }}>No schedule added yet.</p>
      </GuideCard>
    );
  }

  const days = groupByDay(block.events);

  return (
    <div className="flex flex-col gap-6">
      {days.map((group) => (
        <div key={group.day}>
          <h3
            className="text-xs font-semibold uppercase tracking-wide mb-2 px-1"
            style={{ color: theme.colors.textSecondary, fontFamily: MONO_FONT }}
          >
            {group.day}
          </h3>
          <div className="flex flex-col gap-2">
            {group.events.map((event) => (
              <div
                key={event.id}
                className="flex gap-4 rounded-xl px-4 py-3"
                style={{ border: `1px solid ${theme.colors.border ?? `${theme.colors.text}1a`}` }}
              >
                {event.time && (
                  <div
                    className="shrink-0 text-sm pt-0.5 tabular-nums"
                    style={{ color: theme.colors.primary, fontFamily: MONO_FONT, minWidth: '4.5rem' }}
                  >
                    {event.time}
                    {event.timeApprox ? '*' : ''}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold" style={{ color: theme.colors.text, fontFamily: `'${theme.fonts.heading}', serif` }}>
                    {event.title}
                  </p>
                  {event.location && (
                    <p className="text-sm mt-0.5" style={{ color: theme.colors.textSecondary }}>{event.location}</p>
                  )}
                  {event.description && (
                    <p className="text-sm mt-1" style={{ color: theme.colors.textSecondary, fontFamily: `'${theme.fonts.body}', sans-serif` }}>
                      {event.description}
                    </p>
                  )}
                  {event.timezoneNote && (
                    <p className="text-xs mt-1 italic" style={{ color: theme.colors.textSecondary }}>{event.timezoneNote}</p>
                  )}
                  {event.mapUrl && (
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center min-h-[44px] text-sm font-medium"
                      style={{ color: theme.colors.primary }}
                    >
                      Get directions
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
