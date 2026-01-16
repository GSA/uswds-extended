/**
 * PostCSS plugin to generate color opacity utilities
 *
 * This plugin processes the compiled CSS and generates opacity variants
 * for background and text color utilities using CSS color-mix().
 *
 * Example output:
 *   .bg-primary\/75 { background-color: color-mix(in srgb, #005ea2 75%, transparent); }
 *   .text-secondary\/50 { color: color-mix(in srgb, #d83933 50%, transparent); }
 */

const OPACITY_STEPS = [5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95];

module.exports = (opts = {}) => {
  const opacitySteps = opts.opacitySteps || OPACITY_STEPS;

  return {
    postcssPlugin: 'postcss-color-opacity',

    Once(root) {
      const colorRules = [];

      // Collect all background-color and color utility rules
      root.walkRules((rule) => {
        // Match .bg-{name} or .text-{name} patterns (but not hover:, tablet:, etc.)
        const selector = rule.selector;

        // Only process simple selectors (no pseudo-classes, no media prefixes)
        if (!/^\.(?:bg|text)-[a-z][\w-]*$/i.test(selector)) {
          return;
        }

        rule.walkDecls((decl) => {
          if (decl.prop === 'background-color' || decl.prop === 'color') {
            // Extract color value (hex, rgb, etc.)
            const colorValue = decl.value;

            // Skip if it's a CSS variable or transparent
            if (colorValue.includes('var(') || colorValue === 'transparent' || colorValue === 'inherit') {
              return;
            }

            colorRules.push({
              selector: selector,
              property: decl.prop,
              colorValue: colorValue,
              isBackground: decl.prop === 'background-color'
            });
          }
        });
      });

      // Generate opacity variants for collected rules
      const postcss = require('postcss');

      colorRules.forEach(({ selector, property, colorValue }) => {
        opacitySteps.forEach((opacity) => {
          // Create new selector with escaped slash: .bg-primary\/75
          const baseClass = selector.slice(1); // Remove leading dot
          const newSelector = `.${baseClass}\\/${opacity}`;

          // Use color-mix for opacity
          const newValue = `color-mix(in srgb, ${colorValue} ${opacity}%, transparent)`;

          // Create new rule at root level
          const newRule = postcss.rule({ selector: newSelector });
          newRule.append({ prop: property, value: newValue });
          root.append(newRule);
        });
      });
    }
  };
};

module.exports.postcss = true;
