## Embr Dev Log

Purpose: A concise, chronological record of every change, patch, and decision. Reviewed at the start of each session alongside `EMBR_KNOWLEDGE_LEDGER.md`.

How this log is organized
- Daily entries live in `docs/dev-log/` as `YYYY-MM-DD.md`.
- This file serves as the index and high-level summary.

### Index
- 2025-01-27 → docs/dev-log/2025-01-27.md
- 2025-01-28 → docs/dev-log/2025-01-28.md
- 2025-08-08 → docs/dev-log/2025-08-08.md
- 2025-09-13 → docs/dev-log/2025-09-13.md
- 2025-09-15 → docs/dev-log/2025-09-15.md
- 2025-09-16 → docs/dev-log/2025-09-16.md
- 2025-11-20 → docs/dev-log/2025-11-20.md
- 2025-12-02 → docs/dev-log/2025-12-02.md

### Latest Summary (2025-12-02)
- Merged template-variations branch: 27 template variations across 8 categories
- Created 12 missing template variations with unique branding and professional content
- Replaced all emoji icons with professional SVG icons in showcase
- Zero compilation errors, no technical debt (no TODOs/FIXMEs)
- All templates use EmbrKitProvider with theme customization
- Comprehensive quality review: code standards, visual polish, responsive design
- Fast-forward merge to main, pushed to remote, cleaned up feature branch

### Previous Summary (2025-11-20)
- Fixed embrkit-components-demo button styling issues (white buttons until hover)
- Fixed font styling for monetary amounts in data display components
- Made all demo pages completely independent with inline CSS variables
- Created comprehensive isolation strategy between demo pages and client configs
- Added automated isolation checker script (npm run check:isolation)
- Created DEVELOPMENT_ISOLATION_GUIDE.md with complete workflow and emergency recovery procedures

### Previous Summary (2025-01-27)
- Restored Hub app to pre-LiftKit visual baseline and documented it in the ledger.
- Fixed dev asset 404s by disabling static export in dev.
- Prevented Hub loading hang with safety timeout and improved escape hatch.
- Aligned Access Code modal styling (contrast, buttons) to original.
- Eliminated dark background bands in client app by forcing html/body background to client theme while active and covering 100dvh.

