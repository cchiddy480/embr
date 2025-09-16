# 📚 Embr Documentation
## **Complete Guide to the Universal Micro-App Framework**

This directory contains all documentation for the Embr Universal Micro-App Framework. Everything you need to develop, deploy, and maintain Embr applications.

---

## 🚀 **Quick Start**

### **New to Embr?**
Start with: **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - Complete development workflow

### **Need Setup Help?**
- **Mac/iOS Setup**: [setup/MAC_IOS_SETUP_GUIDE.md](./setup/MAC_IOS_SETUP_GUIDE.md)
- **Getting Started**: [getting-started.md](./getting-started.md)

---

## 📋 **Documentation Structure**

### **🚀 Core Guides**
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - Complete development workflow
- **[getting-started.md](./getting-started.md)** - Project overview and setup

### **🔧 Workflows**
- **[workflows/GIT_WORKFLOW_GUIDE.md](./workflows/GIT_WORKFLOW_GUIDE.md)** - Automated Git workflow system
- **[workflows/SESSION_INITIALIZATION_GUIDE.md](./workflows/SESSION_INITIALIZATION_GUIDE.md)** - Session setup automation

### **📱 Setup Guides**
- **[setup/MAC_IOS_SETUP_GUIDE.md](./setup/MAC_IOS_SETUP_GUIDE.md)** - Mac and iOS development setup

### **🎨 Development Guides**
- **[guides/DEVELOPMENT_ISOLATION_GUIDE.md](./guides/DEVELOPMENT_ISOLATION_GUIDE.md)** - Demo/client isolation strategy
- **[guides/QR_TO_APP_AUTOLOAD.md](./guides/QR_TO_APP_AUTOLOAD.md)** - Plan for QR → app autoload and deferred deep links

### **📝 Development Logs**
- **[dev-log/](./dev-log/)** - Daily development logs and progress tracking

---

## 🎯 **Common Tasks**

### **Starting Development**
1. Read [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
2. Run `npm run session:init`
3. Start feature: `npm run git:start <name>`
4. Begin coding: `npm run dev`

### **Cross-Platform Development**
- **Windows**: Full development + Chrome/Edge testing
- **Mac**: Full development + iOS testing + Safari
- **Both**: Complete EmbrKit development

### **Git Workflow**
- **Start**: `npm run git:start <feature-name>`
- **Commit**: `npm run git:commit "message"`
- **Finish**: `npm run git:finish`

### **Quality Assurance**
- **Isolation**: `npm run check:isolation`
- **Theme**: `npm run audit:theme`
- **Manual**: 30-second keyboard focus check

---

## 📚 **Reference Materials**

### **Project Files**
- **Knowledge Ledger**: `EMBR_KNOWLEDGE_LEDGER.md` (root)
- **Development Log**: `DEV_LOG.md` (root)
- **Cursor Rules**: `.cursorrules` (root)

### **Package Structure**
```
Embr/
├── docs/                    # All documentation
├── packages/
│   ├── hub-app/            # Next.js Hub Application
│   ├── ui/                 # EmbrKit Design System
│   └── standalone-app/     # Standalone App Generator
├── scripts/                # Automation scripts
└── EMBR_KNOWLEDGE_LEDGER.md # Complete project reference
```

### **Key Commands**
```bash
# Development
npm run dev                 # Start development server
npm run session:init        # Initialize session
npm run git:start <name>    # Start feature branch
npm run git:commit "msg"    # Commit changes
npm run git:finish          # Finish feature

# Quality
npm run check:isolation     # Check demo/client isolation
npm run audit:theme         # Audit theme compliance

# Logs
npm run devlog:update       # Update development log
npm run devlog:append -- "msg" # Add log entry
```

---

## 🔄 **Documentation Updates**

### **When to Update**
- **New features** added to EmbrKit
- **Workflow changes** in development process
- **Platform-specific** requirements change
- **Quality standards** are updated

### **How to Update**
1. **Edit relevant guide** in docs/ directory
2. **Update development log** with changes
3. **Test workflow** to ensure accuracy
4. **Commit changes** using Git workflow

---

## 🎯 **Getting Help**

### **Documentation Issues**
- **Missing information**: Add to relevant guide
- **Outdated content**: Update and commit
- **Unclear instructions**: Improve clarity

### **Development Issues**
- **Session problems**: Run `npm run session:init`
- **Git issues**: Use `npm run git:status`
- **Quality issues**: Run isolation and theme audits

### **Cross-Platform Issues**
- **Sync problems**: Use session initialization
- **Platform-specific**: Check setup guides
- **Environment issues**: Verify Node.js/npm versions

---

**Remember**: All documentation is living and should be updated as the project evolves. The development guide is your primary reference for daily development work! 🚀
