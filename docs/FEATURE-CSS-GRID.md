# Feature Request: CSS Grid Utilities

## Summary

Add CSS Grid layout utilities to complement USWDS's existing flexbox-based grid system.

## Motivation

USWDS currently uses "grid" terminology for its flexbox-based layout system (`.grid-row`, `.grid-col-*`). However, CSS Grid is a distinct and powerful layout technology that offers capabilities flexbox cannot easily replicate:

- Two-dimensional layouts (rows AND columns simultaneously)
- Explicit grid templates
- Grid line-based placement
- Automatic item flow

Many modern design systems (Tailwind, Bootstrap 5) include CSS Grid utilities alongside flexbox utilities.

## Naming Strategy

To avoid confusion between USWDS's flexbox grid and CSS Grid, we use distinct naming:

| Concept | USWDS Flexbox | CSS Grid (new) |
|---------|---------------|----------------|
| Activation | `.grid-row` (implicit flex) | `display-grid` (explicit) |
| Column sizing | `.grid-col-6` (item width, singular) | `.grid-cols-6` (template, plural) |
| Gaps | `.grid-gap` | `.gap-*` (already exists) |

The **singular vs plural** distinction makes the difference clear:
- `grid-col-6` = "this item takes 6/12 width"
- `grid-cols-6` = "this container has 6 columns"

## New Utilities

### Container Utilities

| Class | CSS Property | Values |
|-------|-------------|--------|
| `display-grid` | `display: grid` | - |
| `display-inline-grid` | `display: inline-grid` | - |
| `grid-cols-{n}` | `grid-template-columns` | 1-12, none |
| `grid-rows-{n}` | `grid-template-rows` | 1-6, none |
| `grid-flow-{dir}` | `grid-auto-flow` | row, col, dense, row-dense, col-dense |

### Item Utilities

| Class | CSS Property | Values |
|-------|-------------|--------|
| `col-span-{n}` | `grid-column` | 1-12, full, auto |
| `row-span-{n}` | `grid-row` | 1-6, full, auto |
| `col-start-{n}` | `grid-column-start` | 1-13, auto |
| `col-end-{n}` | `grid-column-end` | 1-13, auto |
| `row-start-{n}` | `grid-row-start` | 1-13, auto |
| `row-end-{n}` | `grid-row-end` | 1-13, auto |

### Responsive Support

All utilities support responsive prefixes:
- `tablet:grid-cols-3`
- `desktop:col-span-2`

## Usage Examples

### Basic Grid

```html
<div class="display-grid grid-cols-3 gap-2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Spanning Columns

```html
<div class="display-grid grid-cols-4 gap-2">
  <div class="col-span-2">Wide item (spans 2 columns)</div>
  <div>Regular</div>
  <div>Regular</div>
</div>
```

### Responsive Layout

```html
<div class="display-grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-2">
  <div>Responsive item</div>
  <div>Responsive item</div>
  <div>Responsive item</div>
  <div>Responsive item</div>
</div>
```

### Complex Layout with Placement

```html
<div class="display-grid grid-cols-3 grid-rows-2 gap-2">
  <div class="col-span-2 row-span-2">Featured (2x2)</div>
  <div>Side 1</div>
  <div>Side 2</div>
</div>
```

## Comparison: When to Use Which

### Use USWDS Flexbox Grid (`.grid-row` + `.grid-col-*`) when:
- You need a simple row-based layout
- Items should wrap naturally
- You want the traditional 12-column system
- Backward compatibility is important

### Use CSS Grid (`.display-grid` + `.grid-cols-*`) when:
- You need two-dimensional control
- You want explicit column/row templates
- Items need to span multiple tracks
- You want automatic placement with `grid-flow`

## Browser Support

CSS Grid is supported in all modern browsers (Chrome 57+, Firefox 52+, Safari 10.1+, Edge 16+). IE11 has partial support with `-ms-` prefixes (not included).

## Implementation

Files modified/added:
- `packages/uswds-core/src/styles/_properties.scss` - Added `grid` and `inline-grid` to display values
- `packages/uswds-utilities/src/styles/rules/css-grid.scss` - New CSS Grid utilities
- `packages/uswds-utilities/src/styles/rules/_index.scss` - Forward new file
- `packages/uswds-utilities/src/styles/rules/_package.scss` - Include in package

## Related

- [CSS Grid Layout - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Tailwind CSS Grid](https://tailwindcss.com/docs/grid-template-columns)
- [USWDS Layout Grid](https://designsystem.digital.gov/utilities/layout-grid/)
