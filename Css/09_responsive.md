# CSS Responsive Design — Adapting to Every Screen

## What Is Responsive Design?

Responsive design means your website **looks good on all devices** — phones, tablets, laptops, and large monitors. Instead of building separate websites for each device, you build ONE that **adapts**.

The three pillars:
1. **Fluid layouts** — use percentages and `fr` instead of fixed pixels
2. **Flexible media** — images and videos scale with their container
3. **Media queries** — apply different styles at different screen sizes

---

## The Viewport Meta Tag (Required!)

```html
<!-- This MUST be in your HTML <head> for responsive to work -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Without this, mobile browsers zoom out to show the "desktop" version -->
```

---

## Media Queries — The Core Tool

```css
/* Apply styles ONLY when the screen is at least 768px wide */
@media (min-width: 768px) {
    .container {
        max-width: 720px;
    }
}

/* Apply styles ONLY when the screen is smaller than 768px */
@media (max-width: 767px) {
    .sidebar {
        display: none;
    }
}
```

### Common Breakpoints:

```css
/* Mobile First Approach (✅ RECOMMENDED) */
/* Start with mobile styles, then ADD styles for larger screens */

/* Default: Mobile styles (0px and up) */
.container {
    padding: 16px;
}

/* Small tablets (640px and up) */
@media (min-width: 640px) {
    .container {
        max-width: 640px;
        margin: 0 auto;
    }
}

/* Tablets (768px and up) */
@media (min-width: 768px) {
    .container {
        max-width: 720px;
    }
}

/* Small laptops (1024px and up) */
@media (min-width: 1024px) {
    .container {
        max-width: 960px;
    }
}

/* Desktops (1280px and up) */
@media (min-width: 1280px) {
    .container {
        max-width: 1200px;
    }
}
```

### Popular Breakpoint Systems:

| Name        | Tailwind  | Bootstrap | General Use       |
|-------------|-----------|-----------|-------------------|
| Mobile      | 0px       | 0px       | 0px               |
| Small       | 640px     | 576px     | Phone landscape   |
| Medium      | 768px     | 768px     | Tablets           |
| Large       | 1024px    | 992px     | Small laptops     |
| Extra Large | 1280px    | 1200px    | Desktops          |
| 2XL         | 1536px    | 1400px    | Large monitors    |

---

## Mobile First vs Desktop First

### Mobile First (✅ Recommended):

```css
/* Start with mobile → add complexity for larger screens */

/* Base styles = MOBILE */
.grid {
    display: grid;
    grid-template-columns: 1fr;           /* Single column */
    gap: 16px;
}

/* Tablet → 2 columns */
@media (min-width: 768px) {
    .grid {
        grid-template-columns: 1fr 1fr;
    }
}

/* Desktop → 3 columns */
@media (min-width: 1024px) {
    .grid {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

/*
  Why mobile first?
  ✅ Mobile is the simplest layout — easier starting point
  ✅ Forces you to prioritize content
  ✅ Most web traffic is mobile
  ✅ Progressive enhancement — add features for bigger screens
*/
```

### Desktop First (Older Approach):

```css
/* Start with desktop → remove/simplify for smaller screens */
/* Uses max-width instead of min-width */

.grid {
    grid-template-columns: 1fr 1fr 1fr;
}

@media (max-width: 1023px) {
    .grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 767px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
```

---

## Media Query Features

```css
/* Width-based (most common) */
@media (min-width: 768px) { }
@media (max-width: 767px) { }
@media (min-width: 768px) and (max-width: 1023px) { }  /* Range */

/* Height-based */
@media (min-height: 600px) { }

/* Orientation */
@media (orientation: portrait) { }     /* Taller than wide */
@media (orientation: landscape) { }    /* Wider than tall */

/* Hover capability */
@media (hover: hover) { }             /* Device supports hover (mouse) */
@media (hover: none) { }              /* No hover (touch screens) */

/* Pointer type */
@media (pointer: fine) { }            /* Mouse — precise clicking */
@media (pointer: coarse) { }          /* Finger — bigger touch targets */

/* Prefers color scheme (dark mode!) */
@media (prefers-color-scheme: dark) {
    body {
        background: #1a1a1a;
        color: #eee;
    }
}
@media (prefers-color-scheme: light) {
    body {
        background: #fff;
        color: #333;
    }
}

/* Reduced motion (accessibility) */
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition-duration: 0.01ms !important;
    }
}

/* Print styles */
@media print {
    .no-print { display: none; }
    body { font-size: 12pt; color: black; }
}

/* Combining conditions */
@media (min-width: 768px) and (orientation: landscape) { }
@media (min-width: 768px) or (orientation: landscape) { }   /* Modern */
@media not (hover: hover) { }    /* Devices without hover */
```

### Modern Range Syntax:

```css
/* New syntax (supported in modern browsers) */
@media (width >= 768px) { }
@media (width < 768px) { }
@media (768px <= width <= 1024px) { }

/* Same as: */
@media (min-width: 768px) { }
@media (max-width: 767px) { }
@media (min-width: 768px) and (max-width: 1024px) { }
```

---

## Responsive Units

```css
/* Fixed — avoid for layout */
.fixed { width: 800px; }           /* ❌ Won't adapt */

/* Percentage — relative to parent */
.fluid { width: 80%; }             /* ✅ Scales with parent */

/* Viewport units */
.hero {
    width: 100vw;                   /* Full viewport width */
    height: 100vh;                  /* Full viewport height */
    min-height: 100svh;            /* Small viewport height (accounts for mobile bars) */
}

/* clamp() — responsive with limits */
h1 {
    font-size: clamp(1.5rem, 4vw, 3rem);
    /* Min: 1.5rem | Preferred: 4vw | Max: 3rem */
}

.container {
    width: clamp(300px, 90%, 1200px);
    /* Min: 300px | Preferred: 90% | Max: 1200px */
    margin: 0 auto;
}

/* min() and max() */
.sidebar {
    width: min(300px, 100%);        /* 300px or 100%, whichever is smaller */
}
```

### Viewport Unit Variants:

| Unit  | What It Measures                                    |
|-------|-----------------------------------------------------|
| `vw`  | 1% of viewport width                               |
| `vh`  | 1% of viewport height                              |
| `svh` | Small viewport height (mobile: excludes URL bar)    |
| `lvh` | Large viewport height (mobile: includes URL bar)    |
| `dvh` | Dynamic viewport height (changes as bars show/hide) |

---

## Responsive Images

```css
/* 1. Never let images overflow */
img {
    max-width: 100%;
    height: auto;           /* Maintain aspect ratio */
    display: block;
}

/* 2. Object-fit for fixed dimensions */
.thumbnail {
    width: 200px;
    height: 200px;
    object-fit: cover;      /* Crop to fill — no distortion */
}

/* 3. Aspect ratio */
.video-wrapper {
    aspect-ratio: 16 / 9;
    width: 100%;
}

.square {
    aspect-ratio: 1;        /* Perfect square */
}
```

```html
<!-- 4. HTML responsive images -->
<img 
    src="photo-800.jpg"
    srcset="photo-400.jpg 400w, 
            photo-800.jpg 800w, 
            photo-1200.jpg 1200w"
    sizes="(max-width: 600px) 100vw, 
           (max-width: 900px) 50vw, 
           33vw"
    alt="Responsive photo"
>

<!-- 5. Different images for different screens -->
<picture>
    <source media="(min-width: 1024px)" srcset="hero-desktop.jpg">
    <source media="(min-width: 640px)" srcset="hero-tablet.jpg">
    <img src="hero-mobile.jpg" alt="Hero image">
</picture>
```

---

## Responsive Layout Patterns

### 1. Fluid Container:

```css
.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;         /* Centered */
    padding: 0 16px;
}

/* OR with clamp: */
.container {
    width: clamp(300px, 90%, 1200px);
    margin: 0 auto;
}
```

### 2. Responsive Navigation:

```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
}

/* Mobile: stack + add hamburger menu */
.nav-links {
    display: none;                    /* Hidden on mobile */
}

.hamburger {
    display: block;                   /* Show hamburger on mobile */
}

.nav-links.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
}

/* Desktop: horizontal nav */
@media (min-width: 768px) {
    .nav-links {
        display: flex;                /* Show links */
        gap: 24px;
    }
    
    .hamburger {
        display: none;                /* Hide hamburger */
    }
}
```

### 3. Card Grid (Auto-Responsive):

```css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
}

/* No media queries needed — cards auto-wrap! */
```

### 4. Sidebar Layout:

```css
/* Mobile: stacked */
.page-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
}

/* Desktop: sidebar + main */
@media (min-width: 768px) {
    .page-layout {
        grid-template-columns: 280px 1fr;
    }
}
```

### 5. Responsive Typography:

```css
html {
    font-size: 16px;
}

h1 { font-size: clamp(1.75rem, 4vw, 3.5rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2.5rem); }
h3 { font-size: clamp(1.25rem, 2.5vw, 1.75rem); }
p  { font-size: clamp(1rem, 1.5vw, 1.125rem); }

/* Line length for readability */
p {
    max-width: 65ch;
}
```

### 6. Responsive Spacing:

```css
:root {
    --space-sm: clamp(0.5rem, 1vw, 1rem);
    --space-md: clamp(1rem, 2vw, 2rem);
    --space-lg: clamp(2rem, 4vw, 4rem);
    --space-xl: clamp(3rem, 6vw, 6rem);
}

section {
    padding: var(--space-xl) var(--space-md);
}
```

---

## Container Queries (Modern!)

Media queries check the **viewport**. Container queries check the **parent container**:

```css
/* Define a container */
.card-wrapper {
    container-type: inline-size;
    container-name: card;
}

/* Style based on CONTAINER width, not viewport */
@container card (min-width: 400px) {
    .card {
        display: flex;
        flex-direction: row;       /* Horizontal layout when container is wide */
    }
}

@container card (max-width: 399px) {
    .card {
        flex-direction: column;    /* Stacked when container is narrow */
    }
}

/* 
  This is HUGE — a card can adapt whether it's in a sidebar 
  (narrow) or main content (wide), without knowing which!
*/
```

---

## Responsive Hiding/Showing

```css
/* Hide on mobile */
.desktop-only {
    display: none;
}
@media (min-width: 768px) {
    .desktop-only {
        display: block;
    }
}

/* Hide on desktop */
.mobile-only {
    display: block;
}
@media (min-width: 768px) {
    .mobile-only {
        display: none;
    }
}
```

---

## Testing Responsive Design

```
Tools to test responsive layouts:
1. Browser DevTools → Toggle Device Toolbar (Ctrl/Cmd + Shift + M)
2. Resize browser window manually
3. Chrome DevTools → Responsive mode with preset devices
4. Test on actual devices when possible
5. Check at breakpoint boundaries (767px, 768px, etc.)
```

---

> **Key Takeaways**:
> 1. Always include `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
> 2. Use **mobile-first** — start with mobile styles, add `min-width` media queries UP
> 3. Common breakpoints: **640px** (sm), **768px** (md), **1024px** (lg), **1280px** (xl)
> 4. Use `clamp()` for responsive font sizes and spacing — fewer media queries
> 5. `repeat(auto-fit, minmax(280px, 1fr))` = **responsive grid with zero media queries**
> 6. Always set `max-width: 100%` on images to prevent overflow
> 7. **Container queries** let components adapt to their container, not just the viewport 🎯
