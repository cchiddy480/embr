# 🔄 Git Dual Development Workflow
## **Seamless Development Across Windows and Mac**

This guide provides a complete Git workflow for developing Embr on both Windows and Mac machines with zero context loss and seamless switching.

---

## 🎯 **Git Workflow Philosophy**

### **Core Principles**
1. **Git as Single Source of Truth** - All development flows through version control
2. **Seamless Switching** - Switch between machines without losing work
3. **Context Preservation** - Complete project understanding on both platforms
4. **Quality Assurance** - Automated checks ensure consistency

### **Workflow Benefits**
- **Zero Setup Time** - Switch machines in under 5 minutes
- **No Context Loss** - Continue development seamlessly
- **Quality Consistency** - Same standards on both platforms
- **Platform Testing** - Test on both Windows and Mac

---

## 🚀 **Daily Development Workflow**

### **Start of Development Session (Either Machine)**
```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
npm install

# 3. Update development log
npm run devlog:update

# 4. Verify system integrity
npm run check:isolation
npm run audit:theme

# 5. Start development server
npm run dev

# 6. Check current status
git status
```

### **During Development**
```bash
# Make changes, test locally
# Run quality checks frequently
npm run check:isolation
npm run audit:theme

# Commit frequently with descriptive messages
git add .
git commit -m "Feature: Add new component functionality"

# Push to remote for backup
git push origin feature/feature-name
```

### **End of Development Session**
```bash
# 1. Run final quality checks
npm run check:isolation
npm run audit:theme

# 2. Commit any remaining changes
git add .
git commit -m "Complete: [feature description]"

# 3. Push to remote
git push origin feature/feature-name

# 4. Update development log
npm run devlog:append -- "Completed [feature] on [platform]"
```

---

## 🔄 **Machine Switching Workflow**

### **Switching from Windows to Mac**
```bash
# On Windows (before switching):
# 1. Commit and push all changes
git add .
git commit -m "Windows: [current work]"
git push origin feature/feature-name

# 2. Update development log
npm run devlog:append -- "Switching to Mac for iOS testing"

# On Mac (after switching):
# 1. Pull latest changes
git pull origin feature/feature-name

# 2. Install dependencies
npm install

# 3. Verify setup
npm run check:isolation
npm run audit:theme

# 4. Continue development
npm run dev
```

### **Switching from Mac to Windows**
```bash
# On Mac (before switching):
# 1. Commit and push all changes
git add .
git commit -m "Mac: [current work]"
git push origin feature/feature-name

# 2. Update development log
npm run devlog:append -- "Switching to Windows for web testing"

# On Windows (after switching):
# 1. Pull latest changes
git pull origin feature/feature-name

# 2. Install dependencies
npm install

# 3. Verify setup
npm run check:isolation
npm run audit:theme

# 4. Continue development
npm run dev
```

---

## 🌿 **Branch Strategy**

### **Feature Branch Workflow**
```bash
# Create feature branch on either machine
git checkout -b feature/feature-name

# Develop on either machine
# Make commits with descriptive messages
git commit -m "Feature: Add new component on [platform]"

# Push to remote
git push origin feature/feature-name

# Switch to other machine
git checkout feature/feature-name
git pull origin feature/feature-name

# Continue development seamlessly
```

### **Branch Naming Convention**
```bash
# Feature branches
feature/component-name
feature/ios-testing
feature/client-config-update

# Bug fix branches
bugfix/button-styling
bugfix/ios-compatibility

# Hotfix branches
hotfix/critical-issue
```

---

## 📝 **Commit Message Strategy**

### **Commit Message Format**
```bash
# Platform-specific commits
git commit -m "Windows: Fix button styling in Chrome"
git commit -m "Mac: Add iOS Simulator testing"
git commit -m "Cross-platform: Update component library"

# Feature commits
git commit -m "Feature: Add new EmbrKit component"
git commit -m "Feature: Implement client config system"

# Bug fix commits
git commit -m "Bugfix: Resolve Safari compatibility issue"
git commit -m "Bugfix: Fix iOS touch interaction"

# Documentation commits
git commit -m "Docs: Update development workflow"
git commit -m "Docs: Add iOS testing guide"
```

### **Commit Frequency**
- **Commit Early and Often** - Don't wait for perfect code
- **Platform-Specific Commits** - Document platform differences
- **Feature-Based Commits** - Group related changes
- **Quality Check Commits** - Commit after passing checks

---

## 🔍 **Quality Assurance Workflow**

### **Pre-Commit Checks**
```bash
# Run quality checks before committing
npm run check:isolation
npm run audit:theme

# Fix any issues before committing
# Commit only when all checks pass
git add .
git commit -m "Feature: [description] - all checks pass"
```

### **Pre-Push Checks**
```bash
# Run final checks before pushing
npm run check:isolation
npm run audit:theme

# Test platform-specific features
# Windows: Test in Chrome, Edge, Firefox
# Mac: Test in Safari, iOS Simulator

# Push only when everything works
git push origin feature/feature-name
```

---

## 🔄 **Synchronization Strategy**

### **Frequent Synchronization**
```bash
# Sync every 2-3 hours during development
git add .
git commit -m "WIP: [current work]"
git push origin feature/feature-name

# This ensures work is backed up and available on other machine
```

### **End-of-Day Synchronization**
```bash
# Complete synchronization at end of day
git add .
git commit -m "End of day: [summary of work]"
git push origin feature/feature-name

# Update development log
npm run devlog:append -- "End of day: [platform] - [summary]"
```

---

## 🚨 **Conflict Resolution**

### **Merge Conflicts**
```bash
# If conflicts occur when pulling
git pull origin feature/feature-name

# Resolve conflicts in editor
# Test resolution
npm run check:isolation
npm run audit:theme

# Commit resolution
git add .
git commit -m "Resolve: Merge conflicts in [file]"
git push origin feature/feature-name
```

### **Preventing Conflicts**
```bash
# Pull before starting work
git pull origin feature/feature-name

# Commit frequently
git add .
git commit -m "WIP: [current work]"
git push origin feature/feature-name

# Communicate with yourself (via dev log)
npm run devlog:append -- "Working on [feature] on [platform]"
```

---

## 📱 **Platform-Specific Development**

### **Windows Development**
```bash
# Windows-specific commits
git commit -m "Windows: Test PWA features in Edge"
git commit -m "Windows: Fix Windows-specific CSS issues"
git commit -m "Windows: Optimize for Windows performance"

# Test on Windows
npm run dev
# Test in: Chrome, Edge, Firefox
```

### **Mac Development**
```bash
# Mac-specific commits
git commit -m "Mac: Test Safari compatibility"
git commit -m "Mac: Fix iOS Simulator issues"
git commit -m "Mac: Optimize for iOS performance"

# Test on Mac
npm run dev
# Test in: Safari, Chrome, Firefox
# Test: iOS Simulator, native builds
```

---

## 🔧 **Environment Synchronization**

### **Package Dependencies**
```bash
# Always use package-lock.json for consistency
npm ci  # Install exact versions from lock file

# After adding new dependencies on one machine:
npm install <package>
git add package.json package-lock.json
git commit -m "Add dependency: <package>"
git push

# On other machine:
git pull
npm ci  # Install exact versions
```

### **Environment Variables**
```bash
# Use .env files for platform-specific configs
# Create .env.local (gitignored) on each machine
# Example .env.local:
NEXT_PUBLIC_API_URL=http://localhost:3000
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json
```

---

## 📚 **Documentation Workflow**

### **Development Log Updates**
```bash
# Update dev log on both machines
npm run devlog:update

# Add platform-specific entries
npm run devlog:append -- "Windows: [finding]"
npm run devlog:append -- "Mac: [finding]"
npm run devlog:append -- "Cross-platform: [finding]"
```

### **Documentation Commits**
```bash
# Commit documentation updates
git add DEV_LOG.md docs/dev-log/
git commit -m "Docs: Update development log with [platform] findings"
git push origin feature/feature-name
```

---

## ✅ **Success Metrics**

### **Workflow Success**
- [ ] **Seamless Switching**: Switch machines in under 5 minutes
- [ ] **No Context Loss**: Continue development without setup
- [ ] **Quality Consistency**: Same standards on both platforms
- [ ] **Platform Testing**: Test on both Windows and Mac

### **Git Workflow Success**
- [ ] **Frequent Commits**: Commit every 2-3 hours
- [ ] **Descriptive Messages**: Clear commit messages
- [ ] **Quality Checks**: All checks pass before committing
- [ ] **Conflict Resolution**: Handle conflicts gracefully

---

## 🎯 **Implementation Checklist**

### **Immediate Setup**
- [ ] **Clone Repository on Mac** - Get latest code
- [ ] **Setup Git Configuration** - Same settings on both machines
- [ ] **Test Workflow** - Practice switching between machines
- [ ] **Verify Quality Checks** - Ensure scripts work on both platforms

### **Daily Workflow**
- [ ] **Start with Git Pull** - Always pull before starting work
- [ ] **Commit Frequently** - Don't wait for perfect code
- [ ] **Run Quality Checks** - Automated scripts before committing
- [ ] **Update Documentation** - Keep logs and guides current

### **Long-term Maintenance**
- [ ] **Keep Environments Synchronized** - Same tools and versions
- [ ] **Document Platform Differences** - Platform-specific findings
- [ ] **Maintain Quality Standards** - Consistent quality across platforms

---

**Remember**: Git is your synchronization mechanism. Commit frequently, push often, and use descriptive messages. This ensures seamless development across both machines! 🚀
