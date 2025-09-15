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

### **Session-Based Development (RECOMMENDED)**

#### **New Development Session Workflow:**
```bash
# 1. Start new session
npm run git:session <session-name>
# Creates: session/<name>-YYYY-MM-DD

# 2. Save progress frequently during development
npm run git:save "descriptive message"

# 3. End session when complete
npm run git:end
# Merges to main and deletes branch automatically
```

#### **Session Workflow Benefits:**
- **Clear session boundaries**: Each development session gets its own branch
- **Automatic cleanup**: Session branches deleted after merging
- **Progress saving**: Easy way to save work during development
- **Cross-platform sync**: Same workflow on both Windows and Mac
- **Clean history**: Each session creates a clear merge commit

### **Feature-Based Development (For Longer Features)**

#### **Traditional Feature Branch Workflow:**
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
- **No branch confusion**: Always work on proper development branches
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

## 🎯 **Client App Development (CRITICAL)**

### **Client App Independence Architecture**

When developing a new client micro-app, you MUST create a **completely independent React component**:

#### **1. Create Client-Specific Component**
```typescript
// packages/hub-app/src/components/clients/YourClientApp.tsx
export function YourClientApp({ config }: YourClientAppProps) {
  // Complete, independent UI implementation
  // NO sharing of layouts, content, or styling with other clients
}
```

#### **2. Register in Client App Registry**
```typescript
// packages/hub-app/src/components/clients/index.ts
export const CLIENT_APP_REGISTRY = {
  'your-client-2025': YourClientApp,  // Add your client here
  // ... existing clients
} as const;
```

#### **3. Design Principles (MANDATORY)**
- **Complete Visual Independence**: Each client has unique layouts, content, and styling
- **Business-Specific Features**: Tailor UI to client's specific use case and workflows
- **Purpose-Built UI**: No generic templates or carbon copies
- **Brand Integrity**: Use client's colors, fonts, and visual identity

#### **4. Development Checklist**
- [ ] Create completely independent component (no shared layouts)
- [ ] Use EmbrKit components for foundation and common UI
- [ ] Add custom blocks for unique, branded visuals
- [ ] Implement business-specific content and features
- [ ] Apply client's brand colors, fonts, and styling
- [ ] Register component in CLIENT_APP_REGISTRY
- [ ] Test with client's access code
- [ ] Verify complete visual independence from other clients

#### **5. Anti-Patterns to Avoid**
❌ **DON'T**: Create generic templates that all clients share
❌ **DON'T**: Make clients look like carbon copies with different colors
❌ **DON'T**: Share layouts, content structures, or user flows
❌ **DON'T**: Force clients into the same information architecture

✅ **DO**: Create unique, purpose-built experiences for each client
✅ **DO**: Use client's brand colors, fonts, and styling
✅ **DO**: Implement business-specific features and content
✅ **DO**: Design layouts that match the client's use case

### **Complete Development Guide**
For detailed client app development instructions, see:
**📖 [CLIENT_APP_DEVELOPMENT_GUIDE.md](CLIENT_APP_DEVELOPMENT_GUIDE.md)**

### **Quick Start Tools**
```bash
# Create a new client app in 3 commands
npm run client:create -- --name "My Client" --industry healthcare --access-code CLIENT2025
npm run client:validate  # Validate all configs
npm run configs:push     # Deploy to Firebase
```

### **Available Client Tools**
- `npm run client:create` - Create new client from template
- `npm run client:validate` - Validate all client configs  
- `npm run configs:push` - Deploy configs to Firebase
- `npm run configs:push:one -- <slug>` - Deploy single config

---

## 🔄 **Development Workflow**

### **Starting New Development Session (RECOMMENDED)**
```bash
# 1. Session initialization
npm run session:init

# 2. Create session branch
npm run git:session <session-name>

# 3. Start development server
npm run dev

# 4. Make changes and test
# 5. Save progress frequently
npm run git:save "Progress update"

# 6. Continue development
# 7. End session
npm run git:end
```

### **Starting New Feature (For Longer Features)**
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
# Session-Based Workflow (RECOMMENDED)
npm run git:session <name>     # Create new session branch
npm run git:save "message"     # Save session progress
npm run git:end                # End session (merge & cleanup)

# Feature-Based Workflow (for longer features)
npm run git:start <name>       # Create new feature branch
npm run git:commit "message"   # Commit and push changes
npm run git:finish             # Merge to main and cleanup

# Utility Commands
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
