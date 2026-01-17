#!/usr/bin/env node
/**
 * Postinstall script that changes package name from "uswds-extended" to "uswds"
 * This allows the package to work as a drop-in replacement for @uswds/uswds
 * with tools like @uswds/compile that resolve paths based on package name.
 */

const fs = require('fs');
const path = require('path');

const pkgPath = path.resolve(__dirname, '../package.json');

try {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  if (pkg.name === 'uswds-extended') {
    pkg.name = 'uswds';
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  }
} catch (err) {
  // Silently fail - don't break installation
}
