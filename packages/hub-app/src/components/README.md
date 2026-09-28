# Archived: generic entry shell

`AccessCodeEntry.tsx` and `QRCodeScanner.tsx` (plus the `Scan QR Code` /
`Enter Access Code` screen in `app/page.tsx`) were removed here. They were
built for an earlier version of Embr where one shared app unlocked whatever
client a guest typed a code for. Under Embr for Trips, guests never see this
screen — each guide is a direct per-trip link (`app.build-embr.co.uk/c/<id>`
or `?client=<id>`), so there's nothing to scan or type a code into.

Full source is in git history if a future direction needs it back (e.g. a
printed-QR distribution channel at a physical venue). The related
`access-codes/{code}` Firestore collection and lookup logic in
`useClientConfig.tsx` stay — that's a server-side alternative to a direct
link, not this UI, and remains part of the Phase B plan.

This isn't the same as the planner-facing editing surface described in the
production plan's Phase D (`/edit/[token]`) — that's a real, still-planned
feature for organisers to update their live schedule, unrelated to this
guest-facing shell.
