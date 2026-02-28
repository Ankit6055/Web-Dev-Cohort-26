# CSS Display Property — How Elements Behave

## What Does `display` Do?

The `display` property controls **two things**:
1. How an element **behaves** in the flow (block vs inline)
2. How its **children** are laid out (flow, flex, grid)

Think of it as: "Are you a **paragraph** (takes full width) or a **word** (sits beside others)?"

---

## Block vs Inline — The Two Fundamentals

### Block Elements:

```css
div { display: block; }

/*
  Block elements:
  ✅ Take up the FULL WIDTH available
  ✅ Start on a NEW LINE
  ✅ Can set width and height
  ✅ Respects margin and padding on ALL sides
  
  Default block elements: div, p, h1-h6, section, article, ul, ol, li, form
*/
```

```
[=================== Block Element (full width) ====================]
[=================== Block Element (full width) ====================]
[=================== Block Element (full width) ====================]
```

### Inline Elements:

```css
span { display: inline; }

/*
  Inline elements:
  ✅ Sit BESIDE each other on the same line
  ❌ Can NOT set width or height
  ❌ Vertical margin/padding don't push other elements
  ✅ Only takes up as much width as its content
  
  Default inline: span, a, strong, em, img, code, br
*/
```

```
[Inline] [Inline] [Inline] [They sit side by side]
```

### Inline-Block — Best of Both:

```css
.badge { display: inline-block; }

/*
  inline-block:
  ✅ Sits BESIDE other elements (like inline)
  ✅ CAN set width and height (like block)
  ✅ Respects margin and padding on ALL sides
  
  Perfect for: buttons, tags, badges, nav items
*/
```

```
[Inline-Block (sized)] [Inline-Block (sized)] [Side by side, but with dimensions!]
```

### Comparison Table:

| Feature              | `block`          | `inline`         | `inline-block`  |
|---------------------|------------------|------------------|-----------------|
| New line?           | ✅ Yes            | ❌ No             | ❌ No            |
| Full width?         | ✅ Yes            | ❌ No (fits content) | ❌ No         |
| Set width/height?   | ✅ Yes            | ❌ No             | ✅ Yes           |
| Vertical margin?    | ✅ Yes            | ❌ No             | ✅ Yes           |
| Vertical padding?   | ✅ Yes            | ⚠️ Visual only    | ✅ Yes           |

```css
/* Practical examples: */

/* Make a link behave like a button */
a.btn {
    display: inline-block;
    padding: 12px 24px;
    background: #0066cc;
    color: white;
    border-radius: 8px;
}

/* Make a list horizontal */
nav li {
    display: inline-block;
    margin-right: 16px;
}

/* Make a span accept dimensions */
.tag {
    display: inline-block;
    padding: 4px 12px;
    background: #e5e7eb;
    border-radius: 12px;
    font-size: 0.875rem;
}
```

---

## `display: none` — Hide Elements

```css
.hidden {
    display: none;
    /*
      ❌ Completely removed from the page
      ❌ Takes up NO space
      ❌ Screen readers can't see it
      ❌ Children are hidden too
    */
}

/* vs visibility: hidden */
.invisible {
    visibility: hidden;
    /*
      ❌ Not visible
      ✅ Still takes up space (ghost element)
      ❌ Screen readers skip it
    */
}

/* vs opacity: 0 */
.transparent {
    opacity: 0;
    /*
      ❌ Not visible
      ✅ Still takes up space
      ✅ Still clickable / interactive!
      ✅ Screen readers can see it
    */
}
```

| Method              | Visible? | Takes Space? | Clickable? | Accessible? |
|---------------------|----------|-------------|------------|-------------|
| `display: none`     | ❌        | ❌           | ❌          | ❌           |
| `visibility: hidden`| ❌        | ✅           | ❌          | ❌           |
| `opacity: 0`        | ❌        | ✅           | ✅          | ✅           |
| `clip-path: inset(50%)` | ❌   | ❌           | ❌          | ✅           |

```css
/* Accessible hide (screen readers only): */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

---

## `display: flex` — Flexbox (Covered in Detail in 07_flexbox.md)

Quick overview:

```css
.container {
    display: flex;
    /*
      Children become "flex items"
      By default: sit in a ROW, side by side
      Powerful alignment and distribution
    */
}
```

---

## `display: grid` — CSS Grid (Covered in Detail in 08_grid.md)

Quick overview:

```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    /*
      Creates a grid layout
      Perfect for 2D layouts (rows AND columns)
    */
}
```

---

## `display: contents` — Ghost Container

```css
.wrapper {
    display: contents;
    /*
      The element itself DISAPPEARS from layout
      But its children remain and behave as if 
      they were direct children of the grandparent
    */
}
```

```html
<!-- Without display: contents -->
<div class="grid">
    <div class="wrapper">
        <div>A</div>  <!-- Not a direct grid child -->
        <div>B</div>  <!-- Not a direct grid child -->
    </div>
    <div>C</div>
</div>

<!-- With display: contents on .wrapper -->
<!-- A, B, and C all behave as direct grid children -->
```

---

## `display: table` — Table-Like Layout

```css
/* Make non-table elements behave like tables */
.table { display: table; }
.row   { display: table-row; }
.cell  { display: table-cell; vertical-align: middle; }

/* Useful for vertical centering (old technique) */
/* Modern solution: use flexbox instead! */
```

---

## `display: list-item`

```css
/* Makes any element behave like a <li> */
.custom-list-item {
    display: list-item;
    list-style-type: disc;
    margin-left: 20px;
}
```

---

## `display: flow-root` — Clear Floats

```css
.container {
    display: flow-root;
    /*
      Creates a new Block Formatting Context
      Contains floated children
      Prevents margin collapse
    */
}
```

---

## Inline Flex & Inline Grid

```css
/* Regular flex — takes full width (block-level) */
.row {
    display: flex;
}

/* Inline flex — only as wide as its content, sits beside others */
.inline-row {
    display: inline-flex;
}

/* Same for grid: */
.grid-block  { display: grid; }         /* Full width */
.grid-inline { display: inline-grid; }  /* Inline-level */
```

---

## Changing Display Responsively

```css
/* Hide on mobile, show on desktop */
.sidebar {
    display: none;
}

@media (min-width: 768px) {
    .sidebar {
        display: block;
    }
}

/* Stack on mobile, row on desktop */
.nav-links {
    display: flex;
    flex-direction: column;      /* Stacked on mobile */
}

@media (min-width: 768px) {
    .nav-links {
        flex-direction: row;     /* Side by side on desktop */
    }
}
```

---

## Common Patterns

```css
/* Center something on the page */
.page-center {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Horizontal navigation */
nav ul {
    display: flex;
    list-style: none;
    gap: 16px;
}

/* Card grid */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
}

/* Inline tags */
.tag {
    display: inline-block;
    padding: 4px 12px;
    margin: 4px;
    background: #e5e7eb;
    border-radius: 999px;
    font-size: 0.875rem;
}

/* Toggle visibility */
.dropdown {
    display: none;
}
.dropdown.active {
    display: block;
}
```

---

## Display Values Summary

| Value           | Behavior                                         |
|-----------------|--------------------------------------------------|
| `block`         | Full width, new line, can size                   |
| `inline`        | Same line, can't size                            |
| `inline-block`  | Same line, CAN size                              |
| `none`          | Completely hidden, no space                      |
| `flex`          | Children in flexible row/column                  |
| `inline-flex`   | Like flex but inline-level                       |
| `grid`          | Children in 2D grid                              |
| `inline-grid`   | Like grid but inline-level                       |
| `contents`      | Element removed, children promoted               |
| `flow-root`     | Creates new formatting context                   |
| `table`         | Behaves like `<table>`                           |
| `list-item`     | Behaves like `<li>`                              |

---

> **Key Takeaways**:
> 1. **Block** = full width, new line | **Inline** = side by side, no sizing
> 2. **Inline-block** = best of both — sits beside others AND can be sized
> 3. `display: none` removes from layout; `visibility: hidden` hides but keeps space
> 4. **Flex** and **Grid** are the modern layout tools (detailed in later files)
> 5. Use `display: none` + media queries for **responsive show/hide**
> 6. The `.sr-only` pattern hides visually but keeps accessible
> 7. Every element has a default display value — know which is which 🎯
