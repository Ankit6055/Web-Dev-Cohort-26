# HTML Basics — Introduction & Setup

## What is HTML?

HTML stands for **HyperText Markup Language**. It's the **skeleton** of every website. Just like a building needs a structure of bricks and beams before you paint it — a website needs HTML before any CSS (styling) or JavaScript (behavior).

HTML is **NOT a programming language** — it's a **markup language**. It tells the browser **what** things are (this is a heading, this is a paragraph, this is an image), not how to calculate or think.

---

## How Does a Website Work?

```
You type a URL → Browser sends a request → Server sends back HTML → Browser reads HTML → Shows the webpage
```

Think of it like ordering food: you ask (URL), the kitchen makes it (server), and delivers it on a plate (HTML rendered in browser).

---

## Your First HTML File

Create a file called `index.html` and write this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first website.</p>
</body>
</html>
```

Open this file in a browser and you'll see the heading and paragraph.

---

## Breaking Down the Structure

Every HTML page has this basic skeleton:

```html
<!DOCTYPE html>         <!-- Tells the browser: "This is HTML5" -->
<html lang="en">        <!-- Root element, wraps everything -->

<head>                  <!-- Metadata — stuff the USER doesn't see -->
    <meta charset="UTF-8">
    <title>Page Title</title>
</head>

<body>                  <!-- Content — stuff the USER sees -->
    <h1>Visible Content</h1>
</body>

</html>
```

| Part           | What It Does                                         |
|----------------|------------------------------------------------------|
| `<!DOCTYPE html>` | Declares HTML5 — always the first line            |
| `<html>`       | Root container for everything                        |
| `<head>`       | Invisible metadata (title, charset, links to CSS)    |
| `<body>`       | Visible content the user sees                        |

---

## What Are Tags?

Tags are the building blocks of HTML. They're like **labels** that wrap around content.

```html
<tagname>Content goes here</tagname>
```

### Opening and Closing Tags:

```html
<h1>This is a Heading</h1>
<!--  ↑ opening tag       ↑ closing tag (has /) -->

<p>This is a paragraph</p>

<strong>This is bold</strong>
```

### Self-Closing Tags (No Content Inside):

Some tags don't need a closing tag because they don't wrap any content:

```html
<br>          <!-- Line break -->
<hr>          <!-- Horizontal line -->
<img src="photo.jpg" alt="A photo">   <!-- Image -->
<input type="text">                    <!-- Input field -->
<meta charset="UTF-8">                <!-- Metadata -->
```

---

## Elements vs Tags vs Attributes

```html
<a href="https://google.com" target="_blank">Click Me</a>
```

| Term        | What It Is                              | Example                            |
|-------------|-----------------------------------------|------------------------------------|
| **Tag**     | The label name                          | `<a>`, `</a>`                     |
| **Element** | Tag + content + everything inside       | `<a href="...">Click Me</a>`      |
| **Attribute** | Extra info added to the tag           | `href="..."`, `target="_blank"`   |
| **Value**   | The data inside the attribute           | `"https://google.com"`            |

### Common Attributes:

```html
<!-- id — unique identifier (only ONE per page) -->
<div id="header">...</div>

<!-- class — reusable group name (multiple elements can share) -->
<p class="highlight">...</p>
<p class="highlight">...</p>

<!-- style — inline CSS (try to avoid) -->
<p style="color: red;">Red text</p>

<!-- title — tooltip on hover -->
<p title="This is extra info">Hover over me</p>
```

---

## Nesting — Tags Inside Tags

You can put tags inside other tags. This is called **nesting**:

```html
<!-- ✅ CORRECT nesting -->
<div>
    <h1>Title</h1>
    <p>This is a <strong>bold</strong> word.</p>
</div>

<!-- ❌ WRONG nesting — tags must close in order -->
<p>This is <strong>wrong</p></strong>  <!-- WRONG! -->

<!-- ✅ CORRECT — close inner tag first -->
<p>This is <strong>correct</strong></p>
```

Think of it like boxes: a smaller box must be fully inside a bigger box. You can't have it half-in, half-out.

---

## Indentation

HTML doesn't **need** indentation to work, but it makes your code **readable**:

```html
<!-- ❌ Hard to read -->
<div><h1>Title</h1><p>Some text <strong>bold</strong> here</p></div>

<!-- ✅ Easy to read -->
<div>
    <h1>Title</h1>
    <p>Some text <strong>bold</strong> here</p>
</div>
```

Rule: Every time a tag is **inside** another tag, indent it by one level (2 or 4 spaces).

---

## Comments

Comments are notes for developers. The browser **ignores** them completely:

```html
<!-- This is a comment -->

<!-- 
    This is a 
    multi-line comment 
-->

<!-- TODO: Add navigation here -->

<h1>Hello</h1>  <!-- This is the main heading -->
```

Use comments to:
- Explain complex parts of your code
- Temporarily hide/disable code
- Leave notes for yourself or other developers

---

## Block vs Inline Elements

This is a **key concept** in HTML:

### Block Elements — Take Full Width:

Block elements start on a **new line** and take up the **entire width** available:

```html
<div>I take the full width</div>
<p>I also take the full width</p>
<h1>Me too!</h1>

<!-- They stack VERTICALLY: -->
<!-- |████████████████████████| -->
<!-- |████████████████████████| -->
<!-- |████████████████████████| -->
```

Common block elements: `<div>`, `<p>`, `<h1>`-`<h6>`, `<ul>`, `<ol>`, `<li>`, `<table>`, `<form>`, `<section>`, `<header>`, `<footer>`, `<main>`, `<nav>`, `<article>`

### Inline Elements — Take Only Needed Width:

Inline elements stay on the **same line** and only take up as much space as they need:

```html
<span>I only take what I need</span>
<strong>Me too</strong>
<a href="#">Same here</a>

<!-- They sit SIDE BY SIDE: -->
<!-- |██ ██ ██|              -->
```

Common inline elements: `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`, `<input>`, `<button>`, `<code>`, `<br>`

### Visual Example:

```html
<!-- Block elements stack vertically -->
<div style="background: lightblue;">Block 1</div>
<div style="background: lightgreen;">Block 2</div>

<!-- Inline elements sit side by side -->
<span style="background: lightblue;">Inline 1</span>
<span style="background: lightgreen;">Inline 2</span>
```

### Rules:
- Block elements **can contain** both block and inline elements
- Inline elements should **only contain** other inline elements
- `<p>` is special: block element but **cannot contain** other block elements

```html
<!-- ✅ CORRECT -->
<div>
    <p>Paragraph with <strong>bold</strong> text</p>
</div>

<!-- ❌ WRONG — p cannot contain div -->
<p>
    <div>This is invalid!</div>
</p>
```

---

## The `<div>` and `<span>` Elements

These are **generic containers** — they have no meaning by themselves:

```html
<!-- div — generic BLOCK container -->
<div>
    <h2>Section Title</h2>
    <p>Some content here</p>
</div>

<!-- span — generic INLINE container -->
<p>The price is <span style="color: red;">$29.99</span> only!</p>
```

Think of `<div>` as a **big box** (for grouping sections) and `<span>` as a **highlighter** (for marking specific text).

---

## Whitespace in HTML

HTML **collapses** multiple spaces and line breaks into a single space:

```html
<!-- All of these show the same thing: "Hello World" -->

<p>Hello World</p>

<p>Hello     World</p>

<p>Hello
World</p>

<p>Hello


World</p>
```

To create actual spacing:
- Use `<br>` for a line break
- Use `&nbsp;` for a non-breaking space
- Use CSS for proper spacing (preferred)

```html
<p>Line 1<br>Line 2</p>
<p>Extra&nbsp;&nbsp;&nbsp;spaces</p>
```

---

## Complete Starter Template

Copy this when starting any new HTML project:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <!-- Link CSS file -->
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>

    <main>
        <section id="about">
            <h2>About</h2>
            <p>This is my website.</p>
        </section>

        <section id="contact">
            <h2>Contact</h2>
            <p>Email me at hello@example.com</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 My Website</p>
    </footer>

    <!-- Link JS file -->
    <script src="script.js"></script>
</body>
</html>
```

---

## Quick Reference — Essential Tags

| Tag              | Purpose                       | Type    |
|------------------|-------------------------------|---------|
| `<html>`         | Root of the page              | Block   |
| `<head>`         | Metadata container            | —       |
| `<body>`         | Visible content container     | Block   |
| `<h1>` to `<h6>` | Headings (h1 = biggest)      | Block   |
| `<p>`            | Paragraph                     | Block   |
| `<div>`          | Generic block container       | Block   |
| `<span>`         | Generic inline container      | Inline  |
| `<a>`            | Link                          | Inline  |
| `<img>`          | Image                         | Inline  |
| `<br>`           | Line break                    | Inline  |
| `<hr>`           | Horizontal line               | Block   |
| `<strong>`       | Bold (important) text         | Inline  |
| `<em>`           | Italic (emphasized) text      | Inline  |
| `<!-- -->`       | Comment                       | —       |

---

> **Key Takeaways**:
> 1. HTML is the **structure** of a webpage — it tells the browser **what** things are
> 2. Every page needs `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>`
> 3. Tags come in pairs (`<p>...</p>`) or are self-closing (`<br>`, `<img>`)
> 4. **Block** elements take full width; **Inline** elements take only what they need
> 5. Always **nest** tags properly — close inner tags before outer tags
> 6. Use `<div>` for grouping blocks, `<span>` for marking inline text
> 7. Indent your code for readability — your future self will thank you 🎯
