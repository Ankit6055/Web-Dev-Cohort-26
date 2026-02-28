# Advanced CSS — Filters, Shapes, Scroll & More

## CSS Filters — Instagram for the Web

```css
/* Apply visual effects to elements */

img { filter: blur(5px); }              /* Blur effect */
img { filter: brightness(1.2); }        /* 1 = normal, >1 = brighter */
img { filter: contrast(1.5); }          /* 1 = normal, >1 = more contrast */
img { filter: grayscale(100%); }        /* 0% = color, 100% = black & white */
img { filter: sepia(80%); }             /* Vintage/warm look */
img { filter: saturate(2); }            /* 1 = normal, >1 = more vivid */
img { filter: hue-rotate(90deg); }      /* Shift all colors on color wheel */
img { filter: invert(100%); }           /* Negative image */
img { filter: opacity(50%); }           /* Like opacity property */
img { filter: drop-shadow(4px 4px 8px rgba(0,0,0,0.3)); }

/* Combine multiple filters: */
img {
    filter: brightness(1.1) contrast(1.2) saturate(1.3);
}

/* Hover effect — color to grayscale */
.team-photo {
    filter: grayscale(100%);
    transition: filter 0.3s ease;
}
.team-photo:hover {
    filter: grayscale(0%);     /* Color on hover */
}
```

### `backdrop-filter` — Filter BEHIND an Element:

```css
/* Glassmorphism — frosted glass effect */
.glass-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 24px;
}

/* Blurred navbar background */
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);   /* Safari */
}
```

---

## Clip-Path — Custom Shapes

```css
/* Cut elements into shapes */

/* Circle */
.avatar {
    clip-path: circle(50%);
}

/* Ellipse */
.element {
    clip-path: ellipse(50% 30% at 50% 50%);
}

/* Triangle */
.triangle {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

/* Diamond */
.diamond {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

/* Pentagon */
.pentagon {
    clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

/* Hexagon */
.hex {
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

/* Angled section divider */
.section {
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}

/* Animated clip-path */
.reveal {
    clip-path: inset(0 100% 0 0);         /* Hidden */
    transition: clip-path 0.5s ease;
}
.reveal:hover {
    clip-path: inset(0 0 0 0);            /* Revealed */
}

/* Tool: bennettfeely.com/clippy — generate clip-paths visually */
```

---

## CSS Shapes — Text Wrapping Around Shapes

```css
.circle-image {
    float: left;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    shape-outside: circle(50%);    /* Text wraps around the circle! */
    margin-right: 20px;
}

.custom-shape {
    float: left;
    width: 300px;
    height: 300px;
    shape-outside: polygon(0 0, 100% 0, 100% 100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%);
}
```

---

## Scroll Behavior

```css
/* Smooth scroll to anchors */
html {
    scroll-behavior: smooth;
}

/* Now clicking <a href="#section"> scrolls smoothly instead of jumping */

/* Scroll snapping — like a carousel */
.scroll-container {
    overflow-x: auto;
    scroll-snap-type: x mandatory;    /* Snap on X axis */
    display: flex;
    gap: 16px;
}

.scroll-item {
    scroll-snap-align: start;          /* Snap to start of each item */
    flex: 0 0 80%;                     /* Each item 80% wide */
}

/* Vertical scroll snapping (full-page sections) */
.page-sections {
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
}

.page-sections section {
    height: 100vh;
    scroll-snap-align: start;
}

/* Scroll padding (avoid content behind fixed header) */
html {
    scroll-padding-top: 80px;          /* Offset for fixed navbar */
}

/* Hide scrollbar but keep scrolling */
.no-scrollbar {
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Custom scrollbar */
.custom-scroll::-webkit-scrollbar {
    width: 8px;
}
.custom-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
}
.custom-scroll::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
    background: #555;
}
```

---

## CSS Counters — Auto-Numbering

```css
/* Automatic numbering without changing HTML */
.steps {
    counter-reset: step-counter;       /* Initialize counter */
}

.steps .step::before {
    counter-increment: step-counter;   /* Add 1 each time */
    content: "Step " counter(step-counter) ": ";
    font-weight: bold;
    color: #0066cc;
}

/* Result: "Step 1: ...", "Step 2: ...", "Step 3: ..." */

/* Custom numbered lists */
ol.custom {
    counter-reset: item;
    list-style: none;
}

ol.custom li {
    counter-increment: item;
}

ol.custom li::before {
    content: counter(item, decimal-leading-zero) ".";
    /* Shows: 01. 02. 03. ... */
    font-weight: bold;
    color: #0066cc;
    margin-right: 8px;
}
```

---

## `aspect-ratio` — Consistent Proportions

```css
/* Maintain proportions without padding hacks */
.video-container {
    aspect-ratio: 16 / 9;             /* Always 16:9 */
    width: 100%;
}

.square {
    aspect-ratio: 1;                   /* Perfect square */
}

.portrait {
    aspect-ratio: 3 / 4;              /* Portrait photo ratio */
}

/* Combined with object-fit */
.thumbnail {
    aspect-ratio: 1;
    width: 150px;
    object-fit: cover;                 /* Crop to fill, no distortion */
}
```

---

## `mix-blend-mode` — Photoshop Blend Modes

```css
.overlay-text {
    mix-blend-mode: multiply;          /* Like Photoshop's multiply */
}

.blend-image {
    mix-blend-mode: screen;            /* Lightens */
}

/* Blend modes: normal, multiply, screen, overlay, darken, lighten,
   color-dodge, color-burn, hard-light, soft-light, difference,
   exclusion, hue, saturation, color, luminosity */

/* Background blend */
.hero {
    background-image: url('photo.jpg');
    background-color: #0066cc;
    background-blend-mode: multiply;   /* Tint the image */
}
```

---

## `writing-mode` — Vertical Text

```css
.vertical-text {
    writing-mode: vertical-rl;         /* Top-to-bottom, right-to-left */
    /* Great for Japanese/Chinese text or decorative labels */
}

.vertical-label {
    writing-mode: vertical-lr;         /* Top-to-bottom, left-to-right */
    text-orientation: mixed;
}
```

---

## Logical Properties — For Better Internationalization

```css
/* Old (physical — assumes left-to-right): */
.card {
    margin-left: 20px;
    padding-right: 16px;
    border-top: 1px solid #ddd;
    text-align: left;
}

/* New (logical — works for ANY text direction): */
.card {
    margin-inline-start: 20px;         /* Left in LTR, Right in RTL */
    padding-inline-end: 16px;
    border-block-start: 1px solid #ddd;   /* Top regardless of direction */
    text-align: start;
}

/* Logical property mapping: */
/* margin-top     → margin-block-start    */
/* margin-bottom  → margin-block-end      */
/* margin-left    → margin-inline-start   */
/* margin-right   → margin-inline-end     */
/* width          → inline-size           */
/* height         → block-size            */
```

---

## `@layer` — Cascade Layers

```css
/* Control the order of cascade without worrying about specificity */

@layer reset, base, components, utilities;

@layer reset {
    * { margin: 0; padding: 0; box-sizing: border-box; }
}

@layer base {
    body { font-family: system-ui; }
    h1 { font-size: 2rem; }
}

@layer components {
    .card { padding: 24px; border: 1px solid #ddd; }
    .btn { padding: 12px 24px; }
}

@layer utilities {
    .text-center { text-align: center; }
    .mt-4 { margin-top: 1rem; }
}

/* 
  Layers declared later win over earlier ones.
  utilities > components > base > reset
  Even if a .card selector has higher specificity than .text-center,
  .text-center will win because utilities layer comes after components.
*/
```

---

## `@supports` — Feature Detection

```css
/* Check if browser supports a feature before using it */

/* Fallback */
.grid {
    display: flex;
    flex-wrap: wrap;
}

/* Use grid if supported */
@supports (display: grid) {
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}

/* Check for container queries support */
@supports (container-type: inline-size) {
    .wrapper {
        container-type: inline-size;
    }
}

/* Check for backdrop-filter */
@supports (backdrop-filter: blur(10px)) {
    .navbar {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.7);
    }
}

/* NOT supported */
@supports not (display: grid) {
    /* Old browser fallback styles */
}
```

---

## `@container` Queries (Recap)

```css
/* Style based on CONTAINER size, not viewport */
.card-wrapper {
    container-type: inline-size;
}

@container (min-width: 400px) {
    .card {
        display: flex;
        gap: 16px;
    }
}

/* Container query with named containers */
.sidebar {
    container-type: inline-size;
    container-name: sidebar;
}

@container sidebar (min-width: 300px) {
    .widget {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
```

---

## Nesting (Native CSS!)

```css
/* CSS Nesting — like Sass, but native! */
.card {
    padding: 24px;
    border: 1px solid #ddd;
    
    & .title {
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    & .body {
        color: #555;
    }
    
    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    &.featured {
        border-color: gold;
    }
    
    @media (min-width: 768px) {
        padding: 32px;
    }
}

/* Compiles to: */
/* .card { padding: 24px; ... } */
/* .card .title { font-size: 1.5rem; ... } */
/* .card:hover { box-shadow: ...; } */
/* .card.featured { border-color: gold; } */
```

---

## Useful Modern Features Summary

| Feature             | Purpose                              | Support       |
|--------------------|--------------------------------------|---------------|
| `clamp()`          | Responsive values with min/max       | ✅ All modern  |
| `aspect-ratio`     | Maintain proportions                 | ✅ All modern  |
| `:has()`           | Parent selector                      | ✅ All modern  |
| `container queries`| Style by container size              | ✅ All modern  |
| `@layer`           | Cascade control                      | ✅ All modern  |
| CSS Nesting        | Nested selectors (like Sass)         | ✅ All modern  |
| `color-mix()`      | Mix two colors                       | ✅ All modern  |
| `subgrid`          | Grid children use parent tracks      | ✅ All modern  |
| Scroll-driven anim | Animate on scroll position           | ⚠️ Partial     |
| `@scope`           | Scoped styles                        | ⚠️ Partial     |

---

> **Key Takeaways**:
> 1. **Filters** (`blur`, `grayscale`, etc.) and **backdrop-filter** (glassmorphism) add visual effects
> 2. **clip-path** creates custom shapes — circles, polygons, angled sections
> 3. **Scroll snap** creates carousel-like behavior with pure CSS
> 4. **`aspect-ratio`** maintains proportions without padding hacks
> 5. **`@layer`** organizes your CSS cascade — no more specificity wars
> 6. **CSS Nesting** brings Sass-like nesting to native CSS
> 7. Use **`@supports`** for progressive enhancement — fallbacks for older browsers 🎯
