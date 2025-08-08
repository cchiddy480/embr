## Embr Dev Log

Purpose: A concise, chronological record of every change, patch, and decision. Reviewed at the start of each session alongside `EMBR_KNOWLEDGE_LEDGER.md`.

How this log is organized
- Daily entries live in `docs/dev-log/` as `YYYY-MM-DD.md`.
- This file serves as the index and high-level summary.

### Index
- 2025-01-27 → docs/dev-log/2025-01-27.md

### Latest Summary (2025-01-27)
- Restored Hub app to pre-LiftKit visual baseline and documented it in the ledger.
- Fixed dev asset 404s by disabling static export in dev.
- Prevented Hub loading hang with safety timeout and improved escape hatch.
- Aligned Access Code modal styling (contrast, buttons) to original.
- Eliminated dark background bands in client app by forcing html/body background to client theme while active and covering 100dvh.

