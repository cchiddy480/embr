# EmbrKit Design System

**EmbrKit** is Embr's comprehensive design system and component library, built on mathematical precision (Golden Ratio φ = 1.618) with modern, bold aesthetics.

## 🎯 Philosophy

- **Modern but not trendy** - Clean, confident design with mathematical precision
- **Direct without being cold** - Bold, rectangular aesthetic with substantial presence  
- **Minimal yet warm** - Generous whitespace, Inter typography, perfect readability

## 🚀 Quick Start

### Installation

```bash
npm install @embr/ui
```

### Basic Usage

```tsx
import React from 'react';
import { EmbrKitProvider, EmbrKitButton } from '@embr/ui';

function App() {
  return (
    <EmbrKitProvider>
      <div className="embr-container">
        <h1 className="embr-h1">Welcome to EmbrKit</h1>
        <EmbrKitButton variant="primary">
          Get Started
        </EmbrKitButton>
      </div>
    </EmbrKitProvider>
  );
}
```

### Import Styles Only

If you prefer to use just the CSS classes without React components:

```tsx
import '@embr/ui'; // Imports all EmbrKit styles
```

## 🎨 Theming

### Default Theme

EmbrKit comes with Embr's official brand theme out of the box:

- **Colors**: Embr Teal (#0F766E), Deep Charcoal (#1F2937), Cream White (#FEFEFE)
- **Typography**: Inter font family with golden ratio sizing
- **Spacing**: Mathematical progression based on φ = 1.618

### Custom Theming

```tsx
import { EmbrKitProvider } from '@embr/ui';

const customTheme = {
  colors: {
    primary: '#FF5733',
    accent: '#33C3FF',
    background: '#FAFAFA'
  },
  fonts: {
    heading: 'Playfair Display',
    body: 'Inter'
  }
};

function App() {
  return (
    <EmbrKitProvider initialTheme={customTheme}>
      {/* Your app */}
    </EmbrKitProvider>
  );
}
```

### Runtime Theme Updates

```tsx
import { useEmbrKitTheme } from '@embr/ui';

function ThemeControls() {
  const { updateTheme } = useEmbrKitTheme();

  const changeAccent = () => {
    updateTheme({
      colors: { accent: '#FF6B35' }
    });
  };

  return <button onClick={changeAccent}>Change Accent</button>;
}
```

## 🧩 Components

### EmbrKitButton

```tsx
import { EmbrKitButton } from '@embr/ui';

<EmbrKitButton variant="primary" size="lg">
  Primary Button
</EmbrKitButton>

<EmbrKitButton variant="secondary">
  Secondary Button  
</EmbrKitButton>

<EmbrKitButton variant="text">
  Text Button
</EmbrKitButton>
```

## 🎭 CSS Classes

EmbrKit provides utility classes for consistent styling:

### Typography
- `.embr-h1`, `.embr-h2` - Headings
- `.embr-body`, `.embr-caption` - Body text
- `.embr-text-primary`, `.embr-text-secondary` - Text colors

### Layout
- `.embr-container` - Main container with max-width
- `.embr-space-*` - Spacing utilities (1-16)
- `.embr-radius-*` - Border radius utilities

### Colors
- `.embr-bg-primary`, `.embr-bg-surface` - Background colors
- `.embr-text-on-dark`, `.embr-text-accent` - Text color utilities

## 📐 Design Tokens

All design tokens are available as CSS custom properties:

```css
/* Colors */
--embr-teal: #0F766E;
--embr-deep-charcoal: #1F2937;
--embr-cream-white: #FEFEFE;

/* Typography */
--embr-h1-size: 3rem;
--embr-h2-size: 2rem;
--embr-body-size: 1.125rem;

/* Spacing (Golden Ratio) */
--embr-space-4: 1rem;
--embr-space-6: 1.272rem;
--embr-space-8: 1.618rem;
```

## 🏗️ Architecture

### For Hub Apps & Config-Driven Clients
- Use default EmbrKit theme
- Allow limited customization (accent, logo, background)
- Maintain consistent Embr branding

### For Standalone & Premium Clients  
- Full theme customization available
- Custom fonts, colors, and components
- Built on EmbrKit foundation for consistency

## 📚 API Reference

### EmbrKitProvider Props
- `children`: React.ReactNode
- `initialTheme?`: EmbrKitTheme

### EmbrKitTheme Interface
```tsx
interface EmbrKitTheme {
  colors?: {
    primary?: string;
    accent?: string;
    background?: string;
    surface?: string;
    text?: string;
    textSecondary?: string;
  };
  fonts?: {
    heading?: string;
    body?: string;
  };
  spacing?: Record<string, string>;
  borderRadius?: Record<string, string>;
}
```

## 🔧 Development

This package is part of the Embr monorepo. For development:

```bash
# Install dependencies
npm install

# Run in watch mode
npm run dev

# Build package
npm run build
```

## 📄 License

MIT © Embr Platform

---

**Built with mathematical precision. Designed for modern applications.** 