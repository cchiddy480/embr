# Demo Pages Isolation Strategy

## 🛡️ Complete Isolation Between Demo Pages and Client Configs

### **Core Principle**
Demo pages and client config development must be completely isolated. Changes to demo pages should NEVER affect client config functionality and vice versa.

## **Current Isolation Status**

### ✅ **Fully Isolated (No Risk)**
- **Demo Pages**: Use inline CSS variables, no external dependencies
- **Client Configs**: Use `useClientConfig` hook and `ClientApp` component
- **Routing**: Demo pages are separate routes (`/embrkit-*`)

### ⚠️ **Shared Dependencies (Monitor)**
- **EmbrKit Components**: Both use `@embr/ui` package
- **CSS Variables**: Demo pages override with inline styles

## **Isolation Guardrails**

### 1. **Demo Page Isolation Rules**
```typescript
// ✅ CORRECT: Demo pages use inline CSS variables
const demoStyles = `
  :root {
    --embr-primary-color: #0F766E;
    --embr-background: #101926;
    // ... all variables defined inline
  }
`;

// ❌ WRONG: Demo pages should NEVER use global CSS variables
<div style={{ backgroundColor: 'var(--embr-background)' }}>
```

### 2. **Client Config Isolation Rules**
```typescript
// ✅ CORRECT: Client configs use useClientConfig hook
const { config } = useClientConfig();
<ClientApp config={config} />

// ❌ WRONG: Client configs should NEVER import demo-specific code
import { DemoComponent } from '../embrkit-demo/components';
```

### 3. **Component Library Isolation**
- **Demo Pages**: Can use any EmbrKit components for showcasing
- **Client Configs**: Use EmbrKit components via `ClientApp` wrapper
- **Changes to EmbrKit**: Must be backward compatible

## **Development Workflow**

### **When Working on Demo Pages:**
1. ✅ Use inline CSS variables only
2. ✅ Import `@embr/ui` for components
3. ✅ Test demo pages independently
4. ❌ Never modify global CSS variables
5. ❌ Never import client config code

### **When Working on Client Configs:**
1. ✅ Use `useClientConfig` hook
2. ✅ Test with real client configs (WILDROOTS2025, etc.)
3. ✅ Use `ClientApp` component wrapper
4. ❌ Never import demo-specific code
5. ❌ Never modify demo page styling

## **Testing Isolation**

### **Demo Page Changes Test:**
```bash
# 1. Make changes to demo pages
# 2. Test demo pages work correctly
# 3. Test client configs still work (WILDROOTS2025)
# 4. Verify no visual regressions in client apps
```

### **Client Config Changes Test:**
```bash
# 1. Make changes to client config system
# 2. Test client configs work correctly
# 3. Test demo pages still work
# 4. Verify no visual regressions in demos
```

## **File Organization**

### **Demo Pages** (Isolated)
```
packages/hub-app/src/app/
├── embrkit-demo/page.tsx          # ✅ Independent
├── embrkit-components-demo/page.tsx # ✅ Independent  
├── embrkit-themes-demo/page.tsx   # ✅ Independent
```

### **Client Config System** (Isolated)
```
packages/hub-app/src/
├── hooks/useClientConfig.tsx      # ✅ Client config logic
├── components/ClientApp.tsx       # ✅ Client app wrapper
├── types/client.ts               # ✅ Client config types
└── app/page.tsx                  # ✅ Hub with client config loading
```

## **Emergency Isolation Recovery**

If isolation is broken:

### **Reset Demo Pages:**
```bash
# Revert demo pages to use inline CSS variables only
git checkout HEAD -- packages/hub-app/src/app/embrkit-*-demo/
```

### **Reset Client Configs:**
```bash
# Revert client config system
git checkout HEAD -- packages/hub-app/src/hooks/useClientConfig.tsx
git checkout HEAD -- packages/hub-app/src/components/ClientApp.tsx
```

## **Monitoring Isolation**

### **Automated Checks:**
- Demo pages should not import client config code
- Client configs should not import demo-specific code
- Demo pages should use inline CSS variables only

### **Manual Checks:**
- Demo page changes don't affect client app styling
- Client config changes don't affect demo page styling
- Both systems work independently

## **Best Practices**

1. **Always test both systems** when making changes
2. **Use feature flags** for experimental changes
3. **Document any shared dependencies**
4. **Keep demo pages as pure showcases**
5. **Keep client configs as production-ready**
