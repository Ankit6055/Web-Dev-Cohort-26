# CSS Basics — Introduction & Syntax

## What is CSS?

CSS stands for **Cascading Style Sheets**. If HTML is the **skeleton** of a webpage, CSS is the **skin, clothes, and makeup** — it controls how everything **looks**.

```
HTML  → WHAT things are (structure)
CSS   → HOW things look (style)
JS    → WHAT things do (behavior)
```

Without CSS, every website would look like a plain text document from the 1990s. CSS gives you control over colors, fonts, spacing, layout, animations, and more.

---

## 3 Ways to Add CSS

### 1. Inline CSS — On the Element (Avoid):

```html
<p style="color: red; font-size: 20px;">This is red text</p>

<!-- ❌ Hard to maintain, can't reuse, highest specificity -->
<!-- ✅ OK for quick testing or JavaScript dynamic styles -->
```

### 2. Internal CSS — In the `<head>` (OK for Small Pages):

```html
<head>
    <style>
        p {
            color: blue;
            font-size: 18px;
        }
    </style>
</head>
```

### 3. External CSS — Separate File (Best Practice):

```html
<!-- In HTML file: -->
<head>
    <link rel="stylesheet" href="style.css">
</head>
```

```css
/* In style.css file: */
p {
    color: green;
    font-size: 18px;
}
```

**Always use external CSS** — keeps HTML clean, reusable across pages, and easy to maintain.

---

## CSS Syntax

Every CSS rule has the same structure:

```css
selector {
    property: value;
    property: value;
}
```

```css
/* Example: */
h1 {
    color: blue;          /* text color */
    font-size: 32px;      /* text size */
    text-align: center;   /* center the text */
    margin-bottom: 20px;  /* space below */
}

/*
  h1          → SELECTOR (what to style)
  color       → PROPERTY (what aspect to change)
  blue        → VALUE (what to change it to)
  ;           → ends each declaration
  { }         → wraps all declarations
*/
```

---

## Comments

```css
/* This is a CSS comment */

/* 
   This is a 
   multi-line comment 
*/

h1 {
    color: red;    /* Makes heading red */
    /* font-size: 40px; */  /* This line is disabled */
}
```

---

## The Cascade — Why It's Called "Cascading"

When multiple rules target the same element, CSS decides which one wins. The "cascade" follows this order:

### 1. Source Order (Last One Wins):

```css
p { color: red; }
p { color: blue; }   /* ✅ WINS — comes last */

/* The paragraph will be BLUE */
```

### 2. Specificity (More Specific Wins):

```css
p { color: red; }           /* Specificity: 0-0-1 */
.highlight { color: blue; } /* Specificity: 0-1-0 — WINS */
#title { color: green; }    /* Specificity: 1-0-0 — WINS over both */

/* More specific selectors override less specific ones */
```

### 3. Importance (`!important` Overrides Everything):

```css
p {
    color: red !important;  /* ⚠️ Nuclear option — overrides everything */
    color: blue;            /* Ignored because of !important above */
}

/* ❌ AVOID !important — makes debugging a nightmare */
/* ✅ Use proper specificity instead */
```

### Specificity Ranking (Low → High):

| Level | Selector Type              | Example           | Score   |
|-------|----------------------------|--------------------|---------|
| 0     | Universal, combinators     | `*`, `>`, `+`     | 0-0-0   |
| 1     | Element, pseudo-element    | `p`, `::before`   | 0-0-1   |
| 2     | Class, attribute, pseudo   | `.box`, `:hover`  | 0-1-0   |
| 3     | ID                         | `#header`         | 1-0-0   |
| 4     | Inline style               | `style="..."`     | 1-0-0-0 |
| 5     | `!important`               | `!important`      | ∞       |

```css
/* Specificity examples: */
p { }                    /* 0-0-1 */
p.intro { }              /* 0-1-1 */
#header p.intro { }      /* 1-1-1 */
div > p.intro:hover { }  /* 0-2-2 */
```

---

## Inheritance

Some CSS properties **pass down** from parent to child elements automatically:

```css
body {
    font-family: Arial, sans-serif;   /* ✅ Inherited by ALL children */
    color: #333;                       /* ✅ Inherited */
    font-size: 16px;                   /* ✅ Inherited */
}

/* Now ALL text in the page uses Arial, #333 color, 16px */
/* You don't need to set it on every element! */
```

### Properties That ARE Inherited:

- `color`, `font-family`, `font-size`, `font-weight`
- `line-height`, `letter-spacing`, `word-spacing`
- `text-align`, `text-transform`, `text-indent`
- `visibility`, `cursor`, `list-style`

### Properties That Are NOT Inherited:

- `margin`, `padding`, `border`
- `width`, `height`
- `background`, `display`, `position`
- `flex`, `grid` properties

### Controlling Inheritance:

```css
.parent {
    color: blue;
    border: 1px solid red;
}

.child {
    color: inherit;    /* Force inherit from parent → blue */
    border: inherit;   /* Force inherit (border doesn't normally inherit) */
}

.other {
    color: initial;    /* Reset to browser default */
    all: unset;        /* Reset ALL properties */
}
```

---

## CSS Units

### Absolute Units:

```css
.box {
    width: 300px;      /* Pixels — most common, fixed size */
    font-size: 12pt;   /* Points — for print */
    width: 5cm;        /* Centimeters — for print */
}
/* px is the go-to absolute unit for screens */
```

### Relative Units (Responsive — Use These!):

```css
.container {
    width: 80%;          /* 80% of PARENT's width */
    font-size: 1.5em;    /* 1.5× the PARENT's font-size */
    font-size: 1.5rem;   /* 1.5× the ROOT (html) font-size */
    width: 50vw;         /* 50% of VIEWPORT (screen) width */
    height: 100vh;       /* 100% of VIEWPORT height */
    width: min(90%, 1200px); /* Whichever is SMALLER */
}
```

| Unit   | Relative To                | Best For                    |
|--------|----------------------------|-----------------------------|
| `%`    | Parent element             | Widths, responsive layouts  |
| `em`   | Parent's font-size         | Spacing relative to text    |
| `rem`  | Root (`<html>`) font-size  | Font sizes, consistent spacing |
| `vw`   | 1% of viewport width       | Full-width sections         |
| `vh`   | 1% of viewport height      | Full-height hero sections   |
| `ch`   | Width of "0" character     | Limiting text line width    |

### `em` vs `rem`:

```css
html { font-size: 16px; }    /* Root = 16px */

.parent {
    font-size: 20px;           /* Parent = 20px */
}

.child-em {
    font-size: 1.5em;          /* 1.5 × 20px (parent) = 30px */
    padding: 1em;              /* 1 × 30px (own font-size) = 30px */
}

.child-rem {
    font-size: 1.5rem;         /* 1.5 × 16px (root) = 24px — ALWAYS */
    padding: 1rem;             /* 1 × 16px (root) = 16px — ALWAYS */
}

/* 
   rem is more PREDICTABLE — doesn't compound
   em can get confusing with deep nesting
   ✅ Use rem for font-sizes, rem/em for spacing
*/
```

---

## CSS Reset / Normalize

Browsers have **default styles** that differ between Chrome, Firefox, Safari. A reset removes them for consistency:

```css
/* Simple Reset (most common approach): */
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;   /* Makes width/height include padding + border */
}

/* Also common: */
html {
    font-size: 16px;
}

body {
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    color: #333;
}

img {
    max-width: 100%;           /* Images never overflow their container */
    display: block;
}

a {
    text-decoration: none;     /* Remove underline from links */
    color: inherit;
}

ul, ol {
    list-style: none;          /* Remove bullet points */
}
```

---

## Quick Reference — Common Properties

| Property           | What It Does                    | Example                        |
|--------------------|---------------------------------|--------------------------------|
| `color`            | Text color                      | `color: #333;`                |
| `background-color` | Background color                | `background-color: #f5f5f5;` |
| `font-size`        | Text size                       | `font-size: 18px;`           |
| `font-family`      | Font face                       | `font-family: Arial;`        |
| `font-weight`      | Bold / normal                   | `font-weight: bold;`         |
| `text-align`       | Align text                      | `text-align: center;`        |
| `margin`           | Space outside the element       | `margin: 20px;`              |
| `padding`          | Space inside the element        | `padding: 16px;`             |
| `border`           | Border around element           | `border: 1px solid #ddd;`    |
| `width` / `height` | Dimensions                      | `width: 300px;`              |
| `display`          | How element behaves             | `display: flex;`             |
| `position`         | Positioning method              | `position: relative;`        |
| `border-radius`    | Rounded corners                 | `border-radius: 8px;`        |
| `box-shadow`       | Shadow effect                   | `box-shadow: 0 2px 4px rgba(0,0,0,0.1);` |
| `opacity`          | Transparency (0 to 1)           | `opacity: 0.5;`              |
| `cursor`           | Mouse cursor style              | `cursor: pointer;`           |

---

## Starter CSS Template

```css
/* === RESET === */
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* === BASE STYLES === */
html {
    font-size: 16px;
    scroll-behavior: smooth;
}

body {
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #fff;
}

img {
    max-width: 100%;
    display: block;
}

a {
    color: #0066cc;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    margin-bottom: 0.5em;
}

p {
    margin-bottom: 1rem;
}
```

---

> **Key Takeaways**:
> 1. CSS controls **how things look** — colors, fonts, spacing, layout, animations
> 2. Always use **external CSS files** (`<link rel="stylesheet">`) over inline/internal
> 3. The cascade: later rules win, more specific selectors win, `!important` wins all
> 4. Specificity: element (0-0-1) < class (0-1-0) < ID (1-0-0) < inline < `!important`
> 5. Use `rem` for font sizes, `%` and `vw/vh` for responsive layouts
> 6. Always start with a **CSS reset** (`box-sizing: border-box` on everything)
> 7. `em` is relative to parent, `rem` is relative to root — `rem` is more predictable 🎯
