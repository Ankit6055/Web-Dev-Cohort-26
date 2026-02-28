# CSS Variables (Custom Properties) — Reusable Values

## What Are CSS Variables?

CSS Variables (officially called **Custom Properties**) let you store values and reuse them throughout your stylesheet. Instead of repeating `#0066cc` everywhere, define it once and use it everywhere.

Think of them as **nicknames** for values — change the definition once, and it updates everywhere.

```css
/* Without variables — repeating values everywhere */
.btn { background: #0066cc; }
.link { color: #0066cc; }
.border { border-color: #0066cc; }
/* Want to change the color? Update it in 3 places 😩 */

/* With variables — define once, use everywhere */
:root {
    --primary: #0066cc;
}
.btn { background: var(--primary); }
.link { color: var(--primary); }
.border { border-color: var(--primary); }
/* Want to change? Update it in ONE place! 🎉 */
```

---

## Syntax

### Defining Variables:

```css
:root {
    --primary-color: #0066cc;
    --font-size-base: 16px;
    --spacing-md: 1.5rem;
    --border-radius: 8px;
    --font-family: 'Inter', sans-serif;
    --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/*
  :root = the <html> element
  -- prefix is REQUIRED (that's how CSS knows it's a variable)
  Variable names are CASE-SENSITIVE
  --Primary ≠ --primary
*/
```

### Using Variables:

```css
.card {
    font-family: var(--font-family);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.btn {
    background: var(--primary-color);
    border-radius: var(--border-radius);
}
```

### Fallback Values:

```css
.element {
    color: var(--text-color, #333);
    /* If --text-color isn't defined, use #333 as fallback */
    
    font-size: var(--size, var(--default-size, 16px));
    /* Nested fallback: try --size, then --default-size, then 16px */
}
```

---

## Scope — Where Variables Work

### Global Scope (`:root`):

```css
:root {
    --primary: #0066cc;     /* Available EVERYWHERE */
}
```

### Local Scope (On Any Element):

```css
.card {
    --card-padding: 24px;   /* Only available inside .card and its children */
    padding: var(--card-padding);
}

.card .title {
    padding-bottom: var(--card-padding);   /* ✅ Works — inside .card */
}

.footer {
    padding: var(--card-padding);          /* ❌ Undefined — outside .card */
}
```

### Override Variables for Specific Elements:

```css
:root {
    --primary: #0066cc;      /* Default blue */
}

.danger-section {
    --primary: #dc3545;      /* Red in this section! */
}

/* Same .btn component, different colors! */
.btn { background: var(--primary); }

/* In :root → blue button */
/* Inside .danger-section → red button */
/* No extra classes needed! */
```

---

## Complete Design Token System

```css
:root {
    /* === COLORS === */
    --color-primary-50:  hsl(210, 80%, 95%);
    --color-primary-100: hsl(210, 80%, 90%);
    --color-primary-200: hsl(210, 80%, 80%);
    --color-primary-300: hsl(210, 80%, 70%);
    --color-primary-400: hsl(210, 80%, 60%);
    --color-primary-500: hsl(210, 80%, 50%);   /* Base */
    --color-primary-600: hsl(210, 80%, 40%);
    --color-primary-700: hsl(210, 80%, 30%);
    --color-primary-800: hsl(210, 80%, 20%);
    --color-primary-900: hsl(210, 80%, 10%);
    
    --color-gray-50:  #f9fafb;
    --color-gray-100: #f3f4f6;
    --color-gray-200: #e5e7eb;
    --color-gray-300: #d1d5db;
    --color-gray-400: #9ca3af;
    --color-gray-500: #6b7280;
    --color-gray-600: #4b5563;
    --color-gray-700: #374151;
    --color-gray-800: #1f2937;
    --color-gray-900: #111827;
    
    --color-success: #16a34a;
    --color-warning: #ca8a04;
    --color-danger:  #dc2626;
    --color-info:    #2563eb;
    
    /* === SEMANTIC COLORS === */
    --text-primary:   var(--color-gray-900);
    --text-secondary: var(--color-gray-600);
    --text-muted:     var(--color-gray-400);
    --bg-primary:     #ffffff;
    --bg-secondary:   var(--color-gray-50);
    --border-color:   var(--color-gray-200);
    
    /* === TYPOGRAPHY === */
    --font-sans:  'Inter', system-ui, sans-serif;
    --font-serif: 'Georgia', serif;
    --font-mono:  'JetBrains Mono', monospace;
    
    --text-xs:   0.75rem;
    --text-sm:   0.875rem;
    --text-base: 1rem;
    --text-lg:   1.125rem;
    --text-xl:   1.25rem;
    --text-2xl:  1.5rem;
    --text-3xl:  2rem;
    --text-4xl:  2.5rem;
    
    /* === SPACING === */
    --space-1: 0.25rem;    /* 4px */
    --space-2: 0.5rem;     /* 8px */
    --space-3: 0.75rem;    /* 12px */
    --space-4: 1rem;       /* 16px */
    --space-5: 1.25rem;    /* 20px */
    --space-6: 1.5rem;     /* 24px */
    --space-8: 2rem;       /* 32px */
    --space-10: 2.5rem;    /* 40px */
    --space-12: 3rem;      /* 48px */
    --space-16: 4rem;      /* 64px */
    
    /* === BORDERS === */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-full: 9999px;
    
    /* === SHADOWS === */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    
    /* === TRANSITIONS === */
    --transition-fast: 150ms ease;
    --transition-base: 250ms ease;
    --transition-slow: 350ms ease;
    
    /* === LAYOUT === */
    --container-max: 1200px;
    --sidebar-width: 280px;
    --navbar-height: 64px;
}
```

---

## Dark Mode with Variables

```css
/* Light mode (default) */
:root {
    --bg: #ffffff;
    --bg-secondary: #f5f5f5;
    --text: #333333;
    --text-secondary: #666666;
    --border: #e5e7eb;
    --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Dark mode — just override the variables! */
@media (prefers-color-scheme: dark) {
    :root {
        --bg: #1a1a2e;
        --bg-secondary: #16213e;
        --text: #e0e0e0;
        --text-secondary: #a0a0a0;
        --border: #334155;
        --shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }
}

/* All components auto-update — no rewrites needed! */
body {
    background: var(--bg);
    color: var(--text);
}

.card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
}

/* OR: Toggle with a class (for manual dark mode toggle) */
[data-theme="dark"] {
    --bg: #1a1a2e;
    --text: #e0e0e0;
    /* ... same overrides ... */
}
```

```html
<!-- Toggle dark mode: -->
<html data-theme="light">
<script>
    // Toggle theme
    document.documentElement.dataset.theme = 
        document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
</script>
```

---

## Variables with JavaScript

```javascript
// READ a CSS variable
const root = document.documentElement;
const primary = getComputedStyle(root).getPropertyValue('--primary');
// Returns: "#0066cc"

// SET a CSS variable
root.style.setProperty('--primary', '#ff6600');
// Now everything using --primary updates instantly!

// Use case: Theme color picker
colorPicker.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--primary', e.target.value);
});

// Use case: Dynamic spacing
root.style.setProperty('--navbar-height', '80px');
```

---

## Variables in `calc()`

```css
:root {
    --base-size: 16px;
    --navbar-height: 64px;
    --sidebar-width: 280px;
}

h1 { font-size: calc(var(--base-size) * 2.5); }    /* 40px */
h2 { font-size: calc(var(--base-size) * 2); }       /* 32px */

.main-content {
    min-height: calc(100vh - var(--navbar-height));
    margin-left: var(--sidebar-width);
    padding: calc(var(--base-size) * 2);
}

/* Dynamic grid gap */
:root {
    --gap: 16px;
}
.grid {
    gap: var(--gap);
    padding: calc(var(--gap) * 2);
}
```

---

## Component-Level Variables

```css
/* Define variables ON the component — variations become easy */
.btn {
    --btn-bg: #0066cc;
    --btn-color: white;
    --btn-padding: 12px 24px;
    --btn-radius: 8px;
    
    background: var(--btn-bg);
    color: var(--btn-color);
    padding: var(--btn-padding);
    border-radius: var(--btn-radius);
    border: none;
    cursor: pointer;
    transition: background var(--transition-fast);
}

.btn:hover {
    --btn-bg: #004499;       /* Override on hover */
}

/* Variants — just change the variables! */
.btn-danger {
    --btn-bg: #dc3545;
}
.btn-danger:hover {
    --btn-bg: #b02a37;
}

.btn-outline {
    --btn-bg: transparent;
    --btn-color: #0066cc;
    border: 2px solid #0066cc;
}

.btn-sm {
    --btn-padding: 8px 16px;
    --btn-radius: 6px;
    font-size: 0.875rem;
}

.btn-lg {
    --btn-padding: 16px 32px;
    --btn-radius: 10px;
    font-size: 1.125rem;
}
```

---

## Variables vs Preprocessor Variables (Sass)

| Feature              | CSS Variables (`--var`)       | Sass Variables (`$var`)      |
|---------------------|-------------------------------|-------------------------------|
| Runtime?            | ✅ Yes (live in browser)       | ❌ No (compiled away)          |
| Change with JS?     | ✅ Yes                         | ❌ No                          |
| Scope              | ✅ Cascade & inherit           | Block scope only              |
| Media queries?     | ✅ Can change per breakpoint   | ❌ Can't                       |
| Fallback           | ✅ `var(--x, fallback)`        | ❌ No                          |
| Browser support    | All modern browsers            | Needs build step              |

```css
/* CSS Variables CAN do this — Sass variables CAN'T: */
.card {
    --pad: 16px;
}

@media (min-width: 768px) {
    .card {
        --pad: 24px;     /* Variable changes at breakpoint! */
    }
}

.card {
    padding: var(--pad);  /* Auto-updates at the breakpoint */
}
```

---

## Practical Tips

```css
/* 1. Name with a system: --category-property-variant */
--color-primary-500
--font-size-lg
--space-4
--shadow-md

/* 2. Use semantic names for actual usage */
--text-heading     /* Not --color-gray-900 */
--bg-surface       /* Not --color-white */

/* 3. Organize variables in sections */
:root {
    /* Colors */
    /* Typography */
    /* Spacing */
    /* Borders */
    /* Shadows */
    /* Transitions */
}

/* 4. Don't go overboard — only variablize things that: */
/* ✅ Are used in multiple places */
/* ✅ Might change (themes, responsiveness) */
/* ✅ Are part of a design system */
/* ❌ Don't variablize one-off values */
```

---

> **Key Takeaways**:
> 1. CSS Variables are defined with `--name` and used with `var(--name)`
> 2. Define global variables on `:root`, local ones on specific elements
> 3. Variables **cascade and inherit** — override per component for theming
> 4. Perfect for **dark mode** — swap variables, all components update
> 5. Can be **read and changed with JavaScript** — true runtime variables
> 6. Work inside `calc()` — `calc(var(--spacing) * 2)`
> 7. Build a **design token system** — colors, spacing, typography, shadows in variables 🎯
