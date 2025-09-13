# 🚀 Embr Development Guide
## **Complete Development Workflow for Universal Micro-App Framework**

This comprehensive guide covers everything you need to develop Embr across Windows and Mac platforms with seamless synchronization and automated workflows.

---

## 🎯 **Quick Start**

### **Every Session Begins With:**
```bash
# 1. Ask: "Are you developing on Mac or Windows today?"
# 2. Run session initialization
npm run session:init

# 3. Start new feature (if on main)
npm run git:start <feature-name>

# 4. Begin development
npm run dev
```

---

## 🖥️ **Cross-Platform Development**

### **Development Philosophy**
- **Both Machines Are Equal**: Windows and Mac are both full development environments
- **Git as Single Source**: All development flows through version control
- **Seamless Switching**: Work on either machine without losing context
- **Platform-Specific Testing**: Test features on the platform you're developing on

### **Platform Roles**
- **Windows**: Full development + Windows-specific testing + Chrome/Edge
- **Mac**: Full development + iOS testing + Safari + Capacitor builds
- **Both**: Complete EmbrKit development, client configs, demo pages

### **Environment Synchronization**
- **Node.js/npm versions** must match across platforms
- **Dependencies** automatically synchronized via `npm run session:init`
- **Git synchronization** handled by automated workflow
- **Quality checks** run on both platforms

---

## 🌿 **Git Workflow System**

### **Automated Branch Management**
```bash
# Start new feature
npm run git:start <feature-name>
# Creates: feature/<name>-YYYY-MM-DD

# Commit progress frequently
npm run git:commit "descriptive message"

# Finish feature (merge + cleanup)
npm run git:finish

# Check current status
npm run git:status
```

### **Workflow Benefits**
- **No branch confusion**: Always work on proper feature branches
- **Automatic cleanup**: Branches deleted after merging
- **Frequent commits**: Easy progress saving
- **Cross-platform sync**: Same workflow on both Windows and Mac

---

## 🔧 **Session Initialization**

### **Automated Setup Process**
The `npm run session:init` command automatically:
1. **Detects platform** (Windows/Mac) and displays status
2. **Checks Git sync** and pulls latest changes
3. **Verifies Node.js/npm** versions match across platforms
4. **Installs/updates dependencies** to ensure consistency
5. **Runs quality checks** (isolation, theme audit)
6. **Checks platform tools** (Xcode on Mac, Capacitor, etc.)
7. **Updates development log** with session start
8. **Shows branch status** and provides Git workflow tips

### **Smart Guidance**
Based on your current state, the system provides:
- **Feature branch tips**: How to commit and finish
- **Main branch tips**: How to start new features
- **Sync tips**: How to keep everything updated

---

## 📱 **Platform-Specific Workflows**

### **Windows Development**
- **Focus**: Web development, Chrome/Edge testing, Windows PWA features
- **Tools**: Visual Studio Code, Chrome DevTools, Edge DevTools
- **Testing**: Windows browsers, Windows PWA features
- **Deployment**: Web deployment, Windows-specific features

### **Mac Development**
- **Focus**: iOS testing, Safari compatibility, native builds, cross-platform validation
- **Tools**: Xcode, Safari Web Inspector, Capacitor CLI
- **Testing**: iOS Safari, Capacitor iOS builds, device testing
- **Deployment**: iOS App Store, macOS distribution

---

## 🎨 **Development Standards**

### **EmbrKit Design System**
- **Border Radius**: `--embr-radius-2xl` (1rem/16px) for primary components
- **Typography**: Inter font family with `font-weight: 600` for buttons/headings
- **Colors**: Primary teal (#0f766e), with success/warning/error variants
- **Spacing**: Golden ratio-based spacing system using CSS custom properties
- **Accessibility**: WCAG AA compliance required

### **Code Quality Requirements**
- **TypeScript First**: Full type safety, no `any` types
- **Component Naming**: `EmbrKit{ComponentName}` (PascalCase)
- **CSS Classes**: `embr-{component-name}` (kebab-case)
- **CSS Variables**: `--embr-{category}-{property}` (kebab-case)

### **Quality Gates**
- **Isolation Check**: `npm run check:isolation` - Ensure demo/client separation
- **Theme Audit**: `npm run audit:theme` - Prevent hardcoded colors
- **Manual Testing**: 30-second keyboard focus check

---

## 🔄 **Development Workflow**

### **Starting New Feature**
```bash
# 1. Session initialization
npm run session:init

# 2. Create feature branch
npm run git:start <feature-name>

# 3. Start development server
npm run dev

# 4. Make changes and test
# 5. Commit progress frequently
npm run git:commit "Progress update"

# 6. Continue development
# 7. Finish feature
npm run git:finish
```

### **Switching Between Machines**
```bash
# On current machine:
npm run git:commit "End of session - switching to Mac"

# On other machine:
npm run session:init
# System automatically syncs and shows current status
```

### **Quality Assurance**
```bash
# Run quality checks
npm run check:isolation
npm run audit:theme

# Test on current platform
npm run dev
# Navigate to /embrkit-components-demo
# Manual 30s keyboard focus check
```

---

## 📚 **Available Commands**

### **Development Commands**
```bash
npm run dev                    # Start development server
npm run build                  # Build for production
npm run check:isolation        # Check demo/client isolation
npm run audit:theme           # Audit theme compliance
```

### **Git Workflow Commands**
```bash
npm run git:start <name>       # Create new feature branch
npm run git:commit "message"   # Commit and push changes
npm run git:finish             # Merge to main and cleanup
npm run git:status             # Show current branch status
npm run git:cleanup <branch>   # Cleanup specific branch
```

### **Log Management Commands**
```bash
npm run devlog:update          # Update development log
npm run devlog:append -- "msg" # Add log entry
```

### **Session Management**
```bash
npm run session:init           # Initialize development session
npm run session:end            # End session with automated cleanup
```

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **Branch Confusion**
```bash
# Check current status
npm run git:status

# Clean up if needed
npm run git:cleanup <branch-name>
```

#### **Sync Issues**
```bash
# Force sync
npm run session:init
# This will pull latest changes and sync dependencies
```

#### **Platform-Specific Issues**
- **Windows**: Check Chrome/Edge compatibility
- **Mac**: Check Safari/iOS compatibility
- **Both**: Run quality checks and theme audit

### **Emergency Recovery**
```bash
# If workflow breaks completely
git checkout main
git pull origin main
npm run session:init
```

---

## 🎯 **Best Practices**

### **Daily Development**
- ✅ **Always start with session init** - Ensures everything is synced
- ✅ **Use feature branches** - Never work directly on main
- ✅ **Commit frequently** - Save progress every 2-3 hours
- ✅ **Test on current platform** - Verify changes work correctly
- ✅ **Run quality checks** - Ensure isolation and theme compliance

### **Cross-Platform Development**
- ✅ **Commit before switching machines** - Save all progress
- ✅ **Pull latest changes** - Use session initialization
- ✅ **Test on both platforms** - Ensure compatibility
- ✅ **Update documentation** - Keep guides current

### **Quality Assurance**
- ✅ **Run isolation checks** - Ensure demo/client separation
- ✅ **Audit theme compliance** - Prevent hardcoded colors
- ✅ **Manual testing** - 30-second keyboard focus check
- ✅ **Update logs** - Record significant changes

---

## 📋 **Quick Reference**

### **Session Start Checklist**
- [ ] Ask: "Mac or Windows today?"
- [ ] Run: `npm run session:init`
- [ ] Check branch status and Git tips
- [ ] Start feature: `npm run git:start <name>` (if on main)
- [ ] Begin development: `npm run dev`

### **Session End Checklist**
- [ ] Run session end: `npm run session:end` (automated)
- [ ] Commit progress: `npm run git:commit "message"` (if needed)
- [ ] Test on current platform
- [ ] Update logs if significant changes

### **Feature Completion Checklist**
- [ ] Final commit: `npm run git:commit "Complete feature"`
- [ ] Run quality checks
- [ ] Test thoroughly
- [ ] Finish feature: `npm run git:finish`
- [ ] Update documentation if needed

---

**Remember**: The automated workflow system ensures you never lose work and always have a clean, organized development environment! 🚀
