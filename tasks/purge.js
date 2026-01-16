/**
 * PurgeCSS Task
 *
 * Removes unused CSS from the USWDS build for production.
 * This can significantly reduce file size by removing utilities
 * that aren't used in your project.
 *
 * Usage:
 *   npx gulp purgeSass
 *
 * The task reads the purgecss.config.js file for configuration.
 * Make sure to update the 'content' array with your project's files.
 */

const { src, dest } = require('gulp');
const { purgeCSSPlugin } = require('@fullhuman/postcss-purgecss');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const csso = require('postcss-csso');
const sourcemaps = require('gulp-sourcemaps');
const dutil = require('./utils/doc-util');
const fs = require('fs');
const path = require('path');

// Load PurgeCSS configuration
const configPath = path.resolve(__dirname, '../purgecss.config.js');
let purgeConfig = {};
if (fs.existsSync(configPath)) {
  purgeConfig = require(configPath);
}

module.exports = {
  /**
   * Purge unused CSS from the USWDS build
   */
  purgeSass() {
    dutil.logMessage('purge', 'Removing unused CSS...');

    if (!purgeConfig.content || purgeConfig.content.length === 0) {
      dutil.logMessage(
        'purge',
        'Warning: No content files specified in purgecss.config.js'
      );
      dutil.logMessage(
        'purge',
        'Update the config with your project files to enable purging.'
      );
    }

    const plugins = [
      purgeCSSPlugin({
        content: purgeConfig.content || [],
        safelist: purgeConfig.safelist || {},
        extractors: purgeConfig.extractors || [],
        fontFace: purgeConfig.fontFace !== false,
        keyframes: purgeConfig.keyframes !== false,
        variables: purgeConfig.variables !== false,
      }),
    ];

    const minifyPlugins = [csso({ forceMediaMerge: false })];

    return src('dist/css/uswds.css')
      .pipe(sourcemaps.init())
      .pipe(postcss(plugins))
      .pipe(rename('uswds.purged.css'))
      .pipe(dest('dist/css'))
      .pipe(postcss(minifyPlugins))
      .pipe(rename({ suffix: '.min' }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/css'));
  },

  /**
   * Report file size comparison between original and purged CSS
   */
  async reportPurgeStats() {
    const originalPath = path.resolve(__dirname, '../dist/css/uswds.min.css');
    const purgedPath = path.resolve(__dirname, '../dist/css/uswds.purged.min.css');

    if (!fs.existsSync(originalPath) || !fs.existsSync(purgedPath)) {
      dutil.logMessage('purge', 'Build files not found. Run compileSass and purgeSass first.');
      return;
    }

    const originalSize = fs.statSync(originalPath).size;
    const purgedSize = fs.statSync(purgedPath).size;
    const savings = originalSize - purgedSize;
    const percentage = ((savings / originalSize) * 100).toFixed(1);

    dutil.logMessage('purge', '=== PurgeCSS Results ===');
    dutil.logMessage('purge', `Original: ${(originalSize / 1024).toFixed(1)} KB`);
    dutil.logMessage('purge', `Purged:   ${(purgedSize / 1024).toFixed(1)} KB`);
    dutil.logMessage('purge', `Saved:    ${(savings / 1024).toFixed(1)} KB (${percentage}%)`);
  },
};
