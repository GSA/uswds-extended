// Full JIT Utility Definitions for USWDS Extended
// Maps utility class patterns to CSS properties and values

// USWDS Spacing Scale (8px base unit)
const SPACING_SCALE = {
  '0': '0',
  '1px': '1px',
  '2px': '2px',
  '05': '0.25rem',    // 4px
  '1': '0.5rem',      // 8px
  '105': '0.75rem',   // 12px
  '2': '1rem',        // 16px
  '205': '1.25rem',   // 20px
  '3': '1.5rem',      // 24px
  '4': '2rem',        // 32px
  '5': '2.5rem',      // 40px
  '6': '3rem',        // 48px
  '7': '3.5rem',      // 56px
  '8': '4rem',        // 64px
  '9': '4.5rem',      // 72px
  '10': '5rem',       // 80px
  '15': '7.5rem',     // 120px
  // Negative values
  'neg-1px': '-1px',
  'neg-2px': '-2px',
  'neg-05': '-0.25rem',
  'neg-1': '-0.5rem',
  'neg-105': '-0.75rem',
  'neg-2': '-1rem',
  'neg-205': '-1.25rem',
  'neg-3': '-1.5rem',
};

// USWDS Color Tokens
const COLORS = {
  // Theme colors
  'primary': '#005ea2',
  'primary-vivid': '#0050d8',
  'primary-dark': '#1a4480',
  'primary-darker': '#162e51',
  'primary-light': '#73b3e7',
  'primary-lighter': '#d9e8f6',
  'secondary': '#d83933',
  'secondary-vivid': '#e41d3d',
  'secondary-dark': '#b50909',
  'secondary-light': '#f2938c',
  'secondary-lighter': '#f8dfe2',
  'accent-cool': '#00bde3',
  'accent-cool-dark': '#28a0cb',
  'accent-cool-light': '#97d4ea',
  'accent-cool-lighter': '#e1f3f8',
  'accent-warm': '#fa9441',
  'accent-warm-dark': '#c05600',
  'accent-warm-light': '#ffbc78',
  'accent-warm-lighter': '#f2e4d4',
  // Base colors
  'base': '#71767a',
  'base-dark': '#565c65',
  'base-darker': '#3d4551',
  'base-darkest': '#1b1b1b',
  'base-light': '#a9aeb1',
  'base-lighter': '#dfe1e2',
  'base-lightest': '#f0f0f0',
  // Ink (text)
  'ink': '#1b1b1b',
  // White/Black
  'white': '#ffffff',
  'black': '#000000',
  'transparent': 'transparent',
  // State colors
  'info': '#00bde3',
  'info-dark': '#009ec1',
  'info-light': '#99deea',
  'info-lighter': '#e7f6f8',
  'success': '#00a91c',
  'success-dark': '#4d8055',
  'success-light': '#70e17b',
  'success-lighter': '#ecf3ec',
  'warning': '#ffbe2e',
  'warning-dark': '#e5a000',
  'warning-light': '#fee685',
  'warning-lighter': '#faf3d1',
  'error': '#d54309',
  'error-dark': '#b50909',
  'error-light': '#f39268',
  'error-lighter': '#f4e3db',
  'disabled': '#c9c9c9',
  'disabled-dark': '#adadad',
  'disabled-light': '#e6e6e6',
  'emergency': '#9c3d10',
  'emergency-dark': '#332d29',
};

// Width/Height values
const SIZING = {
  ...SPACING_SCALE,
  'auto': 'auto',
  'full': '100%',
  'viewport': '100vw',
  'screen': '100vh',
  // Fractional widths
  '1\\/2': '50%',
  '1\\/3': '33.333333%',
  '2\\/3': '66.666667%',
  '1\\/4': '25%',
  '3\\/4': '75%',
  '1\\/5': '20%',
  '2\\/5': '40%',
  '3\\/5': '60%',
  '4\\/5': '80%',
  '1\\/6': '16.666667%',
  '5\\/6': '83.333333%',
  '1\\/12': '8.333333%',
  '5\\/12': '41.666667%',
  '7\\/12': '58.333333%',
  '11\\/12': '91.666667%',
  // Modern viewport units
  'dvh': '100dvh',
  'svh': '100svh',
  'lvh': '100lvh',
  'dvw': '100dvw',
  'svw': '100svw',
  'lvw': '100lvw',
  // Content sizing
  'min-content': 'min-content',
  'max-content': 'max-content',
  'fit-content': 'fit-content',
};

// Font sizes
const FONT_SIZES = {
  '3xs': '0.69rem',
  '2xs': '0.79rem',
  'xs': '0.87rem',
  'sm': '0.93rem',
  'md': '1rem',
  'lg': '1.22rem',
  'xl': '1.34rem',
  '2xl': '1.49rem',
  '3xl': '1.76rem',
};

// Font weights
const FONT_WEIGHTS = {
  'thin': '100',
  'light': '300',
  'normal': '400',
  'medium': '500',
  'semibold': '600',
  'bold': '700',
  'black': '900',
};

// Line heights
const LINE_HEIGHTS = {
  '1': '1',
  '2': '1.15',
  '3': '1.35',
  '4': '1.5',
  '5': '1.62',
  '6': '1.75',
};

// Letter spacing
const LETTER_SPACING = {
  'tightest': '-0.03em',
  'tighter': '-0.02em',
  'tight': '-0.01em',
  'auto': 'initial',
  'wide': '0.025em',
  'wider': '0.05em',
  'widest': '0.1em',
};

// Z-index scale
const Z_INDEX = {
  'auto': 'auto',
  '0': '0',
  '100': '100',
  '200': '200',
  '300': '300',
  '400': '400',
  '500': '500',
};

// Border radius
const BORDER_RADIUS = {
  '0': '0',
  'sm': '0.125rem',
  'md': '0.25rem',
  'lg': '0.5rem',
  'pill': '99rem',
};

// Border widths
const BORDER_WIDTHS = {
  '0': '0',
  '1px': '1px',
  '2px': '2px',
  '05': '0.25rem',
  '1': '0.5rem',
  '105': '0.75rem',
  '2': '1rem',
};

// Opacity values
const OPACITY = {
  '0': '0',
  '10': '0.1',
  '20': '0.2',
  '30': '0.3',
  '40': '0.4',
  '50': '0.5',
  '60': '0.6',
  '70': '0.7',
  '80': '0.8',
  '90': '0.9',
  '100': '1',
};

// Box shadows
const BOX_SHADOWS = {
  'none': 'none',
  '1': '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
  '2': '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
  '3': '0 8px 16px 0 rgba(0, 0, 0, 0.1)',
  '4': '0 12px 24px 0 rgba(0, 0, 0, 0.1)',
  '5': '0 16px 32px 0 rgba(0, 0, 0, 0.1)',
};

// Display values
const DISPLAY = {
  'block': 'block',
  'flex': 'flex',
  'none': 'none',
  'inline': 'inline',
  'inline-block': 'inline-block',
  'inline-flex': 'inline-flex',
  'grid': 'grid',
  'table': 'table',
  'table-cell': 'table-cell',
  'table-row': 'table-row',
};

// Flex values
const FLEX_DIRECTION = {
  'row': 'row',
  'row-reverse': 'row-reverse',
  'column': 'column',
  'column-reverse': 'column-reverse',
};

const FLEX_WRAP = {
  'wrap': 'wrap',
  'no-wrap': 'nowrap',
  'wrap-reverse': 'wrap-reverse',
};

const JUSTIFY_CONTENT = {
  'start': 'flex-start',
  'end': 'flex-end',
  'center': 'center',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
};

const ALIGN_ITEMS = {
  'start': 'flex-start',
  'end': 'flex-end',
  'center': 'center',
  'stretch': 'stretch',
  'baseline': 'baseline',
};

// Grid values
const GRID_COLS = {};
for (let i = 1; i <= 12; i++) {
  GRID_COLS[i] = `repeat(${i}, minmax(0, 1fr))`;
}
GRID_COLS['none'] = 'none';

const GRID_ROWS = {};
for (let i = 1; i <= 6; i++) {
  GRID_ROWS[i] = `repeat(${i}, minmax(0, 1fr))`;
}
GRID_ROWS['none'] = 'none';

const COL_SPAN = {};
for (let i = 1; i <= 12; i++) {
  COL_SPAN[i] = `span ${i} / span ${i}`;
}
COL_SPAN['full'] = '1 / -1';
COL_SPAN['auto'] = 'auto';

const ROW_SPAN = {};
for (let i = 1; i <= 6; i++) {
  ROW_SPAN[i] = `span ${i} / span ${i}`;
}
ROW_SPAN['full'] = '1 / -1';
ROW_SPAN['auto'] = 'auto';

// Position values
const POSITION = {
  'static': 'static',
  'relative': 'relative',
  'absolute': 'absolute',
  'fixed': 'fixed',
  'sticky': 'sticky',
};

// Text align
const TEXT_ALIGN = {
  'left': 'left',
  'center': 'center',
  'right': 'right',
  'justify': 'justify',
};

// Text transform
const TEXT_TRANSFORM = {
  'uppercase': 'uppercase',
  'lowercase': 'lowercase',
  'capitalize': 'capitalize',
  'normal': 'none',
};

// Text decoration
const TEXT_DECORATION = {
  'underline': 'underline',
  'line-through': 'line-through',
  'no-underline': 'none',
};

// Overflow
const OVERFLOW = {
  'auto': 'auto',
  'hidden': 'hidden',
  'scroll': 'scroll',
  'visible': 'visible',
};

// Visibility
const VISIBILITY = {
  'visible': 'visible',
  'invisible': 'hidden',
};

// Cursor
const CURSOR = {
  'auto': 'auto',
  'default': 'default',
  'pointer': 'pointer',
  'wait': 'wait',
  'text': 'text',
  'move': 'move',
  'not-allowed': 'not-allowed',
};

// ============================================================================
// UTILITY DEFINITIONS
// Each utility maps a base class name to its CSS property and values
// ============================================================================

const UTILITIES = {
  // -------------------------------------------------------------------------
  // SPACING
  // -------------------------------------------------------------------------
  'margin': {
    property: 'margin',
    values: SPACING_SCALE,
    modifiers: {
      '': ['margin'],
      'x': ['margin-left', 'margin-right'],
      'y': ['margin-top', 'margin-bottom'],
      'top': ['margin-top'],
      'right': ['margin-right'],
      'bottom': ['margin-bottom'],
      'left': ['margin-left'],
    },
    responsive: true,
    supportsNegative: true,
  },

  'padding': {
    property: 'padding',
    values: SPACING_SCALE,
    modifiers: {
      '': ['padding'],
      'x': ['padding-left', 'padding-right'],
      'y': ['padding-top', 'padding-bottom'],
      'top': ['padding-top'],
      'right': ['padding-right'],
      'bottom': ['padding-bottom'],
      'left': ['padding-left'],
    },
    responsive: true,
  },

  'gap': {
    property: 'gap',
    values: SPACING_SCALE,
    modifiers: {
      '': ['gap'],
      'x': ['column-gap'],
      'y': ['row-gap'],
    },
    responsive: true,
  },

  // -------------------------------------------------------------------------
  // SIZING
  // -------------------------------------------------------------------------
  'width': {
    property: 'width',
    values: SIZING,
    responsive: true,
  },

  'height': {
    property: 'height',
    values: SIZING,
    responsive: true,
  },

  'min-w': {
    property: 'min-width',
    values: SIZING,
    responsive: true,
  },

  'max-w': {
    property: 'max-width',
    values: SIZING,
    responsive: true,
  },

  'min-h': {
    property: 'min-height',
    values: SIZING,
    responsive: true,
  },

  'max-h': {
    property: 'max-height',
    values: SIZING,
    responsive: true,
  },

  // -------------------------------------------------------------------------
  // COLORS
  // -------------------------------------------------------------------------
  'bg': {
    property: 'background-color',
    values: COLORS,
    responsive: true,
    states: ['hover', 'focus', 'active'],
    supportsOpacity: true,
  },

  'text': {
    property: 'color',
    values: COLORS,
    responsive: true,
    states: ['hover', 'focus'],
    supportsOpacity: true,
  },

  'border-color': {
    property: 'border-color',
    values: COLORS,
    states: ['hover', 'focus'],
  },

  // -------------------------------------------------------------------------
  // TYPOGRAPHY
  // -------------------------------------------------------------------------
  'font-size': {
    property: 'font-size',
    values: FONT_SIZES,
    responsive: true,
  },

  'font-weight': {
    property: 'font-weight',
    values: FONT_WEIGHTS,
  },

  'line-height': {
    property: 'line-height',
    values: LINE_HEIGHTS,
  },

  'letter-spacing': {
    property: 'letter-spacing',
    values: LETTER_SPACING,
  },

  'text-align': {
    property: 'text-align',
    values: TEXT_ALIGN,
    responsive: true,
  },

  'text-transform': {
    property: 'text-transform',
    values: TEXT_TRANSFORM,
  },

  'text-decoration': {
    property: 'text-decoration',
    values: TEXT_DECORATION,
    states: ['hover', 'focus'],
  },

  // -------------------------------------------------------------------------
  // LAYOUT
  // -------------------------------------------------------------------------
  'display': {
    property: 'display',
    values: DISPLAY,
    responsive: true,
  },

  'position': {
    property: 'position',
    values: POSITION,
  },

  'top': {
    property: 'top',
    values: { ...SPACING_SCALE, 'auto': 'auto' },
    supportsNegative: true,
  },

  'right': {
    property: 'right',
    values: { ...SPACING_SCALE, 'auto': 'auto' },
    supportsNegative: true,
  },

  'bottom': {
    property: 'bottom',
    values: { ...SPACING_SCALE, 'auto': 'auto' },
    supportsNegative: true,
  },

  'left': {
    property: 'left',
    values: { ...SPACING_SCALE, 'auto': 'auto' },
    supportsNegative: true,
  },

  'z-index': {
    property: 'z-index',
    values: Z_INDEX,
  },

  'overflow': {
    property: 'overflow',
    values: OVERFLOW,
    modifiers: {
      '': ['overflow'],
      'x': ['overflow-x'],
      'y': ['overflow-y'],
    },
  },

  'visibility': {
    property: 'visibility',
    values: VISIBILITY,
  },

  // -------------------------------------------------------------------------
  // FLEXBOX
  // -------------------------------------------------------------------------
  'flex': {
    property: 'display',
    values: { 'flex': 'flex', 'inline-flex': 'inline-flex' },
    responsive: true,
  },

  'flex-direction': {
    property: 'flex-direction',
    values: FLEX_DIRECTION,
    responsive: true,
  },

  'flex-wrap': {
    property: 'flex-wrap',
    values: FLEX_WRAP,
    responsive: true,
  },

  'justify-content': {
    property: 'justify-content',
    values: JUSTIFY_CONTENT,
    responsive: true,
  },

  'align-items': {
    property: 'align-items',
    values: ALIGN_ITEMS,
    responsive: true,
  },

  'align-self': {
    property: 'align-self',
    values: ALIGN_ITEMS,
    responsive: true,
  },

  // -------------------------------------------------------------------------
  // CSS GRID
  // -------------------------------------------------------------------------
  'grid-cols': {
    property: 'grid-template-columns',
    values: GRID_COLS,
    responsive: true,
  },

  'grid-rows': {
    property: 'grid-template-rows',
    values: GRID_ROWS,
    responsive: true,
  },

  'col-span': {
    property: 'grid-column',
    values: COL_SPAN,
    responsive: true,
  },

  'row-span': {
    property: 'grid-row',
    values: ROW_SPAN,
    responsive: true,
  },

  'grid-flow': {
    property: 'grid-auto-flow',
    values: {
      'row': 'row',
      'col': 'column',
      'row-dense': 'row dense',
      'col-dense': 'column dense',
    },
    responsive: true,
  },

  // -------------------------------------------------------------------------
  // BORDERS
  // -------------------------------------------------------------------------
  'border': {
    property: 'border-width',
    values: BORDER_WIDTHS,
    modifiers: {
      '': ['border-width'],
      'top': ['border-top-width'],
      'right': ['border-right-width'],
      'bottom': ['border-bottom-width'],
      'left': ['border-left-width'],
      'x': ['border-left-width', 'border-right-width'],
      'y': ['border-top-width', 'border-bottom-width'],
    },
  },

  'rounded': {
    property: 'border-radius',
    values: BORDER_RADIUS,
    modifiers: {
      '': ['border-radius'],
      'top': ['border-top-left-radius', 'border-top-right-radius'],
      'right': ['border-top-right-radius', 'border-bottom-right-radius'],
      'bottom': ['border-bottom-left-radius', 'border-bottom-right-radius'],
      'left': ['border-top-left-radius', 'border-bottom-left-radius'],
    },
  },

  // -------------------------------------------------------------------------
  // EFFECTS
  // -------------------------------------------------------------------------
  'opacity': {
    property: 'opacity',
    values: OPACITY,
    states: ['hover'],
  },

  'shadow': {
    property: 'box-shadow',
    values: BOX_SHADOWS,
    states: ['hover'],
  },

  'cursor': {
    property: 'cursor',
    values: CURSOR,
  },
};

// Breakpoints for responsive utilities
const BREAKPOINTS = {
  'mobile-lg': '30em',   // 480px
  'tablet': '40em',      // 640px
  'tablet-lg': '55em',   // 880px
  'desktop': '64em',     // 1024px
  'desktop-lg': '75em',  // 1200px
  'widescreen': '87.5em', // 1400px
};

// State variants
const STATES = {
  'hover': ':hover',
  'focus': ':focus',
  'active': ':active',
  'visited': ':visited',
  'disabled': ':disabled',
  'focus-within': ':focus-within',
  'focus-visible': ':focus-visible',
};

// Group/Peer variants
const GROUP_PEER = {
  'group-hover': '.group:hover',
  'group-focus': '.group:focus',
  'peer-hover': '.peer:hover ~',
  'peer-focus': '.peer:focus ~',
};

module.exports = {
  UTILITIES,
  BREAKPOINTS,
  STATES,
  GROUP_PEER,
  // Export value scales for arbitrary value validation
  scales: {
    SPACING_SCALE,
    COLORS,
    SIZING,
    FONT_SIZES,
    FONT_WEIGHTS,
    LINE_HEIGHTS,
    LETTER_SPACING,
    Z_INDEX,
    BORDER_RADIUS,
    BORDER_WIDTHS,
    OPACITY,
    BOX_SHADOWS,
  },
};
