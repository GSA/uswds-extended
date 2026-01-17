# USWDS Extended - AI Development Guide

## System Overview

USWDS Extended is a fork of the U.S. Web Design System (USWDS) that adds comprehensive utility classes. It provides **Tailwind-inspired utilities** while maintaining USWDS conventions.

> **Important**: This system uses **USWDS naming conventions** for core utilities, not Tailwind shorthand. See the naming section below.

---

## Quick Start

```html
<!-- USWDS Extended uses USWDS-style naming for core utilities -->
<div class="display-flex flex-align-center flex-justify-between gap-4">
  <div class="width-full tablet:width-1/2">
    <p class="font-size-lg font-weight-bold">Content</p>
  </div>
</div>

<!-- New extended utilities use Tailwind-style naming -->
<div class="grow shrink-0 basis-1/2">
  <img class="size-12 aspect-square object-cover">
</div>

<!-- Responsive + State variants work on both -->
<button class="tablet:padding-x-6 hover:bg-primary-dark focus:ring-2">
  Click me
</button>
```

---

## Naming Conventions

### Core USWDS Utilities (Original)

These use **USWDS verbose naming**, NOT Tailwind shorthand:

| Tailwind | USWDS Extended | Property |
|----------|----------------|----------|
| `m-4` | `margin-4` | margin |
| `mt-4` | `margin-top-4` | margin-top |
| `mx-4` | `margin-x-4` | margin-left/right |
| `p-4` | `padding-4` | padding |
| `pt-4` | `padding-top-4` | padding-top |
| `w-full` | `width-full` | width |
| `h-screen` | `height-viewport` | height |
| `flex` | `display-flex` | display |
| `items-center` | `flex-align-center` | align-items |
| `justify-between` | `flex-justify` | justify-content |
| `text-lg` | `font-size-lg` | font-size |
| `font-bold` | `font-weight-bold` | font-weight |

### Extended Utilities (New)

These use **Tailwind-style naming**:

| Category | Class Names | Example |
|----------|-------------|---------|
| Flex Grow | `grow`, `grow-0` | `<div class="grow">` |
| Flex Shrink | `shrink`, `shrink-0` | `<div class="shrink-0">` |
| Flex Basis | `basis-0`, `basis-1/2`, `basis-full` | `<div class="basis-1/2">` |
| Size | `size-0` to `size-96`, `size-full` | `<img class="size-12">` |
| Aspect Ratio | `aspect-auto`, `aspect-square`, `aspect-video` | `<div class="aspect-video">` |
| Columns | `columns-1` to `columns-12` | `<div class="columns-3">` |
| Visibility | `visible`, `invisible`, `collapse` | `<tr class="collapse">` |
| Isolation | `isolate`, `isolation-auto` | `<div class="isolate">` |

### Min/Max Sizing (USWDS Convention)

USWDS uses **no hyphens** in min/max utilities:

| Tailwind | USWDS Extended |
|----------|----------------|
| `min-w-0` | `minw-0` |
| `max-w-lg` | `maxw-lg` |
| `min-h-screen` | `minh-screen` |
| `max-h-64` | `maxh-64` |

---

## Responsive Variants

Use USWDS breakpoint prefixes:

| Breakpoint | Prefix | Min Width |
|------------|--------|-----------|
| Mobile Large | `mobile-lg:` | 480px |
| Tablet | `tablet:` | 640px |
| Tablet Large | `tablet-lg:` | 880px |
| Desktop | `desktop:` | 1024px |
| Desktop Large | `desktop-lg:` | 1200px |
| Widescreen | `widescreen:` | 1400px |

**Note**: Use `tablet:` not `sm:`, `desktop:` not `lg:`.

```html
<div class="display-flex flex-column tablet:flex-row desktop:grid desktop:grid-cols-3">
```

---

## State Variants

| Variant | Selector | Example |
|---------|----------|---------|
| `hover:` | `:hover` | `hover:bg-primary-dark` |
| `focus:` | `:focus` | `focus:ring-2` |
| `active:` | `:active` | `active:opacity-80` |
| `visited:` | `:visited` | `visited:text-violet` |

---

## JIT System

The JIT system scans HTML files and generates only used CSS.

### Structure

```
tasks/jit/
├── index.js                 # Main JIT entry point
├── generator.js             # CSS generator
├── scanner.js               # Class extraction
└── utility-definitions.js   # 115 utility definitions
```

### Usage

```js
const { jit } = require('./tasks/jit');

const result = await jit({
  content: ['./src/**/*.html'],
  output: './dist/utilities.css',
  verbose: true,
});
```

### Supported Features

| Feature | Status | Notes |
|---------|--------|-------|
| Standard utilities | Working | 115 utilities defined |
| Responsive variants | Working | All breakpoints supported |
| State variants | Working | hover, focus, active, visited |
| Arbitrary values | Working | `w-[200px]`, `bg-[#ff5722]` |
| Opacity modifiers | Working | `bg-primary/75` |
| Negative values | Partial | Some utilities only |

### JIT Limitations

The JIT uses full utility names, not shorthand:
- JIT recognizes `margin-4`, not `m-4`
- JIT recognizes `width-full`, not `w-full`
- JIT recognizes `align-items`, not `items`

---

## File Structure

```
packages/uswds-utilities/src/styles/
├── rules/                    # Utility definitions
│   ├── _index.scss          # Forwards all utilities
│   ├── _package.scss        # Collects utility maps
│   │
│   │ # Original USWDS utilities (verbose naming)
│   ├── margin.scss          # margin-*, margin-x-*, margin-y-*
│   ├── padding.scss         # padding-*, padding-x-*, padding-y-*
│   ├── width.scss           # width-*
│   ├── height.scss          # height-*
│   ├── display.scss         # display-*
│   ├── flex.scss            # flex-*
│   ├── align-items.scss     # flex-align-*
│   │
│   │ # Extended utilities (Tailwind-style naming)
│   ├── size.scss            # size-*, minsize-*, maxsize-*
│   ├── aspect-ratio.scss    # aspect-*
│   ├── flex-extended.scss   # grow, shrink, basis-*
│   ├── visibility.scss      # visible, invisible, collapse
│   ├── columns.scss         # columns-*
│   ├── divide.scss          # divide-x, divide-y
│   ├── ring.scss            # ring-*
│   └── ... (30+ more)
```

---

## Adding Custom Utilities

### SCSS Method

```scss
// my-utility.scss
@use "uswds-core" as *;

$my-utility-settings: (
  output: true,
  responsive: true,
  hover: true,
  focus: false,
);

$u-my-utility: (
  my-utility: (
    base: "my-prefix",      // Class prefix
    modifiers: (
      noModifier: "",
    ),
    values: (
      "small": 0.5rem,
      "medium": 1rem,
      "large": 2rem,
    ),
    settings: $my-utility-settings,
    property: "my-css-property",
    type: "utility",
  ),
);
```

Then add to `_index.scss` and `_package.scss`.

### JIT Method

Add to `tasks/jit/utility-definitions.js`:

```js
UTILITIES['my-prefix'] = {
  property: 'my-css-property',
  values: {
    'small': '0.5rem',
    'medium': '1rem',
    'large': '2rem',
  },
  responsive: true,
  hover: true,
};
```

---

## Build Commands

```bash
# Full build
npm run build

# Watch mode
npm run dev

# Build utilities only
gulp build-utilities
```

---

## Known Gaps

### Not Implemented

1. **`@apply` directive** - No PostCSS plugin for composing utilities
2. **Tailwind shorthand aliases** - Core utilities use USWDS naming
3. **Dark mode** - `dark:` variant not fully implemented
4. **Group/peer modifiers** - `group-hover:`, `peer-focus:` not in SCSS

### Naming Inconsistencies

The system mixes two naming conventions:
- **USWDS core**: `margin-4`, `padding-4`, `display-flex`, `flex-align-center`
- **Extended utilities**: `grow`, `shrink`, `basis-1/2`, `size-12`, `aspect-video`

---

## Migration Notes

### From Tailwind

Replace shorthand with USWDS verbose names:

```html
<!-- Tailwind -->
<div class="m-4 p-2 flex items-center w-full">

<!-- USWDS Extended -->
<div class="margin-4 padding-2 display-flex flex-align-center width-full">
```

### From Standard USWDS

Extended utilities work alongside existing USWDS:

```html
<div class="usa-card">
  <div class="usa-card__body padding-4">
    <!-- Mix USWDS components with utilities -->
    <p class="grow basis-1/2">Content</p>
  </div>
</div>
```

---

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

Modern CSS features used:
- `dvh`, `svh`, `lvh` viewport units
- `aspect-ratio` property
- CSS Grid subgrid (where supported)
