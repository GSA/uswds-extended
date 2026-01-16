# USWDS Brand Extension System

## Claude's Analysis & Critique

> **Note:** This section was added after analyzing the existing USWDS codebase. The original plan follows below with recommendations.

### What USWDS Already Has (The Plan Overlooked This)

After examining the codebase, I found that USWDS v3.x already has a sophisticated utility system that the original plan doesn't acknowledge:

1. **Comprehensive Utility Generator** (`packages/uswds-utilities/`)
   - 60+ utility categories: margin, padding, flex, display, width, height, colors, borders, shadows, positioning, etc.
   - Palette-based value system for colors, spacing, typography
   - Configurable output per utility

2. **Responsive Variants Already Exist**
   - Breakpoints: `mobile-lg`, `tablet`, `tablet-lg`, `desktop`, `desktop-lg`, `widescreen`
   - Per-utility responsive toggle: `responsive: true/false`
   - Prefix separator already uses `\:` (like Tailwind)

3. **State Variants Already Exist**
   - `hover`, `focus`, `active`, `visited` per utility
   - Example: `hover:bg-primary`

4. **Negative Values Already Exist**
   - Via `$neg-prefix` in spacing tokens
   - Already generates `-1px`, `-05`, `-1`, `-2`, etc.

5. **Spacing System**
   - Uses 8px base unit (not 4px like Tailwind)
   - Already has fractional units: `05`, `105`, `205` (= 0.5, 1.5, 2.5)
   - Negative values included

6. **Color Cascade**
   - `$global-color-palettes` already cascades to bg, text, border, decoration
   - Extensive system colors and theme colors

### What's Actually Missing (The Real Gaps)

| Feature | Status | Implementation Complexity |
|---------|--------|--------------------------|
| **Arbitrary values `[...]`** | Not present | High (requires build tooling) |
| **Stacked modifiers** `hover:md:bg-blue` | Partial (one level) | Medium |
| **Opacity modifier** `bg-blue-500/75` | Not present | Medium |
| **`@apply` directive** | Not present | High (PostCSS plugin) |
| **`theme()` function** | Partial (Sass only) | Low (enhance existing) |
| **Fractional widths** `w-1/2` | Limited | Low |
| **JIT generation** | Not present | Very High |
| **Group/peer modifiers** | Not present | Medium |
| **Finer spacing scale** | Different scale | Low |
| **Modern viewport units** `dvh`, `svh` | Not present | Low |

### Critical Recommendations

1. **Don't Recreate - Extend**
   The plan proposes a parallel system. Instead, extend `packages/uswds-utilities/`:
   - Add new palettes to existing utility rules
   - Add new rules following existing patterns
   - Use the existing `$utilities-package` aggregation

2. **Defer JIT**
   Building a JIT engine is a multi-month project. Start with:
   - Static utility expansion (achievable)
   - PurgeCSS for tree-shaking (proven solution)
   - Consider JIT as Phase 2 after core utilities work

3. **Integrate with USWDS Build System**
   - Use Gulp tasks (not custom build scripts)
   - Follow existing Sass module patterns (`@use`, `@forward`)
   - Integrate with existing Storybook for testing

4. **Prioritize by Impact vs Effort**
   - **Quick wins:** Fractional widths, modern viewport units, opacity utilities
   - **Medium effort:** Enhanced color cascade, more spacing values
   - **Defer:** JIT, arbitrary values, `@apply` (need PostCSS)

### Revised Implementation Priority

**Phase 1: Low-Hanging Fruit (Extend Existing System)**
- Add fractional width/height utilities
- Add modern viewport units (dvh, svh, lvh)
- Add gap utilities
- Expand spacing scale with finer gradations
- Add opacity modifier support to colors

**Phase 2: Enhanced Modifiers**
- Enable more responsive variants by default
- Add `group-hover`, `peer-focus` patterns
- Stacked modifier support (may need generator changes)

**Phase 3: Build Tooling (Future)**
- Arbitrary value scanner (PostCSS)
- `@apply` directive (PostCSS)
- JIT engine (if static proves too large)

---

## Original Plan

*(The following is the original plan, preserved for reference)*

---

## Project Vision

Transform USWDS from a rigid component library into a flexible, Tailwind-competitive design system while maintaining full government compliance. This isn't about adding a few color utilities—it's about closing the fundamental DX gaps that make Tailwind so productive.

---

## The Problem: USWDS vs Tailwind Gap Analysis

Before building anything, understand what we're solving. These are the specific capabilities Tailwind provides that USWDS lacks:

### 1. Arbitrary Value Syntax `[...]`

**Tailwind:** Use any value without touching config
```html
<div class="w-[137px] mt-[23px] bg-[#1a2b3c] text-[clamp(1rem,2vw,1.5rem)]">
```

**USWDS:** You're stuck with predefined tokens or writing custom CSS

**Gap:** No escape hatch for one-off values. Every deviation requires custom CSS.

---

### 2. Unified Spacing Scale (4pt Grid)

**Tailwind:** Single scale used everywhere, mathematical relationships
```
0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24...
(maps to 0, 0.125rem, 0.25rem, 0.375rem, 0.5rem...)
```

**USWDS:** Uses "units" (1 unit = 8px) but inconsistent across properties
- Spacing: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30
- Different scales for different properties

**Gap:** No unified mental model. Can't predict what values exist.

---

### 3. Composable Modifier Stacking

**Tailwind:** Chain any modifiers in any order
```html
<div class="hover:md:dark:focus:bg-blue-500">
```

**USWDS:** Single-purpose classes, no composition
```html
<!-- Must write custom CSS for combined states -->
```

**Gap:** Can't express complex responsive + state combinations.

---

### 4. Negative Values

**Tailwind:** Prefix with `-` for negative
```html
<div class="-mt-4 -translate-x-1/2 -rotate-45">
```

**USWDS:** No negative utilities

**Gap:** Can't do overlap layouts, centering tricks, or pull elements without custom CSS.

---

### 5. Fractional & Calculated Sizing

**Tailwind:** Percentages, viewport units, calculations
```html
<div class="w-1/2 w-1/3 w-2/5 w-full h-screen min-h-[calc(100vh-64px)]">
```

**USWDS:** Limited width utilities, no fractions

**Gap:** Responsive layouts require custom CSS.

---

### 6. JIT / On-Demand Generation

**Tailwind:** Scans your code, generates only what's used

**USWDS:** Ships entire library or manual subsetting

**Gap:** Bloated CSS or tedious configuration.

---

### 7. Opacity Modifier Syntax

**Tailwind:** Inline opacity with `/`
```html
<div class="bg-blue-500/75 text-black/50 border-white/25">
```

**USWDS:** No opacity utilities for colors

**Gap:** Can't create layered, translucent designs without custom CSS.

---

### 8. Theme Function & @apply

**Tailwind:** Reference tokens in custom CSS
```css
.custom-thing {
  color: theme('colors.blue.500');
  @apply px-4 py-2 rounded-lg;
}
```

**USWDS:** Must use SCSS variables (less portable)

**Gap:** Harder to extend consistently.

---

### 9. Color Cascade on Custom Values

**Tailwind:** Add a color, get all utilities automatically
```js
// tailwind.config.js
colors: {
  'brand': '#ff5722'  // Instantly get bg-brand, text-brand, border-brand, etc.
}
```

**USWDS:** Adding colors requires manually creating each utility

**Gap:** Branding requires extensive manual work.

---

### 10. Sensible Defaults + Easy Overrides

**Tailwind:** Works beautifully out of box, every value is overridable

**USWDS:** Requires understanding USWDS settings architecture to customize

**Gap:** Steep learning curve for customization.

---

## Implementation Strategy

### Guiding Principles

1. **Additive, not destructive** - USWDS stays intact, we layer on top
2. **Compliance-preserving** - Government accessibility standards are non-negotiable
3. **Progressive adoption** - Use as much or little as needed
4. **Zero-config useful** - Works immediately, configuration enhances
5. **Tooling-aware** - Designed for Claude Code to extend

---

## Phase 1: Foundation Layer

### 1.1 Unified Token System

Create a single source of truth that normalizes USWDS tokens and allows extension:

```scss
// tokens/_spacing.scss
// Unified 4pt grid - same scale for margin, padding, gap, width, height
$spacing: (
  '0': 0,
  'px': 1px,
  '0.5': 0.125rem,   // 2px
  '1': 0.25rem,      // 4px
  '1.5': 0.375rem,   // 6px
  '2': 0.5rem,       // 8px  (= 1 USWDS unit)
  '2.5': 0.625rem,   // 10px
  '3': 0.75rem,      // 12px
  '3.5': 0.875rem,   // 14px
  '4': 1rem,         // 16px (= 2 USWDS units)
  '5': 1.25rem,      // 20px
  '6': 1.5rem,       // 24px (= 3 USWDS units)
  // ... continue to 96 (24rem)
);

// Map USWDS units to our scale for reference
$uswds-unit-map: (
  1: '2',    // 1 USWDS unit = spacing-2
  2: '4',    // 2 USWDS units = spacing-4
  3: '6',    // etc.
);
```

**Claude Code Task:** 
- Generate complete spacing scale from 0 to 96 (24rem)
- Include fractional values (0.5, 1.5, 2.5, 3.5)
- Document USWDS unit equivalents
- Generate CSS custom properties for all values

### 1.2 Color System with Cascade

```scss
// tokens/_colors.scss
$colors: (
  // Brand colors - these cascade to all utilities
  'brand': (
    '50': #eff6ff,
    '100': #dbeafe,
    '200': #bfdbfe,
    '300': #93c5fd,
    '400': #60a5fa,
    '500': #3b82f6,   // Base
    '600': #2563eb,
    '700': #1d4ed8,
    '800': #1e40af,
    '900': #1e3a8a,
    '950': #172554,
  ),
  
  // Preserve USWDS palette (prefixed or aliased)
  'uswds-primary': #005ea2,
  'uswds-primary-light': #73b3e7,
  // ... all USWDS colors
);

// Opacity steps for color/opacity syntax
$opacity-values: (0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100);
```

**Claude Code Task:**
- Support both nested shade syntax (`brand-500`) and flat names (`uswds-primary`)
- Generate utilities for: bg, text, border, outline, ring, fill, stroke, decoration, accent, caret, placeholder, shadow, divide
- Generate opacity variants: `bg-brand-500/75`
- Validate contrast ratios and warn on compile

### 1.3 Breakpoint Alignment

```scss
// tokens/_breakpoints.scss
// Use USWDS breakpoints but with Tailwind-style naming option
$breakpoints: (
  'sm': 640px,       // tablet in USWDS
  'md': 768px,       // between tablet and tablet-lg
  'lg': 1024px,      // desktop in USWDS
  'xl': 1280px,      // desktop-lg in USWDS
  '2xl': 1400px,     // widescreen in USWDS
);

// USWDS aliases (use either naming convention)
$breakpoint-aliases: (
  'mobile': 'sm',
  'tablet': 'sm',
  'tablet-lg': 'md',
  'desktop': 'lg',
  'desktop-lg': 'xl',
  'widescreen': '2xl',
);
```

---

## Phase 2: Utility Generator

### 2.1 Core Generator Architecture

```scss
// generator/_core.scss
// Generate utilities with variants

@mixin generate-utility($property, $class-prefix, $values, $variants: ()) {
  @each $key, $value in $values {
    .#{$class-prefix}-#{$key} {
      #{$property}: $value;
    }
    
    // Responsive variants
    @if list.index($variants, 'responsive') {
      @each $bp-name, $bp-value in $breakpoints {
        @media (min-width: $bp-value) {
          .#{$bp-name}\:#{$class-prefix}-#{$key} {
            #{$property}: $value;
          }
        }
      }
    }
    
    // State variants
    @if list.index($variants, 'hover') {
      .hover\:#{$class-prefix}-#{$key}:hover {
        #{$property}: $value;
      }
    }
    // ... focus, active, disabled, etc.
  }
}
```

### 2.2 Arbitrary Value Support

This is critical. Must support `[arbitrary]` syntax:

```scss
// generator/_arbitrary.scss
// PostCSS plugin or build-time scanner needed

// In HTML: class="w-[137px] mt-[2.5rem] bg-[#ff5722]"
// Scanner extracts these and generates:
// .w-\[137px\] { width: 137px; }
// .mt-\[2\.5rem\] { margin-top: 2.5rem; }
// .bg-\[\#ff5722\] { background-color: #ff5722; }
```

**Claude Code Task:**
- Create a PostCSS plugin OR build script that:
  1. Scans source files for `[...]` patterns in class attributes
  2. Parses the arbitrary values
  3. Generates corresponding CSS
  4. Escapes special characters in selectors
- Handle edge cases: calc(), var(), clamp(), url()

### 2.3 Negative Value Support

```scss
// generator/_negative.scss
@mixin generate-negative-utility($property, $class-prefix, $values) {
  @each $key, $value in $values {
    @if $value != 0 {
      .-#{$class-prefix}-#{$key} {
        #{$property}: -#{$value};
      }
    }
  }
}

// Usage
@include generate-negative-utility('margin-top', 'mt', $spacing);
// Generates: .-mt-1, .-mt-2, .-mt-4, etc.
```

### 2.4 Fractional Sizing

```scss
// generator/_fractions.scss
$fractions: (
  '1/2': 50%,
  '1/3': 33.333333%,
  '2/3': 66.666667%,
  '1/4': 25%,
  '2/4': 50%,
  '3/4': 75%,
  '1/5': 20%,
  '2/5': 40%,
  '3/5': 60%,
  '4/5': 80%,
  '1/6': 16.666667%,
  '5/6': 83.333333%,
  '1/12': 8.333333%,
  // ... etc
  'full': 100%,
  'screen': 100vw,
  'svw': 100svw,
  'lvw': 100lvw,
  'dvw': 100dvw,
  'min': min-content,
  'max': max-content,
  'fit': fit-content,
);

// Height-specific
$height-fractions: (
  'screen': 100vh,
  'svh': 100svh,
  'lvh': 100lvh,
  'dvh': 100dvh,
);
```

---

## Phase 3: Modifier System

### 3.1 Composable Variants

```scss
// modifiers/_compose.scss
// Enable: hover:md:dark:bg-blue-500

$variant-order: ('responsive', 'dark', 'hover', 'focus', 'active', 'disabled', 'group-hover');

// Generator handles nested variants
@mixin with-variants($variants...) {
  // Generates all permutations needed
  // Actual implementation requires build-time processing
}
```

**Claude Code Task:**
- Design a system where variants can stack
- Decide: Generate all permutations (bloated) or JIT-only (requires tooling)?
- Recommendation: JIT approach with a scanner

### 3.2 Group & Peer Modifiers

```html
<!-- Tailwind pattern we should support -->
<div class="group">
  <p class="group-hover:text-blue-500">Changes on parent hover</p>
</div>

<input class="peer" />
<p class="peer-focus:text-green-500">Changes when input focused</p>
```

```scss
// modifiers/_group-peer.scss
.group:hover .group-hover\:text-blue-500 {
  color: theme('colors.blue.500');
}

.peer:focus ~ .peer-focus\:text-green-500 {
  color: theme('colors.green.500');
}
```

---

## Phase 4: Developer Experience

### 4.1 Theme Function

```scss
// functions/_theme.scss
@function theme($path) {
  // theme('colors.brand.500') → #3b82f6
  // theme('spacing.4') → 1rem
  // Traverses token maps
}

// Usage in custom CSS
.custom-component {
  padding: theme('spacing.4');
  color: theme('colors.brand.600');
  border-radius: theme('borderRadius.lg');
}
```

### 4.2 @apply Directive

```scss
// functions/_apply.scss
// PostCSS plugin to enable @apply

// Input:
.btn-primary {
  @apply px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600;
}

// Output:
.btn-primary {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #3b82f6;
  color: #ffffff;
  border-radius: 0.5rem;
}
.btn-primary:hover {
  background-color: #2563eb;
}
```

**Claude Code Task:**
- Create PostCSS plugin for @apply
- Handle variant utilities correctly (hover:, focus:, etc.)
- Warn if applying utilities that don't exist

### 4.3 VS Code / Editor Integration

```json
// .vscode/settings.json recommendations
{
  "tailwindCSS.experimental.classRegex": [
    ["class=\"([^\"]*)", "[^\"]*"]
  ],
  "css.customData": [".vscode/uswds-brand.css-data.json"]
}
```

**Claude Code Task:**
- Generate CSS custom data file for IntelliSense
- Document editor setup for autocomplete

---

## Phase 5: Build Tooling

### 5.1 JIT Engine

```js
// build/jit-engine.js
// Scans source files, generates only used CSS

const scanner = {
  // Regex patterns for class extraction
  patterns: [
    /class="([^"]*)"/g,
    /class='([^']*)'/g,
    /className="([^"]*)"/g,
    /className={`([^`]*)`}/g,
  ],
  
  // Arbitrary value pattern
  arbitraryPattern: /(\w+)-\[([^\]]+)\]/g,
};

// Output: Minimal CSS with only used utilities
```

### 5.2 PurgeCSS Configuration

```js
// build/purge.config.js
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,vue,svelte}'],
  safelist: {
    standard: [/^usa-/],  // Preserve all USWDS
    deep: [],
    greedy: [],
  },
  extractors: [
    {
      extractor: content => content.match(/[\w-/:[\]#]+/g) || [],
      extensions: ['html', 'js', 'jsx'],
    },
  ],
};
```

### 5.3 Build Scripts

```json
// package.json scripts
{
  "scripts": {
    "dev": "node build/watch.js",
    "build": "node build/compile.js && node build/purge.js",
    "analyze": "node build/analyze.js"  // Show what's generated, file size
  }
}
```

---

## Phase 6: USWDS Integration

### 6.1 Specificity Management

```scss
// integration/_specificity.scss
// Ensure brand utilities can override USWDS when intended

// USWDS uses low specificity (0,1,0 typically)
// Our utilities should match or exceed only when necessary

// Safe overrides (works)
.usa-button.bg-brand-500 {
  background-color: var(--color-brand-500);
}

// For !important cases (avoid if possible)
.bg-brand-500\! {
  background-color: var(--color-brand-500) !important;
}
```

### 6.2 Component Compatibility Layer

```scss
// integration/_components.scss
// Helpers for common USWDS + utility combinations

// Example: Branded USWDS button
.usa-button--brand {
  @apply bg-brand-500 hover:bg-brand-600 focus:ring-brand-300;
}

// Example: Custom card using USWDS base
.usa-card--elevated {
  @apply shadow-lg hover:shadow-xl transition-shadow;
}
```

### 6.3 Token Sync

```scss
// integration/_sync.scss
// Keep brand tokens aligned with USWDS settings

// Read from USWDS settings
@use 'uswds-core' as uswds;

// Map USWDS tokens to brand system
$synced-colors: (
  'uswds-primary': uswds.$theme-color-primary,
  'uswds-secondary': uswds.$theme-color-secondary,
  // ...
);
```

---

## Architecture Overview

```
/uswds-brand-extension
├── /tokens
│   ├── _spacing.scss       # Unified spacing scale
│   ├── _colors.scss        # Color definitions + cascade
│   ├── _typography.scss    # Font scale, line-height, tracking
│   ├── _breakpoints.scss   # Responsive breakpoints
│   ├── _borders.scss       # Border widths, radii
│   ├── _shadows.scss       # Box shadow scale
│   └── _index.scss         # Token exports
│
├── /generator
│   ├── _core.scss          # Main utility generator
│   ├── _arbitrary.scss     # [...] value support
│   ├── _negative.scss      # Negative value utilities
│   ├── _fractions.scss     # Fractional sizing
│   └── _index.scss
│
├── /modifiers
│   ├── _responsive.scss    # Breakpoint variants
│   ├── _states.scss        # hover, focus, active, etc.
│   ├── _dark.scss          # Dark mode variant
│   ├── _group-peer.scss    # Group/peer modifiers
│   └── _index.scss
│
├── /functions
│   ├── _theme.scss         # theme() function
│   ├── _apply.scss         # @apply support (PostCSS)
│   └── _index.scss
│
├── /integration
│   ├── _uswds-preserve.scss  # Original USWDS colors
│   ├── _specificity.scss     # Override management
│   ├── _components.scss      # USWDS component helpers
│   └── _index.scss
│
├── /build
│   ├── jit-engine.js       # On-demand generation
│   ├── scanner.js          # Class extraction
│   ├── arbitrary.js        # Arbitrary value parser
│   ├── compile.js          # SCSS compilation
│   ├── purge.js            # Tree-shaking
│   └── watch.js            # Dev server
│
├── /dist
│   ├── brand-utilities.css       # Full build
│   ├── brand-utilities.min.css   # Minified
│   └── brand-utilities.jit.css   # JIT output
│
├── index.scss              # Main entry
├── CLAUDE.md               # This file
└── package.json
```

---

## Claude Code Instructions

### When Working on This Project

1. **Analyze before implementing** - Before adding any utility category, check:
   - Does USWDS already provide this?
   - What's the Tailwind equivalent?
   - What's the gap we're filling?

2. **Maintain token consistency** - All values must trace back to token files

3. **Test with real USWDS components** - Every feature must work alongside `usa-*` classes

4. **Document gaps discovered** - If you find new USWDS limitations, add them to the gap analysis

5. **Prefer JIT over static generation** - Don't generate massive CSS files

6. **Accessibility is non-negotiable** - Warn on contrast failures, preserve focus states

### Discovery Tasks for Claude Code

When extending this system, Claude should:

1. **Audit USWDS source** - What utilities exist? What's missing?
2. **Compare Tailwind categories** - For each Tailwind utility group, what's the USWDS equivalent?
3. **Identify escape hatches needed** - Where do developers most need arbitrary values?
4. **Test edge cases** - Complex selectors, specificity conflicts, CSS custom property support

### Example Prompt for Claude Code

> "Analyze the USWDS flex utilities and compare to Tailwind. Document what's missing, then implement a gap-filling utility set that maintains USWDS breakpoint naming but adds Tailwind's flex utility completeness. Include arbitrary value support for flex-basis."

---

## Testing Checklist

### Tokens
- [ ] Spacing scale is complete (0-96)
- [ ] All colors generate cascade utilities
- [ ] Opacity modifiers work (color/opacity syntax)
- [ ] CSS custom properties generated for all tokens

### Utilities
- [ ] All utility types generate correctly
- [ ] Arbitrary values work: `class="w-[137px]"`
- [ ] Negative values work: `class="-mt-4"`
- [ ] Fractions work: `class="w-1/2"`

### Modifiers
- [ ] Responsive variants at all breakpoints
- [ ] State variants (hover, focus, active, disabled)
- [ ] Stacked variants: `hover:md:bg-blue-500`
- [ ] Group/peer modifiers work

### Integration
- [ ] Works alongside vanilla USWDS
- [ ] No specificity conflicts
- [ ] USWDS components can use brand utilities
- [ ] Original USWDS colors preserved with prefix

### Build
- [ ] JIT generates minimal CSS
- [ ] PurgeCSS removes unused utilities
- [ ] Source maps work
- [ ] Build time is acceptable (<5s)

---

## Future Considerations

- [ ] Figma token export/import
- [ ] Design system documentation generator
- [ ] Visual regression testing
- [ ] Multi-theme support (beyond dark mode)
- [ ] Container queries
- [ ] CSS layers integration
- [ ] Animation utilities
- [ ] Logical properties (start/end vs left/right)

---

## Revised Implementation Plan (Claude's Recommendation)

Based on my analysis, here's a practical implementation plan that works **with** USWDS rather than around it.

### Phase 1: Extend Existing Utilities

**Location:** `packages/uswds-utilities/src/styles/`

#### 1.1 Add Fractional Width/Height Utilities

Create `rules/width-fractions.scss`:
```scss
$u-width-fractions: (
  width-fractions: (
    base: "width",
    modifiers: (noModifier: ""),
    values: (
      "1\\/2": 50%,
      "1\\/3": 33.333333%,
      "2\\/3": 66.666667%,
      "1\\/4": 25%,
      "3\\/4": 75%,
      "1\\/5": 20%,
      "2\\/5": 40%,
      "3\\/5": 60%,
      "4\\/5": 80%,
      "1\\/6": 16.666667%,
      "5\\/6": 83.333333%,
      "full": 100%,
    ),
    settings: $width-settings-complete,
    property: "width",
    type: "utility",
  ),
);
```

#### 1.2 Add Modern Viewport Units

Extend `rules/height.scss` and `rules/width.scss`:
```scss
// Add to height values
"dvh": 100dvh,
"svh": 100svh,
"lvh": 100lvh,

// Add to width values
"dvw": 100dvw,
"svw": 100svw,
"lvw": 100lvw,
```

#### 1.3 Add Gap Utilities

Create `rules/gap.scss`:
```scss
$u-gap: (
  gap: (
    base: "gap",
    modifiers: (
      noModifier: "",
      "x": "-column",
      "y": "-row",
    ),
    values: map-collect(get-palettes($padding-palettes)), // reuse padding scale
    settings: $gap-settings-complete,
    property: "gap",
    type: "utility",
  ),
);
```

#### 1.4 Add Opacity Utilities to Colors

Create new palette in `palettes/colors/_opacity-palettes.scss`:
```scss
// Generate bg-{color}/{opacity} utilities
// This requires a mixin modification to support slash syntax
```

### Phase 2: Expand Token Scales

**Location:** `packages/uswds-core/src/styles/tokens/`

#### 2.1 Finer Spacing Scale

Add to `tokens/units/spacing.scss`:
```scss
"extra-small": (
  "025": spacing-multiple(0.25),  // 2px
  "075": spacing-multiple(0.75),  // 6px
  "125": spacing-multiple(1.25),  // 10px
  // etc.
),
```

#### 2.2 Extended Color Opacity

Add opacity scale for color utilities:
```scss
$opacity-scale: (0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100);
```

### Phase 3: Enhanced Modifiers

#### 3.1 Enable More Responsive Variants

Update `settings/_settings-utilities.scss` defaults:
```scss
// Change default responsive from false to true for key utilities
$flex-settings-complete: map.merge(
  (responsive: true, ...),
  $flex-settings
);
```

#### 3.2 Add Group/Peer Support

Create `packages/uswds-utilities/src/styles/rules/group-peer.scss`:
```scss
// .group:hover .group-hover\:bg-primary { ... }
// .peer:focus ~ .peer-focus\:text-secondary { ... }
```

### Phase 4: Build Integration (Optional)

#### 4.1 PurgeCSS Configuration

Add to `gulpfile.js`:
```js
const purgecss = require('@fullhuman/postcss-purgecss');

// Add to PostCSS pipeline for production builds
```

#### 4.2 CSS Custom Properties Export

Enhance `_properties.scss` to export all tokens as CSS variables.

### File Changes Summary

```
packages/uswds-utilities/
├── src/styles/
│   ├── rules/
│   │   ├── width-fractions.scss    [NEW]
│   │   ├── gap.scss                [NEW]
│   │   ├── group-peer.scss         [NEW]
│   │   ├── height.scss             [MODIFY - add dvh/svh/lvh]
│   │   ├── width.scss              [MODIFY - add dvw/svw/lvw]
│   │   └── _package.scss           [MODIFY - add new utilities]
│   └── palettes/
│       └── _spacing-palettes.scss  [MODIFY - add finer scale]

packages/uswds-core/
├── src/styles/
│   ├── tokens/units/
│   │   └── spacing.scss            [MODIFY - add granular values]
│   └── settings/
│       └── _settings-utilities.scss [MODIFY - enable more responsive]
```

### Testing Strategy

1. **Unit Tests:** Use sass-true to test utility generation
2. **Visual Tests:** Storybook stories for new utilities
3. **Integration:** Test alongside existing `usa-*` components
4. **Bundle Size:** Monitor CSS output size

### Success Criteria

- [ ] All new utilities follow USWDS naming conventions
- [ ] Responsive variants work: `tablet:w-1/2`
- [ ] State variants work: `hover:bg-primary`
- [ ] No conflicts with existing USWDS utilities
- [ ] Build passes: `npm run build`
- [ ] Tests pass: `npm test`
- [ ] Bundle size increase < 20KB (gzipped)

---

## Getting Started

To implement this plan:

```bash
# 1. Ensure clean build first
npm install
npm run build

# 2. Start with Phase 1.1 (fractional widths)
# Create the new rule file and add to package

# 3. Test incrementally
npm run build
npm run test:sass
```

Would you like me to proceed with implementation starting from Phase 1?
