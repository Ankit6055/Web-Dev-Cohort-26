# HTML Accessibility (a11y)

## What is Accessibility?

Accessibility (often shortened to **a11y** — "a", 11 letters, "y") means making your website usable by **everyone**, including people with:

- **Visual** disabilities (blind, low vision, color blind)
- **Motor** disabilities (can't use a mouse, limited movement)
- **Hearing** disabilities (deaf or hard of hearing)
- **Cognitive** disabilities (dyslexia, ADHD, learning disabilities)

Think of it like a building with ramps and elevators — not just stairs. Everyone benefits!

---

## Why Accessibility Matters

| Reason            | Details                                                |
|-------------------|--------------------------------------------------------|
| **It's right**    | ~15% of the world's population has a disability        |
| **It's the law**  | Many countries require accessibility (ADA, EAA)        |
| **It's good SEO** | Accessible HTML = better search engine understanding   |
| **It's better UX**| Benefits ALL users (keyboard users, slow connections)  |

---

## The Four Principles — POUR

Web accessibility follows **WCAG** (Web Content Accessibility Guidelines) built on 4 principles:

| Principle        | Meaning                                           |
|------------------|---------------------------------------------------|
| **Perceivable**  | Users can see/hear/feel the content                |
| **Operable**     | Users can navigate and interact                    |
| **Understandable** | Content and UI are clear                         |
| **Robust**       | Works with different browsers and assistive tech   |

---

## 1. Semantic HTML — The Foundation

The #1 thing you can do for accessibility: **use the right HTML tags**.

```html
<!-- ❌ BAD — screen reader sees "div div div" — no meaning -->
<div class="nav">
    <div class="nav-item" onclick="goTo('home')">Home</div>
    <div class="nav-item" onclick="goTo('about')">About</div>
</div>
<div class="btn" onclick="submit()">Submit</div>

<!-- ✅ GOOD — screen reader understands the structure -->
<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
</nav>
<button type="submit">Submit</button>
```

### Use the Right Element:

| Need                | ❌ Don't Use           | ✅ Use Instead          |
|---------------------|------------------------|-------------------------|
| Navigation link     | `<div onclick="...">`  | `<a href="...">`        |
| Button              | `<div class="btn">`    | `<button>`              |
| Heading             | `<div class="title">`  | `<h1>` - `<h6>`         |
| List                | `<div>` items          | `<ul>` / `<ol> + <li>`  |
| Input label         | `<span>Name:</span>`   | `<label for="name">`    |
| Table               | `<div>` grid           | `<table>` with `<th>`   |

---

## 2. Images — `alt` Attribute

Screen readers **read** the `alt` text aloud. Without it, blind users have no idea what the image is.

```html
<!-- ✅ Informative image — describe what it shows -->
<img src="dog.jpg" alt="A golden retriever playing fetch in a park">

<!-- ✅ Functional image (inside a link) — describe the action -->
<a href="/home">
    <img src="logo.png" alt="MyCompany — Go to homepage">
</a>

<!-- ✅ Decorative image — empty alt (screen reader skips it) -->
<img src="decorative-border.png" alt="">

<!-- ❌ BAD alt text -->
<img src="dog.jpg" alt="image">            <!-- Useless -->
<img src="dog.jpg" alt="dog.jpg">          <!-- Filename, not description -->
<img src="dog.jpg" alt="photo of a dog photo image picture">  <!-- Redundant -->
<img src="dog.jpg">                        <!-- Missing alt entirely! -->
```

### Decision Tree for `alt`:

```
Is the image decorative? → alt=""
Is it a link/button? → alt describes the ACTION
Is it informational? → alt describes the CONTENT
Is it complex (chart/graph)? → alt + longer description nearby
```

---

## 3. Forms — Labels & Instructions

### Always Link Labels to Inputs:

```html
<!-- ✅ GOOD — clicking "Email" focuses the input -->
<label for="email">Email Address:</label>
<input type="email" id="email" name="email" required>

<!-- ❌ BAD — no label, screen reader just says "edit text" -->
<input type="email" placeholder="Email">

<!-- ✅ Wrapped label (also works) -->
<label>
    Email Address:
    <input type="email" name="email" required>
</label>
```

### Required Fields:

```html
<!-- Mark required fields clearly -->
<label for="name">Name: <span aria-hidden="true">*</span></label>
<input type="text" id="name" required aria-required="true">

<!-- Explain the asterisk -->
<p><small>Fields marked with * are required.</small></p>
```

### Error Messages:

```html
<!-- Link error to the input -->
<label for="email">Email:</label>
<input type="email" id="email" aria-describedby="email-error" aria-invalid="true">
<p id="email-error" role="alert" style="color: red;">
    Please enter a valid email address.
</p>
```

### Grouping Related Fields:

```html
<fieldset>
    <legend>Shipping Address</legend>
    <label for="street">Street:</label>
    <input type="text" id="street" name="street"><br>
    <label for="city">City:</label>
    <input type="text" id="city" name="city">
</fieldset>

<!-- legend tells screen readers what the group of fields is about -->
```

---

## 4. Keyboard Navigation

Many users navigate with **only the keyboard** — no mouse. Your site must work with Tab, Enter, Space, and arrow keys.

### Natively Focusable Elements:

These elements are **already keyboard accessible** — use them!

```html
<a href="/about">About</a>           <!-- Tab to focus, Enter to click -->
<button>Submit</button>               <!-- Tab to focus, Enter/Space to click -->
<input type="text">                   <!-- Tab to focus, type to interact -->
<select>...</select>                  <!-- Tab to focus, arrows to navigate -->
<textarea>...</textarea>              <!-- Tab to focus, type to interact -->
```

### Making Custom Elements Focusable:

```html
<!-- ❌ div can't receive keyboard focus by default -->
<div class="card" onclick="openCard()">Card content</div>

<!-- ✅ Add tabindex and keyboard handler -->
<div class="card" 
     tabindex="0" 
     role="button"
     onclick="openCard()"
     onkeydown="if(event.key === 'Enter') openCard()">
    Card content
</div>

<!-- ✅ BETTER — just use a button! -->
<button class="card" onclick="openCard()">Card content</button>
```

### Skip Navigation Link:

```html
<!-- First element on the page — lets keyboard users skip the nav -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<nav>
    <!-- Long navigation menu... -->
</nav>

<main id="main-content">
    <!-- Main content starts here -->
</main>

<style>
    .skip-link {
        position: absolute;
        top: -40px;          /* Hidden by default */
        left: 0;
        padding: 8px;
        background: #000;
        color: #fff;
        z-index: 100;
    }
    .skip-link:focus {
        top: 0;              /* Visible when focused with Tab */
    }
</style>
```

### Focus Visibility:

```html
<style>
    /* ❌ NEVER remove focus outlines without a replacement! */
    /* button:focus { outline: none; }  — DON'T! */

    /* ✅ Custom focus style */
    button:focus-visible {
        outline: 3px solid blue;
        outline-offset: 2px;
    }

    /* focus-visible = only shows on KEYBOARD focus, not mouse clicks */
</style>
```

---

## 5. ARIA — Accessible Rich Internet Applications

ARIA adds meaning to custom/dynamic content that native HTML can't express.

### The First Rule of ARIA:

> **Don't use ARIA if native HTML can do the job!**

```html
<!-- ❌ ARIA version (unnecessary) -->
<div role="button" tabindex="0" aria-pressed="false">Click me</div>

<!-- ✅ Native HTML (already accessible!) -->
<button>Click me</button>
```

### Common ARIA Attributes:

```html
<!-- aria-label — provides a label when visible text isn't enough -->
<button aria-label="Close dialog">✕</button>
<button aria-label="Search"><img src="search-icon.svg" alt=""></button>
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Footer navigation">...</nav>

<!-- aria-labelledby — points to an existing visible label -->
<h2 id="cart-heading">Shopping Cart</h2>
<section aria-labelledby="cart-heading">
    <!-- Cart content -->
</section>

<!-- aria-describedby — points to a description -->
<input type="password" aria-describedby="pw-rules">
<p id="pw-rules">Must be 8+ characters with a number.</p>

<!-- aria-hidden — hide from screen readers (decorative stuff) -->
<span aria-hidden="true">🎨</span>
<div aria-hidden="true" class="decorative-bg"></div>

<!-- aria-required — required field -->
<input type="email" aria-required="true">

<!-- aria-invalid — marks field as having an error -->
<input type="email" aria-invalid="true">

<!-- aria-expanded — collapsible/dropdown state -->
<button aria-expanded="false" aria-controls="menu">Menu ▼</button>
<ul id="menu" hidden>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<!-- aria-live — announce dynamic changes -->
<div aria-live="polite">
    <!-- Screen reader announces when content changes -->
    3 items in your cart
</div>

<div aria-live="assertive">
    <!-- Urgent announcement — interrupts current speech -->
    Error! Payment failed.
</div>
```

### ARIA Roles:

```html
<!-- Landmark roles (prefer semantic HTML instead) -->
<div role="banner">        <!-- Same as <header> -->
<div role="navigation">    <!-- Same as <nav> -->
<div role="main">          <!-- Same as <main> -->
<div role="complementary"> <!-- Same as <aside> -->
<div role="contentinfo">   <!-- Same as <footer> -->

<!-- Widget roles (for custom components) -->
<div role="alert">Error message!</div>
<div role="dialog">Modal content</div>
<div role="tab">Tab label</div>
<div role="tabpanel">Tab content</div>
<div role="tooltip">Tooltip text</div>
<ul role="menu">
    <li role="menuitem">Option 1</li>
</ul>
```

---

## 6. Color & Contrast

### Color Contrast Ratio:

```html
<!-- WCAG requires minimum contrast ratio -->
<!-- Normal text: 4.5:1 -->
<!-- Large text (18px+ bold or 24px+): 3:1 -->

<style>
    /* ❌ BAD — light gray on white (low contrast) */
    .bad { color: #ccc; background: #fff; }

    /* ✅ GOOD — dark on light (high contrast) */
    .good { color: #333; background: #fff; }
</style>
```

### Don't Rely on Color Alone:

```html
<!-- ❌ BAD — only color indicates the error -->
<input type="text" style="border: 2px solid red;">

<!-- ✅ GOOD — color + text + icon -->
<input type="text" style="border: 2px solid red;" aria-invalid="true" aria-describedby="err">
<p id="err" style="color: red;">⚠️ This field is required</p>
```

---

## 7. Media Accessibility

### Videos — Captions & Transcripts:

```html
<video controls>
    <source src="tutorial.mp4" type="video/mp4">
    <!-- Captions for deaf/hard of hearing users -->
    <track src="captions.vtt" kind="captions" srclang="en" label="English" default>
    <!-- Audio descriptions for blind users -->
    <track src="descriptions.vtt" kind="descriptions" srclang="en" label="English">
</video>

<!-- Always provide a transcript -->
<details>
    <summary>Read Transcript</summary>
    <p>Welcome to this tutorial. Today we'll learn about...</p>
</details>
```

### Audio:

```html
<audio controls>
    <source src="podcast.mp3" type="audio/mpeg">
</audio>
<p><a href="transcript.html">Read the transcript</a></p>
```

---

## 8. Tables — Accessible Data

```html
<table>
    <caption>Q1 2026 Sales Report</caption>  <!-- Table title for context -->
    <thead>
        <tr>
            <th scope="col">Product</th>     <!-- scope tells what this header labels -->
            <th scope="col">Q1 Sales</th>
            <th scope="col">Growth</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Laptops</th>     <!-- Row header -->
            <td>$1.2M</td>
            <td>+15%</td>
        </tr>
        <tr>
            <th scope="row">Phones</th>
            <td>$2.5M</td>
            <td>+8%</td>
        </tr>
    </tbody>
</table>
```

---

## 9. Language

```html
<!-- Set the page language -->
<html lang="en">

<!-- Mark different language sections -->
<p>The French word for cat is <span lang="fr">chat</span>.</p>

<!-- Screen readers switch pronunciation based on lang! -->
```

---

## 10. Headings — Proper Hierarchy

```html
<!-- ✅ CORRECT — logical order, no skipping -->
<h1>My Blog</h1>
    <h2>Latest Post</h2>
        <h3>Introduction</h3>
        <h3>Main Points</h3>
    <h2>About Me</h2>
        <h3>Background</h3>

<!-- ❌ WRONG — skipped levels, screen readers get confused -->
<h1>Title</h1>
<h4>Subtitle</h4>    <!-- Where's h2 and h3? -->
<h2>Section</h2>

<!-- Screen readers can generate a "heading outline" for navigation -->
<!-- If your headings are messy, blind users can't navigate your page -->
```

---

## Accessibility Checklist

Quick checklist for every page you build:

```
✅ All images have meaningful alt text (or alt="" if decorative)
✅ All form inputs have <label> elements
✅ The page has ONE <h1>, and headings don't skip levels
✅ Color is NOT the only way to convey information
✅ Text has sufficient contrast (4.5:1 for normal, 3:1 for large)
✅ All interactive elements are keyboard accessible (Tab + Enter)
✅ Focus indicators are visible (never outline: none without replacement)
✅ Page has a <html lang="en"> attribute
✅ Videos have captions, audio has transcripts
✅ Page makes sense when read in order (top to bottom)
✅ Skip navigation link exists for keyboard users
✅ ARIA is used only when native HTML isn't enough
✅ Dynamic content changes are announced (aria-live)
✅ Error messages are linked to inputs (aria-describedby)
```

---

## Testing Tools

| Tool                          | Type          | What It Does                     |
|-------------------------------|---------------|----------------------------------|
| **axe DevTools**              | Browser ext.  | Finds accessibility issues       |
| **WAVE**                      | Browser ext.  | Visual accessibility report      |
| **Lighthouse**                | Chrome built-in | Audit with accessibility score |
| **NVDA**                      | Screen reader | Free (Windows) — test navigation |
| **VoiceOver**                 | Screen reader | Built-in (Mac) — Cmd + F5       |
| **Tab key**                   | Manual        | Check keyboard navigation        |
| **Zoom to 200%**              | Manual        | Check if layout still works      |
| **WebAIM Contrast Checker**   | Online        | Check color contrast ratios      |

---

## Complete Accessible Page Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessible Blog — Latest Posts</title>
    <meta name="description" content="A fully accessible blog about web development">
</head>
<body>
    <!-- Skip nav for keyboard users -->
    <a href="#main" class="skip-link">Skip to main content</a>

    <header>
        <a href="/">
            <img src="logo.svg" alt="TechBlog — Home">
        </a>
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="/" aria-current="page">Home</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main id="main">
        <h1>Latest Blog Posts</h1>

        <article>
            <header>
                <h2><a href="/post/html-accessibility">HTML Accessibility Guide</a></h2>
                <p>By <span>Ankit</span> | <time datetime="2026-03-01">March 1, 2026</time></p>
            </header>

            <figure>
                <img src="a11y.jpg" alt="Diagram showing the 4 WCAG principles: Perceivable, Operable, Understandable, Robust">
                <figcaption>The four principles of web accessibility</figcaption>
            </figure>

            <p>Accessibility is about making the web work for everyone...</p>

            <footer>
                <p>Tags: 
                    <a href="/tags/html">HTML</a>, 
                    <a href="/tags/accessibility">Accessibility</a>
                </p>
            </footer>
        </article>
    </main>

    <aside aria-label="Newsletter signup">
        <h2>Subscribe</h2>
        <form action="/subscribe" method="POST">
            <label for="sub-email">Email Address:</label>
            <input type="email" id="sub-email" name="email" required aria-required="true" placeholder="you@example.com">
            <button type="submit">Subscribe</button>
        </form>
    </aside>

    <footer>
        <nav aria-label="Footer navigation">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
        </nav>
        <p><small>&copy; 2026 TechBlog. All rights reserved.</small></p>
    </footer>
</body>
</html>
```

---

> **Key Takeaways**:
> 1. Use **semantic HTML** first — it's the foundation of accessibility
> 2. Every `<img>` needs `alt` text (descriptive, or `alt=""` for decorative images)
> 3. Every `<input>` needs a `<label>` — always, no exceptions
> 4. Everything must be **keyboard accessible** — test with Tab key
> 5. **Never** remove focus outlines without providing a visible replacement
> 6. Don't rely on **color alone** — use text, icons, or patterns too
> 7. Use ARIA **only** when native HTML isn't enough — "the first rule of ARIA is don't use ARIA" 🎯
