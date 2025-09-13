# 🖥️ Cross-Platform Development Guide
## **Windows + Mac Development for Embr Universal Micro-App Framework**

This guide ensures seamless development across Windows (primary development) and Mac (iOS testing) environments while maintaining complete context and project consistency.

---

## 🎯 **Development Environment Strategy**

### **Primary Development Machine (Windows)**
- **Purpose**: Main development, feature building, client config creation
- **Role**: Code changes, testing, commits, deployments
- **Testing**: Web browsers, Windows-specific features

### **iOS Testing Machine (Mac)**
- **Purpose**: iOS testing, Safari compatibility, native app testing
- **Role**: iOS-specific testing, Capacitor native builds, Safari debugging
- **Testing**: iOS Safari, Capacitor iOS builds, device testing

---

## 📋 **Context Preservation Across Machines**

### **✅ Current Setup is Excellent**
Your existing documentation provides complete context:

1. **EMBR_KNOWLEDGE_LEDGER.md** - Complete project reference
2. **DEV_LOG.md + Daily Entries** - Development history and decisions
3. **DEVELOPMENT_ISOLATION_GUIDE.md** - Demo vs production separation
4. **Automated Scripts** - Consistent checks across platforms

### **✅ What You Already Have**
- **Complete Project Context**: Every architectural decision documented
- **Development History**: All changes tracked with timestamps
- **Isolation Rules**: Clear boundaries between demo and production
- **Automated Checks**: Scripts that work identically on both platforms
- **Monorepo Structure**: Consistent file organization

---

## 🚀 **Cross-Platform Workflow**

### **Setup Phase (One-Time)**

#### **1. Git Repository Sync**
```bash
# On Mac - Clone from your Windows repository
git clone <your-repo-url>
cd Embr
npm install
```

#### **2. Environment Variables**
```bash
# Copy environment files (if any)
cp .env.example .env.local

# Set up Firebase credentials (if needed for testing)
export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account.json"
```

#### **3. iOS Development Tools (Mac Only)**
```bash
# Install Xcode (from App Store)
# Install Capacitor CLI
npm install -g @capacitor/cli

# Add iOS platform to Capacitor
cd packages/hub-app
npx cap add ios
npx cap sync
```

### **Daily Development Workflow**

#### **On Windows (Primary Development)**
```bash
# 1. Start development session
npm run devlog:update

# 2. Make changes and test
npm run dev
# Test in Chrome, Edge, Firefox

# 3. Run quality checks
npm run check:isolation
npm run audit:theme

# 4. Commit changes
git add .
git commit -m "Feature: [description]"
git push origin feature/branch-name

# 5. Update dev log
npm run devlog:append -- "Completed [feature description]"
```

#### **On Mac (iOS Testing)**
```bash
# 1. Pull latest changes
git pull origin main
npm install

# 2. Test web version
npm run dev
# Test in Safari, iOS Simulator

# 3. Test native iOS build (if needed)
cd packages/hub-app
npx cap sync
npx cap run ios

# 4. Report iOS-specific issues
npm run devlog:append -- "iOS testing: [findings]"
```

---

## 🔄 **Synchronization Strategy**

### **Git-Based Synchronization**
- **Primary**: Use Git as the single source of truth
- **Branching**: Feature branches for experimental changes
- **Commits**: Detailed commit messages with context

### **Context Preservation**
- **EMBR_KNOWLEDGE_LEDGER.md**: Always up-to-date with latest decisions
- **DEV_LOG.md**: Chronological record of all changes
- **Daily Entries**: Timestamped development progress

### **Quality Assurance**
- **Automated Scripts**: Run identical checks on both platforms
- **Isolation Tests**: Ensure demo/production separation
- **Theme Audits**: Prevent hardcoded colors and styling issues

---

## 📱 **iOS-Specific Testing Checklist**

### **Web Testing (Safari)**
- [ ] **PWA Functionality**: Add to home screen, offline capability
- [ ] **Touch Interactions**: Tap targets, swipe gestures, pinch zoom
- [ ] **Safari Compatibility**: CSS features, JavaScript APIs
- [ ] **Performance**: Load times, scroll performance, memory usage

### **Native Testing (Capacitor)**
- [ ] **App Store Guidelines**: Compliance with iOS requirements
- [ ] **Native Features**: Camera, GPS, push notifications
- [ ] **Device Integration**: Status bar, safe areas, haptic feedback
- [ ] **Performance**: Native app performance vs web performance

### **Client App Testing**
- [ ] **Access Codes**: WILDROOTS2025, QR code scanning
- [ ] **Theme Rendering**: Client colors and fonts display correctly
- [ ] **Component Functionality**: All EmbrKit components work on iOS
- [ ] **Responsive Design**: Mobile-first layouts on iOS devices

---

## 🛠️ **Platform-Specific Considerations**

### **Windows Development**
- **File Paths**: Use forward slashes for cross-platform compatibility
- **Node.js**: Ensure consistent Node.js version across platforms
- **Git**: Use Git Bash or WSL for Unix-like commands

### **Mac Development**
- **Case Sensitivity**: macOS is case-sensitive (unlike Windows)
- **File Permissions**: Ensure proper permissions for scripts
- **Xcode**: Required for iOS development and testing

### **Shared Considerations**
- **Environment Variables**: Use `.env` files for platform-specific configs
- **Package Versions**: Lock package versions in `package-lock.json`
- **Git Hooks**: Use consistent Git hooks across platforms

---

## 🔍 **Testing Strategy**

### **Cross-Platform Testing**
```bash
# Run on both platforms
npm run check:isolation
npm run audit:theme
npm run build
npm run dev
```

### **Platform-Specific Testing**
```bash
# Windows: Test in multiple browsers
# Mac: Test in Safari + iOS Simulator

# Native testing (Mac only)
cd packages/hub-app
npx cap run ios
```

### **Client Config Testing**
- **Test Access Codes**: WILDROOTS2025, QR codes
- **Test Theme Rendering**: Client colors and fonts
- **Test Component Functionality**: All EmbrKit components

---

## 📚 **Documentation Maintenance**

### **Keep Updated on Both Platforms**
- **EMBR_KNOWLEDGE_LEDGER.md**: Project reference and decisions
- **DEV_LOG.md**: Development history and progress
- **DEVELOPMENT_ISOLATION_GUIDE.md**: Demo/production separation rules

### **Platform-Specific Notes**
- **Windows Notes**: Development environment, debugging tools
- **Mac Notes**: iOS testing, Safari compatibility, native builds

### **Shared Documentation**
- **Component Usage**: EmbrKit component examples and patterns
- **Client Config Examples**: JSON configs and theme definitions
- **Deployment Procedures**: Firebase configs, build processes

---

## 🚨 **Troubleshooting**

### **Common Cross-Platform Issues**

#### **File Path Issues**
```bash
# Use forward slashes in code
import Component from './components/Component';

# Avoid Windows-specific paths
// ❌ Wrong
import Component from '.\\components\\Component';
```

#### **Environment Differences**
```bash
# Use environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

# Platform-specific configs
const isIOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
```

#### **Package Version Conflicts**
```bash
# Lock versions in package-lock.json
npm ci  # Use exact versions from lock file

# Update both platforms simultaneously
npm update
```

### **Recovery Procedures**

#### **If Context is Lost**
1. **Read EMBR_KNOWLEDGE_LEDGER.md** - Complete project overview
2. **Check DEV_LOG.md** - Latest development status
3. **Run `npm run check:isolation`** - Verify system integrity
4. **Test with WILDROOTS2025** - Verify client configs work

#### **If iOS Testing Fails**
1. **Check Safari Console** - Web version debugging
2. **Verify Capacitor Setup** - Native build configuration
3. **Test Web Version First** - Ensure web functionality works
4. **Check iOS Simulator** - Device-specific testing

---

## ✅ **Success Metrics**

### **Cross-Platform Consistency**
- [ ] **Code Quality**: Identical linting and formatting across platforms
- [ ] **Functionality**: Same features work on both Windows and Mac
- [ ] **Performance**: Consistent performance metrics
- [ ] **Documentation**: Up-to-date and accessible on both platforms

### **iOS-Specific Success**
- [ ] **Safari Compatibility**: All features work in Safari
- [ ] **PWA Functionality**: Add to home screen, offline capability
- [ ] **Native Integration**: Capacitor features work correctly
- [ ] **Client Apps**: All client configs render properly on iOS

---

## 🎯 **Next Steps**

### **Immediate Setup**
1. **Clone Repository on Mac** - Get latest code
2. **Install Dependencies** - `npm install`
3. **Set Up iOS Tools** - Xcode, Capacitor
4. **Test Current Functionality** - Verify everything works

### **Ongoing Development**
1. **Use Git for Synchronization** - Single source of truth
2. **Maintain Documentation** - Keep logs and guides updated
3. **Run Quality Checks** - Automated scripts on both platforms
4. **Test iOS Features** - Regular Safari and native testing

---

**Remember**: Your current setup with EMBR_KNOWLEDGE_LEDGER.md, DEV_LOG.md, and automated scripts provides excellent context preservation. The key is using Git as your synchronization mechanism and maintaining the documentation on both platforms! 🚀
