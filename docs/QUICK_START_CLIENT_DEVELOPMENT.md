# 🚀 Quick Start: Client Development

*Get a new client micro-app up and running in 15 minutes*

## 📋 Prerequisites

- ✅ Embr project set up and running
- ✅ Basic understanding of React and TypeScript
- ✅ Client brief with branding and requirements

## ⚡ 15-Minute Setup

### Step 1: Create Client Config (5 minutes)

1. **Copy a template config:**
   ```bash
   cp packages/hub-app/public/client-configs/wildroots-festival-2025.json packages/hub-app/public/client-configs/your-client-2025.json
   ```

2. **Edit the config with your client details:**
   ```json
   {
     "clientId": "your-client-2025",
     "accessCode": "YOURCODE2025",
     "name": "Your Client Name",
     "description": "Your client description",
     "theme": {
       "colors": {
         "primary": "#YOUR_PRIMARY_COLOR",
         "secondary": "#YOUR_SECONDARY_COLOR"
       }
     }
   }
   ```

### Step 2: Create Client Component (5 minutes)

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

3. **Create the component:**
   ```typescript
   // packages/hub-app/src/components/clients/[industry]/[your-client-2025]/YourClientApp.tsx
   import React from 'react';
   import { ClientConfig } from '../../../../types/client';

   interface YourClientAppProps {
     config: ClientConfig;
   }

   export function YourClientApp({ config }: YourClientAppProps) {
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

4. **Create index file:**
   ```typescript
   // packages/hub-app/src/components/clients/[industry]/[your-client-2025]/index.ts
   export { YourClientApp } from './YourClientApp';
   ```

### Step 3: Register Client (3 minutes)

1. **Update industry registry:**
   ```typescript
   // packages/hub-app/src/components/clients/[industry]/index.ts
   import { YourClientApp } from './your-client-2025';

   export const [INDUSTRY]_CLIENTS = {
     'your-client-2025': YourClientApp,
   } as const;
   ```

2. **Update main registry:**
   ```typescript
   // packages/hub-app/src/components/clients/index.ts
   import { [INDUSTRY]_CLIENTS } from './[industry]';

   export const CLIENT_APP_REGISTRY = {
     ...HEALTHCARE_CLIENTS,
     ...EVENT_CLIENTS,
     ...[INDUSTRY]_CLIENTS,  // Add your industry
   } as const;
   ```

### Step 4: Test & Deploy (2 minutes)

1. **Test locally:**
   - Start dev server: `npm run dev`
   - Navigate to your app with access code

2. **Deploy to Firebase:**
   ```bash
   npm run configs:push
   ```

## 🎯 That's It!

Your client micro-app is now live and accessible via their access code!

## 🛠️ Next Steps

- **Customize UI**: Add your client's specific features and content
- **Add Components**: Create client-specific components in the same directory
- **Test Thoroughly**: Ensure it works on mobile and desktop
- **Deploy**: Push to Firebase when ready

## 📚 Need More Help?

- **Full Guide**: See `CLIENT_APP_DEVELOPMENT_GUIDE.md`
- **Examples**: Check existing clients in `src/components/clients/`
- **Templates**: Use existing configs as starting points

## 🚨 Common Mistakes to Avoid

- ❌ Don't share layouts between clients
- ❌ Don't hardcode colors (use config.theme.colors)
- ❌ Don't forget to register in both industry and main registries
- ❌ Don't skip testing the access code

## ✅ Checklist

- [ ] Config file created with correct clientId and accessCode
- [ ] Component created in correct industry directory
- [ ] Component registered in industry registry
- [ ] Industry registry imported in main registry
- [ ] Access code tested locally
- [ ] Config deployed to Firebase
- [ ] Final testing with access code
