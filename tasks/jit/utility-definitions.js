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

  // -------------------------------------------------------------------------
  // FILTERS
  // -------------------------------------------------------------------------
  'blur': {
    property: 'filter',
    values: {
      'none': 'blur(0)',
      'sm': 'blur(4px)',
      '': 'blur(8px)',
      'md': 'blur(12px)',
      'lg': 'blur(16px)',
      'xl': 'blur(24px)',
      '2xl': 'blur(40px)',
      '3xl': 'blur(64px)',
    },
    states: ['hover'],
  },

  'brightness': {
    property: 'filter',
    values: {
      '0': 'brightness(0)',
      '50': 'brightness(0.5)',
      '75': 'brightness(0.75)',
      '90': 'brightness(0.9)',
      '95': 'brightness(0.95)',
      '100': 'brightness(1)',
      '105': 'brightness(1.05)',
      '110': 'brightness(1.1)',
      '125': 'brightness(1.25)',
      '150': 'brightness(1.5)',
      '200': 'brightness(2)',
    },
    states: ['hover'],
  },

  'contrast': {
    property: 'filter',
    values: {
      '0': 'contrast(0)',
      '50': 'contrast(0.5)',
      '75': 'contrast(0.75)',
      '100': 'contrast(1)',
      '125': 'contrast(1.25)',
      '150': 'contrast(1.5)',
      '200': 'contrast(2)',
    },
    states: ['hover'],
  },

  'grayscale': {
    property: 'filter',
    values: {
      '0': 'grayscale(0)',
      '': 'grayscale(100%)',
    },
    states: ['hover'],
  },

  'invert': {
    property: 'filter',
    values: {
      '0': 'invert(0)',
      '': 'invert(100%)',
    },
    states: ['hover'],
  },

  'saturate': {
    property: 'filter',
    values: {
      '0': 'saturate(0)',
      '50': 'saturate(0.5)',
      '100': 'saturate(1)',
      '150': 'saturate(1.5)',
      '200': 'saturate(2)',
    },
    states: ['hover'],
  },

  'sepia': {
    property: 'filter',
    values: {
      '0': 'sepia(0)',
      '': 'sepia(100%)',
    },
    states: ['hover'],
  },

  'drop-shadow': {
    property: 'filter',
    values: {
      'none': 'drop-shadow(0 0 #0000)',
      'sm': 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
      '': 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
      'md': 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
      'lg': 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
      'xl': 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
      '2xl': 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
    },
    states: ['hover'],
  },

  // -------------------------------------------------------------------------
  // BACKDROP FILTERS
  // -------------------------------------------------------------------------
  'backdrop-blur': {
    property: 'backdrop-filter',
    values: {
      'none': 'blur(0)',
      'sm': 'blur(4px)',
      '': 'blur(8px)',
      'md': 'blur(12px)',
      'lg': 'blur(16px)',
      'xl': 'blur(24px)',
      '2xl': 'blur(40px)',
      '3xl': 'blur(64px)',
    },
  },

  // -------------------------------------------------------------------------
  // TRANSITIONS & ANIMATIONS
  // -------------------------------------------------------------------------
  'transition': {
    property: 'transition',
    values: {
      'none': 'none',
      'all': 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      '': 'color 150ms, background-color 150ms, border-color 150ms',
      'colors': 'color 150ms, background-color 150ms, border-color 150ms',
      'opacity': 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      'shadow': 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      'transform': 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  'duration': {
    property: 'transition-duration',
    values: {
      '0': '0s',
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
      '700': '700ms',
      '1000': '1000ms',
    },
  },

  'ease': {
    property: 'transition-timing-function',
    values: {
      'linear': 'linear',
      'in': 'cubic-bezier(0.4, 0, 1, 1)',
      'out': 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  'delay': {
    property: 'transition-delay',
    values: {
      '0': '0s',
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '500': '500ms',
      '700': '700ms',
      '1000': '1000ms',
    },
  },

  'animate': {
    property: 'animation',
    values: {
      'none': 'none',
      'spin': 'spin 1s linear infinite',
      'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'bounce': 'bounce 1s infinite',
    },
  },

  // -------------------------------------------------------------------------
  // TRANSFORMS
  // -------------------------------------------------------------------------
  'scale': {
    property: 'scale',
    values: {
      '0': '0',
      '50': '0.5',
      '75': '0.75',
      '90': '0.9',
      '95': '0.95',
      '100': '1',
      '105': '1.05',
      '110': '1.1',
      '125': '1.25',
      '150': '1.5',
    },
    states: ['hover'],
  },

  'rotate': {
    property: 'rotate',
    values: {
      '0': '0deg',
      '1': '1deg',
      '2': '2deg',
      '3': '3deg',
      '6': '6deg',
      '12': '12deg',
      '45': '45deg',
      '90': '90deg',
      '180': '180deg',
    },
    states: ['hover'],
    supportsNegative: true,
  },

  'translate-x': {
    property: 'translate',
    values: SPACING_SCALE,
    states: ['hover'],
    supportsNegative: true,
  },

  'translate-y': {
    property: 'translate',
    values: SPACING_SCALE,
    states: ['hover'],
    supportsNegative: true,
  },

  'origin': {
    property: 'transform-origin',
    values: {
      'center': 'center',
      'top': 'top',
      'top-right': 'top right',
      'right': 'right',
      'bottom-right': 'bottom right',
      'bottom': 'bottom',
      'bottom-left': 'bottom left',
      'left': 'left',
      'top-left': 'top left',
    },
  },

  // -------------------------------------------------------------------------
  // ASPECT RATIO
  // -------------------------------------------------------------------------
  'aspect': {
    property: 'aspect-ratio',
    values: {
      'auto': 'auto',
      'square': '1 / 1',
      'video': '16 / 9',
      '4/3': '4 / 3',
      '3/2': '3 / 2',
      '16/9': '16 / 9',
    },
    responsive: true,
  },

  // -------------------------------------------------------------------------
  // OBJECT FIT/POSITION
  // -------------------------------------------------------------------------
  'object': {
    property: 'object-fit',
    values: {
      'contain': 'contain',
      'cover': 'cover',
      'fill': 'fill',
      'none': 'none',
      'scale-down': 'scale-down',
    },
    responsive: true,
  },

  'object-position': {
    property: 'object-position',
    values: {
      'bottom': 'bottom',
      'center': 'center',
      'left': 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      'right': 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      'top': 'top',
    },
    responsive: true,
  },

  // -------------------------------------------------------------------------
  // COLUMNS
  // -------------------------------------------------------------------------
  'columns': {
    property: 'columns',
    values: {
      'auto': 'auto',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12',
    },
    responsive: true,
  },

  // -------------------------------------------------------------------------
  // RINGS
  // -------------------------------------------------------------------------
  'ring': {
    property: 'box-shadow',
    values: {
      '0': 'var(--ring-inset) 0 0 0 calc(0px + var(--ring-offset-width)) var(--ring-color)',
      '1': 'var(--ring-inset) 0 0 0 calc(1px + var(--ring-offset-width)) var(--ring-color)',
      '2': 'var(--ring-inset) 0 0 0 calc(2px + var(--ring-offset-width)) var(--ring-color)',
      '': 'var(--ring-inset) 0 0 0 calc(3px + var(--ring-offset-width)) var(--ring-color)',
      '4': 'var(--ring-inset) 0 0 0 calc(4px + var(--ring-offset-width)) var(--ring-color)',
      '8': 'var(--ring-inset) 0 0 0 calc(8px + var(--ring-offset-width)) var(--ring-color)',
    },
    states: ['hover', 'focus'],
  },

  'ring-color': {
    property: '--ring-color',
    values: COLORS,
    states: ['hover', 'focus'],
  },

  'ring-offset': {
    property: '--ring-offset-width',
    values: {
      '0': '0px',
      '1': '1px',
      '2': '2px',
      '4': '4px',
      '8': '8px',
    },
  },

  // -------------------------------------------------------------------------
  // BLEND MODES
  // -------------------------------------------------------------------------
  'mix-blend': {
    property: 'mix-blend-mode',
    values: {
      'normal': 'normal',
      'multiply': 'multiply',
      'screen': 'screen',
      'overlay': 'overlay',
      'darken': 'darken',
      'lighten': 'lighten',
      'color-dodge': 'color-dodge',
      'color-burn': 'color-burn',
      'hard-light': 'hard-light',
      'soft-light': 'soft-light',
      'difference': 'difference',
      'exclusion': 'exclusion',
    },
    states: ['hover'],
  },

  'bg-blend': {
    property: 'background-blend-mode',
    values: {
      'normal': 'normal',
      'multiply': 'multiply',
      'screen': 'screen',
      'overlay': 'overlay',
      'darken': 'darken',
      'lighten': 'lighten',
      'color-dodge': 'color-dodge',
      'color-burn': 'color-burn',
      'hard-light': 'hard-light',
      'soft-light': 'soft-light',
      'difference': 'difference',
      'exclusion': 'exclusion',
    },
  },

  // -------------------------------------------------------------------------
  // FLEX EXTENDED
  // -------------------------------------------------------------------------
  'grow': {
    property: 'flex-grow',
    values: {
      '': '1',
      '0': '0',
    },
    responsive: true,
  },

  'shrink': {
    property: 'flex-shrink',
    values: {
      '': '1',
      '0': '0',
    },
    responsive: true,
  },

  'basis': {
    property: 'flex-basis',
    values: SIZING,
    responsive: true,
  },

  // -------------------------------------------------------------------------
  // GRADIENTS
  // -------------------------------------------------------------------------
  'bg-gradient-to': {
    property: 'background-image',
    values: {
      't': 'linear-gradient(to top, var(--gradient-stops))',
      'tr': 'linear-gradient(to top right, var(--gradient-stops))',
      'r': 'linear-gradient(to right, var(--gradient-stops))',
      'br': 'linear-gradient(to bottom right, var(--gradient-stops))',
      'b': 'linear-gradient(to bottom, var(--gradient-stops))',
      'bl': 'linear-gradient(to bottom left, var(--gradient-stops))',
      'l': 'linear-gradient(to left, var(--gradient-stops))',
      'tl': 'linear-gradient(to top left, var(--gradient-stops))',
    },
  },

  'from': {
    property: '--gradient-from',
    values: COLORS,
  },

  'via': {
    property: '--gradient-via',
    values: COLORS,
  },

  'to': {
    property: '--gradient-to',
    values: COLORS,
  },

  // -------------------------------------------------------------------------
  // BACKGROUND EXTENDED
  // -------------------------------------------------------------------------
  'bg-attachment': {
    property: 'background-attachment',
    values: {
      'fixed': 'fixed',
      'local': 'local',
      'scroll': 'scroll',
    },
  },

  'bg-clip': {
    property: 'background-clip',
    values: {
      'border': 'border-box',
      'padding': 'padding-box',
      'content': 'content-box',
      'text': 'text',
    },
  },

  'bg-position': {
    property: 'background-position',
    values: {
      'bottom': 'bottom',
      'center': 'center',
      'left': 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      'right': 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      'top': 'top',
    },
  },

  'bg-repeat': {
    property: 'background-repeat',
    values: {
      'repeat': 'repeat',
      'no-repeat': 'no-repeat',
      'repeat-x': 'repeat-x',
      'repeat-y': 'repeat-y',
    },
  },

  'bg-size': {
    property: 'background-size',
    values: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
    },
  },

  // -------------------------------------------------------------------------
  // SVG
  // -------------------------------------------------------------------------
  'fill': {
    property: 'fill',
    values: COLORS,
    states: ['hover'],
  },

  'stroke': {
    property: 'stroke',
    values: COLORS,
    states: ['hover'],
  },

  'stroke-width': {
    property: 'stroke-width',
    values: {
      '0': '0',
      '1': '1',
      '2': '2',
    },
  },

  // -------------------------------------------------------------------------
  // INTERACTIVITY
  // -------------------------------------------------------------------------
  'accent': {
    property: 'accent-color',
    values: COLORS,
  },

  'caret': {
    property: 'caret-color',
    values: COLORS,
  },

  'pointer-events': {
    property: 'pointer-events',
    values: {
      'none': 'none',
      'auto': 'auto',
    },
  },

  'resize': {
    property: 'resize',
    values: {
      'none': 'none',
      '': 'both',
      'y': 'vertical',
      'x': 'horizontal',
    },
  },

  'scroll': {
    property: 'scroll-behavior',
    values: {
      'auto': 'auto',
      'smooth': 'smooth',
    },
  },

  'select': {
    property: 'user-select',
    values: {
      'none': 'none',
      'text': 'text',
      'all': 'all',
      'auto': 'auto',
    },
  },

  'touch': {
    property: 'touch-action',
    values: {
      'auto': 'auto',
      'none': 'none',
      'pan-x': 'pan-x',
      'pan-y': 'pan-y',
      'manipulation': 'manipulation',
    },
  },

  'will-change': {
    property: 'will-change',
    values: {
      'auto': 'auto',
      'scroll': 'scroll-position',
      'contents': 'contents',
      'transform': 'transform',
    },
  },

  // -------------------------------------------------------------------------
  // SIZE (width + height)
  // -------------------------------------------------------------------------
  'size': {
    property: ['width', 'height'],
    values: SIZING,
    responsive: true,
  },

  // -------------------------------------------------------------------------
  // TABLES
  // -------------------------------------------------------------------------
  'table-layout': {
    property: 'table-layout',
    values: {
      'auto': 'auto',
      'fixed': 'fixed',
    },
    responsive: true,
  },

  'border-collapse': {
    property: 'border-collapse',
    values: {
      'collapse': 'collapse',
      'separate': 'separate',
    },
  },

  'caption': {
    property: 'caption-side',
    values: {
      'top': 'top',
      'bottom': 'bottom',
    },
  },

  // -------------------------------------------------------------------------
  // TYPOGRAPHY EXTENDED
  // -------------------------------------------------------------------------
  'hyphens': {
    property: 'hyphens',
    values: {
      'none': 'none',
      'manual': 'manual',
      'auto': 'auto',
    },
  },

  'break': {
    property: 'word-break',
    values: {
      'normal': 'normal',
      'words': 'break-word',
      'all': 'break-all',
      'keep': 'keep-all',
    },
  },

  'text-wrap': {
    property: 'text-wrap',
    values: {
      'wrap': 'wrap',
      'nowrap': 'nowrap',
      'balance': 'balance',
      'pretty': 'pretty',
    },
  },

  'line-clamp': {
    property: '-webkit-line-clamp',
    values: {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      'none': 'unset',
    },
    responsive: true,
  },

  'list': {
    property: 'list-style-type',
    values: {
      'none': 'none',
      'disc': 'disc',
      'decimal': 'decimal',
    },
  },

  'list-position': {
    property: 'list-style-position',
    values: {
      'inside': 'inside',
      'outside': 'outside',
    },
  },

  // -------------------------------------------------------------------------
  // ISOLATION
  // -------------------------------------------------------------------------
  'isolation': {
    property: 'isolation',
    values: {
      'isolate': 'isolate',
      'auto': 'auto',
    },
  },

  // -------------------------------------------------------------------------
  // OVERSCROLL
  // -------------------------------------------------------------------------
  'overscroll': {
    property: 'overscroll-behavior',
    values: {
      'auto': 'auto',
      'contain': 'contain',
      'none': 'none',
    },
    modifiers: {
      '': ['overscroll-behavior'],
      'x': ['overscroll-behavior-x'],
      'y': ['overscroll-behavior-y'],
    },
  },

  // -------------------------------------------------------------------------
  // PLACE UTILITIES
  // -------------------------------------------------------------------------
  'place-content': {
    property: 'place-content',
    values: {
      'center': 'center',
      'start': 'start',
      'end': 'end',
      'between': 'space-between',
      'around': 'space-around',
      'evenly': 'space-evenly',
      'stretch': 'stretch',
    },
    responsive: true,
  },

  'place-items': {
    property: 'place-items',
    values: {
      'start': 'start',
      'end': 'end',
      'center': 'center',
      'stretch': 'stretch',
    },
    responsive: true,
  },

  'place-self': {
    property: 'place-self',
    values: {
      'auto': 'auto',
      'start': 'start',
      'end': 'end',
      'center': 'center',
      'stretch': 'stretch',
    },
    responsive: true,
  },

  // -------------------------------------------------------------------------
  // GRID EXTENDED
  // -------------------------------------------------------------------------
  'auto-cols': {
    property: 'grid-auto-columns',
    values: {
      'auto': 'auto',
      'min': 'min-content',
      'max': 'max-content',
      'fr': 'minmax(0, 1fr)',
    },
    responsive: true,
  },

  'auto-rows': {
    property: 'grid-auto-rows',
    values: {
      'auto': 'auto',
      'min': 'min-content',
      'max': 'max-content',
      'fr': 'minmax(0, 1fr)',
    },
    responsive: true,
  },

  'justify-items': {
    property: 'justify-items',
    values: {
      'start': 'start',
      'end': 'end',
      'center': 'center',
      'stretch': 'stretch',
    },
    responsive: true,
  },

  'justify-self': {
    property: 'justify-self',
    values: {
      'auto': 'auto',
      'start': 'start',
      'end': 'end',
      'center': 'center',
      'stretch': 'stretch',
    },
    responsive: true,
  },

  'content': {
    property: 'align-content',
    values: {
      'normal': 'normal',
      'center': 'center',
      'start': 'flex-start',
      'end': 'flex-end',
      'between': 'space-between',
      'around': 'space-around',
      'evenly': 'space-evenly',
      'stretch': 'stretch',
    },
    responsive: true,
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
