// Full JIT CSS Generator for USWDS Extended
// Generates CSS only for utilities that are actually used

const { UTILITIES, BREAKPOINTS, STATES, GROUP_PEER } = require('./utility-definitions');

// Escape special characters for CSS selectors
function escapeSelector(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\//g, '\\/')
    .replace(/:/g, '\\:')
    .replace(/\./g, '\\.')
    .replace(/%/g, '\\%')
    .replace(/,/g, '\\,')
    .replace(/\s/g, '\\ ')
    .replace(/#/g, '\\#')
    .replace(/\+/g, '\\+');
}

// Generate CSS for a standard utility
function generateStandardUtility(parsed, options = {}) {
  const { utility, modifier, value, variants, negative } = parsed;
  const utilityDef = UTILITIES[utility];
  if (!utilityDef) return null;

  // Get the CSS value
  let cssValue = utilityDef.values[value];
  if (!cssValue) return null;

  // Handle negative values
  if (negative && utilityDef.supportsNegative) {
    if (typeof cssValue === 'string' && !cssValue.startsWith('-')) {
      cssValue = `-${cssValue}`;
    }
  }

  // Get the CSS properties
  let properties;
  if (utilityDef.modifiers && modifier !== null) {
    properties = utilityDef.modifiers[modifier || ''];
  } else {
    properties = [utilityDef.property];
  }

  if (!properties) return null;

  // Build the selector
  const baseSelector = parsed.raw;
  const escapedSelector = escapeSelector(baseSelector);

  // Build CSS declarations
  const declarations = properties
    .map(prop => `  ${prop}: ${cssValue}${options.important ? ' !important' : ''};`)
    .join('\n');

  // Handle variants
  let css = '';

  if (variants.length === 0) {
    // No variants - simple rule
    css = `.${escapedSelector} {\n${declarations}\n}\n`;
  } else {
    // Process variants
    const breakpointVariant = variants.find(v => BREAKPOINTS[v]);
    const stateVariant = variants.find(v => STATES[v]);
    const groupPeerVariant = variants.find(v => GROUP_PEER[v]);

    let selector = `.${escapedSelector}`;
    let wrapInMedia = null;

    if (stateVariant) {
      selector += STATES[stateVariant];
    }

    if (groupPeerVariant) {
      if (groupPeerVariant.startsWith('group-')) {
        selector = `${GROUP_PEER[groupPeerVariant]} ${selector}`;
      } else if (groupPeerVariant.startsWith('peer-')) {
        selector = `${GROUP_PEER[groupPeerVariant]} ${selector}`;
      }
    }

    if (breakpointVariant) {
      wrapInMedia = BREAKPOINTS[breakpointVariant];
    }

    const rule = `${selector} {\n${declarations}\n}`;

    if (wrapInMedia) {
      css = `@media (min-width: ${wrapInMedia}) {\n  ${rule.replace(/\n/g, '\n  ')}\n}\n`;
    } else {
      css = `${rule}\n`;
    }
  }

  return css;
}

// Generate CSS for an arbitrary value utility
function generateArbitraryUtility(parsed, options = {}) {
  const { utility, value, variants } = parsed;

  // Map utility prefix to CSS property
  const ARBITRARY_PROPERTY_MAP = {
    'w': 'width',
    'h': 'height',
    'min-w': 'min-width',
    'max-w': 'max-width',
    'min-h': 'min-height',
    'max-h': 'max-height',
    'p': 'padding',
    'pt': 'padding-top',
    'pr': 'padding-right',
    'pb': 'padding-bottom',
    'pl': 'padding-left',
    'px': ['padding-left', 'padding-right'],
    'py': ['padding-top', 'padding-bottom'],
    'm': 'margin',
    'mt': 'margin-top',
    'mr': 'margin-right',
    'mb': 'margin-bottom',
    'ml': 'margin-left',
    'mx': ['margin-left', 'margin-right'],
    'my': ['margin-top', 'margin-bottom'],
    'gap': 'gap',
    'gap-x': 'column-gap',
    'gap-y': 'row-gap',
    'top': 'top',
    'right': 'right',
    'bottom': 'bottom',
    'left': 'left',
    'inset': 'inset',
    'z': 'z-index',
    'text': 'font-size',
    'leading': 'line-height',
    'tracking': 'letter-spacing',
    'border': 'border-width',
    'rounded': 'border-radius',
    'opacity': 'opacity',
    'basis': 'flex-basis',
    'grid-cols': 'grid-template-columns',
    'grid-rows': 'grid-template-rows',
    'col-span': 'grid-column',
    'row-span': 'grid-row',
    'bg': 'background-color',
    'text-color': 'color',
    'border-color': 'border-color',
  };

  const properties = ARBITRARY_PROPERTY_MAP[utility];
  if (!properties) return null;

  const propList = Array.isArray(properties) ? properties : [properties];

  // Build selector
  const escapedSelector = escapeSelector(parsed.raw);

  // Build declarations
  const declarations = propList
    .map(prop => `  ${prop}: ${value}${options.important ? ' !important' : ''};`)
    .join('\n');

  // Handle variants
  let css = '';
  const breakpointVariant = variants.find(v => BREAKPOINTS[v]);
  const stateVariant = variants.find(v => STATES[v]);

  let selector = `.${escapedSelector}`;

  if (stateVariant) {
    selector += STATES[stateVariant];
  }

  const rule = `${selector} {\n${declarations}\n}`;

  if (breakpointVariant) {
    css = `@media (min-width: ${BREAKPOINTS[breakpointVariant]}) {\n  ${rule.replace(/\n/g, '\n  ')}\n}\n`;
  } else {
    css = `${rule}\n`;
  }

  return css;
}

// Generate CSS for color opacity utilities
function generateOpacityUtility(parsed, options = {}) {
  const { utility, value, opacity, variants } = parsed;

  const utilityDef = UTILITIES[utility];
  if (!utilityDef || !utilityDef.supportsOpacity) return null;

  const baseColor = utilityDef.values[value];
  if (!baseColor) return null;

  // Use color-mix for opacity
  const cssValue = `color-mix(in srgb, ${baseColor} ${opacity}%, transparent)`;

  // Build selector
  const escapedSelector = escapeSelector(parsed.raw);

  const declaration = `  ${utilityDef.property}: ${cssValue}${options.important ? ' !important' : ''};`;

  // Handle variants
  let css = '';
  const breakpointVariant = variants.find(v => BREAKPOINTS[v]);
  const stateVariant = variants.find(v => STATES[v]);

  let selector = `.${escapedSelector}`;

  if (stateVariant) {
    selector += STATES[stateVariant];
  }

  const rule = `${selector} {\n${declaration}\n}`;

  if (breakpointVariant) {
    css = `@media (min-width: ${BREAKPOINTS[breakpointVariant]}) {\n  ${rule.replace(/\n/g, '\n  ')}\n}\n`;
  } else {
    css = `${rule}\n`;
  }

  return css;
}

// Main generator function
function generateCSS(scanResult, options = {}) {
  const cssRules = [];
  const errors = [];

  // Generate standard utilities
  for (const parsed of scanResult.standard) {
    try {
      const css = generateStandardUtility(parsed, options);
      if (css) {
        cssRules.push(css);
      }
    } catch (err) {
      errors.push({ class: parsed.raw, error: err.message });
    }
  }

  // Generate arbitrary value utilities
  for (const parsed of scanResult.arbitrary) {
    try {
      const css = generateArbitraryUtility(parsed, options);
      if (css) {
        cssRules.push(css);
      }
    } catch (err) {
      errors.push({ class: parsed.raw, error: err.message });
    }
  }

  // Generate opacity utilities
  for (const parsed of scanResult.opacity) {
    try {
      const css = generateOpacityUtility(parsed, options);
      if (css) {
        cssRules.push(css);
      }
    } catch (err) {
      errors.push({ class: parsed.raw, error: err.message });
    }
  }

  // Sort rules: base rules first, then media queries
  const baseRules = cssRules.filter(r => !r.startsWith('@media'));
  const mediaRules = cssRules.filter(r => r.startsWith('@media'));

  // Group media queries by breakpoint
  const mediaGroups = {};
  for (const rule of mediaRules) {
    const match = rule.match(/@media \(min-width: ([^)]+)\)/);
    if (match) {
      const breakpoint = match[1];
      if (!mediaGroups[breakpoint]) {
        mediaGroups[breakpoint] = [];
      }
      // Extract the inner rule - remove outer @media wrapper and indentation
      const inner = rule
        .replace(/@media[^{]+\{\n?/, '')  // Remove @media opening
        .replace(/\n?\}\n?$/, '')          // Remove final closing brace
        .replace(/^  /gm, '');             // Remove indentation
      mediaGroups[breakpoint].push(inner.trim());
    }
  }

  // Build final CSS
  let finalCSS = '/* JIT Generated Utilities */\n\n';
  finalCSS += baseRules.join('\n');

  // Add media queries in breakpoint order
  const breakpointOrder = Object.entries(BREAKPOINTS).sort((a, b) => {
    const aVal = parseFloat(a[1]);
    const bVal = parseFloat(b[1]);
    return aVal - bVal;
  });

  for (const [name, value] of breakpointOrder) {
    if (mediaGroups[value] && mediaGroups[value].length > 0) {
      finalCSS += `\n@media (min-width: ${value}) {\n`;
      finalCSS += mediaGroups[value].map(r => '  ' + r.replace(/\n/g, '\n  ')).join('\n');
      finalCSS += '\n}\n';
    }
  }

  return {
    css: finalCSS,
    stats: {
      total: cssRules.length,
      standard: scanResult.standard.length,
      arbitrary: scanResult.arbitrary.length,
      opacity: scanResult.opacity.length,
      errors: errors.length,
    },
    errors,
  };
}

module.exports = {
  generateCSS,
  generateStandardUtility,
  generateArbitraryUtility,
  generateOpacityUtility,
  escapeSelector,
};
