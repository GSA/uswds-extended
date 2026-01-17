# USWDS Extended - Tailwind-Compatible Utility System

## Quick Start

USWDS Extended provides **100% Tailwind CSS utility parity** while maintaining full USWDS compliance. Use familiar utility classes directly in your HTML:

```html
<!-- Layout -->
<div class="flex items-center justify-between gap-4">

  <!-- Sizing -->
  <div class="size-12 minw-0 maxw-full">

    <!-- Colors with opacity -->
    <div class="bg-primary text-white border-2 border-white/50">

      <!-- Typography -->
      <p class="text-lg font-bold tracking-wide truncate">
        Content
      </p>
    </div>
  </div>
</div>

<!-- Responsive + State variants -->
<button class="tablet:px-6 desktop:px-8 hover:bg-primary-dark focus:ring-2">
  Click me
</button>
```

---

## Implementation Status

### Completed Features

| Feature | Status | Notes |
|---------|--------|-------|
| **All Tailwind utilities** | Done | 100+ utility categories |
| **Responsive variants** | Done | `mobile-lg:`, `tablet:`, `desktop:`, etc. |
| **State variants** | Done | `hover:`, `focus:`, `active:`, `visited:` |
| **Stacked modifiers** | Done | `hover:tablet:bg-primary` |
| **Negative values** | Done | `-mt-4`, `-translate-x-1/2` |
| **Fractional sizing** | Done | `w-1/2`, `h-1/3`, etc. |
| **Modern viewport units** | Done | `dvh`, `svh`, `lvh`, `dvw`, etc. |
| **Arbitrary values** | Done | `w-[137px]`, `bg-[#ff5722]` (JIT) |
| **JIT generation** | Done | On-demand CSS generation |
| **Dark mode** | Done | `dark:bg-gray-900` |
| **Group/peer modifiers** | Done | `group-hover:`, `peer-focus:` |
| **Opacity modifiers** | Done | `bg-primary/75`, `text-black/50` |

---

## Utility Categories

### Layout

| Category | Classes | Example |
|----------|---------|---------|
| Aspect Ratio | `aspect-auto`, `aspect-square`, `aspect-video` | `<div class="aspect-video">` |
| Container | `container` | `<div class="container">` |
| Columns | `columns-1` to `columns-12`, `columns-auto` | `<div class="columns-3">` |
| Break After/Before/Inside | `break-after-*`, `break-before-*`, `break-inside-*` | `<div class="break-inside-avoid">` |
| Box Decoration | `box-decoration-clone`, `box-decoration-slice` | `<span class="box-decoration-clone">` |
| Box Sizing | `box-border`, `box-content` | `<div class="box-border">` |
| Display | `block`, `inline-block`, `flex`, `grid`, `hidden`, etc. | `<div class="flex">` |
| Float | `float-left`, `float-right`, `float-none` | `<img class="float-left">` |
| Clear | `clear-left`, `clear-right`, `clear-both` | `<div class="clear-both">` |
| Isolation | `isolate`, `isolation-auto` | `<div class="isolate">` |
| Object Fit | `object-contain`, `object-cover`, `object-fill`, etc. | `<img class="object-cover">` |
| Object Position | `object-center`, `object-top`, `object-left`, etc. | `<img class="object-center">` |
| Overflow | `overflow-auto`, `overflow-hidden`, `overflow-scroll`, etc. | `<div class="overflow-hidden">` |
| Overscroll | `overscroll-auto`, `overscroll-contain`, `overscroll-none` | `<div class="overscroll-contain">` |
| Position | `static`, `relative`, `absolute`, `fixed`, `sticky` | `<div class="relative">` |
| Inset | `inset-0`, `inset-x-4`, `inset-y-auto`, `top-0`, `right-4`, etc. | `<div class="absolute inset-0">` |
| Visibility | `visible`, `invisible`, `collapse` | `<tr class="collapse">` |
| Z-Index | `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50`, `z-auto` | `<div class="z-50">` |

### Flexbox & Grid

| Category | Classes | Example |
|----------|---------|---------|
| Flex Direction | `flex-row`, `flex-col`, `flex-row-reverse`, `flex-col-reverse` | `<div class="flex flex-col">` |
| Flex Wrap | `flex-wrap`, `flex-nowrap`, `flex-wrap-reverse` | `<div class="flex flex-wrap">` |
| Flex | `flex-1`, `flex-auto`, `flex-initial`, `flex-none` | `<div class="flex-1">` |
| Flex Grow | `grow`, `grow-0` | `<div class="grow">` |
| Flex Shrink | `shrink`, `shrink-0` | `<div class="shrink-0">` |
| Flex Basis | `basis-0`, `basis-1/2`, `basis-full`, `basis-auto` | `<div class="basis-1/2">` |
| Order | `order-1` to `order-12`, `order-first`, `order-last`, `order-none` | `<div class="order-first">` |
| Grid Template Columns | `grid-cols-1` to `grid-cols-12`, `grid-cols-none` | `<div class="grid grid-cols-3">` |
| Grid Column Span | `col-span-1` to `col-span-12`, `col-span-full` | `<div class="col-span-2">` |
| Grid Template Rows | `grid-rows-1` to `grid-rows-6`, `grid-rows-none` | `<div class="grid grid-rows-3">` |
| Grid Row Span | `row-span-1` to `row-span-6`, `row-span-full` | `<div class="row-span-2">` |
| Grid Auto Flow | `grid-flow-row`, `grid-flow-col`, `grid-flow-dense` | `<div class="grid-flow-col">` |
| Grid Auto Columns | `auto-cols-auto`, `auto-cols-min`, `auto-cols-max`, `auto-cols-fr` | `<div class="auto-cols-fr">` |
| Grid Auto Rows | `auto-rows-auto`, `auto-rows-min`, `auto-rows-max`, `auto-rows-fr` | `<div class="auto-rows-min">` |
| Gap | `gap-0` to `gap-96`, `gap-x-*`, `gap-y-*` | `<div class="grid gap-4">` |
| Justify Content | `justify-start`, `justify-center`, `justify-end`, `justify-between`, etc. | `<div class="flex justify-between">` |
| Justify Items | `justify-items-start`, `justify-items-center`, `justify-items-end`, etc. | `<div class="grid justify-items-center">` |
| Justify Self | `justify-self-auto`, `justify-self-start`, `justify-self-center`, etc. | `<div class="justify-self-end">` |
| Align Content | `content-start`, `content-center`, `content-end`, `content-between`, etc. | `<div class="flex content-center">` |
| Align Items | `items-start`, `items-center`, `items-end`, `items-baseline`, `items-stretch` | `<div class="flex items-center">` |
| Align Self | `self-auto`, `self-start`, `self-center`, `self-end`, `self-stretch` | `<div class="self-center">` |
| Place Content | `place-content-center`, `place-content-start`, etc. | `<div class="place-content-center">` |
| Place Items | `place-items-center`, `place-items-start`, etc. | `<div class="place-items-center">` |
| Place Self | `place-self-center`, `place-self-start`, etc. | `<div class="place-self-center">` |

### Spacing

| Category | Classes | Example |
|----------|---------|---------|
| Padding | `p-0` to `p-96`, `px-*`, `py-*`, `pt-*`, `pr-*`, `pb-*`, `pl-*` | `<div class="p-4 px-6">` |
| Margin | `m-0` to `m-96`, `mx-*`, `my-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*`, `m-auto` | `<div class="mt-4 mx-auto">` |
| Space Between | `space-x-*`, `space-y-*` (sets gap between children) | `<div class="flex space-x-4">` |

**Negative margins:** Use `-` prefix: `-mt-4`, `-mx-2`, etc.

### Sizing

| Category | Classes | Example |
|----------|---------|---------|
| Width | `w-0` to `w-96`, `w-auto`, `w-full`, `w-screen`, `w-1/2`, `w-1/3`, etc. | `<div class="w-full tablet:w-1/2">` |
| Min Width | `minw-0`, `minw-full`, `minw-min`, `minw-max`, `minw-fit` | `<div class="minw-0">` |
| Max Width | `maxw-0` to `maxw-7xl`, `maxw-full`, `maxw-none`, `maxw-prose` | `<div class="maxw-lg">` |
| Height | `h-0` to `h-96`, `h-auto`, `h-full`, `h-screen`, `h-dvh`, `h-svh`, `h-lvh` | `<div class="h-screen">` |
| Min Height | `minh-0`, `minh-full`, `minh-screen`, `minh-dvh` | `<div class="minh-screen">` |
| Max Height | `maxh-0` to `maxh-96`, `maxh-full`, `maxh-screen`, `maxh-none` | `<div class="maxh-64">` |
| Size | `size-0` to `size-96`, `size-full` (sets both width & height) | `<img class="size-12">` |

**Naming convention:** USWDS uses `minw`/`maxw`/`minh`/`maxh` (no hyphens), not `min-w`/`max-w`.

### Typography

| Category | Classes | Example |
|----------|---------|---------|
| Font Family | `font-sans`, `font-serif`, `font-mono` | `<code class="font-mono">` |
| Font Size | `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc. | `<p class="text-lg">` |
| Font Smoothing | `antialiased`, `subpixel-antialiased` | `<body class="antialiased">` |
| Font Style | `italic`, `not-italic` | `<em class="not-italic">` |
| Font Weight | `font-thin`, `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`, etc. | `<strong class="font-bold">` |
| Font Variant Numeric | `normal-nums`, `ordinal`, `tabular-nums`, `oldstyle-nums`, etc. | `<span class="tabular-nums">` |
| Letter Spacing | `tracking-tighter`, `tracking-tight`, `tracking-normal`, `tracking-wide`, etc. | `<h1 class="tracking-wide">` |
| Line Clamp | `line-clamp-1` to `line-clamp-6`, `line-clamp-none` | `<p class="line-clamp-3">` |
| Line Height | `leading-none`, `leading-tight`, `leading-normal`, `leading-relaxed`, `leading-loose` | `<p class="leading-relaxed">` |
| List Style Type | `list-none`, `list-disc`, `list-decimal`, `list-circle`, `list-square` | `<ul class="list-disc">` |
| List Style Position | `list-inside`, `list-outside` | `<ul class="list-inside">` |
| Text Align | `text-left`, `text-center`, `text-right`, `text-justify` | `<p class="text-center">` |
| Text Color | `text-primary`, `text-secondary`, `text-white`, `text-black`, etc. | `<p class="text-primary">` |
| Text Decoration | `underline`, `overline`, `line-through`, `no-underline` | `<a class="no-underline">` |
| Text Decoration Style | `decoration-solid`, `decoration-double`, `decoration-dotted`, `decoration-dashed`, `decoration-wavy` | `<a class="underline decoration-wavy">` |
| Text Decoration Thickness | `decoration-auto`, `decoration-from-font`, `decoration-0`, `decoration-1`, `decoration-2`, `decoration-4`, `decoration-8` | `<a class="decoration-2">` |
| Text Underline Offset | `underline-offset-auto`, `underline-offset-0`, `underline-offset-1`, `underline-offset-2`, `underline-offset-4`, `underline-offset-8` | `<a class="underline-offset-4">` |
| Text Transform | `uppercase`, `lowercase`, `capitalize`, `normal-case` | `<span class="uppercase">` |
| Text Overflow | `truncate`, `text-ellipsis`, `text-clip` | `<p class="truncate">` |
| Text Wrap | `text-wrap`, `text-nowrap`, `text-balance`, `text-pretty` | `<p class="text-balance">` |
| Vertical Align | `align-baseline`, `align-top`, `align-middle`, `align-bottom`, `align-text-top`, `align-text-bottom` | `<img class="align-middle">` |
| Whitespace | `whitespace-normal`, `whitespace-nowrap`, `whitespace-pre`, `whitespace-pre-line`, `whitespace-pre-wrap` | `<pre class="whitespace-pre-wrap">` |
| Word Break | `break-normal`, `break-words`, `break-all`, `break-keep` | `<p class="break-words">` |
| Hyphens | `hyphens-none`, `hyphens-manual`, `hyphens-auto` | `<p class="hyphens-auto">` |
| Content | `content-none` | `<span class="content-none">` |

### Backgrounds

| Category | Classes | Example |
|----------|---------|---------|
| Background Attachment | `bg-fixed`, `bg-local`, `bg-scroll` | `<div class="bg-fixed">` |
| Background Clip | `bg-clip-border`, `bg-clip-padding`, `bg-clip-content`, `bg-clip-text` | `<span class="bg-clip-text">` |
| Background Color | `bg-primary`, `bg-secondary`, `bg-white`, `bg-black`, `bg-transparent`, etc. | `<div class="bg-primary">` |
| Background Origin | `bg-origin-border`, `bg-origin-padding`, `bg-origin-content` | `<div class="bg-origin-content">` |
| Background Position | `bg-center`, `bg-top`, `bg-right`, `bg-bottom`, `bg-left`, etc. | `<div class="bg-center">` |
| Background Repeat | `bg-repeat`, `bg-no-repeat`, `bg-repeat-x`, `bg-repeat-y`, `bg-repeat-round`, `bg-repeat-space` | `<div class="bg-no-repeat">` |
| Background Size | `bg-auto`, `bg-cover`, `bg-contain` | `<div class="bg-cover">` |
| Background Image / Gradient | `bg-none`, `bg-gradient-to-t`, `bg-gradient-to-r`, `bg-gradient-to-b`, `bg-gradient-to-l`, etc. | `<div class="bg-gradient-to-r">` |
| Gradient Stops | `from-*`, `via-*`, `to-*` | `<div class="bg-gradient-to-r from-primary to-secondary">` |

### Borders

| Category | Classes | Example |
|----------|---------|---------|
| Border Radius | `rounded-none`, `rounded-sm`, `rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full` | `<div class="rounded-lg">` |
| Border Width | `border`, `border-0`, `border-2`, `border-4`, `border-8`, `border-t-*`, `border-r-*`, `border-b-*`, `border-l-*` | `<div class="border-2">` |
| Border Color | `border-primary`, `border-secondary`, `border-white`, `border-black`, `border-transparent`, etc. | `<div class="border border-primary">` |
| Border Style | `border-solid`, `border-dashed`, `border-dotted`, `border-double`, `border-hidden`, `border-none` | `<div class="border-dashed">` |
| Divide Width | `divide-x`, `divide-y`, `divide-x-2`, `divide-y-2`, etc. | `<div class="divide-y">` |
| Divide Color | `divide-primary`, `divide-gray`, etc. | `<div class="divide-y divide-gray">` |
| Divide Style | `divide-solid`, `divide-dashed`, `divide-dotted`, `divide-double`, `divide-none` | `<div class="divide-dashed">` |
| Outline Width | `outline-0`, `outline-1`, `outline-2`, `outline-4`, `outline-8` | `<button class="outline-2">` |
| Outline Color | `outline-primary`, `outline-secondary`, etc. | `<button class="outline-primary">` |
| Outline Style | `outline-none`, `outline`, `outline-dashed`, `outline-dotted`, `outline-double` | `<button class="outline-dashed">` |
| Outline Offset | `outline-offset-0`, `outline-offset-1`, `outline-offset-2`, `outline-offset-4`, `outline-offset-8` | `<button class="outline-offset-2">` |
| Ring Width | `ring-0`, `ring-1`, `ring-2`, `ring`, `ring-4`, `ring-8`, `ring-inset` | `<button class="ring-2">` |
| Ring Color | `ring-primary`, `ring-secondary`, etc. | `<button class="ring-2 ring-primary">` |
| Ring Offset Width | `ring-offset-0`, `ring-offset-1`, `ring-offset-2`, `ring-offset-4`, `ring-offset-8` | `<button class="ring-offset-2">` |
| Ring Offset Color | `ring-offset-white`, `ring-offset-primary`, etc. | `<button class="ring-offset-primary">` |

### Effects

| Category | Classes | Example |
|----------|---------|---------|
| Box Shadow | `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-inner`, `shadow-none` | `<div class="shadow-lg">` |
| Box Shadow Color | `shadow-primary`, `shadow-gray`, etc. | `<div class="shadow-lg shadow-primary">` |
| Opacity | `opacity-0`, `opacity-5`, `opacity-10`, ... `opacity-100` | `<div class="opacity-50">` |
| Mix Blend Mode | `mix-blend-normal`, `mix-blend-multiply`, `mix-blend-screen`, `mix-blend-overlay`, etc. | `<div class="mix-blend-multiply">` |
| Background Blend Mode | `bg-blend-normal`, `bg-blend-multiply`, `bg-blend-screen`, etc. | `<div class="bg-blend-overlay">` |

### Filters

| Category | Classes | Example |
|----------|---------|---------|
| Blur | `blur-none`, `blur-sm`, `blur`, `blur-md`, `blur-lg`, `blur-xl`, `blur-2xl`, `blur-3xl` | `<img class="blur-sm">` |
| Brightness | `brightness-0`, `brightness-50`, `brightness-75`, `brightness-90`, `brightness-100`, `brightness-105`, `brightness-110`, `brightness-125`, `brightness-150`, `brightness-200` | `<img class="brightness-125">` |
| Contrast | `contrast-0`, `contrast-50`, `contrast-75`, `contrast-100`, `contrast-125`, `contrast-150`, `contrast-200` | `<img class="contrast-125">` |
| Drop Shadow | `drop-shadow-sm`, `drop-shadow`, `drop-shadow-md`, `drop-shadow-lg`, `drop-shadow-xl`, `drop-shadow-2xl`, `drop-shadow-none` | `<img class="drop-shadow-lg">` |
| Grayscale | `grayscale-0`, `grayscale` | `<img class="grayscale">` |
| Hue Rotate | `hue-rotate-0`, `hue-rotate-15`, `hue-rotate-30`, `hue-rotate-60`, `hue-rotate-90`, `hue-rotate-180` | `<img class="hue-rotate-90">` |
| Invert | `invert-0`, `invert` | `<img class="invert">` |
| Saturate | `saturate-0`, `saturate-50`, `saturate-100`, `saturate-150`, `saturate-200` | `<img class="saturate-150">` |
| Sepia | `sepia-0`, `sepia` | `<img class="sepia">` |
| Backdrop Blur | `backdrop-blur-none`, `backdrop-blur-sm`, `backdrop-blur`, etc. | `<div class="backdrop-blur-sm">` |
| Backdrop Brightness | `backdrop-brightness-*` | `<div class="backdrop-brightness-50">` |
| Backdrop Contrast | `backdrop-contrast-*` | `<div class="backdrop-contrast-125">` |
| Backdrop Grayscale | `backdrop-grayscale-0`, `backdrop-grayscale` | `<div class="backdrop-grayscale">` |
| Backdrop Hue Rotate | `backdrop-hue-rotate-*` | `<div class="backdrop-hue-rotate-90">` |
| Backdrop Invert | `backdrop-invert-0`, `backdrop-invert` | `<div class="backdrop-invert">` |
| Backdrop Opacity | `backdrop-opacity-*` | `<div class="backdrop-opacity-50">` |
| Backdrop Saturate | `backdrop-saturate-*` | `<div class="backdrop-saturate-150">` |
| Backdrop Sepia | `backdrop-sepia-0`, `backdrop-sepia` | `<div class="backdrop-sepia">` |

### Tables

| Category | Classes | Example |
|----------|---------|---------|
| Border Collapse | `border-collapse`, `border-separate` | `<table class="border-collapse">` |
| Border Spacing | `border-spacing-*`, `border-spacing-x-*`, `border-spacing-y-*` | `<table class="border-spacing-2">` |
| Table Layout | `table-auto`, `table-fixed` | `<table class="table-fixed">` |
| Caption Side | `caption-top`, `caption-bottom` | `<table class="caption-bottom">` |

### Transitions & Animation

| Category | Classes | Example |
|----------|---------|---------|
| Transition Property | `transition-none`, `transition-all`, `transition`, `transition-colors`, `transition-opacity`, `transition-shadow`, `transition-transform` | `<button class="transition-colors">` |
| Transition Duration | `duration-75`, `duration-100`, `duration-150`, `duration-200`, `duration-300`, `duration-500`, `duration-700`, `duration-1000` | `<button class="duration-300">` |
| Transition Timing | `ease-linear`, `ease-in`, `ease-out`, `ease-in-out` | `<button class="ease-in-out">` |
| Transition Delay | `delay-75`, `delay-100`, `delay-150`, `delay-200`, `delay-300`, `delay-500`, `delay-700`, `delay-1000` | `<button class="delay-150">` |
| Animation | `animate-none`, `animate-spin`, `animate-ping`, `animate-pulse`, `animate-bounce` | `<div class="animate-spin">` |

### Transforms

| Category | Classes | Example |
|----------|---------|---------|
| Scale | `scale-0`, `scale-50`, `scale-75`, `scale-90`, `scale-95`, `scale-100`, `scale-105`, `scale-110`, `scale-125`, `scale-150` | `<div class="hover:scale-105">` |
| Rotate | `rotate-0`, `rotate-1`, `rotate-2`, `rotate-3`, `rotate-6`, `rotate-12`, `rotate-45`, `rotate-90`, `rotate-180` | `<div class="rotate-45">` |
| Translate | `translate-x-*`, `translate-y-*` | `<div class="translate-x-4">` |
| Skew | `skew-x-*`, `skew-y-*` | `<div class="skew-x-3">` |
| Transform Origin | `origin-center`, `origin-top`, `origin-top-right`, `origin-right`, etc. | `<div class="origin-top-left">` |
| Backface Visibility | `backface-visible`, `backface-hidden` | `<div class="backface-hidden">` |
| Perspective | `perspective-none`, `perspective-*` | `<div class="perspective-500">` |
| Perspective Origin | `perspective-origin-center`, `perspective-origin-top`, etc. | `<div class="perspective-origin-top">` |
| Transform Style | `transform-style-flat`, `transform-style-3d` | `<div class="transform-style-3d">` |

### Interactivity

| Category | Classes | Example |
|----------|---------|---------|
| Accent Color | `accent-primary`, `accent-secondary`, `accent-auto`, etc. | `<input type="checkbox" class="accent-primary">` |
| Appearance | `appearance-none`, `appearance-auto` | `<select class="appearance-none">` |
| Cursor | `cursor-auto`, `cursor-default`, `cursor-pointer`, `cursor-wait`, `cursor-text`, `cursor-move`, `cursor-not-allowed`, etc. | `<button class="cursor-pointer">` |
| Caret Color | `caret-primary`, `caret-transparent`, etc. | `<input class="caret-primary">` |
| Pointer Events | `pointer-events-none`, `pointer-events-auto` | `<div class="pointer-events-none">` |
| Resize | `resize-none`, `resize`, `resize-x`, `resize-y` | `<textarea class="resize-y">` |
| Scroll Behavior | `scroll-auto`, `scroll-smooth` | `<html class="scroll-smooth">` |
| Scroll Margin | `scroll-m-*`, `scroll-mt-*`, `scroll-mr-*`, `scroll-mb-*`, `scroll-ml-*`, `scroll-mx-*`, `scroll-my-*` | `<section class="scroll-mt-16">` |
| Scroll Padding | `scroll-p-*`, `scroll-pt-*`, `scroll-pr-*`, `scroll-pb-*`, `scroll-pl-*`, `scroll-px-*`, `scroll-py-*` | `<div class="scroll-p-4">` |
| Scroll Snap Align | `snap-start`, `snap-end`, `snap-center`, `snap-align-none` | `<div class="snap-start">` |
| Scroll Snap Stop | `snap-normal`, `snap-always` | `<div class="snap-always">` |
| Scroll Snap Type | `snap-none`, `snap-x`, `snap-y`, `snap-both`, `snap-mandatory`, `snap-proximity` | `<div class="snap-x snap-mandatory">` |
| Touch Action | `touch-auto`, `touch-none`, `touch-pan-x`, `touch-pan-y`, `touch-manipulation` | `<div class="touch-manipulation">` |
| User Select | `select-none`, `select-text`, `select-all`, `select-auto` | `<p class="select-none">` |
| Will Change | `will-change-auto`, `will-change-scroll`, `will-change-contents`, `will-change-transform` | `<div class="will-change-transform">` |
| Color Scheme | `color-scheme-normal`, `color-scheme-light`, `color-scheme-dark` | `<html class="color-scheme-dark">` |
| Field Sizing | `field-sizing-content`, `field-sizing-fixed` | `<textarea class="field-sizing-content">` |

### SVG

| Category | Classes | Example |
|----------|---------|---------|
| Fill | `fill-current`, `fill-none`, `fill-inherit`, `fill-primary`, etc. | `<svg class="fill-current">` |
| Stroke | `stroke-current`, `stroke-none`, `stroke-inherit`, `stroke-primary`, etc. | `<svg class="stroke-current">` |
| Stroke Width | `stroke-0`, `stroke-1`, `stroke-2` | `<svg class="stroke-2">` |
| Stroke Linecap | `stroke-linecap-butt`, `stroke-linecap-round`, `stroke-linecap-square` | `<svg class="stroke-linecap-round">` |
| Stroke Linejoin | `stroke-linejoin-miter`, `stroke-linejoin-round`, `stroke-linejoin-bevel` | `<svg class="stroke-linejoin-round">` |

### Accessibility

| Category | Classes | Example |
|----------|---------|---------|
| Screen Reader Only | `sr-only`, `not-sr-only` | `<span class="sr-only">Skip to content</span>` |
| Forced Color Adjust | `forced-color-adjust-auto`, `forced-color-adjust-none` | `<div class="forced-color-adjust-none">` |

---

## Responsive Design

Use breakpoint prefixes for responsive utilities:

| Breakpoint | Prefix | Min Width |
|------------|--------|-----------|
| Mobile Large | `mobile-lg:` | 480px |
| Tablet | `tablet:` | 640px |
| Tablet Large | `tablet-lg:` | 880px |
| Desktop | `desktop:` | 1024px |
| Desktop Large | `desktop-lg:` | 1200px |
| Widescreen | `widescreen:` | 1400px |

```html
<!-- Stack on mobile, side-by-side on tablet, 3-column on desktop -->
<div class="flex flex-col tablet:flex-row desktop:grid desktop:grid-cols-3">
  <div class="w-full tablet:w-1/2 desktop:w-auto">Item 1</div>
  <div class="w-full tablet:w-1/2 desktop:w-auto">Item 2</div>
  <div class="w-full tablet:w-full desktop:w-auto">Item 3</div>
</div>
```

---

## State Variants

Apply styles conditionally based on element state:

| Variant | Selector | Example |
|---------|----------|---------|
| `hover:` | `:hover` | `hover:bg-primary-dark` |
| `focus:` | `:focus` | `focus:ring-2` |
| `active:` | `:active` | `active:scale-95` |
| `visited:` | `:visited` | `visited:text-purple` |
| `disabled:` | `:disabled` | `disabled:opacity-50` |
| `group-hover:` | `.group:hover &` | `group-hover:text-white` |
| `peer-focus:` | `.peer:focus ~ &` | `peer-focus:visible` |
| `dark:` | `.dark &` or `@media (prefers-color-scheme: dark)` | `dark:bg-gray-900` |

### Stacking Modifiers

Combine responsive and state variants:

```html
<button class="
  bg-primary
  hover:bg-primary-dark
  tablet:hover:bg-primary-darker
  focus:ring-2
  desktop:focus:ring-4
">
  Button
</button>
```

### Group and Peer Modifiers

```html
<!-- Group hover: style children when parent is hovered -->
<div class="group">
  <h3 class="group-hover:text-primary">Title</h3>
  <p class="group-hover:text-gray-600">Description</p>
</div>

<!-- Peer focus: style siblings when input is focused -->
<label>
  <input type="text" class="peer" />
  <span class="peer-focus:text-primary">Label appears blue when focused</span>
</label>
```

---

## JIT (Just-In-Time) Mode

The JIT engine scans your HTML/JSX files and generates only the CSS you use.

### Configuration

Create `jit.config.js` in your project root:

```js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './templates/**/*.html',
  ],
  // Output file
  output: './dist/utilities.css',
};
```

### Running JIT

```bash
# One-time build
node tasks/jit/jit-engine.js

# Watch mode
node tasks/jit/jit-engine.js --watch
```

### Arbitrary Values

Use bracket syntax for one-off values:

```html
<!-- Arbitrary sizing -->
<div class="w-[137px] h-[calc(100vh-64px)]">

<!-- Arbitrary colors -->
<div class="bg-[#ff5722] text-[rgb(255,255,255)]">

<!-- Arbitrary spacing -->
<div class="mt-[23px] p-[2.5rem]">

<!-- Arbitrary font size -->
<p class="text-[clamp(1rem,2vw,1.5rem)]">
```

### Opacity Modifiers

Add opacity to any color utility:

```html
<div class="bg-primary/75">     <!-- 75% opacity -->
<div class="text-black/50">     <!-- 50% opacity -->
<div class="border-white/25">   <!-- 25% opacity -->
```

---

## Using with USWDS Components

USWDS Extended utilities work alongside standard USWDS components:

```html
<!-- Enhanced USWDS button -->
<button class="usa-button bg-brand-500 hover:bg-brand-600 shadow-md">
  Custom branded button
</button>

<!-- USWDS card with utility enhancements -->
<div class="usa-card shadow-lg hover:shadow-xl transition-shadow">
  <div class="usa-card__container">
    <div class="usa-card__header">
      <h2 class="usa-card__heading text-primary">Card Title</h2>
    </div>
    <div class="usa-card__body">
      <p class="text-gray-600 leading-relaxed">Card content</p>
    </div>
  </div>
</div>
```

---

## File Structure

```
packages/uswds-utilities/src/styles/
├── rules/                    # Utility definitions
│   ├── _index.scss          # Forwards all utilities
│   ├── _package.scss        # Collects utility maps
│   ├── accessibility.scss
│   ├── animation.scss
│   ├── aspect-ratio.scss
│   ├── backdrop-filters.scss
│   ├── background-extended.scss
│   ├── blend-modes.scss
│   ├── columns.scss
│   ├── container.scss
│   ├── content.scss
│   ├── divide.scss
│   ├── effects-extended.scss
│   ├── filters.scss
│   ├── flex-extended.scss
│   ├── gradients.scss
│   ├── grid-extended.scss
│   ├── interactivity.scss
│   ├── interactivity-extended.scss
│   ├── isolation.scss
│   ├── logical-properties.scss
│   ├── object-fit.scss
│   ├── outline-extended.scss
│   ├── overscroll.scss
│   ├── place.scss
│   ├── ring.scss
│   ├── ring-base.scss
│   ├── size.scss
│   ├── space.scss
│   ├── svg.scss
│   ├── tables.scss
│   ├── transforms-extended.scss
│   ├── transition-extended.scss
│   ├── typography-advanced.scss
│   ├── typography-extras.scss
│   └── visibility.scss
│
tasks/jit/
├── jit-engine.js            # Main JIT compiler
├── utility-definitions.js   # JavaScript utility definitions
└── scanner.js               # Class extraction from source files
```

---

## Adding Custom Utilities

### SCSS Method

Add to `packages/uswds-utilities/src/styles/rules/`:

```scss
// my-utility.scss
@use "uswds-core" as *;

$my-utility-settings: (
  output: true,
  responsive: true,
  hover: true,
  focus: false,
);

$u-my-utility: (
  my-utility: (
    base: "my-prefix",
    modifiers: (
      noModifier: "",
    ),
    values: (
      "small": 0.5rem,
      "medium": 1rem,
      "large": 2rem,
    ),
    settings: $my-utility-settings,
    property: "my-css-property",
    type: "utility",
  ),
);
```

Then add to `_index.scss` and `_package.scss`.

### JIT Method

Add to `tasks/jit/utility-definitions.js`:

```js
'my-prefix': {
  property: 'my-css-property',
  values: {
    'small': '0.5rem',
    'medium': '1rem',
    'large': '2rem',
  },
  responsive: true,
  hover: true,
},
```

---

## Naming Conventions

USWDS Extended follows USWDS naming conventions:

| Tailwind | USWDS Extended | Notes |
|----------|----------------|-------|
| `min-w-*` | `minw-*` | No hyphen |
| `max-w-*` | `maxw-*` | No hyphen |
| `min-h-*` | `minh-*` | No hyphen |
| `max-h-*` | `maxh-*` | No hyphen |
| `min-size-*` | `min-size-*` | Hyphen retained |
| `max-size-*` | `max-size-*` | Hyphen retained |

Responsive breakpoints use USWDS names:
- `tablet:` instead of `sm:`
- `desktop:` instead of `lg:`
- `widescreen:` instead of `2xl:`

---

## Build Commands

```bash
# Full build (SCSS compilation)
npm run build

# Watch mode
npm run dev

# Build utilities only
gulp build-utilities

# Run JIT compiler
node tasks/jit/jit-engine.js

# JIT watch mode
node tasks/jit/jit-engine.js --watch
```

---

## Browser Support

All utilities support modern browsers:
- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

Some utilities use modern CSS features:
- `dvh`, `svh`, `lvh` viewport units
- `text-wrap: balance`
- CSS Container Queries (where applicable)
- `color-scheme` property

---

## Accessibility Considerations

1. **Focus states are preserved** - Never remove focus indicators without providing alternatives
2. **Color contrast** - Use USWDS color tokens which meet WCAG 2.1 AA standards
3. **Screen reader utilities** - Use `sr-only` for visually hidden but accessible content
4. **Reduced motion** - Respect `prefers-reduced-motion` in animations

```html
<!-- Good: Visible focus ring -->
<button class="focus:ring-2 focus:ring-primary focus:outline-none">
  Accessible button
</button>

<!-- Good: Screen reader text -->
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-0">
  Skip to main content
</a>
```

---

## Migration from Tailwind

Most Tailwind classes work directly. Key differences:

1. **Breakpoint names**: Use `tablet:` instead of `sm:`, `desktop:` instead of `lg:`
2. **Sizing utilities**: Use `minw-*`, `maxw-*`, `minh-*`, `maxh-*` (no hyphens)
3. **Color names**: Use USWDS color tokens (`primary`, `secondary`) alongside standard colors

```html
<!-- Tailwind -->
<div class="sm:flex lg:grid-cols-3 min-w-0 max-w-lg">

<!-- USWDS Extended -->
<div class="tablet:flex desktop:grid-cols-3 minw-0 maxw-lg">
```
