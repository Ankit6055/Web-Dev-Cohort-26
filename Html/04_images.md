# Images & Media in HTML

## The `<img>` Tag

The `<img>` tag displays an image on the page. It's a **self-closing** tag (no `</img>` needed).

```html
<img src="photo.jpg" alt="A beautiful sunset">
```

Two **required** attributes:

| Attribute | Purpose                                           |
|-----------|---------------------------------------------------|
| `src`     | **Source** — path or URL to the image              |
| `alt`     | **Alternative text** — describes the image (for screen readers & if image fails to load) |

---

## Basic Image Examples

```html
<!-- Local image (same folder) -->
<img src="cat.jpg" alt="A cute cat">

<!-- Image in a subfolder -->
<img src="images/logo.png" alt="Company Logo">

<!-- Image from the internet -->
<img src="https://example.com/photo.jpg" alt="Random photo">
```

---

## The `alt` Attribute — Why It Matters

```html
<!-- ✅ GOOD — descriptive alt text -->
<img src="dog.jpg" alt="A golden retriever playing in the park">

<!-- ✅ OK for decorative images — empty alt -->
<img src="decorative-line.png" alt="">

<!-- ❌ BAD — useless alt text -->
<img src="dog.jpg" alt="image">
<img src="dog.jpg" alt="photo">
<img src="dog.jpg" alt="dog.jpg">

<!-- ❌ BAD — missing alt entirely -->
<img src="dog.jpg">
```

**Why `alt` matters:**
- **Screen readers** read it aloud for visually impaired users
- Shows when the **image fails to load** (broken link)
- Helps **SEO** — search engines understand your images
- It's **required** by HTML standards

---

## Width & Height

```html
<!-- Using attributes (pixels) -->
<img src="photo.jpg" alt="Photo" width="400" height="300">

<!-- Using CSS (preferred) -->
<img src="photo.jpg" alt="Photo" style="width: 400px; height: 300px;">

<!-- Percentage — relative to parent container -->
<img src="photo.jpg" alt="Photo" style="width: 100%;">

<!-- ⚠️ ALWAYS set width & height to prevent layout shift -->
<!-- When the page loads, the browser reserves space for the image -->
<img src="photo.jpg" alt="Photo" width="800" height="600">
```

### Keeping Aspect Ratio:

```html
<!-- Set only ONE dimension, the other adjusts automatically -->
<img src="photo.jpg" alt="Photo" width="400">
<!-- Height automatically calculated to keep proportions -->

<!-- Or use CSS: -->
<img src="photo.jpg" alt="Photo" style="width: 400px; height: auto;">
```

---

## Image Formats — When to Use What

| Format   | Best For                       | Transparency | Animation | File Size |
|----------|--------------------------------|:---:|:---:|-----------|
| **JPEG** (`.jpg`) | Photos, complex images      | ❌  | ❌  | Small     |
| **PNG**  (`.png`)  | Logos, screenshots, transparency | ✅  | ❌  | Medium    |
| **GIF**  (`.gif`)  | Simple animations, icons    | ✅  | ✅  | Medium    |
| **SVG**  (`.svg`)  | Icons, logos, illustrations  | ✅  | ✅  | Tiny      |
| **WebP** (`.webp`) | Everything (modern format)  | ✅  | ✅  | Smallest  |
| **AVIF** (`.avif`) | Everything (newest format)  | ✅  | ✅  | Smallest  |

```html
<!-- Photo → JPEG -->
<img src="vacation.jpg" alt="Beach vacation">

<!-- Logo with transparent background → PNG or SVG -->
<img src="logo.png" alt="Company logo">
<img src="logo.svg" alt="Company logo">

<!-- Animated sticker → GIF or WebP -->
<img src="loading.gif" alt="Loading animation">

<!-- Modern, optimized image → WebP -->
<img src="hero.webp" alt="Hero banner">
```

---

## The `<picture>` Element — Responsive Images

Lets you provide **multiple image sources** so the browser picks the best one:

```html
<!-- Different formats (browser picks the first one it supports) -->
<picture>
    <source srcset="photo.avif" type="image/avif">
    <source srcset="photo.webp" type="image/webp">
    <img src="photo.jpg" alt="A photo">  <!-- Fallback -->
</picture>
```

### Different Images for Different Screen Sizes:

```html
<picture>
    <!-- Large screens (desktop) -->
    <source srcset="hero-large.jpg" media="(min-width: 1200px)">

    <!-- Medium screens (tablet) -->
    <source srcset="hero-medium.jpg" media="(min-width: 768px)">

    <!-- Small screens (mobile) — fallback -->
    <img src="hero-small.jpg" alt="Hero Banner">
</picture>
```

---

## `srcset` and `sizes` — Resolution Switching

Tell the browser about different image sizes so it can pick the right one:

```html
<!-- Same image, different resolutions -->
<img 
    src="photo-400.jpg" 
    srcset="
        photo-400.jpg 400w,
        photo-800.jpg 800w,
        photo-1200.jpg 1200w
    "
    sizes="
        (max-width: 600px) 400px,
        (max-width: 1000px) 800px,
        1200px
    "
    alt="Responsive photo"
>

<!-- 
    Translation:
    - If screen is ≤ 600px wide → use 400px image
    - If screen is ≤ 1000px wide → use 800px image  
    - Otherwise → use 1200px image
-->
```

---

## `<figure>` and `<figcaption>` — Image with Caption

```html
<figure>
    <img src="chart.png" alt="Sales chart for Q1 2026">
    <figcaption>Figure 1: Sales performance in Q1 2026</figcaption>
</figure>

<!-- The caption is visually & semantically linked to the image -->
```

### Multiple Images in One Figure:

```html
<figure>
    <img src="before.jpg" alt="Room before renovation">
    <img src="after.jpg" alt="Room after renovation">
    <figcaption>Before and after renovation</figcaption>
</figure>
```

---

## Image Maps — Clickable Areas on an Image

Make different parts of an image link to different pages:

```html
<img src="office-map.png" alt="Office Floor Plan" usemap="#officemap" width="600" height="400">

<map name="officemap">
    <!-- Rectangle: left, top, right, bottom -->
    <area shape="rect" coords="0,0,200,200" href="room1.html" alt="Room 1">

    <!-- Circle: centerX, centerY, radius -->
    <area shape="circle" coords="400,200,50" href="meeting.html" alt="Meeting Room">

    <!-- Polygon: x1,y1, x2,y2, x3,y3... -->
    <area shape="poly" coords="300,0,500,100,300,200" href="lobby.html" alt="Lobby">
</map>
```

---

## Lazy Loading — Load Images Only When Visible

```html
<!-- Browser loads this image only when user scrolls near it -->
<img src="photo.jpg" alt="Photo" loading="lazy">

<!-- loading="eager" — loads immediately (default) -->
<img src="hero.jpg" alt="Hero" loading="eager">
```

**Why use lazy loading?**
- Faster initial page load
- Saves bandwidth (images below the fold load only when needed)
- Use `lazy` for images NOT visible on first screen
- Use `eager` (or don't add it) for images visible immediately (hero images, logos)

---

## `object-fit` — Control How Images Fill Their Container (CSS)

```html
<!-- When image dimensions don't match the container: -->
<img src="photo.jpg" alt="Photo" 
     style="width: 300px; height: 300px; object-fit: cover;">

<!--
    object-fit values:
    fill     — stretches to fill (distorts image)
    contain  — fits inside without cropping (may have empty space)
    cover    — fills completely, crops if needed (most common)
    none     — keeps original size
    scale-down — uses smaller of 'contain' or 'none'
-->
```

---

## Image as Background (CSS)

```html
<div style="
    width: 100%;
    height: 400px;
    background-image: url('hero.jpg');
    background-size: cover;
    background-position: center;
">
    <h1>Welcome to My Site</h1>
</div>

<!-- 
    Use background-image when:
    - Image is decorative (not content)
    - You need text OVER the image
    - You need CSS control (position, repeat, etc.)

    Use <img> when:
    - Image IS the content (photos, charts, products)
    - You need alt text for accessibility
    - SEO should index the image
-->
```

---

## SVG Inline — Scalable Vector Graphics

SVGs can be placed directly in HTML for full control:

```html
<!-- As an <img> tag -->
<img src="icon.svg" alt="Icon" width="50" height="50">

<!-- Inline SVG — full CSS/JS control -->
<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" fill="blue" />
</svg>

<!-- Inline SVG with hover effect -->
<svg width="50" height="50" style="cursor: pointer;">
    <rect width="50" height="50" fill="green" />
    <text x="10" y="30" fill="white" font-size="14">Hi</text>
</svg>
```

---

## Favicon — The Tiny Icon in the Browser Tab

```html
<head>
    <!-- Standard favicon -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <!-- PNG favicon (better quality) -->
    <link rel="icon" href="favicon.png" type="image/png">

    <!-- SVG favicon (scales perfectly) -->
    <link rel="icon" href="favicon.svg" type="image/svg+xml">

    <!-- Apple touch icon (when saved to home screen) -->
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
</head>
```

---

## Quick Reference

| Attribute    | Purpose                                    |
|-------------|--------------------------------------------|
| `src`       | Image source (path or URL) — **Required**  |
| `alt`       | Alternative text — **Required**            |
| `width`     | Width in pixels                            |
| `height`    | Height in pixels                           |
| `loading`   | `lazy` or `eager` (lazy = loads when visible) |
| `title`     | Tooltip on hover                           |
| `usemap`    | Links to an image map                      |

---

> **Key Takeaways**:
> 1. `<img>` needs both `src` (where) and `alt` (what) — always include them
> 2. Use **JPEG** for photos, **PNG/SVG** for logos, **WebP** for everything modern
> 3. `<picture>` lets you serve different images for different screens/formats
> 4. Add `loading="lazy"` to images below the fold for performance
> 5. Use `<figure>` + `<figcaption>` to pair images with captions
> 6. Always set `width` and `height` to prevent layout shift
> 7. Use `<img>` for content images, CSS `background-image` for decorative ones 🎯
