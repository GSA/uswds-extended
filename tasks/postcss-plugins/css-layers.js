// PostCSS plugin for CSS @layer support
//
// Wraps CSS output in cascade layers for better specificity control
//
// Layer order (lowest to highest priority):
//   1. reset     - CSS reset/normalize
//   2. base      - Base element styles
//   3. tokens    - Design tokens (CSS custom properties)
//   4. components - USWDS components
//   5. utilities  - Utility classes
//   6. overrides  - Custom overrides
//
// Usage in config:
//   cssLayers: {
//     enabled: true,
//     order: ['reset', 'base', 'tokens', 'components', 'utilities', 'overrides'],
//   }
//
// Output:
//   @layer reset, base, tokens, components, utilities, overrides;
//   @layer utilities {
//     .display-flex { display: flex; }
//   }

const DEFAULT_LAYER_ORDER = [
  'reset',
  'base',
  'tokens',
  'components',
  'utilities',
  'overrides',
];

module.exports = (opts = {}) => {
  const enabled = opts.enabled !== false;
  const layerOrder = opts.order || DEFAULT_LAYER_ORDER;
  const defaultLayer = opts.defaultLayer || 'utilities';
  const componentPatterns = opts.componentPatterns || [/^\.usa-/];
  const utilityPatterns = opts.utilityPatterns || [
    /^\.(display|flex|grid|margin|padding|bg|text|border|width|height|gap|position|z-index|overflow|opacity)/,
    /^\.[a-z]+-[a-z0-9-]+$/,  // General utility pattern
  ];

  return {
    postcssPlugin: 'postcss-css-layers',

    Once(root, { result }) {
      if (!enabled) return;

      const postcss = require('postcss');

      // Create layer order declaration
      const layerOrderRule = postcss.atRule({
        name: 'layer',
        params: layerOrder.join(', '),
      });

      // Collect rules by layer
      const layers = {};
      layerOrder.forEach((layer) => {
        layers[layer] = [];
      });

      // Categorize existing rules
      const rulesToRemove = [];

      root.walkRules((rule) => {
        // Skip rules already in @layer
        if (rule.parent.type === 'atrule' && rule.parent.name === 'layer') {
          return;
        }

        // Skip @keyframes and other at-rules
        if (rule.parent.type === 'atrule') {
          return;
        }

        const selector = rule.selector;

        // Determine which layer this rule belongs to
        let targetLayer = defaultLayer;

        // Check if it's a component (usa-* classes)
        for (const pattern of componentPatterns) {
          if (pattern.test(selector)) {
            targetLayer = 'components';
            break;
          }
        }

        // Check if it's a utility
        if (targetLayer === defaultLayer) {
          for (const pattern of utilityPatterns) {
            if (pattern.test(selector)) {
              targetLayer = 'utilities';
              break;
            }
          }
        }

        // Check for element selectors (base layer)
        if (/^[a-z]+(\s|,|$)/.test(selector) && !selector.includes('.')) {
          targetLayer = 'base';
        }

        // Check for :root or CSS custom properties (tokens layer)
        if (selector === ':root' || selector.includes('--')) {
          targetLayer = 'tokens';
        }

        // Add to appropriate layer
        if (layers[targetLayer]) {
          layers[targetLayer].push(rule.clone());
          rulesToRemove.push(rule);
        }
      });

      // Remove categorized rules from root
      rulesToRemove.forEach((rule) => rule.remove());

      // Prepend layer order declaration
      root.prepend(layerOrderRule);

      // Append layer blocks
      for (const [layerName, rules] of Object.entries(layers)) {
        if (rules.length === 0) continue;

        const layerAtRule = postcss.atRule({
          name: 'layer',
          params: layerName,
        });

        rules.forEach((rule) => layerAtRule.append(rule));
        root.append(layerAtRule);
      }

      // Move any @media rules with layered content
      root.walkAtRules('media', (mediaRule) => {
        const layeredRules = {};

        mediaRule.walkRules((rule) => {
          const selector = rule.selector;
          let targetLayer = 'utilities';

          for (const pattern of componentPatterns) {
            if (pattern.test(selector)) {
              targetLayer = 'components';
              break;
            }
          }

          if (!layeredRules[targetLayer]) {
            layeredRules[targetLayer] = [];
          }
          layeredRules[targetLayer].push(rule.clone());
        });

        // Rebuild media rule with layers
        if (Object.keys(layeredRules).length > 0) {
          mediaRule.removeAll();

          for (const [layerName, rules] of Object.entries(layeredRules)) {
            const layerAtRule = postcss.atRule({
              name: 'layer',
              params: layerName,
            });
            rules.forEach((rule) => layerAtRule.append(rule));
            mediaRule.append(layerAtRule);
          }
        }
      });
    },
  };
};

module.exports.postcss = true;
module.exports.DEFAULT_LAYER_ORDER = DEFAULT_LAYER_ORDER;
