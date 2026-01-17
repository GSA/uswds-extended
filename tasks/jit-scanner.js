// JIT Scanner for USWDS Extended
// Scans source files for arbitrary value utilities and extracts them
// for generation. This enables true JIT-style development where you
// write classes like w-[137px] and they are automatically generated.

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Supported utility prefixes (must match postcss-arbitrary-values.js)
const SUPPORTED_UTILITIES = [
  // Sizing
  'w', 'h', 'min-w', 'max-w', 'min-h', 'max-h',
  // Spacing
  'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py',
  'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my',
  'gap', 'gap-x', 'gap-y',
  // Typography
  'text', 'leading', 'tracking',
  // Layout
  'top', 'right', 'bottom', 'left', 'inset', 'inset-x', 'inset-y', 'z',
  // Borders
  'border', 'border-t', 'border-r', 'border-b', 'border-l', 'rounded',
  // Flexbox/Grid
  'basis', 'grow', 'shrink', 'grid-cols', 'grid-rows', 'col', 'row',
  // Effects
  'opacity',
  // Transforms
  'translate', 'translate-x', 'translate-y', 'rotate', 'scale',
  // Colors (background, text, border colors with hex/rgb values)
  'bg', 'text', 'border-color', 'fill', 'stroke',
];

// Build regex pattern for matching arbitrary values
// Matches: utility-[value], hover:utility-[value], md:hover:utility-[value], etc.
function buildPattern() {
  const utilityGroup = SUPPORTED_UTILITIES.map(u => u.replace('-', '\\-')).join('|');
  // Match optional variants (hover:, md:, etc.) followed by utility-[value]
  // The value can contain anything except unbalanced brackets
  return new RegExp(
    `(?:^|[\\s"'\`])` +                           // Start or whitespace/quotes
    `(?:[a-z]+:)*` +                               // Optional variants (hover:, md:, etc.)
    `(${utilityGroup})` +                          // Capture group 1: utility prefix
    `-\\[` +                                       // Literal -[
    `([^\\]]+)` +                                  // Capture group 2: the value
    `\\]`,                                         // Literal ]
    'g'
  );
}

const ARBITRARY_PATTERN = buildPattern();

/**
 * Extract arbitrary values from a string of content
 * @param {string} content - File content to scan
 * @returns {Map<string, Set<string>>} Map of utility -> Set of values
 */
function extractFromContent(content) {
  const results = new Map();
  let match;

  // Reset regex state
  ARBITRARY_PATTERN.lastIndex = 0;

  while ((match = ARBITRARY_PATTERN.exec(content)) !== null) {
    const utility = match[1];
    const value = match[2];

    if (!results.has(utility)) {
      results.set(utility, new Set());
    }
    results.get(utility).add(value);
  }

  return results;
}

/**
 * Scan files matching glob patterns and extract arbitrary values
 * @param {string[]} patterns - Glob patterns to match files
 * @param {object} options - Options
 * @param {string} options.cwd - Current working directory
 * @param {string[]} options.ignore - Patterns to ignore
 * @returns {Promise<object>} Object mapping utilities to arrays of values
 */
async function scanFiles(patterns, options = {}) {
  const cwd = options.cwd || process.cwd();
  const ignore = options.ignore || ['**/node_modules/**', '**/dist/**', '**/.git/**'];

  const results = new Map();

  for (const pattern of patterns) {
    const files = await glob(pattern, { cwd, ignore, absolute: true });

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const extracted = extractFromContent(content);

        // Merge into results
        for (const [utility, values] of extracted) {
          if (!results.has(utility)) {
            results.set(utility, new Set());
          }
          for (const value of values) {
            results.get(utility).add(value);
          }
        }
      } catch (err) {
        console.warn(`JIT Scanner: Could not read ${file}: ${err.message}`);
      }
    }
  }

  // Convert to plain object with arrays
  const output = {};
  for (const [utility, values] of results) {
    output[utility] = Array.from(values).sort();
  }

  return output;
}

/**
 * Scan files and merge with existing config
 * @param {string} configPath - Path to uswds-extended.config.js
 * @param {string[]} patterns - Glob patterns to scan
 * @param {object} options - Scan options
 * @returns {Promise<object>} Merged arbitraryValues config
 */
async function scanAndMergeConfig(configPath, patterns, options = {}) {
  // Load existing config
  let existingConfig = {};
  try {
    const fullPath = path.resolve(options.cwd || process.cwd(), configPath);
    delete require.cache[fullPath]; // Clear cache for hot reload
    existingConfig = require(fullPath).arbitraryValues || {};
  } catch (err) {
    console.warn(`JIT Scanner: Could not load config from ${configPath}: ${err.message}`);
  }

  // Scan files
  const scanned = await scanFiles(patterns, options);

  // Merge: existing config takes precedence (allows manual overrides)
  const merged = { ...scanned };

  for (const [utility, values] of Object.entries(existingConfig)) {
    if (!merged[utility]) {
      merged[utility] = [];
    }
    // Add manual values, avoiding duplicates
    const valueSet = new Set(merged[utility]);
    for (const value of (Array.isArray(values) ? values : [values])) {
      valueSet.add(value);
    }
    merged[utility] = Array.from(valueSet).sort();
  }

  return merged;
}

/**
 * Generate a report of scanned values
 * @param {object} values - The scanned arbitrary values
 * @returns {string} Formatted report
 */
function generateReport(values) {
  const lines = ['JIT Scanner Report', '==================', ''];

  const utilities = Object.keys(values).sort();
  let totalValues = 0;

  for (const utility of utilities) {
    const vals = values[utility];
    totalValues += vals.length;
    lines.push(`${utility}: ${vals.length} value(s)`);
    for (const val of vals) {
      lines.push(`  - ${val}`);
    }
    lines.push('');
  }

  lines.push(`Total: ${utilities.length} utilities, ${totalValues} values`);

  return lines.join('\n');
}

/**
 * Write scanned values to a cache file for build process
 * @param {object} values - The scanned arbitrary values
 * @param {string} outputPath - Path to write cache file
 */
function writeCache(values, outputPath) {
  const content = `// Auto-generated by JIT Scanner - do not edit manually
// Generated: ${new Date().toISOString()}
module.exports = ${JSON.stringify(values, null, 2)};
`;
  fs.writeFileSync(outputPath, content, 'utf8');
}

/**
 * Read cached values
 * @param {string} cachePath - Path to cache file
 * @returns {object|null} Cached values or null if not found
 */
function readCache(cachePath) {
  try {
    delete require.cache[require.resolve(cachePath)];
    return require(cachePath);
  } catch {
    return null;
  }
}

module.exports = {
  scanFiles,
  scanAndMergeConfig,
  extractFromContent,
  generateReport,
  writeCache,
  readCache,
  SUPPORTED_UTILITIES,
};
