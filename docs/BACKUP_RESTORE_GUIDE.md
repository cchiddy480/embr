# Embr Platform - Backup & Restore Guide

## 🔒 Backup Information

**Branch:** `backup/pre-liftkit-integration`  
**Date:** January 2025  
**Version:** Embr v1.0 (Pre-LiftKit Integration)  
**Commit:** Pre-LiftKit integration backup - Embr v1.0 with custom components

## 📋 Current State Overview

### Architecture Summary
The Embr platform consists of a modular, config-driven architecture designed for rapid deployment of micro-apps:

- **Hub App**: Next.js + Capacitor app that dynamically loads client configurations
- **Standalone Generator**: Automated build system for branded iOS/Android apps
- **Config System**: JSON-based client configuration with Firebase deployment
- **Custom UI Components**: Hand-built Button, Input, Card components with Inter font theming

### Project Structure
```
/embr-platform
├── packages/
│   ├── hub-app/          # Core Embr Hub App (Next.js + Capacitor)
│   │   ├── src/
│   │   │   ├── app/           # Next.js app directory
│   │   │   ├── components/    # UI components (AccessCodeEntry, QRCodeScanner, etc.)
│   │   │   ├── hooks/         # React hooks (useClientConfig)
│   │   │   ├── lib/           # Utility libraries and CSS
│   │   │   └── types/         # TypeScript definitions
│   │   └── public/
│   │       └── client-configs/ # Sample client configurations
│   ├── ui/               # Shared UI component library
│   │   └── src/
│   │       ├── components/    # Button, Input, Card, theme.tsx
│   │       └── lib/           # Utility CSS and functions
│   └── standalone-app/   # Standalone app generator
├── scripts/             # Build and deployment utilities
├── docs/               # Documentation
└── client-configs/     # Client configuration files (if any)
```

### Key Components Status

#### ✅ Working Components
- **Button** (`packages/ui/src/components/Button/`)
  - Uses Inter font family via useTheme hook
  - CSS modules for styling
  - TypeScript support

- **Input** (`packages/ui/src/components/Input/`)
  - Consistent theming with Button
  - CSS modules for styling

- **Card** (`packages/ui/src/components/Card/`)
  - Layout component with theming support
  - CSS modules for styling

- **Theme System** (`packages/ui/src/components/theme.tsx`)
  - useTheme hook provides `fontFamily: 'Inter, system-ui, sans-serif'`
  - Simple but functional theming foundation

#### 🔧 Hub App Components
- **AccessCodeEntry** - Manual client config loading
- **QRCodeScanner** - QR code-based config loading  
- **LoadingScreen** - App loading states
- **ClientApp** - Main app wrapper

### Configuration System

#### Sample Configurations
1. **Cornwall Food Festival** (`demo-festival.json`)
   - Full-featured event app config
   - Schedule, guests, map functionality
   - Teal color scheme (#0F766E primary)

2. **Smith-Jones Wedding** (`smith-jones-wedding-2024.json`)
   - Wedding-specific configuration
   - Guest info and scheduling features

#### Config Schema Features
- **Theme System**: Colors, fonts, logos
- **Navigation**: Dynamic menu structure
- **Content**: Schedule, guests, maps, custom sections
- **Features**: Offline support, push notifications, QR codes
- **Expiry**: Automatic cleanup for temporary events

### Development Workflow

#### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → Hub app available at http://localhost:3000

# Build for production
npm run build
```

#### Client Configuration Management
```bash
# Validate config
npm run build-client -- validate client-configs/demo-festival.json

# Deploy to Firebase (dry run)
npm run build-client -- deploy cornwall-food-festival-2024 --dry-run

# List all configs
npm run build-client -- list
```

#### Standalone App Generation
```bash
# Generate web app
npm run generate -- standalone cornwall-food-festival-2024 --web

# Generate iOS app
npm run generate -- standalone cornwall-food-festival-2024 --ios

# Generate Android app  
npm run generate -- standalone cornwall-food-festival-2024 --android
```

### Technology Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Mobile**: Capacitor (iOS/Android)
- **Styling**: CSS Modules, Tailwind CSS
- **Backend**: Firebase (Firestore for configs)
- **Build**: Node.js, npm workspaces
- **Fonts**: Inter font family (via Google Fonts)

## 🔄 How to Restore This Version

### Option 1: Switch to Backup Branch
```bash
# Switch to the backup branch
git checkout backup/pre-liftkit-integration

# Install dependencies
npm install

# Start development
npm run dev
```

### Option 2: Reset Current Branch to Backup
```bash
# Reset main branch to backup state (DESTRUCTIVE)
git reset --hard backup/pre-liftkit-integration

# Force push if needed (be careful!)
git push origin main --force
```

### Option 3: Create New Branch from Backup
```bash
# Create new branch from backup
git checkout -b restore-pre-liftkit backup/pre-liftkit-integration

# Continue development on restored branch
npm install
npm run dev
```

## 🧪 Testing the Restored Version

### 1. Verify Hub App
```bash
cd packages/hub-app
npm run dev
```
- Visit http://localhost:3000
- Test QR code scanning
- Test manual access code entry
- Verify theme loading with sample configs

### 2. Test Configuration System
```bash
# Test festival config
npm run build-client -- validate packages/hub-app/public/client-configs/demo-festival.json

# Test wedding config  
npm run build-client -- validate packages/hub-app/public/client-configs/smith-jones-wedding-2024.json
```

### 3. Test Standalone Generation
```bash
# Generate test standalone app
npm run generate -- standalone demo-festival --web
```

## 📝 Known Issues & Limitations

### Current Limitations
- **Limited UI Components**: Only Button, Input, Card available
- **Basic Theming**: Simple font family theming only
- **No Advanced Styling**: Missing advanced design system features
- **Manual Config Management**: Limited tooling for config creation

### Dependencies
- Requires Firebase project setup for config deployment
- Needs Xcode for iOS development
- Needs Android Studio for Android development
- Node.js v18+ required

## 🚀 What's Next

This backup represents the state before LiftKit integration. The next phase will involve:

1. **LiftKit Integration**: Replace custom components with LiftKit's UI framework
2. **Enhanced Theming**: Leverage LiftKit's golden-ratio design system
3. **Advanced Components**: Access to LiftKit's full component library
4. **Improved Developer Experience**: Better tooling and customization options

## 📞 Recovery Support

If you need to restore this version:
1. Follow the restore instructions above
2. Ensure all dependencies are installed
3. Verify Firebase configuration is set up
4. Test with sample configurations
5. Check that all build scripts work as expected

**Remember**: This backup preserves the working state of Embr v1.0 with custom components and can serve as a fallback if LiftKit integration encounters issues. 