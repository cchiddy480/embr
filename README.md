# Embr Platform

A modular, modern platform for building micro apps—apps that serve a single purpose with maximum clarity and ease.

> **One app. One purpose. All power.**

## 🌱 What is Embr?

Embr is designed to simplify digital experiences for events and businesses by delivering lightweight, focused apps that do one thing beautifully. Think:

- A digital schedule for a food festival
- A guest info hub for a wedding  
- A simple app for a local business with a price list and contact form
- A university open day app with maps, timeslots, and speaker bios

These are not bloated platforms or templated websites, but highly specific, installable tools—designed to be quick to build, easy to use, and branded for trust.

## 🏗️ Architecture

The Embr platform consists of two core components:

### 1. Embr Hub App
A single native iOS/Android application that dynamically loads any client's micro-app via QR code or access code. Features:
- Offline support with local caching
- Configurable expiry for temporary events
- Per-client push notifications
- Dynamic theming and navigation

### 2. Standalone App Generator
Automated process to build and wrap a dedicated, fully branded iOS/Android app for a given client config. Features:
- Injects client assets and preloads config
- Runs Capacitor build process
- Produces production-ready binaries
- Handles app store metadata generation

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

```bash
# Clone the repository
git clone https://github.com/embr-platform/embr-platform.git
cd embr-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The Hub App will be available at `http://localhost:3000`

### Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Firebase Configuration
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Development Settings
NEXT_PUBLIC_EMBR_ENV=development
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

## 📁 Project Structure

```
/embr-platform
├── packages/
│   ├── hub-app/          # Core Embr Hub App (Next.js + Capacitor)
│   └── standalone-app/   # Standalone app generator scripts
├── client-configs/       # Client configuration files (JSON)
├── scripts/             # CLI utilities for building and deployment
├── docs/               # Documentation and guides
└── dist/               # Build outputs
```

## 🛠️ Development

### Hub App Development

```bash
# Navigate to Hub App
cd packages/hub-app

# Start development server
npm run dev

# Build for production
npm run build

# Sync with Capacitor
npm run cap:sync

# Open iOS simulator
npm run cap:open:ios

# Open Android emulator
npm run cap:open:android
```

### Client Configuration

Create client configurations in the `client-configs/` directory:

```json
{
  "clientId": "your-client-id",
  "name": "Your Client Name",
  "version": "1.0.0",
  "expiry": "2024-12-31T23:59:59Z",
  "theme": {
    "colors": {
      "primary": "#your-color"
    }
  },
  "navigation": [
    {
      "id": "home",
      "title": "Home",
      "path": "/"
    }
  ]
}
```

### Generating Standalone Apps

```bash
# Generate web app
npm run generate -- standalone <client-id> --web

# Generate iOS app
npm run generate -- standalone <client-id> --ios

# Generate Android app
npm run generate -- standalone <client-id> --android
```

### Deploying Client Configs

```bash
# Deploy to Firebase
npm run build-client -- deploy <client-id>

# Validate config
npm run build-client -- validate <config-path>

# List all configs
npm run build-client -- list
```

## 🧪 Testing

The platform includes sample configurations for testing:

- **Food Festival**: `client-configs/sample-festival.json`
- **Wedding**: `client-configs/sample-wedding.json`

```bash
# Test with sample festival
npm run build-client -- deploy cornwall-food-festival-2024 --dry-run

# Test with sample wedding
npm run build-client -- deploy smith-jones-wedding-2024 --dry-run
```

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

- [Getting Started](./docs/getting-started.md) - Quick setup guide
- [Hub App Development](./docs/hub-app-guide.md) - Building the core app
- [Standalone App Generator](./docs/standalone-app-guide.md) - Creating client apps
- [Client Configuration](./docs/client-config-guide.md) - Config schema guide
- [Firebase Setup](./docs/firebase-setup.md) - Backend configuration
- [CI/CD Guide](./docs/ci-cd-guide.md) - Automated deployment

## 🎯 Key Features

### Dynamic Theming
Client configurations define complete theming including colors, fonts, and logos that are applied at runtime.

### Offline Support
Apps work offline with local caching of configurations and content, syncing when connectivity is restored.

### Push Notifications
Per-client FCM topics allow targeted notifications for specific events or businesses.

### QR Code Integration
Quick app loading via QR codes or manual access code entry.

### Expiry Management
Configurable expiry dates for temporary events, automatically clearing cached data.

## 🏆 Success Criteria

- Hub App can load any client config in <5s, works offline, handles expiry
- Standalone Generator produces signed iOS/Android builds with correct branding
- All workflows documented; new developer can onboard in <2 hours

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions and support:
- Check the [FAQ](./docs/faq.md)
- Review [Troubleshooting](./docs/troubleshooting.md)
- Open an issue on GitHub

---

**Embr Platform** - Empowering events and businesses with beautiful, focused digital experiences. 