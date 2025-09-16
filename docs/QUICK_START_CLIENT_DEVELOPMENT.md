# 🚀 Quick Start: Client Development

*Get a new client micro-app up and running in 15 minutes*

## 📋 Prerequisites

- ✅ Embr project set up and running
- ✅ Basic understanding of React and TypeScript
- ✅ Client brief with branding and requirements

## ⚡ 15-Minute Setup

### Step 1: Create Client Config in Firestore (5 minutes)

1. **Create Firestore document `client-configs/your-client-2025`:**
   - Include: `clientId`, `name`, `description`, `theme.colors`, `navigation`, `pluginId`, `configVersion`, optional `accessCode`, `expiry`.
   - Assets should be URLs (Firebase Hosting).
   - Optional: keep a static JSON fallback in `public/client-configs/` during migration.

### Step 2: Create Client Component (Lazy Plugin) (5 minutes)

1. **Choose your industry directory:**
   - `healthcare/` - Medical, wellness, fitness
   - `events/` - Festivals, conferences, weddings
   - `hospitality/` - Restaurants, hotels, venues
   - `retail/` - Stores, e-commerce, services
   - `services/` - Professional services, consulting
   - `other/` - Everything else

2. **Create client directory:**
```bash
mkdir packages/hub-app/src/components/clients/[industry]/[your-client-2025]
```

3. **Create the component (export default):**
```typescript
// packages/hub-app/src/components/clients/[industry]/[your-client-2025]/YourClientApp.tsx
import React from 'react';
import { ClientConfig } from '../../../../types/client';

interface YourClientAppProps {
  config: ClientConfig;
}

export default function YourClientApp({ config }: YourClientAppProps) {
  return (
    <div style={{ 
      background: config.theme.colors.background,
      color: config.theme.colors.text,
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <h1 style={{ color: config.theme.colors.primary }}>
        Welcome to {config.name}
      </h1>
      <p>{config.description}</p>
      {/* Add your custom UI here */}
    </div>
  );
}
```

4. **Create index file (re-export default):**
```typescript
// packages/hub-app/src/components/clients/[industry]/[your-client-2025]/index.ts
export { default as YourClientApp } from './YourClientApp';
```

### Step 3: Register Client in Lazy Loader (3 minutes)

1. **Generate loader map:**
```bash
npm run clients:loader
```

### Step 4: Test & Publish (2 minutes)

1. **Test locally:**
- Start dev server: `npm run dev`
- Navigate to your app with access code

2. **Publish config/assets:**
- Config migration (legacy JSON → Firestore): `npm run migrate:configs -- --key <service_account.json>`
- Update expiry (dev/testing): `npm run clients:expiry -- --key <service_account.json> --clients your-client-2025 --expiry 2027-12-31T23:59:59Z`

## 🎯 That's It!

Your client micro-app is now live and accessible via their access code!

## 🛠️ Next Steps

- **Customize UI**: Add your client's specific features and content
- **Add Components**: Create client-specific components in the same directory
- **Test Thoroughly**: Ensure it works on mobile and desktop
- **Deploy**: Publish Firestore config and upload assets to Hosting

## 📚 Need More Help?

- **Full Guide**: See `CLIENT_APP_DEVELOPMENT_GUIDE.md`
- **Examples**: Check existing clients in `src/components/clients/`
- **Templates**: Use existing configs as starting points

## 🚨 Common Mistakes to Avoid

- ❌ Don't share layouts between clients
- ❌ Don't hardcode colors (use config.theme.colors)
- ❌ Don't forget to run the loader generator
- ❌ Don't skip testing the access code

## ✅ Checklist

- [ ] Firestore config created with correct `clientId` and fields
- [ ] Component created in correct industry directory
- [ ] Index re-exports default component
- [ ] Loader map generated (`npm run clients:loader`)
- [ ] Access code tested locally
- [ ] Config/assets published
- [ ] Final testing with access code
