/*
 * USWDS Extended Compile
 *
 * A drop-in replacement/extension for @uswds/compile that adds
 * Tailwind-style features like color opacity, arbitrary values,
 * @apply directive, and PurgeCSS support.
 *
 * Usage in gulpfile.js:
 *
 *   const uswds = require("uswds-extended/compile");
 *
 *   // Configure paths (same as @uswds/compile)
 *   uswds.settings.version = 3;
 *   uswds.paths.dist.css = "./assets/css";
 *   uswds.paths.dist.theme = "./sass";
 *
 *   // Extended settings (optional)
 *   uswds.extended.opacitySteps = [25, 50, 75];
 *   uswds.extended.content = ["./src/pages/*.html", "./src/components/*.jsx"];
 *
 *   // Export tasks
 *   exports.compile = uswds.compile;
 *   exports.compileExtended = uswds.compileExtended;
 *   exports.customCSS = uswds.compileCustomCSS;
 *   exports.purge = uswds.purgeSass;
 *   exports.watch = uswds.watch;
 */

const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const discardComments = require("postcss-discard-comments");
const { src, dest, series, parallel, watch } = require("gulp");
const path = require("path");
const postcss = require("gulp-postcss");
const replace = require("gulp-replace");
const sass = require("gulp-sass")(require("sass-embedded"));
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const fs = require("fs");
const { purgeCSSPlugin } = require("@fullhuman/postcss-purgecss");

// Import PostCSS plugins from uswds-extended
const colorOpacity = require("../tasks/postcss-plugins/color-opacity");
const arbitraryValues = require("../tasks/postcss-plugins/arbitrary-values");
const postcssApply = require("../tasks/postcss-plugins/apply");
const { scanFiles } = require("../tasks/jit-scanner");

const log = console.log;
const colors = {
  red: "\x1b[31m%s\x1b[0m",
  blue: "\x1b[34m%s\x1b[0m",
  yellow: "\x1b[33m%s\x1b[0m",
  green: "\x1b[32m%s\x1b[0m",
};

/*
----------------------------------------
SETTINGS
----------------------------------------
*/

function resolvePackagePath() {
  // 1. Extended location (bundled packages) - PRIORITY
  // Relative to: node_modules/uswds-extended/compile/index.js
  const extendedPath = path.resolve(__dirname, "../packages");

  // 2. Standard location (peer dependency)
  const standardPath = "./node_modules/@uswds/uswds/packages";

  if (fs.existsSync(extendedPath)) {
    return extendedPath;
  }
  // Only fall back if bundled packages are missing
  return standardPath;
}

let settings = {
  version: 3,
  compile: {
    paths: {
      src: {
        uswds: null,
        sass: null,
        theme: null,
        fonts: null,
        img: null,
        js: null,
        projectSass: "./sass",
        projectIcons: "",
        customCSS: "./src/stylesheets/custom",
        defaults: {
          v3: {
            uswds: "./node_modules/@uswds",
            sass: resolvePackagePath(),
            theme: "./node_modules/@uswds/uswds/dist/theme",
            fonts: "./node_modules/@uswds/uswds/dist/fonts",
            img: "./node_modules/@uswds/uswds/dist/img",
            js: "./node_modules/@uswds/uswds/dist/js",
            components: "./node_modules/@uswds/uswds/dist/components",
          },
        },
      },
      dist: {
        theme: "./sass",
        img: "./assets/uswds/img",
        fonts: "./assets/uswds/fonts",
        js: "./assets/uswds/js",
        css: "./assets/uswds/css",
        components: "./assets/uswds/components",
      },
    },
    browserslist: ["> 2%", "last 2 versions", "not dead"],
    sassSourcemaps: true,
    sassDeprecationWarnings: false,
  },
  sprite: {
    width: 24,
    height: 24,
    separator: "-",
    projectIconsOnly: false,
  },
};

// Extended settings for uswds-extended features
let extended = {
  // Color opacity steps (e.g., bg-primary/75)
  opacitySteps: [5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95],

  // Arbitrary values safelist (merged with JIT-scanned values)
  arbitraryValues: {},

  // Content patterns for JIT scanning and PurgeCSS
  content: [],

  // PurgeCSS safelist
  safelist: {
    standard: [/^usa-/, /^is-/, /^has-/],
    deep: [],
    greedy: [],
  },

  // Make utilities !important
  important: false,
};

let paths = settings.compile.paths;

let getSrcFrom = (key) => {
  if (paths.src[key]) {
    return paths.src[key];
  }
  return paths.src.defaults.v3[key];
};

/*
----------------------------------------
HELPERS
----------------------------------------
*/

function handleError(error) {
  log(colors.red, error.message);
  return this.emit("end");
}

function logVersion() {
  log(colors.blue, `uswds-extended compile`);
  return Promise.resolve("logged version");
}

function getUswdsVersion() {
  try {
    const packagePath = path.join(
      path.dirname(require.resolve("@uswds/uswds")),
      "../../"
    );
    return require(`${packagePath}/package.json`).version;
  } catch {
    return "unknown";
  }
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
    for (const value of Array.isArray(values) ? values : [values]) {
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
  const contentPatterns = extended.content || [];

  if (contentPatterns.length === 0) {
    return extended.arbitraryValues || {};
  }

  log(
    colors.blue,
    `JIT: Scanning ${contentPatterns.length} pattern(s) for arbitrary values...`
  );

  const scanned = await scanFiles(contentPatterns);
  const merged = mergeArbitraryValues(scanned, extended.arbitraryValues);

  const valueCount = Object.values(merged).reduce(
    (sum, arr) => sum + arr.length,
    0
  );
  const utilityCount = Object.keys(merged).length;

  if (valueCount > 0) {
    log(
      colors.green,
      `JIT: Found ${valueCount} arbitrary value(s) across ${utilityCount} utilities`
    );
  }

  return merged;
}

/*
----------------------------------------
COPY TASKS
----------------------------------------
*/

const copy = {
  theme() {
    log(
      colors.blue,
      `Copy USWDS theme files: ${getSrcFrom("theme")} → ${paths.dist.theme}`
    );
    return src(`${getSrcFrom("theme")}/**/**`.replace("//", "/")).pipe(
      dest(paths.dist.theme)
    );
  },
  fonts() {
    log(
      colors.blue,
      `Copy USWDS fonts: ${getSrcFrom("fonts")} → ${paths.dist.fonts}`
    );
    return src(`${getSrcFrom("fonts")}/**/**`.replace("//", "/"), {
      encoding: false,
    }).pipe(dest(paths.dist.fonts));
  },
  images() {
    log(
      colors.blue,
      `Copy USWDS images: ${getSrcFrom("img")} →  ${paths.dist.img}`
    );
    return src(`${getSrcFrom("img")}/**/**`.replace("//", "/"), {
      encoding: false,
    }).pipe(dest(paths.dist.img));
  },
  js() {
    log(
      colors.blue,
      `Copy USWDS compiled JS: ${getSrcFrom("js")} →  ${paths.dist.js}`
    );
    return src(`${getSrcFrom("js")}/**/**`.replace("//", "/")).pipe(
      dest(paths.dist.js)
    );
  },
  components() {
    if (!fs.existsSync(getSrcFrom("components"))) return Promise.resolve();
    log(
      colors.blue,
      `Copy USWDS Web Components: ${getSrcFrom("components")} →  ${paths.dist.components}`
    );
    return src(`${getSrcFrom("components")}/**/**`.replace("//", "/")).pipe(
      dest(paths.dist.components)
    );
  },
};

/*
----------------------------------------
COMPILE TASKS
----------------------------------------
*/

/**
 * Standard SASS compilation (same as @uswds/compile)
 */
function buildSass() {
  const pkg = getUswdsVersion();

  log(colors.blue, `Compiling SASS with USWDS ${pkg}`);

  const buildSettings = {
    plugins: [
      autoprefixer({
        cascade: false,
        grid: true,
        overrideBrowserslist: settings.compile.browserslist,
      }),
      csso({ forceMediaMerge: false }),
    ],
    includes: [
      paths.dist.theme,
      getSrcFrom("sass"),
    ],
  };

  return src([`${paths.dist.theme}/*.scss`.replace("//", "/")], {
    sourcemaps: !!settings.compile.sassSourcemaps,
  })
    .pipe(
      sass({
        outputStyle: "compressed",
        loadPaths: buildSettings.includes,
        quietDeps: !settings.compile.sassDeprecationWarnings,
      }).on("error", handleError)
    )
    .pipe(replace(/\buswds @version\b/g, `based on uswds v${pkg}`))
    .pipe(postcss(buildSettings.plugins))
    .pipe(
      dest(paths.dist.css, {
        sourcemaps: settings.compile.sassSourcemaps ? "." : undefined,
      })
    );
}

/**
 * Extended SASS compilation with color opacity and arbitrary values
 */
async function buildSassExtended() {
  const pkg = getUswdsVersion();

  log(colors.blue, `Compiling extended SASS with USWDS ${pkg}`);

  // Run JIT scanner to get arbitrary values
  const arbitraryValuesConfig = await runJitScanner();

  const buildSettings = {
    includes: [
      paths.dist.theme,
      getSrcFrom("sass"),
    ],
  };

  const pluginsProcess = [
    discardComments(),
    autoprefixer({
      cascade: false,
      grid: true,
      overrideBrowserslist: settings.compile.browserslist,
    }),
    colorOpacity({ opacitySteps: extended.opacitySteps }),
    arbitraryValues({
      arbitraryValues: arbitraryValuesConfig,
      important: extended.important,
    }),
  ];

  const pluginsMinify = [csso({ forceMediaMerge: false })];

  return new Promise((resolve, reject) => {
    src([`${paths.dist.theme}/*.scss`.replace("//", "/")], {
      sourcemaps: !!settings.compile.sassSourcemaps,
    })
      .pipe(
        sass({
          outputStyle: "expanded",
          includePaths: buildSettings.includes,
          quietDeps: !settings.compile.sassDeprecationWarnings,
        }).on("error", handleError)
      )
      .pipe(postcss(pluginsProcess))
      .pipe(replace(/\buswds @version\b/g, `based on uswds-extended v${pkg}`))
      .pipe(dest(paths.dist.css))
      .pipe(postcss(pluginsMinify))
      .pipe(rename({ suffix: ".min" }))
      .pipe(
        dest(paths.dist.css, {
          sourcemaps: settings.compile.sassSourcemaps ? "." : undefined,
        })
      )
      .on("end", resolve)
      .on("error", reject);
  });
}

/**
 * Compile custom CSS with @apply directive support
 */
function buildCustomCSS() {
  log(colors.blue, "Compiling custom CSS with @apply support");

  const cssPath = `${paths.dist.css}/styles.css`.replace("//", "/");

  if (!fs.existsSync(cssPath)) {
    log(
      colors.yellow,
      "No compiled CSS found. Run compile or compileExtended first."
    );
    return Promise.resolve();
  }

  const utilityRoot = require("postcss").parse(fs.readFileSync(cssPath, "utf8"));

  const pluginsProcess = [
    postcssApply({
      utilityRoot: utilityRoot,
      logWarnings: true,
    }),
    autoprefixer(),
  ];

  const pluginsMinify = [csso({ forceMediaMerge: false })];

  const customCSSPath = paths.src.customCSS || "./src/stylesheets/custom";

  return src(`${customCSSPath}/**/*.css`.replace("//", "/"))
    .pipe(sourcemaps.init())
    .pipe(concat("custom.css"))
    .pipe(postcss(pluginsProcess))
    .pipe(dest(paths.dist.css))
    .pipe(postcss(pluginsMinify))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.dist.css));
}

/**
 * Purge unused CSS for production
 */
function purgeSass() {
  log(colors.blue, "Purging unused CSS...");

  if (!extended.content || extended.content.length === 0) {
    log(
      colors.yellow,
      "Warning: No content patterns specified. Set extended.content to enable purging."
    );
  }

  const plugins = [
    purgeCSSPlugin({
      content: extended.content || [],
      safelist: extended.safelist || {},
      fontFace: true,
      keyframes: true,
      variables: true,
    }),
  ];

  const minifyPlugins = [csso({ forceMediaMerge: false })];

  const cssPath = `${paths.dist.css}/styles.css`.replace("//", "/");

  return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(rename({ basename: "styles", suffix: ".purged" }))
    .pipe(dest(paths.dist.css))
    .pipe(postcss(minifyPlugins))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.dist.css));
}

/**
 * Report file size comparison
 */
async function reportPurgeStats() {
  const originalPath = `${paths.dist.css}/styles.min.css`.replace("//", "/");
  const purgedPath = `${paths.dist.css}/styles.purged.min.css`.replace("//", "/");

  if (!fs.existsSync(originalPath) || !fs.existsSync(purgedPath)) {
    log(colors.yellow, "Build files not found. Run compile and purgeSass first.");
    return;
  }

  const originalSize = fs.statSync(originalPath).size;
  const purgedSize = fs.statSync(purgedPath).size;
  const savings = originalSize - purgedSize;
  const percentage = ((savings / originalSize) * 100).toFixed(1);

  log(colors.green, "=== PurgeCSS Results ===");
  log(colors.blue, `Original: ${(originalSize / 1024).toFixed(1)} KB`);
  log(colors.blue, `Purged:   ${(purgedSize / 1024).toFixed(1)} KB`);
  log(colors.green, `Saved:    ${(savings / 1024).toFixed(1)} KB (${percentage}%)`);
}

/*
----------------------------------------
WATCH TASK
----------------------------------------
*/

function watchSass() {
  return watch(
    [
      `${paths.dist.theme}/**/*.scss`.replace("//", "/"),
      `${paths.src.projectSass}/**/*.scss`.replace("//", "/"),
    ],
    buildSassExtended
  );
}

/*
----------------------------------------
EXPORTS
----------------------------------------
*/

// Settings
exports.settings = settings;
exports.paths = paths;
exports.extended = extended;
exports.sprite = settings.sprite;

// Copy tasks
exports.copyTheme = copy.theme;
exports.copyFonts = copy.fonts;
exports.copyImages = copy.images;
exports.copyJS = copy.js;
exports.copyWebComponents = copy.components;
exports.copyAssets = series(copy.fonts, copy.images, copy.js, copy.components);
exports.copyAll = series(copy.theme, exports.copyAssets);

// Compile tasks
exports.compileSass = series(logVersion, buildSass);
exports.compileExtended = series(logVersion, buildSassExtended);
exports.compileCustomCSS = buildCustomCSS;

// Main compile (uses extended by default)
exports.compile = series(logVersion, buildSassExtended);

// Purge tasks
exports.purgeSass = purgeSass;
exports.reportPurgeStats = reportPurgeStats;
exports.purge = series(purgeSass, reportPurgeStats);

// Init and update
exports.init = series(logVersion, exports.copyAll, buildSassExtended);
exports.updateUswds = series(exports.copyAssets, buildSassExtended);

// Watch
exports.watch = series(logVersion, buildSassExtended, watchSass);

// Default
exports.default = exports.watch;
