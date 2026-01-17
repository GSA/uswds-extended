// Full JIT Scanner for USWDS Extended
// Scans source files and identifies ALL utility class usage

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const { UTILITIES, BREAKPOINTS, STATES, GROUP_PEER } = require('./utility-definitions');

// Build list of all valid utility base names
const UTILITY_BASES = Object.keys(UTILITIES);

// Build list of all valid modifier suffixes per utility
function getModifiersForUtility(utilityName) {
  const utility = UTILITIES[utilityName];
  if (!utility || !utility.modifiers) return [''];
  return Object.keys(utility.modifiers);
}

// Build list of all valid values per utility
function getValuesForUtility(utilityName) {
  const utility = UTILITIES[utilityName];
  if (!utility || !utility.values) return [];
  return Object.keys(utility.values);
}

// Get all breakpoint prefixes
const BREAKPOINT_PREFIXES = Object.keys(BREAKPOINTS);

// Get all state prefixes
const STATE_PREFIXES = Object.keys(STATES);

// Get all group/peer prefixes
const GROUP_PEER_PREFIXES = Object.keys(GROUP_PEER);

// Regex to extract class attributes from various file types
const CLASS_PATTERNS = [
  /class="([^"]*)"/g,
  /class='([^']*)'/g,
  /className="([^"]*)"/g,
  /className='([^']*)'/g,
  /className={["'`]([^"'`]*)["'`]}/g,
  /className={`([^`]*)`}/g,
  // Template literals with expressions (capture static parts)
  /class:\s*["'`]([^"'`]*)["'`]/g,
  // Twig classes
  /\|add_class\(['"]([^'"]*)['"]\)/g,
];

// Parse a single class name and extract its components
function parseClassName(className) {
  // Handle arbitrary values first: utility-[value]
  const arbitraryMatch = className.match(/^(?:([a-z-]+):)?(?:([a-z-]+):)?([a-z-]+)-\[([^\]]+)\]$/);
  if (arbitraryMatch) {
    const [, variant1, variant2, utility, value] = arbitraryMatch;
    return {
      type: 'arbitrary',
      variants: [variant1, variant2].filter(Boolean),
      utility,
      value,
      raw: className,
    };
  }

  // Handle color opacity: bg-primary/75, text-white/50
  const opacityMatch = className.match(/^(?:([a-z-]+):)?(?:([a-z-]+):)?([a-z]+)-([a-z0-9-]+)\/(\d+)$/);
  if (opacityMatch) {
    const [, variant1, variant2, utility, color, opacity] = opacityMatch;
    return {
      type: 'opacity',
      variants: [variant1, variant2].filter(Boolean),
      utility,
      value: color,
      opacity: parseInt(opacity, 10),
      raw: className,
    };
  }

  // Handle standard utilities with optional variants
  // Pattern: [breakpoint:]?[state:]?utility-[modifier-]?value
  const parts = className.split(':');
  const utilityPart = parts.pop(); // Last part is the utility
  const variants = parts; // Everything before is variants

  // Try to match against known utilities
  for (const utilityName of UTILITY_BASES) {
    const utility = UTILITIES[utilityName];
    const modifiers = utility.modifiers ? Object.keys(utility.modifiers) : [''];
    const values = Object.keys(utility.values || {});

    for (const modifier of modifiers) {
      for (const value of values) {
        // Build expected class pattern
        let expectedClass;
        if (modifier === '') {
          expectedClass = `${utilityName}-${value}`;
        } else {
          expectedClass = `${utilityName}-${modifier}-${value}`;
        }

        // Handle negative values
        const negativeExpected = `neg-${expectedClass}`;

        if (utilityPart === expectedClass || utilityPart === negativeExpected) {
          return {
            type: 'standard',
            variants,
            utility: utilityName,
            modifier: modifier || null,
            value,
            negative: utilityPart.startsWith('neg-'),
            raw: className,
          };
        }
      }
    }

    // Also check for utilities without value suffix (like "flex", "grid")
    if (utilityPart === utilityName && utility.values) {
      const firstValue = Object.keys(utility.values)[0];
      if (firstValue === utilityName || utility.values[utilityName]) {
        return {
          type: 'standard',
          variants,
          utility: utilityName,
          modifier: null,
          value: utilityName,
          raw: className,
        };
      }
    }
  }

  // Unrecognized class
  return {
    type: 'unknown',
    raw: className,
  };
}

// Extract all classes from file content
function extractClasses(content) {
  const classes = new Set();

  for (const pattern of CLASS_PATTERNS) {
    let match;
    pattern.lastIndex = 0;

    while ((match = pattern.exec(content)) !== null) {
      const classString = match[1];
      // Split on whitespace to get individual classes
      const individualClasses = classString.split(/\s+/).filter(Boolean);
      individualClasses.forEach(cls => classes.add(cls));
    }
  }

  return Array.from(classes);
}

// Scan files and return parsed utility information
async function scanFiles(patterns, options = {}) {
  const cwd = options.cwd || process.cwd();
  const ignore = options.ignore || ['**/node_modules/**', '**/dist/**', '**/.git/**'];

  const allClasses = new Set();
  const parsedUtilities = {
    standard: [],
    arbitrary: [],
    opacity: [],
    unknown: [],
  };

  for (const pattern of patterns) {
    const files = await glob(pattern, { cwd, ignore, absolute: true });

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const classes = extractClasses(content);

        for (const cls of classes) {
          if (allClasses.has(cls)) continue;
          allClasses.add(cls);

          const parsed = parseClassName(cls);
          if (parsed.type === 'standard') {
            parsedUtilities.standard.push(parsed);
          } else if (parsed.type === 'arbitrary') {
            parsedUtilities.arbitrary.push(parsed);
          } else if (parsed.type === 'opacity') {
            parsedUtilities.opacity.push(parsed);
          } else {
            parsedUtilities.unknown.push(parsed);
          }
        }
      } catch (err) {
        console.warn(`JIT Scanner: Could not read ${file}: ${err.message}`);
      }
    }
  }

  return {
    total: allClasses.size,
    classes: Array.from(allClasses),
    ...parsedUtilities,
  };
}

// Generate a summary report
function generateReport(scanResult) {
  const lines = [
    'JIT Scanner Report',
    '==================',
    '',
    `Total classes found: ${scanResult.total}`,
    `  Standard utilities: ${scanResult.standard.length}`,
    `  Arbitrary values: ${scanResult.arbitrary.length}`,
    `  Color opacity: ${scanResult.opacity.length}`,
    `  Unknown/custom: ${scanResult.unknown.length}`,
    '',
  ];

  if (scanResult.standard.length > 0) {
    lines.push('Standard Utilities:');
    const grouped = {};
    for (const util of scanResult.standard) {
      const key = util.utility;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(util.raw);
    }
    for (const [utility, classes] of Object.entries(grouped).sort()) {
      lines.push(`  ${utility}: ${classes.length} usage(s)`);
    }
    lines.push('');
  }

  if (scanResult.arbitrary.length > 0) {
    lines.push('Arbitrary Values:');
    for (const util of scanResult.arbitrary) {
      lines.push(`  ${util.raw}`);
    }
    lines.push('');
  }

  if (scanResult.opacity.length > 0) {
    lines.push('Color Opacity:');
    for (const util of scanResult.opacity) {
      lines.push(`  ${util.raw}`);
    }
    lines.push('');
  }

  if (scanResult.unknown.length > 0 && scanResult.unknown.length <= 50) {
    lines.push('Unknown Classes (may be custom or from other libraries):');
    for (const util of scanResult.unknown.slice(0, 20)) {
      lines.push(`  ${util.raw}`);
    }
    if (scanResult.unknown.length > 20) {
      lines.push(`  ... and ${scanResult.unknown.length - 20} more`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

module.exports = {
  scanFiles,
  parseClassName,
  extractClasses,
  generateReport,
  UTILITY_BASES,
  BREAKPOINT_PREFIXES,
  STATE_PREFIXES,
};
