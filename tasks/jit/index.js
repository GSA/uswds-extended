// Full JIT Engine for USWDS Extended
// Main entry point that ties together scanning and generation

const { scanFiles, generateReport } = require('./scanner');
const { generateCSS } = require('./generator');
const fs = require('fs');
const path = require('path');

// Default configuration
const DEFAULT_CONFIG = {
  content: [],
  important: true,
  output: null, // If set, writes CSS to this file
  verbose: false,
};

// Main JIT function - scan and generate in one step
async function jit(config = {}) {
  const options = { ...DEFAULT_CONFIG, ...config };

  if (options.content.length === 0) {
    console.warn('JIT: No content patterns specified');
    return { css: '', stats: { total: 0 } };
  }

  // Scan files
  const scanResult = await scanFiles(options.content, {
    cwd: options.cwd,
    ignore: options.ignore,
  });

  if (options.verbose) {
    console.log(generateReport(scanResult));
  }

  // Generate CSS
  const result = generateCSS(scanResult, {
    important: options.important,
  });

  // Write to file if output specified
  if (options.output) {
    const outputPath = path.resolve(options.cwd || process.cwd(), options.output);
    fs.writeFileSync(outputPath, result.css, 'utf8');
    console.log(`JIT: Wrote ${result.stats.total} utilities to ${outputPath}`);
  }

  return result;
}

// PostCSS plugin that injects JIT-generated CSS
function postcssJIT(options = {}) {
  let cachedCSS = null;
  let lastScanTime = 0;
  const CACHE_TTL = 1000; // 1 second cache

  return {
    postcssPlugin: 'postcss-uswds-jit',

    async Once(root, { result }) {
      const now = Date.now();

      // Use cached CSS if recent
      if (cachedCSS && (now - lastScanTime) < CACHE_TTL) {
        appendCSS(root, cachedCSS);
        return;
      }

      // Get content patterns from options or config file
      let contentPatterns = options.content || [];

      if (contentPatterns.length === 0) {
        // Try to load from config file
        const configPath = path.resolve(process.cwd(), 'uswds-extended.config.js');
        if (fs.existsSync(configPath)) {
          delete require.cache[configPath];
          const config = require(configPath);
          contentPatterns = config.content || [];
        }
      }

      if (contentPatterns.length === 0) {
        return;
      }

      // Scan and generate
      const jitResult = await jit({
        content: contentPatterns,
        important: options.important !== false,
        verbose: options.verbose,
      });

      cachedCSS = jitResult.css;
      lastScanTime = now;

      appendCSS(root, jitResult.css);

      // Add stats to result messages
      result.messages.push({
        type: 'jit-stats',
        plugin: 'postcss-uswds-jit',
        stats: jitResult.stats,
      });
    },
  };
}
postcssJIT.postcss = true;

// Helper to append CSS to PostCSS root
function appendCSS(root, css) {
  const postcss = require('postcss');
  const parsed = postcss.parse(css);
  root.append(parsed);
}

// Gulp task wrapper
async function gulpJIT(options = {}) {
  const config = loadConfig();
  const contentPatterns = options.content || config.content || [];

  if (contentPatterns.length === 0) {
    console.log('[jit] No content patterns configured');
    return { css: '', stats: { total: 0 } };
  }

  console.log(`[jit] Scanning ${contentPatterns.length} pattern(s)...`);

  const result = await jit({
    content: contentPatterns,
    important: options.important ?? config.important ?? true,
    verbose: options.verbose ?? false,
  });

  console.log(`[jit] Generated ${result.stats.total} utilities`);
  console.log(`      Standard: ${result.stats.standard}, Arbitrary: ${result.stats.arbitrary}, Opacity: ${result.stats.opacity}`);

  if (result.errors.length > 0) {
    console.warn(`[jit] ${result.errors.length} error(s) during generation`);
  }

  return result;
}

// Load config file
function loadConfig() {
  const configPath = path.resolve(process.cwd(), 'uswds-extended.config.js');
  if (fs.existsSync(configPath)) {
    delete require.cache[configPath];
    return require(configPath);
  }
  return {};
}

module.exports = {
  jit,
  postcssJIT,
  gulpJIT,
  scanFiles,
  generateCSS,
  generateReport,
};
