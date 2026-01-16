/**
 * Custom CSS Processing Task
 *
 * This task processes custom stylesheets that use @apply directives,
 * enabling Tailwind-like utility composition in custom CSS files.
 *
 * Usage:
 *   1. Create custom CSS files in src/stylesheets/custom/
 *   2. Use @apply to compose utilities:
 *
 *      .btn-primary {
 *        @apply padding-x-2 padding-y-1 bg-primary text-white radius-md;
 *      }
 *
 *   3. Run: npx gulp compileCustomCSS
 *   4. Output: dist/css/custom.css
 */

const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const postcssApply = require('./postcss-plugins/apply');
const postcss = require('postcss');
const { src, dest } = require('gulp');
const gulpPostcss = require('gulp-postcss');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const dutil = require('./utils/doc-util');
const fs = require('fs');
const path = require('path');

/**
 * Load the compiled USWDS CSS to extract utility definitions
 */
function loadUtilityCSS() {
  const uswdsCSSPath = path.resolve(__dirname, '../dist/css/uswds.css');

  if (!fs.existsSync(uswdsCSSPath)) {
    console.warn(
      'Warning: uswds.css not found. Run compileSass first to generate utilities.'
    );
    return null;
  }

  const css = fs.readFileSync(uswdsCSSPath, 'utf8');
  return postcss.parse(css);
}

module.exports = {
  /**
   * Compile custom CSS files with @apply support
   */
  compileCustomCSS() {
    dutil.logMessage('custom-css', 'Compiling custom CSS with @apply support');

    const utilityRoot = loadUtilityCSS();

    if (!utilityRoot) {
      dutil.logMessage(
        'custom-css',
        'Skipping - no USWDS utilities available. Run compileSass first.'
      );
      return Promise.resolve();
    }

    const pluginsProcess = [
      postcssApply({
        utilityRoot: utilityRoot,
        logWarnings: true,
      }),
      autoprefixer(),
    ];

    const pluginsMinify = [csso({ forceMediaMerge: false })];

    return src('src/stylesheets/custom/**/*.css')
      .pipe(sourcemaps.init())
      .pipe(concat('custom.css'))
      .pipe(gulpPostcss(pluginsProcess))
      .pipe(dest('dist/css'))
      .pipe(gulpPostcss(pluginsMinify))
      .pipe(rename({ suffix: '.min' }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/css'));
  },
};
