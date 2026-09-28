---
name: import-guide
description: Build an Embr trip/event guide config from a pasted itinerary, a URL, or a file, validate it, and push it live. Use when asked to build/import/create a guide, or to turn an itinerary/schedule into an Embr config.
---

# Import a guide from an itinerary

Turns a real itinerary (pasted text, a URL, a file) into a valid Embr trip
guide config and, once reviewed, pushes it to Firestore so it's live at
`app.build-embr.co.uk/c/<clientId>`.

This is the human-reviewed path for Phase C of the production plan
(`/root/.claude/plans/building-embr-so-it-s-sparkling-unicorn.md` if
present). There's also a headless, API-based version of this same pipeline
(`packages/hub-app/src/lib/import.ts`, run via `npm run prospect:demo`) —
that one exists for a future unattended endpoint (Phase D's `/try`), not
for this. Don't use it here; this skill does the extraction directly,
using this session's own model, no separate Anthropic API key or billing.

## Steps

**1. Read the schema.** Read `packages/hub-app/src/types/blocks-schema.ts`
(`TripConfigSchema` and the block types) before writing any JSON — it's
the authoritative shape, not something to reconstruct from memory.

**2. Get the source material.** If the user hasn't already pasted the
itinerary, given a URL, or pointed at a file in this conversation, ask for
it before doing anything else.

**3. Extract faithfully.** Apply these rules exactly (they're the same
discipline `lib/import-prompt.ts`'s system prompt uses for the API path —
duplicated here since this skill drives the extraction directly instead of
handing it to a forced tool call):

- Extract only what's explicitly stated. Never invent times, venues,
  contact details, or event names that aren't in the source.
- Times: copy them exactly as written (e.g. "9am", "14:30", "around
  lunchtime"). Never reformat, never convert 12/24-hour, never guess a
  precise time for a vague one — leave it as written and note the
  vagueness in your summary to the user instead.
- Timezones: if the source states a timezone, or different parts of the
  itinerary are clearly in different timezones, record that in the
  event's `timezoneNote` field exactly as written. Never silently convert
  or assume one timezone applies throughout.
- Dates: resolve relative dates ("next Friday") against any reference
  date in the source. If there's truly no way to resolve a date, use a
  plain `day` label like "Day 1" rather than guessing a calendar date.
- Only infer a missing time/event for extremely common, unambiguous
  patterns (a meal slot, a stated check-in/check-out) — and say so when
  you summarize for the user. Never invent an event for an activity type
  you don't recognize.
- Every event needs a non-empty `day` label, even for a single day with
  no date at all in the source — use "Day 1".

**4. Assemble the full config.** Build a complete `TripConfig` JSON object:
- `clientId`: kebab-case of the event name plus a short unique suffix
  (e.g. `smith-wedding-a3f2`) — must match `^[a-z0-9-]+$`.
- `name`: the event/trip name from the source (ask the user if genuinely
  absent, don't invent one).
- `expiry`: an ISO 8601 datetime. If the source doesn't state a clear end
  date, ask the user rather than guessing — this determines when the
  guide auto-expires.
- `status`: `"preview"`.
- `theme`: use the default below unless the user gives you real brand
  colors (matches `packages/hub-app/src/presets/trip.ts`'s
  `DEFAULT_THEME` — keep in sync with that file if it ever changes):
  ```json
  {
    "colors": { "primary": "#0F766E", "secondary": "#22C55E", "background": "#FFFFFF", "surface": "#F9FAFB", "text": "#1A1A1A", "textSecondary": "#6B7280", "border": "#E5E7EB" },
    "fonts": { "heading": "Inter", "body": "Inter" }
  }
  ```
- `blocks`: a `schedule` block with the extracted events, a `contacts`
  block with any extracted contacts, an `info` block only if there's a
  real venue or general-info paragraph worth its own tab, and always an
  empty `updates` block (id `"updates"`, title `"Updates"` — no `events`
  field, its content is live, not config).

Write the assembled JSON to
`packages/hub-app/public/client-configs/<clientId>.json`.

**5. Validate.** Run:
```
node scripts/validate-client-config.js --file packages/hub-app/public/client-configs/<clientId>.json
```
If it reports errors, fix the JSON and re-run until it passes. Never skip
this step.

**6. Summarize for review.** Tell the user, plainly:
- Confidence: how much of the extraction was clean transcription vs.
  judgment calls.
- Every ambiguity, inference, or uncertain field (venue spelling, an
  inferred meal time, a timezone note) — the same spirit as the API
  pipeline's `warnings` array. Don't bury this in a wall of JSON; call it
  out explicitly so the human review this is supposed to get is real.

**7. Push only on explicit go-ahead.** Never run this automatically as
part of extraction — wait for the user to confirm. Then:
```
node scripts/configs-push.js --only <clientId>
```
This writes the public `client-configs/<clientId>` doc, a
`private/<clientId>` doc (paidState, admin-only), and — if you set an
`accessCode` field on the raw JSON before pushing (optional, stripped
from the public payload automatically) — an `access-codes/<CODE>` doc.
Report the live link: `https://app.build-embr.co.uk/c/<clientId>`.

## What this skill does not do

- Doesn't call the Anthropic API directly or need `ANTHROPIC_API_KEY` —
  the extraction happens in this session, using whatever model is
  already running it.
- Doesn't touch `lib/import.ts`, `import-prompt.ts`, `safeFetchUrl.ts`,
  or `prospect-demo.ts` — those stay exactly as committed, dormant,
  reserved for a future headless/public endpoint (Phase D).
- Doesn't push to Firestore without explicit confirmation.
- Doesn't fetch a URL's content itself if that's not otherwise available
  in this session — ask the user to paste the content, or fetch it the
  normal way this session already fetches URLs, rather than reinventing
  fetch logic here.
