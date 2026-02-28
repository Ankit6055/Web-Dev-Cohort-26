# CSS Transitions & Animations — Bringing Pages to Life

## Transitions — Smooth Property Changes

A transition makes a property change happen **smoothly over time** instead of instantly.

```css
/* Without transition: */
.btn { background: #0066cc; }
.btn:hover { background: #004499; }
/* Snaps instantly — feels harsh */

/* With transition: */
.btn {
    background: #0066cc;
    transition: background 0.3s ease;   /* Smooth! */
}
.btn:hover {
    background: #004499;
}
/* Fades smoothly over 0.3 seconds */
```

---

## Transition Syntax

```css
.element {
    /* Shorthand: property | duration | timing | delay */
    transition: background-color 0.3s ease 0s;
    
    /* Individual properties: */
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    transition-delay: 0s;
}

/* Multiple properties: */
.card {
    transition: 
        transform 0.3s ease,
        box-shadow 0.3s ease,
        background-color 0.2s ease;
}

/* All properties (convenient but less performant): */
.element {
    transition: all 0.3s ease;
    /* ⚠️ Animates EVERY property change — can be slow */
}
```

### Duration Guidelines:

| Effect              | Duration     | Feels Like          |
|--------------------|-------------|---------------------|
| Micro-interactions | 100-200ms   | Instant/snappy      |
| Hover effects      | 200-300ms   | Smooth, natural     |
| Page transitions   | 300-500ms   | Noticeable, fluid   |
| Complex animations | 500-1000ms  | Dramatic            |
| Too slow           | > 1000ms    | Sluggish — avoid!   |

---

## Timing Functions — How the Animation Progresses

```css
.element { transition: transform 0.3s ease; }        /* DEFAULT — slow start, fast middle, slow end */
.element { transition: transform 0.3s linear; }      /* Constant speed — robotic */
.element { transition: transform 0.3s ease-in; }     /* Slow start → fast end */
.element { transition: transform 0.3s ease-out; }    /* Fast start → slow end (✅ natural) */
.element { transition: transform 0.3s ease-in-out; } /* Slow → fast → slow */

/* Custom curve: cubic-bezier() */
.element {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    /* Material Design standard easing */
}

/* Spring/bounce effect */
.bounce {
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

/* Visit cubic-bezier.com to create custom curves! */
```

---

## Common Transition Patterns

### Hover Effects:

```css
/* Button hover */
.btn {
    background: #0066cc;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
}
.btn:hover {
    background: #004499;
    transform: translateY(-2px);    /* Slight lift */
}
.btn:active {
    transform: translateY(0);       /* Press down */
}

/* Card hover */
.card {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.card:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
}

/* Link underline animation */
a {
    color: #0066cc;
    text-decoration: none;
    position: relative;
}
a::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;                          /* Starts at 0 */
    height: 2px;
    background: #0066cc;
    transition: width 0.3s ease;
}
a:hover::after {
    width: 100%;                        /* Expands to full width */
}

/* Image zoom on hover */
.img-wrapper {
    overflow: hidden;
    border-radius: 8px;
}
.img-wrapper img {
    transition: transform 0.5s ease;
}
.img-wrapper:hover img {
    transform: scale(1.1);             /* Zoom in 10% */
}
```

### Fade In/Out:

```css
.modal {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}
.modal.active {
    opacity: 1;
    visibility: visible;
}

/* ❌ Can't transition display: none → display: block */
/* ✅ Use opacity + visibility instead */
```

---

## Performance — What to Animate

```css
/* ✅ CHEAP to animate (GPU-accelerated): */
.fast {
    transform: translate() / scale() / rotate();
    opacity: 0-1;
}

/* ⚠️ MODERATE: */
.moderate {
    color, background-color, border-color;
    box-shadow;
}

/* ❌ EXPENSIVE (causes layout reflow — AVOID): */
.slow {
    width, height;
    margin, padding;
    top, left, right, bottom;
    font-size;
}

/* 
  Rule of thumb:
  ✅ Use transform instead of top/left for movement
  ✅ Use opacity for fading
  ❌ Avoid animating width, height, margin, padding
*/

/* GPU acceleration hint: */
.animate-me {
    will-change: transform;    /* Tells browser to prepare for animation */
    /* Remove will-change when animation is done */
}
```

---

## CSS Animations — Keyframes

While transitions go from A → B, **animations** can have **multiple stages** and run **automatically**.

```css
/* Step 1: Define the animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Step 2: Apply it */
.element {
    animation: fadeIn 0.5s ease forwards;
}
```

### Animation Syntax:

```css
.element {
    /* Shorthand: name | duration | timing | delay | count | direction | fill | play-state */
    animation: slideIn 0.5s ease-out 0s 1 normal forwards running;
    
    /* Individual properties: */
    animation-name: slideIn;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-delay: 0s;
    animation-iteration-count: 1;         /* 1, 2, 3... or infinite */
    animation-direction: normal;          /* normal, reverse, alternate */
    animation-fill-mode: forwards;        /* none, forwards, backwards, both */
    animation-play-state: running;        /* running, paused */
}
```

### Key Properties Explained:

```css
/* iteration-count */
.pulse { animation: pulse 1s ease infinite; }     /* Loops forever */
.blink { animation: blink 1s ease 3; }            /* Plays 3 times */

/* direction */
.normal    { animation-direction: normal; }        /* 0% → 100% */
.reverse   { animation-direction: reverse; }       /* 100% → 0% */
.alternate { animation-direction: alternate; }     /* 0%→100%→0%→100%... */

/* fill-mode — what happens BEFORE and AFTER the animation */
.none     { animation-fill-mode: none; }           /* Reverts to original after */
.forwards { animation-fill-mode: forwards; }       /* ✅ Keeps final state */
.backwards { animation-fill-mode: backwards; }     /* Applies first keyframe during delay */
.both     { animation-fill-mode: both; }           /* Both forwards + backwards */
```

---

## Multi-Step Keyframes

```css
@keyframes bounce {
    0%   { transform: translateY(0); }
    25%  { transform: translateY(-30px); }
    50%  { transform: translateY(0); }
    75%  { transform: translateY(-15px); }
    100% { transform: translateY(0); }
}

.bouncing {
    animation: bounce 1s ease infinite;
}
```

```css
@keyframes colorShift {
    0%   { background-color: #ff6b6b; }
    25%  { background-color: #ffd93d; }
    50%  { background-color: #6bcb77; }
    75%  { background-color: #4d96ff; }
    100% { background-color: #ff6b6b; }
}

.rainbow-bg {
    animation: colorShift 4s linear infinite;
}
```

---

## Useful Animation Examples

### Fade In (On Page Load):

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeInUp 0.6s ease forwards;
}

/* Staggered fade-in for multiple items */
.item:nth-child(1) { animation-delay: 0.1s; }
.item:nth-child(2) { animation-delay: 0.2s; }
.item:nth-child(3) { animation-delay: 0.3s; }
.item:nth-child(4) { animation-delay: 0.4s; }
```

### Spinner / Loading:

```css
@keyframes spin {
    to { transform: rotate(360deg); }
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top-color: #0066cc;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
```

### Pulse:

```css
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.pulse {
    animation: pulse 2s ease-in-out infinite;
}

/* Pulse for notifications */
@keyframes pulseRing {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
}

.notification::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: red;
    animation: pulseRing 1.5s ease-out infinite;
}
```

### Shake (Error):

```css
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.error {
    animation: shake 0.5s ease;
}
```

### Slide In:

```css
@keyframes slideInLeft {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideDown {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
}
```

### Skeleton Loading:

```css
@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.skeleton {
    background: linear-gradient(
        90deg,
        #f0f0f0 25%,
        #e0e0e0 50%,
        #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    border-radius: 4px;
}
```

### Typing Effect:

```css
@keyframes typing {
    from { width: 0; }
    to { width: 100%; }
}

@keyframes blink-caret {
    50% { border-color: transparent; }
}

.typewriter {
    overflow: hidden;
    white-space: nowrap;
    border-right: 3px solid #333;
    width: 0;
    animation: 
        typing 3s steps(30) forwards,
        blink-caret 0.75s step-end infinite;
}
```

---

## Transform — Move, Scale, Rotate

```css
/* Transform doesn't trigger layout — ✅ great for animations */

/* Move */
.move { transform: translate(100px, 50px); }      /* Right 100, Down 50 */
.move { transform: translateX(100px); }            /* Right only */
.move { transform: translateY(-50%); }             /* Up by 50% of own height */

/* Scale */
.grow   { transform: scale(1.5); }                /* 150% size */
.shrink { transform: scale(0.5); }                /* 50% size */
.wide   { transform: scaleX(2); }                 /* Stretch horizontally */

/* Rotate */
.spin   { transform: rotate(45deg); }             /* 45 degrees clockwise */
.spin   { transform: rotate(-90deg); }            /* 90 degrees counter-clockwise */

/* Skew */
.slant  { transform: skew(10deg); }               /* Slanted */
.slant  { transform: skewX(10deg); }              /* Horizontal skew only */

/* Combine multiple transforms */
.fancy {
    transform: translateY(-10px) rotate(5deg) scale(1.1);
    /* Order matters! Applied right to left */
}

/* Transform origin (pivot point) */
.element {
    transform-origin: center center;    /* DEFAULT */
    transform-origin: top left;         /* Rotate from top-left corner */
    transform-origin: 50% 100%;         /* Bottom center */
}
```

---

## Scroll-Driven Animations (Modern!)

```css
/* Animate based on scroll position */
@keyframes fadeInOnScroll {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
}

.scroll-animate {
    animation: fadeInOnScroll linear;
    animation-timeline: view();         /* Triggers as element enters viewport */
    animation-range: entry 0% entry 100%;
}

/* Progress bar based on page scroll */
.progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: #0066cc;
    transform-origin: left;
    animation: growWidth linear;
    animation-timeline: scroll();
}

@keyframes growWidth {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
}
```

---

## Accessibility — Respecting User Preferences

```css
/* ALWAYS respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* Or selectively: */
.card {
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
    .card {
        transition: none;
    }
}
```

---

## Transition vs Animation Summary

| Feature            | Transition                    | Animation                      |
|-------------------|-------------------------------|--------------------------------|
| Trigger           | Needs a state change (hover)  | Can auto-play on load          |
| Stages            | Only A → B                    | Multiple keyframes             |
| Looping           | ❌ No                          | ✅ Yes (`infinite`)             |
| Delay             | ✅ Yes                         | ✅ Yes                          |
| Control           | Limited                       | Full (pause, direction, etc.)  |
| Best for          | Hover, focus, simple changes  | Loading, attention, complex    |

---

> **Key Takeaways**:
> 1. **Transitions** = smooth A→B changes (hover effects, state changes)
> 2. **Animations** = multi-step, can auto-play, can loop (`@keyframes`)
> 3. Only animate **`transform`** and **`opacity`** for best performance
> 4. `transition: all` is convenient but `transition: specific-property` is faster
> 5. Use `animation-fill-mode: forwards` to keep the final state
> 6. **Always** add `prefers-reduced-motion` to respect accessibility
> 7. Keep durations short — 200-500ms for most UI interactions 🎯
