# CSS Typography — Fonts & Text Styling

## Why Typography Matters

Typography is **70-80% of web design**. The right font and spacing can make content easy to read or impossible to follow. Good typography = happy readers.

---

## Font Family

### Setting Fonts:

```css
body {
    font-family: Arial, Helvetica, sans-serif;
    /*
       1st choice: Arial
       2nd choice: Helvetica (if Arial not available)
       Fallback:   sans-serif (any sans-serif font the system has)
    */
}

h1 {
    font-family: Georgia, 'Times New Roman', serif;
    /* serif = fonts with little "feet" on letters */
}

code {
    font-family: 'Courier New', Consolas, monospace;
    /* monospace = each character same width */
}
```

### Font Categories:

| Category     | Look                        | Examples                    | Best For              |
|-------------|-----------------------------|-----------------------------|----------------------|
| `serif`      | Has decorative strokes      | Georgia, Times New Roman    | Print, formal, books |
| `sans-serif` | Clean, no strokes           | Arial, Helvetica, Verdana   | Screens, modern UI   |
| `monospace`  | Equal-width characters      | Courier, Consolas           | Code blocks          |
| `cursive`    | Handwriting-like            | Comic Sans, Brush Script    | Decorative (rarely)  |
| `fantasy`    | Decorative display          | Impact, Papyrus             | Headlines (rarely)   |

### System Font Stack (Modern Best Practice):

```css
body {
    font-family: 
        system-ui,           /* OS default UI font */
        -apple-system,       /* macOS/iOS */
        'Segoe UI',          /* Windows */
        Roboto,              /* Android */
        'Helvetica Neue',    /* Older macOS */
        Arial,               /* Universal fallback */
        sans-serif;          /* Generic fallback */
}

/* This uses the user's OWN system font — loads instantly, feels native */
```

---

## Google Fonts — Custom Fonts

```html
<!-- Step 1: Add in HTML <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
/* Step 2: Use in CSS */
body {
    font-family: 'Inter', sans-serif;
}
```

### Popular Google Font Combinations:

```css
/* Modern & Clean */
h1 { font-family: 'Poppins', sans-serif; }
body { font-family: 'Inter', sans-serif; }

/* Elegant & Classic */
h1 { font-family: 'Playfair Display', serif; }
body { font-family: 'Source Sans Pro', sans-serif; }

/* Technical & Sharp */
h1 { font-family: 'Space Grotesk', sans-serif; }
body { font-family: 'IBM Plex Sans', sans-serif; }
code { font-family: 'JetBrains Mono', monospace; }
```

### Self-Hosting Fonts with `@font-face`:

```css
@font-face {
    font-family: 'MyCustomFont';
    src: url('./fonts/custom.woff2') format('woff2'),
         url('./fonts/custom.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;    /* Shows fallback text while font loads */
}

body {
    font-family: 'MyCustomFont', sans-serif;
}
```

---

## Font Size

```css
/* Absolute — Pixels (fixed, doesn't scale with user settings) */
h1 { font-size: 32px; }

/* Relative — rem (✅ BEST PRACTICE) */
html { font-size: 16px; }       /* Base = 16px */
h1 { font-size: 2.5rem; }       /* 2.5 × 16 = 40px */
h2 { font-size: 2rem; }         /* 2 × 16   = 32px */
h3 { font-size: 1.5rem; }       /* 1.5 × 16 = 24px */
p  { font-size: 1rem; }         /* 1 × 16   = 16px */
small { font-size: 0.875rem; }  /* 0.875 × 16 = 14px */

/* em — Relative to PARENT's font-size (can compound) */
.parent { font-size: 20px; }
.child  { font-size: 1.5em; }   /* 1.5 × 20 = 30px */

/* Viewport-based (for responsive headlines) */
h1 { font-size: 5vw; }          /* 5% of viewport width */

/* clamp() — Responsive with min/max limits (🔥 BEST!) */
h1 {
    font-size: clamp(1.5rem, 4vw, 3rem);
    /*
       Minimum: 1.5rem (24px) — never smaller
       Preferred: 4vw — scales with screen
       Maximum: 3rem (48px) — never bigger
    */
}
```

### Font Size Scale (Recommended):

```css
:root {
    --text-xs:   0.75rem;    /* 12px */
    --text-sm:   0.875rem;   /* 14px */
    --text-base: 1rem;       /* 16px */
    --text-lg:   1.125rem;   /* 18px */
    --text-xl:   1.25rem;    /* 20px */
    --text-2xl:  1.5rem;     /* 24px */
    --text-3xl:  1.875rem;   /* 30px */
    --text-4xl:  2.25rem;    /* 36px */
    --text-5xl:  3rem;       /* 48px */
}
```

---

## Font Weight

```css
p { font-weight: normal; }     /* 400 */
p { font-weight: bold; }       /* 700 */

/* Numeric values (100 to 900): */
.thin       { font-weight: 100; }
.light      { font-weight: 300; }
.normal     { font-weight: 400; }
.medium     { font-weight: 500; }
.semibold   { font-weight: 600; }
.bold       { font-weight: 700; }
.extrabold  { font-weight: 800; }
.black      { font-weight: 900; }

/* You can only use weights the font actually provides! */
/* If you load Inter with weights 400 and 700, using 500 won't work */
```

---

## Font Style & Variant

```css
.italic { font-style: italic; }
.oblique { font-style: oblique; }    /* Slanted (not true italic) */

.small-caps { font-variant: small-caps; }  
/* "Hello World" → "Hᴇʟʟᴏ Wᴏʀʟᴅ" */
```

---

## Line Height (Leading)

The **space between lines** of text. Critical for readability.

```css
/* Unitless values (✅ RECOMMENDED): */
body { line-height: 1.6; }     /* 1.6 × font-size */
h1   { line-height: 1.2; }     /* Tighter for headings */

/* Fixed values: */
p { line-height: 24px; }       /* Exact pixel value */
p { line-height: 150%; }       /* 150% of font-size */

/*
  Recommended line-heights:
  Body text:   1.5 – 1.8
  Headings:    1.1 – 1.3
  Buttons:     1 – 1.2
  
  Too tight (1.0) = hard to read
  Too loose (2.5) = looks disconnected
*/
```

---

## Letter Spacing & Word Spacing

```css
/* Letter spacing (tracking) */
h1 { letter-spacing: -0.02em; }    /* Tighter — looks good on big text */
.uppercase-text { 
    text-transform: uppercase;
    letter-spacing: 0.1em;          /* More space for uppercase text */
}
.spaced { letter-spacing: 2px; }

/* Word spacing */
p { word-spacing: 0.05em; }         /* Slightly more space between words */
```

---

## Text Alignment

```css
.left    { text-align: left; }       /* Default */
.center  { text-align: center; }     /* Centered */
.right   { text-align: right; }      /* Right-aligned */
.justify { text-align: justify; }    /* Stretched to fill width evenly */

/* ⚠️ text-align: justify can create ugly gaps — use cautiously */
/* Only works on INLINE content — won't center a block element */
```

---

## Text Transform

```css
.uppercase  { text-transform: uppercase; }    /* HELLO WORLD */
.lowercase  { text-transform: lowercase; }    /* hello world */
.capitalize { text-transform: capitalize; }   /* Hello World */
.none       { text-transform: none; }         /* As typed */
```

---

## Text Decoration

```css
a { text-decoration: none; }                          /* Remove underline */
.underline { text-decoration: underline; }            
.overline  { text-decoration: overline; }             
.through   { text-decoration: line-through; }          /* Strikethrough */

/* Advanced text decoration: */
a:hover {
    text-decoration: underline;
    text-decoration-color: #0066cc;
    text-decoration-style: wavy;       /* solid, double, dotted, dashed, wavy */
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;        /* Space between text and underline */
}

/* Shorthand: */
.fancy {
    text-decoration: underline wavy #0066cc 2px;
}
```

---

## Text Shadow

```css
h1 {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    /*
       2px  → horizontal offset (right)
       2px  → vertical offset (down)
       4px  → blur radius
       rgba → shadow color
    */
}

/* Multiple shadows: */
h1 {
    text-shadow:
        1px 1px 0 #fff,         /* White outline */
        2px 2px 4px #000;       /* Dark shadow below */
}

/* Glowing text: */
.glow {
    text-shadow: 0 0 10px #0066cc, 0 0 20px #0066cc;
}

/* No shadow: */
h1 { text-shadow: none; }
```

---

## Text Overflow & Wrapping

```css
/* Truncate text with "..." */
.truncate {
    white-space: nowrap;       /* Don't wrap text */
    overflow: hidden;          /* Hide overflowing text */
    text-overflow: ellipsis;   /* Show "..." at the end */
    max-width: 300px;          /* Must have a width limit */
}

/* Multi-line truncation */
.truncate-multi {
    display: -webkit-box;
    -webkit-line-clamp: 3;     /* Show max 3 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Word breaking: */
.break-words {
    word-break: break-all;     /* Break anywhere (even mid-word) */
    overflow-wrap: break-word; /* Break only if word is too long */
    hyphens: auto;             /* Add hyphens when breaking (needs lang attr) */
}

/* White space handling: */
.pre      { white-space: pre; }         /* Preserve all spaces & newlines */
.nowrap   { white-space: nowrap; }      /* Never wrap */
.pre-wrap { white-space: pre-wrap; }    /* Preserve but wrap if needed */
```

---

## Text Indent & Columns

```css
/* Indent first line (like a book paragraph) */
p { text-indent: 2em; }

/* Multi-column text layout (newspaper-style) */
.article {
    columns: 2;                   /* 2 equal columns */
    column-gap: 2rem;             /* Space between columns */
    column-rule: 1px solid #ddd;  /* Line between columns */
}

.article {
    columns: 300px;               /* As many columns as fit at 300px each */
}
```

---

## The `font` Shorthand

```css
/* font: style weight size/line-height family */

p {
    font: italic 600 1.125rem/1.6 'Inter', sans-serif;
}

/* Same as: */
p {
    font-style: italic;
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.6;
    font-family: 'Inter', sans-serif;
}

/* Minimum required: size and family */
p { font: 16px Arial; }
```

---

## Complete Typography System

```css
/* Base typography setup */
html {
    font-size: 16px;     /* 1rem = 16px */
}

body {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
    -webkit-font-smoothing: antialiased;         /* Smoother fonts on Mac */
    -moz-osx-font-smoothing: grayscale;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', system-ui, sans-serif;
    font-weight: 700;
    line-height: 1.2;
    color: #111;
    margin-bottom: 0.5em;
}

h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); }
h3 { font-size: clamp(1.25rem, 3vw, 1.75rem); }
h4 { font-size: 1.25rem; }
h5 { font-size: 1rem; }
h6 { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; }

/* Paragraphs */
p {
    margin-bottom: 1.5rem;
    max-width: 65ch;         /* Optimal reading width — ~65 characters */
}

/* Links */
a {
    color: #0066cc;
    text-decoration: none;
    text-underline-offset: 3px;
}
a:hover {
    text-decoration: underline;
}

/* Small text */
small, .text-small {
    font-size: 0.875rem;
    color: #666;
}

/* Code */
code {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.9em;
    background: #f5f5f5;
    padding: 0.15em 0.4em;
    border-radius: 4px;
}

/* Blockquote */
blockquote {
    font-style: italic;
    font-size: 1.125rem;
    color: #555;
    border-left: 4px solid #0066cc;
    padding-left: 1.5rem;
    margin: 2rem 0;
}
```

---

## Typography Quick Tips

| Topic               | Guideline                              |
|---------------------|----------------------------------------|
| Body font size      | 16px minimum (1rem)                    |
| Line height (body)  | 1.5 – 1.8                             |
| Line height (heads) | 1.1 – 1.3                             |
| Line length         | 45-75 characters (`max-width: 65ch`)   |
| Font weights used   | Stick to 2-3 weights max               |
| Number of fonts     | Max 2 (headings + body)                |
| Paragraph spacing   | 1 – 1.5rem between paragraphs         |
| Heading hierarchy   | Always use h1→h2→h3 in order           |

---

> **Key Takeaways**:
> 1. Use **system font stacks** for speed, or **Google Fonts** for custom looks
> 2. Use `rem` for font sizes — it respects user accessibility settings
> 3. Use `clamp()` for **responsive typography** that scales with screen size
> 4. `line-height: 1.6` and `max-width: 65ch` = **optimal readability**
> 5. Limit to **2 font families** and **2-3 weights** for design consistency
> 6. `font-display: swap` prevents invisible text while custom fonts load
> 7. Good typography is invisible — if readers notice the font, something's wrong 🎯
