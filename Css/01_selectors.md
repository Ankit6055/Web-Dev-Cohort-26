# CSS Selectors — Targeting HTML Elements

## What Are Selectors?

Selectors are **patterns** that tell CSS **which elements** to style. Think of them as **addresses** — they tell the browser exactly where to deliver the styles.

```css
/* "Hey browser, find ALL paragraphs and color them blue" */
p {
    color: blue;
}
```

---

## Basic Selectors

### 1. Universal Selector (`*`) — Selects EVERYTHING:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
/* Applies to EVERY element on the page */
```

### 2. Element (Type) Selector — By Tag Name:

```css
h1 { color: navy; }
p { line-height: 1.6; }
a { text-decoration: none; }
div { padding: 20px; }

/* Selects ALL h1s, ALL ps, ALL as, ALL divs */
```

### 3. Class Selector (`.`) — By Class Name:

```html
<p class="highlight">Important text</p>
<p>Normal text</p>
<p class="highlight">Also important</p>
```

```css
.highlight {
    background-color: yellow;
    font-weight: bold;
}

/* Only elements with class="highlight" get styled */
/* Classes are REUSABLE — multiple elements can share the same class */
```

### 4. ID Selector (`#`) — By ID:

```html
<h1 id="main-title">Welcome</h1>
```

```css
#main-title {
    color: darkblue;
    font-size: 2.5rem;
}

/* IDs are UNIQUE — only ONE element per page should have this ID */
/* Higher specificity than class — use sparingly */
```

### 5. Grouping Selector (`,`) — Same Style for Multiple:

```css
h1, h2, h3 {
    font-family: Georgia, serif;
    color: #222;
}

/* Instead of writing the same styles 3 times, group them */
```

---

## Combinator Selectors

Combinators describe the **relationship** between elements.

### 1. Descendant Selector (space) — Any Child at Any Depth:

```css
article p {
    color: #555;
}

/* Selects ALL <p> elements INSIDE <article>, no matter how deep */
```

```html
<article>
    <p>Selected ✅</p>
    <div>
        <p>Also selected ✅ (nested deeper)</p>
    </div>
</article>
<p>NOT selected ❌ (outside article)</p>
```

### 2. Child Selector (`>`) — Direct Children Only:

```css
article > p {
    color: blue;
}

/* Selects ONLY <p> elements that are DIRECT children of <article> */
```

```html
<article>
    <p>Selected ✅ (direct child)</p>
    <div>
        <p>NOT selected ❌ (grandchild, not direct)</p>
    </div>
</article>
```

### 3. Adjacent Sibling Selector (`+`) — Immediately After:

```css
h2 + p {
    font-size: 1.2rem;
    color: gray;
}

/* Selects the FIRST <p> that comes RIGHT AFTER an <h2> */
```

```html
<h2>Title</h2>
<p>Selected ✅ (right after h2)</p>
<p>NOT selected ❌ (not immediately after h2)</p>
```

### 4. General Sibling Selector (`~`) — All Siblings After:

```css
h2 ~ p {
    color: gray;
}

/* Selects ALL <p> siblings that come AFTER an <h2> */
```

```html
<h2>Title</h2>
<p>Selected ✅</p>
<div>Not a paragraph</div>
<p>Also selected ✅ (still a sibling after h2)</p>
```

### Combinator Comparison:

| Combinator | Syntax    | Meaning                          | Example        |
|-----------|-----------|-----------------------------------|----------------|
| Descendant | `A B`    | B anywhere inside A               | `div p`        |
| Child      | `A > B`  | B directly inside A               | `ul > li`      |
| Adjacent   | `A + B`  | B immediately after A (sibling)   | `h2 + p`       |
| General    | `A ~ B`  | All B siblings after A            | `h2 ~ p`       |

---

## Attribute Selectors

Style elements based on their **attributes**:

```css
/* Has the attribute at all */
[href] {
    color: blue;
}
/* Any element with an href attribute */

/* Exact match */
[type="email"] {
    border-color: blue;
}

/* Starts with */
[href^="https"] {
    color: green;     /* Links starting with "https" */
}

/* Ends with */
[href$=".pdf"] {
    color: red;       /* Links to PDF files */
}

/* Contains */
[href*="google"] {
    font-weight: bold; /* Links containing "google" */
}

/* Starts with word (or word-) */
[class|="btn"] {
    padding: 10px;     /* Matches "btn", "btn-primary", "btn-large" */
}

/* Contains word (space-separated) */
[class~="featured"] {
    border: 2px solid gold; /* class has "featured" as a separate word */
}

/* Case-insensitive */
[type="email" i] {
    /* Matches type="Email", type="EMAIL", etc. */
}
```

| Pattern        | Meaning                     | Example              |
|----------------|-----------------------------|----------------------|
| `[attr]`       | Has the attribute           | `[disabled]`         |
| `[attr="val"]` | Exactly equals              | `[type="text"]`      |
| `[attr^="val"]`| Starts with                 | `[href^="https"]`    |
| `[attr$="val"]`| Ends with                   | `[src$=".png"]`      |
| `[attr*="val"]`| Contains                    | `[class*="card"]`    |
| `[attr~="val"]`| Contains word               | `[class~="active"]`  |
| `[attr\|="val"]`| Starts with word or word-  | `[lang\|="en"]`      |

---

## Pseudo-Class Selectors

Pseudo-classes target elements based on their **state** or **position**.

### User Action Pseudo-Classes:

```css
a:hover {
    color: red;        /* When mouse is OVER the link */
}

a:active {
    color: darkred;    /* When link is BEING CLICKED */
}

a:visited {
    color: purple;     /* Link already visited */
}

input:focus {
    border-color: blue;     /* When input is selected/focused */
    outline: 2px solid blue;
}

button:hover {
    background-color: #0056b3;
    cursor: pointer;
}
```

### Structural Pseudo-Classes:

```css
/* First & Last */
li:first-child { font-weight: bold; }     /* First <li> in its parent */
li:last-child { border-bottom: none; }     /* Last <li> in its parent */
p:first-of-type { font-size: 1.2rem; }    /* First <p> among siblings */
p:last-of-type { margin-bottom: 0; }      /* Last <p> among siblings */

/* Nth Child — The Power Selector */
tr:nth-child(2) { }           /* 2nd row */
tr:nth-child(odd) { }         /* 1st, 3rd, 5th... rows */
tr:nth-child(even) { }        /* 2nd, 4th, 6th... rows */
li:nth-child(3n) { }          /* Every 3rd item (3, 6, 9...) */
li:nth-child(3n+1) { }        /* 1st, 4th, 7th... */
li:nth-last-child(2) { }      /* 2nd from the END */

/* Only Child / Only of Type */
p:only-child { }     /* <p> that's the ONLY child of its parent */
p:only-of-type { }   /* <p> that's the only <p> in its parent */
```

```css
/* Zebra-striped table rows: */
tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:nth-child(odd) {
    background-color: #fff;
}

/* Highlight first item: */
li:first-child {
    font-weight: bold;
    color: #0066cc;
}
```

### Form Pseudo-Classes:

```css
input:required { border-left: 3px solid red; }     /* Has required attribute */
input:optional { border-left: 3px solid gray; }    /* Doesn't have required */
input:valid { border-color: green; }                /* Passes validation */
input:invalid { border-color: red; }                /* Fails validation */
input:disabled { opacity: 0.5; cursor: not-allowed; }
input:checked + label { font-weight: bold; }        /* Checked checkbox/radio */
input:placeholder-shown { font-style: italic; }     /* Placeholder is visible */
```

### Other Useful Pseudo-Classes:

```css
p:not(.intro) {
    color: gray;           /* All <p> EXCEPT those with class "intro" */
}

:is(h1, h2, h3) {
    font-family: Georgia;  /* Same as h1, h2, h3 but shorter */
}

:where(h1, h2, h3) {
    color: navy;           /* Same as :is() but with ZERO specificity */
}

section:has(> img) {
    padding: 20px;         /* Sections that CONTAIN a direct child img */
}

:root {
    --primary: #0066cc;   /* The <html> element — used for CSS variables */
}

:empty {
    display: none;         /* Elements with NO content at all */
}
```

---

## Pseudo-Element Selectors

Pseudo-elements target **parts** of an element or **create new content**.

```css
/* First line & first letter */
p::first-line {
    font-weight: bold;      /* Only the first line of text */
}

p::first-letter {
    font-size: 3rem;        /* Drop cap effect */
    float: left;
    line-height: 1;
    margin-right: 8px;
}

/* Before & After — Add content via CSS */
.quote::before {
    content: "❝";
    font-size: 2rem;
    color: gray;
}

.quote::after {
    content: "❞";
    font-size: 2rem;
    color: gray;
}

/* Styling selected text */
::selection {
    background-color: #0066cc;
    color: white;
}

/* Placeholder text */
input::placeholder {
    color: #999;
    font-style: italic;
}

/* Scrollbar (Webkit browsers) */
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
}

/* List Marker */
li::marker {
    color: #0066cc;
    font-weight: bold;
}
```

### `::before` and `::after` — Most Used:

```css
/* Required field indicator */
.required::after {
    content: " *";
    color: red;
}

/* External link icon */
a[href^="http"]::after {
    content: " ↗";
    font-size: 0.8em;
}

/* Decorative line under heading */
h2::after {
    content: "";
    display: block;
    width: 50px;
    height: 3px;
    background: #0066cc;
    margin-top: 8px;
}

/* Tooltip */
.tooltip::after {
    content: attr(data-tip);  /* ← Pulls value from data-tip attribute! */
    position: absolute;
    background: #333;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
}
```

---

## Selector Specificity — Who Wins?

When multiple rules target the same element, specificity decides the winner:

```
Inline       → 1-0-0-0
ID           → 0-1-0-0
Class/Pseudo → 0-0-1-0
Element      → 0-0-0-1
```

```css
/* Examples: */
p { }                          /* 0-0-0-1 */
.intro { }                     /* 0-0-1-0 */
p.intro { }                    /* 0-0-1-1 */
#header { }                    /* 0-1-0-0 */
#header .nav li.active { }     /* 0-1-2-1 */
#header .nav li.active a:hover { } /* 0-1-3-2 */
```

### Tips for Managing Specificity:

```css
/* ❌ Overly specific — hard to override */
#main-content div.container ul.nav-list li.nav-item a.nav-link {
    color: blue;
}

/* ✅ Simple and clean */
.nav-link {
    color: blue;
}

/* Rules of thumb:
   1. Avoid IDs in CSS (use classes instead)
   2. Keep selectors SHORT (1-3 levels max)
   3. Never use !important except for utility overrides
   4. Use BEM naming to avoid specificity wars
*/
```

---

## Practical Selector Examples

```css
/* Style all links in the nav */
nav a { color: white; }

/* Zebra-striped table */
tbody tr:nth-child(even) { background: #f5f5f5; }

/* First paragraph after each heading */
h2 + p { font-size: 1.1rem; color: #555; }

/* Cards with images */
.card:has(img) { padding-top: 0; }

/* Style external links differently */
a[href^="http"]:not([href*="mysite.com"]) {
    color: #e67e22;
}
a[href^="http"]:not([href*="mysite.com"])::after {
    content: " ↗";
}

/* Remove last border in a list */
.list-item:last-child {
    border-bottom: none;
}

/* Highlight empty required fields */
input:required:invalid {
    border: 2px solid red;
}

/* Style paragraphs only inside articles */
article > p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
}
```

---

> **Key Takeaways**:
> 1. **Basic selectors**: `*` (all), `p` (element), `.class`, `#id`, `A, B` (group)
> 2. **Combinators**: `A B` (descendant), `A > B` (child), `A + B` (adjacent), `A ~ B` (general sibling)
> 3. **Attribute selectors**: `[attr]`, `[attr="val"]`, `[attr^=""]`, `[attr$=""]`, `[attr*=""]`
> 4. **Pseudo-classes**: `:hover`, `:focus`, `:nth-child()`, `:first-child`, `:not()`, `:has()`
> 5. **Pseudo-elements**: `::before`, `::after`, `::first-line`, `::selection`, `::placeholder`
> 6. Keep selectors **short and simple** — prefer classes over IDs
> 7. Understand **specificity** to avoid `!important` and painful overrides 🎯
