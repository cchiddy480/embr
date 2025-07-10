# Embr Production Launch Checklist

## 0. Embr Framework Philosophy & UI/UX Consistency
- [ ] Enforce clean, minimal, modern UI/UX (Vercel/Next.js-inspired) across all screens
- [ ] Ensure modular components (schedule, map, guest info, etc.) are reusable and consistent
- [ ] Support client-specific overrides via config:
  - [ ] Brand colors, logos, icons, and typography (custom or Inter fallback)
  - [ ] Feature toggles (only include needed modules per client)
  - [ ] All copy/content editable per instance (tab names, descriptions, etc.)
  - [ ] Install app name and icon reflect client branding (not Embr)
  - [ ] Optional “Built with Embr” badging in footer
  - [ ] Custom icon set support per client
- [ ] Maintain lightweight performance and consistent structure for all client apps

---

## 1. Backend & Dynamic Config Hosting
- [ ] Migrate static configs to Firebase Firestore (or Hosting)
  - [ ] Design Firestore schema for client configs
  - [ ] Write migration script to upload existing JSON configs
  - [ ] Implement config fetcher in hub-app (with Firestore SDK)
  - [ ] Add fallback: if Firestore fetch fails, load from public/client-configs/
  - [ ] Secure Firestore rules for public/private configs
  - [ ] Document config update workflow for admins

## 2. Offline Caching & Sync
- [ ] Persist config and dynamic assets in Capacitor Storage or SQLite
  - [ ] Integrate Capacitor Storage/SQLite in standalone app
  - [ ] On app launch, check for updated config in Firestore
  - [ ] When online, auto-refresh cache and update UI
  - [ ] Fallback to cached config/assets when offline
  - [ ] Test offline/online transitions on real devices

## 3. Push Notifications
- [ ] Integrate Firebase Cloud Messaging (FCM)
  - [ ] On config load, subscribe to topic embr_<client_id>
  - [ ] Trigger device registration and permissions prompt
  - [ ] Build admin UI or script to send test notifications per client
  - [ ] Handle notification display in app (foreground/background)
  - [ ] Document notification setup for new clients

## 4. Standalone-App Generator
- [ ] Automate standalone app builds for each client
  - [ ] Script to inject config, icons, display name, bundle ID
  - [ ] Automate npx cap sync and platform builds
  - [ ] Test end-to-end: generate and side-load iOS/Android binaries
  - [ ] Document process for generating new client apps

## 5. CI/CD & Release Automation
- [ ] Set up GitHub Actions workflows
  - [ ] Hub-App: build & deploy to TestFlight/Play Internal on main branch
  - [ ] Standalone: on tag push, run Fastlane to produce/upload release builds
  - [ ] Hook environment variables (Firebase keys, App Store creds) into CI secrets
  - [ ] Add status badges and build logs to repo

## 6. Analytics & Monitoring
- [ ] Integrate Firebase Analytics
  - [ ] Track first-launch, code entry, QR scan, config loads, expiry events, screen views
  - [ ] Set up Crashlytics for runtime error reporting
  - [ ] Add uptime monitoring for backend/config endpoints
  - [ ] Document analytics events and dashboard access

## 7. Admin & Client-Facing Tools
- [ ] Build lightweight Admin Dashboard (React + Firebase)
  - [ ] Manage client configs (create/edit/expiry)
  - [ ] Send push notifications
  - [ ] View basic analytics
  - [ ] Secure dashboard with authentication
  - [ ] Document admin tool usage

## 8. Polishing & QA
- [ ] User testing on real devices (offline/online, expiry, QR, push)
- [ ] Accessibility audit (contrast, font sizing, screen-reader labels)
- [ ] Performance tuning (lazy-load images, code splitting, prefetch data)
- [ ] Custom 404 and error pages
- [ ] App icons, favicons, meta tags for SEO/social
- [ ] Finalize dark/light mode (if desired)
- [ ] Manual QA on all supported browsers/devices

## 9. Docs & Handoff
- [ ] Finalize /docs guides with screenshots and code snippets
- [ ] Run a 1-hour “Dev Onboarding” session using documentation
- [ ] Comprehensive README with setup, usage, and contribution guidelines
- [ ] API documentation (if exposing endpoints)
- [ ] User guides for event organizers and end-users
- [ ] Changelog and release notes

## 10. Security, Legal & Compliance
- [ ] Input validation and sanitization for all user input
- [ ] Rate limiting or CAPTCHA for access code entry
- [ ] HTTPS enforced in production
- [ ] Content Security Policy (CSP) headers
- [ ] Audit dependencies for vulnerabilities
- [ ] Privacy policy and terms of service
- [ ] Cookie consent banner (if tracking/analytics used)
- [ ] GDPR/CCPA compliance (if serving EU/California users)

---

**How to use this checklist:**
- Mark `[x]` as you complete each task.
- Add notes, links, or sub-tasks as needed.
- Review and update after each development session.

**Let’s launch Embr with confidence! 🚀** 