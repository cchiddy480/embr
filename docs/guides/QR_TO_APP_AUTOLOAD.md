## QR → App Autoload Plan (Capacitor, iOS, Android, Web)

Goal: A user scans a QR code and is taken directly into the correct Embr client app with no extra taps. If the Embr Hub app is not installed, the flow should install it and still open the intended client app after first launch (deferred deep link).

### Desired Flows
- Installed app: `Scan QR` → Embr Hub opens → selected client autoloads.
- Not installed: `Scan QR` → Store page → Install → First launch opens Embr Hub → selected client autoloads.
- Web/desktop fallback: `Scan QR` → Embr hub web opens → client autoloads.

### Link Strategy
- Primary link: Firebase Dynamic Links domain (e.g., `https://links.embr.app/c/<clientId>`)
  - Preserves payload through App Store/Play Store installs.
  - Redirects to PWA when on desktop/web.

- App URL formats supported by Hub (already implemented):
  - Query: `https://hub.embr.app/?client=<clientId>` or `?clientId=<clientId>`
  - Path: `https://hub.embr.app/c/<clientId>`

### Mobile Deep Linking
- iOS (Universal Links)
  - Configure Associated Domains on the iOS app: `applinks:links.embr.app` (and/or `applinks:hub.embr.app`).
  - Add apple-app-site-association file on domain.
  - On open, Capacitor receives `appUrlOpen` with URL containing `/c/<clientId>` or `?client=<clientId>`.

- Android (Intent Filters)
  - Add intent filters for domains: `links.embr.app` (and/or `hub.embr.app`).
  - Ensure `autoVerify=true` where appropriate.
  - On open, Capacitor receives the initial URL.

- Custom Scheme (fallback)
  - Define `embr://c/<clientId>` as a backup to universal/app links.

### Deferred Deep Linking
- Use Firebase Dynamic Links to carry `clientId` through store install.
- After install and first launch, read the initial dynamic link and route to `loadConfig(clientId)`.

### App Handling (Capacitor)
- Listen for deep link events and cold-start URLs in the app shell:
  - `App.addListener('appUrlOpen', ({ url }) => parseAndLoad(url))`
  - On start: check the initial URL/dynamic link and call `parseAndLoad`.
  - `parseAndLoad` extracts `clientId` from `/c/<id>` or `?client=<id>` and invokes `loadConfig(clientId)`.

### Web/PWA Fallback
- If opened in a browser, Hub autoloads via URL params or `/c/<clientId>` (implemented in `HomePage`).

### QR Code Generation
- Encode dynamic link URLs with `clientId` parameter.
- Example target: `https://links.embr.app/c/wildroots-festival-2025`.

### Implementation Checklist (Later)
1) Set up Firebase Dynamic Links domain and console config.
2) iOS: add Associated Domains; publish `apple-app-site-association`.
3) Android: add verified intent filters.
4) Implement Capacitor URL handling (appUrlOpen + initial URL) to call `loadConfig`.
5) Add clean route `app/c/[clientId]/page.tsx` (optional; currently supported in HomePage).
6) Update QR generation to use dynamic link URLs.
7) Add analytics/telemetry to confirm successful autoload funnel.

### Notes
- The Hub web `HomePage` already supports autoload from `?client=`, `?clientId=`, and `/c/<clientId>`.
- Native URL handling and dynamic links are required for the install-and-open-after scenario.


