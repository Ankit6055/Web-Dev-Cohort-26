# CSS Flexbox — One-Dimensional Layouts Made Easy

## What Is Flexbox?

Flexbox is a **one-dimensional** layout system — it arranges items either in a **row** or a **column**. It's the go-to tool for:
- Centering things
- Distributing space
- Aligning items
- Building navbars, card rows, form layouts

Think of it like a **shelf** — items sit on it, and you control the spacing and alignment.

```css
.container {
    display: flex;   /* That's it! Children are now flex items */
}
```

---

## The Two Players

```
FLEX CONTAINER (parent)                  FLEX ITEMS (children)
┌──────────────────────┐                 ┌────┐ ┌────┐ ┌────┐
│                      │                 │Item│ │Item│ │Item│
│   display: flex;     │    ──────►      │  1 │ │  2 │ │  3 │
│                      │                 └────┘ └────┘ └────┘
└──────────────────────┘
```

- **Container properties** control the overall layout (direction, alignment, wrapping)
- **Item properties** control individual item behavior (grow, shrink, order)

---

## Container Properties

### `flex-direction` — Row or Column?

```css
.container { display: flex; }

/* Default — items in a ROW (left to right) */
.container { flex-direction: row; }
/* [1] [2] [3] [4] */

/* Reversed row */
.container { flex-direction: row-reverse; }
/* [4] [3] [2] [1] */

/* Items in a COLUMN (top to bottom) */
.container { flex-direction: column; }
/*
  [1]
  [2]
  [3]
*/

/* Reversed column */
.container { flex-direction: column-reverse; }
/*
  [3]
  [2]
  [1]
*/
```

### Understanding Axes:

```
flex-direction: row
  MAIN AXIS     ──────────────────►  (horizontal)
  CROSS AXIS    │
                │  (vertical)
                ▼

flex-direction: column
  MAIN AXIS     │
                │  (vertical)
                ▼
  CROSS AXIS    ──────────────────►  (horizontal)
```

- **Main axis** = the direction items flow
- **Cross axis** = perpendicular to main

---

### `justify-content` — Align Along MAIN Axis

```css
/* For flex-direction: row, this controls HORIZONTAL alignment */

.container { justify-content: flex-start; }    /* DEFAULT */
/* [1][2][3]                    */

.container { justify-content: flex-end; }
/*                    [1][2][3] */

.container { justify-content: center; }
/*          [1][2][3]          */

.container { justify-content: space-between; }
/* [1]        [2]        [3] */
/* First and last touch the edges, equal space between */

.container { justify-content: space-around; }
/*   [1]      [2]      [3]   */
/* Equal space around each item (edges get half space) */

.container { justify-content: space-evenly; }
/*    [1]     [2]     [3]    */
/* Equal space everywhere, including edges */
```

### `align-items` — Align Along CROSS Axis

```css
/* For flex-direction: row, this controls VERTICAL alignment */

.container { align-items: stretch; }      /* DEFAULT — items stretch to fill height */
.container { align-items: flex-start; }   /* Items at the top */
.container { align-items: flex-end; }     /* Items at the bottom */
.container { align-items: center; }       /* Items vertically centered */
.container { align-items: baseline; }     /* Aligned by text baseline */
```

```
align-items: flex-start     center           flex-end          stretch
┌──────────────┐     ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│[A] [BB] [C]  │     │              │  │              │  │[AA] [BBBB] [CC]│
│              │     │[A] [BB] [C]  │  │              │  │[AA] [BBBB] [CC]│
│              │     │              │  │[A] [BB] [C]  │  │[AA] [BBBB] [CC]│
└──────────────┘     └──────────────┘  └──────────────┘  └──────────────┘
```

---

### `flex-wrap` — Wrap to Next Line?

```css
/* Default — items squeeze onto ONE line */
.container { flex-wrap: nowrap; }
/* [1][2][3][4][5][6][7] ← all squished on one line */

/* Items wrap to the next line when they don't fit */
.container { flex-wrap: wrap; }
/*
  [1] [2] [3] [4]
  [5] [6] [7]
*/

/* Wrap in reverse */
.container { flex-wrap: wrap-reverse; }
/*
  [5] [6] [7]
  [1] [2] [3] [4]
*/
```

### `flex-flow` — Shorthand (Direction + Wrap):

```css
.container {
    flex-flow: row wrap;           /* direction + wrap in one line */
}

/* Same as: */
.container {
    flex-direction: row;
    flex-wrap: wrap;
}
```

---

### `align-content` — Multi-Line Alignment

When items **wrap** onto multiple lines, `align-content` controls the spacing between lines:

```css
/* Only works when flex-wrap: wrap AND items actually wrap to multiple lines */

.container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;      /* Lines packed at the top */
    align-content: flex-end;        /* Lines packed at the bottom */
    align-content: center;          /* Lines centered */
    align-content: space-between;   /* Equal space between lines */
    align-content: space-around;    /* Equal space around lines */
    align-content: stretch;         /* DEFAULT — lines stretch to fill */
}
```

---

### `gap` — Space Between Items (The Easy Way!)

```css
.container {
    display: flex;
    gap: 16px;              /* 16px between ALL items */
    gap: 16px 24px;         /* 16px row gap, 24px column gap */
    row-gap: 16px;          /* Only between rows */
    column-gap: 24px;       /* Only between columns */
}

/*
  ✅ gap is MUCH better than margin on items
  ✅ No extra space on the outside edges
  ✅ No need for "last-child" margin removal hacks
*/
```

---

## Item Properties

### `flex-grow` — How Much Should It Grow?

```css
.item { flex-grow: 0; }    /* DEFAULT — don't grow (stay at natural size) */
.item { flex-grow: 1; }    /* Grow to fill available space */

/* Proportional growing: */
.item-a { flex-grow: 1; }   /* Gets 1 part of extra space */
.item-b { flex-grow: 2; }   /* Gets 2 parts — DOUBLE what A gets */
.item-c { flex-grow: 1; }   /* Gets 1 part */

/* Total parts = 4. If 400px extra space:
   A gets 100px, B gets 200px, C gets 100px */
```

### `flex-shrink` — How Much Should It Shrink?

```css
.item { flex-shrink: 1; }    /* DEFAULT — can shrink if needed */
.item { flex-shrink: 0; }    /* Don't shrink — keep my size! */
.item { flex-shrink: 2; }    /* Shrink twice as much as others */
```

### `flex-basis` — Starting Size Before Growing/Shrinking

```css
.item { flex-basis: auto; }      /* DEFAULT — use width/content size */
.item { flex-basis: 200px; }     /* Start at 200px, then grow/shrink */
.item { flex-basis: 25%; }       /* Start at 25% of container */
.item { flex-basis: 0; }         /* Start at 0, grow fills ALL space proportionally */
```

### `flex` — The Shorthand (USE THIS!)

```css
/* flex: grow shrink basis */

.item { flex: 0 1 auto; }        /* DEFAULT — don't grow, can shrink, auto size */
.item { flex: 1; }               /* Same as: flex: 1 1 0% — grow equally */
.item { flex: 1 1 0%; }          /* Grow, shrink, start at 0 (equal distribution) */
.item { flex: 0 0 200px; }       /* Don't grow or shrink — fixed 200px */
.item { flex: 2 1 0%; }          /* Grow twice as much */
.item { flex: none; }            /* Same as: flex: 0 0 auto — rigid, natural size */
.item { flex: auto; }            /* Same as: flex: 1 1 auto — grow from natural size */

/* 
  Most common:
  flex: 1      → items share space equally
  flex: none   → fixed size, no growing/shrinking
  flex: 0 0 300px → fixed at exactly 300px
*/
```

---

### `align-self` — Override Alignment for ONE Item

```css
.container {
    display: flex;
    align-items: flex-start;    /* All items at the top */
}

.special-item {
    align-self: flex-end;       /* THIS item at the bottom */
    align-self: center;         /* THIS item in the middle */
    align-self: stretch;        /* THIS item stretches full height */
}
```

### `order` — Reorder Items (Visual Only)

```css
/* Default order is 0 — lower numbers come first */
.item-c { order: -1; }    /* Appears FIRST */
.item-a { order: 0; }     /* Normal position */
.item-b { order: 1; }     /* Appears LAST */

/* ⚠️ Only changes visual order, NOT tab/screen reader order */
```

---

## Common Flexbox Patterns

### 1. Center Anything (The Holy Grail):

```css
.center-everything {
    display: flex;
    justify-content: center;    /* Horizontal center */
    align-items: center;        /* Vertical center */
    min-height: 100vh;          /* Full viewport height */
}
```

### 2. Navbar:

```css
.navbar {
    display: flex;
    justify-content: space-between;   /* Logo left, nav right */
    align-items: center;
    padding: 0 24px;
    height: 64px;
}

.nav-links {
    display: flex;
    gap: 24px;
    list-style: none;
}
```

### 3. Card Row (Responsive):

```css
.card-row {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}

.card {
    flex: 1 1 300px;     /* Grow, shrink, minimum 300px */
    /* Cards will wrap when they can't be 300px wide */
}
```

### 4. Sidebar Layout:

```css
.layout {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    flex: 0 0 280px;      /* Fixed 280px sidebar */
}

.main-content {
    flex: 1;               /* Takes remaining space */
    padding: 24px;
}
```

### 5. Footer at Bottom (Sticky Footer):

```css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex: 1;              /* Takes all available space */
}

footer {
    /* Naturally pushed to bottom even with little content */
}
```

### 6. Input with Button:

```css
.search-bar {
    display: flex;
}

.search-bar input {
    flex: 1;              /* Input takes remaining space */
    padding: 12px;
    border: 1px solid #ddd;
    border-right: none;
}

.search-bar button {
    flex: none;            /* Button stays at its natural size */
    padding: 12px 24px;
}
```

### 7. Equal Height Cards:

```css
.row {
    display: flex;
    gap: 24px;
}

.card {
    flex: 1;               /* Each card same width */
    display: flex;
    flex-direction: column;
}

.card .card-body {
    flex: 1;               /* Body fills available space */
}

.card .card-footer {
    margin-top: auto;      /* Footer pushed to bottom */
}
```

### 8. Push Item to the End:

```css
.header {
    display: flex;
    align-items: center;
    gap: 16px;
}

.header .logo { /* ... */ }
.header nav   { /* ... */ }
.header .profile {
    margin-left: auto;     /* Pushes to the far right! */
}
```

---

## Flexbox Cheat Sheet

### Container Properties:

| Property          | Values                                              | Default      |
|------------------|-----------------------------------------------------|-------------|
| `display`         | `flex` / `inline-flex`                              | —           |
| `flex-direction`  | `row` / `row-reverse` / `column` / `column-reverse` | `row`       |
| `flex-wrap`       | `nowrap` / `wrap` / `wrap-reverse`                  | `nowrap`    |
| `justify-content` | `flex-start` / `flex-end` / `center` / `space-between` / `space-around` / `space-evenly` | `flex-start` |
| `align-items`     | `stretch` / `flex-start` / `flex-end` / `center` / `baseline` | `stretch` |
| `align-content`   | `stretch` / `flex-start` / `flex-end` / `center` / `space-between` / `space-around` | `stretch` |
| `gap`             | any length                                          | `0`         |

### Item Properties:

| Property       | Values              | Default      |
|---------------|---------------------|-------------|
| `flex`         | `grow shrink basis` | `0 1 auto`  |
| `flex-grow`    | number              | `0`         |
| `flex-shrink`  | number              | `1`         |
| `flex-basis`   | length / auto       | `auto`      |
| `align-self`   | same as align-items | `auto`      |
| `order`        | integer             | `0`         |

---

> **Key Takeaways**:
> 1. `display: flex` on the parent — children become flex items in a row
> 2. `justify-content` = main axis (horizontal for row), `align-items` = cross axis (vertical)
> 3. `flex: 1` makes items grow equally, `flex: none` keeps them fixed
> 4. Use `gap` instead of margins between items — cleaner and simpler
> 5. `margin-left: auto` pushes an item to the far right (or `margin-top: auto` to bottom)
> 6. `flex-wrap: wrap` lets items flow to the next line — essential for responsiveness
> 7. Flexbox is for **one-dimensional** layouts — use CSS Grid for two-dimensional 🎯
