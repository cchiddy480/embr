# 🍎 Mac + iOS Development Setup Guide
## **Complete Setup for Embr Development Environment on Mac**

This guide provides step-by-step instructions for setting up your Mac as a **full development environment** for the Embr Universal Micro-App Framework, including iOS testing capabilities.

---

## 🎯 **Overview**

### **What You'll Set Up**
- **Full Development Environment**: Complete Embr development setup
- **Xcode**: iOS development environment
- **Capacitor**: Web-to-native app framework
- **iOS Simulator**: Test without physical device
- **Safari Web Inspector**: Debug web version on iOS
- **Git Sync**: Synchronize with Windows development

### **Development Capabilities**
- **Full Development**: Complete Embr development on Mac
- **iOS Testing**: Safari compatibility, PWA functionality
- **Native Testing**: Capacitor iOS builds, native features
- **Cross-Platform Testing**: Ensure features work on both platforms
- **Performance Testing**: iOS-specific performance optimization

---

## 🚀 **Step-by-Step Setup**

### **Step 1: Install Xcode**
```bash
# 1. Open App Store on Mac
# 2. Search for "Xcode"
# 3. Click "Get" or "Install" (large download ~15GB)
# 4. Wait for installation to complete
# 5. Open Xcode and accept license agreements
```

### **Step 2: Install Command Line Tools**
```bash
# Install Xcode command line tools
xcode-select --install

# Verify installation
xcode-select -p
# Should output: /Applications/Xcode.app/Contents/Developer
```

### **Step 3: Install Node.js**
```bash
# Install Node.js (use same version as Windows)
# Check Windows version: node --version
# Download from: https://nodejs.org/
# Or use Homebrew:
brew install node

# Verify installation
node --version
npm --version
```

### **Step 4: Clone and Setup Embr Repository**
```bash
# Clone your repository
git clone <your-repo-url>
cd Embr

# Install dependencies
npm install

# Verify setup
npm run dev
# Should start development server on http://localhost:3000

# Run quality checks
npm run check:isolation
npm run audit:theme
```

### **Step 5: Install Capacitor CLI**
```bash
# Install Capacitor CLI globally
npm install -g @capacitor/cli

# Verify installation
npx cap --version
```

### **Step 6: Add iOS Platform to Embr Hub**
```bash
# Navigate to hub app
cd packages/hub-app

# Add iOS platform
npx cap add ios

# Sync web assets to native
npx cap sync

# This creates packages/hub-app/ios/ directory
```

### **Step 7: Configure iOS Project**
```bash
# Open iOS project in Xcode
npx cap open ios

# In Xcode:
# 1. Select your project in the navigator
# 2. Set your development team (Apple ID)
# 3. Set bundle identifier (e.g., com.embr.hub)
# 4. Configure signing & capabilities
```

---

## 💻 **Full Development Workflow**

### **Daily Development on Mac**
```bash
# 1. Start development session
git pull origin main

# 2. Install dependencies
npm install

# 3. Update development log
npm run devlog:update

# 4. Verify system integrity
npm run check:isolation
npm run audit:theme

# 5. Start development server
npm run dev

# 6. Develop features, components, client configs
# 7. Test in Safari, Chrome, Firefox
# 8. Test iOS Simulator for native features
```

### **Development Testing**
```bash
# Web Development Testing
npm run dev
# Test in: Safari, Chrome, Firefox
# Test: PWA features, responsive design

# iOS-Specific Testing
cd packages/hub-app
npx cap run ios
# Test: iOS Simulator, native features

# Cross-Platform Validation
# Ensure features work on both Mac and Windows
```

## 📱 **iOS Testing Workflow**

### **Web Testing (Safari)**
```bash
# 1. Start development server
npm run dev

# 2. Open Safari on Mac
# 3. Navigate to http://localhost:3000
# 4. Test all features:
#    - Access code entry (WILDROOTS2025)
#    - QR code scanning
#    - Client app rendering
#    - Demo pages (/embrkit-demo, /embrkit-components-demo)
```

### **iOS Simulator Testing**
```bash
# 1. Start development server
npm run dev

# 2. Run in iOS Simulator
cd packages/hub-app
npx cap run ios

# 3. Test in simulator:
#    - Touch interactions
#    - Device orientation
#    - Native features (camera, GPS)
#    - Performance
```

### **Physical Device Testing (Optional)**
```bash
# 1. Connect iOS device via USB
# 2. Trust computer on device
# 3. Run on device
npx cap run ios --target=device

# 4. Test on real device:
#    - Touch responsiveness
#    - Camera functionality
#    - GPS accuracy
#    - Performance on actual hardware
```

---

## 🔧 **Safari Web Inspector Setup**

### **Enable Web Inspector**
```bash
# On Mac Safari:
# 1. Safari > Preferences > Advanced
# 2. Check "Show Develop menu in menu bar"

# On iOS Device (if testing physical device):
# 1. Settings > Safari > Advanced
# 2. Enable "Web Inspector"
```

### **Debug Web Version on iOS**
```bash
# 1. Connect iOS device or use simulator
# 2. Open Safari on Mac
# 3. Develop menu > [Your Device] > [Your App]
# 4. Use Web Inspector to debug:
#    - Console errors
#    - Network requests
#    - CSS styling
#    - JavaScript debugging
```

---

## 🧪 **Testing Checklist**

### **Web Compatibility Testing**
- [ ] **Safari Rendering**: All components display correctly
- [ ] **Touch Interactions**: Tap targets work properly
- [ ] **Scroll Performance**: Smooth scrolling on iOS
- [ ] **PWA Features**: Add to home screen, offline capability
- [ ] **CSS Compatibility**: All styles render correctly

### **Client App Testing**
- [ ] **Access Codes**: WILDROOTS2025 works correctly
- [ ] **QR Code Scanning**: Camera access and scanning
- [ ] **Theme Rendering**: Client colors and fonts
- [ ] **Component Functionality**: All EmbrKit components
- [ ] **Responsive Design**: Mobile-first layouts

### **Demo Pages Testing**
- [ ] **EmbrKit Demo**: Design system showcase
- [ ] **Components Demo**: Interactive component examples
- [ ] **Themes Demo**: Theme system variations
- [ ] **Isolation**: Demo changes don't affect client apps

### **Native App Testing (Capacitor)**
- [ ] **App Launch**: Native app starts correctly
- [ ] **Web View**: Web content loads in native container
- [ ] **Native Features**: Camera, GPS, notifications
- [ ] **Performance**: Native app performance vs web
- [ ] **App Store Compliance**: Meets iOS guidelines

---

## 🔄 **Synchronization with Windows**

### **Dual Development Workflow**
```bash
# 1. Pull latest changes from Windows
git pull origin main

# 2. Install any new dependencies
npm install

# 3. Develop features on Mac
npm run dev
# Test in Safari, Chrome, Firefox
# Test iOS Simulator for native features

# 4. Commit and push changes
git add .
git commit -m "Mac: [feature description]"
git push origin feature/feature-name

# 5. Update development log
npm run devlog:append -- "Mac development: [findings]"
```

### **Cross-Platform Development Workflow**
```bash
# 1. Develop on Mac
npm run dev
# Test web version in Safari
# Test native version in iOS Simulator

# 2. Commit and push changes
git add .
git commit -m "Mac: [feature description]"
git push origin feature/feature-name

# 3. Switch to Windows (or vice versa)
# Pull changes and continue development
# Test on Windows platform

# 4. Document cross-platform findings
# Update DEV_LOG.md with platform-specific results
```

---

## 🛠️ **Troubleshooting**

### **Common Issues**

#### **Xcode Not Found**
```bash
# Check Xcode installation
xcode-select -p

# If not found, reinstall Xcode from App Store
# Then run:
sudo xcode-select --reset
```

#### **Capacitor Build Errors**
```bash
# Clean and rebuild
cd packages/hub-app
npx cap clean
npx cap sync
npx cap run ios
```

#### **iOS Simulator Issues**
```bash
# Reset simulator
xcrun simctl erase all

# List available simulators
xcrun simctl list devices
```

#### **Safari Compatibility Issues**
```bash
# Check Safari version
# Safari > About Safari

# Test in different Safari versions if needed
# Use Web Inspector to debug CSS/JavaScript issues
```

### **Performance Issues**
```bash
# Monitor performance in Safari
# Safari > Develop > Show Web Inspector
# Use Timeline tab to profile performance

# Test on different iOS versions
# Use different simulator versions
```

---

## 📚 **iOS-Specific Considerations**

### **Safari Differences**
- **CSS Support**: Some CSS features may differ from Chrome
- **JavaScript APIs**: Some APIs may have different behavior
- **Touch Events**: iOS handles touch events differently
- **Viewport**: iOS Safari has unique viewport behavior

### **iOS App Store Guidelines**
- **Content Guidelines**: Ensure content meets App Store standards
- **Technical Requirements**: Meet iOS technical requirements
- **Privacy**: Handle user privacy according to iOS guidelines
- **Performance**: Optimize for iOS performance characteristics

### **PWA Considerations**
- **Add to Home Screen**: Test PWA installation
- **Offline Functionality**: Test offline capabilities
- **Push Notifications**: Test notification functionality
- **App-like Experience**: Ensure app-like behavior

---

## ✅ **Success Metrics**

### **Development Environment Success**
- [ ] **Full Development Setup**: Complete Embr development environment
- [ ] **Xcode Installed**: iOS development environment ready
- [ ] **Capacitor Working**: Native builds successful
- [ ] **Safari Testing**: Web version works in Safari
- [ ] **iOS Simulator**: Native app runs in simulator
- [ ] **Git Sync**: Repository synchronized with Windows

### **Development Success**
- [ ] **Web Development**: All features work in Safari, Chrome, Firefox
- [ ] **Native Functionality**: Capacitor features work
- [ ] **Cross-Platform**: Features work on both Mac and Windows
- [ ] **Performance**: Good performance on iOS
- [ ] **Client Apps**: All client configs render correctly
- [ ] **Demo Pages**: All demo pages work on iOS

---

## 🎯 **Next Steps**

### **Immediate Setup**
1. **Install Xcode** - iOS development environment
2. **Clone Repository** - Get latest Embr code
3. **Setup Capacitor** - Native app framework
4. **Test Web Version** - Verify Safari compatibility
5. **Setup Full Development** - Complete development environment

### **Ongoing Development**
1. **Dual Development** - Develop on both Mac and Windows
2. **Cross-Platform Testing** - Test features on both platforms
3. **iOS Testing** - Test all new features on iOS
4. **Performance Monitoring** - Monitor iOS performance
5. **Documentation** - Update logs with platform findings

---

**Remember**: Your Mac setup is now a **full development environment** equal to Windows. You can develop on either machine and sync via Git. Focus on cross-platform development and iOS-specific testing! 🍎💻📱
