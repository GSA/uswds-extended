// USWDS Extended Configuration
// Configures extended features: JIT scanning, arbitrary values, color opacity

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
};
