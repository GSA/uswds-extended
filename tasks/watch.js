const { watch, series, parallel } = require("gulp");
const { unitTests, sassTests } = require("./test");
const { lintSass, typecheck } = require("./lint");
const { compileSass } = require("./sass");
const { compileJS } = require("./javascript");
const { build } = require("./build");
const path = require("path");
const fs = require("fs");

// Load content patterns from config for JIT watching
const configPath = path.resolve(__dirname, "../uswds.config.js");
let contentPatterns = [];
if (fs.existsSync(configPath)) {
  delete require.cache[configPath];
  const config = require(configPath);
  contentPatterns = config.content || [];
}

// Watch Sass and JS files.
function watchFiles() {
  // Watch all my sass files and compile sass if a file changes.
  watch(
    "./src/**/**/*.scss",
    parallel(lintSass, compileSass),
  );

  // Watch all my JS files and compile if a file changes.
  watch(
    "./src/**/**/*.js",
    series(
      parallel(typecheck, compileJS),
    )
  );

  // Watch all my unit tests and run if a file changes.
  watch(
    "./src/**/*.spec.js",
    series(
      series(unitTests, sassTests),
      (done) => done())
  );

  // JIT: Watch content files for arbitrary value changes
  // When HTML/JSX/TSX files change, recompile Sass to pick up new arbitrary values
  if (contentPatterns.length > 0) {
    watch(
      contentPatterns,
      { ignoreInitial: true },
      compileSass
    );
    console.log("[jit] Watching content files for arbitrary values:");
    contentPatterns.forEach(p => console.log(`  - ${p}`));
  }
}

exports.watch = series(
  build,
  watchFiles
);
