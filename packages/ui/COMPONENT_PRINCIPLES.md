# Embr UI Component Development Principles

## 1. Consistent Sizing & Spacing
- Use generous padding, margin, and min-heights for touch targets.
- Maintain large border radii (rounded-2xl/16px) for all interactive elements and cards.

## 2. Typography
- Use Inter (or client font) with bold weights for headings and buttons.
- Clear hierarchy: larger, bolder for primary actions; regular for secondary info.

## 3. Color & Theming
- Default to Embr teal/dark mode, but always use theme tokens for easy overrides.
- Subtle glows and shadows for focus/active states.

## 4. Component Structure
- All components (Card, Input, Tab, Avatar, etc.) should be self-contained, minimal, and accept theme/context.
- Use Tailwind for rapid, consistent styling.

## 5. Reference Image Fidelity
- Match the visual style of reference images: soft, modern, minimal, with clear separation and strong call-to-action elements.

## 6. Accessibility
- Ensure all components are keyboard accessible and use appropriate ARIA roles.
- Provide visible focus states and sufficient color contrast.

## 7. Modularity & Composability
- Components should be composable and layer easily to build micro apps.
- Avoid unnecessary abstraction; clarity and purpose-built design are priorities.

## 8. Theming & Branding
- All components must accept a theme/config prop (or use context/provider) for:
  - Primary/Accent Colors
  - Typography (font family, weight)
  - Button style (filled, outline, ghost)
  - Backgrounds (solid, gradient, image)
  - Iconography (optional)
- Use CSS variables or Tailwind’s theming system for dynamic styling.
- Provide a clear API for clients to inject their branding (via config, not code).

## 9. Config-Driven, Not Code-Driven
- All branding and theming is controlled by config, not by forking or rewriting code.
- Launch a new branded app by duplicating a config, swapping out colors, fonts, and logos, and deploying instantly—no code changes required.

## 10. Tiered Productization
- Lowest tier: Embr default theme, minimal branding options.
- Higher tiers: Unlock more branding controls (colors, fonts, icons, backgrounds, etc.).
- Enforced at the config/UI level, not by splitting codebases.

---

_Use this document as a reference for all future Embr UI component development to ensure consistency, scalability, and brandability._ 