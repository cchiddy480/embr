# 🔄 Environment Synchronization Strategy
## **Keep Windows and Mac Development Environments in Perfect Sync**

This guide ensures your Windows and Mac development environments remain perfectly synchronized for seamless Embr development across both platforms.

---

## 🎯 **Synchronization Philosophy**

### **Core Principles**
1. **Environment Parity** - Same tools and versions on both machines
2. **Dependency Consistency** - Exact same packages and versions
3. **Configuration Sync** - Same settings and configurations
4. **Quality Assurance** - Same quality checks and standards

### **Synchronization Benefits**
- **Zero Setup Time** - Switch machines without configuration
- **Consistent Quality** - Same standards on both platforms
- **No Surprises** - Identical behavior on both machines
- **Seamless Development** - Work on either machine without issues

---

## 🛠️ **Tool Version Synchronization**

### **Node.js Version Management**
```bash
# Check current version on both machines
node --version
npm --version

# Use same version on both machines
# Recommended: LTS version (e.g., 18.x or 20.x)

# If versions differ:
# 1. Download same version from https://nodejs.org/
# 2. Install on both machines
# 3. Verify versions match
```

### **Package Manager Synchronization**
```bash
# Use package-lock.json for exact version consistency
npm ci  # Install exact versions from lock file

# After adding dependencies on one machine:
npm install <package>
git add package.json package-lock.json
git commit -m "Add dependency: <package>"
git push

# On other machine:
git pull
npm ci  # Install exact versions
```

### **Global Package Synchronization**
```bash
# Install same global packages on both machines
npm install -g @capacitor/cli
npm install -g typescript
npm install -g eslint

# Verify global packages match
npm list -g --depth=0
```

---

## 📦 **Dependency Management**

### **Package.json Synchronization**
```bash
# Always commit package.json and package-lock.json together
git add package.json package-lock.json
git commit -m "Update dependencies: [description]"
git push

# On other machine:
git pull
npm ci  # Install exact versions
```

### **Optional Dependencies**
```bash
# Some packages may be platform-specific
# Use optionalDependencies in package.json
{
  "optionalDependencies": {
    "fsevents": "^2.3.2"  // Mac-specific
  }
}
```

### **Platform-Specific Dependencies**
```bash
# Handle platform-specific dependencies
# Example: Windows-specific packages
if (process.platform === 'win32') {
  // Windows-specific code
}

# Example: Mac-specific packages
if (process.platform === 'darwin') {
  // Mac-specific code
}
```

---

## ⚙️ **Configuration Synchronization**

### **Environment Variables**
```bash
# Use .env files for platform-specific configs
# Create .env.local (gitignored) on each machine

# Example .env.local:
NEXT_PUBLIC_API_URL=http://localhost:3000
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json

# Platform-specific configs
WINDOWS_SPECIFIC_CONFIG=value
MAC_SPECIFIC_CONFIG=value
```

### **Git Configuration**
```bash
# Set same Git configuration on both machines
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global core.autocrlf input  # Handle line endings
git config --global core.safecrlf true   # Prevent mixed line endings
```

### **Editor Configuration**
```bash
# Use same editor settings on both machines
# VS Code: Sync settings via Settings Sync
# Or manually copy .vscode/settings.json
```

---

## 🔧 **Development Tool Synchronization**

### **VS Code Extensions**
```bash
# Export extensions from one machine
code --list-extensions > extensions.txt

# Install on other machine
cat extensions.txt | xargs -L 1 code --install-extension
```

### **VS Code Settings**
```bash
# Sync VS Code settings
# File > Preferences > Settings Sync
# Or manually copy settings.json
```

### **Terminal Configuration**
```bash
# Use same terminal configuration on both machines
# Windows: Git Bash or WSL
# Mac: Terminal or iTerm2
# Same shell configuration (bash, zsh, etc.)
```

---

## 📱 **Platform-Specific Tools**

### **Windows Development Tools**
```bash
# Windows-specific tools
# Git for Windows
# Windows Terminal
# WSL (optional)
# Chrome, Edge, Firefox browsers
```

### **Mac Development Tools**
```bash
# Mac-specific tools
# Xcode (for iOS development)
# Homebrew (package manager)
# Safari browser
# iOS Simulator
```

### **Cross-Platform Tools**
```bash
# Tools that work on both platforms
# VS Code
# Git
# Node.js
# npm
# Capacitor CLI
```

---

## 🔄 **Synchronization Workflow**

### **Daily Synchronization**
```bash
# Start of day on either machine:
# 1. Pull latest changes
git pull origin main

# 2. Install dependencies
npm install

# 3. Verify environment
npm run check:isolation
npm run audit:theme

# 4. Start development
npm run dev
```

### **After Adding Dependencies**
```bash
# On machine where you added dependency:
npm install <package>
git add package.json package-lock.json
git commit -m "Add dependency: <package>"
git push

# On other machine:
git pull
npm install  # Install new dependency
```

### **After Configuration Changes**
```bash
# On machine where you changed config:
git add .env.example  # If you have example env file
git commit -m "Update configuration: [description]"
git push

# On other machine:
git pull
# Update .env.local if needed
```

---

## 🚨 **Synchronization Issues**

### **Common Issues**

#### **Node.js Version Mismatch**
```bash
# Check versions
node --version
npm --version

# Install same version on both machines
# Use nvm (Node Version Manager) for easy switching
```

#### **Package Version Conflicts**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall from package.json
npm install

# Commit new package-lock.json
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

#### **Platform-Specific Dependencies**
```bash
# Some packages may not install on certain platforms
# Use optionalDependencies in package.json
# Handle platform differences in code
```

### **Recovery Procedures**

#### **If Environment is Corrupted**
```bash
# 1. Delete node_modules
rm -rf node_modules

# 2. Delete package-lock.json
rm -f package-lock.json

# 3. Reinstall dependencies
npm install

# 4. Verify installation
npm run check:isolation
npm run audit:theme
```

#### **If Versions Don't Match**
```bash
# 1. Check versions on both machines
node --version
npm --version

# 2. Install same version on both machines
# Download from https://nodejs.org/

# 3. Verify versions match
node --version
npm --version
```

---

## 📋 **Synchronization Checklist**

### **Initial Setup**
- [ ] **Node.js Version**: Same version on both machines
- [ ] **npm Version**: Same version on both machines
- [ ] **Git Configuration**: Same settings on both machines
- [ ] **VS Code Extensions**: Same extensions on both machines
- [ ] **Environment Variables**: Same .env files on both machines

### **Daily Maintenance**
- [ ] **Pull Latest Changes**: git pull before starting work
- [ ] **Install Dependencies**: npm install after pulling
- [ ] **Verify Environment**: Run quality checks
- [ ] **Test Functionality**: Ensure everything works

### **After Changes**
- [ ] **Commit Dependencies**: package.json and package-lock.json
- [ ] **Commit Configuration**: .env files and settings
- [ ] **Push Changes**: git push to remote
- [ ] **Sync Other Machine**: git pull on other machine

---

## 🔍 **Quality Assurance**

### **Environment Validation**
```bash
# Run these checks on both machines
npm run check:isolation
npm run audit:theme
npm run dev

# Verify same behavior on both platforms
```

### **Platform Testing**
```bash
# Windows Testing
npm run dev
# Test in: Chrome, Edge, Firefox

# Mac Testing
npm run dev
# Test in: Safari, Chrome, Firefox
# Test: iOS Simulator
```

---

## ✅ **Success Metrics**

### **Synchronization Success**
- [ ] **Same Versions**: Node.js, npm, packages match
- [ ] **Same Behavior**: Identical functionality on both platforms
- [ ] **Same Quality**: Quality checks pass on both machines
- [ ] **Same Configuration**: Settings and configs match

### **Development Efficiency**
- [ ] **Zero Setup Time**: Switch machines without configuration
- [ ] **No Surprises**: Identical behavior on both platforms
- [ ] **Seamless Development**: Work on either machine without issues
- [ ] **Quality Consistency**: Same standards on both platforms

---

## 🎯 **Implementation Checklist**

### **Immediate Setup**
- [ ] **Check Versions**: Verify Node.js and npm versions match
- [ ] **Install Dependencies**: npm install on both machines
- [ ] **Configure Git**: Same Git settings on both machines
- [ ] **Test Synchronization**: Verify everything works

### **Ongoing Maintenance**
- [ ] **Daily Sync**: Pull changes and install dependencies
- [ ] **Quality Checks**: Run automated checks on both machines
- [ ] **Documentation**: Keep logs and guides updated
- [ ] **Testing**: Test on both platforms regularly

---

**Remember**: Environment synchronization is key to seamless dual development. Keep versions, dependencies, and configurations identical on both machines! 🔄
