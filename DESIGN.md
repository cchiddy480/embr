# Embr design system

Embr is a done-for-you live event guide. Guest interfaces should feel calm under pressure, fast to scan, and native to each organiser's brand without losing a consistent interaction model.

## Product promise

- Organiser: send the schedule and receive one polished link.
- Guest: open the link and immediately find what is happening, where, and what changed.
- Voice: direct, useful, warm, British English. No hype, jargon, emoji, or em dashes in interface copy.

## Brand shell tokens

| Role | Token | Value |
| --- | --- | --- |
| Ink | `--embr-ink` | `#0c151d` |
| Ink raised | `--embr-ink-raised` | `#13212c` |
| Paper | `--embr-paper` | `#f3f1ea` |
| Paper raised | `--embr-paper-raised` | `#fbfaf6` |
| Primary | `--embr-signal` | `#48dbc8` |
| Muted on ink | `--embr-ink-muted` | `#a8b5bc` |
| Border on ink | `--embr-ink-border` | `rgba(255,255,255,.12)` |

Client guides use the same surface, spacing, and navigation rules but replace signal teal with the client's single primary colour. Secondary client colours are decorative only, not competing CTAs.

The Embr mark is always the original four-ember cluster, rebuilt as flat vector geometry. Use signal teal on transparent or ink backgrounds, keep all four embers equal, and never add glow, gradients, shadows, or rearrange the cluster.

## Type and shape

- Brand shell: Geist or Inter. Client guides may use their configured heading and body fonts.
- Time, date, version, and status: Geist Mono or system monospace.
- Controls: 8px radius. Panels: 16px radius. Pills only for status.
- Spacing follows a 4px grid. Guest content uses a readable 720px column.
- Borders define elevation. No glow, bouncing decoration, heavy shadow, or gradient hero.

## Guest guide layout spec

```text
event name                              live status
-------------------------------------------------
date / venue
event title
short event description

next item or first scheduled item
-------------------------------------------------
home      schedule      useful event sections
```

Desktop navigation stays in the header. Mobile navigation is fixed above the safe area at the bottom. Schedule rows lead with time, then title and location. Empty content is hidden from navigation where possible and otherwise receives an honest empty state.

## Required states

- Loading: branded progress indicator and plain-language status.
- Empty: name what is missing and point to the organiser if action is needed.
- Error or expired link: explain the link problem and offer the marketing site or organiser as the next step.
- Default: first useful information is visible without scrolling on a typical phone.

## Interaction and accessibility

- All interactive targets are at least 44px.
- Focus uses a visible 2px client-colour ring with 3px offset.
- Motion is limited to 150 to 500ms opacity and transform transitions.
- `prefers-reduced-motion` removes all entrance motion.
- At 320px the title, schedule, and navigation do not clip or overflow.
- No icon-only control ships without an accessible name.
