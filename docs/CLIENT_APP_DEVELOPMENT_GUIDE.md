# Client App Development Guide
*Complete guide for creating independent, branded micro-apps in the Embr framework*

## 🎯 Overview

This guide explains how to develop client-specific micro-apps that are **completely independent** from each other while sharing the EmbrKit design system foundation. Each client app should be a unique, purpose-built experience tailored to their specific business needs.

## 🚨 Critical Principle: Client App Independence

**Every client micro-app MUST be a completely independent React component with:**
- Unique UI layouts and content structures
- Custom styling and interactions  
- Business-specific features and workflows
- Complete visual independence from other clients

## 📋 Development Process (Cloud-first, Lean Hub)

### Step 1: Analyze Client Brief

Before writing any code, thoroughly understand:

#### **Business Context**
- What type of business is this?
- Who are the target users?
- What are the primary use cases?
- What makes this client unique?

#### **Content Requirements**
- What information needs to be displayed?
- What features are required?
- What user workflows need to be supported?
- What content is dynamic vs. static?

#### **Brand Requirements**
- What are the brand colors?
- What fonts should be used?
- What is the visual style/tone?
- Are there specific design elements or patterns?

### Step 2: Plan Information Architecture

#### **User Journey Mapping**
- How do users discover and access the app?
- What is the primary user flow?
- What secondary features are important?
- How do users accomplish their main goals?

#### **Content Structure**
- What are the main sections/pages?
- How should information be organized?
- What navigation structure makes sense?
- What content is most important to highlight?

#### **Feature Prioritization**
- What features are essential vs. nice-to-have?
- What can be implemented now vs. later?
- What requires custom development vs. can use EmbrKit?

### Step 3: Create Client-Specific Component (Lazy Plugin)

#### **File Structure**
```
packages/hub-app/src/components/clients/
└── [industry]/                # Industry directory (healthcare, events, etc.)
    └── [client-name-2025]/    # Client-specific directory
        ├── YourClientApp.tsx  # Main client component
        ├── components/        # Client-specific sub-components (optional)
        │   ├── YourCustomSection.tsx
        │   └── YourCustomFeature.tsx
        ├── styles/           # Client-specific styles (optional)
        │   └── YourClientStyles.css
        ├── types/            # Client-specific types (optional)
        │   └── YourClientTypes.ts
        └── index.ts          # Export your component
```

#### **Component Template (export default for dynamic import)**
```typescript
import React, { useEffect, useState } from 'react';
import { ClientConfig } from '../../types/client';
import { 
  EmbrKitProvider, 
  EmbrKitContainer, 
  EmbrKitCard,
  EmbrKitButton,
  EmbrKitGrid,
  EmbrKitBadge,
  EmbrKitStatCard
} from '@embr/ui';

interface YourClientAppProps {
  config: ClientConfig;
}

export default function YourClientApp({ config }: YourClientAppProps) {
  const [activeTab, setActiveTab] = useState(config.navigation[0]?.id || 'home');

  // Set page background to client theme
  useEffect(() => {
    const prevBodyBg = document.body.style.background;
    const prevHtmlBg = document.documentElement.style.background;
    const prevBodyColor = document.body.style.color;
    document.body.style.background = config.theme.colors.background;
    document.documentElement.style.background = config.theme.colors.background;
    document.body.style.color = config.theme.colors.text;
    return () => {
      document.body.style.background = prevBodyBg;
      document.documentElement.style.background = prevHtmlBg;
      document.body.style.color = prevBodyColor;
    };
  }, [config.theme.colors.background, config.theme.colors.text]);

  // Client-specific theme
  const embrKitTheme = {
    primaryColor: config.theme.colors.primary,
    secondaryColor: config.theme.colors.secondary,
    backgroundColor: config.theme.colors.background,
    surfaceColor: config.theme.colors.surface,
    textColor: config.theme.colors.text,
    textSecondaryColor: config.theme.colors.textSecondary,
    headingFontFamily: config.theme.fonts?.heading ? `'${config.theme.fonts.heading}', serif` : "'Inter', sans-serif",
    fontFamily: config.theme.fonts?.body ? `'${config.theme.fonts.body}', sans-serif` : "'Inter', sans-serif"
  };

  // Your custom icon function
  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      // Define your client-specific icons
    };
    return icons[iconName] || icons.home;
  };

  // Your custom content renderers
  const renderHomeContent = () => (
    // Your unique home page layout
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent();
      // Add your other content renderers
      default:
        return renderHomeContent();
    }
  };

  return (
    <EmbrKitProvider initialTheme={embrKitTheme}>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --embr-primary-color: ${config.theme.colors.primary};
            --embr-secondary-color: ${config.theme.colors.secondary};
            --embr-text-color: ${config.theme.colors.text};
            --embr-button-outline-color: ${config.theme.colors.primary};
            --embr-primary-hover: ${config.theme.colors.primary};
            --embr-secondary-hover: ${config.theme.colors.secondary};
            --embr-text-hover: ${config.theme.colors.text};
            --embr-background: ${config.theme.colors.background};
            --embr-surface: ${config.theme.colors.surface};
            --embr-surface-elevated: ${config.theme.colors.surfaceElevated || config.theme.colors.surface};
            --embr-text-on-dark: ${config.theme.colors.text};
            --embr-text-secondary-dark-bg: ${config.theme.colors.textSecondary};
            --embr-border: hsl(0 0% 0% / 0.12);
          }
          
          .embr-btn:focus-visible,
          .embr-input:focus-visible,
          .embr-form-input:focus-visible,
          .embr-select-trigger:focus-visible,
          .embr-date-input:focus-visible {
            outline-color: ${config.theme.colors.primary} !important;
          }
          
          .embr-btn-primary:focus,
          .embr-btn-primary:focus-visible,
          .embr-btn-secondary:focus,
          .embr-btn-secondary:focus-visible {
            outline: none !important;
            box-shadow: none !important;
          }
        `
      }} />
      <div className="min-h-screen min-h-[100dvh]" style={{ backgroundColor: config.theme.colors.background }}>
        {/* Your custom navigation */}
        <div 
          className="sticky top-0 z-50 backdrop-blur-md border-b"
          style={{ 
            backgroundColor: `${config.theme.colors.surface}95`,
            borderColor: `${config.theme.colors.text}10`
          }}
        >
          {/* Your navigation implementation */}
        </div>

        {/* Your content */}
        <div className="pt-12 md:pt-16 pb-8">
          {renderContent()}
        </div>
      </div>
    </EmbrKitProvider>
  );
}
```

### Step 4: Register Client App (Lazy Registry)

#### **Add to Lazy Loader Map (auto-generated)**
```typescript
// Generated by `npm run clients:loader` based on folder structure:
// packages/hub-app/src/components/clients/[industry]/[client-id]/index.ts
// Your index.ts should re-export default from YourClientApp.tsx
// Add your folder and run: npm run clients:loader
```

The Hub will dynamically import your module only when `clientId` matches, keeping the base bundle small.

### Step 5: Create Client Configuration (Firestore-first)

#### **Firestore Document: `client-configs/{clientId}`**
```json
{
  "clientId": "your-client-2025",
  "accessCode": "YOURCODE2025",
  "name": "Your Client Name",
  "description": "Your client's description and value proposition",
  "version": "1.0",
  "theme": {
    "colors": {
      "primary": "#your-primary-color",
      "secondary": "#your-secondary-color",
      "background": "#your-background-color",
      "surface": "#your-surface-color",
      "text": "#your-text-color",
      "textSecondary": "#your-text-secondary-color"
    },
    "fonts": {
      "heading": "Your Heading Font",
      "body": "Your Body Font"
    }
  },
  "navigation": [
    { "id": "home", "title": "Home", "icon": "home", "enabled": true },
    { "id": "feature1", "title": "Feature 1", "icon": "icon1", "enabled": true },
    { "id": "feature2", "title": "Feature 2", "icon": "icon2", "enabled": true }
  ],
  "pluginId": "your-client-2025",
  "configVersion": 1,
  "expiry": "2027-12-31T23:59:59Z",
  "features": {
    "offline": true,
    "pushNotifications": true,
    "qrCode": true,
    "analytics": false,
    "geolocation": true,
    "socialSharing": true,
    "bookmarking": true
  },
  "content": {}
}
```

Optionally keep a static JSON fallback at `packages/hub-app/public/client-configs/your-client-2025.json` during migration.

### Step 6: Access Codes (Firestore or Fallback)

#### **Add Access Code to Hook**
Prefer storing access codes in Firestore (e.g., `access-codes/{CODE} → { clientId }`). The hook will still fall back to static mapping during migration.

## 🎨 Design Principles

### **Complete Visual Independence**

Each client app should have:

#### **Unique Layouts**
- Custom hero sections tailored to the business
- Business-specific content organization
- Purpose-built navigation structures
- Industry-appropriate information hierarchy

#### **Custom Content**
- Business-specific information and features
- Relevant user workflows and interactions
- Industry-appropriate terminology and messaging
- Custom data structures and content types

#### **Brand-Specific Styling**
- Client's exact brand colors and fonts
- Industry-appropriate visual style
- Custom decorative elements and imagery
- Brand-consistent spacing and typography

### **Hybrid Approach (EmbrKit + Custom)**

#### **Use EmbrKit For:**
- Foundation components (Container, Card, Button, Grid)
- Common UI patterns (navigation, forms, modals)
- Accessibility features and interactions
- Responsive design and mobile optimization

#### **Add Custom Blocks For:**
- Unique visual elements and branding
- Business-specific content layouts
- Custom interactions and animations
- Industry-specific features and workflows

### **Business-Specific Features**

#### **Content Structure**
- Match the client's business model
- Support their specific use cases
- Reflect their information architecture
- Optimize for their user workflows

#### **User Experience**
- Tailor interactions to the business context
- Support industry-specific user journeys
- Provide relevant features and functionality
- Optimize for the client's target audience

## 📝 Development Checklist (Updated)

### **Before Starting**
- [ ] Read and understand the client brief thoroughly
- [ ] Identify the business model and target users
- [ ] Plan the information architecture and user flows
- [ ] Define the unique features and content requirements
- [ ] Understand the brand requirements and visual style

### **During Development**
- [ ] Create completely independent component (no shared layouts)
- [ ] Use EmbrKit components for foundation and common UI
- [ ] Add custom blocks for unique, branded visuals
- [ ] Implement business-specific content and features
- [ ] Apply client's brand colors, fonts, and styling
- [ ] Ensure mobile-first responsive design
- [ ] Test accessibility and performance
- [ ] Follow TypeScript best practices

### **Before Completion**
- [ ] Add lazy loader entry in `clients/loader.ts`
- [ ] Publish client config to Firestore (`client-configs/{clientId}`)
- [ ] Upload assets to Firebase Hosting and reference by URL
- [ ] (Optional) Static JSON fallback during migration
- [ ] Test with client's access code
- [ ] Verify complete visual independence from other clients
- [ ] Run theme audit and isolation checks
- [ ] Test on multiple devices and browsers
- [ ] Update documentation and development log

## 🚫 Anti-Patterns to Avoid

### **❌ DON'T:**
- Create generic templates that all clients share
- Use hardcoded content or styling
- Make clients look like carbon copies with different colors
- Share layouts, content structures, or user flows
- Force clients into the same information architecture
- Use the same navigation structure for all clients
- Implement the same features for all business types
- Copy content or styling from other client apps

### **✅ DO:**
- Create unique, purpose-built experiences for each client
- Use client's brand colors, fonts, and styling
- Implement business-specific features and content
- Design layouts that match the client's use case
- Ensure complete visual and functional independence
- Tailor navigation to the client's information architecture
- Implement features relevant to the client's business
- Create custom content and styling for each client

## 📚 Examples

### **PeakForm Physio (Healthcare)**
- **Layout**: Medical-focused hero, appointment-centric content
- **Content**: Appointments, exercises, staff, wellness tips
- **Styling**: Professional medical colors, clean typography
- **Features**: Appointment management, exercise library, staff profiles
- **Navigation**: Home, Appointments, Exercises, Clinic, Wellness

### **WildRoots Festival (Events)**
- **Layout**: Festival-focused hero, event-centric content
- **Content**: Events, vendors, locations, festival info
- **Styling**: Nature-inspired colors, festival typography
- **Features**: Event schedule, vendor directory, festival map
- **Navigation**: Home, Schedule, Map, Vendors, About

## 🔧 Testing & Quality Assurance

### **Visual Independence Testing**
- [ ] Compare with other client apps to ensure uniqueness
- [ ] Verify no shared layouts or content structures
- [ ] Confirm brand colors and fonts are correctly applied
- [ ] Test that features are business-appropriate

### **Functionality Testing**
- [ ] Test all navigation and user flows
- [ ] Verify content displays correctly
- [ ] Test responsive design on multiple devices
- [ ] Check accessibility compliance

### **Integration Testing**
- [ ] Test with client's access code
- [ ] Verify theme application works correctly
- [ ] Test that client app loads independently
- [ ] Confirm no interference with other client apps

## 📖 Additional Resources

- **EMBR_KNOWLEDGE_LEDGER.md**: Complete project reference
- **EmbrKit Components**: Available design system components
- **Existing Client Apps**: Reference implementations
- **Brand Guidelines**: Client-specific brand requirements
- **Development Standards**: Code quality and best practices

---

**Remember: Each client micro-app should be a completely unique, purpose-built experience that reflects their brand and serves their specific business needs. No two client apps should look or function the same way.**
