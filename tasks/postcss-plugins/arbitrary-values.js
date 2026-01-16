/**
 * PostCSS plugin to generate arbitrary value utilities
 *
 * This plugin generates utilities for arbitrary values specified in a safelist.
 * Since this is a static build, we can't know what values users need at runtime,
 * so they must be specified in the configuration.
 *
 * Example safelist configuration:
 *   arbitraryValues: {
 *     width: ['137px', '200px', '50vw'],
 *     height: ['calc(100vh - 60px)'],
 *     padding: ['1.5rem', '3rem'],
 *     margin: ['auto', '-10px'],
 *     'max-width': ['1200px', '80ch'],
 *     gap: ['1.25rem'],
 *   }
 *
 * Output:
 *   .w-\[137px\] { width: 137px; }
 *   .h-\[calc\(100vh\ -\ 60px\)\] { height: calc(100vh - 60px); }
 */

// Mapping of utility prefixes to CSS properties
const UTILITY_PROPERTY_MAP = {
  // Sizing
  w: 'width',
  h: 'height',
  'min-w': 'min-width',
  'max-w': 'max-width',
  'min-h': 'min-height',
  'max-h': 'max-height',

  // Spacing
  p: 'padding',
  pt: 'padding-top',
  pr: 'padding-right',
  pb: 'padding-bottom',
  pl: 'padding-left',
  px: ['padding-left', 'padding-right'],
  py: ['padding-top', 'padding-bottom'],
  m: 'margin',
  mt: 'margin-top',
  mr: 'margin-right',
  mb: 'margin-bottom',
  ml: 'margin-left',
  mx: ['margin-left', 'margin-right'],
  my: ['margin-top', 'margin-bottom'],
  gap: 'gap',
  'gap-x': 'column-gap',
  'gap-y': 'row-gap',

  // Typography
  text: 'font-size',
  leading: 'line-height',
  tracking: 'letter-spacing',

  // Layout
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  inset: 'inset',
  'inset-x': ['left', 'right'],
  'inset-y': ['top', 'bottom'],
  z: 'z-index',

  // Borders
  border: 'border-width',
  'border-t': 'border-top-width',
  'border-r': 'border-right-width',
  'border-b': 'border-bottom-width',
  'border-l': 'border-left-width',
  rounded: 'border-radius',

  // Flexbox/Grid
  basis: 'flex-basis',
  grow: 'flex-grow',
  shrink: 'flex-shrink',
  'grid-cols': 'grid-template-columns',
  'grid-rows': 'grid-template-rows',
  col: 'grid-column',
  row: 'grid-row',

  // Effects
  opacity: 'opacity',

  // Transforms
  translate: 'translate',
  'translate-x': '--tw-translate-x',
  'translate-y': '--tw-translate-y',
  rotate: 'rotate',
  scale: 'scale',
};

// Escape special CSS characters in class names
function escapeSelector(value) {
  return value
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\s/g, '\\ ')
    .replace(/%/g, '\\%')
    .replace(/\//g, '\\/')
    .replace(/:/g, '\\:')
    .replace(/,/g, '\\,')
    .replace(/\./g, '\\.')
    .replace(/\+/g, '\\+')
    .replace(/#/g, '\\#');
}

module.exports = (opts = {}) => {
  const arbitraryValues = opts.arbitraryValues || {};
  const important = opts.important ? ' !important' : '';

  return {
    postcssPlugin: 'postcss-arbitrary-values',

    Once(root) {
      const postcss = require('postcss');

      // Process each utility type
      Object.entries(arbitraryValues).forEach(([utilityKey, values]) => {
        // Find the CSS property(ies) for this utility
        const properties = UTILITY_PROPERTY_MAP[utilityKey];

        if (!properties) {
          console.warn(
            `postcss-arbitrary-values: Unknown utility "${utilityKey}". Skipping.`
          );
          return;
        }

        // Ensure values is an array
        const valueList = Array.isArray(values) ? values : [values];

        valueList.forEach((value) => {
          // Create the selector: .w-\[137px\]
          const escapedValue = escapeSelector(value);
          const selector = `.${utilityKey}-\\[${escapedValue}\\]`;

          // Create the rule
          const newRule = postcss.rule({ selector });

          // Handle single property or multiple properties (like px, mx)
          const propList = Array.isArray(properties) ? properties : [properties];
          propList.forEach((prop) => {
            newRule.append({ prop, value: `${value}${important}` });
          });

          root.append(newRule);
        });
      });
    },
  };
};

module.exports.postcss = true;
