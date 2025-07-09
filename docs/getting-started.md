# Getting Started with Embr Platform

This guide will help you get the Embr platform up and running on your local development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)
- **Firebase CLI** (optional, for deployment)

## Quick Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/embr-platform/embr-platform.git
cd embr-platform

# Install dependencies
npm install
```

### 2. Environment Configuration

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

### 3. Start Development Server

```bash
# Start the Hub App development server
npm run dev
```

The Hub App will be available at `http://localhost:3000`

## Testing with Sample Configurations

The platform includes sample client configurations for testing:

### Food Festival App
```bash
# Validate the sample festival config
npm run build-client -- validate client-configs/sample-festival.json

# Deploy to Firebase (dry run)
npm run build-client -- deploy cornwall-food-festival-2024 --dry-run
```

### Wedding App
```bash
# Validate the sample wedding config
npm run build-client -- validate client-configs/sample-wedding.json

# Deploy to Firebase (dry run)
npm run build-client -- deploy smith-jones-wedding-2024 --dry-run
```

## Generating Standalone Apps

To generate a standalone app for a client:

```bash
# Generate web app
npm run generate -- standalone cornwall-food-festival-2024 --web

# Generate iOS app
npm run generate -- standalone cornwall-food-festival-2024 --ios

# Generate Android app
npm run generate -- standalone cornwall-food-festival-2024 --android
```

## Development Workflow

### 1. Hub App Development

The Hub App is located in `packages/hub-app/` and uses Next.js with Capacitor:

```bash
# Navigate to Hub App
cd packages/hub-app

# Start development server
npm run dev

# Build for production
npm run build

# Sync with Capacitor
npm run cap:sync
```

### 2. Testing Native Features

```bash
# Open iOS simulator
npm run cap:open:ios

# Open Android emulator
npm run cap:open:android
```

### 3. Client Configuration Development

Create new client configurations in the `client-configs/` directory:

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

## Common Commands

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build all packages
npm run build

# Lint code
npm run lint

# Run tests
npm run test

# Generate standalone app
npm run generate -- standalone <client-id>

# Deploy client config
npm run build-client -- deploy <client-id>

# List all configs
npm run build-client -- list
```

## Next Steps

1. **Set up Firebase**: Follow the [Firebase Configuration Guide](./firebase-setup.md)
2. **Build your first app**: See the [Hub App Development Guide](./hub-app-guide.md)
3. **Create client configs**: Review the [Client Configuration Guide](./client-config-guide.md)
4. **Set up CI/CD**: Follow the [CI/CD Guide](./ci-cd-guide.md)

## Troubleshooting

### Common Issues

**Port 3000 already in use**
```bash
# Use a different port
npm run dev -- -p 3001
```

**Capacitor sync fails**
```bash
# Clean and reinstall
rm -rf node_modules
npm install
npm run cap:sync
```

**Firebase connection issues**
- Verify your Firebase configuration in `.env.local`
- Check that your Firebase project has the necessary services enabled
- Ensure your API keys have the correct permissions

### Getting Help

- Check the [FAQ](./faq.md) for common questions
- Review [Troubleshooting](./troubleshooting.md) for detailed solutions
- Open an issue on GitHub for bugs or feature requests

---

**Ready to build amazing micro-apps?** 🚀

Check out the [Hub App Development Guide](./hub-app-guide.md) to start building your first Embr app! 