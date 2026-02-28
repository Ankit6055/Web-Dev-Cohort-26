# CSS Grid — Two-Dimensional Layouts

## What Is CSS Grid?

CSS Grid is a **two-dimensional** layout system — it controls both **rows** AND **columns** at the same time. While Flexbox is great for one-direction layouts, Grid is perfect for full page layouts and complex arrangements.

Think of it like a **spreadsheet** — you define rows and columns, then place items into cells.

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;   /* 3 columns */
    grid-template-rows: 60px 1fr 80px;         /* 3 rows */
}
```

---

## Basic Grid Setup

```css
.grid {
    display: grid;
    grid-template-columns: 200px 200px 200px;  /* 3 columns, each 200px */
    gap: 16px;                                   /* Space between cells */
}
```

```
┌──────────┐ ┌──────────┐ ┌──────────┐
│  200px   │ │  200px   │ │  200px   │
│          │ │          │ │          │
└──────────┘ └──────────┘ └──────────┘
```

---

## Defining Columns & Rows

### Fixed Sizes:

```css
.grid {
    grid-template-columns: 100px 200px 300px;   /* Different widths */
    grid-template-rows: 50px 100px;
}
```

### The `fr` Unit — Fractional Unit (Space Distribution):

```css
.grid {
    grid-template-columns: 1fr 1fr 1fr;     /* 3 equal columns */
    /* Each gets 1 fraction of available space */
}

.grid {
    grid-template-columns: 1fr 2fr 1fr;     /* Middle is TWICE as wide */
    /* Total = 4fr → 25% | 50% | 25% */
}

.grid {
    grid-template-columns: 250px 1fr;       /* Sidebar + flexible main */
    /* 250px sidebar, rest goes to main */
}
```

### `repeat()` — Avoid Repetition:

```css
/* Instead of: 1fr 1fr 1fr 1fr */
.grid {
    grid-template-columns: repeat(4, 1fr);    /* 4 equal columns */
}

/* Mix with other values */
.grid {
    grid-template-columns: 200px repeat(3, 1fr) 200px;
    /* 200px | 1fr | 1fr | 1fr | 200px */
}

/* Repeat a pattern */
.grid {
    grid-template-columns: repeat(3, 1fr 2fr);
    /* 1fr 2fr 1fr 2fr 1fr 2fr — 6 columns */
}
```

### `minmax()` — Set Min and Max:

```css
.grid {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    /* Each column: at least 200px, at most 1fr */
}

.grid {
    grid-template-rows: minmax(100px, auto);
    /* At least 100px tall, but grow if content needs it */
}
```

### `auto-fill` & `auto-fit` — Responsive Without Media Queries!

```css
/* auto-fill: create as many columns as fit */
.grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    /* Automatically creates columns that are at least 250px
       Adds more columns as space allows
       Empty columns are kept (space preserved) */
}

/* auto-fit: same, but collapses empty tracks */
.grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    /* Same as auto-fill BUT:
       Empty columns collapse to 0
       Existing items stretch to fill remaining space */
}

/* 
  auto-fill: [item][item][item][ empty ][ empty ]
  auto-fit:  [   item   ][   item   ][   item   ]
  
  ✅ Use auto-fit most of the time — items stretch to fill
*/
```

---

## Gap — Space Between Cells

```css
.grid {
    gap: 16px;               /* Same gap everywhere */
    gap: 16px 24px;          /* Row gap: 16px, Column gap: 24px */
    row-gap: 16px;           /* Only between rows */
    column-gap: 24px;        /* Only between columns */
}
```

---

## Placing Items in the Grid

### By Default — Auto Placement:

```css
/* Items fill cells left-to-right, top-to-bottom automatically */
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

/* Items 1, 2, 3 go in row 1
   Items 4, 5, 6 go in row 2, etc. */
```

### Manual Placement — Grid Lines:

```css
/*
  Grid lines are numbered from 1:
  
  Column lines:  1     2     3     4
                 │     │     │     │
  Row line 1 ── ┌─────┬─────┬─────┐
                 │  1  │  2  │  3  │
  Row line 2 ── ├─────┼─────┼─────┤
                 │  4  │  5  │  6  │
  Row line 3 ── └─────┴─────┴─────┘
*/

.item {
    grid-column-start: 1;
    grid-column-end: 3;       /* Span from column line 1 to 3 (2 columns) */
    grid-row-start: 1;
    grid-row-end: 2;
}

/* Shorthand (start / end): */
.item {
    grid-column: 1 / 3;      /* Column line 1 to 3 */
    grid-row: 1 / 2;         /* Row line 1 to 2 */
}

/* Using span: */
.item {
    grid-column: 1 / span 2;  /* Start at line 1, span 2 columns */
    grid-row: span 3;         /* Span 3 rows from wherever it is */
}

/* Full width item: */
.full-width {
    grid-column: 1 / -1;      /* -1 means the LAST line */
}
```

### `grid-area` — Shorthand for Row / Column:

```css
.item {
    grid-area: 1 / 1 / 3 / 4;
    /* row-start / col-start / row-end / col-end */
    /* Takes up rows 1-2, columns 1-3 */
}
```

---

## Named Grid Areas — Most Readable!

```css
.layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 60px 1fr 80px;
    grid-template-areas:
        "header  header"
        "sidebar main"
        "footer  footer";
    min-height: 100vh;
    gap: 0;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

```
┌────────────────────────────────────┐
│             HEADER                 │  60px
├──────────┬─────────────────────────┤
│          │                         │
│ SIDEBAR  │        MAIN             │  1fr (flexible)
│  250px   │                         │
│          │                         │
├──────────┴─────────────────────────┤
│             FOOTER                 │  80px
└────────────────────────────────────┘
```

### Making It Responsive:

```css
/* Mobile — single column */
.layout {
    grid-template-columns: 1fr;
    grid-template-areas:
        "header"
        "main"
        "sidebar"
        "footer";
}

/* Desktop — sidebar layout */
@media (min-width: 768px) {
    .layout {
        grid-template-columns: 250px 1fr;
        grid-template-areas:
            "header  header"
            "sidebar main"
            "footer  footer";
    }
}

/* Use a dot (.) for empty cells: */
.grid {
    grid-template-areas:
        "header header header"
        "sidebar main  ."
        "footer  footer footer";
}
```

---

## Alignment in Grid

### Aligning ALL Items:

```css
.grid {
    /* Align items WITHIN their cells */
    justify-items: start;     /* Horizontal: start */
    justify-items: center;    /* Horizontal: center */
    justify-items: end;       /* Horizontal: end */
    justify-items: stretch;   /* Horizontal: fill cell (DEFAULT) */

    align-items: start;       /* Vertical: top */
    align-items: center;      /* Vertical: center */
    align-items: end;         /* Vertical: bottom */
    align-items: stretch;     /* Vertical: fill cell (DEFAULT) */

    /* Shorthand: */
    place-items: center center;   /* align-items / justify-items */
    place-items: center;          /* Both center */
}
```

### Aligning the GRID Itself (when grid is smaller than container):

```css
.grid {
    justify-content: center;      /* Horizontal: center the whole grid */
    align-content: center;        /* Vertical: center the whole grid */
    
    place-content: center;        /* Both at once */
}
```

### Aligning ONE Item:

```css
.special-item {
    justify-self: end;        /* This item right-aligned in its cell */
    align-self: center;       /* This item vertically centered in its cell */
    
    place-self: center end;   /* Shorthand */
}
```

---

## Implicit Grid — Auto-Created Rows/Columns

```css
/* You define 3 columns, but have 8 items — grid auto-creates rows */
.grid {
    grid-template-columns: repeat(3, 1fr);
    
    /* Control the auto-created rows: */
    grid-auto-rows: 200px;          /* Each auto row is 200px */
    grid-auto-rows: minmax(100px, auto);  /* At least 100px, grow if needed */
}

/* Control auto-placement direction: */
.grid {
    grid-auto-flow: row;        /* DEFAULT — fill rows first */
    grid-auto-flow: column;     /* Fill columns first */
    grid-auto-flow: dense;      /* Fill gaps (reorder items to fill holes) */
}
```

---

## Subgrid

```css
/* Child grid can use the parent's grid tracks */
.parent {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}

.child {
    grid-column: span 2;
    display: grid;
    grid-template-columns: subgrid;  /* Uses PARENT's column lines */
    /* Children of .child align with the parent grid! */
}
```

---

## Grid vs Flexbox — When to Use Which?

| Feature            | Flexbox                      | Grid                          |
|-------------------|------------------------------|-------------------------------|
| Dimensions        | 1D (row OR column)           | 2D (rows AND columns)        |
| Best for          | Components, alignment        | Page layouts, complex grids   |
| Content-driven?   | ✅ Yes — items determine size | Layout-driven — grid determines size |
| Wrapping?         | `flex-wrap`                  | `auto-fit` / `auto-fill`     |
| Named areas?      | ❌ No                         | ✅ Yes — `grid-template-areas` |
| Item placement?   | Linear order                 | ✅ Any cell, any order         |
| Gap?              | ✅ `gap`                      | ✅ `gap`                       |

```css
/* USE FLEXBOX for: */
/* - Navbars, toolbars */
/* - Centering things */
/* - Card rows */
/* - Input + button combos */

/* USE GRID for: */
/* - Full page layouts */
/* - Card grids (auto-fit) */
/* - Dashboard layouts */
/* - Any 2D arrangement */
```

---

## Common Grid Patterns

### 1. Responsive Card Grid:

```css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
}
/* Cards automatically wrap — no media queries needed! */
```

### 2. Holy Grail Layout:

```css
.page {
    display: grid;
    grid-template-columns: 250px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header header  header"
        "nav    content aside"
        "footer footer  footer";
    min-height: 100vh;
}
```

### 3. Image Gallery:

```css
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: 200px;
    gap: 8px;
}

/* Feature image — spans 2×2 */
.gallery .featured {
    grid-column: span 2;
    grid-row: span 2;
}

.gallery img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

### 4. Dashboard:

```css
.dashboard {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(150px, auto);
    gap: 16px;
}

.widget-large {
    grid-column: span 2;
    grid-row: span 2;
}

.widget-wide {
    grid-column: span 2;
}
```

### 5. Centered Content with Max Width:

```css
.page {
    display: grid;
    grid-template-columns: 
        minmax(16px, 1fr)      /* Left gutter */
        minmax(0, 800px)       /* Content — max 800px */
        minmax(16px, 1fr);     /* Right gutter */
}

.page > * {
    grid-column: 2;            /* Everything in the middle column */
}

.page > .full-width {
    grid-column: 1 / -1;      /* Break out to full width */
}
```

### 6. Form Layout:

```css
.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.form-grid .full-width {
    grid-column: 1 / -1;       /* Span both columns */
}
```

---

## Grid Cheat Sheet

| Property                   | What It Does                                |
|---------------------------|---------------------------------------------|
| `grid-template-columns`   | Define column sizes                          |
| `grid-template-rows`      | Define row sizes                             |
| `grid-template-areas`     | Name areas of the grid                       |
| `gap`                     | Space between cells                          |
| `grid-column`             | Which columns an item spans                  |
| `grid-row`                | Which rows an item spans                     |
| `grid-area`               | Name matching `grid-template-areas`          |
| `justify-items`           | Horizontal alignment of all items in cells   |
| `align-items`             | Vertical alignment of all items in cells     |
| `place-items`             | Shorthand for both                           |
| `justify-self`            | Horizontal alignment of ONE item             |
| `align-self`              | Vertical alignment of ONE item               |
| `grid-auto-rows`          | Size of auto-created rows                    |
| `grid-auto-flow`          | Direction of auto-placement                  |

---

> **Key Takeaways**:
> 1. Grid is for **2D layouts** (rows + columns), Flexbox is for 1D
> 2. `fr` unit distributes available space — `1fr 2fr` = 1/3 and 2/3
> 3. `repeat(auto-fit, minmax(250px, 1fr))` = **responsive grid with no media queries**
> 4. `grid-template-areas` is the most **readable** way to define layouts
> 5. Use `grid-column: 1 / -1` to span the full width
> 6. `place-items: center` centers everything in its cell
> 7. Grid handles the **big layout**, Flexbox handles **components** inside it 🎯
