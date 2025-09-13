# 🛡️ Development Isolation Guide

## **Complete Isolation Between Demo Pages and Client Configs**

This guide ensures that demo pages and client config development remain completely isolated, preventing any cross-contamination that could affect production deployments.

## **Quick Reference**

### **Demo Pages** (Independent Showcases)
- **Purpose**: Showcase EmbrKit components and design system
- **Routes**: `/embrkit-demo`, `/embrkit-components-demo`, `/embrkit-themes-demo`
- **Isolation**: Use inline CSS variables, no external dependencies
- **Testing**: Test independently, changes don't affect client configs

### **Client Configs** (Production System)
- **Purpose**: Load and render client-specific applications
- **Routes**: `/` (main hub), client apps via access codes
- **Isolation**: Use `useClientConfig` hook and `ClientApp` component
- **Testing**: Test with real configs (WILDROOTS2025), changes don't affect demos

## **Development Workflows**

### **Working on Demo Pages** ✅
```bash
# 1. Make changes to demo pages
# 2. Test demo pages work correctly
npm run dev
# Visit: http://localhost:3000/embrkit-demo
# Visit: http://localhost:3000/embrkit-components-demo
# Visit: http://localhost:3000/embrkit-themes-demo

# 3. Run isolation check
npm run check:isolation

# 4. Test client configs still work (verify no regressions)
# Use access code: WILDROOTS2025
```

### **Working on Client Configs** ✅
```bash
# 1. Make changes to client config system
# 2. Test client configs work correctly
npm run dev
# Use access code: WILDROOTS2025
# Test QR code scanning
# Test access code entry

# 3. Run isolation check
npm run check:isolation

# 4. Test demo pages still work (verify no regressions)
# Visit: http://localhost:3000/embrkit-*-demo
```

## **Isolation Rules**

### **Demo Pages Must:**
- ✅ Use inline CSS variables via `dangerouslySetInnerHTML`
- ✅ Import `@embr/ui` for components only
- ✅ Be completely self-contained
- ✅ Work without any external configs or Firebase

### **Demo Pages Must NOT:**
- ❌ Import client config code (`useClientConfig`, `ClientApp`, etc.)
- ❌ Use global CSS variables without inline override
- ❌ Depend on Firebase or external configs
- ❌ Modify global state or context

### **Client Configs Must:**
- ✅ Use `useClientConfig` hook for loading configs
- ✅ Use `ClientApp` component for rendering
- ✅ Load from Firebase or static JSON files
- ✅ Handle access codes and QR codes

### **Client Configs Must NOT:**
- ❌ Import demo-specific code
- ❌ Depend on demo page implementations
- ❌ Use demo-specific styling or components

## **File Organization**

### **Demo Pages** (Isolated)
```
packages/hub-app/src/app/
├── embrkit-demo/page.tsx              # Design system showcase
├── embrkit-components-demo/page.tsx   # Component library showcase
└── embrkit-themes-demo/page.tsx       # Theme system showcase
```

### **Client Config System** (Isolated)
```
packages/hub-app/src/
├── hooks/useClientConfig.tsx          # Config loading logic
├── components/ClientApp.tsx           # Client app wrapper
├── types/client.ts                   # Client config types
└── app/page.tsx                      # Hub with config loading
```

### **Shared Resources** (Safe to Modify)
```
packages/ui/src/                       # EmbrKit component library
├── components/embrkit.tsx            # All EmbrKit components
├── lib/embrkit-core.css             # Design tokens
└── lib/embrkit-components.css       # Component styles
```

## **Testing Checklist**

### **Before Committing Demo Changes:**
- [ ] Demo pages load and display correctly
- [ ] All components show proper styling
- [ ] No console errors or warnings
- [ ] `npm run check:isolation` passes
- [ ] Client configs still work (test WILDROOTS2025)
- [ ] No visual regressions in client apps

### **Before Committing Client Config Changes:**
- [ ] Client configs load correctly
- [ ] Access codes work (test WILDROOTS2025)
- [ ] QR code scanning works
- [ ] `npm run check:isolation` passes
- [ ] Demo pages still work
- [ ] No visual regressions in demos

## **Emergency Recovery**

### **If Demo Changes Break Client Configs:**
```bash
# 1. Check isolation violations
npm run check:isolation

# 2. Revert demo changes
git checkout HEAD -- packages/hub-app/src/app/embrkit-*-demo/

# 3. Test client configs work
# Use access code: WILDROOTS2025

# 4. Re-apply demo changes with proper isolation
```

### **If Client Config Changes Break Demos:**
```bash
# 1. Check isolation violations
npm run check:isolation

# 2. Revert client config changes
git checkout HEAD -- packages/hub-app/src/hooks/useClientConfig.tsx
git checkout HEAD -- packages/hub-app/src/components/ClientApp.tsx

# 3. Test demos work
# Visit: http://localhost:3000/embrkit-*-demo

# 4. Re-apply client config changes with proper isolation
```

## **Common Isolation Violations**

### **❌ Demo Page Violations:**
```typescript
// WRONG: Importing client config code
import { useClientConfig } from '../hooks/useClientConfig';

// WRONG: Using global CSS variables without override
<div style={{ backgroundColor: 'var(--embr-background)' }}>

// WRONG: Accessing client config context
const { config } = useClientConfig();
```

### **❌ Client Config Violations:**
```typescript
// WRONG: Importing demo-specific code
import { DemoComponent } from '../embrkit-demo/components';

// WRONG: Using demo-specific styling
<div className="demo-specific-class">
```

### **✅ Correct Patterns:**
```typescript
// Demo pages: Inline CSS variables
const demoStyles = `
  :root {
    --embr-primary-color: #0F766E;
    --embr-background: #101926;
  }
`;
<div style={{ backgroundColor: '#101926' }}>

// Client configs: Use hooks and components
const { config } = useClientConfig();
<ClientApp config={config} />
```

## **Automated Checks**

### **Run Isolation Check:**
```bash
npm run check:isolation
```

### **Run Theme Audit:**
```bash
npm run audit:theme
```

### **Run All Checks:**
```bash
npm run check:isolation && npm run audit:theme
```

## **Best Practices**

1. **Always test both systems** when making changes
2. **Run isolation checks** before committing
3. **Use feature branches** for experimental changes
4. **Keep demo pages as pure showcases**
5. **Keep client configs as production-ready**
6. **Document any shared dependencies**
7. **Test with real client configs** (WILDROOTS2025)

## **Support**

- **Isolation Issues**: Check `packages/hub-app/src/app/demo-isolation-guard.md`
- **Theme Issues**: Check `scripts/theming-audit.js`
- **Component Issues**: Check `packages/ui/src/components/embrkit.tsx`

---

**Remember**: Demo pages and client configs are completely separate systems. Changes to one should never affect the other! 🛡️
