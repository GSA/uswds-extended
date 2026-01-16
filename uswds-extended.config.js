/**
 * USWDS Extended Configuration
 *
 * This file configures extended features for USWDS, including:
 * - Arbitrary value utilities
 * - Color opacity steps
 * - Additional customizations
 */

module.exports = {
  /**
   * Arbitrary Values
   *
   * Define arbitrary CSS values that should be generated as utilities.
   * These generate classes like .w-[137px], .p-[2rem], etc.
   *
   * Supported utility prefixes:
   * - Sizing: w, h, min-w, max-w, min-h, max-h
   * - Spacing: p, pt, pr, pb, pl, px, py, m, mt, mr, mb, ml, mx, my, gap, gap-x, gap-y
   * - Typography: text, leading, tracking
   * - Layout: top, right, bottom, left, inset, inset-x, inset-y, z
   * - Borders: border, border-t, border-r, border-b, border-l, rounded
   * - Flexbox/Grid: basis, grow, shrink, grid-cols, grid-rows, col, row
   * - Effects: opacity
   *
   * Example:
   *   arbitraryValues: {
   *     w: ['137px', '200px'],
   *     h: ['calc(100vh - 60px)'],
   *     'max-w': ['1200px', '80ch'],
   *   }
   */
  arbitraryValues: {
    // Example arbitrary values (remove or modify as needed)
    w: ['137px', '200px', '50vw'],
    h: ['calc(100vh-60px)', 'calc(100vh-80px)'],
    'max-w': ['1200px', '80ch', '65rem'],
    p: ['1.5rem', '3rem'],
    gap: ['1.25rem', '0.875rem'],
  },

  /**
   * Color Opacity Steps
   *
   * Define which opacity percentages to generate for color utilities.
   * These create classes like .bg-primary/75, .text-secondary/50
   *
   * Default: [5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95]
   */
  opacitySteps: [5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95],

  /**
   * Use !important
   *
   * Whether to add !important to generated arbitrary value utilities.
   * Set to true to match USWDS utility behavior.
   */
  important: true,
};
