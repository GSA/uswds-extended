const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const discardComments = require("postcss-discard-comments");
const colorOpacity = require("./postcss-plugins/color-opacity");
const arbitraryValues = require("./postcss-plugins/arbitrary-values");
const { scanFiles, generateReport } = require("./jit-scanner");
const { src, dest } = require("gulp");
const postcss = require("gulp-postcss");
const replace = require("gulp-replace");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass-embedded"));
const sourcemaps = require("gulp-sourcemaps");
const fs = require("fs");
const path = require("path");
const dutil = require("./utils/doc-util");
const pkg = require("../package.json");

// Load USWDS Extended configuration
const configPath = path.resolve(__dirname, "../uswds-extended.config.js");
let extendedConfig = {};
if (fs.existsSync(configPath)) {
  delete require.cache[configPath]; // Clear cache for hot reload
  extendedConfig = require(configPath);
}

/**
 * Merge scanned arbitrary values with manual safelist
 */
function mergeArbitraryValues(scanned, manual) {
  const merged = { ...scanned };
  for (const [utility, values] of Object.entries(manual || {})) {
    if (!merged[utility]) {
      merged[utility] = [];
    }
    const valueSet = new Set(merged[utility]);
    for (const value of (Array.isArray(values) ? values : [values])) {
      valueSet.add(value);
    }
    merged[utility] = Array.from(valueSet).sort();
  }
  return merged;
}

/**
 * Run JIT scanner on configured content patterns
 */
async function runJitScanner() {
  const contentPatterns = extendedConfig.content || [];

  if (contentPatterns.length === 0) {
    dutil.logMessage("jit", "No content patterns configured, skipping JIT scan");
    return extendedConfig.arbitraryValues || {};
  }

  dutil.logMessage("jit", `Scanning ${contentPatterns.length} pattern(s) for arbitrary values...`);

  const scanned = await scanFiles(contentPatterns);
  const merged = mergeArbitraryValues(scanned, extendedConfig.arbitraryValues);

  const valueCount = Object.values(merged).reduce((sum, arr) => sum + arr.length, 0);
  const utilityCount = Object.keys(merged).length;

  if (valueCount > 0) {
    dutil.logMessage("jit", `Found ${valueCount} arbitrary value(s) across ${utilityCount} utilities`);
  } else {
    dutil.logMessage("jit", "No arbitrary values found in content");
  }

  return merged;
}

module.exports = {
  async compileSass() {
    dutil.logMessage("sass", "Compiling Sass");

    // Run JIT scanner to get arbitrary values
    const arbitraryValuesConfig = await runJitScanner();

    const pluginsProcess = [
      discardComments(),
      autoprefixer(),
      colorOpacity({ opacitySteps: extendedConfig.opacitySteps }),
      arbitraryValues({
        arbitraryValues: arbitraryValuesConfig,
        important: extendedConfig.important,
      }),
    ];
    const pluginsMinify = [csso({ forceMediaMerge: false })];

    return src("src/stylesheets/uswds.scss")
      .pipe(sourcemaps.init({ largeFile: true }))
      .pipe(
        sass({
          loadPaths: ["./packages"],
          style: "expanded",
        }).on("error", function handleError(error) {
          dutil.logError(error);
          this.emit("end");
        }),
      )
      .pipe(postcss(pluginsProcess))
      .pipe(replace(/\buswds @version\b/g, `uswds v${pkg.version}`))
      .pipe(dest("dist/css"))
      .pipe(postcss(pluginsMinify))
      .pipe(
        rename({
          suffix: ".min",
        }),
      )
      .pipe(sourcemaps.write("."))
      .pipe(dest("dist/css"));
  },

  /**
   * Run JIT scanner standalone and report results
   */
  async jitScan() {
    dutil.logMessage("jit", "Running JIT Scanner");

    const contentPatterns = extendedConfig.content || [];
    if (contentPatterns.length === 0) {
      dutil.logMessage("jit", "No content patterns configured in uswds-extended.config.js");
      return;
    }

    const scanned = await scanFiles(contentPatterns);
    const merged = mergeArbitraryValues(scanned, extendedConfig.arbitraryValues);

    console.log("\n" + generateReport(merged));
  },
};
