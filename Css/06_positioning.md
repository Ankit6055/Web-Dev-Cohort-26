# CSS Positioning — Placing Elements Where You Want

## What Is Positioning?

By default, elements flow naturally — block elements stack, inline elements sit side by side. **Positioning** lets you break out of this flow and place elements **exactly** where you want.

```css
.element {
    position: static;     /* Default — follows normal flow */
    position: relative;   /* Stays in flow, but can be nudged */
    position: absolute;   /* Removed from flow, positioned relative to ancestor */
    position: fixed;      /* Removed from flow, positioned relative to viewport */
    position: sticky;     /* Hybrid — scrolls normally then "sticks" */
}
```

Once you set a position (other than `static`), you can use:
- `top`, `right`, `bottom`, `left` — to move the element
- `z-index` — to control stacking order (what's on top)

---

## 1. `static` — Default (No Positioning)

```css
.box {
    position: static;    /* This is the default — you don't need to write it */
}

/*
  ✅ Follows normal document flow
  ❌ top, right, bottom, left do NOTHING
  ❌ z-index does NOTHING
*/
```

---

## 2. `relative` — Nudge from Original Spot

```css
.box {
    position: relative;
    top: 20px;       /* Moves DOWN 20px from where it would normally be */
    left: 30px;      /* Moves RIGHT 30px from where it would normally be */
}

/*
  ✅ Stays in normal flow (still takes up its original space)
  ✅ Other elements DON'T move — they don't know it shifted
  ✅ Creates a positioning context for absolute children
  ✅ Can use z-index
*/
```

```
BEFORE:                    AFTER position: relative, top: 20px, left: 30px:
┌──────┐                   ┌──────┐ (ghost — original space preserved)
│ Box  │                   │      │
└──────┘                     └──────┐
┌──────┐                     │ Box  │ (visually shifted)
│ Next │                     └──────┘
└──────┘                   ┌──────┐
                           │ Next │ (doesn't move!)
                           └──────┘
```

### Main Uses of Relative:

```css
/* 1. Container for absolute children */
.parent {
    position: relative;     /* This makes it the "anchor" for absolute children */
}

/* 2. Small visual adjustments */
.icon {
    position: relative;
    top: 2px;               /* Nudge icon down to align with text */
}

/* 3. z-index control without moving */
.card:hover {
    position: relative;
    z-index: 10;            /* Appear above other cards on hover */
}
```

---

## 3. `absolute` — Remove from Flow, Position Precisely

```css
.child {
    position: absolute;
    top: 0;
    right: 0;
}

/*
  ❌ REMOVED from normal flow (other elements ignore it)
  ✅ Positioned relative to nearest positioned ancestor
  ✅ If no positioned ancestor → relative to <html>/viewport
  ✅ Can use z-index
*/
```

### Absolute Needs a Positioned Parent:

```css
/* ❌ Wrong — no positioned parent, goes to page corner */
.parent {
    /* no position set */
}
.badge {
    position: absolute;
    top: 0;
    right: 0;             /* Goes to TOP-RIGHT of the PAGE 😱 */
}

/* ✅ Correct — parent has position: relative */
.parent {
    position: relative;    /* THIS is the anchor! */
}
.badge {
    position: absolute;
    top: -8px;
    right: -8px;           /* Goes to TOP-RIGHT of .parent ✅ */
}
```

### Common Absolute Patterns:

```css
/* 1. Badge/notification dot */
.avatar-wrapper {
    position: relative;
    display: inline-block;
}
.notification-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 12px;
    height: 12px;
    background: red;
    border-radius: 50%;
}

/* 2. Overlay on image */
.image-wrapper {
    position: relative;
}
.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);   /* Dark overlay */
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 3. Center with absolute */
.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  /* Shift back by half its own size */
}

/* 4. Stretch to fill parent */
.fill {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* OR shorthand: */
    inset: 0;             /* Same as top/right/bottom/left all 0 */
}

/* 5. Dropdown menu */
.dropdown {
    position: relative;
}
.dropdown-menu {
    position: absolute;
    top: 100%;           /* Below the trigger */
    left: 0;
    width: 200px;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: none;
}
.dropdown:hover .dropdown-menu {
    display: block;
}
```

---

## 4. `fixed` — Stuck to the Screen

```css
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

/*
  ❌ REMOVED from flow
  ✅ Stays in the SAME SPOT even when you scroll
  ✅ Positioned relative to the VIEWPORT (browser window)
  ✅ Can use z-index
*/
```

### Common Fixed Patterns:

```css
/* 1. Fixed navbar */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    z-index: 100;
}
body {
    padding-top: 64px;    /* Push content below fixed nav! */
}

/* 2. Back-to-top button */
.back-to-top {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #0066cc;
    color: white;
    z-index: 50;
}

/* 3. Cookie banner */
.cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background: #333;
    color: white;
    z-index: 999;
}

/* 4. Full-screen modal overlay */
.modal-overlay {
    position: fixed;
    inset: 0;                              /* top, right, bottom, left = 0 */
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
```

---

## 5. `sticky` — Scrolls Then Sticks

```css
.section-header {
    position: sticky;
    top: 0;            /* Sticks when it reaches the TOP of the viewport */
}

/*
  ✅ Behaves like RELATIVE normally (in flow)
  ✅ Becomes FIXED when you scroll past its "sticking point"
  ✅ Stays within its parent — unsticks when parent scrolls out
  ⚠️ MUST set top, bottom, left, or right to define stick point
  ⚠️ Parent can't have overflow: hidden
*/
```

### How Sticky Works:

```
SCROLLING DOWN...

Normal position:         Hitting the top:          Past the section:
┌─────────────┐         ┌─────────────┐          ┌─────────────┐
│   Content   │         │ [STICKY HDR]│ ← stuck  │             │
│             │         │             │           │   Content   │
│ [Section H] │         │   Content   │           │             │
│             │         │             │           │[STICKY HDR] │ ← moves with
│   Content   │         │   Content   │           │    parent   │
└─────────────┘         └─────────────┘          └─────────────┘
```

### Common Sticky Patterns:

```css
/* 1. Sticky table header */
thead th {
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
}

/* 2. Sticky sidebar */
.sidebar {
    position: sticky;
    top: 80px;           /* Below the fixed navbar */
    height: fit-content;
}

/* 3. Sticky section labels (like contacts app) */
.group-header {
    position: sticky;
    top: 0;
    background: #f5f5f5;
    padding: 8px 16px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
}
```

---

## `z-index` — Stacking Order

```css
/*
  z-index controls which element appears ON TOP
  Higher number = closer to the viewer
  Only works on POSITIONED elements (not static)
*/

.behind  { z-index: 1; }
.middle  { z-index: 10; }
.on-top  { z-index: 100; }

/* Common z-index scale (organized): */
:root {
    --z-dropdown: 100;
    --z-sticky:   200;
    --z-overlay:  300;
    --z-modal:    400;
    --z-popover:  500;
    --z-tooltip:  600;
}

.dropdown { z-index: var(--z-dropdown); }
.modal    { z-index: var(--z-modal); }
.tooltip  { z-index: var(--z-tooltip); }
```

### Stacking Context:

```css
/*
  A "stacking context" is like a LAYER GROUP in Photoshop.
  z-index only competes WITHIN the same context.
*/

.parent {
    position: relative;
    z-index: 1;           /* Creates a stacking context */
}
.child {
    position: absolute;
    z-index: 999999;      /* Only stacks within .parent's context! */
}

/* If another element has z-index: 2 at the same level as .parent,
   it will appear ABOVE .child even though child has 999999 */

/* Things that create stacking contexts:
   - position + z-index (not auto)
   - opacity less than 1
   - transform, filter, perspective
   - isolation: isolate
*/
```

---

## The `inset` Shorthand

```css
/* Instead of writing: */
.overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

/* Write: */
.overlay {
    position: absolute;
    inset: 0;                /* All sides = 0 */
}

/* Other inset values: */
.box { inset: 10px; }                    /* All sides: 10px */
.box { inset: 10px 20px; }              /* Top/Bottom: 10px, Left/Right: 20px */
.box { inset: 10px 20px 30px 40px; }    /* Top Right Bottom Left */
```

---

## Position Comparison

| Property   | In Flow? | Positioned To           | Scrolls? | Use Case                    |
|-----------|----------|--------------------------|----------|------------------------------|
| `static`   | ✅ Yes   | N/A                      | Yes      | Default                      |
| `relative` | ✅ Yes   | Its own original spot     | Yes      | Nudging, anchor for absolute |
| `absolute` | ❌ No    | Nearest positioned parent | Yes      | Badges, dropdowns, overlays  |
| `fixed`    | ❌ No    | Viewport (screen)         | No       | Navbars, modals, FABs        |
| `sticky`   | ✅ Yes*  | Viewport (when stuck)     | Sticks   | Headers, sidebars            |

---

## Practical Full Example

```css
/* Page layout with fixed nav, sticky sidebar, and absolute badge */

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: white;
    z-index: 100;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

body {
    padding-top: 60px;           /* Compensate for fixed nav */
}

.content-area {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
}

.main-content {
    flex: 1;
}

.sidebar {
    position: sticky;
    top: 84px;                    /* 60px nav + 24px spacing */
    width: 280px;
    height: fit-content;
    margin-left: 24px;
}

/* Card with badge */
.card {
    position: relative;           /* Anchor for the badge */
    padding: 24px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
}

.card .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: red;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
}
```

---

> **Key Takeaways**:
> 1. `static` — default, no positioning. `relative` — nudge from original spot
> 2. `absolute` — removed from flow, needs a `position: relative` parent
> 3. `fixed` — stuck to the viewport, doesn't scroll (navbars, modals)
> 4. `sticky` — scrolls normally, then sticks (`top: 0` to stick at top)
> 5. Use `inset: 0` as shorthand for `top/right/bottom/left: 0`
> 6. `z-index` controls stacking — **only works on positioned elements**
> 7. Keep z-index organized with a scale (100, 200, 300...) — avoid random numbers 🎯
