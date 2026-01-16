/**
 * PurgeCSS Configuration
 *
 * This configuration is used to remove unused CSS from production builds.
 * It scans your HTML/JS files for class names and removes any CSS rules
 * that aren't used.
 *
 * Usage:
 *   npx gulp purgeSass
 *
 * Important: Run this AFTER development is complete, before deploying.
 */

module.exports = {
  /**
   * Content files to scan for class names
   * Add your project's HTML, JS, and template files here
   */
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
    './src/**/*.vue',
    './src/**/*.svelte',
    './src/**/*.twig',
    './src/**/*.njk',
    // Add your project's paths here
  ],

  /**
   * CSS files to purge
   */
  css: ['./dist/css/uswds.css'],

  /**
   * Output directory for purged CSS
   */
  output: './dist/css',

  /**
   * Safelist - classes to always keep
   */
  safelist: {
    /**
     * Keep all USWDS component classes
     * These use the usa- prefix
     */
    standard: [
      /^usa-/,
      /^is-/,
      /^has-/,
      // Keep responsive prefixes
      /^mobile-lg:/,
      /^tablet:/,
      /^tablet-lg:/,
      /^desktop:/,
      /^desktop-lg:/,
      /^widescreen:/,
      // Keep state modifiers
      /^hover:/,
      /^focus:/,
      /^active:/,
      /^visited:/,
      // Keep group/peer modifiers
      /^group/,
      /^peer/,
    ],

    /**
     * Deep safelist - patterns with children
     * Useful for components that generate dynamic classes
     */
    deep: [],

    /**
     * Greedy safelist - classes containing these strings
     */
    greedy: [],
  },

  /**
   * Custom extractors for different file types
   */
  extractors: [
    {
      /**
       * Default extractor that handles:
       * - Standard classes: bg-primary, padding-2
       * - Arbitrary values: w-[137px], h-[calc(100vh-60px)]
       * - Opacity modifiers: bg-primary/75
       * - Responsive prefixes: tablet:padding-2
       * - State modifiers: hover:bg-primary
       */
      extractor: (content) => {
        // Match class-like patterns including:
        // - Standard: word-word-number
        // - Arbitrary: word-[value]
        // - Opacity: word/number
        // - Escaped: word\/number
        return (
          content.match(/[\w/:[\]#.%-]+/g)?.filter((match) => {
            // Filter out obvious non-classes
            return (
              !match.startsWith('//') &&
              !match.startsWith('/*') &&
              !match.startsWith('http')
            );
          }) || []
        );
      },
      extensions: ['html', 'js', 'jsx', 'ts', 'tsx', 'vue', 'svelte', 'twig', 'njk'],
    },
  ],

  /**
   * Rejected classes log
   * Useful for debugging what got removed
   */
  rejected: false,

  /**
   * Font face rules - keep them even if @font-face isn't in content
   */
  fontFace: true,

  /**
   * Keyframes - keep animation keyframes
   */
  keyframes: true,

  /**
   * Variables - keep CSS custom properties
   */
  variables: true,
};
