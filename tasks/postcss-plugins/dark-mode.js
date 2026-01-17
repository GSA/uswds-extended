// PostCSS plugin for dark mode variant support
//
// Generates dark: variants for color utilities
//
// Usage:
//   <div class="bg-white dark:bg-gray-900 text-black dark:text-white">
//
// Configuration:
//   darkMode: 'class'  - Uses .dark class on html/body (default)
//   darkMode: 'media'  - Uses prefers-color-scheme media query
//
// Output (class mode):
//   .dark .dark\:bg-gray-900 { background-color: #111827; }
//
// Output (media mode):
//   @media (prefers-color-scheme: dark) {
//     .dark\:bg-gray-900 { background-color: #111827; }
//   }

function escapeSelector(str) {
  return str
    .replace(/:/g, '\\:')
    .replace(/\//g, '\\/')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\./g, '\\.');
}

module.exports = (opts = {}) => {
  const mode = opts.darkMode || 'class';
  const darkSelector = opts.darkSelector || '.dark';
  const important = opts.important ? ' !important' : '';

  // Utilities that should get dark mode variants
  const darkModeUtilities = opts.utilities || [
    'background-color',
    'color',
    'border-color',
    'outline-color',
    'text-decoration-color',
    'fill',
    'stroke',
    'box-shadow',
    'opacity',
  ];

  return {
    postcssPlugin: 'postcss-dark-mode',

    Once(root) {
      const postcss = require('postcss');
      const darkRules = [];

      root.walkRules((rule) => {
        // Skip rules already in media queries or with dark prefix
        if (rule.parent.type === 'atrule') return;
        if (rule.selector.includes('dark\\:')) return;
        if (rule.selector.includes('.dark ')) return;

        // Only process utility-style class selectors
        if (!rule.selector.startsWith('.')) return;

        // Check if this rule has properties that should get dark variants
        let hasDarkProperty = false;
        rule.walkDecls((decl) => {
          if (darkModeUtilities.includes(decl.prop)) {
            hasDarkProperty = true;
          }
        });

        if (!hasDarkProperty) return;

        // Get the class name without the leading dot
        const className = rule.selector.slice(1);

        // Skip if class already has variant prefix
        if (className.includes('\\:') && !className.startsWith('hover\\:') && !className.startsWith('focus\\:')) {
          return;
        }

        // Create dark variant selector
        const darkClassName = `dark\\:${className}`;
        const darkRule = rule.clone();

        if (mode === 'class') {
          darkRule.selector = `${darkSelector} .${darkClassName}`;
        } else {
          darkRule.selector = `.${darkClassName}`;
        }

        // Add !important if configured
        if (important) {
          darkRule.walkDecls((decl) => {
            if (!decl.value.includes('!important')) {
              decl.value = decl.value + important;
            }
          });
        }

        darkRules.push(darkRule);
      });

      // Append dark mode rules
      if (darkRules.length > 0) {
        if (mode === 'media') {
          const mediaRule = postcss.atRule({
            name: 'media',
            params: '(prefers-color-scheme: dark)',
          });
          darkRules.forEach((rule) => mediaRule.append(rule));
          root.append(mediaRule);
        } else {
          // Class mode - just append rules
          darkRules.forEach((rule) => root.append(rule));
        }
      }
    },
  };
};

module.exports.postcss = true;
