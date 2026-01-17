// PostCSS plugin to generate container query variants
//
// Scans for @sm:, @md:, @lg:, @xl:, @2xl: prefixed classes
// and generates @container rules
//
// Input:  class="@md:display-flex @lg:bg-primary"
// Output:
//   @container (min-width: 28rem) {
//     .\@md\:display-flex { display: flex; }
//   }
//   @container (min-width: 32rem) {
//     .\@lg\:bg-primary { background-color: #005ea2; }
//   }

// Container breakpoints (smaller than viewport breakpoints)
const CONTAINER_BREAKPOINTS = {
  'sm': '20rem',   // 320px
  'md': '28rem',   // 448px
  'lg': '32rem',   // 512px
  'xl': '36rem',   // 576px
  '2xl': '42rem',  // 672px
  '3xl': '48rem',  // 768px
};

// Escape special characters for CSS selectors
function escapeSelector(str) {
  return str
    .replace(/@/g, '\\@')
    .replace(/:/g, '\\:')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\//g, '\\/')
    .replace(/\./g, '\\.')
    .replace(/%/g, '\\%');
}

module.exports = (opts = {}) => {
  const breakpoints = opts.breakpoints || CONTAINER_BREAKPOINTS;
  const important = opts.important ? ' !important' : '';

  return {
    postcssPlugin: 'postcss-container-queries',

    Once(root) {
      const postcss = require('postcss');
      const containerRules = {};

      // Walk through all rules and find ones we can create container variants for
      root.walkRules((rule) => {
        // Skip rules already inside @container or @media
        if (rule.parent.type === 'atrule') return;

        // Get the base selector (without any prefixes)
        const selector = rule.selector;

        // Skip if already has variant prefix
        if (selector.includes('\\:') || selector.includes('@')) return;

        // Only process utility-style class selectors
        if (!selector.startsWith('.')) return;

        // Get the class name without the leading dot
        const className = selector.slice(1);

        // Generate container variants for each breakpoint
        for (const [bp, width] of Object.entries(breakpoints)) {
          const containerSelector = `.\\@${bp}\\:${className}`;

          if (!containerRules[bp]) {
            containerRules[bp] = [];
          }

          // Clone the rule with new selector
          const newRule = rule.clone();
          newRule.selector = containerSelector;

          // Add !important if configured
          if (important) {
            newRule.walkDecls((decl) => {
              if (!decl.value.includes('!important')) {
                decl.value = decl.value + important;
              }
            });
          }

          containerRules[bp].push(newRule);
        }
      });

      // Append container queries at the end
      for (const [bp, rules] of Object.entries(containerRules)) {
        if (rules.length === 0) continue;

        const width = breakpoints[bp];
        const containerAtRule = postcss.atRule({
          name: 'container',
          params: `(min-width: ${width})`,
        });

        rules.forEach((rule) => containerAtRule.append(rule));
        root.append(containerAtRule);
      }
    },
  };
};

module.exports.postcss = true;
module.exports.CONTAINER_BREAKPOINTS = CONTAINER_BREAKPOINTS;
