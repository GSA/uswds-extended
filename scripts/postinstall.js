#!/usr/bin/env node
/**
 * Postinstall script for uswds-extended drop-in compatibility with @uswds/uswds.
 *
 * Creates a symlink at node_modules/@uswds/uswds pointing to uswds-extended,
 * allowing tools like @uswds/compile to resolve the package correctly.
 */

const fs = require('fs');
const path = require('path');

/**
 * Create the @uswds/uswds symlink for drop-in compatibility.
 * This is needed because tools like @uswds/compile import from '@uswds/uswds'.
 */
function createUswdsSymlink() {
  // INIT_CWD is set by npm to the directory where npm install was run
  const initCwd = process.env.INIT_CWD;
  if (!initCwd) {
    // Not running during npm install, skip
    return;
  }

  const nodeModulesDir = path.join(initCwd, 'node_modules');
  const uswdsExtendedDir = path.join(nodeModulesDir, 'uswds-extended');

  // Verify uswds-extended is installed
  if (!fs.existsSync(uswdsExtendedDir)) {
    return;
  }

  const uswdsScopeDir = path.join(nodeModulesDir, '@uswds');
  const symlinkPath = path.join(uswdsScopeDir, 'uswds');

  // Create @uswds directory if it doesn't exist
  if (!fs.existsSync(uswdsScopeDir)) {
    fs.mkdirSync(uswdsScopeDir, { recursive: true });
  }

  // Remove existing symlink if present
  if (fs.existsSync(symlinkPath)) {
    const stat = fs.lstatSync(symlinkPath);
    if (stat.isSymbolicLink()) {
      fs.unlinkSync(symlinkPath);
    } else {
      // It's the real @uswds/uswds package, don't overwrite
      return;
    }
  }

  // Create symlink: @uswds/uswds -> ../uswds-extended
  try {
    fs.symlinkSync('../uswds-extended', symlinkPath, 'dir');
  } catch (err) {
    // On Windows, symlinks may require admin privileges
    // Fall back silently - users can manually configure paths
  }
}

try {
  createUswdsSymlink();
} catch (err) {
  // Silently fail - don't break installation
}
