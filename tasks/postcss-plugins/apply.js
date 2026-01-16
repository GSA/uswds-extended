/**
 * PostCSS plugin to support @apply directive
 *
 * This plugin allows you to apply utility classes directly in CSS,
 * similar to Tailwind's @apply directive.
 *
 * Example usage in your CSS:
 *   .btn-primary {
 *     @apply px-4 py-2 bg-primary text-white rounded-lg;
 *   }
 *
 *   .btn-primary:hover {
 *     @apply bg-primary-dark;
 *   }
 *
 * The plugin extracts the utility class definitions from the compiled
 * USWDS CSS and inlines them wherever @apply is used.
 *
 * Note: This plugin must run AFTER the main USWDS compilation and
 * BEFORE minification. It processes a separate input file that contains
 * @apply directives.
 */

/**
 * Build a lookup map of utility selectors to their declarations
 * @param {Root} root - PostCSS AST root
 * @returns {Map} Map of selector -> declarations array
 */
function buildUtilityMap(root) {
  const utilities = new Map();

  root.walkRules((rule) => {
    // Handle single selectors (utility classes)
    const selectors = rule.selector.split(',').map((s) => s.trim());

    selectors.forEach((selector) => {
      // Only capture simple utility selectors (not pseudo-classes, combinators, etc.)
      // Match: .utility-name or .prefix\:utility-name
      if (/^\.[a-zA-Z0-9_\\:/-]+$/.test(selector)) {
        const declarations = [];
        rule.walkDecls((decl) => {
          declarations.push({
            prop: decl.prop,
            value: decl.value,
            important: decl.important,
          });
        });

        if (declarations.length > 0) {
          // Normalize selector: remove leading dot and unescape
          const normalizedSelector = selector.slice(1).replace(/\\/g, '');
          utilities.set(normalizedSelector, declarations);
        }
      }
    });
  });

  return utilities;
}

/**
 * Parse @apply directive to extract class names
 * @param {string} value - The value after @apply
 * @returns {string[]} Array of class names
 */
function parseApplyValue(value) {
  // Split by whitespace, handling possible semicolons
  return value
    .replace(/;$/, '')
    .trim()
    .split(/\s+/)
    .filter((name) => name.length > 0);
}

module.exports = (opts = {}) => {
  // Options:
  // - utilityRoot: PostCSS root containing utility definitions
  // - removeUnknown: whether to remove @apply for unknown utilities (default: false)
  // - logWarnings: whether to log warnings for unknown utilities (default: true)
  const utilityRoot = opts.utilityRoot || null;
  const removeUnknown = opts.removeUnknown || false;
  const logWarnings = opts.logWarnings !== false;

  return {
    postcssPlugin: 'postcss-apply',

    prepare(result) {
      let utilities = new Map();

      // Build utility map from the root (the compiled USWDS CSS)
      return {
        Once(root) {
          // If a separate utility root is provided, use that
          // Otherwise, build from the current root (compiled USWDS)
          const sourceRoot = utilityRoot || root;
          utilities = buildUtilityMap(sourceRoot);
        },

        AtRule: {
          apply(atRule) {
            const classNames = parseApplyValue(atRule.params);
            const parent = atRule.parent;

            if (!parent) {
              return;
            }

            const postcss = require('postcss');

            classNames.forEach((className) => {
              const declarations = utilities.get(className);

              if (declarations) {
                // Insert declarations before the @apply
                declarations.forEach(({ prop, value, important }) => {
                  const newDecl = postcss.decl({
                    prop,
                    value,
                    important,
                  });
                  atRule.before(newDecl);
                });
              } else if (logWarnings) {
                console.warn(
                  `postcss-apply: Unknown utility class "${className}" in ${
                    atRule.source?.input?.file || 'unknown file'
                  }`
                );

                if (!removeUnknown) {
                  // Keep the @apply as a comment for debugging
                  const comment = postcss.comment({
                    text: `@apply ${className} - utility not found`,
                  });
                  atRule.before(comment);
                }
              }
            });

            // Remove the @apply rule
            atRule.remove();
          },
        },
      };
    },
  };
};

module.exports.postcss = true;
