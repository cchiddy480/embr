import React from 'react';
import { EmbrKitSchedule, EmbrKitCard } from '@embr/ui';
import type { ScheduleBlock, Theme } from '../../../../types/blocks-schema';

interface ScheduleBlockViewProps {
  block: ScheduleBlock;
  theme: Theme;
}

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
      <EmbrKitCard className="p-8 text-center">
        <p style={{ color: theme.colors.textSecondary }}>No schedule added yet.</p>
      </EmbrKitCard>
    );
  }

  const days = groupByDay(block.events);

  return (
    <div className="flex flex-col gap-8">
      {days.map((group) => (
        <EmbrKitSchedule key={group.day} title={block.title} date={group.day}>
          {group.events.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-xl mb-3 last:mb-0"
              style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border ?? `${theme.colors.text}15`}` }}
            >
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h4 className="font-semibold" style={{ color: theme.colors.text, fontFamily: `'${theme.fonts.heading}', serif` }}>
                  {event.title}
                </h4>
                {event.time && (
                  <span className="text-sm font-medium whitespace-nowrap" style={{ color: theme.colors.primary }}>
                    {event.time}{event.timeApprox ? ' (approx)' : ''}
                  </span>
                )}
              </div>
              {event.location && (
                <p className="text-sm mb-1" style={{ color: theme.colors.textSecondary }}>📍 {event.location}</p>
              )}
              {event.description && (
                <p className="text-sm mt-2" style={{ color: theme.colors.textSecondary, fontFamily: `'${theme.fonts.body}', sans-serif` }}>
                  {event.description}
                </p>
              )}
              {event.timezoneNote && (
                <p className="text-xs mt-2 italic" style={{ color: theme.colors.textSecondary }}>{event.timezoneNote}</p>
              )}
              {event.mapUrl && (
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] text-sm font-medium mt-1"
                  style={{ color: theme.colors.primary }}
                >
                  Directions ↗
                </a>
              )}
            </div>
          ))}
        </EmbrKitSchedule>
      ))}
    </div>
  );
}
