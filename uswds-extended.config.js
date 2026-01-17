// USWDS Extended Configuration
// Configures extended features: JIT, arbitrary values, color opacity, CSS layers, etc.

module.exports = {
  // Content Patterns (JIT Scanner)
  // Glob patterns for files to scan for arbitrary value classes.
  // The JIT scanner extracts classes like w-[137px] and generates utilities.
  content: [
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './html-templates/**/*.html',
    './packages/**/*.twig',
    './.storybook/**/*.{js,jsx}',
  ],

  // Arbitrary Values (Manual Safelist)
  // Values that should ALWAYS be generated, even if not found in scanned content.
  // Useful for dynamically generated values or external templates.
  // The JIT scanner will merge scanned values with this safelist.
  arbitraryValues: {
    // Manual safelist - JIT scanner adds discovered values automatically
  },

  // Color Opacity Steps
  // Which opacity percentages to generate for color utilities (bg-primary/75, etc.)
  opacitySteps: [5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95],

  // Use !important
  // Whether to add !important to generated arbitrary value utilities.
  important: true,

  // CSS Layers Configuration
  // Wraps CSS in @layer for better cascade control
  cssLayers: {
    enabled: false, // Set to true to enable @layer output
    order: ['reset', 'base', 'tokens', 'components', 'utilities', 'overrides'],
  },

  // Container Query Breakpoints
  // Used for @sm:, @md:, @lg:, @xl:, @2xl: container variants
  containerBreakpoints: {
    sm: '20rem',   // 320px
    md: '28rem',   // 448px
    lg: '32rem',   // 512px
    xl: '36rem',   // 576px
    '2xl': '42rem', // 672px
    '3xl': '48rem', // 768px
  },

  // Dark Mode Configuration
  // Controls how dark: variants are generated
  darkMode: {
    // 'class' - Uses .dark class on html/body element (default)
    // 'media' - Uses prefers-color-scheme media query
    mode: 'class',
    // Selector used for class-based dark mode
    selector: '.dark',
  },
};
